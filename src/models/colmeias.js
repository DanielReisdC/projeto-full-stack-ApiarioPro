const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Colmeia = sequelize.define("Colmeia", {
  tipo: {
    type: DataTypes.ENUM("MELGUEIRA", "NINHO", "NUCLEO"),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM("VAZIA", "EM_CAMPO"),
    allowNull: false,
  },
});

module.exports = Colmeia;
