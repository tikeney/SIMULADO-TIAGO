# VetFácil - Sistema de Gestão Veterinária

Este é um sistema simples para gestão de consultas em uma clínica veterinária, resolvendo problemas de consultas duplicadas e falta de histórico.

## Funcionalidades

O sistema possui 3 telas principais protegidas por login:

1.  **Tutores**: Cadastro e listagem de proprietários (nome, telefone, e-mail).
2.  **Animais**: Cadastro de animais vinculados a um tutor e listagem por tutor.
3.  **Consultas**: Agendamento, listagem (mostrando animal e tutor) e cancelamento de consultas.

## Tecnologias Utilizadas

- **Backend**: Node.js, Express, MySQL, JWT (Autenticação).
- **Frontend**: Next.js, Tailwind CSS.
- **Banco de Dados**: MySQL (Script `db.sql` incluído).

## Como Rodar o Projeto

### 1. Banco de Dados
- Execute o script `db.sql` no seu servidor MySQL para criar as tabelas e dados iniciais.
- O usuário padrão é `admin` com a senha `admin123`.

### 2. Backend
- Navegue até `sistema/backend`.
- Instale as dependências: `npm install`.
- Configure o arquivo `.env` (use o `env.example` como base).
- Inicie o servidor: `npm start`.

### 3. Frontend
- Navegue até `sistema/frontend`.
- Instale as dependências: `npm install`.
- Inicie o ambiente de desenvolvimento: `npm run dev`.
- Acesse `http://localhost:3001` (ou a porta indicada pelo Next.js).

## Estrutura do Projeto

```text
SIMULADO-TIAGO/
├── sistema/
│   ├── backend/     # API Node.js
│   └── frontend/    # Interface Next.js
├── db.sql           # Script de criação do banco
├── DER.png          # Diagrama Entidade-Relacionamento
└── Avaliacao_Pratica.pdf # Requisitos do projeto
```
