require('dotenv').config();

module.exports = {
  development: {
    username: "root",
    password: "Lauti2002!",
    database:  "efi_node",
    host: "127.0.0.1",
    dialect: "mysql",
    
  },
  production: {
    username: "root",
    password: "Lauti2002!",
    database:  "efi_node",
    host:  "127.0.0.1",
    dialect: "mysql",
    
  },
};