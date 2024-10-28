const express = require('express');
const {
    createBooking,
    getBookings,
    getBookingsByUserId,
    updateBooking,
    deleteBooking,
} = require('../controllers/bookingController'); // Asegúrate de que la ruta sea correcta

const router = express.Router();

router.post('/bookings', createBooking);
router.get('/bookings', getBookings);
router.get('/bookings/:id', getBookingsByUserId);
router.put('/bookings/:id', updateBooking);
router.delete('/bookings/:id', deleteBooking);

module.exports = router;
