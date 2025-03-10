const sequelize = require('./database');

const conectarBanco = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida!');
    } catch (error) {
        console.error('Erro ao conectar no banco:', error);
    }
};

module.exports = conectarBanco;
