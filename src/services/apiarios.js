const { Apiario} = require("../models");

async function cadastrarApiario({ regiao, florada, colmeias, imagem, usuarioId }) {
  try {
    // Verifique se os campos obrigatórios estão preenchidos
    if (!regiao || !florada || !colmeias || !usuarioId) {
      throw new Error("Todos os campos obrigatórios devem ser preenchidos.");
    }

    // Buscar o nome da florada pelo ID
   
    const novoApiario = await Apiario.create({ 
      regiao, 
      florada, 
     
      colmeias, 
      imagem, 
      usuarioId 
    });

    return novoApiario;
  } catch (error) {
    throw new Error("Erro ao cadastrar apiário: " + error.message);
  }
}
async function listarApiarios(usuarioId) {
  try {
    return await Apiario.findAll({ where: { usuarioId } });
   
  } catch (error) {
    throw new Error("Erro ao listar apiários: " + error.message);
  }
}



async function excluirApiario(id, usuarioId) {
  try {
    const apiario = await Apiario.findByPk(id);
    if (!apiario) {
      throw new Error("Apiário não encontrado.");
    }
    if (apiario.usuarioId !== usuarioId) {
      throw new Error("Você não tem permissão para excluir este apiário.");
    }
    await apiario.destroy();
    return { mensagem: "Apiário excluído com sucesso!" };
  } catch (error) {
    throw new Error("Erro ao excluir apiário: " + error.message);
  }
}

module.exports = { cadastrarApiario, listarApiarios, excluirApiario };
