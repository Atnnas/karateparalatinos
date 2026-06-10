"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Target } from "lucide-react";

export default function Nosotros() {
  return (
    <section
      id="nosotros"
      className="relative min-h-screen flex justify-center items-center overflow-hidden bg-[var(--background)] pt-36 pb-0"
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
        animate={{ height: "80px" }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute top-28 left-10 lg:left-16 w-[2px] bg-gradient-to-b from-[#E52B34] to-transparent z-[2] hidden md:block"
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Column 1: Biography Copy (Left) */}
          <div className="lg:col-span-7 space-y-8 pb-20 pt-4 flex flex-col justify-center">
            
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
              
              <h1 className="font-impact-condensed text-5xl sm:text-7xl lg:text-8xl font-bold tracking-wider text-neutral-900 leading-[0.9]">
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
              </div>
            </motion.div>

            {/* Achievements/Milestones Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-3 gap-4 border-y border-neutral-200/60 py-6"
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
                <span className="block text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest font-semibold mt-1.5">Grado Jun-Shihan</span>
              </div>
            </motion.div>

            {/* Biography Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5 text-neutral-700 text-sm sm:text-base font-light leading-relaxed"
            >
              <p className="font-medium text-neutral-950 text-base sm:text-lg italic border-l-2 border-[#E52B34] pl-4 py-1">
                "Hola, soy Carlos Ávila. He dedicado los últimos 45 años de mi vida al estudio y práctica del Karate Shito Ryu y hoy pongo toda esa experiencia a tu servicio."
              </p>

              <p>
                Actualmente cuento con el grado de <span className="font-semibold text-neutral-900">5th Dan C.N. y Jun-Shihan</span> avalado por la <span className="font-semibold text-neutral-950">WORLD SHITORYU KARATEDO FEDERATION (WSKF)</span>.
              </p>

              <p>
                Mi misión va más allá de enseñar técnicas; busca preservar la esencia de este arte para que tú también puedas beneficiarte de sus valores. Sin embargo, hay que entender que la defensa real requiere versatilidad. Por eso, he enriquecido mi camino estudiando disciplinas como <span className="font-semibold text-neutral-950">Judo, Ryukyu Kobudo, Shōrin-ryū y Sistema de Combate Ruso</span>, para ofrecerte una visión completa y efectiva.
              </p>
            </motion.div>

            {/* Dojo & Dojutsu Details Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/80 backdrop-blur-md border border-neutral-200/80 rounded-2xl p-6 shadow-sm space-y-4"
            >
              <h3 className="font-impact-condensed text-xl tracking-wider text-neutral-900 flex items-center gap-2.5 border-b border-neutral-100 pb-3">
                <span className="h-2 w-2 rounded-full bg-[#E52B34]" />
                EL SISTEMA DOJUTSU
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="inline-block text-[11px] font-bold tracking-widest text-[#E52B34] uppercase bg-[#E52B34]/5 px-2 py-0.5 rounded">
                    DO (El Camino)
                  </span>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    Conservación del camino tradicional que forja el carácter a través de la ética, los valores fundamentales y los principios.
                  </p>
                </div>
                <div className="space-y-2 border-t sm:border-t-0 sm:border-l border-neutral-200/60 pt-4 sm:pt-0 sm:pl-6">
                  <span className="inline-block text-[11px] font-bold tracking-widest text-[#8B6914] uppercase bg-[#8B6914]/5 px-2 py-0.5 rounded">
                    JUTSU (El Arte Técnico)
                  </span>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    Adaptación de las técnicas de combate a situaciones reales callejeras (prevención, disuasión y confrontación), ajustado a tu morfología y permitiendo la improvisación de objetos cotidianos como armas de defensa.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Column 2: Sensei Photo Display (Right) */}
          <div className="lg:col-span-5 relative flex justify-center items-end w-full h-[600px] sm:h-[750px] lg:h-[850px] xl:h-[950px] self-end overflow-visible mt-8 lg:mt-0">
            
            {/* ===== Stylized Rising Sun (Hinomaru) behind the sensei ===== */}
            <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-visible pointer-events-none">
              {/* Glowing red circle with premium gradient */}
              <div className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] lg:w-[550px] lg:h-[550px] bg-gradient-to-tr from-[#E52B34] via-[#FF4D55] to-[#B81B22] opacity-[0.14] md:opacity-[0.18] rounded-full blur-[4px] shadow-[0_0_120px_rgba(229,43,52,0.35)] animate-pulse duration-[8000ms]" />
              
              {/* Subtle rotate ring */}
              <div className="absolute w-[80%] h-[80%] border border-dashed border-[#E52B34]/15 rounded-full animate-[spin_120s_linear_infinite]" />
              
              {/* Golden ring representing focus and balance */}
              <div className="absolute w-[60%] h-[60%] border border-amber-500/10 rounded-full animate-[spin_60s_linear_infinite]" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 120 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full flex items-end justify-center overflow-visible"
            >
              <Image
                src="/senseiPortadaSinFondo.png"
                alt="Sensei Carlos Ávila"
                fill
                className="object-contain object-bottom drop-shadow-[-25px_15px_40px_rgba(0,0,0,0.2)]"
                priority
                quality={100}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
