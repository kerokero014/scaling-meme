const User = require('../schema/userSchema');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const validationError = user.validateSync();
    if (validationError) {
      res.status(400).send(validationError);
    } else {
      await user.save();
      res.status(201).send(user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all users
exports.getAllUsers = async (_, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a user by id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a user by id
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a user by id
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
