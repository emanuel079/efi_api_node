const { Sequelize } = require('sequelize');

// Conexión al servidor MySQL (sin especificar la base de datos)
const sequelize = new Sequelize('mysql://root:Lauti2002!@127.0.0.1:4000', {
    dialect: 'mysql',
});

async function createDatabase() {
    try {
        // Ejecutar una consulta SQL para crear la base de datos
        await sequelize.query('CREATE DATABASE IF NOT EXISTS efi_node;');
        console.log('Base de datos creada exitosamente.');
    } catch (error) {
        console.error('Error al crear la base de datos:', error);
    } finally {
        await sequelize.close();
    }
}

createDatabase();
