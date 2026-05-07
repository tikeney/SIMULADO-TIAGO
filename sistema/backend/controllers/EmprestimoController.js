import EmprestimoModel from '../models/EmprestimoModel.js';

class EmprestimoController {

    // GET /api/emprestimos - Listar todos os empréstimos
    static async listarTodos(req, res) {
        // TODO: Buscar todos os empréstimos no banco de dados
        // TODO: Retornar a lista com status 200
    }

    // GET /api/emprestimos/em-aberto - Listar empréstimos ainda não devolvidos
    static async listarEmAberto(req, res) {
        // TODO: Buscar empréstimos onde data_devolucao_real é NULL
        // TODO: Retornar a lista com status 200
    }

    // GET /api/emprestimos/:id - Buscar empréstimo por ID
    static async buscarPorId(req, res) {
        // TODO: Obter o :id da URL → req.params.id
        // TODO: Buscar o empréstimo no banco de dados
        // TODO: Retornar 404 se não encontrado
    }

    // POST /api/emprestimos - Registrar saída de equipamento (novo empréstimo)
    static async registrarSaida(req, res) {
        // TODO: Obter id_cliente, id_equipamento e data_prevista_devolucao do body

        // TODO: Validar se o cliente existe (retornar 404 se não)

        // REGRA DE NEGÓCIO: verificar se o equipamento está disponível
        // TODO: Buscar o equipamento pelo id_equipamento
        // TODO: Se o status não for 'disponivel', retornar erro 400
        //       mensagem: 'Equipamento não está disponível para empréstimo'

        // TODO: Criar o registro do empréstimo no banco de dados
        //       com data_saida = data atual e data_devolucao_real = NULL

        // TODO: Atualizar o status do equipamento para 'emprestado'

        // TODO: Retornar o empréstimo criado com status 201
    }

    // PUT /api/emprestimos/:id/devolver - Registrar devolução de equipamento
    static async registrarDevolucao(req, res) {
        // TODO: Obter o :id do empréstimo da URL

        // TODO: Verificar se o empréstimo existe (retornar 404 se não)

        // REGRA DE NEGÓCIO: verificar se o empréstimo ainda está ativo
        // TODO: Se data_devolucao_real já estiver preenchida, retornar erro 400
        //       mensagem: 'Este empréstimo já foi encerrado'

        // TODO: Registrar a data_devolucao_real = data atual no banco de dados

        // TODO: Atualizar o status do equipamento para 'disponivel'

        // TODO: Retornar confirmação com status 200
    }
}

export default EmprestimoController;
