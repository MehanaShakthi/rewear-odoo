const express = require('express');
const { body, validationResult } = require('express-validator');
const Item = require('../models/Item');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// @route   GET /api/items
// @desc    Get all approved items with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      category,
      size,
      condition,
      search,
      minPoints,
      maxPoints,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 12
    } = req.query;

    let query = { approvalStatus: 'approved', status: 'available' };

    // Apply filters
    if (category) query.category = category;
    if (size) query.size = size;
    if (condition) query.condition = condition;
    if (minPoints || maxPoints) {
      query.pointsValue = {};
      if (minPoints) query.pointsValue.$gte = parseInt(minPoints);
      if (maxPoints) query.pointsValue.$lte = parseInt(maxPoints);
    }

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    const sortObj = {};
    sortObj[sort] = order === 'asc' ? 1 : -1;

    const items = await Item.find(query)
      .populate('owner', 'firstName lastName rating')
      .sort(sortObj)
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
    console.error('Get items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/items/featured
// @desc    Get featured items for homepage
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const items = await Item.find({
      approvalStatus: 'approved',
      status: 'available'
    })
      .populate('owner', 'firstName lastName rating')
      .sort({ views: -1, createdAt: -1 })
      .limit(8);

    res.json(items);
  } catch (error) {
    console.error('Get featured items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/items/:id
// @desc    Get item by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('owner', 'firstName lastName rating totalRatings location joinDate')
      .populate('likes', 'firstName lastName');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Increment view count
    item.views += 1;
    await item.save();

    res.json(item);
  } catch (error) {
    console.error('Get item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/items
// @desc    Create a new item
// @access  Private
router.post('/', auth, upload.array('images', 5), [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').isIn(['tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'accessories', 'other']).withMessage('Invalid category'),
  body('type').trim().notEmpty().withMessage('Type is required'),
  body('size').isIn(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'One Size']).withMessage('Invalid size'),
  body('condition').isIn(['new', 'like-new', 'good', 'fair', 'poor']).withMessage('Invalid condition'),
  body('pointsValue').isInt({ min: 1, max: 200 }).withMessage('Points value must be between 1 and 200')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    const {
      title,
      description,
      category,
      type,
      size,
      condition,
      pointsValue,
      brand,
      color,
      material,
      tags
    } = req.body;

    const images = req.files.map(file => `/uploads/${file.filename}`);
    const parsedTags = tags ? (typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : tags) : [];

    const item = new Item({
      title,
      description,
      category,
      type,
      size,
      condition,
      pointsValue: parseInt(pointsValue),
      brand: brand || '',
      color: color || '',
      material: material || '',
      tags: parsedTags,
      images,
      owner: req.user.id
    });

    await item.save();

    // Add item to user's uploaded items
    await User.findByIdAndUpdate(req.user.id, {
      $push: { itemsUploaded: item._id }
    });

    res.status(201).json({
      message: 'Item created successfully and pending approval',
      item
    });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/items/:id
// @desc    Update item
// @access  Private
router.put('/:id', auth, [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('category').optional().isIn(['tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'accessories', 'other']).withMessage('Invalid category'),
  body('pointsValue').optional().isInt({ min: 1, max: 200 }).withMessage('Points value must be between 1 and 200')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if user owns the item
    if (item.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this item' });
    }

    // Update only provided fields
    const updateFields = {};
    const allowedFields = ['title', 'description', 'category', 'type', 'size', 'condition', 'pointsValue', 'brand', 'color', 'material', 'tags'];
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });

    if (req.body.tags) {
      updateFields.tags = typeof req.body.tags === 'string' ? req.body.tags.split(',').map(tag => tag.trim()) : req.body.tags;
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    ).populate('owner', 'firstName lastName rating');

    res.json({
      message: 'Item updated successfully',
      item: updatedItem
    });
  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/items/:id
// @desc    Delete item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if user owns the item
    if (item.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    // Check if item is involved in any active swaps
    if (item.status === 'pending') {
      return res.status(400).json({ message: 'Cannot delete item with pending swaps' });
    }

    await Item.findByIdAndDelete(req.params.id);

    // Remove item from user's uploaded items
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { itemsUploaded: req.params.id }
    });

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/items/:id/like
// @desc    Like/unlike an item
// @access  Private
router.post('/:id/like', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const userLiked = item.likes.includes(req.user.id);

    if (userLiked) {
      // Unlike the item
      item.likes = item.likes.filter(like => like.toString() !== req.user.id);
    } else {
      // Like the item
      item.likes.push(req.user.id);
    }

    await item.save();

    res.json({
      message: userLiked ? 'Item unliked' : 'Item liked',
      liked: !userLiked,
      likesCount: item.likes.length
    });
  } catch (error) {
    console.error('Like item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/items/user/:userId
// @desc    Get items by user ID
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const items = await Item.find({
      owner: req.params.userId,
      approvalStatus: 'approved'
    })
      .populate('owner', 'firstName lastName rating')
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    console.error('Get user items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;