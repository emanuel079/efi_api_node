'use strict';

const db = require('../models'); // Asegúrate de que la ruta sea correcta

// Crear un paquete de viaje
const createPaquete = async (req, res) => {
    try {
        const { name, description, id_destino, start_date, end_date, price } = req.body; // Asegúrate de que estos campos coincidan con tu modelo
        const newPackage = await db.Package.create({ name, description, id_destino, start_date, end_date, price }); // Cambié 'package' a 'newPackage'
        res.status(201).json(newPackage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creando el paquete' });
    }
};

// Obtener todos los paquetes de viaje
const getAllPaquetes = async (req, res) => {
    try {
        const paquetes = await db.Package.findAll();
        res.status(200).json(paquetes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo los paquetes' });
    }
};

// Obtener un paquete por ID
const getPaqueteById = async (req, res) => {
    try {
        const { id } = req.params; // Obtenemos el ID desde los parámetros de la URL
        const paquete = await db.Package.findByPk(id);

        if (!paquete) {
            return res.status(404).json({ error: 'Paquete no encontrado' });
        }

        res.status(200).json(paquete);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo el paquete' });
    }
};

// Actualizar un paquete
const updatePaquete = async (req, res) => {
    try {
        const { id } = req.params; // Obtenemos el ID desde los parámetros de la URL
        const paquete = await db.Package.findByPk(id);

        if (!paquete) {
            return res.status(404).json({ error: 'Paquete no encontrado' });
        }

        const updatedPaquete = await paquete.update(req.body);
        res.status(200).json(updatedPaquete);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el paquete' });
    }
};

// Eliminar un paquete
const deletePaquete = async (req, res) => {
    try {
        const { id } = req.params; // Obtenemos el ID desde los parámetros de la URL
        const paquete = await db.Package.findByPk(id);

        if (!paquete) {
            return res.status(404).json({ error: 'Paquete no encontrado' });
        }

        await paquete.destroy();
        res.status(204).send(); // Respuesta sin contenido
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el paquete' });
    }
};

module.exports = {
    createPaquete,
    getAllPaquetes,
    getPaqueteById,
    updatePaquete,
    deletePaquete,
};
