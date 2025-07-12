exports.getProfile = async (req, res) => {
    res.json(req.user);
  };
  
  exports.getMyItems = async (req, res) => {
    const items = await require('../models/Item').find({ uploader: req.user._id });
    res.json(items);
  };
  