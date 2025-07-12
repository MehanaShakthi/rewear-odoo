const express = require('express');
const router = express.Router();
const { createItem } = require('../controllers/itemController');
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// POST /api/items (protected, with image)
router.post('/', protect, upload.single('image'), createItem);

module.exports = router;
