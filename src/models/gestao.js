const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Certifique-se de que o caminho está correto
const Usuario = require('./usuarios');
const Gestao = sequelize.define("Gestao", {
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  florada: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidade_mes: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantidade_florada: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Usuarios", // Nome da tabela de usuários no banco
      key: 'id' // A coluna que será referenciada
    }
  }
}, {
  tableName: 'Gestao', // Nome da tabela com a primeira letra maiúscula
  underscored: true, // Adiciona automaticamente o uso de snake_case (ex: quantidade_mes ao invés de quantidadeMes)
});

Gestao.belongsTo(Usuario, { foreignKey: 'usuarioId' });
module.exports = Gestao;
