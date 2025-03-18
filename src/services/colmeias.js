 // services/colmeias.js
 const Colmeia = require('../models/colmeias');

 // Função para cadastrar uma colmeia
 const cadastrarColmeia = async (usuarioId, tipo_colmeia, quantidade, estado) => {
  try {
      // Verifica se já existe uma colmeia do mesmo tipo e estado para o usuário
      const colmeiaExistente = await Colmeia.findOne({
          where: { usuarioId, tipo_colmeia, estado }
      });

      if (colmeiaExistente) {
          // Se já existe, atualiza a quantidade
          await colmeiaExistente.update({ quantidade });
      } else {
          // Se não existe, cria um novo registro
          await Colmeia.create({ usuarioId, tipo_colmeia, quantidade, estado });
      }

      return { success: true, message: "Colmeia cadastrada/atualizada com sucesso" };
  } catch (error) {
      console.error("Erro ao cadastrar colmeia:", error);
      throw new Error("Erro ao cadastrar colmeia");
  }
};
const cadastrarOuAtualizarColmeia = async (usuarioId, tipo_colmeia, quantidade, estado) => {
  try {
    // Verifica se já existe uma colmeia com o mesmo tipo, estado e usuarioId
    const colmeiaExistente = await Colmeia.findOne({
      where: { usuarioId, tipo_colmeia, estado }
    });

    if (colmeiaExistente) {
      // Se a colmeia existir, atualiza a quantidade com o valor enviado
      await colmeiaExistente.update({ quantidade });
    } else {
      // Se a colmeia não existir, cria uma nova com a quantidade fornecida
      await Colmeia.create({ usuarioId, tipo_colmeia, quantidade, estado });
    }

    return { success: true, message: "Colmeia cadastrada/atualizada com sucesso" };
  } catch (error) {
    console.error("Erro ao cadastrar ou atualizar colmeia:", error);
    return { success: false, message: "Erro ao processar colmeia", error };
  }
};
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
    // Acesse os dados corretamente (em caso de Sequelize retornar instâncias)
    const colmeiaData = colmeia.dataValues;

    // Garantir que tipo e estado estejam consistentes (forçando maiúsculas e minúsculas)
    const estado = colmeiaData.estado.toLowerCase();  // Normalizando estado para minúsculo
    const tipo = colmeiaData.tipo.toUpperCase();      // Normalizando tipo para maiúsculo

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

 
 module.exports = { cadastrarColmeia, listarColmeias, cadastrarOuAtualizarColmeia  };