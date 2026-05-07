import { create, read } from '../config/database.js';

class TutorModel {

    // Buscar todos os tutores
    static async listarTodos() {
        return await read('tutor')
    }

    // Criar novo tutor
    static async criar(dados) {
        return await create('tutor', dados)
    }
}

export default TutorModel;
