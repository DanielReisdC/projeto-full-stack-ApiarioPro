const express = require('express');
const router = express.Router();
const UsuarioService = require('../services/usuarios'); // Corrija o nome do arquivo caso necessário
const Usuario = require('../models/usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Rota POST para cadastrar um usuário
router.post('/cadastrar', async (req, res) => {
    try {
        const usuario = await UsuarioService.cadastrarUsuario(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

// Rota GET para listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll(); // Consulta todos os usuários no banco
    return res.status(200).json(usuarios); // Retorna a lista de usuários
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao buscar os usuários' });
  }
});
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o usuário existe
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    // Comparar a senha fornecida com a senha armazenada no banco
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Senha incorreta!' });
    }

    // Gerar um token de autenticação (JWT)
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login bem-sucedido!',
      token,  // Você pode retornar esse token para o cliente para usá-lo nas requisições subsequentes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor!' });
  }
});


module.exports = router;
