// models/colmeias.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuarios');

const Colmeia = sequelize.define('Colmeia', {
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: true,  // Permite valores nulos temporariamente
    references: {
      model: Usuario,
      key: 'id'
    }
  }
  
}, {
  timestamps: true
});

Colmeia.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = Colmeia;
