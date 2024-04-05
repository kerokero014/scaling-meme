//Schema for Planning trips using mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanTripSchema = new Schema({
  tripName: {
    type: String,
    required: true
  },
  tripDate: {
    type: Date,
    required: true
  },
  tripLocation: {
    type: String,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  tripDescription: {
    type: String,
    required: true
  },
  tripImage: {
    type: String
  }
});

module.exports = mongoose.model('PlanTrip', PlanTripSchema);
