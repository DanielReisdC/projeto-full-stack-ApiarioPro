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
async function atualizarColmeia(usuarioId, tipo, estado, quantidade) {
  try {
    const colmeia = await Colmeia.findOne({ where: { usuarioId, tipo,estado } });
    
    if (!colmeia) {
      return null;  // Retorna null se a colmeia não for encontrada
    }

    // Atualiza os dados da colmeia
    colmeia.estado = estado;
    colmeia.quantidade = quantidade;

    await colmeia.save();
    return colmeia;  // Retorna a colmeia atualizada
  } catch (erro) {
    console.error('Erro na atualização da colmeia:', erro);
    throw erro;
  }
}




module.exports = { cadastrarColmeia, listarColmeias, atualizarColmeia};