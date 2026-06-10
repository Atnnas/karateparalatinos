"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import KPLLogo from "../../../KPLLogo.png";

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Servicios", href: "/servicios" },
  { name: "Herramientas", href: "/herramientas" },
  { name: "Preguntas", href: "/preguntas" },
  { name: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-4" : "py-6"
        }`}
      >
        {/* Background Overlay - Textura madera de dojo */}
        <div className="absolute inset-0 bg-dojo-wood shadow-wood-3d shine-sweep-wood glass-reflection-wood -z-10" />

        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 flex items-center justify-between relative z-10 w-full">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-4 group relative z-20">
            <div className={`relative flex items-center justify-center rounded-full border-2 border-[#8B6914]/50 bg-white shadow-[0_6px_15px_rgba(80,50,10,0.35)] transition-all duration-300 ${
              isScrolled ? "w-12 h-12" : "w-16 h-16"
            } group-hover:scale-105 group-hover:shadow-[0_10px_25px_rgba(80,50,10,0.5)]`}>
              <Image
                src={KPLLogo}
                alt="Logo Karate para Latinos"
                width={64}
                height={64}
                className="object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col ml-2">
              <span className="font-impact-condensed text-xl sm:text-2xl md:text-3xl font-bold tracking-widest text-[#3B2210] group-hover:text-[#5A3A1F] transition-colors leading-none drop-shadow-[0_1px_2px_rgba(255,240,210,0.6)]">
                KARATE PARA LATINOS
              </span>
            </div>
          </Link>

          {/* Desktop Nav - Clean links matching Footer style */}
          <nav className="hidden md:flex items-center gap-8 relative z-20">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-impact-condensed text-sm sm:text-base font-bold text-[#3B2210]/90 hover:text-[#E52B34] transition-all duration-300 tracking-widest relative py-1 group drop-shadow-[0_1px_1px_rgba(255,240,210,0.3)]"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E52B34] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <Link href="/contacto" className="hidden md:inline-flex bg-[#E52B34] text-white hover:bg-[#c82028] font-impact-condensed text-xs py-2.5 px-5 rounded border border-[#E52B34] transition-all shadow-[0_4px_10px_rgba(120,80,30,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_15px_rgba(229,43,52,0.4)] font-bold relative z-20">
            Solicitar Asesoría
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-[#3B2210] hover:text-[#E52B34] focus:outline-none transition-colors"
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-[#3B2210]" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-dojo-wood shine-sweep-wood glass-reflection-wood flex flex-col justify-center items-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8 text-center px-4">
              <div className="w-28 h-28 relative mb-4 rounded-full border-4 border-[#8B6914]/40 p-1 bg-white overflow-hidden shadow-[0_10px_25px_rgba(80,50,10,0.4)] z-10">
                <Image
                  src={KPLLogo}
                  alt="Logo Karate para Latinos"
                  fill
                  className="object-cover rounded-full"
                />
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-impact-condensed text-3xl text-[#3B2210] hover:text-[#E52B34] transition-colors tracking-widest drop-shadow-[0_1px_2px_rgba(255,240,210,0.5)] z-10"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#E52B34] text-white hover:bg-[#c82028] font-impact-condensed text-md py-3 px-8 rounded border border-[#E52B34] transition-all shadow-[0_6px_15px_rgba(229,43,52,0.3)] hover:-translate-y-0.5 z-10"
              >
                Solicitar Asesoría
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
