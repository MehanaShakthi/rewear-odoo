const express = require('express');
const User = require('../models/User');
const Item = require('../models/Item');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/:id
// @desc    Get user profile by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('itemsUploaded', 'title images pointsValue status createdAt')
      .select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Only show approved items to public
    const publicItems = user.itemsUploaded.filter(item => item.status === 'available');

    res.json({
      ...user.toJSON(),
      itemsUploaded: publicItems
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users
// @desc    Get all users (for admin or search)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { search, limit = 10, page = 1 } = req.query;
    
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
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ joinDate: -1 });

    const total = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/:id/stats
// @desc    Get user statistics
// @access  Public
router.get('/:id/stats', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get item statistics
    const itemStats = await Item.aggregate([
      { $match: { owner: user._id } },
      { $group: {
        _id: '$status',
        count: { $sum: 1 }
      }}
    ]);

    // Convert to object for easier access
    const stats = {};
    itemStats.forEach(stat => {
      stats[stat._id] = stat.count;
    });

    res.json({
      totalItems: user.itemsUploaded.length,
      totalSwaps: user.swapHistory.length,
      rating: user.rating,
      totalRatings: user.totalRatings,
      joinDate: user.joinDate,
      points: user.points,
      itemStats: {
        available: stats.available || 0,
        pending: stats.pending || 0,
        swapped: stats.swapped || 0,
        inactive: stats.inactive || 0
      }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;