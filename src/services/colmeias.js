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

 
 module.exports = { cadastrarColmeia, listarColmeias };