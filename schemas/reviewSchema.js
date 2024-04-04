const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    review_Author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    review_Date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);