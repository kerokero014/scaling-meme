const SupplyController = require('../controller/supplyContr');
const express = require('express');
const router = express.Router();

//get single supply
router.get('/:id', SupplyController.getSupply);

router.get('/all', SupplyController.getSupplies);

router.get('/:category', SupplyController.getSuppliesByCategory);

router.post('/', SupplyController.createSupply);

router.put('/:supplyId', SupplyController.updateSupply);

router.delete('/:supplyId', SupplyController.deleteSupply);

module.exports = router;
