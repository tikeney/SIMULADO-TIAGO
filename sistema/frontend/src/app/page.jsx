'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const [usuario, setUsuario] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('usuario');
    
    if (!token) {
      router.push('/login');
    } else if (userStr) {
      setUsuario(JSON.parse(userStr));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    router.push('/login');
  };

  if (!usuario) return <div className="p-8 text-center">Carregando...</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">VetFácil</h1>
            <p className="text-gray-600">Bem-vindo, {usuario.nome}!</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Sair
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/tutores" className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Tutores</h2>
            <p className="text-gray-600 text-sm">Gerencie os proprietários dos animais.</p>
          </Link>

          <Link href="/animais" className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Animais</h2>
            <p className="text-gray-600 text-sm">Cadastre e visualize animais por tutor.</p>
          </Link>

          <Link href="/consultas" className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Consultas</h2>
            <p className="text-gray-600 text-sm">Agende e gerencie as consultas veterinárias.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
