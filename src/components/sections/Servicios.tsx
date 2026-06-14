"use client";

import { motion } from "framer-motion";

export default function Servicios() {
  return (
    <section
      id="servicios"
      className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center overflow-x-hidden bg-[var(--background)] pt-32 pb-16 md:pt-40 md:pb-24"
    >
      {/* ===== Background Watermark Kanji (Traditional Vibe) ===== */}
      <div className="absolute right-10 md:right-20 lg:right-32 top-[18%] md:top-[12%] text-[24vw] md:text-[14vw] font-black text-neutral-900/[0.02] select-none pointer-events-none leading-none z-0 font-serif">
        空手
      </div>

      {/* ===== Stylized Rising Sun (Hinomaru) ===== */}
      <div className="absolute right-[-100px] md:right-[4%] lg:right-[8%] bottom-[8%] w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] lg:w-[520px] lg:h-[520px] z-0 pointer-events-none flex items-center justify-center">
        {/* Glowing red circle with premium gradient */}
        <div className="w-full h-full bg-gradient-to-tr from-[#E52B34] via-[#FF4D55] to-[#B81B22] opacity-[0.12] md:opacity-[0.16] rounded-full blur-[3px] shadow-[0_0_100px_rgba(229,43,52,0.3)] animate-pulse duration-[8000ms]" />
        
        {/* Subtle rotate ring */}
        <div className="absolute w-[80%] h-[80%] border border-dashed border-[#E52B34]/15 rounded-full animate-[spin_120s_linear_infinite] z-0" />
      </div>

      {/* Subtle golden ring representing focus and balance */}
      <div className="absolute right-[50px] md:right-[15%] bottom-[25%] w-[180px] h-[180px] border border-amber-500/10 rounded-full z-0 pointer-events-none animate-[spin_60s_linear_infinite]" />

      {/* Subtle ambient light from bottom left */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[#E52B34]/3 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Decorative vertical line accent */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "80px" }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute top-28 left-10 lg:left-16 w-[2px] bg-gradient-to-b from-[#E52B34] to-transparent z-[2] hidden md:block"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Column 1: Copywriting (Left) */}
          <div className="lg:col-span-7 space-y-6 z-10">
            <div className="space-y-4">
              <h1 className="font-impact-condensed text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-neutral-900 leading-[1.08]">
                ¿Qué <span className="text-[#E52B34] drop-shadow-[0_2px_8px_rgba(229,43,52,0.15)]">obtienes?</span>
              </h1>
              {/* Red Divider Line */}
              <div className="h-[3px] w-full bg-[#E52B34] max-w-md lg:max-w-xl" />
            </div>

            <p className="text-neutral-700 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
              Esta guía es un tributo vivo a la técnica original del maestro <span className="font-bold text-neutral-900">Kenwa Mabuni</span> y lo más apegado posible a lo original.
            </p>

            <div className="space-y-4 pt-2">
              <h3 className="text-[#8B6914] font-bold text-base sm:text-lg tracking-wider">
                CONTENIDO:
              </h3>
              <ul className="space-y-3.5 text-neutral-800 text-sm sm:text-base md:text-lg font-light">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#E52B34] shrink-0">1.-</span>
                  <span>Todas las Katas y Bunkais de 9°Kyu hasta 1er Dan C.N.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#E52B34] shrink-0">2.-</span>
                  <span>Todos los IDO-KIHON y KOTEI-KIHON correspondientes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#E52B34] shrink-0">3.-</span>
                  <span>Guía en PDFs con vocabulario en Japonés/Español</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#E52B34] shrink-0">4.-</span>
                  <span>Acceso a la Comunidad KARATE PARA LATINOS</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#E52B34] shrink-0">5.-</span>
                  <span>Acceso a WEBINARS y ASESORÍAS personalizadas por 1 año</span>
                </li>
              </ul>
            </div>


          </div>

          {/* Column 2: Video Player (Right) */}
          <div className="lg:col-span-5 lg:pt-16 flex justify-center w-full z-10">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl bg-black border border-neutral-200/80">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/l0clUO_IWTc"
                title="Karate para Latinos - Guía de Estudio"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
