"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "¿Para quién está dirigida la Guía de Estudio?",
    a: "Para practicantes de Karate de habla hispana que deseen entrenar en casa, repasar técnicas o complementar su aprendizaje en el Dojo, desde cinturón blanco (9º Kyu) hasta cinta negra (1er Dan)."
  },
  {
    q: "¿El material incluye videos y explicaciones?",
    a: "Sí. La guía cuenta con explicaciones detalladas y soporte técnico visual en video para todas las Katas, Kihon y Bunkai (aplicación real) lideradas por el Sensei Carlos Ávila."
  },
  {
    q: "¿Es necesario tener experiencia previa?",
    a: "No. El sistema de estudio está estructurado de manera progresiva y adaptativa, lo que permite a principiantes absolutos aprender la biomecánica y bases desde cero."
  },
  {
    q: "¿Qué es el Sistema Dojutsu y cómo se integra?",
    a: "Es nuestro método que conserva la esencia y valores tradicionales (Do) combinándolos con técnicas de combate reales, prevención y disuasión (Jutsu) adaptadas a tu morfología."
  },
  {
    q: "¿Cómo funciona la asesoría personalizada?",
    a: "Al adquirir la guía, obtienes acceso a webinars mensuales y sesiones de retroalimentación donde el Sensei y su equipo evalúan tu progreso técnico mediante video."
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-neutral-600 mt-4 font-light leading-relaxed text-sm sm:text-base max-w-2xl mx-auto"
          >
            Encuentra respuestas rápidas sobre nuestra metodología de enseñanza, requisitos y soporte de asesoría.
          </motion.p>
        </div>

        {/* Acordeón de FAQs */}
        <div className="max-w-3xl w-full mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card p-4 sm:p-6 bg-white/60 shadow-sm space-y-3"
          >
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div 
                  key={index} 
                  className={`border border-neutral-200/60 rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? "bg-white/80 border-[#E52B34]/30 shadow-sm" : "bg-white/40 hover:bg-white/70"}`}
                >
                  <button
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between py-3 px-4 text-left font-impact-condensed text-sm sm:text-base tracking-wide text-neutral-900 focus:outline-none"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className={`w-4 h-4 shrink-0 transition-colors duration-300 ${isOpen ? "text-[#E52B34]" : "text-[#556358]"}`} />
                      {faq.q}
                    </span>
                    <ChevronDown 
                      className={`w-4 h-4 shrink-0 text-neutral-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#E52B34]" : ""}`} 
                    />
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4.5 pt-1 text-neutral-600 font-body text-xs sm:text-sm font-light leading-relaxed border-t border-neutral-100/60 mt-1">
                      {faq.a}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
