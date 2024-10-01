const db = require('../models');

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await db.User.create({ name, email, password, role });
    res.status(201).json(user);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: 'Error creando el usuario' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: 'Error obteniendo los usuarios' });
  }
};

module.exports = { createUser, getUsers };
