const express = require('express');
const { body, validationResult } = require('express-validator');
const Item = require('../models/Item');
const User = require('../models/User');
const Swap = require('../models/Swap');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/admin/items
// @desc    Get all items for admin review
// @access  Private (Admin only)
router.get('/items', adminAuth, async (req, res) => {
  try {
    const { status = 'pending', page = 1, limit = 20 } = req.query;
    
    const query = { approvalStatus: status };
    
    const items = await Item.find(query)
      .populate('owner', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Item.countDocuments(query);

    res.json({
      items,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get admin items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/items/:id/approve
// @desc    Approve an item
// @access  Private (Admin only)
router.put('/items/:id/approve', adminAuth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.approvalStatus !== 'pending') {
      return res.status(400).json({ message: 'Item is not pending approval' });
    }

    item.approvalStatus = 'approved';
    await item.save();

    res.json({
      message: 'Item approved successfully',
      item
    });
  } catch (error) {
    console.error('Approve item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/items/:id/reject
// @desc    Reject an item
// @access  Private (Admin only)
router.put('/items/:id/reject', adminAuth, [
  body('reason').optional().isLength({ max: 500 }).withMessage('Reason cannot exceed 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { reason } = req.body;

    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.approvalStatus !== 'pending') {
      return res.status(400).json({ message: 'Item is not pending approval' });
    }

    item.approvalStatus = 'rejected';
    if (reason) {
      item.rejectionReason = reason;
    }
    await item.save();

    res.json({
      message: 'Item rejected successfully',
      item
    });
  } catch (error) {
    console.error('Reject item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/admin/items/:id
// @desc    Delete an item (remove inappropriate content)
// @access  Private (Admin only)
router.delete('/items/:id', adminAuth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if item is involved in any active swaps
    const activeSwaps = await Swap.find({
      $or: [
        { initiatorItem: item._id },
        { recipientItem: item._id }
      ],
      status: { $in: ['pending', 'accepted'] }
    });

    if (activeSwaps.length > 0) {
      return res.status(400).json({ message: 'Cannot delete item with active swaps' });
    }

    await Item.findByIdAndDelete(req.params.id);

    // Remove item from user's uploaded items
    await User.findByIdAndUpdate(item.owner, {
      $pull: { itemsUploaded: req.params.id }
    });

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users for admin management
// @access  Private (Admin only)
router.get('/users', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    
    let query = {};
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password')
      .populate('itemsUploaded', 'title status createdAt')
      .populate('swapHistory', 'status createdAt')
      .sort({ joinDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get admin users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/stats
// @desc    Get platform statistics
// @access  Private (Admin only)
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const [
      totalUsers,
      totalItems,
      totalSwaps,
      pendingItems,
      approvedItems,
      rejectedItems,
      activeSwaps,
      completedSwaps
    ] = await Promise.all([
      User.countDocuments(),
      Item.countDocuments(),
      Swap.countDocuments(),
      Item.countDocuments({ approvalStatus: 'pending' }),
      Item.countDocuments({ approvalStatus: 'approved' }),
      Item.countDocuments({ approvalStatus: 'rejected' }),
      Swap.countDocuments({ status: { $in: ['pending', 'accepted'] } }),
      Swap.countDocuments({ status: 'completed' })
    ]);

    // Get recent activity
    const recentItems = await Item.find()
      .populate('owner', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(10);

    const recentSwaps = await Swap.find()
      .populate('initiator', 'firstName lastName')
      .populate('recipient', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      stats: {
        totalUsers,
        totalItems,
        totalSwaps,
        pendingItems,
        approvedItems,
        rejectedItems,
        activeSwaps,
        completedSwaps
      },
      recentActivity: {
        items: recentItems,
        swaps: recentSwaps
      }
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/users/:id/toggle-admin
// @desc    Toggle user admin status
// @access  Private (Admin only)
router.put('/users/:id/toggle-admin', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Don't allow admin to remove their own admin status
    if (user._id.toString() === req.user.id && user.isAdmin) {
      return res.status(400).json({ message: 'Cannot remove your own admin status' });
    }

    user.isAdmin = !user.isAdmin;
    await user.save();

    res.json({
      message: `User ${user.isAdmin ? 'promoted to' : 'removed from'} admin`,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Toggle admin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;