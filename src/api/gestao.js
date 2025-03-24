const express = require('express');
const router = express.Router();
const { Gestao } = require('../models');

// Endpoint para adicionar uma nova produção
router.post('/', async (req, res) => {
    try {
        const { ano, mes, florada, quantidade_mes, quantidade_florada } = req.body;
        const novaProducao = await Gestao.create({ ano, mes, florada, quantidade_mes, quantidade_florada });
        res.status(201).json(novaProducao);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar produção' });
    }
});

// Endpoint para buscar produções de um ano específico
router.get('/:ano', async (req, res) => {
    try {
        const ano = req.params.ano;
        const producoes = await Gestao.findAll({ where: { ano } });
        res.status(200).json(producoes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produções' });
    }
});

module.exports = router;
