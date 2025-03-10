const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarios');

class UsuarioService {
    async cadastrarUsuario({ nome, email, senha }) {
        const usuarioExiste = await Usuario.findOne({ where: { email } });
        if (usuarioExiste) {
            throw new Error('E-mail já cadastrado!');
        }

        const senhaCriptografada = bcrypt.hashSync(senha, 8);
        const novoUsuario = await Usuario.create({ nome, email, senha: senhaCriptografada });
        return novoUsuario;
    }
}

module.exports = new UsuarioService();
