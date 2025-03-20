const express = require('express');
const router = express.Router();
const { cadastrarApiario, listarApiarios} = require('../services/apiarios');
const verificarToken = require('../middleware/autenticacao');
const jwt = require('jsonwebtoken');
const { Apiario } = require('../models');

// Rota para cadastrar um apiário
router.post('/cadastrar', verificarToken, async (req, res) => {
    try {
        const { regiao, florada, colmeias, imagem } = req.body;
        
        // Validação dos campos
        if (!regiao || typeof regiao !== 'string') {
            return res.status(400).json({ mensagem: "A região deve ser uma string válida." });
        }

        if (!florada || typeof florada !== 'string') {
            return res.status(400).json({ mensagem: "A florada deve ser uma string válida." });
        }

        if (!colmeias || typeof colmeias !== 'number') {
            return res.status(400).json({ mensagem: "O número de colmeias deve ser um número válido." });
        }

        // Decodificação do token e obtenção do usuário
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuarioId = decoded.id;

        if (!usuarioId) {
            return res.status(400).json({ mensagem: "Usuário não autenticado." });
        }

        // Criar o novo apiário
        const novoApiario = await cadastrarApiario({ regiao, florada, colmeias, imagem, usuarioId });
        res.status(201).json(novoApiario);
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao cadastrar apiário", erro: erro.message });
    }
});


// Rota para listar os apiários de um usuário
router.get('/', verificarToken, async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuarioId = decoded.id;

        const apiarios = await listarApiarios(usuarioId);
        res.status(200).json(apiarios);
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao buscar apiários", erro });
    }
});

// Rota para excluir um apiário
router.delete('/:id', verificarToken, async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuarioId = decoded.id;
        
        const { id } = req.params;
        console.log(`Tentando excluir o apiário com ID: ${id}`);

        const apiario = await Apiario.findByPk(id);
        if (!apiario) {
            console.log(`Erro: Apiário com ID ${id} não encontrado.`);
            return res.status(404).json({ error: "Apiário não encontrado." });
        }

        // Verifica se o apiário pertence ao usuário autenticado
        if (apiario.usuarioId !== usuarioId) {
            return res.status(403).json({ error: "Você não tem permissão para excluir este apiário." });
        }

        await apiario.destroy();
        console.log(`Apiário com ID ${id} excluído com sucesso.`);
        res.json({ message: "Apiário excluído com sucesso!" });

    } catch (error) {
        console.error("Erro ao excluir apiário:", error);
        res.status(500).json({ error: "Erro interno ao excluir apiário." });
    }
});

module.exports = router;