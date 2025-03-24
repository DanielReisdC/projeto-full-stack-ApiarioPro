// services/gestao.js
const { Gestao } = require('../models'); // Corrigido para o modelo Gestao

// Função para cadastrar uma produção de mel
async function cadastrarProducao(quantidade_florada, florada, quantidade_mes, mes, ano, usuarioId) {
    // Verificar se já existe uma produção registrada para o mesmo mês, ano e florada para o usuário
    const producaoExistente = await Gestao.findOne({
      where: {
        usuarioId,
        mes,
        ano,
        florada // Verifica se já existe uma produção para a mesma florada no mês e ano
      }
    });
  
    if (producaoExistente) {
      // Se já existir, você pode retornar uma mensagem dizendo que já existe uma produção para essa florada
      throw new Error(`Já existe uma produção cadastrada para a florada '${florada}' no mês ${mes} e ano ${ano}.`);
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
async function listarProducoes(usuarioId, ano) {
    try {
      const producoes = await Gestao.findAll({
        where: { 
          usuarioId,
          ano // Filtra também pelo ano
        }
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
