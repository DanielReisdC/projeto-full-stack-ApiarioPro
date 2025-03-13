const express = require('express');
const usuarioRoutes = require('./usuario');
const colmeiaRoutes = require("./colmeias");

router.use("/usuarios", usuarioRoutes);
router.use("/colmeias", colmeiaRoutes);
module.exports = router;
