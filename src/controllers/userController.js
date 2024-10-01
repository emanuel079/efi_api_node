const db = require('../models');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
  try {
    // Extraemos los datos del cuerpo de la solicitud (name, email, password, role)
    const { name, email, password, role } = req.body;

    // Creamos un nuevo usuario en la base de datos utilizando Sequelize
    const user = await db.User.create({ name, email, password, role });

    // Devolvemos una respuesta con el usuario recién creado
    res.status(201).json(user);
  } catch (error) {
    console.error(error); // Imprime cualquier error en la consola
    res.status(500).json({ error: 'Error creando el usuario' }); // Enviamos un mensaje de error si algo falla
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body; // Extraemos email y password del request

  try {
    // Buscamos el usuario por email
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' }); // Si el usuario no existe, devolvemos error
    }

    // Comparamos la contraseña ingresada con la contraseña hasheada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' }); // Si no coincide, devolvemos un error
    }
    res.status(200).json({ message: 'Login exitoso' });
  } catch (error) {
    console.error(error); // Imprime el error en consola si ocurre
    res.status(500).json({ error: 'Error en el login' }); // Devuelve un mensaje de error si hay un problema en el servidor
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


const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo el usuario' });
  }
};

module.exports = { createUser, getUsers, getUserById, loginUser };
