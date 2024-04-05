const PlanTrip = require('../schemas/ptripSchema');
const User = require('../schemas/userSchema');

exports.createTrip = async (req, res) => {
  try {
    const { tripName, tripDate, tripLocation, tripDescription } = req.body;
    if (!tripName || !tripDate || !tripLocation || !tripDescription) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create new trip object
    const newTrip = new PlanTrip({
      tripName: tripName,
      tripDate: new Date(tripDate), // Convert string to Date object
      tripLocation: tripLocation,
      createdBy: req.user.id,
      tripDescription: tripDescription,
      tripImage: req.file ? req.file.path : null // Handle file upload
    });

    // Save trip to database
    const trip = await newTrip.save();

    res.status(201).json(trip);
  } catch (err) {
    // Handle errors
    console.error("Error creating trip:", err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Internal server error." });
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
