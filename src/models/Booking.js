'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: 'id_usuario' });
      Booking.belongsTo(models.Package, { foreignKey: 'id_paquete' });
    }
  }

  Booking.init({
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    id_paquete: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Packages',
        key: 'id',
      },
    },
    booking_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'confirmed',
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });

  return Booking;
};
