// services/floradas.js
const Florada = require('../models/floradas');

// Função para cadastrar uma florada
async function cadastrarFlorada(nome, data_inicio, data_fim, usuarioId) {
  // Verificar se já existe uma florada com as mesmas datas para o mesmo usuário
  const floradaExistente = await Florada.findOne({
    where: {
      usuarioId,
      data_inicio: data_inicio,
      data_fim: data_fim
    }
  });

  if (floradaExistente) {
    // Se já existir, você pode optar por atualizar a florada ou retornar uma mensagem de erro
    throw new Error('Já existe uma florada cadastrada nesse período.');
  }

  // Caso não exista, cria uma nova florada
  const novaFlorada = await Florada.create({
    nome,
    data_inicio,
    data_fim,
    usuarioId
  });
  return novaFlorada;
}

// Função para listar todas as floradas de um usuário
async function listarFloradas(usuarioId) {
  const floradas = await Florada.findAll({ where: { usuarioId } });
  return floradas;
}
async function excluirFlorada(id) {
    try {
      const florada = await Florada.findByPk(id);
      if (!florada) {
        console.log(`Florada com id ${id} não encontrada.`);
        return null; // Florada não encontrada
      }
  
      await florada.destroy(); // Exclui a florada do banco
      return true; // Excluída com sucesso
    } catch (erro) {
      console.error("Erro ao excluir florada:", erro);
      throw erro; // Lança o erro para ser tratado na rota
    }
  }
  
module.exports = { cadastrarFlorada, listarFloradas, excluirFlorada };
