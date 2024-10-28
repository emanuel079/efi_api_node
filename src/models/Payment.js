'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.Booking, { foreignKey: 'id_reserva' });
    }
  }

  Payment.init({
    id_reserva: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Bookings',
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  }, {
    sequelize,
    modelName: 'Payment',
  });

  return Payment;
};
