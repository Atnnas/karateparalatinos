"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

export default function Preguntas() {
  return (
    <section
      id="preguntas"
      className="relative min-h-[calc(100vh-80px)] lg:min-h-0 lg:flex-1 flex justify-center items-center overflow-hidden bg-[var(--background)]"
    >
      {/* ===== Background Watermark Kanji (Traditional Vibe) ===== */}
      <div className="absolute left-10 md:left-20 lg:left-32 top-[18%] md:top-[12%] text-[24vw] md:text-[14vw] font-black text-neutral-900/[0.02] select-none pointer-events-none leading-none z-0 font-serif">
        空手
      </div>

      {/* ===== Stylized Rising Sun (Hinomaru) centered in background ===== */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-visible pointer-events-none">
        {/* Glowing red circle with premium gradient */}
        <div className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[480px] bg-gradient-to-tr from-[#E52B34] via-[#FF4D55] to-[#B81B22] opacity-[0.1] md:opacity-[0.14] rounded-full blur-[4px] shadow-[0_0_100px_rgba(229,43,52,0.25)] animate-pulse duration-[8000ms]" />
        
        {/* Subtle rotate ring */}
        <div className="absolute w-[80%] h-[80%] border border-dashed border-[#E52B34]/10 rounded-full animate-[spin_120s_linear_infinite]" />
        
        {/* Golden ring representing focus and balance */}
        <div className="absolute w-[60%] h-[60%] border border-amber-500/5 rounded-full animate-[spin_60s_linear_infinite]" />
      </div>

      {/* Subtle ambient light from bottom left */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[#E52B34]/3 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Decorative vertical line accent */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "60px" }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute top-24 left-10 lg:left-16 w-[2px] bg-gradient-to-b from-[#E52B34] to-transparent z-[2] hidden md:block"
      />

      {/* Main Container with optimized top padding to tighten space and larger bottom padding to shift content up */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full h-full flex flex-col justify-center items-center pt-24 pb-20 lg:pt-26 lg:pb-32">
        
        {/* Centered Title with tighter margin bottom */}
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

        {/* Centered, Wide, Premium FAQ Card */}
        <div className="max-w-3xl w-full mx-auto z-10 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card p-8 sm:p-10 md:p-12 bg-white/70 shadow-md border border-neutral-200/90 rounded-2xl relative overflow-hidden text-center w-full"
          >
            {/* Red accent bar on the left side of the card */}
            <div className="absolute top-0 bottom-0 left-0 w-2 bg-[#E52B34]" />

            {/* Hanko-style seal watermark */}
            <div className="absolute right-6 bottom-6 text-5xl font-serif text-[#E52B34]/[0.05] select-none pointer-events-none font-bold">
              印
            </div>

            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#E52B34]/10 border border-[#E52B34]/25 flex items-center justify-center text-[#E52B34]">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="font-impact-condensed text-xl sm:text-2xl md:text-3xl text-neutral-900 tracking-wide">
                  ¿Para quién está diseñado este producto?
                </h3>
              </div>

              {/* Elegant divider */}
              <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#E52B34] to-transparent mx-auto" />

              <p className="font-body text-neutral-800 text-base sm:text-lg md:text-xl font-light leading-relaxed">
                Cualquier persona que practique Karate o cualquier arte marcial, que quiera enriquecer sus conocimientos o aprender más sobre <span className="font-semibold text-neutral-950">KARATE SHITORYU</span>.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
