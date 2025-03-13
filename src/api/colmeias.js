const express = require("express");
const router = express.Router();
const ColmeiaService = require("../services/colmeias");

// Rota para cadastrar uma colmeia
router.post("/cadastrar", async (req, res) => {
  try {
    const { tipo, quantidade, estado } = req.body;
    const novaColmeia = await ColmeiaService.cadastrarColmeia(tipo, quantidade, estado);
    res.status(201).json(novaColmeia);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao cadastrar colmeia", erro: erro.message });
  }
});

// Rota para listar todas as colmeias
router.get("/", async (req, res) => {
  try {
    const colmeias = await ColmeiaService.listarColmeias();
    res.json(colmeias);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao buscar colmeias", erro: erro.message });
  }
});

module.exports = router;
