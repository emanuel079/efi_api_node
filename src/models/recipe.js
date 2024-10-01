'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {

  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación belongsTo con User
      Recipe.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }
  Recipe.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description2: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',  // Nombre de la tabla Users
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Recipe',
    timestamps: true,
  });
  return Recipe
};
