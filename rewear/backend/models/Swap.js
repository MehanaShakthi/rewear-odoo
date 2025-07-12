const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema({
  initiator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  initiatorItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: function() {
      return this.swapType === 'item-swap';
    }
  },
  recipientItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  swapType: {
    type: String,
    enum: ['item-swap', 'point-redemption'],
    required: true
  },
  pointsUsed: {
    type: Number,
    required: function() {
      return this.swapType === 'point-redemption';
    }
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  message: {
    type: String,
    maxlength: 500,
    default: ''
  },
  meetingDetails: {
    location: {
      type: String,
      default: ''
    },
    scheduledDate: {
      type: Date
    },
    notes: {
      type: String,
      maxlength: 300,
      default: ''
    }
  },
  ratings: {
    initiatorRating: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        maxlength: 200
      }
    },
    recipientRating: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        maxlength: 200
      }
    }
  },
  completedAt: {
    type: Date
  },
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
swapSchema.index({ initiator: 1, status: 1 });
swapSchema.index({ recipient: 1, status: 1 });
swapSchema.index({ status: 1, createdAt: -1 });

// Transform JSON output
swapSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Swap', swapSchema);