const PlanTripController = require('../controller/plantripContr');
const express = require('express');
const router = express.Router();


router.get('/', PlanTripController.getTrips);

router.post('/', PlanTripController.createTrip);

router.get('/:id', PlanTripController.getTrip);

router.put('/:id', PlanTripController.updateTrip);

router.delete('/:id', PlanTripController.deleteTrip);

module.exports = router;

