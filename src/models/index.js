const sequelize = require("../config/database");
const Usuario = require("./usuarios");
const Colmeia = require("./colmeias");
const Florada = require("./floradas"); // <-- Adicione essa linha!
const Apiario = require("./apiarios");

const sincronizarModelos = async () => {
  try {
    await sequelize.sync({ alter: true }); // Isso cria ou atualiza as tabelas
    console.log("Modelos sincronizados com sucesso!");
  } catch (error) {
    console.error("Erro ao sincronizar modelos:", error);
  }
};

// Exportando todos os modelos corretamente
module.exports = { sequelize, Usuario, Colmeia, Florada, Apiario, sincronizarModelos }; // <-- Adicione "Florada" aqui!
