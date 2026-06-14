"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Camera, Mic, Target, Eye } from "lucide-react";

export default function Herramientas() {
  return (
    <section
      id="herramientas"
      className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-start items-center overflow-x-hidden bg-[var(--background)] preguntas-section pb-20"
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

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full flex flex-col justify-start items-center pt-0 pb-10">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-title-serif text-xs text-[#556358] tracking-[0.25em] uppercase block mb-3"
          >
            CENTRO DIGITAL DE AYUDA
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-impact-condensed text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-neutral-900 leading-[1.08] mb-4"
          >
            HERRAMIENTAS PARA <span className="text-[#E52B34] drop-shadow-[0_2px_8px_rgba(229,43,52,0.15)]">ENTRENAR</span> EN CASA
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-neutral-600 mt-4 font-light leading-relaxed text-sm sm:text-base max-w-2xl mx-auto"
          >
            Aprovecha la última tecnología de visión artificial y control por voz en el navegador para perfeccionar tu karate desde tu propio hogar.
          </motion.p>
        </div>

        {/* Kihon Online Presentation Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-card w-full max-w-4xl p-8 sm:p-10 md:p-12 bg-white/70 shadow-md border border-neutral-200/90 rounded-2xl relative overflow-hidden text-center flex flex-col items-center"
        >
          {/* Accent border left */}
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-[#E52B34] rounded-l-2xl" />

          <div className="space-y-6 w-full max-w-2xl">
            <span className="font-title-serif text-xs text-[#E52B34] tracking-[0.2em] uppercase font-bold block">
              ANALIZADOR INTELIGENTE DE POSTURA
            </span>
            <h3 className="font-impact-condensed text-2xl sm:text-3xl md:text-4xl text-neutral-900 tracking-wide leading-snug">
              KIHON ONLINE (Kihon - 基本)
            </h3>
            
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#E52B34] to-transparent mx-auto" />

            <p className="font-body text-neutral-700 text-base sm:text-lg font-light leading-relaxed">
              Corrige y perfecciona tus posiciones básicas (Dachi) y técnicas de defensa y golpeo mediante visión artificial en tiempo real. Activa tu cámara web para obtener métricas biomecánicas inmediatas de tus codos y rodillas.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-4 font-body text-sm text-neutral-600">
              <div className="flex gap-3 items-start">
                <Camera className="w-5 h-5 text-[#E52B34] shrink-0 mt-0.5" />
                <span><strong className="text-neutral-900 font-semibold">Análisis en tiempo real:</strong> Mide y visualiza los ángulos de tus articulaciones de manera instantánea.</span>
              </div>
              <div className="flex gap-3 items-start">
                <Mic className="w-5 h-5 text-[#E52B34] shrink-0 mt-0.5" />
                <span><strong className="text-neutral-900 font-semibold">Comandos por voz:</strong> Di la palabra <span className="font-bold text-[#E52B34]">&quot;Guardar&quot;</span> para fijar una pose sin necesidad de tocar la pantalla.</span>
              </div>
              <div className="flex gap-3 items-start">
                <Target className="w-5 h-5 text-[#E52B34] shrink-0 mt-0.5" />
                <span><strong className="text-neutral-900 font-semibold">Silueta fantasma:</strong> Compara tu posición actual directamente contra tu pose de referencia guardada.</span>
              </div>
              <div className="flex gap-3 items-start">
                <Eye className="w-5 h-5 text-[#E52B34] shrink-0 mt-0.5" />
                <span><strong className="text-neutral-900 font-semibold">Dos modos de entrenamiento:</strong> Alterna entre el modo guiado asistido o el modo experto minimalista.</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6">
              <Link href="/herramientas/kihon-online" className="btn-kpl-primary text-sm tracking-widest px-8 py-3.5 shadow-md">
                ENTRAR AL DOJO DIGITAL
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

