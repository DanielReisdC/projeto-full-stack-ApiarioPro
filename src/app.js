const express = require('express');
const app = express();
const cors = require('cors');
const usuarioRoutes = require('./api/usuarios'); // Aponte para a rota correta
require('dotenv').config();

app.use(cors());
app.use(express.json()); // Para garantir que o corpo da requisição será lido corretamente
app.use('/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
