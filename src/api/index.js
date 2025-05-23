const express = require('express');
const usuarioRoutes = require('./usuarios');
const colmeiaRoutes = require('./colmeias');
const floradaRoutes = require('./floradas'); 
const apiarioRoutes = require('./apiarios'); 
const gestaoRoutes = require('./gestao');// ✅ Importando as rotas de floradas

const router = express.Router();

router.use('/usuarios', usuarioRoutes);
router.use('/colmeias', colmeiaRoutes);
router.use('/floradas', floradaRoutes); 
router.use('/apiarios', apiarioRoutes);// ✅ Adicionando as rotas de floradas
router.use('/gestao', gestaoRoutes);
module.exports = router;
