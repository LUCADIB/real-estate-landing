import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// Revalidate every minute to keep featured properties fresh but performant
export const revalidate = 60;

export default async function HomePage() {
  const { data: properties } = await supabase
    .from('properties')
    .select('title, price, location, images, slug')
    .order('created_at', { ascending: false })
    .limit(3);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* HEADER */}
      <header className="absolute top-0 left-0 right-0 z-10 w-full px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-center md:justify-start">
          <div className="text-2xl font-black tracking-tighter text-gray-900">RealEstate.</div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center bg-gray-50 px-4 py-20 text-center md:py-32">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl leading-tight">
            Te conseguimos compradores para tu propiedad en tiempo récord
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-base font-medium text-gray-600 sm:text-lg md:text-xl leading-relaxed">
            No somos inmobiliaria. Creamos campañas, fotos y páginas que convierten visitas en clientes reales.
          </p>
          <a
            href="https://wa.me/593963737070?text=Hola,%20quiero%20vender%20mi%20propiedad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl bg-green-500 px-6 py-3 text-base font-bold text-white shadow-xl shadow-green-500/20 transition hover:-translate-y-1 hover:bg-green-600 hover:shadow-green-500/30 md:px-10 md:py-5 md:text-lg"
          >
            Quiero vender mi propiedad
          </a>
        </div>
      </section>

      {/* ================= HOW WE DO IT (VALUE SECTION) ================= */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="text-2xl font-bold md:text-4xl">¿Cómo lo hacemos?</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="flex flex-col items-center rounded-2xl bg-gray-50 p-6 text-center shadow-sm md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 md:mb-6 md:h-16 md:w-16">
                <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 md:text-xl">Fotos y video profesional</h3>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center rounded-2xl bg-gray-50 p-6 text-center shadow-sm md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 md:mb-6 md:h-16 md:w-16">
                <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 md:text-xl">Landing optimizada como esta</h3>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center rounded-2xl bg-gray-50 p-6 text-center shadow-sm md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-600 md:mb-6 md:h-16 md:w-16">
                <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 md:text-xl">Publicidad en Meta Ads</h3>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col items-center rounded-2xl bg-gray-50 p-6 text-center shadow-sm md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 md:mb-6 md:h-16 md:w-16">
                <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 md:text-xl">Clientes reales interesados</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PROPERTIES ================= */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 flex flex-col items-center text-center md:mb-16">
            <h2 className="mb-4 text-2xl font-bold md:text-4xl">
              Ejemplos de propiedades publicadas
            </h2>
            <p className="max-w-2xl text-base text-gray-600 md:text-lg">
              Así se ven las páginas que usamos para vender propiedades más rápido.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {properties?.map((property) => {
              const mainImage = property.images?.[0] || '/placeholder.jpg';
              // Format price robustly without causing SSR mismatch by letting it safely convert
              const formattedPrice = Number(property.price || 0).toLocaleString();

              return (
                <Link
                  key={property.slug}
                  href={`/propiedad/${property.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img
                      src={mainImage}
                      alt={property.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="mb-2 truncate text-lg font-bold text-gray-900 md:text-xl">
                      {property.title}
                    </h3>
                    <p className="mb-4 truncate text-sm text-gray-500">
                      📍 {property.location}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-lg font-extrabold text-gray-900 md:text-xl">
                        ${formattedPrice}
                      </p>
                      <span className="text-sm font-semibold text-blue-600 group-hover:underline">
                        Ver página →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}

            {(!properties || properties.length === 0) && (
              <div className="col-span-full py-20 text-center">
                <p className="text-base text-gray-500 md:text-lg">Próximamente más ejemplos disponibles.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-gray-900 px-4 py-20 text-center md:py-32">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-extrabold text-white md:mb-6 md:text-5xl">
            ¿Quieres vender tu propiedad más rápido?
          </h2>
          <p className="mb-8 text-base font-medium text-gray-300 md:mb-12 md:text-xl">
            Nosotros te conseguimos los clientes
          </p>
          <a
            href="https://wa.me/593963737070?text=Hola,%20quiero%20más%20información"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-xl bg-green-500 px-6 py-3 text-base font-bold text-white shadow-xl shadow-green-500/20 transition hover:-translate-y-1 hover:bg-green-600 hover:shadow-green-500/30 md:px-10 md:py-5 md:text-lg"
          >
            <svg className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Hablar por WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-gray-800 bg-gray-900 py-10 text-center text-sm font-medium text-gray-500">
        <p>&copy; {new Date().getFullYear()} RealEstate Marketing. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
