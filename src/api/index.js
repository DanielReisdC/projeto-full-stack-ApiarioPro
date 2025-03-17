const express = require('express');
const usuarioRoutes = require('./usuarios');
const colmeiaRoutes = require('./colmeias');
const floradaRoutes = require('./floradas'); // ✅ Importando as rotas de floradas

const router = express.Router();

router.use('/usuarios', usuarioRoutes);
router.use('/colmeias', colmeiaRoutes);
router.use('/floradas', floradaRoutes); // ✅ Adicionando as rotas de floradas

module.exports = router;
