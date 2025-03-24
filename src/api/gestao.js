// api/gestao.js
const express = require('express');
const router = express.Router();
const { cadastrarProducao, listarProducoes, excluirProducao } = require('../services/gestao');
const verificarToken = require('../middleware/autenticacao');
const jwt = require('jsonwebtoken');
const { Gestao } = require('../models');

// Rota para cadastrar uma produção de mel
router.post('/cadastrar', verificarToken, async (req, res) => {
  const { quantidade_florada, florada, quantidade_mes, mes, ano } = req.body;
  
  try {
    const token = req.headers.authorization.split(' ')[1]; // Obtém o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica o token
    const usuarioId = decoded.id;

    if (!quantidade_florada || !florada || !quantidade_mes || !mes || !ano) {
      return res.status(400).json({ mensagem: "Preencha todos os campos." });
    }

    const novaProducao = await cadastrarProducao(quantidade_florada, florada, quantidade_mes, mes, ano, usuarioId);
    res.status(201).json(novaProducao);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao cadastrar produção", erro: erro.message });
  }
});

// Rota para listar as produções de um usuário
router.get('/:ano', verificarToken, async (req, res) => {
  const { ano } = req.params;  // Pega o ano da URL
  try {
    const token = req.headers.authorization.split(' ')[1]; // Obtém o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica o token
    const usuarioId = decoded.id;

    const producoes = await listarProducoes(usuarioId, ano);  // Passa o ano para a função de listagem
    res.status(200).json(producoes);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao buscar produções", erro });
  }
});

router.delete('/:ano', verificarToken, async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; // Obtém o token
  const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica o token
  const usuarioId = decoded.id; // Obtém o ID do usuário a partir do token

  const { ano } = req.params; // Agora estamos usando o 'ano' na URL

  try {
    // Encontre a produção mais recente do usuário para o ano selecionado
    const producaoRecente = await Gestao.findOne({
      where: {
        usuarioId,
        ano,
      },
      order: [['createdAt', 'DESC']], // Ordena pela data de criação (de mais recente)
    });

    if (producaoRecente) {
      await producaoRecente.destroy(); // Exclui o registro mais recente
      return res.status(200).json({ mensagem: "Produção excluída com sucesso!" });
    } else {
      return res.status(404).json({ mensagem: "Nenhuma produção encontrada para este ano." });
    }
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
});



module.exports = router;
