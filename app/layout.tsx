import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Vende tu propiedad más rápido",
  description: "Te conseguimos compradores reales con landing, fotos y campañas. Sin inmobiliaria, sin comisión.",
  openGraph: {
    title: "Vende tu propiedad más rápido",
    description: "Te conseguimos compradores reales. Landing + contenido + clientes directos.",
    url: "https://real-estate-landing-topaz.vercel.app/",
    siteName: "RealEstate Marketing",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
