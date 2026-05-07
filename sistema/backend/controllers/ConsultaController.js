import ConsultaModel from '../models/ConsultaModel.js';

class ConsultaController {
    static async listar(req, res) {
        try {
            const consultas = await ConsultaModel.listarTodas();
            res.status(200).json({ sucesso: true, dados: consultas });
        } catch (error) {
            console.error(error);
            res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar consultas' });
        }
    }

    static async agendar(req, res) {
        try {
            const { animal_id, data_hora, motivo } = req.body;
            if (!animal_id || !data_hora || !motivo) {
                return res.status(400).json({ sucesso: false, mensagem: 'Todos os campos são obrigatórios' });
            }
            const id = await ConsultaModel.criar({ animal_id, data_hora, motivo });
            res.status(201).json({ sucesso: true, mensagem: 'Consulta agendada com sucesso', id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ sucesso: false, mensagem: 'Erro ao agendar consulta' });
        }
    }

    static async cancelar(req, res) {
        try {
            const { id } = req.params;
            await ConsultaModel.excluir(id);
            res.status(200).json({ sucesso: true, mensagem: 'Consulta cancelada com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ sucesso: false, mensagem: 'Erro ao cancelar consulta' });
        }
    }
}

export default ConsultaController;
