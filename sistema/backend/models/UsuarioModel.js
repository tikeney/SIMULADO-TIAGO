import { create, read, update, deleteRecord, comparePassword, hashPassword, getConnection } from '../config/database.js';

class UsuarioModel {
    static async buscarPorId(id) {
        try {
            const rows = await read('usuarios', `id = ${id}`);
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar usuário por ID:', error);
            throw error;
        }
    }

    static async buscarPorLogin(login) {
        try {
            const rows = await read('usuarios', `login = '${login}'`);
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar usuário por login:', error);
            throw error;
        }
    }

    static async verificarCredenciais(login, senha) {
        try {
            const usuario = await this.buscarPorLogin(login);
            
            if (!usuario) {
                return null;
            }

            const senhaValida = await comparePassword(senha, usuario.senha);
            
            if (!senhaValida) {
                return null;
            }

            const { senha: _, ...usuarioSemSenha } = usuario;
            return usuarioSemSenha;
        } catch (error) {
            console.error('Erro ao verificar credenciais:', error);
            throw error;
        }
    }
}

export default UsuarioModel;
