"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronRight, Award, Sparkles } from "lucide-react";

const faqs = [
  {
    q: "¿Para quién está diseñado este producto?",
    a: "Cualquier persona que practique Karate o cualquier arte marcial, que quiera enriquecer sus conocimientos o aprender más sobre KARATE SHITORYU.",
    icon: HelpCircle
  },
  {
    q: "¿El material incluye soporte en video?",
    a: "Sí. Todas las Katas, Kihon y Bunkai vienen con explicaciones detalladas y soporte técnico visual en video liderado por el Sensei Carlos Ávila.",
    icon: Sparkles
  },
  {
    q: "¿Es necesario tener experiencia previa?",
    a: "No. El sistema de estudio está estructurado progresivamente, lo que es ideal tanto para principiantes absolutos como para practicantes avanzados.",
    icon: Award
  },
  {
    q: "¿Qué es el Sistema Dojutsu?",
    a: "Es nuestro método adaptativo que une la filosofía tradicional (Do) con técnicas reales de combate y defensa callejera disuasiva (Jutsu) adaptadas a tu morfología.",
    icon: HelpCircle
  },
  {
    q: "¿Cómo funciona la asesoría personalizada?",
    a: "Obtienes acceso a webinars mensuales y sesiones de retroalimentación en video donde evaluamos tu progreso técnico de forma individualizada.",
    icon: ChevronRight
  }
];

export default function Preguntas() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

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
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-title-serif text-xs text-[#556358] tracking-[0.25em] uppercase block mb-3"
          >
            RESOLVEMOS TUS DUDAS
          </motion.span>
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

        {/* Wrap de Preguntas */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center max-w-4xl mx-auto my-6 z-10">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = activeIndex === index;
            return (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(isOpen ? null : index)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-impact-condensed tracking-wider transition-all duration-300 border cursor-pointer ${
                  isOpen
                    ? "bg-[#E52B34] text-white border-[#E52B34] shadow-[0_6px_20px_rgba(229,43,52,0.35)]"
                    : "bg-white/45 hover:bg-white/75 border-neutral-300/70 text-neutral-800"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isOpen ? "text-white" : "text-[#E52B34]"}`} />
                {faq.q}
              </motion.button>
            );
          })}
        </div>

        {/* Revelador de Respuesta */}
        <div className="max-w-2xl w-full mx-auto min-h-[160px] flex items-center justify-center mt-2">
          <AnimatePresence mode="wait">
            {activeIndex !== null ? (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card p-6 sm:p-8 bg-white/70 shadow-sm border border-neutral-200/80 rounded-2xl w-full text-center relative overflow-hidden"
              >
                {/* Accent red bar */}
                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#E52B34]" />
                
                <div className="space-y-3">
                  <span className="font-title-serif text-[10px] text-[#8B6914] tracking-[0.25em] uppercase font-bold block">
                    RESPUESTA REVELADA
                  </span>
                  <p className="font-body text-neutral-800 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto">
                    {faqs[activeIndex].a}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                className="text-neutral-500 font-title-serif text-xs sm:text-sm tracking-wider uppercase text-center italic py-6"
              >
                Haz clic en cualquier pregunta de arriba para revelar su respuesta
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
