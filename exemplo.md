# Guia Rápido — Desenvolvimento de Feature

**Fluxo:** `db.sql` → `Model` → `Controller` → `Rota**` → `app.js` → `page.jsx` → `Navbar`

---

## 1. Banco de Dados (`db.sql`)

```sql
CREATE TABLE exemplo (
    id    INT AUTO_INCREMENT PRIMARY KEY,
    nome          VARCHAR(100) NOT NULL,
    descricao     TEXT
);
```

Execute no banco após criar.

---

## 2. Model (`backend/models/ExemploModel.js`)

```javascript
import { create, read, update, deleteRecord } from '../config/database.js';

async function listarTodos() {
    return await read('exemplo');
}
async function buscarPorId(id) {
    const rows = await read('exemplo', `id = ${id}`);
    return rows[0] || null;
}
async function criar(dados) {
    return await create('exemplo', dados);
}
async function atualizar(id, dados) {
    return await update('exemplo', dados, `id = ${id}`);
}
async function excluir(id) {
    return await deleteRecord('exemplo', `id = ${id}`);
}

export { listarTodos, buscarPorId, criar, atualizar, excluir };
```

**Com JOIN** (quando precisar de dados de outra tabela):

```javascript
import { getConnection } from '../config/database.js';

async function listarTodos() {
    const connection = await getConnection();
    const [rows] = await connection.execute(`
        SELECT e.*, c.nome AS nome_cliente
        FROM exemplo e
        LEFT JOIN clientes c ON e.id_cliente = c.id_cliente
    `);
    return rows;
}
```

---

## 3. Controller (`backend/controllers/ExemploController.js`)

```javascript
import { listarTodos, buscarPorId, criar, atualizar, excluir } from '../models/ExemploModel.js';

async function listarTodosHandler(req, res) {
    const dados = await listarTodos();
    res.json({ sucesso: true, dados });
}

async function criarHandler(req, res) {
    const { nome, descricao } = req.body;
    const id = await criar({ nome, descricao });
    const item = await buscarPorId(id);
    res.status(201).json({ sucesso: true, dados: item });
}

async function atualizarHandler(req, res) {
    const { nome, descricao } = req.body;
    await atualizar(req.params.id, { nome, descricao });
    const item = await buscarPorId(req.params.id);
    res.json({ sucesso: true, dados: item });
}

async function excluirHandler(req, res) {
    await excluir(req.params.id);
    res.json({ sucesso: true });
}

export { listarTodosHandler, criarHandler, atualizarHandler, excluirHandler };
```

---

## 4. Rota (`backend/routes/exemploRotas.js`)

```javascript
import { Router } from 'express';
import { listarTodosHandler, criarHandler, atualizarHandler, excluirHandler } from '../controllers/ExemploController.js';

const router = Router();

router.get('/',       listarTodosHandler);
router.post('/',      criarHandler);
router.put('/:id',    atualizarHandler);
router.delete('/:id', excluirHandler);

export default router;
```

---

## 5. Registrar em `backend/app.js`

```javascript
import exemploRotas from './routes/exemploRotas.js';

app.use('/api/exemplo', exemploRotas);
```

---

## 6. Frontend (`frontend/src/app/exemplo/page.jsx`)

```jsx
'use client';
import { useState, useEffect } from 'react';

const API = 'http://localhost:3000/api/exemplo';
const camposVazios = { nome: '', descricao: '' };

export default function ExemploPage() {
    const [itens, setItens] = useState([]);
    const [form, setForm] = useState(camposVazios);
    const [editando, setEditando] = useState(null);

    useEffect(() => { carregar(); }, []);

    async function carregar() {
        const res = await fetch(API);
        const json = await res.json();
        setItens(json.dados || []);
    }

    async function salvar(e) {
        e.preventDefault();
        const url    = editando ? `${API}/${editando}` : API;
        const method = editando ? 'PUT' : 'POST';
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        setForm(camposVazios);
        setEditando(null);
        carregar();
    }

    async function excluir(id) {
        await fetch(`${API}/${id}`, { method: 'DELETE' });
        carregar();
    }

    function editar(item) {
        setEditando(item.id_exemplo);
        setForm({ nome: item.nome, descricao: item.descricao || '' });
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Exemplo</h1>

            {/* Formulário */}
            <form onSubmit={salvar} className="bg-white border border-gray-200 rounded-xl p-6 mb-6 flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Nome"
                    value={form.nome}
                    onChange={e => setForm({ ...form, nome: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    required
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={form.descricao}
                    onChange={e => setForm({ ...form, descricao: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                        {editando ? 'Salvar' : 'Cadastrar'}
                    </button>
                    {editando && (
                        <button type="button" onClick={() => { setEditando(null); setForm(camposVazios); }}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            {/* Lista */}
            <div className="space-y-2">
                {itens.map(item => (
                    <div key={item.id_exemplo} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-800">{item.nome}</p>
                            <p className="text-sm text-gray-500">{item.descricao}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => editar(item)}
                                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg">
                                Editar
                            </button>
                            <button onClick={() => excluir(item.id_exemplo)}
                                className="px-3 py-1.5 text-sm bg-red-50 text-red-600 border border-red-200 rounded-lg">
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
```

---

## 7. Adicionar na Navbar (`frontend/src/app/Navbar.jsx`)

```jsx
<Link href="/exemplo" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
    Exemplo
</Link>
```

---

## Checklist

- [ ] Tabela no `db.sql` e executada no banco
- [ ] `ExemploModel.js`
- [ ] `ExemploController.js`
- [ ] `exemploRotas.js`
- [ ] Registrar rota no `app.js`
- [ ] `frontend/src/app/exemplo/page.jsx`
- [ ] Link na `Navbar.jsx`