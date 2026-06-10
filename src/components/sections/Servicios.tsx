"use client";

import { motion } from "framer-motion";

export default function Servicios() {
  return (
    <section
      id="servicios"
      className="relative min-h-screen flex justify-center items-center overflow-hidden bg-[var(--background)] pt-36 pb-20"
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Column 1: Copywriting (Left) */}
          <div className="lg:col-span-7 space-y-6 z-10">
            <div className="space-y-4">
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-tight">
                ¿Que obtienes?
              </h1>
              {/* Green Divider Line */}
              <div className="h-[3px] w-full bg-[#76b82a] max-w-md lg:max-w-xl" />
            </div>

            <p className="text-neutral-700 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
              Esta guía es un tributo vivo a la técnica original del maestro <span className="font-bold text-neutral-900">Kenwa Mabuni</span> y lo más apegado posible a lo original.
            </p>

            <div className="space-y-4 pt-2">
              <h3 className="text-[#8B6914] font-bold text-base sm:text-lg tracking-wider">
                CONTENIDO:
              </h3>
              <ul className="space-y-2.5 text-[#8B6914]/90 text-sm sm:text-base font-semibold">
                <li>1.- Todas las Katas y Bunkais de 9°Kyu hasta 1er Dan C.N.</li>
                <li>2.- Todos los IDO-KIHON y KOTEI-KIHON correspondientes</li>
                <li>3.- Guía en PDFs con vocabulario en Japones/Español</li>
                <li>4.- Acceso a la Comunidad KARATE PARA LATINOS</li>
                <li>5.- Acceso a WEBINARS y ASESORÍAS personalizadas por 1 año</li>
              </ul>
            </div>

            <div className="space-y-4 pt-6">
              <p className="text-[#8B6914] text-xs sm:text-sm font-bold uppercase leading-relaxed max-w-lg">
                SI TIENES ALGUNA DUDA O QUIERES SABER SOBRE OTRAS PROMOCIONES O CURSOS ENVÍA UN MENSAJE POR:
              </p>
              <div className="pt-1">
                <a
                  href="https://wa.me/529211205618?text=Hola!%20Me%20interesa%20obtener%20la%20gu%C3%ADa%20de%20estudio%20de%20Karate%20Shitoryu."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-sans font-bold text-sm sm:text-base py-3 px-6 rounded-full transition-all duration-300 shadow-[0_4px_15px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.45)] hover:-translate-y-0.5"
                >
                  <svg
                    className="w-5.5 h-5.5 fill-white"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.488 2.01 14.038.995 11.996.995c-5.448 0-9.876 4.373-9.88 9.802-.001 1.716.463 3.39 1.34 4.878l-.993 3.626 3.76-.977zM17.472 14.38c-.3-.149-1.777-.878-2.05-.978-.272-.098-.47-.149-.669.149-.198.298-.768.978-.941 1.177-.173.199-.347.224-.648.075-.3-.15-1.264-.467-2.41-1.485-.891-.797-1.493-1.784-1.668-2.083-.173-.299-.018-.46.131-.609.135-.134.3-.349.449-.523.15-.174.2-.299.3-.498.1-.199.05-.374-.025-.524-.075-.15-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.778-.727 2.025-1.429.247-.702.247-1.303.173-1.429-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  <span>WhatsApp: +52 921 120 5618</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Video Player (Right) */}
          <div className="lg:col-span-5 lg:pt-16 flex justify-center w-full z-10">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl bg-black border border-neutral-200/80">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/l0clUO_IWTc"
                title="Karate para Latinos - Guía de Estudio"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
