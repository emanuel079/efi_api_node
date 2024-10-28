const express = require('express');
const { createUser, getUsers, getUserById, loginUser } = require('../controllers/userController'); // Asegúrate de que la ruta a userController sea correcta
const router = express.Router();

// Rutas para usuarios
router.post('/users', createUser);             // Crear un nuevo usuario
router.get('/users', getUsers);                 // Obtener todos los usuarios
router.get('/users/:id', getUserById);          // Obtener un usuario por ID
router.post('/users/login', loginUser);         // Ruta para el inicio de sesión

module.exports = router;                         // Exporta el router
