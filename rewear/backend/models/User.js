const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  profilePicture: {
    type: String,
    default: ''
  },
  points: {
    type: Number,
    default: 100 // Starting points for new users
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: '',
    maxlength: 500
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  itemsUploaded: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }],
  swapHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Swap'
  }],
  rating: {
    type: Number,
    default: 5.0,
    min: 1,
    max: 5
  },
  totalRatings: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get full name virtual
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Transform JSON output
userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);