import React from 'react';
import { PropertyForm } from '@/components/dashboard/PropertyForm';

export default function DashboardPage() {
  return (
    <main className="container mx-auto p-6 max-w-4xl min-h-screen">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Panel de Propiedades</h1>
        <p className="text-gray-600 text-sm mt-1">Gestión de listados de bienes raíces</p>
      </header>
      
      <section>
        <PropertyForm />
      </section>
    </main>
  );
}
