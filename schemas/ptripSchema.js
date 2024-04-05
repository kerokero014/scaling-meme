//Schema for Planning trips using mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanTripSchema = new Schema({
  tripname: {
    type: String,
    required: true
  },
  tripdate: {
    type: Date,
    required: true
  },
  triplocation: {
    type: String,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  tripdescription: {
    type: String,
    required: true
  },
  tripimage: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('PlanTrip', PlanTripSchema);
