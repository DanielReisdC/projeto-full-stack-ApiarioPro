const express = require('express');
const app = express();
const cors = require('cors');
const usuarioRoutes = require('./api/usuarios'); 
const colmeiaRoutes = require('./api/colmeias');
const floradaRoutes = require('./api/floradas');
const apiarioRoutes = require('./api/apiarios');
const gestaoRoutes = require('./api/gestao'); // Mantendo o nome gestao

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/colmeias', colmeiaRoutes);
app.use("/floradas", floradaRoutes);
app.use("/apiarios", apiarioRoutes);
app.use("/gestao", gestaoRoutes); // Rota ajustada

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
