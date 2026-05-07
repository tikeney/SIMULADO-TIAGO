'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Tutores() {
  const [tutores, setTutores] = useState([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchTutores();
  }, []);

  const fetchTutores = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:3000/api/tutores', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.sucesso) setTutores(data.dados);
    } catch (err) {
      console.error('Erro ao buscar tutores');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:3000/api/tutores', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nome, telefone, email })
      });
      const data = await res.json();
      if (data.sucesso) {
        setMensagem('Tutor cadastrado com sucesso!');
        setNome(''); setTelefone(''); setEmail('');
        fetchTutores();
      } else {
        setMensagem(data.mensagem);
      }
    } catch (err) {
      setMensagem('Erro ao cadastrar tutor');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/" className="text-blue-600 hover:underline mb-4 block">← Voltar ao Início</Link>
      <h1 className="text-2xl font-bold mb-6">Gestão de Tutores</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required className="border p-2 rounded" />
        <input type="text" placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} required className="border p-2 rounded" />
        <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 rounded" />
        <button type="submit" className="md:col-span-3 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Cadastrar Tutor</button>
      </form>

      {mensagem && <p className="mb-4 text-center font-medium text-blue-600">{mensagem}</p>}

      <div className="bg-white rounded shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Nome</th>
              <th className="p-4">Telefone</th>
              <th className="p-4">E-mail</th>
            </tr>
          </thead>
          <tbody>
            {tutores.map(t => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{t.nome}</td>
                <td className="p-4">{t.telefone}</td>
                <td className="p-4">{t.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
