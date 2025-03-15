// services/colmeias.js
const Colmeia = require('../models/colmeias');

// Função para cadastrar uma colmeia
async function cadastrarColmeia(tipo, quantidade, estado, usuarioId) {
  // Verificando se a colmeia já existe para o mesmo tipo e estado
  const colmeiaExistente = await Colmeia.findOne({
    where: { tipo, estado, usuarioId }
  });

  if (colmeiaExistente) {
    // Se existir, atualiza a quantidade
    colmeiaExistente.quantidade += quantidade;
    await colmeiaExistente.save();
    return colmeiaExistente;
  } else {
    // Se não existir, cria uma nova
    const novaColmeia = await Colmeia.create({
      tipo,
      quantidade,
      estado,
      usuarioId
    });
    return novaColmeia;
  }
}

// Função para listar as colmeias de um usuário específico, agrupadas por estado e tipo
async function listarColmeias(usuarioId) {
  const colmeias = await Colmeia.findAll({
    where: { usuarioId }
  });

  // Estrutura para armazenar as colmeias agrupadas por estado e tipo
  const colmeiasPorEstado = {
    em_campo: {
      NINHO: 0,
      MELGUEIRA: 0,
      NUCLEO: 0,
    },
    vazia: {
      NINHO: 0,
      MELGUEIRA: 0,
      NUCLEO: 0,
    }
  };

  // Itera sobre as colmeias e agrupa as quantidades por estado e tipo
  colmeias.forEach(colmeia => {
    if (colmeia.estado === 'em_campo') {
      colmeiasPorEstado.em_campo[colmeia.tipo] += colmeia.quantidade;
    } else if (colmeia.estado === 'vazia') {
      colmeiasPorEstado.vazia[colmeia.tipo] += colmeia.quantidade;
    }
  });

  // Retorna a estrutura com as colmeias agrupadas
  return colmeiasPorEstado;
}

module.exports = { cadastrarColmeia, listarColmeias };
