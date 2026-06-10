"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Award, Compass, Heart, Shield, CheckCircle2 } from "lucide-react";

const faqs = [
  {
    q: "¿Para quién está diseñado este producto?",
    a: "Cualquier persona que practique Karate o cualquier arte marcial, que quiera enriquecer sus conocimientos o aprender más sobre KARATE SHITORYU.",
    icon: HelpCircle
  }
];

const dojoKun = [
  {
    kanji: "一",
    romaji: "Jinkaku Kansei ni Tumururu Koto",
    translation: "Perfeccionar el carácter.",
    icon: Heart
  },
  {
    kanji: "一",
    romaji: "Makoto no Michi o Mamoru Koto",
    translation: "Ser sincero, leal y fiel.",
    icon: Shield
  },
  {
    kanji: "一",
    romaji: "Doryoku no Seishin o Yasinau Koto",
    translation: "Fomentar el esfuerzo y la constancia.",
    icon: Award
  },
  {
    kanji: "一",
    romaji: "Reigi o Otonzuru Koto",
    translation: "Respetar la etiqueta y la cortesía.",
    icon: Compass
  },
  {
    kanji: "一",
    romaji: "Kyohei no Yu o Imashimuru Koto",
    translation: "Guardar el autocontrol y evitar la violencia.",
    icon: CheckCircle2
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

      {/* ===== Stylized Rising Sun (Hinomaru) behind the content ===== */}
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

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 w-full h-full flex flex-col justify-center py-4">
        
        {/* Centered Heading */}
        <div className="text-center max-w-3xl mx-auto mb-4 lg:mb-6">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-title-serif text-xs text-[#556358] tracking-[0.25em] uppercase block mb-2"
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

        {/* 2-Column Creative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch w-full max-w-6xl mx-auto mt-2">
          
          {/* Column 1: FAQ Interactive Reveal (Left) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
            <span className="font-title-serif text-[10px] text-[#556358] tracking-[0.2em] uppercase font-bold text-center lg:text-left">
              INTERFAZ DE CONSULTA
            </span>

            {/* Wrap of Pills */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start z-10">
              {faqs.map((faq, index) => {
                const Icon = faq.icon;
                const isOpen = activeIndex === index;
                return (
                  <motion.button
                    key={index}
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-impact-condensed tracking-wider transition-all duration-300 border cursor-pointer ${
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

            {/* Answer Display Card */}
            <div className="min-h-[150px] flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                {activeIndex !== null ? (
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-card p-6 bg-white/75 shadow-sm border border-neutral-200/80 rounded-2xl w-full relative overflow-hidden text-left"
                  >
                    {/* Red vertical border accent */}
                    <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#E52B34]" />

                    {/* Small traditional seal detail (hanko style watermark) */}
                    <div className="absolute right-4 bottom-4 text-3xl font-serif text-[#E52B34]/[0.06] select-none pointer-events-none font-bold">
                      印
                    </div>
                    
                    <div className="space-y-2.5">
                      <span className="font-title-serif text-[9px] text-[#8B6914] tracking-[0.25em] uppercase font-bold block">
                        RESPUESTA REVELADA
                      </span>
                      <p className="font-body text-neutral-800 text-sm sm:text-base font-light leading-relaxed">
                        {faqs[activeIndex].a}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    className="text-neutral-500 font-title-serif text-xs tracking-wider uppercase text-center italic py-6 border border-dashed border-neutral-300/50 rounded-2xl w-full bg-white/20"
                  >
                    Haz clic en la pregunta para revelar su respuesta
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Column 2: Dojo Kun Rules Plaque (Right) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-3 mt-6 lg:mt-0">
            <span className="font-title-serif text-[10px] text-[#556358] tracking-[0.2em] uppercase font-bold text-center lg:text-left">
              FILOSOFÍA DEL DOJO (DOJO KUN)
            </span>

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card p-4 sm:p-5 bg-white/50 border border-neutral-200/90 rounded-2xl shadow-sm relative overflow-hidden"
            >
              {/* Golden vertical border accent */}
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#8B6914]/65" />
              
              <div className="space-y-2.5">
                {dojoKun.map((rule, idx) => {
                  const RuleIcon = rule.icon;
                  return (
                    <div 
                      key={idx}
                      className="flex items-start gap-3 p-1.5 rounded-lg hover:bg-white/40 transition-colors duration-200 group"
                    >
                      {/* Kanji index */}
                      <span className="font-serif text-[#E52B34] font-bold text-base w-5 text-center leading-none mt-0.5 shrink-0 group-hover:scale-110 transition-transform">
                        {rule.kanji}
                      </span>
                      
                      <div className="space-y-0.5">
                        {/* Romaji */}
                        <span className="block font-impact-condensed text-[11px] sm:text-xs text-neutral-800 tracking-wider font-semibold">
                          {rule.romaji}
                        </span>
                        {/* Spanish Translation */}
                        <span className="block font-body text-[11px] sm:text-xs text-neutral-600 font-light leading-snug">
                          {rule.translation}
                        </span>
                      </div>
                      
                      <RuleIcon className="w-3.5 h-3.5 text-[#8B6914]/40 group-hover:text-[#8B6914]/80 ml-auto shrink-0 mt-1 transition-colors" />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
