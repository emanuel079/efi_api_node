const express = require('express');
const {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
} = require('../controllers/paymentController'); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Crear un nuevo pago
router.post('/payments', createPayment);

// Obtener todos los pagos
router.get('/payments', getPayments);

// Obtener un pago por ID
router.get('/payments/:id', getPaymentById);

// Actualizar un pago
router.put('/payments/:id', updatePayment);

// Eliminar un pago
router.delete('/payments/:id', deletePayment);

module.exports = router;
