import jwt from 'jsonwebtoken';
import UsuarioModel from '../models/UsuarioModel.js';
import { JWT_CONFIG } from '../config/jwt.js';

class AuthController {
    
    static async login(req, res) {
        try {
            const { login, senha } = req.body;
            
            if (!login || !senha) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Login e senha são obrigatórios'
                });
            }

            const usuario = await UsuarioModel.verificarCredenciais(login, senha);
            
            if (!usuario) {
                return res.status(401).json({
                    sucesso: false,
                    mensagem: 'Login ou senha incorretos'
                });
            }

            const token = jwt.sign(
                { 
                    id: usuario.id, 
                    login: usuario.login 
                },
                JWT_CONFIG.secret,
                { expiresIn: JWT_CONFIG.expiresIn }
            );

            res.status(200).json({
                sucesso: true,
                mensagem: 'Login realizado com sucesso',
                dados: {
                    token,
                    usuario: {
                        id: usuario.id,
                        nome: usuario.nome,
                        login: usuario.login
                    }
                }
            });
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            res.status(500).json({
                sucesso: false,
                mensagem: 'Erro interno do servidor'
            });
        }
    }

    static async obterPerfil(req, res) {
        try {
            const usuario = await UsuarioModel.buscarPorId(req.usuario.id);
            
            if (!usuario) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Usuário não encontrado'
                });
            }

            const { senha, ...usuarioSemSenha } = usuario;

            res.status(200).json({
                sucesso: true,
                dados: usuarioSemSenha
            });
        } catch (error) {
            console.error('Erro ao obter perfil:', error);
            res.status(500).json({
                sucesso: false,
                mensagem: 'Erro interno do servidor'
            });
        }
    }
}

export default AuthController;
