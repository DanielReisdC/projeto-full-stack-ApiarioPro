const express = require("express");
const router = express.Router();
const { cadastrarColmeia, listarColmeias } = require("../services/colmeias");
const { atualizarColmeia } = require('../services/colmeias');

// Rota para cadastrar uma colmeia associada ao usuário
router.post("/cadastrar", async (req, res) => {
  try {
    const { tipo, quantidade, estado, usuarioId } = req.body;

    if (!tipo || !quantidade || !estado || !usuarioId) {
      return res.status(400).json({ mensagem: "Preencha todos os campos." });
    }
    
    const novaColmeia = await cadastrarColmeia(tipo, quantidade, estado, usuarioId);
    res.status(201).json(novaColmeia);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao cadastrar colmeia", erro });
  }
});

// Rota para listar colmeias de um usuário específico
router.put('/atualizar', async (req, res) => {
  try {
    const { tipoColmeia, quantidade } = req.body; // Agora o tipoColmeia vem do corpo da requisição

    if (quantidade == null) {
      return res.status(400).json({ mensagem: 'Quantidade é obrigatória' });
    }

    const colmeiaAtualizada = await atualizarColmeia(tipoColmeia, quantidade);
    res.status(200).json(colmeiaAtualizada);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar a colmeia', erro: erro.message });
  }
});
router.get("/:usuarioId", async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const colmeias = await listarColmeias(usuarioId);
    res.status(200).json(colmeias);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao buscar colmeias", erro });
  }
});

module.exports = router;
