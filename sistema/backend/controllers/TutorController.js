import ClienteModel from '../models/TutorModel.js';

class TutorController {

    // GET /api/clientes - Listar todos os clientes
    static async listarTodos(req, res) {
        // TODO: Buscar todos os clientes no banco de dados
        // TODO: Retornar a lista com status 200
        const dados = await listarTodos();
        res.json({ sucesso: true, dados });
    }

    // POST /api/clientes - Cadastrar novo cliente
    static async criar(req, res) {
        // TODO: Obter os dados do body → req.body
        // TODO: Validar os campos obrigatórios (ex: nome, cpf_cnpj)
        // TODO: Criar o cliente no banco de dados
        // TODO: Retornar o cliente criado com status 201
    }
}

export default TutorController;
