'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    static associate(models) {
      Destination.hasMany(models.Package, { foreignKey: 'id_destino' });
      
    } 
  }

  Destination.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  }, {
    sequelize,
    modelName: 'Destination',
  });

  return Destination;
};
