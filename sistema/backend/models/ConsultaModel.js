import { create, read, update, getConnection } from '../config/database.js';

class ConsultaModel {

    // Buscar todos os clientes
    static async listarTodos() {
        // TODO: Implementar a busca de todos os clientes
        // Dica: use a função read('clientes')
        const connection = await getConnection()
        const [rows] = await connection.execute(`
                SELECT c.motivo AS consulta, d.nome_animal, d.tutor 
                FROM consulta c 
                join (select t.nome as tutor, a.nome as nome_animal from tutor t join animal a on t.id = a.tutor_id) d;
            `)

        return rows

    }

    // Criar novo cliente
    static async criar(dados) {
        // TODO: Implementar a criação do cliente
        // Dica: use a função create('clientes', dados)
        //       ela retorna o ID do registro inserido

        return await create('consulta', dados)
    }

    // Excluir cliente
    static async excluir(id) {
        // TODO: Implementar a exclusão do cliente
        // Dica: use a função deleteRecord('clientes', `id_cliente = ${id}`)

        return await deleteRecord('consulta', `id = ${id}`)
    }
}

export default ConsultaModel;
