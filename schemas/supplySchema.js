const mongoose = require('mongoose');

const SupplySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  category: {
    type: [String],
    required: true
  },
  website: {
    type: String
  }
});

module.exports = mongoose.model('Supply', SupplySchema);
