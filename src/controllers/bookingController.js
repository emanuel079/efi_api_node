'use strict';

const db = require('../models'); // Asegúrate de que la ruta sea correcta

// Crear una nueva reserva
const createBooking = async (req, res) => {
    try {
        const { id_usuario, id_paquete, booking_date } = req.body;
        const booking = await db.Booking.create({ id_usuario, id_paquete, booking_date });
        res.status(201).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creando la reserva' });
    }
};

// Obtener todas las reservas
const getBookings = async (req, res) => {
    try {
        const bookings = await db.Booking.findAll({
            include: [
                { model: db.User, attributes: ['id', 'name', 'email'] },
                { model: db.Package, attributes: ['id', 'name', 'description'] },
            ],
        });
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo las reservas' });
    }
};

// Obtener reservas por UserId
const getBookingsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;  // Obtenemos el UserId desde los parámetros de la URL
        const bookings = await db.Booking.findAll({
            where: { id_usuario: userId },  // Filtramos las reservas por el UserId
            include: [
                { model: db.User, attributes: ['id', 'name', 'email'] },
                { model: db.Package, attributes: ['id', 'name', 'description'] },
            ],
        });

        if (bookings.length === 0) {
            return res.status(404).json({ error: 'No se encontraron reservas para este usuario' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo las reservas para el usuario' });
    }
};

// Actualizar una reserva
const updateBooking = async (req, res) => {
    const { id } = req.params; // Obtener el ID de la reserva desde los parámetros de la URL

    try {
        const booking = await db.Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        const updatedBooking = await booking.update(req.body);
        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la reserva' });
    }
};

// Eliminar una reserva
const deleteBooking = async (req, res) => {
    const { id } = req.params; // Obtener el ID de la reserva desde los parámetros de la URL

    try {
        const booking = await db.Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        await booking.destroy();
        res.status(204).send(); // Respuesta sin contenido
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la reserva' });
    }
};

module.exports = {
    createBooking,
    getBookings,
    getBookingsByUserId,
    updateBooking,
    deleteBooking,
};
