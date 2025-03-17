// api/floradas.js
const express = require('express');
const router = express.Router();
const { cadastrarFlorada, listarFloradas } = require('../services/floradas');
const verificarToken = require('../middleware/autenticacao');
const jwt = require('jsonwebtoken');
const { excluirFlorada } = require('../services/floradas');
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
router.get('/',verificarToken, async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Pega o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica o token
    const usuarioId = decoded.id;

    const floradas = await listarFloradas(usuarioId);
    res.status(200).json(floradas);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao buscar floradas", erro });
  }
});
// api/floradas.js
// Rota para excluir florada
router.delete('/:id', verificarToken, async (req, res) => {
    try {
      const { id } = req.params;
      const token = req.headers.authorization.split(' ')[1]; // Pega o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica o token
      const usuarioId = decoded.id;
  
      // Verificar se a florada pertence ao usuário
      const florada = await Florada.findByPk(id);
      if (!florada || florada.usuarioId !== usuarioId) {
        return res.status(403).json({ mensagem: "Você não tem permissão para excluir esta florada." });
      }
  
      const resultado = await excluirFlorada(id);
      if (resultado) {
        res.status(200).json({ mensagem: "Florada excluída com sucesso!" });
      } else {
        res.status(404).json({ mensagem: "Florada não encontrada" });
      }
    } catch (erro) {
      console.error("Erro ao excluir a florada:", erro);
      res.status(500).json({ mensagem: "Erro ao excluir a florada", erro: erro.message });
    }
  });
  
  
module.exports = router;
