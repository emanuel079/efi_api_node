const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};
require('dotenv').config();
console.log(process.env)
const sequelize = new Sequelize(process.env.DB_DATABASE, 
    process.env.DB_USERNAME,
     process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  });

// Inicialización de los modelos
db.User = require('./User')(sequelize, Sequelize.DataTypes);
db.Package = require('./Package')(sequelize, Sequelize.DataTypes);
db.Destination = require('./Destination')(sequelize, Sequelize.DataTypes);
db.Booking = require('./Booking')(sequelize, Sequelize.DataTypes);
db.Payment = require('./Payment')(sequelize, Sequelize.DataTypes);


// Asociaciones entre los modelos

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
