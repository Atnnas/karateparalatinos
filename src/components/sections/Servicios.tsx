"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageSquare } from "lucide-react";

export default function Servicios() {
  const listItems = [
    "Todas las Katas y Bunkais de 9°Kyu hasta 1er Dan C.N.",
    "Todos los IDO-KIHON y KOTEI-KIHON correspondientes",
    "Guía en PDFs con vocabulario en Japonés/Español",
    "Acceso a la Comunidad KARATE PARA LATINOS",
    "Acceso a WEBINARS y ASESORÍAS personalizadas por 1 año",
  ];

  return (
    <section
      id="servicios"
      className="relative min-h-screen flex items-center bg-transparent overflow-hidden pt-36 pb-20"
    >
      {/* Background decoration */}
      <div className="absolute right-[-100px] md:right-[5%] top-[20%] w-[320px] h-[320px] md:w-[460px] md:h-[460px] z-0 pointer-events-none flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-tr from-[#E52B34] via-[#FF4D55] to-[#B81B22] opacity-[0.05] rounded-full blur-[4px]" />
      </div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[#E52B34]/3 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column 1: Copywriting */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="font-title-serif text-xs text-[#556358] tracking-[0.25em] uppercase block mb-3"
              >
                Servicios & Guía de Estudio
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-impact-condensed text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider text-neutral-900"
              >
                ¿Qué <span className="text-[#E52B34]">obtienes</span>?
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-body text-neutral-600 mt-6 font-light leading-relaxed text-base sm:text-lg"
              >
                Esta guía es un tributo vivo a la técnica original del maestro Kenwa Mabuni y lo más apegado posible a lo original.
              </motion.p>
            </div>

            {/* List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="font-title-serif text-xs text-neutral-800 tracking-wider uppercase font-bold">
                CONTENIDO INCLUIDO:
              </h3>
              <ul className="space-y-3">
                {listItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-neutral-800 text-sm sm:text-base font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#E52B34] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card p-6 border-l-4 border-emerald-500 bg-white/60 shadow-sm"
            >
              <span className="text-[10px] font-title-serif text-emerald-600 block mb-2 tracking-wider font-bold">
                ¿TIENES DUDAS O QUIERES SABER SOBRE OTRAS PROMOCIONES O CURSOS?
              </span>
              <p className="font-body text-xs text-neutral-600 font-light mb-4 leading-relaxed">
                Envíanos un mensaje directo por WhatsApp para recibir atención personalizada de inmediato.
              </p>
              <a
                href="https://wa.me/529211205618?text=Hola!%20Me%20interesa%20obtener%20la%20gu%C3%ADa%20de%20estudio%20de%20Karate%20Shitoryu."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-impact-condensed text-sm tracking-wider py-3 px-6 rounded-md transition-all duration-300 shadow-[0_4px_15px_rgba(37,211,102,0.25)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.35)] hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 fill-white" /> WhatsApp: +52 921 120 5618
              </a>
            </motion.div>

          </div>

          {/* Column 2: Video Player */}
          <div className="lg:col-span-6 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-neutral-200/80 bg-black max-w-2xl"
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/l0clUO_IWTc"
                title="Karate para Latinos - Guía de Estudio"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
