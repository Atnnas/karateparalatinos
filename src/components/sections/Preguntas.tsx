"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

export default function Preguntas() {
  return (
    <section
      id="preguntas"
      className="relative min-h-[calc(100vh-80px)] lg:min-h-0 lg:flex-1 flex justify-center items-center overflow-hidden bg-[var(--background)] pt-24 pb-0"
    >
      {/* ===== Background Watermark Kanji (Traditional Vibe) ===== */}
      <div className="absolute left-10 md:left-20 lg:left-32 top-[18%] md:top-[12%] text-[24vw] md:text-[14vw] font-black text-neutral-900/[0.02] select-none pointer-events-none leading-none z-0 font-serif">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-center py-4">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-impact-condensed text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide text-neutral-900 leading-[1.08]"
          >
            PREGUNTAS <span className="text-[#E52B34] drop-shadow-[0_2px_8px_rgba(229,43,52,0.15)]">FRECUENTES</span>
          </motion.h2>
        </div>

        {/* Tarjeta de Pregunta */}
        <div className="max-w-2xl w-full mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card p-6 sm:p-8 bg-white/60 shadow-sm border border-neutral-200/80 rounded-2xl"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#E52B34]/10 border border-[#E52B34]/25 flex items-center justify-center text-[#E52B34] shrink-0 mt-1">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="font-impact-condensed text-lg sm:text-xl text-neutral-900 tracking-wide">
                  ¿Para quién está diseñado este producto?
                </h3>
                <p className="font-body text-neutral-700 text-sm sm:text-base font-light leading-relaxed">
                  Cualquier persona que practique Karate o cualquier arte marcial, que quiera enriquecer sus conocimientos o aprender más sobre <span className="font-semibold text-neutral-950">KARATE SHITORYU</span>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
