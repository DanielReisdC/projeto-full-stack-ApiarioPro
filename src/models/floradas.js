const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Certifique-se de que o caminho está correto

const Florada = sequelize.define("Florada", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_inicio: {
    type: DataTypes.STRING, // Mês como string
    allowNull: false,
  },
  data_fim: {
    type: DataTypes.STRING, // Mês como string
    allowNull: false,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuarios', // Nome da tabela de usuários no banco
      key: 'id' // A coluna que será referenciada
    }
  }
});


module.exports = Florada;
