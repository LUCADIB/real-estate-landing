'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function PropertyForm() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    garage: '',
    images: '',
    video_url: '',
    tour_360_url: '',
    whatsapp: '',
    slug: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const imagesArray = formData.images
      .split(',')
      .map((img) => img.trim())
      .filter((img) => img.length > 0);

    const { error } = await supabase.from('properties').insert([{
      title: formData.title,
      price: Number(formData.price),
      description: formData.description,
      location: formData.location,
      bedrooms: formData.bedrooms ? Number(formData.bedrooms) : null,
      bathrooms: formData.bathrooms ? Number(formData.bathrooms) : null,
      area: formData.area ? Number(formData.area) : null,
      garage: formData.garage ? Number(formData.garage) : null,
      images: imagesArray,
      video_url: formData.video_url || null,
      tour_360_url: formData.tour_360_url || null,
      whatsapp: formData.whatsapp.replace(/\D/g, ''),
      slug: formData.slug
    }]);

    setLoading(false);

    if (error) {
      setStatus({ type: 'error', message: `Error: ${error.message}` });
    } else {
      setStatus({ type: 'success', message: '¡Propiedad creada exitosamente!' });
      setFormData({
        title: '', price: '', description: '', location: '',
        bedrooms: '', bathrooms: '', area: '', garage: '', images: '',
        video_url: '', tour_360_url: '', whatsapp: '', slug: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      {status && (
        <div className={`p-4 rounded-md text-sm ${status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
          {status.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">Título*</label>
          <input required type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="ej. Villa Moderna" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="slug" className="text-sm font-medium text-gray-700">Slug (URL)*</label>
          <input required type="text" id="slug" name="slug" value={formData.slug} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="ej. villa-moderna" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="price" className="text-sm font-medium text-gray-700">Precio*</label>
          <input required type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="ej. 500000" />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="location" className="text-sm font-medium text-gray-700">Ubicación*</label>
          <input required type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="ej. Miami, FL" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="bedrooms" className="text-sm font-medium text-gray-700">Habitaciones</label>
          <input type="number" id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="ej. 3" min="0" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="bathrooms" className="text-sm font-medium text-gray-700">Baños</label>
          <input type="number" id="bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="ej. 2" min="0" step="0.5" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="area" className="text-sm font-medium text-gray-700">Área (m²)</label>
          <input type="number" id="area" name="area" value={formData.area} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="ej. 150" min="0" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="garage" className="text-sm font-medium text-gray-700">Garaje</label>
          <input type="number" id="garage" name="garage" value={formData.garage} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Ej: 2" min="0" />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">Descripción*</label>
          <textarea required id="description" name="description" value={formData.description} onChange={handleChange} rows={4} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y" placeholder="Detalles de la propiedad..." />
          <p className="text-xs text-gray-500 mt-1">
            Puedes usar: <strong>**texto**</strong> para negrita, <strong>-</strong> para listas
          </p>
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="images" className="text-sm font-medium text-gray-700">Imágenes (URLs separadas por coma)</label>
          <input type="text" id="images" name="images" value={formData.images} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="https://..., https://..." />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="video_url" className="text-sm font-medium text-gray-700">Video (URL) (Opcional)</label>
          <input type="url" id="video_url" name="video_url" value={formData.video_url} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="ej. https://youtube.com/embed/..." />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="tour_360_url" className="text-sm font-medium text-gray-700">Tour 360 (URL) (Opcional)</label>
          <input type="url" id="tour_360_url" name="tour_360_url" value={formData.tour_360_url} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="ej. https://my.matterport.com/show/..." />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="whatsapp" className="text-sm font-medium text-gray-700">WhatsApp*</label>
          <input required type="text" id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="ej. 1234567890" />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="mt-4 bg-gray-900 text-white rounded-md px-4 py-3 text-sm font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Creando Propiedad...' : 'Crear Propiedad'}
      </button>
    </form>
  );
}
