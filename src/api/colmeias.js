const express = require("express");
const router = express.Router();
const { cadastrarColmeia, listarColmeias } = require("../services/colmeias");
const verificarToken = require("../middleware/autenticacao");
// Rota para cadastrar uma colmeia associada ao usuário
router.post("/cadastrar", verificarToken, async (req, res) => {
  try {
    const { tipo, quantidade, estado } = req.body;
    const usuarioId = req.user.id;  // Pegando o `usuarioId` do token

    if (!tipo || !quantidade || !estado || !usuarioId) {
      return res.status(400).json({ mensagem: "Preencha todos os campos." });
    }

    const novaColmeia = await cadastrarColmeia(tipo, quantidade, estado, usuarioId);
    res.status(201).json(novaColmeia);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao cadastrar colmeia", erro });
  }
});
router.get("/:usuarioId", async (req, res) => {
  try {
   
    const { usuarioId } = req.params;
    const colmeias = await listarColmeias(usuarioId);
    res.status(200).json(colmeias);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao buscar colmeias", erro: erro.message });
    res.status(500).json({ mensagem: "Erro ao buscar colmeias", erro });
  }
});
// Rota para listar colmeias de um usuário específico
// Rota para listar colmeias de um usuário específico
router.get("/listar", verificarToken, async (req, res) => {
  try {
    const usuarioId = req.user.id; // Acessando o usuário decodificado do token
    const colmeias = await listarColmeias(usuarioId);
    res.status(200).json(colmeias);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao buscar colmeias", erro });
  }
});


module.exports = router;
