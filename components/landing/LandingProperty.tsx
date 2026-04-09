import React from 'react';
import ReactMarkdown from 'react-markdown';
import { MobileGallery } from './MobileGallery';
import { DesktopGallery } from './DesktopGallery';
import { formatYoutubeUrl } from '@/lib/formatYoutubeUrl';

export type Property = {
  title: string;
  price: number | string;
  description?: string | null;
  location?: string | null;
  images?: string[] | null;
  video_url?: string | null;
  tour_360_url?: string | null;
  whatsapp: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  area?: number | null;
  garage?: number | null;
};

export function LandingProperty({ property }: { property: Property }) {
  const images = property.images ?? [];
  const formattedPrice = Number(property.price || 0).toLocaleString();

  // ===== NORMALIZAR WHATSAPP =====
  let whatsappNumber = (property.whatsapp || '').replace(/\D/g, '');

  if (whatsappNumber) {
    // Si empieza con 0 → Ecuador
    if (whatsappNumber.startsWith('0')) {
      whatsappNumber = '593' + whatsappNumber.slice(1);
    }

    // Si no tiene código país → asumir Ecuador
    if (!whatsappNumber.startsWith('593')) {
      whatsappNumber = '593' + whatsappNumber;
    }
  }

  return (
    <article className="min-h-screen w-full bg-white pb-24">

      {/* ================= HERO ================= */}
      <section className="w-full">

        {/* MOBILE */}
        <div className="block md:hidden pb-20">
          <MobileGallery images={images} />
        </div>

        {/* DESKTOP */}
        <div className="mx-auto hidden max-w-6xl px-4 pt-6 md:block">
          <h1 className="mb-4 text-3xl font-semibold text-gray-900">
            {property.title}
          </h1>
          <DesktopGallery title={property.title} images={images} />
        </div>

      </section>

      {/* ================= MOBILE CONTENT (NUEVA ESTRUCTURA) ================= */}
      <div className="relative z-20 block md:hidden bg-white rounded-t-[30px] -mt-27 pt-6 px-5 pb-8 shadow-[0_-6px_20px_rgba(0,0,0,0.06)]">

        {/* INFO */}
        <h1 className="text-[26px] font-semibold leading-tight text-gray-900">
          {property.title}
        </h1>

        {property.location && (
          <p className="text-sm text-gray-500 mb-2">
            {property.location}
          </p>
        )}

        {/* <p className="text-sm text-gray-600 mb-6">
          {property.bedrooms ?? 0} hab · {property.bathrooms ?? 0} baños · {property.area ?? 0} m²
        </p> */}

        {/* MÉTRICAS */}
        <section className="grid grid-cols-2 gap-4 mb-8 mt-8">

          {property.bedrooms && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition">
              <p className="text-2xl font-semibold text-gray-900">
                {property.bedrooms}
              </p>
              <p className="text-xs text-gray-500 tracking-wide">
                HABITACIONES
              </p>
            </div>
          )}

          {property.bathrooms && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition">
              <p className="text-2xl font-semibold text-gray-900">
                {property.bathrooms}
              </p>
              <p className="text-xs text-gray-500 tracking-wide">
                BAÑOS
              </p>
            </div>
          )}

          {property.area && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition">
              <p className="text-2xl font-semibold text-gray-900">
                {property.area} m²
              </p>
              <p className="text-xs text-gray-500 tracking-wide">
                ÁREA
              </p>
            </div>
          )}

          {property.garage && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition">
              <p className="text-2xl font-semibold text-gray-900">
                {property.garage}
              </p>
              <p className="text-xs text-gray-500 tracking-wide">
                GARAJE
              </p>
            </div>
          )}

        </section>

        {/* DESCRIPCIÓN */}
        {property.description && (
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Acerca de esta propiedad
            </h2>

            <ReactMarkdown
              components={{
                p: ({ ...props }) => <p className="mb-3 text-gray-600" {...props} />,
                strong: ({ ...props }) => <strong className="font-semibold text-gray-900" {...props} />,
                li: ({ ...props }) => <li className="ml-4 list-disc text-gray-600" {...props} />,
              }}
            >
              {property.description}
            </ReactMarkdown>
          </section>
        )}

        {/* VIDEO */}
        {property.video_url && (
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Recorrido en video
            </h2>

            <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
              <iframe
                src={formatYoutubeUrl(property.video_url)}
                className="h-full w-full border-0"
                allowFullScreen
                title="Recorrido en video"
              />
            </div>
          </section>
        )}

        {/* TOUR */}
        {property.tour_360_url && (
          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Tour virtual 360°
            </h2>

            <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
              <iframe
                src={property.tour_360_url}
                className="h-full w-full border-0"
                allowFullScreen
                title="Tour virtual"
              />
            </div>
          </section>
        )}

        <section className="mt-12 mb-24 text-center">
          <div className="bg-gray-50 rounded-2xl p-6 md:p-10">

            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
              ¿Te interesa esta propiedad?
            </h2>

            <p className="text-sm md:text-base text-gray-600 mb-6">
              Escríbenos y recibe toda la información o agenda una visita
            </p>


          </div>
        </section>

      </div>

      {/* ================= DESKTOP CONTENT (SIN CAMBIOS) ================= */}
      <div className="hidden md:block mx-auto max-w-6xl px-4 py-8 md:py-10">

        <section className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4">

          {property.bedrooms && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
              <p className="text-3xl font-semibold text-gray-900">
                {property.bedrooms}
              </p>
              <p className="text-sm text-gray-500 mt-1 tracking-wide">
                Habitaciones
              </p>
            </div>
          )}

          {property.bathrooms && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
              <p className="text-3xl font-semibold text-gray-900">
                {property.bathrooms}
              </p>
              <p className="text-sm text-gray-500 mt-1 tracking-wide">
                Baños
              </p>
            </div>
          )}

          {property.area && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
              <p className="text-3xl font-semibold text-gray-900">
                {property.area} m²
              </p>
              <p className="text-sm text-gray-500 mt-1 tracking-wide">
                Área
              </p>
            </div>
          )}

          {property.garage && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
              <p className="text-3xl font-semibold text-gray-900">
                {property.garage}
              </p>
              <p className="text-sm text-gray-500 mt-1 tracking-wide">
                Garaje
              </p>
            </div>
          )}

        </section>

        {property.description && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Acerca de esta propiedad
            </h2>

            <ReactMarkdown
              components={{
                p: ({ ...props }) => <p className="mb-3 text-gray-600" {...props} />,
                strong: ({ ...props }) => <strong className="font-semibold text-gray-900" {...props} />,
                li: ({ ...props }) => <li className="ml-4 list-disc text-gray-600" {...props} />,
              }}
            >
              {property.description}
            </ReactMarkdown>
          </section>
        )}

        {property.video_url && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Recorrido en video
            </h2>

            <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
              <iframe
                src={formatYoutubeUrl(property.video_url)}
                className="h-full w-full border-0"
                allowFullScreen
                title="Recorrido en video"
              />
            </div>
          </section>
        )}

        {property.tour_360_url && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Tour virtual 360°
            </h2>

            <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
              <iframe
                src={property.tour_360_url}
                className="h-full w-full border-0"
                allowFullScreen
                title="Tour virtual"
              />
            </div>
          </section>
        )}

        <section className="mt-12 mb-24 text-center">
          <div className="bg-gray-50 rounded-2xl p-6 md:p-10">

            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
              ¿Te interesa esta propiedad?
            </h2>

            <p className="text-sm md:text-base text-gray-600 mb-6">
              Escríbenos y recibe toda la información o agenda una visita
            </p>

          </div>
        </section>

      </div>

      {/* ================= CTA ================= */}
      <div className="fixed bottom-0 left-0 z-50 w-full border-t border-green-500/20 bg-white p-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Precio</p>
            <p className="text-xl font-bold text-gray-900">${formattedPrice}</p>
          </div>

          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                `Hola, estoy interesado en la propiedad: ${property.title}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600"
            >
              Contactar
            </a>
          )}
        </div>
      </div>

    </article>
  );
}