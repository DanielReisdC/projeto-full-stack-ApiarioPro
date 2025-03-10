const express = require('express');
const usuarioRoutes = require('./usuario');

const router = express.Router();

router.use('/usuarios', usuarioRoutes);

module.exports = router;
