// services/gestao.js
const { Gestao } = require('../models'); // Corrigido para o modelo Gestao

// Função para cadastrar uma produção de mel
async function cadastrarProducao(quantidade_florada, florada, quantidade_mes, mes, ano, usuarioId) {
  // Verificar se já existe uma produção registrada para o mesmo mês e ano para o usuário
  const producaoExistente = await Gestao.findOne({
    where: {
      usuarioId,
      mes,
      ano
    }
  });

  if (producaoExistente) {
    // Se já existir, você pode optar por atualizar ou retornar um erro
    throw new Error('Já existe uma produção cadastrada para esse mês e ano.');
  }

  // Caso não exista, cria uma nova produção
  const novaProducao = await Gestao.create({
    quantidade_florada,
    florada,
    quantidade_mes,
    mes,
    ano,
    usuarioId
  });

  return novaProducao;
}

// Função para listar todas as produções de um usuário
async function listarProducoes(usuarioId) {
  try {
    const producoes = await Gestao.findAll({
      where: { usuarioId }
    });
    return producoes;
  } catch (erro) {
    console.error('Erro ao buscar produções:', erro); // Logando o erro no servidor
    throw new Error('Erro ao buscar produções');
  }
}

// Função para excluir uma produção
async function excluirProducao(usuarioId, ano) {
    // Procurar pela produção do usuário no ano especificado
    const producao = await Gestao.findOne({
      where: {
        usuarioId, // Buscar a produção do usuário
        ano // Buscar pelo ano
      }
    });
  
    if (!producao) {
      throw new Error('Produção não encontrada ou não pertence ao usuário.');
    }
  
    // Exclui a produção do banco de dados
    await producao.destroy();
    return true;
  }
  
module.exports = { cadastrarProducao, listarProducoes, excluirProducao };
