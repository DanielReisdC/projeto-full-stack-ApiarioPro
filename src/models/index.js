const sequelize = require('../config/database');
const Usuario = require('./usuarios');

const sincronizarModelos = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados com sucesso!');
    } catch (error) {
        console.error('Erro ao sincronizar modelos:', error);
    }
};

module.exports = { sequelize, Usuario, sincronizarModelos };
