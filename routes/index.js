const express = require('express');
const router = express.Router();

router.use('/user', require('./userRoutes'));

router.use('/plantrip', require('./plantripRoute'));

router.use('/', require('./swagger'));

module.exports = router;
