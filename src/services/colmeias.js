const Colmeia = require("../models/colmeias");

const cadastrarColmeia = async (tipo, quantidade, estado, usuarioId) => {
  return await Colmeia.create({ tipo, quantidade, estado, usuarioId });
};

const listarColmeias = async (usuarioId) => {
  return await Colmeia.findAll({ where: { usuarioId } });
};

module.exports = { cadastrarColmeia, listarColmeias };
