const express = require('express');
const { body, validationResult } = require('express-validator');
const Swap = require('../models/Swap');
const Item = require('../models/Item');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/swaps
// @desc    Get user's swaps
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { status, type = 'all' } = req.query;
    
    let query = {};
    
    if (type === 'sent') {
      query.initiator = req.user.id;
    } else if (type === 'received') {
      query.recipient = req.user.id;
    } else {
      query.$or = [
        { initiator: req.user.id },
        { recipient: req.user.id }
      ];
    }
    
    if (status) {
      query.status = status;
    }

    const swaps = await Swap.find(query)
      .populate('initiator', 'firstName lastName rating')
      .populate('recipient', 'firstName lastName rating')
      .populate('initiatorItem', 'title images pointsValue')
      .populate('recipientItem', 'title images pointsValue')
      .sort({ createdAt: -1 });

    res.json(swaps);
  } catch (error) {
    console.error('Get swaps error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/swaps/:id
// @desc    Get swap by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id)
      .populate('initiator', 'firstName lastName rating location')
      .populate('recipient', 'firstName lastName rating location')
      .populate('initiatorItem', 'title images pointsValue description')
      .populate('recipientItem', 'title images pointsValue description');

    if (!swap) {
      return res.status(404).json({ message: 'Swap not found' });
    }

    // Check if user is part of this swap
    if (swap.initiator._id.toString() !== req.user.id && swap.recipient._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this swap' });
    }

    res.json(swap);
  } catch (error) {
    console.error('Get swap error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/swaps
// @desc    Create a new swap request
// @access  Private
router.post('/', auth, [
  body('recipientItemId').notEmpty().withMessage('Recipient item ID is required'),
  body('swapType').isIn(['item-swap', 'point-redemption']).withMessage('Invalid swap type'),
  body('message').optional().isLength({ max: 500 }).withMessage('Message cannot exceed 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { recipientItemId, initiatorItemId, swapType, message } = req.body;

    // Get recipient item
    const recipientItem = await Item.findById(recipientItemId).populate('owner');
    if (!recipientItem) {
      return res.status(404).json({ message: 'Recipient item not found' });
    }

    if (recipientItem.status !== 'available') {
      return res.status(400).json({ message: 'Item is not available for swap' });
    }

    // Check if user is trying to swap with their own item
    if (recipientItem.owner._id.toString() === req.user.id) {
      return res.status(400).json({ message: 'Cannot swap with your own item' });
    }

    let swap = {
      initiator: req.user.id,
      recipient: recipientItem.owner._id,
      recipientItem: recipientItemId,
      swapType,
      message: message || ''
    };

    if (swapType === 'item-swap') {
      if (!initiatorItemId) {
        return res.status(400).json({ message: 'Initiator item ID is required for item swaps' });
      }

      // Validate initiator item
      const initiatorItem = await Item.findById(initiatorItemId);
      if (!initiatorItem) {
        return res.status(404).json({ message: 'Initiator item not found' });
      }

      if (initiatorItem.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to use this item for swap' });
      }

      if (initiatorItem.status !== 'available') {
        return res.status(400).json({ message: 'Your item is not available for swap' });
      }

      swap.initiatorItem = initiatorItemId;
    } else if (swapType === 'point-redemption') {
      // Check if user has enough points
      if (req.user.points < recipientItem.pointsValue) {
        return res.status(400).json({ message: 'Insufficient points for this redemption' });
      }

      swap.pointsUsed = recipientItem.pointsValue;
    }

    const newSwap = new Swap(swap);
    await newSwap.save();

    // Update item statuses
    recipientItem.status = 'pending';
    await recipientItem.save();

    if (swapType === 'item-swap') {
      await Item.findByIdAndUpdate(initiatorItemId, { status: 'pending' });
    }

    const populatedSwap = await Swap.findById(newSwap._id)
      .populate('initiator', 'firstName lastName rating')
      .populate('recipient', 'firstName lastName rating')
      .populate('initiatorItem', 'title images pointsValue')
      .populate('recipientItem', 'title images pointsValue');

    res.status(201).json({
      message: 'Swap request created successfully',
      swap: populatedSwap
    });
  } catch (error) {
    console.error('Create swap error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/swaps/:id/respond
// @desc    Respond to a swap request (accept/reject)
// @access  Private
router.put('/:id/respond', auth, [
  body('response').isIn(['accepted', 'rejected']).withMessage('Invalid response'),
  body('message').optional().isLength({ max: 300 }).withMessage('Message cannot exceed 300 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { response, message } = req.body;

    const swap = await Swap.findById(req.params.id)
      .populate('initiator')
      .populate('recipient')
      .populate('initiatorItem')
      .populate('recipientItem');

    if (!swap) {
      return res.status(404).json({ message: 'Swap not found' });
    }

    // Check if user is the recipient
    if (swap.recipient._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to respond to this swap' });
    }

    if (swap.status !== 'pending') {
      return res.status(400).json({ message: 'Cannot respond to this swap' });
    }

    swap.status = response;
    if (message) swap.message = message;

    if (response === 'accepted') {
      // Handle points transaction for point redemption
      if (swap.swapType === 'point-redemption') {
        // Deduct points from initiator
        await User.findByIdAndUpdate(swap.initiator._id, {
          $inc: { points: -swap.pointsUsed }
        });

        // Add points to recipient
        await User.findByIdAndUpdate(swap.recipient._id, {
          $inc: { points: swap.pointsUsed }
        });
      }

      // Update item statuses
      swap.recipientItem.status = 'swapped';
      await swap.recipientItem.save();

      if (swap.initiatorItem) {
        swap.initiatorItem.status = 'swapped';
        await swap.initiatorItem.save();
      }

      // Add to swap history
      await User.findByIdAndUpdate(swap.initiator._id, {
        $push: { swapHistory: swap._id }
      });
      await User.findByIdAndUpdate(swap.recipient._id, {
        $push: { swapHistory: swap._id }
      });

    } else if (response === 'rejected') {
      // Reset item statuses
      swap.recipientItem.status = 'available';
      await swap.recipientItem.save();

      if (swap.initiatorItem) {
        swap.initiatorItem.status = 'available';
        await swap.initiatorItem.save();
      }
    }

    await swap.save();

    res.json({
      message: `Swap ${response} successfully`,
      swap
    });
  } catch (error) {
    console.error('Respond to swap error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/swaps/:id/complete
// @desc    Mark swap as completed
// @access  Private
router.put('/:id/complete', auth, async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);
    if (!swap) {
      return res.status(404).json({ message: 'Swap not found' });
    }

    // Check if user is part of the swap
    if (swap.initiator.toString() !== req.user.id && swap.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to complete this swap' });
    }

    if (swap.status !== 'accepted') {
      return res.status(400).json({ message: 'Cannot complete this swap' });
    }

    swap.status = 'completed';
    swap.completedAt = new Date();
    await swap.save();

    res.json({
      message: 'Swap completed successfully',
      swap
    });
  } catch (error) {
    console.error('Complete swap error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/swaps/:id/cancel
// @desc    Cancel swap
// @access  Private
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id)
      .populate('initiatorItem')
      .populate('recipientItem');

    if (!swap) {
      return res.status(404).json({ message: 'Swap not found' });
    }

    // Check if user is the initiator
    if (swap.initiator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to cancel this swap' });
    }

    if (swap.status !== 'pending') {
      return res.status(400).json({ message: 'Cannot cancel this swap' });
    }

    swap.status = 'cancelled';
    await swap.save();

    // Reset item statuses
    swap.recipientItem.status = 'available';
    await swap.recipientItem.save();

    if (swap.initiatorItem) {
      swap.initiatorItem.status = 'available';
      await swap.initiatorItem.save();
    }

    res.json({
      message: 'Swap cancelled successfully',
      swap
    });
  } catch (error) {
    console.error('Cancel swap error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/swaps/:id/rate
// @desc    Rate a completed swap
// @access  Private
router.post('/:id/rate', auth, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().isLength({ max: 200 }).withMessage('Comment cannot exceed 200 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rating, comment } = req.body;

    const swap = await Swap.findById(req.params.id);
    if (!swap) {
      return res.status(404).json({ message: 'Swap not found' });
    }

    if (swap.status !== 'completed') {
      return res.status(400).json({ message: 'Can only rate completed swaps' });
    }

    // Check if user is part of the swap
    if (swap.initiator.toString() !== req.user.id && swap.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to rate this swap' });
    }

    // Determine if user is initiator or recipient
    const isInitiator = swap.initiator.toString() === req.user.id;
    const ratingField = isInitiator ? 'initiatorRating' : 'recipientRating';

    // Check if already rated
    if (swap.ratings[ratingField].rating) {
      return res.status(400).json({ message: 'You have already rated this swap' });
    }

    // Add rating
    swap.ratings[ratingField] = {
      rating,
      comment: comment || ''
    };

    await swap.save();

    // Update the other user's rating
    const otherUserId = isInitiator ? swap.recipient : swap.initiator;
    const otherUser = await User.findById(otherUserId);
    
    if (otherUser) {
      const newTotalRatings = otherUser.totalRatings + 1;
      const newRating = ((otherUser.rating * otherUser.totalRatings) + rating) / newTotalRatings;
      
      otherUser.rating = newRating;
      otherUser.totalRatings = newTotalRatings;
      await otherUser.save();
    }

    res.json({
      message: 'Rating submitted successfully',
      swap
    });
  } catch (error) {
    console.error('Rate swap error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;