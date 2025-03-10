const express = require('express');
const router = express.Router();
const UsuarioService = require('../services/usuarios'); // Corrija o nome do arquivo caso necessário
const Usuario = require('../models/usuarios');
const bcrypt = require('bcrypt');

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
  try {
      const { email, senha } = req.body;

      // Verifica se o usuário existe
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
          return res.status(400).json({ erro: 'Usuário não encontrado!' });
      }

      // Compara a senha informada com a armazenada no banco
      const senhaValida = bcrypt.compareSync(senha, usuario.senha);
      if (!senhaValida) {
          return res.status(400).json({ erro: 'Senha incorreta!' });
      }

      // Retorna os dados do usuário (sem a senha)
      return res.status(200).json({ 
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
      });

  } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao fazer login!' });
  }
});

module.exports = router;
