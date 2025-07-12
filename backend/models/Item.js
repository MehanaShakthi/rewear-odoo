
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  type: { type: String }, // e.g., 'Shirt', 'Jeans'
  size: { type: String },
  condition: { type: String }, // e.g., New, Used
  tags: [String],
  image: { type: String }, // image filename
  status: { type: String, default: 'available' }, // available, swapped, redeemed
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
