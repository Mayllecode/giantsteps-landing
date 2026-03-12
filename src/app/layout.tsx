import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "GiantSteps Studio | Academia de Baile",
  description:
    "Aprende salsa, bachata y más en GiantSteps Studio. Clases para todos los niveles en Los Olivos, Lima. +8 años de experiencia. ¡Únete!",
  keywords: "academia de baile, salsa, bachata, clases de baile, Lima, Los Olivos, GiantSteps",
  openGraph: {
    title: "GiantSteps Studio | Academia de Baile",
    description: "ExpresARTE es empoderARTE. Clases de baile en Lima.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
