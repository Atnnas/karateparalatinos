import type { Metadata } from "next";
import { Cinzel, Oswald, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import FloatingWhatsApp from "@/components/navigation/FloatingWhatsApp";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Karate para Latinos",
  description: "Descubre el camino del karate, herramientas de entrenamiento en línea y asesorías personalizadas basadas en el Ikigai y el Dojutsu.",
  keywords: ["karate", "latinos", "combat system", "dojutsu", "ikigai", "martial arts", "entrenamiento", "asesorías"],
  authors: [{ name: "Karate para Latinos" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${oswald.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[#E52B34] selection:text-white">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

