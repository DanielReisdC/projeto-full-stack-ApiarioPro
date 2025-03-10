
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const usuariosRouter = require('./api/usuarios'); // Rota de usuários

app.use(cors());
app.use(bodyParser.json());
app.use('/usuarios', usuariosRouter); // A rota de usuários é acessível através de /usuarios

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
