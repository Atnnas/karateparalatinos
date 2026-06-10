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
      className="relative py-24 bg-transparent overflow-hidden border-t border-neutral-200/60"
    >
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E52B34]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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
                      rows={4}
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
