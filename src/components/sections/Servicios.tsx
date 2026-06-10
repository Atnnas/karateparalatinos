"use client";

import { motion } from "framer-motion";

export default function Servicios() {
  return (
    <section
      id="servicios"
      className="relative min-h-[60vh] flex items-center justify-center bg-transparent overflow-hidden pt-32 pb-24"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#E52B34]/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#556358]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-title-serif text-xs text-[#556358] tracking-[0.25em] uppercase block mb-3"
        >
          Servicios
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-impact-condensed text-3xl sm:text-5xl font-bold tracking-wider text-neutral-900"
        >
          CONTENIDO EN <span className="text-[#E52B34]">ACTUALIZACIÓN</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-neutral-600 mt-6 font-light leading-relaxed text-sm sm:text-base"
        >
          Estamos preparando nuevos servicios adaptados para ti. Vuelve pronto para conocerlos.
        </motion.p>
      </div>
    </section>
  );
}
