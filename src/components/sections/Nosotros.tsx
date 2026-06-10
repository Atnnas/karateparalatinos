"use client";

import { motion, Variants } from "framer-motion";
import { BrainCircuit, Swords, Activity, Heart, Compass } from "lucide-react";

const pillars = [
  {
    title: "Shin (Mente y Espíritu)",
    description: "Cultivo del autocontrol, claridad mental, enfoque y la meditación activa (Mokuso). Preparamos al karateca para enfrentar el estrés diario y los combates con calma absoluta.",
    icon: BrainCircuit,
    color: "#556358", // Sage
  },
  {
    title: "Ghi (Técnica y Arte)",
    description: "Dominio técnico del Karate tradicional y moderno. Refinamiento en Katas, aplicaciones reales de autodefensa (Bunkai) y tácticas avanzadas de Kumite.",
    icon: Swords,
    color: "#E52B34", // KPL Red
  },
  {
    title: "Tai (Cuerpo y Templo)",
    description: "Acondicionamiento físico de alto rendimiento. Trabajamos la fuerza explosiva, flexibilidad dinámica, resistencia cardiovascular y biomecánica óptima.",
    icon: Activity,
    color: "#1E1C1A", // Dark
  },
];

export default function Nosotros() {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="nosotros"
      className="relative py-24 bg-[var(--background-alt)] overflow-hidden"
    >
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-[#556358]/8 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-[#556358]/8 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado de la Sección */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-title-serif text-xs text-[#556358] tracking-[0.25em] uppercase block mb-3"
          >
            NUESTRA FILOSOFÍA
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-impact-condensed text-3xl sm:text-5xl font-bold tracking-wider text-neutral-900"
          >
            FORJANDO <span className="text-[#E52B34]">CARÁCTER</span>, NO SOLO COMBATIENTES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-neutral-600 mt-6 font-light leading-relaxed text-sm sm:text-base"
          >
            Karate para Latinos es una comunidad y plataforma digital que adapta la rigurosa sabiduría tradicional de los dojos japoneses al contexto, calidez y necesidades del practicante latino contemporáneo.
          </motion.p>
        </div>

        {/* Los Tres Pilares (Inspirados en los 3 Hexágonos del Isotipo) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={cardVariants}
                className="glass-card p-8 flex flex-col items-start relative group"
              >
                {/* Elemento de fondo decorativo: número grande */}
                <span className="absolute right-6 top-6 text-7xl font-impact-condensed text-neutral-300/20 group-hover:text-[#E52B34]/10 transition-colors select-none">
                  0{index + 1}
                </span>

                <div
                  className="p-4 rounded-lg bg-white border border-neutral-200 mb-6 group-hover:border-[#E52B34]/50 transition-colors shadow-sm"
                  style={{ color: pillar.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-impact-condensed text-xl tracking-wider text-neutral-900 mb-4">
                  {pillar.title}
                </h3>
                <p className="font-body text-neutral-600 text-sm font-light leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Sección Especial: El Concepto de Ikigai */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white border border-neutral-200/60 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#556358]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 text-[#E52B34]">
              <Heart className="w-5 h-5" />
              <span className="font-title-serif text-xs tracking-[0.2em] uppercase">
                TU MOTIVO DE SER
              </span>
            </div>
            <h3 className="font-impact-condensed text-2xl sm:text-4xl text-neutral-900 tracking-wider">
              ¿Por qué integramos el <span className="gradient-text-red">IKIGAI</span>?
            </h3>
            <p className="font-body text-neutral-600 text-sm sm:text-base font-light leading-relaxed">
              El karate no es solo golpear o defender; es un camino de vida (*Do*). Creemos que cada practicante debe encontrar su equilibrio personal.
            </p>
            <p className="font-body text-neutral-600 text-sm font-light leading-relaxed">
              Utilizamos metodologías de autoexploración para que alinear tu pasión por el entrenamiento, tu vocación de crecimiento, tu misión de respeto a la sociedad y tu profesión se convierta en una realidad.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative border border-[#556358]/15 rounded-2xl p-8 bg-[var(--background-alt)]/50"
          >
            <div className="flex items-center gap-3 text-[#556358] mb-6">
              <Compass className="w-5 h-5" />
              <span className="font-title-serif text-xs tracking-[0.2em] uppercase">
                EL REINO DEL DOJUTSU
              </span>
            </div>
            <h4 className="font-impact-condensed text-xl text-neutral-900 mb-4">
              Dojutsu: El Arte Técnico de Combate
            </h4>
            <p className="font-body text-neutral-600 text-sm font-light leading-relaxed mb-4">
              Nuestras herramientas digitales y entrenamientos se centran en el **Dojutsu**: la ciencia aplicada de la biomecánica de combate, el acondicionamiento integral y la asimilación táctica.
            </p>
            <div className="p-4 bg-white/80 rounded-lg border-l-2 border-[#E52B34] text-xs text-neutral-700 font-mono shadow-sm">
              &ldquo;El karateca completo no busca solo vencer en el tatami, sino trascender sus límites en la vida diaria.&rdquo;
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
