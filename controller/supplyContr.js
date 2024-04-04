const Supply = require('../schemas/supplySchema');

// controller for getting all supplies
exports.getAllSupplies = async (req, res) => {
  try {
    const supplies = await Supply.find();
    res.status(200).json(supplies);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// controller for getting a supply by id
exports.getSupply = async (req, res) => {
  try {
    const supply = await Supply.findById(req.params.id);
    res.status(200).json(supply);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// controller for getting supplies by category
exports.getSuppliesByCategory = async (req, res) => {
  try {
    const supplies = await Supply.find({ category: req.params.category });
    res.status(200).json(supplies);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// controller for creating a new supply
exports.createSupply = async (req, res) => {
  const supply = new Supply({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    website: req.body.website
  });

  try {
    const savedSupply = await supply.save();
    res.status(201).json(savedSupply);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// controller for updating a supply
exports.updateSupply = async (req, res) => {
  try {
    const updatedSupply = await Supply.updateOne(
      { _id: req.params.supplyId },
      {
        $set: {
          name: req.body.name,
          quantity: req.body.quantity,
          price: req.body.price,
          description: req.body.description,
          image: req.body.image,
          category: req.body.category,
          website: req.body.website
        }
      }
    );
    res.status(200).json(updatedSupply);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// controller for deleting a supply
exports.deleteSupply = async (req, res) => {
  try {
    const removedSupply = await Supply.remove({ _id: req.params.supplyId });
    res.status(200).json(removedSupply);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
