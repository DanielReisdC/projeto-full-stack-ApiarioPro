const express = require("express");
const router = express.Router();
const { cadastrarColmeia, listarColmeias, atualizarColmeia } = require("../services/colmeias");

// Rota para cadastrar uma colmeia associada ao usuário
router.post("/cadastrar", async (req, res) => {
  try {
    const { tipo, quantidade, estado, usuarioId } = req.body;

    if (!tipo || !quantidade || !estado || !usuarioId) {
      return res.status(400).json({ mensagem: "Preencha todos os campos." });
    }

    // Chama a função para cadastrar ou atualizar a colmeia
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
router.put("/atualizar/:id", async (req, res) => {
  try {
    const { id } = req.params;  // O id da colmeia
    const { quantidade } = req.body;  // A nova quantidade

    if (quantidade === undefined || quantidade < 0) {
      return res.status(400).json({ mensagem: "Quantidade inválida." });
    }

    const colmeiaAtualizada = await atualizarColmeia(id, quantidade);

    res.status(200).json(colmeiaAtualizada);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao atualizar colmeia", erro });
  }
});

module.exports = router;
