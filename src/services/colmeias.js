const Colmeia = require('../models/colmeias');

// Função para cadastrar ou atualizar uma colmeia
async function cadastrarColmeia(tipo, quantidade, estado, usuarioId) {
  // Verificando se já existe uma colmeia com o mesmo tipo, estado e usuário
  const colmeiaExistente = await Colmeia.findOne({
    where: { tipo, estado, usuarioId }
  });

  if (colmeiaExistente) {
    // Se existir, soma a quantidade da colmeia existente com a nova quantidade
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
async function atualizarColmeia(id, quantidade) {
  const colmeia = await Colmeia.findByPk(id);  // Encontra a colmeia pelo ID

  if (!colmeia) {
    throw new Error("Colmeia não encontrada");
  }

  colmeia.quantidade = quantidade;  // Atualiza a quantidade
  await colmeia.save();  // Salva a alteração no banco de dados

  return colmeia;
}


module.exports = { cadastrarColmeia, listarColmeias, atualizarColmeia};