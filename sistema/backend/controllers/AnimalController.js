import AnimalModel from '../models/AnimalModel.js';

class AnimalController {
    static async listarPorTutor(req, res) {
        try {
            const { tutor_id } = req.params;
            const animais = await AnimalModel.listarPorTutor(tutor_id);
            res.status(200).json({ sucesso: true, dados: animais });
        } catch (error) {
            console.error(error);
            res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar animais' });
        }
    }

    static async criar(req, res) {
        try {
            const { tutor_id, nome, especie, raca } = req.body;
            if (!tutor_id || !nome || !especie) {
                return res.status(400).json({ sucesso: false, mensagem: 'Tutor, nome e espécie são obrigatórios' });
            }
            const id = await AnimalModel.criar({ tutor_id, nome, especie, raca });
            res.status(201).json({ sucesso: true, mensagem: 'Animal cadastrado com sucesso', id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ sucesso: false, mensagem: 'Erro ao cadastrar animal' });
        }
    }
}

export default AnimalController;
