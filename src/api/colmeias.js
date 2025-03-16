const express = require("express");
const router = express.Router();
const { cadastrarColmeia, listarColmeias } = require("../services/colmeias");

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
