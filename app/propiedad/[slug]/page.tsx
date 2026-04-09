import React from 'react';
import { supabase } from '@/lib/supabase';
import { LandingProperty, type Property } from '@/components/landing/LandingProperty';

interface PropertyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PropertyPage(props: PropertyPageProps) {
  const params = await props.params;
  const { slug } = params;

  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !property) {
    return (
      <main className="w-full flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800">Propiedad no encontrada</h1>
      </main>
    );
  }

  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-between">
      <LandingProperty property={property as Property} />
    </main>
  );
}
