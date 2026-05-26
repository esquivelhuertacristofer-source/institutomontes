import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Instituto Educativo Montes | Primaria Bilingüe en Toluca",
  description:
    "Primaria bilingüe privada en Toluca. Con horario extendido de 7:00 a.m. a 6:30 p.m., alimentación balanceada, robótica e informática aplicada, y educación financiera lúdica.",
  keywords: [
    "Instituto Educativo Montes",
    "Primaria Toluca",
    "Primaria Bilingüe",
    "Horario Extendido Toluca",
    "Colegio con comedor Toluca",
    "Robótica Primaria Toluca",
    "Educación Financiera Primaria",
    "Mejores primarias Toluca",
    "San Pedro Totoltepec"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${plusJakartaSans.variable} scroll-smooth overflow-x-hidden w-full`}
      suppressHydrationWarning
    >
      <body 
        className="font-sans antialiased text-primary-dark bg-white overflow-x-hidden w-full relative"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
