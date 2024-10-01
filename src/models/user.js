'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs'); // Importar bcrypt

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Recipe, { foreignKey: 'UserId' });
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    hooks: {
      // Hook antes de crear un nuevo usuario
      beforeCreate: async (user, options) => {
        // Generamos un "salt" para el hash
        const salt = await bcrypt.genSalt(10);
        // Hasheamos la contraseña del usuario usando el salt generado
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  });

  return User;
};
