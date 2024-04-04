const SupplyController = require('../controller/supplyContr');
const express = require('express');
const router = express.Router();

//get single supply
router.get('/:id', SupplyController.getSupply);

router.get('/', SupplyController.getAllSupplies);

router.get('supply/:name', SupplyController.getSuppliesByCategory);

router.post('/', SupplyController.createSupply);

router.put('/:id', SupplyController.updateSupply);

router.delete('/:id', SupplyController.deleteSupply);

module.exports = router;
