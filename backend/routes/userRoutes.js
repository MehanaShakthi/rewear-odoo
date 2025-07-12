const r = require('express').Router();
const auth = require('../middleware/authMiddleware');
const c = require('../controllers/userController');

r.get('/profile', auth, c.getProfile);
r.get('/my-items', auth, c.getMyItems);

module.exports = r;
