const express = require('express');
const router = express.Router();
const { Gestao } = require('../models');
const verificarToken = require('../middleware/autenticacao');
// Endpoint para adicionar uma nova produção (associando ao usuário)
router.post('/', async (req, res) => {
    try {
        const { ano, mes, florada, quantidade_mes, quantidade_florada, usuarioId } = req.body;

        // Verifique se todos os campos necessários estão presentes
        if (!ano || !mes || !florada || !quantidade_mes || !quantidade_florada || !usuarioId) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        // Criação de uma nova produção associada ao usuário
        const novaProducao = await Gestao.create({
            ano,
            mes,
            florada,
            quantidade_mes,
            quantidade_florada,
            usuarioId, // Associando a produção ao usuário
        });

        res.status(201).json(novaProducao);
    } catch (error) {
        console.error("Erro ao adicionar produção:", error);
        res.status(500).json({ error: 'Erro ao adicionar produção' });
    }
});

// Endpoint para buscar produções de um ano específico
router.get('/:ano', verificarToken,async (req, res) => {
  try {
    const ano = req.params.ano;
    const usuarioId = req.user.id; // Obtém o ID do usuário autenticado

    const producoes = await Gestao.findAll({
        where: {
            ano,
            usuarioId // Filtra pelos dados do usuário logado
        }
    });

    res.status(200).json(producoes);
} catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produções' });
}
});

// Endpoint para deletar os dados de produção por ano
router.delete('/deletar/:ano', async (req, res) => {
    const { ano } = req.params;

    try {
        // Verifique se o ano foi fornecido
        if (!ano) {
            return res.status(400).json({ error: 'O ano é obrigatório.' });
        }

        // Deletar os registros do ano selecionado
        const deletado = await Gestao.destroy({
            where: {
                ano: ano,
            },
        });

        if (deletado === 0) {
            return res.status(404).json({ error: 'Nenhuma produção encontrada para o ano informado.' });
        }

        res.status(200).json({ message: 'Dados de produção apagados com sucesso!' });
    } catch (error) {
        console.error("Erro ao deletar dados:", error);
        res.status(500).json({ error: 'Erro ao deletar dados de produção.' });
    }
});

module.exports = router;
