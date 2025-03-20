const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Usuario = require("./usuarios"); // Importando o model de Usuário

const Apiario = sequelize.define("Apiario", {
  regiao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  florada: {
    type: DataTypes.STRING,
    allowNull: false
  },
  colmeias: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imagem: {
    type: DataTypes.TEXT, // Armazena a imagem em Base64
    allowNull: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

// Definindo a relação: Um usuário pode ter vários apiários
Apiario.belongsTo(Usuario, { foreignKey: "usuarioId" });

module.exports = Apiario;
