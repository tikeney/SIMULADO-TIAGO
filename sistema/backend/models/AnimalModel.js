import { create, read } from '../config/database.js';

class AnimalModel {
    static async listarPorTutor(tutor_id) {
        return await read('animal', `tutor_id = ${tutor_id}`);
    }

    static async criar(dados) {
        return await create('animal', dados);
    }
}

export default AnimalModel;
