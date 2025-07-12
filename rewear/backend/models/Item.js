const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  category: {
    type: String,
    required: true,
    enum: ['tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'accessories', 'other']
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  size: {
    type: String,
    required: true,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'One Size']
  },
  condition: {
    type: String,
    required: true,
    enum: ['new', 'like-new', 'good', 'fair', 'poor']
  },
  images: [{
    type: String,
    required: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pointsValue: {
    type: Number,
    required: true,
    default: 50
  },
  status: {
    type: String,
    enum: ['available', 'pending', 'swapped', 'inactive'],
    default: 'available'
  },
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  brand: {
    type: String,
    trim: true,
    default: ''
  },
  color: {
    type: String,
    trim: true,
    default: ''
  },
  material: {
    type: String,
    trim: true,
    default: ''
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
itemSchema.index({ category: 1, status: 1 });
itemSchema.index({ owner: 1, status: 1 });
itemSchema.index({ tags: 1 });
itemSchema.index({ createdAt: -1 });

// Transform JSON output
itemSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Item', itemSchema);