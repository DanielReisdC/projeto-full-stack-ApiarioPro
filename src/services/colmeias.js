const Colmeia = require('../models/colmeias');

// Função para cadastrar ou atualizar uma colmeia
async function cadastrarColmeia(tipo, quantidade, estado, usuarioId) {
  // Verificando se já existe uma colmeia com o mesmo tipo, estado e usuário
  const colmeiaExistente = await Colmeia.findOne({
    where: { tipo, estado, usuarioId }
  });

  if (colmeiaExistente) {
    // Se existir, atualiza a quantidade da colmeia existente
    colmeiaExistente.quantidade += quantidade; // Soma a quantidade
    await colmeiaExistente.save();  // Salva as alterações no banco
    return colmeiaExistente;
  } else {
    // Se não existir, cria uma nova colmeia
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
    const colmeiaData = colmeia.dataValues;

    // Normalizando o estado para minúsculo e o tipo para maiúsculo
    const estado = colmeiaData.estado.toLowerCase();
    const tipo = colmeiaData.tipo.toUpperCase();

    // Agrupar as colmeias por tipo e estado
    if (estado === 'em_campo') {
      colmeiasPorEstado.em_campo[tipo] += colmeiaData.quantidade;
    } else if (estado === 'vazia') {
      colmeiasPorEstado.vazia[tipo] += colmeiaData.quantidade;
    }
  });

  // Retorna as colmeias agrupadas
  return colmeiasPorEstado;
}

// Função para atualizar a quantidade de uma colmeia específica
async function atualizarColmeia(usuarioId, tipo, estado, quantidade) {
  // Verifica se já existe uma colmeia com o mesmo tipo e estado
  const colmeiaExistente = await Colmeia.findOne({
    where: { usuarioId, tipo, estado }
  });

  if (!colmeiaExistente) {
    // Se a colmeia não for encontrada, tentamos verificar a colmeia no outro estado
    // Exemplo: se estamos alterando de 'vazia' para 'em_campo', procuramos a 'vazia'
    const colmeiaAlternativa = await Colmeia.findOne({
      where: { usuarioId, tipo, estado: estado === 'em_campo' ? 'vazia' : 'em_campo' }
    });

    if (colmeiaAlternativa) {
      // Atualiza o estado da colmeia para o novo estado e altera a quantidade
      colmeiaAlternativa.estado = estado;
      colmeiaAlternativa.quantidade = quantidade;
      await colmeiaAlternativa.save();
      return colmeiaAlternativa;
    }

    // Se não encontrar a colmeia nem no estado atual nem no estado alternativo, retorna null
    return null;
  }

  // Se encontrar a colmeia no estado atual, só atualizamos a quantidade
  colmeiaExistente.quantidade = quantidade;
  await colmeiaExistente.save();
  return colmeiaExistente;
}








module.exports = { cadastrarColmeia, listarColmeias, atualizarColmeia };
