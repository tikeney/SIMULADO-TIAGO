import { create, read, getConnection } from '../config/database.js';

class EmprestimoModel {

// Buscar todos os animais associados a um tutor
    static async listarTodos() {
        const connection = await getConnection()
        const [rows] = await connection.execute(`select t.nome as tutor, a.nome as nome_animal from tutor t join animal a on t.id = a.tutor_id;`)

        return rows
    }

    // Criar novo animal
    static async criar(dados) {
        return await create('animal', dados)
    }
}

export default EmprestimoModel;
