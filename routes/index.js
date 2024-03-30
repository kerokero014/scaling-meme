const express = require('express');
const router = express.Router();

router.use('/user', require('./userRoutes'));

router.use('/', require('./swagger'));

module.exports = router;
