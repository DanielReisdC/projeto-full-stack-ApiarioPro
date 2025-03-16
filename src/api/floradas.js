// api/floradas.js
const express = require('express');
const router = express.Router();
const { cadastrarFlorada, listarFloradas } = require('../services/floradas');

// Rota para cadastrar uma florada
router.post('/cadastrar', async (req, res) => {
    try {
      const { nome, data_inicio, data_fim, usuarioId } = req.body;
  
      if (!nome || !data_inicio || !data_fim || !usuarioId) {
        return res.status(400).json({ mensagem: "Preencha todos os campos." });
      }
  
      // Não precisa converter para data, apenas passe os meses como strings.
      const novaFlorada = await cadastrarFlorada(nome, data_inicio, data_fim, usuarioId);
      res.status(201).json(novaFlorada);
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao cadastrar florada", erro: erro.message });
    }
  });
  
  

// Rota para listar as floradas de um usuário
router.get('/:usuarioId', async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const floradas = await listarFloradas(usuarioId);
    res.status(200).json(floradas);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao buscar floradas", erro });
  }
});

module.exports = router;
