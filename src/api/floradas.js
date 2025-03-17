// api/floradas.js
const express = require('express');
const router = express.Router();
const { cadastrarFlorada, listarFloradas } = require('../services/floradas');
const verificarToken = require('../middleware/autenticacao');
const jwt = require('jsonwebtoken');
const { Florada } = require('../models'); 
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
      const token = req.headers.authorization.split(' ')[1]; // Obtém o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const usuarioId = decoded.id; // ID do usuário autenticado

      const { id } = req.params;
      console.log(`Tentando excluir a florada com ID: ${id}`);

      const florada = await Florada.findByPk(id);
      if (!florada) {
          console.log(`Erro: Florada com ID ${id} não encontrada.`);
          return res.status(404).json({ error: "Florada não encontrada." });
      }

      // Verifica se a florada pertence ao usuário autenticado
      if (florada.usuarioId !== usuarioId) {
          return res.status(403).json({ error: "Você não tem permissão para excluir esta florada." });
      }

      await florada.destroy();
      console.log(`Florada com ID ${id} excluída com sucesso.`);
      res.json({ message: "Florada excluída com sucesso!" });

  } catch (error) {
      console.error("Erro ao excluir florada:", error);
      res.status(500).json({ error: "Erro interno ao excluir florada." });
  }
});



module.exports = router;
