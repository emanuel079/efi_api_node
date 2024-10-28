'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Crear Usuarios
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'user',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Crear Destinations
    await queryInterface.createTable('Destinations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Crear Packages
    await queryInterface.createTable('Packages', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      id_destino: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Destinations', // Referencia a Destinations
          key: 'id',
        },
      },
      fecha_inicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fecha_fin: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      precio: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      disponibilidad: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Crear Bookings
    await queryInterface.createTable('Bookings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Referencia a Users
          key: 'id',
        },
      },
      id_paquete: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Packages', // Referencia a Packages
          key: 'id',
        },
      },
      booking_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'confirmed',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Crear Payments
    await queryInterface.createTable('Payments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_reserva: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Bookings', // Referencia a Bookings
          key: 'id',
        },
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      payment_method: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'pending',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
    await queryInterface.dropTable('Bookings');
    await queryInterface.dropTable('Packages');
    await queryInterface.dropTable('Destinations');
    await queryInterface.dropTable('Users');
  }
};
