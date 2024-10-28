'use strict';

const db = require('../models'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo pago
const createPayment = async (req, res) => {
    try {
        const { id_reserva, amount, payment_method } = req.body;
        const payment = await db.Payment.create({ id_reserva, amount, payment_method });
        res.status(201).json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creando el pago' });
    }
};

// Obtener todos los pagos
const getPayments = async (req, res) => {
    try {
        const payments = await db.Payment.findAll({
            include: {
                model: db.Booking,
                attributes: ['id', 'status'], // Incluir información relevante del Booking
            }
        });
        res.status(200).json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo los pagos' });
    }
};

// Obtener un pago por ID
const getPaymentById = async (req, res) => {
    const { id } = req.params; // Obtener el ID del pago desde los parámetros de la URL

    try {
        const payment = await db.Payment.findByPk(id, {
            include: {
                model: db.Booking,
                attributes: ['id', 'status'], // Incluir información relevante del Booking
            }
        });
        if (!payment) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }
        res.status(200).json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo el pago' });
    }
};

// Actualizar un pago
const updatePayment = async (req, res) => {
    const { id } = req.params; // Obtener el ID del pago desde los parámetros de la URL

    try {
        const payment = await db.Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }

        const updatedPayment = await payment.update(req.body);
        res.status(200).json(updatedPayment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el pago' });
    }
};

// Eliminar un pago
const deletePayment = async (req, res) => {
    const { id } = req.params; // Obtener el ID del pago desde los parámetros de la URL

    try {
        const payment = await db.Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }

        await payment.destroy();
        res.status(204).send(); // Respuesta sin contenido
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el pago' });
    }
};

module.exports = {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
};
