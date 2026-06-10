"use client";

import { motion } from "framer-motion";

export default function Servicios() {
  return (
    <section
      id="servicios"
      className="relative min-h-screen flex items-center bg-[#1E1C1A] overflow-hidden pt-36 pb-24"
    >
      {/* Subtle traditional watermark in background for brand vibe */}
      <div className="absolute right-10 bottom-10 text-[20vw] font-black text-neutral-800/[0.15] select-none pointer-events-none leading-none z-0 font-serif">
        空手
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Column 1: Copywriting (Left) */}
          <div className="lg:col-span-7 space-y-6 z-10">
            <div className="space-y-4">
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                ¿Que obtienes?
              </h1>
              {/* Green Divider Line */}
              <div className="h-[3px] w-full bg-[#76b82a] max-w-md lg:max-w-xl" />
            </div>

            <p className="text-white text-base sm:text-lg font-light leading-relaxed max-w-2xl">
              Esta guía es un tributo vivo a la técnica original del maestro <span className="font-bold">Kenwa Mabuni</span> y lo más apegado posible a lo original.
            </p>

            <div className="space-y-4 pt-2">
              <h3 className="text-[#f2be22] font-bold text-base sm:text-lg tracking-wider">
                CONTENIDO:
              </h3>
              <ul className="space-y-2.5 text-[#f2be22] text-sm sm:text-base font-semibold">
                <li>1.- Todas las Katas y Bunkais de 9°Kyu hasta 1er Dan C.N.</li>
                <li>2.- Todos los IDO-KIHON y KOTEI-KIHON correspondientes</li>
                <li>3.- Guía en PDFs con vocabulario en Japones/Español</li>
                <li>4.- Acceso a la Comunidad KARATE PARA LATINOS</li>
                <li>5.- Acceso a WEBINARS y ASESORÍAS personalizadas por 1 año</li>
              </ul>
            </div>

            <div className="space-y-2 pt-6">
              <p className="text-[#f2be22] text-xs sm:text-sm font-bold uppercase leading-relaxed max-w-lg">
                SI TIENES ALGUNA DUDA O QUIERES SABER SOBRE OTRAS PROMOCIONES O CURSOS ENVÍA UN MENSAJE POR:
              </p>
              <p className="text-[#25D366] text-sm sm:text-base font-bold">
                <a
                  href="https://wa.me/529211205618?text=Hola!%20Me%20interesa%20obtener%20la%20gu%C3%ADa%20de%20estudio%20de%20Karate%20Shitoryu."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline inline-flex items-center gap-1.5"
                >
                  WhatsApp: +52 921 120 5618
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Video Player (Right) */}
          <div className="lg:col-span-5 lg:pt-16 flex justify-center w-full z-10">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl bg-black border border-neutral-800">
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
