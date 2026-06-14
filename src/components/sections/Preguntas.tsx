"use client";

import { motion } from "framer-motion";

export default function Preguntas() {
  return (
    <section
      id="preguntas"
      className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-start items-center overflow-x-hidden bg-[var(--background)] preguntas-section pb-20"
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
        className="absolute top-28 left-10 lg:left-16 w-[2px] bg-gradient-to-b from-[#E52B34] to-transparent z-[2] hidden md:block"
      />

      {/* Main Container aligned to start (top) with tighter top padding to reduce the space by 50% */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full flex flex-col justify-start items-center pt-0 pb-10">
        
        {/* Centered Title with safe margin bottom to prevent grid overlap */}
        <div className="text-center max-w-5xl mx-auto mb-12 lg:mb-20 w-full relative py-4">
          
          {/* Calligraphic Horizontal Brush Stroke behind Title */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-visible">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.07 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{ originX: 0.5 }}
              className="w-full max-w-2xl h-24 text-neutral-900"
            >
              <svg viewBox="0 0 800 200" className="w-full h-full fill-current">
                <defs>
                  <filter id="brush-texture">
                    <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="4" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
                <path
                  filter="url(#brush-texture)"
                  d="M 50,110 C 180,75 350,65 520,80 C 620,90 700,105 750,95 C 760,93 745,107 720,112 C 580,135 380,125 220,122 C 120,120 70,125 50,110 Z"
                />
              </svg>
            </motion.div>
          </div>

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
            className="font-impact-condensed text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide text-neutral-900 leading-tight whitespace-normal break-words"
          >
            PREGUNTAS <span className="text-[#E52B34] drop-shadow-[0_2px_8px_rgba(229,43,52,0.15)]">FRECUENTES</span>
          </motion.h2>
        </div>

        {/* Centered, Wide, Premium FAQ Grid */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
          
          {/* Animated Enso Circle behind Cards */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-visible">
            <svg viewBox="0 0 400 400" className="w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] text-[#E52B34]">
              <defs>
                <filter id="enso-texture">
                  <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="4" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>
              <motion.path
                filter="url(#enso-texture)"
                d="M 200,60 C 280,60 340,120 340,200 C 340,280 280,340 200,340 C 120,340 60,280 60,200 C 60,130 110,75 180,65"
                fill="none"
                stroke="currentColor"
                strokeWidth="24"
                strokeLinecap="round"
                opacity={0.06}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, ease: "easeInOut", delay: 0.4 }}
              />
            </svg>
          </div>

          {/* Q&A Items Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 w-full">
            
            {/* Q&A 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border-t border-neutral-300/60 pt-8 flex flex-col items-start text-left w-full"
            >
              <h3 className="font-impact-condensed text-xl sm:text-2xl text-neutral-900 tracking-wide mb-4 flex items-start leading-snug break-words whitespace-normal">
                <span className="text-[#E52B34] font-bold mr-3 font-serif select-none">//</span>
                ¿Para quién está diseñado este producto?
              </h3>
              <p className="font-body text-neutral-700 text-base sm:text-lg font-light leading-relaxed break-words whitespace-normal">
                Cualquier persona que practique Karate o cualquier arte marcial, que quiera enriquecer sus conocimientos o aprender más sobre <span className="font-semibold text-neutral-950">KARATE SHITORYU</span>.
              </p>
            </motion.div>

            {/* Q&A 2: Warranty Period */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border-t border-neutral-300/60 pt-8 flex flex-col items-start text-left w-full"
            >
              <h3 className="font-impact-condensed text-xl sm:text-2xl text-neutral-900 tracking-wide mb-4 flex items-start leading-snug break-words whitespace-normal">
                <span className="text-[#E52B34] font-bold mr-3 font-serif select-none">//</span>
                ¿Cómo funciona el &apos;Periodo de Garantía&apos;?
              </h3>
              <p className="font-body text-neutral-700 text-base sm:text-lg font-light leading-relaxed break-words whitespace-normal">
                El Período de Garantía es el período de tiempo que usted tiene para solicitar el reembolso total del importe pagado por su compra si el producto no le satisface.
              </p>
            </motion.div>

            {/* Q&A 3: Certificates & Direct Contact (Spans 2 columns) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="border-t border-neutral-300/60 pt-8 flex flex-col items-start text-left w-full lg:col-span-2"
            >
              <h3 className="font-impact-condensed text-xl sm:text-2xl text-neutral-900 tracking-wide mb-4 flex items-start leading-snug break-words whitespace-normal">
                <span className="text-[#E52B34] font-bold mr-3 font-serif select-none">//</span>
                ¿Puedo obtener mis certificados de Kyu y de 1er Dan?
              </h3>
              <div className="space-y-4 w-full">
                <p className="font-body text-neutral-700 text-base sm:text-lg font-light leading-relaxed break-words whitespace-normal">
                  Esta guía es una herramienta para tu formación en Karate Shito Ryu, no necesariamente sustituye tus clases en un Dojo.
                </p>
                <p className="font-body text-neutral-700 text-base sm:text-lg font-light leading-relaxed break-words whitespace-normal">
                  Quienes adquieran esta guía, pueden ser parte de la comunidad <span className="font-semibold text-neutral-950">KARATE PARA LATINOS</span> y participar en WEBINARs por un año, sin costo adicional. Esta guía no incluye certificaciones; para ello es necesario contar con la asesoría directa de un maestro certificado.
                </p>
                <p className="font-body text-[#8B6914] text-sm sm:text-base font-semibold mt-4 pt-4 border-t border-neutral-200/60 break-words whitespace-normal">
                  Para cualquier duda, ponte en contacto al <span className="font-bold text-neutral-900">+52 921 120 5618</span> o escríbenos un Email a <span className="font-bold text-neutral-900">ikigaidojutsu@gmail.com</span>
                </p>
              </div>
            </motion.div>

            {/* Q&A 4: Product Access */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border-t border-neutral-300/60 pt-8 flex flex-col items-start text-left w-full"
            >
              <h3 className="font-impact-condensed text-xl sm:text-2xl text-neutral-900 tracking-wide mb-4 flex items-start leading-snug break-words whitespace-normal">
                <span className="text-[#E52B34] font-bold mr-3 font-serif select-none">//</span>
                ¿Cómo acceder al producto?
              </h3>
              <p className="font-body text-neutral-700 text-base sm:text-lg font-light leading-relaxed break-words whitespace-normal">
                <a 
                  href="https://wa.me/529211205618" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#E52B34] hover:text-[#c82028] font-bold underline underline-offset-4 transition-colors"
                >
                  Escríbenos por WhatsApp
                </a>{" "}
                para obtener más información sobre nuestros productos y resolver cualquier duda sobre cómo acceder a tu guía.
              </p>
            </motion.div>

            {/* Q&A 5: Purchase Course */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="border-t border-neutral-300/60 pt-8 flex flex-col items-start text-left w-full"
            >
              <h3 className="font-impact-condensed text-xl sm:text-2xl text-neutral-900 tracking-wide mb-4 flex items-start leading-snug break-words whitespace-normal">
                <span className="text-[#E52B34] font-bold mr-3 font-serif select-none">//</span>
                ¿Cómo puedo comprar este curso?
              </h3>
              <p className="font-body text-neutral-700 text-base sm:text-lg font-light leading-relaxed break-words whitespace-normal">
                Para comprar este curso, haga clic en el botón &quot;Comprar ahora&quot;. Tenga en cuenta que no todos los cursos estarán siempre disponibles. Los productores hacen mejoras al mismo programa.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
