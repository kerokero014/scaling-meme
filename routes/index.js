const express = require('express');
const router = express.Router();

router.use('/user', require('./userRoutes'));

router.use('/plantrip', require('./plantripRoutes'));

router.use('/supply', require('./supplyRoutes'));

router.use('/', require('./swagger'));

module.exports = router;
