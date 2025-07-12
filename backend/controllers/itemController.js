const Item = require('../models/Item');

exports.createItem = async (req, res) => {
  try {
    const { title, description, category, type, size, condition, tags } = req.body;
    const image = req.file ? req.file.filename : null;

    const item = new Item({
      title,
      description,
      category,
      type,
      size,
      condition,
      tags: tags?.split(',') || [],
      image,
      uploader: req.user._id
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add item', error: err.message });
  }
};
