'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    static associate(models) {
      Package.belongsTo(models.Destination, { foreignKey: 'id_destino' });
    }
  }

  Package.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    id_destino: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Destinations',
        key: 'id',
      },
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'Package',
  });

  return Package;
};
