const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


    const Colmeia = sequelize.define('Colmeia', {
      tipo_colmeia: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      estado: {
        type: DataTypes.ENUM('EM_CAMPO', 'VAZIA'),
        allowNull: false,
      },
    });
  
    
  module.exports = Colmeia;