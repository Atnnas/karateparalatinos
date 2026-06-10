"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Swords } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex justify-center items-center overflow-hidden bg-[var(--background)]"
    >
      {/* ===== Background Watermark Kanji (Traditional Vibe) ===== */}
      <div className="absolute right-10 md:right-20 lg:right-32 top-[18%] md:top-[12%] text-[24vw] md:text-[14vw] font-black text-neutral-900/[0.02] select-none pointer-events-none leading-none z-0 font-serif">
        空手
      </div>

      {/* ===== Stylized Rising Sun (Hinomaru) behind the sensei ===== */}
      <div className="absolute right-[-100px] md:right-[4%] lg:right-[8%] bottom-[8%] w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] lg:w-[520px] lg:h-[520px] z-0 pointer-events-none flex items-center justify-center">
        {/* Glowing red circle with premium gradient */}
        <div className="w-full h-full bg-gradient-to-tr from-[#E52B34] via-[#FF4D55] to-[#B81B22] opacity-[0.12] md:opacity-[0.16] rounded-full blur-[3px] shadow-[0_0_100px_rgba(229,43,52,0.3)] animate-pulse duration-[8000ms]" />
        
        {/* Subtle rotate ring */}
        <div className="absolute w-[80%] h-[80%] border border-dashed border-[#E52B34]/15 rounded-full animate-[spin_120s_linear_infinite] z-0" />
      </div>

      {/* Subtle golden ring representing focus and balance */}
      <div className="absolute right-[50px] md:right-[15%] bottom-[25%] w-[180px] h-[180px] border border-amber-500/10 rounded-full z-0 pointer-events-none animate-[spin_60s_linear_infinite]" />

      {/* ===== Sensei Background Image (PNG Cutout with Drop Shadow) ===== */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-0 bottom-0 w-full md:w-[55%] lg:w-[48%] h-[65%] md:h-[88%] z-10 select-none pointer-events-none flex items-end justify-end"
      >
        <div className="relative w-full h-full max-h-[500px] md:max-h-[660px] lg:max-h-[720px] px-6 sm:px-12 md:px-0">
          <Image
            src="/senseiPortadaSinFondo.png"
            alt="Sensei — Karate para Latinos"
            fill
            className="object-contain object-bottom md:object-right-bottom drop-shadow-[-25px_20px_40px_rgba(0,0,0,0.18)]"
            priority
            quality={100}
          />
        </div>
      </motion.div>

      {/* Subtle ambient light from bottom left */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[#E52B34]/3 rounded-full blur-[120px] pointer-events-none z-[1]" />

      {/* Decorative vertical line accent */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "80px" }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute top-28 left-10 lg:left-16 w-[2px] bg-gradient-to-b from-[#E52B34] to-transparent z-[2] hidden md:block"
      />

      {/* ===== Content Section ===== */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full pt-36 pb-20">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl">
          


          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-[#556358]/8 border border-[#556358]/15 py-1.5 px-4 rounded-full text-[#556358] text-xs tracking-widest font-impact-condensed">
              <Swords className="w-3.5 h-3.5 text-[#E52B34]" />
              GUÍA DE ESTUDIO • SHITORYU • DOJO EN CASA
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-impact-condensed text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide text-neutral-900 leading-[1.08]"
          >
            Una Guía que te acompaña
            <br />
            <span className="text-[#E52B34] drop-shadow-[0_2px_8px_rgba(229,43,52,0.15)]">
              a donde sea que vayas
            </span>
          </motion.h1>

          {/* Subtitle / Copy details - Two Columns Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Column 1: Intro Question & Mindset Quote */}
            <div className="space-y-6 flex flex-col justify-between">
              <p className="text-neutral-700 text-base sm:text-lg md:text-xl font-light leading-relaxed">
                ¿Sientes que te estás quedando atrás en tu camino al Cinturón Negro porque el trabajo o los estudios no te dejan ir al Dojo?
              </p>
              
              <div className="pl-4 border-l-2 border-[#E52B34] italic text-neutral-900 bg-neutral-100/50 py-3 px-4 rounded-r-lg shadow-sm border-t border-b border-r border-neutral-200/40">
                <span className="text-xs font-title-serif text-[#E52B34] block mb-1 tracking-wider not-italic font-bold">EL PRINCIPIO</span>
                "No basta con mover el cuerpo, ¡un verdadero karateca también entrena la mente!"
              </div>
            </div>
            
            {/* Column 2: Solution & Details */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-4 text-neutral-600 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Por eso diseñé la <span className="font-semibold text-neutral-900">GUÍA DE ESTUDIO KARATE SHITORYU</span>.
                </p>
                <p>
                  Es tu compañero de entrenamiento personal para esos días de viaje, de mucho trabajo o simplemente para perfeccionar tu técnica desde casa.
                </p>
              </div>

              <div className="border-l-2 border-amber-500/50 pl-4 py-3 bg-amber-500/[0.03] rounded-r-lg border-t border-b border-r border-neutral-200/40 shadow-sm">
                <span className="text-[10px] font-title-serif text-amber-600 block mb-1 tracking-wider font-bold">COBERTURA COMPLETA</span>
                <p className="text-neutral-800 text-sm font-medium leading-relaxed">
                  Todo el conocimiento que necesitas, desde <span className="text-[#E52B34] font-semibold">9no Kyu hasta 1er Dan</span>, al alcance de tu mano.
                </p>
              </div>
            </div>
          </motion.div>


        </div>
      </div>
    </section>
  );
}
