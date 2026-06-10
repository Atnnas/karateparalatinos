"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

export default function Contacto() {
  const [formState, setFormState] = useState({
    nombre: "",
    email: "",
    cinturon: "Blanco",
    mensaje: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simular envío de datos
    setTimeout(() => {
      setStatus("success");
      setFormState({
        nombre: "",
        email: "",
        cinturon: "Blanco",
        mensaje: "",
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section
      id="contacto"
      className="relative min-h-[calc(100vh-80px)] lg:min-h-0 lg:flex-1 flex justify-center items-center overflow-hidden bg-[var(--background)] pt-24 pb-0"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-center">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-8">
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
            className="font-impact-condensed text-3xl sm:text-5xl font-bold tracking-wider text-neutral-900"
          >
            PÓNTE EN <span className="text-[#E52B34]">GUARDIA</span> CON NOSOTROS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-neutral-600 mt-6 font-light leading-relaxed text-sm sm:text-base"
          >
            ¿Listo para llevar tu entrenamiento al siguiente nivel? Rellena el formulario para solicitar una asesoría gratuita de diagnóstico técnico.
          </motion.p>
        </div>

        {/* Formulario y Tarjeta */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Información General Lateral */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-8 space-y-6 border-l-4 border-[#E52B34] shadow-sm">
              <h3 className="font-impact-condensed text-2xl text-neutral-900 tracking-wide">
                Diagnóstico Técnico Gratuito
              </h3>
              <p className="font-body text-neutral-600 text-sm font-light leading-relaxed">
                Nuestra primera asesoría incluye un análisis inicial de 15 minutos donde revisamos un video tuyo ejecutando un Kata básico o técnicas de golpeo.
              </p>
              <div className="space-y-3 pt-4 border-t border-neutral-200/60">
                <div className="flex items-start gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#E52B34] shrink-0 mt-0.5" />
                  <span className="text-neutral-800">Respuesta garantizada en menos de 48 horas.</span>
                </div>
                <div className="flex items-start gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#E52B34] shrink-0 mt-0.5" />
                  <span className="text-neutral-800">Asesorías guiadas por cinturones negros certificados.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 sm:p-10 bg-white/60 shadow-sm">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 bg-[#556358]/10 border border-[#556358]/35 rounded-full flex items-center justify-center mx-auto text-[#556358]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-impact-condensed text-2xl text-neutral-900">
                    ¡Mensaje Enviado con Éxito!
                  </h3>
                  <p className="font-body text-neutral-600 text-sm font-light max-w-md mx-auto leading-relaxed">
                    Hemos recibido tu solicitud de asesoría. Uno de nuestros instructores se pondrá en contacto contigo muy pronto para agendar la videollamada.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn-kpl-secondary text-xs mt-6"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-title-serif text-[#556358] uppercase tracking-wider mb-2">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        required
                        value={formState.nombre}
                        onChange={handleChange}
                        className="w-full bg-white border border-neutral-200 rounded-lg py-3 px-4 text-sm font-body text-neutral-900 focus:border-[#E52B34] focus:outline-none transition-colors shadow-sm"
                        placeholder="Ej. Juan Pérez"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-title-serif text-[#556358] uppercase tracking-wider mb-2">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full bg-white border border-neutral-200 rounded-lg py-3 px-4 text-sm font-body text-neutral-900 focus:border-[#E52B34] focus:outline-none transition-colors shadow-sm"
                        placeholder="juan@ejemplo.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-title-serif text-[#556358] uppercase tracking-wider mb-2">
                      Grado o Cinturón Actual
                    </label>
                    <select
                      name="cinturon"
                      value={formState.cinturon}
                      onChange={handleChange}
                      className="w-full bg-white border border-neutral-200 rounded-lg py-3 px-4 text-sm font-body text-neutral-900 focus:border-[#E52B34] focus:outline-none transition-colors shadow-sm"
                    >
                      <option value="Blanco">Blanco (9º Kyu)</option>
                      <option value="Amarillo">Amarillo / Naranja</option>
                      <option value="Verde">Verde / Azul</option>
                      <option value="Marron">Marrón (3º - 1º Kyu)</option>
                      <option value="Negro">Negro (Dan)</option>
                      <option value="Sin Rango">No he practicado karate antes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-title-serif text-[#556358] uppercase tracking-wider mb-2">
                      ¿Qué buscas lograr con la asesoría?
                    </label>
                    <textarea
                      name="mensaje"
                      required
                      rows={2}
                      value={formState.mensaje}
                      onChange={handleChange}
                      className="w-full bg-white border border-neutral-200 rounded-lg py-3 px-4 text-sm font-body text-neutral-900 focus:border-[#E52B34] focus:outline-none transition-colors resize-none shadow-sm"
                      placeholder="Cuéntanos brevemente sobre tu nivel de experiencia, tus metas en el karate o qué Katas/Técnicas te gustaría revisar."
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-kpl-primary w-full sm:w-auto justify-center"
                    >
                      {status === "sending" ? (
                        "Enviando..."
                      ) : (
                        <>
                          Solicitar Diagnóstico <Send className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
