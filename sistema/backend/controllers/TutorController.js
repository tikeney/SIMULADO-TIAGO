import TutorModel from '../models/TutorModel.js';

class TutorController {
    static async listarTodos(req, res) {
        try {
            const tutores = await TutorModel.listarTodos();
            res.status(200).json({ sucesso: true, dados: tutores });
        } catch (error) {
            console.error(error);
            res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar tutores' });
        }
    }

    static async criar(req, res) {
        try {
            const { nome, telefone, email } = req.body;
            if (!nome || !telefone) {
                return res.status(400).json({ sucesso: false, mensagem: 'Nome e telefone são obrigatórios' });
            }
            const id = await TutorModel.criar({ nome, telefone, email });
            res.status(201).json({ sucesso: true, mensagem: 'Tutor criado com sucesso', id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ sucesso: false, mensagem: 'Erro ao criar tutor' });
        }
    }
}

export default TutorController;
