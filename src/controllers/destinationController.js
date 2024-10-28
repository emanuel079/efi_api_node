'use strict';

const db = require('../models'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo destino
const createDestination = async (req, res) => {
    try {
        const { name, description, category } = req.body;
        const destination = await db.Destination.create({ name, description, category });
        res.status(201).json(destination);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creando el destino' });
    }
};

// Obtener todos los destinos
const getDestinations = async (req, res) => {
    try {
        const destinations = await db.Destination.findAll();
        res.status(200).json(destinations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo los destinos' });
    }
};

// Obtener un destino por ID
const getDestinationById = async (req, res) => {
    const { id } = req.params; // Obtener el ID del destino desde los parámetros de la URL

    try {
        const destination = await db.Destination.findByPk(id);
        if (!destination) {
            return res.status(404).json({ error: 'Destino no encontrado' });
        }
        res.status(200).json(destination);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo el destino' });
    }
};

// Actualizar un destino
const updateDestination = async (req, res) => {
    const { id } = req.params; // Obtener el ID del destino desde los parámetros de la URL

    try {
        const destination = await db.Destination.findByPk(id);
        if (!destination) {
            return res.status(404).json({ error: 'Destino no encontrado' });
        }

        const updatedDestination = await destination.update(req.body);
        res.status(200).json(updatedDestination);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el destino' });
    }
};

// Eliminar un destino
const deleteDestination = async (req, res) => {
    const { id } = req.params; // Obtener el ID del destino desde los parámetros de la URL

    try {
        const destination = await db.Destination.findByPk(id);
        if (!destination) {
            return res.status(404).json({ error: 'Destino no encontrado' });
        }

        await destination.destroy();
        res.status(204).send(); // Respuesta sin contenido
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el destino' });
    }
};

module.exports = {
    createDestination,
    getDestinations,
    getDestinationById,
    updateDestination,
    deleteDestination,
};
