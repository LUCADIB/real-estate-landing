'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { PropertyForm } from '@/components/dashboard/PropertyForm';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session cleanly
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm font-medium text-gray-500 animate-pulse">Cargando panel de control...</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto min-h-screen max-w-4xl p-6 font-sans">
      <header className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Panel de Propiedades</h1>
          <p className="mt-1 text-sm text-gray-600">Gestión de listados de bienes raíces</p>
        </div>
        
        <button
          onClick={handleLogout}
          className="rounded-xl border border-gray-200 bg-white px-5 py-2 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          Cerrar sesión
        </button>
      </header>
      
      <section>
        <PropertyForm />
      </section>
    </main>
  );
}
