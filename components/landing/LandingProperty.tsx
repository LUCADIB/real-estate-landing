import React from 'react';
import ReactMarkdown from 'react-markdown';
import { MobileGallery } from './MobileGallery';
import { DesktopGallery } from './DesktopGallery';
import { formatYoutubeUrl } from '@/lib/formatYoutubeUrl';

type Property = {
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
  const whatsappNumber = property.whatsapp.replace(/\D/g, '');
  const formattedPrice = Number(property.price || 0).toLocaleString();

  return (
    <article className="min-h-screen w-full bg-white pb-24">
      <section className="w-full">
        {/* MOBILE */}
        <div className="block md:hidden">
          <div className="relative">
            <MobileGallery images={images} />

            <div className="absolute bottom-0 left-0 w-full pointer-events-none">
              <div className="rounded-t-[28px] bg-white px-5 pb-6 pt-5 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] pointer-events-auto">
                <h1 className="mb-1 text-[28px] font-semibold leading-[1.1] text-gray-900">
                  {property.title}
                </h1>

                {property.location ? (
                  <p className="mb-2 text-sm text-gray-500">{property.location}</p>
                ) : null}

                <p className="text-sm text-gray-600">
                  {property.bedrooms ?? 0} hab · {property.bathrooms ?? 0} baños ·{' '}
                  {property.area ?? 0} m²
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="mx-auto hidden max-w-6xl px-4 pt-6 md:block">
          <h1 className="mb-4 text-3xl font-semibold text-gray-900">
            {property.title}
          </h1>

          <DesktopGallery title={property.title} images={images} />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        <section className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {property.bedrooms ? (
            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <p className="text-lg font-semibold text-gray-900">{property.bedrooms}</p>
              <p className="text-sm text-gray-500">Habitaciones</p>
            </div>
          ) : null}

          {property.bathrooms ? (
            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <p className="text-lg font-semibold text-gray-900">{property.bathrooms}</p>
              <p className="text-sm text-gray-500">Baños</p>
            </div>
          ) : null}

          {property.area ? (
            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <p className="text-lg font-semibold text-gray-900">{property.area} m²</p>
              <p className="text-sm text-gray-500">Área</p>
            </div>
          ) : null}

          {property.garage ? (
            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <p className="text-lg font-semibold text-gray-900">{property.garage}</p>
              <p className="text-sm text-gray-500">Garaje</p>
            </div>
          ) : null}
        </section>

        {property.description ? (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Acerca de esta propiedad
            </h2>
            <ReactMarkdown
              components={{
                p: ({node, ...props}) => <p className="mb-3 text-gray-600" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                li: ({node, ...props}) => <li className="ml-4 list-disc text-gray-600" {...props} />,
              }}
            >
              {property.description || ''}
            </ReactMarkdown>
          </section>
        ) : null}

        {property.video_url ? (
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
        ) : null}

        {property.tour_360_url ? (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Tour virtual 360°
            </h2>
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
              <iframe
                src={property.tour_360_url}
                className="h-full w-full border-0"
                allowFullScreen
                title="Tour virtual 360"
              />
            </div>
          </section>
        ) : null}
      </div>

      <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-white p-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Precio</p>
            <p className="text-xl font-bold text-gray-900">${formattedPrice}</p>
          </div>

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
        </div>
      </div>
    </article>
  );
}