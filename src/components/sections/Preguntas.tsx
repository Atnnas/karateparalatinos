"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "¿Para quién está diseñado este producto?",
    a: "Cualquier persona que practique Karate o cualquier arte marcial, que quiera enriquecer sus conocimientos o aprender más sobre KARATE SHITORYU.",
    icon: HelpCircle
  }
];

export default function Preguntas() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section
      id="preguntas"
      className="relative min-h-[calc(100vh-80px)] lg:min-h-0 lg:flex-1 flex justify-center items-center overflow-hidden bg-[var(--background)]"
    >
      {/* ===== Background Watermark Kanji (Traditional Vibe) ===== */}
      <div className="absolute left-10 md:left-20 lg:left-32 top-[18%] md:top-[12%] text-[24vw] md:text-[14vw] font-black text-neutral-900/[0.02] select-none pointer-events-none leading-none z-0 font-serif">
        空手
      </div>

      {/* Subtle ambient light from bottom left */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[#E52B34]/3 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Decorative vertical line accent */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "60px" }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute top-28 left-10 lg:left-16 w-[2px] bg-gradient-to-b from-[#E52B34] to-transparent z-[2] hidden md:block"
      />

      {/* Main Container with top padding for navbar safety */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full h-full flex flex-col justify-between pt-28 pb-6 lg:pt-32 lg:pb-8">
        
        {/* Centered Title */}
        <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-8">
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

        {/* Content Grid under the title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full flex-1">
          
          {/* Column 1: FAQ Reveal Box (Left) */}
          <div className="lg:col-span-7 space-y-5 pb-6 lg:pb-0 flex flex-col justify-center">
            
            {/* Interactive Question Pill */}
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

            {/* Answer Display */}
            <div className="min-h-[140px] flex items-center justify-center relative z-10">
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

                    {/* Hanko-style seal watermark */}
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

          {/* Column 2: Spacer for Absolute Image on Desktop */}
          <div className="lg:col-span-5 hidden lg:block pointer-events-none" />

        </div>
      </div>

      {/* ===== Stylized Rising Sun (Hinomaru) behind the sensei ===== */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-visible pointer-events-none">
        {/* Glowing red circle with premium gradient */}
        <div className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] bg-gradient-to-tr from-[#E52B34] via-[#FF4D55] to-[#B81B22] opacity-[0.12] md:opacity-[0.16] rounded-full blur-[4px] shadow-[0_0_100px_rgba(229,43,52,0.3)] animate-pulse duration-[8000ms]" />
        
        {/* Subtle rotate ring */}
        <div className="absolute w-[80%] h-[80%] border border-dashed border-[#E52B34]/15 rounded-full animate-[spin_120s_linear_infinite]" />
        
        {/* Golden ring representing focus and balance */}
        <div className="absolute w-[60%] h-[60%] border border-amber-500/10 rounded-full animate-[spin_60s_linear_infinite]" />
      </div>

      {/* Column 2 (Actual Image Container): absolute bottom-0 on desktop, relative flow at the end on mobile */}
      <div className="relative lg:absolute lg:right-0 lg:top-24 lg:bottom-0 w-full lg:w-[42%] xl:w-[38%] h-[450px] sm:h-[550px] lg:h-auto z-10 select-none pointer-events-none flex items-end justify-center overflow-visible mt-6 lg:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full flex items-end justify-center overflow-visible"
        >
          <Image
            src="/senseiPortadaSinFondo.png"
            alt="Sensei Carlos Ávila"
            fill
            className="object-contain object-bottom drop-shadow-[-20px_10px_30px_rgba(0,0,0,0.18)]"
            priority
            quality={100}
          />
        </motion.div>
      </div>

    </section>
  );
}
