"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";

export default function Contacto() {
  return (
    <section
      id="contacto"
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

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 w-full flex flex-col justify-start items-center">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-title-serif text-xs text-[#556358] tracking-[0.25em] uppercase block mb-3"
          >
            INICIAR ASESORÍA
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-impact-condensed text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide text-neutral-900 leading-[1.08]"
          >
            PONTE EN <span className="text-[#E52B34] drop-shadow-[0_2px_8px_rgba(229,43,52,0.15)]">GUARDIA</span> CON NOSOTROS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-neutral-600 mt-6 font-light leading-relaxed text-sm sm:text-base max-w-xl mx-auto"
          >
            ¿Tienes dudas sobre el material o quieres solicitar tu asesoría personalizada? Escríbenos por cualquiera de nuestros canales directos.
          </motion.p>
        </div>

        {/* Tarjetas de Contacto directas en Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
          
          {/* Tarjeta de WhatsApp */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card p-8 bg-white/70 shadow-md border border-neutral-200/90 rounded-2xl relative overflow-hidden flex flex-col justify-between items-center text-center group"
          >
            {/* Barra de acento verde oficial de WhatsApp */}
            <div className="absolute top-0 bottom-0 left-0 w-2 bg-[#25D366]" />

            <div className="space-y-4 w-full flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/10 border border-[#25D366]/25 flex items-center justify-center text-[#25D366] transition-transform duration-300 group-hover:scale-110">
                <MessageCircle className="w-8 h-8" />
              </div>
              
              <h3 className="font-impact-condensed text-2xl text-neutral-900 tracking-wide">
                Chat de WhatsApp
              </h3>
              
              <p className="font-body text-neutral-600 text-sm font-light leading-relaxed max-w-xs">
                Comunícate directamente con nosotros para soporte rápido, preguntas sobre el contenido o programar asesorías.
              </p>

              <div className="font-sans-condensed text-lg sm:text-xl font-bold text-neutral-800 pt-2">
                +52 921 120 5618
              </div>
            </div>

            <a
              href="https://wa.me/529211205618?text=Hola,%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20Gu%C3%ADa%20de%20Estudio%20de%20Karate"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-impact-condensed text-sm py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-bold w-full justify-center"
            >
              Iniciar Chat <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Tarjeta de Correo Electrónico */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card p-8 bg-white/70 shadow-md border border-neutral-200/90 rounded-2xl relative overflow-hidden flex flex-col justify-between items-center text-center group"
          >
            {/* Barra de acento rojo de la marca */}
            <div className="absolute top-0 bottom-0 left-0 w-2 bg-[#E52B34]" />

            <div className="space-y-4 w-full flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#E52B34]/10 border border-[#E52B34]/25 flex items-center justify-center text-[#E52B34] transition-transform duration-300 group-hover:scale-110">
                <Mail className="w-8 h-8" />
              </div>
              
              <h3 className="font-impact-condensed text-2xl text-neutral-900 tracking-wide">
                Correo Electrónico
              </h3>
              
              <p className="font-body text-neutral-600 text-sm font-light leading-relaxed max-w-xs">
                Escríbenos un mensaje detallado a nuestra casilla de correo oficial para cualquier consulta institucional o comercial.
              </p>

              <div className="font-sans-condensed text-base sm:text-lg md:text-xl font-bold text-neutral-800 pt-2 break-all w-full px-2">
                ikigaidojutsu@gmail.com
              </div>
            </div>

            <a
              href="mailto:ikigaidojutsu@gmail.com"
              className="mt-6 inline-flex items-center gap-2 bg-[#E52B34] hover:bg-[#c82028] text-white font-impact-condensed text-sm py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-bold w-full justify-center"
            >
              Enviar Correo <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
