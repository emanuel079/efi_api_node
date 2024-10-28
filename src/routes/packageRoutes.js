const express = require('express');
const {
    createPaquete,
    getAllPaquetes,
    getPaqueteById,
    updatePaquete,
    deletePaquete,
} = require('../controllers/packageController');

const router = express.Router();

// Definición de rutas
router.post('/packages', createPaquete);               // Crear un nuevo paquete
router.get('/packages', getAllPaquetes);               // Obtener todos los paquetes
router.get('/packages/:id', getPaqueteById);          // Obtener un paquete por ID
router.put('/packages/:id', updatePaquete);           // Actualizar un paquete por ID
router.delete('/packages/:id', deletePaquete);        // Eliminar un paquete por ID

module.exports = router;
