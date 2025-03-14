const Colmeia = require("../models/colmeias");

const cadastrarColmeia = async (tipo, quantidade, estado) => {
  return await Colmeia.create({ tipo, quantidade, estado });
};

const listarColmeias = async () => {
  return await Colmeia.findAll();
};

module.exports = { cadastrarColmeia, listarColmeias };