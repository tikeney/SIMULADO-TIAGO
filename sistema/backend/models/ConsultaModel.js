import { create, read, deleteRecord, getConnection } from '../config/database.js';

class ConsultaModel {
    static async listarTodas() {
        const connection = await getConnection();
        try {
            const sql = `
                SELECT 
                    c.id, 
                    c.data_hora, 
                    c.motivo, 
                    c.status, 
                    a.nome as animal_nome, 
                    t.nome as tutor_nome 
                FROM consulta c
                JOIN animal a ON c.animal_id = a.id
                JOIN tutor t ON a.tutor_id = t.id
                ORDER BY c.data_hora DESC
            `;
            const [rows] = await connection.execute(sql);
            return rows;
        } finally {
            connection.release();
        }
    }

    static async criar(dados) {
        return await create('consulta', dados);
    }

    static async excluir(id) {
        return await deleteRecord('consulta', `id = ${id}`);
    }
}

export default ConsultaModel;
