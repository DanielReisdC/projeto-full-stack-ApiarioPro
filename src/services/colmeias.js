const Colmeia = require("../models/colmeia");

const cadastrarColmeia = async (tipo, quantidade, estado) => {
  return await Colmeia.create({ tipo, quantidade, estado });
};

const listarColmeias = async () => {
  return await Colmeia.findAll();
};

module.exports = { cadastrarColmeia, listarColmeias };