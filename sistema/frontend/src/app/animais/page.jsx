'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Animais() {
  const [tutores, setTutores] = useState([]);
  const [animais, setAnimais] = useState([]);
  const [tutorSelecionado, setTutorSelecionado] = useState('');
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
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

  const fetchAnimais = async (tutorId) => {
    if (!tutorId) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:3000/api/animais/tutor/${tutorId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.sucesso) setAnimais(data.dados);
    } catch (err) {
      console.error('Erro ao buscar animais');
    }
  };

  const handleTutorChange = (e) => {
    const id = e.target.value;
    setTutorSelecionado(id);
    fetchAnimais(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tutorSelecionado) {
      setMensagem('Selecione um tutor primeiro');
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:3000/api/animais', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ tutor_id: tutorSelecionado, nome, especie, raca })
      });
      const data = await res.json();
      if (data.sucesso) {
        setMensagem('Animal cadastrado com sucesso!');
        setNome(''); setEspecie(''); setRaca('');
        fetchAnimais(tutorSelecionado);
      } else {
        setMensagem(data.mensagem);
      }
    } catch (err) {
      setMensagem('Erro ao cadastrar animal');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/" className="text-blue-600 hover:underline mb-4 block">← Voltar ao Início</Link>
      <h1 className="text-2xl font-bold mb-6">Gestão de Animais</h1>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Selecione o Tutor para listar/cadastrar animais:</label>
        <select 
          className="border p-2 rounded w-full"
          value={tutorSelecionado}
          onChange={handleTutorChange}
        >
          <option value="">Selecione um tutor...</option>
          {tutores.map(t => (
            <option key={t.id} value={t.id}>{t.nome}</option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="text" placeholder="Nome do Animal" value={nome} onChange={e => setNome(e.target.value)} required className="border p-2 rounded" />
        <input type="text" placeholder="Espécie (ex: Cão)" value={especie} onChange={e => setEspecie(e.target.value)} required className="border p-2 rounded" />
        <input type="text" placeholder="Raça" value={raca} onChange={e => setRaca(e.target.value)} className="border p-2 rounded" />
        <button type="submit" className="md:col-span-3 bg-green-600 text-white p-2 rounded hover:bg-green-700">Cadastrar Animal</button>
      </form>

      {mensagem && <p className="mb-4 text-center font-medium text-blue-600">{mensagem}</p>}

      <div className="bg-white rounded shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Nome</th>
              <th className="p-4">Espécie</th>
              <th className="p-4">Raça</th>
            </tr>
          </thead>
          <tbody>
            {animais.length > 0 ? animais.map(a => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{a.nome}</td>
                <td className="p-4">{a.especie}</td>
                <td className="p-4">{a.raca}</td>
              </tr>
            )) : (
              <tr><td colSpan="3" className="p-4 text-center text-gray-500">Nenhum animal encontrado para este tutor.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
