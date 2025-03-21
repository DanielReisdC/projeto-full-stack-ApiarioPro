const { Apiario,Florada} = require("../models");

async function cadastrarApiario({ regiao, florada, colmeias, imagem, usuarioId }) {
  try {
    // Verifique se os campos obrigatórios estão preenchidos
    if (!regiao || !florada || !colmeias || !usuarioId) {
      throw new Error("Todos os campos obrigatórios devem ser preenchidos.");
    }

    // Buscar o nome da florada pelo ID
    const floradaEncontrada = await Florada.findByPk(florada);
    if (!floradaEncontrada) {
      throw new Error("Florada não encontrada.");
    }

    // Criar o novo apiário com o nome da florada
    const novoApiario = await Apiario.create({ 
      regiao, 
      florada, 
      nomeFlorada: floradaEncontrada.nome, // Armazenar nome da florada
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
    // Buscar os apiários do usuário e incluir o nome da florada
    const apiarios = await Apiario.findAll({
      where: { usuarioId },  // Garantir que estamos buscando apenas os apiários do usuário
      include: {
        model: Florada,
        attributes: ['nome'], // Incluir o campo 'nome' da florada
      },
    });

    // Modificar o resultado para incluir o nome da florada diretamente
    return apiarios.map(apiario => {
      return {
        ...apiario.dataValues,
        florada: apiario.Florada ? apiario.Florada.nome : apiario.florada,  // Se Florada não for encontrado, retornar o valor original
      };
    });
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
