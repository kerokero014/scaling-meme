const Supply = require('../schemas/supplySchema');
const multer = require('multer');
const upload = multer();

// controller for getting all supplies
exports.getAllSupplies = async (req, res) => {
  try {
    const supplies = await Supply.find();
    res.status(200).send(supplies);
  } catch (err) {
    console.error('Error fetching supplies:', err);
    res.status(500).json({ success: false, message: 'Server error' });
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
    res.status(500).json({ message: err.message });
  }
};

// controller for creating a new supply
exports.createSupply = upload.single('image'), async (req, res) => {
  let imageBase64 = null;
  if (req.file) {
    // Convert the image file to a Base64 string
    imageBase64 = req.file.buffer.toString('base64');
  }

  const supply = new Supply({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description,
    image: imageBase64, // Save Base64 string of the image
    category: req.body.category,
    website: req.body.website
  });

  try {
    const savedSupply = await supply.save();
    res.status(201).json(savedSupply);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// controller for updating a supply
exports.updateSupply = async (req, res) => {
  try {
    const updatedSupply = await Supply.findByIdAndUpdate(
      req.params.id,
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
      },
      { new: true } // This option returns the modified document.
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
