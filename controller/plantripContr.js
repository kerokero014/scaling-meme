const PlanTrip = require('../schemas/ptripSchema');
const User = require('../schemas/userSchema');

//create a trip
exports.createTrip = async (req, res) => {
  try {
    const { tripName, tripDate, tripLocation, createdBy, tripDescription, tripImage } = req.body;
    const newTrip = new PlanTrip({
      tripName,
      tripDate,
      tripLocation,
      createdBy,
      tripDescription,
      tripImage
    });
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get all trips
exports.getTrips = async (req, res) => {
  try {
    const trips = await PlanTrip.find().populate('createdBy', 'username');
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get a single trip
exports.getTrip = async (req, res) => {
  try {
    const trip = await PlanTrip.findById(req.params.id).populate('createdBy', 'username');
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get trips created by a user
exports.getMyTrips = async (req, res) => {
  try {
    const trips = await PlanTrip.find({ createdBy: req.user.id }).populate('createdBy', 'username');
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update a trip by user who created it
exports.updateTrip = async (req, res) => {
  try {
    const trip = await PlanTrip.findById(req.params.id);
    if (trip.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'You are not authorized to update this trip' });
    }
    const updatedTrip = await PlanTrip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTrip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete a trip by user who created it
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await PlanTrip.findById(req.params.id);
    if (trip.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'You are not authorized to delete this trip' });
    }
    await PlanTrip.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trip deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get trips by location
exports.getTripsByLocation = async (req, res) => {
  try {
    const trips = await PlanTrip.find({ triplocation: req.params.location }).populate(
      'createdBy',
      'username'
    );
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
