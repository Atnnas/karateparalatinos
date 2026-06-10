"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Shield, Target } from "lucide-react";

export default function Nosotros() {
  return (
    <section
      id="nosotros"
      className="relative min-h-screen flex justify-center items-center overflow-hidden bg-[var(--background)] pt-36 pb-20 animate-fade-in"
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

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column 1: Biography Copy (Left) */}
          <div className="lg:col-span-7 space-y-8 z-10">
            
            {/* Header / Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className="font-title-serif text-xs text-[#556358] tracking-[0.25em] uppercase block">
                CONOCE AL CREADOR DEL CONTENIDO
              </span>
              
              <h1 className="font-impact-condensed text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider text-neutral-900 leading-none">
                Carlos Ávila
              </h1>

              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="inline-flex items-center gap-1.5 bg-[#E52B34]/8 border border-[#E52B34]/15 py-1 px-3 rounded-md text-[#E52B34] text-xs font-semibold uppercase tracking-wider">
                  <Target className="w-3.5 h-3.5" />
                  Dojo IKIGAI
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#8B6914]/8 border border-[#8B6914]/15 py-1 px-3 rounded-md text-[#8B6914] text-xs font-semibold uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5" />
                  Sistema DOJUTSU
                </span>
                <span className="inline-flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 py-1 px-3 rounded-md text-neutral-100 text-xs font-semibold uppercase tracking-wider shadow-sm">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  5th Dan C.N. & Jun-Shihan
                </span>
              </div>
            </motion.div>

            {/* Biography Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-5 text-neutral-700 text-sm sm:text-base font-light leading-relaxed"
            >
              <p className="font-medium text-neutral-950 text-base sm:text-lg italic border-l-2 border-[#556358] pl-4 py-1">
                "Hola, soy Carlos Ávila. He dedicado los últimos 45 años de mi vida al estudio y práctica del Karate Shito Ryu y hoy pongo toda esa experiencia a tu servicio."
              </p>

              <p>
                Actualmente cuento con el grado de <span className="font-semibold text-neutral-900">5th Dan C.N. y Jun-Shihan</span> avalado por la prestigiosa <span className="font-semibold text-[#E52B34]">WORLD SHITORYU KARATEDO FEDERATION (WSKF)</span>.
              </p>

              <p>
                Mi misión va más allá de enseñar técnicas; busca preservar la esencia de este arte para que tú también puedas beneficiarte de sus valores. Sin embargo, hay que entender que la defensa real requiere versatilidad. Por eso, he enriquecido mi camino estudiando disciplinas como <span className="font-semibold text-neutral-900">Judo, Ryukyu Kobudo, Shōrin-ryū y Sistema de Combate Ruso</span>, para ofrecerte una visión completa y efectiva.
              </p>
            </motion.div>

            {/* Dojo & Dojutsu Details Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="border-l-4 border-[#E52B34] bg-white/70 backdrop-blur-sm p-6 sm:p-7 rounded-r-2xl border border-neutral-200/80 shadow-sm space-y-4"
            >
              <h3 className="font-impact-condensed text-xl tracking-wider text-neutral-900 flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#E52B34]" />
                EL SISTEMA DOJUTSU
              </h3>
              
              <div className="space-y-3 text-neutral-600 text-xs sm:text-sm font-light leading-relaxed">
                <p>
                  El <span className="font-medium text-neutral-950">Sistema DOJUTSU</span>, como su mismo nombre lo indica, es la conservación del <span className="font-medium text-neutral-950">DO</span> tradicional que forja el carácter con ética, valores y principios; y <span className="font-medium text-neutral-950">JUTSU</span> es la adaptación de las técnicas de combate a situaciones reales callejeras, donde entrenamos desde la prevención, la disuasión y la confrontación.
                </p>
                <p>
                  Es un sistema sumamente versátil que se adapta a la morfología del estudiante, donde incluso aprendemos a improvisar objetos cotidianos como armas de defensa personal.
                </p>
              </div>
            </motion.div>

          </div>

          {/* Column 2: Sensei Photo Display (Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center items-end h-[400px] sm:h-[500px] lg:h-[600px] w-full"
          >
            {/* Background elements unique to the photo wrapper */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-[80%] h-[80%] bg-gradient-to-br from-neutral-100/50 to-neutral-200/20 rounded-full border border-neutral-300/30 shadow-inner blur-[1px]" />
              <div className="absolute w-[90%] h-[90%] border border-dashed border-[#E52B34]/10 rounded-full animate-[spin_180s_linear_infinite]" />
            </div>

            <div className="relative w-full h-full">
              <Image
                src="/senseiPortadaSinFondo.png"
                alt="Sensei Carlos Ávila"
                fill
                className="object-contain object-bottom drop-shadow-[-20px_15px_35px_rgba(0,0,0,0.16)]"
                priority
                quality={100}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
