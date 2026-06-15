"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Camera, Mic, Target, Eye, Video, Sparkles, Zap, Lock, Users } from "lucide-react";

export default function Herramientas() {
  return (
    <section
      id="herramientas"
      className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-start items-center overflow-x-hidden bg-[var(--background)] preguntas-section pb-20"
    >
      {/* ===== Background Watermark Kanji (Traditional Vibe) ===== */}
      <div className="absolute right-10 md:right-20 lg:right-32 top-[10%] text-[24vw] md:text-[14vw] font-black text-neutral-900/[0.012] select-none pointer-events-none leading-none z-0 font-serif">
        空手
      </div>

      {/* ===== Stylized Rising Sun (Hinomaru) ===== */}
      <div className="absolute right-[-100px] md:right-[4%] lg:right-[8%] bottom-[8%] w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] lg:w-[520px] lg:h-[520px] z-0 pointer-events-none flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-tr from-[#E52B34] via-[#FF4D55] to-[#B81B22] opacity-[0.10] rounded-full blur-[3px] shadow-[0_0_100px_rgba(229,43,52,0.25)] animate-pulse duration-[8000ms]" />
        <div className="absolute w-[80%] h-[80%] border border-dashed border-[#E52B34]/15 rounded-full animate-[spin_120s_linear_infinite] z-0" />
      </div>

      <div className="absolute right-[50px] md:right-[15%] bottom-[25%] w-[180px] h-[180px] border border-amber-500/10 rounded-full z-0 pointer-events-none animate-[spin_60s_linear_infinite]" />
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
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-title-serif text-xs text-[#556358] tracking-[0.25em] uppercase block mb-3"
          >
            CENTRO DIGITAL DE ENTRENAMIENTO
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
            Explora las herramientas interactivas que estamos construyendo. Aprovechando la visión artificial por cámara, reconocimiento de voz y sincronización en tiempo real para optimizar tu Karate.
          </motion.p>
        </div>

        {/* Grid Container */}
        <div className="w-full flex flex-col gap-8 items-center">
          
          {/* Card Destacada (Kihon Online - Activa) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card w-full max-w-4xl p-8 sm:p-10 md:p-12 bg-white/70 shadow-md border border-neutral-200/90 rounded-2xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center"
          >
            {/* Accent border left */}
            <div className="absolute top-0 bottom-0 left-0 w-2 bg-[#E52B34] rounded-l-2xl" />

            <div className="flex-1 space-y-5 text-left">
              <div className="flex items-center gap-2">
                <span className="bg-[#E52B34] text-white text-[10px] font-bold font-title-serif px-2.5 py-1 uppercase tracking-wider">
                  Disponible
                </span>
                <span className="font-title-serif text-xs text-[#E52B34] tracking-[0.2em] uppercase font-bold">
                  ANALIZADOR DE POSTURA
                </span>
              </div>
              <h3 className="font-impact-condensed text-2xl sm:text-3xl md:text-4xl text-neutral-900 tracking-wide leading-snug">
                KIHON ONLINE (Kihon - 基本)
              </h3>
              
              <div className="h-[2px] w-20 bg-[#E52B34]" />

              <p className="font-body text-neutral-700 text-sm sm:text-base font-light leading-relaxed">
                Evalúa tus posiciones básicas (Dachi) y técnicas de golpeo mediante visión artificial en tiempo real. Activa tu cámara web para obtener métricas biomecánicas inmediatas de tus codos y rodillas, compáralas con siluetas de referencia y guarda poses con comandos de voz.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left pt-2 font-body text-[13px] text-neutral-600">
                <div className="flex gap-2.5 items-start">
                  <Camera className="w-4 h-4 text-[#E52B34] shrink-0 mt-0.5" />
                  <span>Análisis biomecánico angular instantáneo.</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <Mic className="w-4 h-4 text-[#E52B34] shrink-0 mt-0.5" />
                  <span>Comandos por voz para congelar y guardar poses.</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <Target className="w-4 h-4 text-[#E52B34] shrink-0 mt-0.5" />
                  <span>Alineación visual contra siluetas fantasma.</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <Eye className="w-4 h-4 text-[#E52B34] shrink-0 mt-0.5" />
                  <span>Modos de visualización guiado y experto.</span>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/herramientas/kihon-online" className="btn-kpl-primary text-xs tracking-widest px-8 py-3.5 shadow-md inline-block">
                  ENTRAR AL DOJO DIGITAL
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Sub-grid of Future / Roadmap Apps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            
            {/* Card 1: Dojo Virtual (Meet Collaboration) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="glass-card p-6 bg-white/50 border border-neutral-200/60 rounded-xl relative overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-[#E52B34]/10 rounded-none flex items-center justify-center text-[#E52B34] group-hover:scale-110 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="bg-[#8B6914]/10 text-[#8B6914] text-[9px] font-bold font-title-serif px-2 py-0.5 uppercase tracking-wider flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> Instructor
                  </span>
                </div>
                <span className="font-title-serif text-[10px] text-neutral-500 uppercase tracking-widest block font-bold">Próximamente</span>
                <h4 className="font-impact-condensed text-lg text-neutral-900 tracking-wide">
                  DOJO VIRTUAL // MEET
                </h4>
                <p className="font-body text-xs text-neutral-600 font-light leading-relaxed">
                  Conexión interactiva en tiempo real con Google Meet. El Sensei evalúa los ángulos del alumno en vivo, activa siluetas guía de forma remota y guarda poses a la base de datos sin molestar al practicante.
                </p>
              </div>
              <div className="pt-5 border-t border-neutral-200/50 mt-4 flex items-center justify-between text-neutral-400 text-xs font-semibold">
                <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5" /> Meet API Integration</span>
                <span className="text-[10px] text-amber-600 font-bold">En Desarrollo</span>
              </div>
            </motion.div>

            {/* Card 2: Kata AI Analyzer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card p-6 bg-white/50 border border-neutral-200/60 rounded-xl relative overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-[#E52B34]/10 rounded-none flex items-center justify-center text-[#E52B34] group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="bg-neutral-100 text-neutral-500 text-[9px] font-bold font-title-serif px-2 py-0.5 uppercase tracking-wider">
                    Roadmap
                  </span>
                </div>
                <span className="font-title-serif text-[10px] text-neutral-500 uppercase tracking-widest block font-bold">Planificado</span>
                <h4 className="font-impact-condensed text-lg text-neutral-900 tracking-wide">
                  KATA AI ANALYZER
                </h4>
                <p className="font-body text-xs text-neutral-600 font-light leading-relaxed">
                  Realiza secuencias de formas completas (Katas como Heian Shodan). Nuestra red neuronal evaluará de forma secuencial la transición de peso, el ritmo, los giros y la correcta aplicación técnica para darte una calificación final.
                </p>
              </div>
              <div className="pt-5 border-t border-neutral-200/50 mt-4 flex items-center justify-between text-neutral-400 text-xs font-semibold">
                <span className="flex items-center gap-1"><Camera className="w-3.5 h-3.5" /> Sequential Body Tracking</span>
                <span className="text-[10px] text-neutral-500 font-bold">Fase Diseño</span>
              </div>
            </motion.div>

            {/* Card 3: Kumite Speedometer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass-card p-6 bg-white/50 border border-neutral-200/60 rounded-xl relative overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-[#E52B34]/10 rounded-none flex items-center justify-center text-[#E52B34] group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="bg-neutral-100 text-neutral-500 text-[9px] font-bold font-title-serif px-2 py-0.5 uppercase tracking-wider">
                    Roadmap
                  </span>
                </div>
                <span className="font-title-serif text-[10px] text-neutral-500 uppercase tracking-widest block font-bold">Planificado</span>
                <h4 className="font-impact-condensed text-lg text-neutral-900 tracking-wide">
                  KUMITE SPEEDOMETER
                </h4>
                <p className="font-body text-xs text-neutral-600 font-light leading-relaxed">
                  Pon a prueba tus reflejos y velocidad de ataque contra el reloj. Un indicador visual de estímulo medirá con milisegundos tu tiempo de reacción física y la aceleración en 2D de tus golpes para registrar récords.
                </p>
              </div>
              <div className="pt-5 border-t border-neutral-200/50 mt-4 flex items-center justify-between text-neutral-400 text-xs font-semibold">
                <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Acceleration Metrics</span>
                <span className="text-[10px] text-neutral-500 font-bold">Fase Diseño</span>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
