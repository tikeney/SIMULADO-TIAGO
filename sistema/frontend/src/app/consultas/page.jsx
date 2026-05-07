'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Consultas() {
  const [consultas, setConsultas] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [animais, setAnimais] = useState([]);
  const [tutorId, setTutorId] = useState('');
  const [animalId, setAnimalId] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchConsultas();
    fetchTutores();
  }, []);

  const fetchConsultas = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:3000/api/consultas', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.sucesso) setConsultas(data.dados);
    } catch (err) {
      console.error('Erro ao buscar consultas');
    }
  };

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

  const fetchAnimais = async (tId) => {
    if (!tId) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:3000/api/animais/tutor/${tId}`, {
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
    setTutorId(id);
    setAnimalId('');
    fetchAnimais(id);
  };

  const handleAgendar = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:3000/api/consultas', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ animal_id: animalId, data_hora: dataHora, motivo })
      });
      const data = await res.json();
      if (data.sucesso) {
        setMensagem('Consulta agendada!');
        setAnimalId(''); setDataHora(''); setMotivo('');
        fetchConsultas();
      } else {
        setMensagem(data.mensagem);
      }
    } catch (err) {
      setMensagem('Erro ao agendar');
    }
  };

  const handleCancelar = async (id) => {
    if (!confirm('Deseja realmente cancelar esta consulta?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:3000/api/consultas/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.sucesso) fetchConsultas();
    } catch (err) {
      console.error('Erro ao cancelar');
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Link href="/" className="text-blue-600 hover:underline mb-4 block">← Voltar ao Início</Link>
      <h1 className="text-2xl font-bold mb-6">Agendamento de Consultas</h1>

      <form onSubmit={handleAgendar} className="bg-white p-6 rounded shadow-sm mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tutor</label>
          <select className="border p-2 rounded w-full" value={tutorId} onChange={handleTutorChange} required>
            <option value="">Selecione o tutor...</option>
            {tutores.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Animal</label>
          <select className="border p-2 rounded w-full" value={animalId} onChange={e => setAnimalId(e.target.value)} required disabled={!tutorId}>
            <option value="">Selecione o animal...</option>
            {animais.map(a => <option key={a.id} value={a.id}>{a.nome}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Data e Hora</label>
          <input type="datetime-local" className="border p-2 rounded w-full" value={dataHora} onChange={e => setDataHora(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Motivo</label>
          <input type="text" className="border p-2 rounded w-full" value={motivo} onChange={e => setMotivo(e.target.value)} required placeholder="Ex: Vacinação" />
        </div>
        <button type="submit" className="md:col-span-2 bg-purple-600 text-white p-2 rounded hover:bg-purple-700">Agendar Consulta</button>
      </form>

      {mensagem && <p className="mb-4 text-center font-medium text-blue-600">{mensagem}</p>}

      <div className="bg-white rounded shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Data/Hora</th>
              <th className="p-4">Animal</th>
              <th className="p-4">Tutor</th>
              <th className="p-4">Motivo</th>
              <th className="p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {consultas.map(c => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{new Date(c.data_hora).toLocaleString('pt-BR')}</td>
                <td className="p-4 font-semibold">{c.animal_nome}</td>
                <td className="p-4">{c.tutor_nome}</td>
                <td className="p-4">{c.motivo}</td>
                <td className="p-4">
                  <button onClick={() => handleCancelar(c.id)} className="text-red-600 hover:text-red-800 font-medium">Cancelar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
