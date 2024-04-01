const SupplyController = require('../controller/supplyContr');
const express = require('express');
const router = express.Router();

//get single supply
router.get('/', SupplyController.getSupply);

router.get('/', SupplyController.getSupplies);
// SINGLE ROUTE FOR GETTING SUPPLIES BY CATEGORY
router.get('/:category', SupplyController.getSuppliesByCategory);

router.post('/', SupplyController.createSupply);

router.put('/:supplyId', SupplyController.updateSupply);

router.delete('/:supplyId', SupplyController.deleteSupply);

module.exports = router;
