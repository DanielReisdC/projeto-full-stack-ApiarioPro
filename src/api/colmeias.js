const express = require("express");
const router = express.Router();
const {listarColmeias, cadastrarOuAtualizarColmeia  } = require("../services/colmeias");

// Rota para cadastrar uma colmeia associada ao usuário
router.post('/cadastrar', async (req, res) => {
  try {
    const { usuarioId, tipo_colmeia, quantidade, estado } = req.body;

    if (!usuarioId || !tipo_colmeia || !quantidade || !estado) {
      return res.status(400).json({ mensagem: "Preencha todos os campos corretamente." });
    }

    const resultado = await cadastrarOuAtualizarColmeia(usuarioId, tipo_colmeia, quantidade, estado);
    
    if (resultado.success) {
      res.status(200).json({ mensagem: resultado.message });
    } else {
      res.status(500).json({ mensagem: "Erro ao processar a colmeia" });
    }
  } catch (erro) {
    console.error("Erro ao cadastrar ou atualizar colmeia:", erro);
    res.status(500).json({ mensagem: "Erro ao cadastrar ou atualizar colmeia", erro: erro.message });
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
