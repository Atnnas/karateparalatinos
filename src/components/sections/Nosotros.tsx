"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Target } from "lucide-react";

export default function Nosotros() {
  return (
    <section
      id="nosotros"
      className="relative min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] flex justify-center items-center overflow-hidden bg-[var(--background)] pt-24 pb-0"
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
        className="absolute top-24 left-10 lg:left-16 w-[2px] bg-gradient-to-b from-[#E52B34] to-transparent z-[2] hidden md:block"
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch w-full">
          
          {/* Column 1: Biography Copy (Left) */}
          <div className="lg:col-span-7 space-y-7 pb-10 lg:pb-14 pt-4 flex flex-col justify-center">
            
            {/* Header / Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3.5"
            >
              <span className="font-title-serif text-xs text-[#556358] tracking-[0.25em] uppercase block">
                CONOCE AL CREADOR DEL CONTENIDO
              </span>
              
              <h1 className="font-impact-condensed text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wider text-neutral-900 leading-none">
                Carlos Ávila
              </h1>

              <div className="flex flex-wrap gap-2.5 pt-1.5">
                <span className="inline-flex items-center gap-1.5 bg-[#E52B34]/8 border border-[#E52B34]/15 py-1 px-3 rounded-md text-[#E52B34] text-xs font-semibold uppercase tracking-wider">
                  <Target className="w-3.5 h-3.5" />
                  Dojo IKIGAI
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#8B6914]/8 border border-[#8B6914]/15 py-1 px-3 rounded-md text-[#8B6914] text-xs font-semibold uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5" />
                  Sistema DOJUTSU
                </span>
              </div>
            </motion.div>

            {/* Achievements/Milestones Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-3 gap-4 border-y border-neutral-200/60 py-5 my-2"
            >
              <div className="text-left">
                <span className="block font-impact-condensed text-3xl sm:text-4xl text-[#E52B34] leading-none">45+</span>
                <span className="block text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest font-semibold mt-1.5">Años de Estudio</span>
              </div>
              <div className="text-left border-x border-neutral-200/60 px-4">
                <span className="block font-impact-condensed text-3xl sm:text-4xl text-neutral-900 leading-none">5° Dan</span>
                <span className="block text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest font-semibold mt-1.5">Cinta Negra</span>
              </div>
              <div className="text-left">
                <span className="block font-impact-condensed text-3xl sm:text-4xl text-[#8B6914] leading-none">WSKF</span>
                <span className="block text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest font-semibold mt-1.5">Jun-Shihan</span>
              </div>
            </motion.div>

            {/* Biography Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-4.5 text-neutral-700 text-sm sm:text-base font-light leading-relaxed"
            >
              <p className="font-medium text-neutral-950 text-base sm:text-lg italic border-l-4 border-[#E52B34] pl-4 py-1">
                "Hola, soy Carlos Ávila. He dedicado los últimos 45 años de mi vida al estudio y práctica del Karate Shito Ryu y hoy pongo toda esa experiencia a tu servicio."
              </p>

              <p>
                Actualmente cuento con el grado de <span className="font-semibold text-neutral-900">5th Dan C.N. y Jun-Shihan</span> avalado por la <span className="font-semibold text-neutral-950">WORLD SHITORYU KARATEDO FEDERATION (WSKF)</span>.
              </p>

              <p>
                Mi misión va más allá de enseñar técnicas; busca preservar la esencia de este arte para que te beneficies de sus valores. Entendiendo que la defensa real requiere versatilidad, he enriquecido mi camino estudiando <span className="font-semibold text-neutral-950">Judo, Ryukyu Kobudo, Shōrin-ryū y Sistema de Combate Ruso</span>.
              </p>
            </motion.div>

            {/* Dojo & Dojutsu Details Container */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-md border border-neutral-200/80 rounded-2xl p-6 sm:p-7 shadow-sm space-y-4"
            >
              <h3 className="font-impact-condensed text-xl tracking-wider text-neutral-900 flex items-center gap-2.5 border-b border-neutral-100 pb-3.5">
                <span className="h-2 w-2 rounded-full bg-[#E52B34]" />
                EL SISTEMA DOJUTSU
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="inline-block text-xs font-bold tracking-widest text-[#E52B34] uppercase bg-[#E52B34]/5 px-2.5 py-0.5 rounded">
                    DO (El Camino)
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    Conservación del camino tradicional que forja el carácter a través de la ética, los valores y principios.
                  </p>
                </div>
                <div className="space-y-2 border-t sm:border-t-0 sm:border-l border-neutral-200/60 pt-4 sm:pt-0 sm:pl-6">
                  <span className="inline-block text-xs font-bold tracking-widest text-[#8B6914] uppercase bg-[#8B6914]/5 px-2.5 py-0.5 rounded">
                    JUTSU (El Arte Técnico)
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    Técnicas de combate para la calle (prevención, disuasión, confrontación), adaptadas a tu morfología con uso de objetos cotidianos.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Column 2: Spacer for Absolute Image on Desktop */}
          <div className="lg:col-span-5 hidden lg:block pointer-events-none" />

        </div>
      </div>

      {/* Column 2 (Actual Image Container): absolute bottom-0 on desktop, relative flow at the end on mobile */}
      <div className="relative lg:absolute lg:right-0 lg:bottom-0 w-full lg:w-[42%] xl:w-[38%] h-[450px] sm:h-[550px] lg:h-[88%] z-10 select-none pointer-events-none flex items-end justify-center overflow-visible mt-6 lg:mt-0">
        
        {/* ===== Stylized Rising Sun (Hinomaru) behind the sensei ===== */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-visible pointer-events-none">
          {/* Glowing red circle with premium gradient */}
          <div className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] bg-gradient-to-tr from-[#E52B34] via-[#FF4D55] to-[#B81B22] opacity-[0.12] md:opacity-[0.16] rounded-full blur-[4px] shadow-[0_0_100px_rgba(229,43,52,0.3)] animate-pulse duration-[8000ms]" />
          
          {/* Subtle rotate ring */}
          <div className="absolute w-[80%] h-[80%] border border-dashed border-[#E52B34]/15 rounded-full animate-[spin_120s_linear_infinite]" />
          
          {/* Golden ring representing focus and balance */}
          <div className="absolute w-[60%] h-[60%] border border-amber-500/10 rounded-full animate-[spin_60s_linear_infinite]" />
        </div>

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
