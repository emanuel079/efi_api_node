const express = require('express');
const {
    createDestination,
    getDestinations,
    getDestinationById,
    updateDestination,
    deleteDestination,
} = require('../controllers/destinationController'); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Crear un nuevo destino
router.post('/destinations', createDestination);

// Obtener todos los destinos
router.get('/destinations', getDestinations);

// Obtener un destino por ID
router.get('/destinations/:id', getDestinationById);

// Actualizar un destino
router.put('/destinations/:id', updateDestination);

// Eliminar un destino
router.delete('/destinations/:id', deleteDestination);

module.exports = router;
