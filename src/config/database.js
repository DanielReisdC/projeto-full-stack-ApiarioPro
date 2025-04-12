require('dotenv').config();  // Carrega as variáveis do arquivo .env
const { Sequelize } = require('sequelize');

// Verifica se a URL de conexão foi carregada corretamente
console.log('DATABASE_URL:', process.env.DATABASE_URL);

// Criação da instância do Sequelize com a URL de conexão
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',  // Usando PostgreSQL
  dialectOptions: {
    ssl: {
      require: true,  // Exige conexão SSL
      rejectUnauthorized: false  // Ignora a verificação de certificado SSL
    }
  },
  logging: false  // Desativa logs desnecessários
});
const sincronizarBanco = async () => {
  try {
    await sequelize.sync({ alter: true }); // 🔄 Isso recria a tabela se necessário
    console.log("Banco de dados sincronizado!");
  } catch (erro) {
    console.error("Erro ao sincronizar o banco:", erro);
  }
};

sincronizarBanco();


module.exports = sequelize;



