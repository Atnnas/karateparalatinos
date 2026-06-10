"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Video, Dumbbell, Users } from "lucide-react";

const services = [
  {
    title: "Asesoría de Combate 1-a-1",
    subtitle: "KUMITE Y KATA TÁCTICO",
    description: "Análisis técnico personalizado por videoconferencia. Evaluamos tus Katas, técnicas de golpeo y combates reales para trazar una ruta de mejora con base científica.",
    icon: Video,
    details: ["Análisis de video en cámara lenta", "Optimización biomecánica", "Corrección de errores comunes"],
  },
  {
    title: "Herramientas en Línea",
    subtitle: "PLATAFORMA DIGITAL",
    description: "Acceso gratuito y premium a calculadoras de requisitos de grado, bases de datos de Katas tradicionales con aplicaciones (Bunkai) y cronómetros de Mokuso.",
    icon: ShieldCheck,
    details: ["Cronómetro de Mokuso/Respiración", "Checklist de requisitos por cinturón", "Biblioteca técnica interactiva"],
  },
  {
    title: "Acondicionamiento Físico",
    subtitle: "PREPARACIÓN FÍSICA ESPECÍFICA",
    description: "Rutinas científicas enfocadas en las demandas del Karate: potencia pliométrica, flexibilidad funcional, y estabilidad de cadera para patadas de alto impacto.",
    icon: Dumbbell,
    details: ["Planes descargables en PDF", "Videos explicativos de ejercicios", "Seguimiento nutricional básico"],
  },
  {
    title: "Seminarios e Instructores",
    subtitle: "FORMACIÓN PARA DO JOS",
    description: "Talleres presenciales y en línea para instructores de karate sobre pedagogía marcial moderna, administración de escuelas de artes marciales y marketing.",
    icon: Users,
    details: ["Certificaciones de participación", "Material de apoyo pedagógico", "Comunidad de instructores latinos"],
  },
];

export default function Servicios() {
  return (
    <section
      id="servicios"
      className="relative py-24 bg-transparent overflow-hidden border-t border-neutral-200/60"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#E52B34]/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#556358]/3 rounded-full blur-[120px] pointer-events-none" />

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
            SERVICIOS Y SOLUCIONES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-impact-condensed text-3xl sm:text-5xl font-bold tracking-wider text-neutral-900"
          >
            EL ARTE DEL <span className="text-[#E52B34]">DESARROLLO</span> DIGITAL MARCIAL
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-neutral-600 mt-6 font-light leading-relaxed text-sm sm:text-base"
          >
            Ofrecemos una gama completa de servicios diseñados para el karateca moderno, desde mentoría personalizada hasta herramientas de software en línea.
          </motion.p>
        </div>

        {/* Grid de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="glass-card p-8 sm:p-10 flex flex-col justify-between group relative shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-title-serif text-[10px] text-[#556358] tracking-[0.2em]">
                      {service.subtitle}
                    </span>
                    <Icon className="w-6 h-6 text-[#E52B34] group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <h3 className="font-impact-condensed text-2xl text-neutral-900 tracking-wide mb-4">
                    {service.title}
                  </h3>

                  <p className="font-body text-neutral-600 text-sm font-light leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Detalles del servicio */}
                <div className="border-t border-neutral-200/60 pt-6 mt-4">
                  <h4 className="font-title-serif text-[10px] text-neutral-800 tracking-wider uppercase mb-3">
                    ¿Qué Incluye?
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.details.map((detail, dIdx) => (
                      <li key={dIdx} className="text-xs text-[#556358] flex items-center gap-2 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E52B34] shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-block p-6 border border-neutral-200 bg-white rounded-2xl max-w-2xl shadow-sm"
          >
            <p className="font-body text-sm text-neutral-600 font-light">
              ¿Tienes necesidades específicas o representas a una federación?{" "}
              <Link href="/contacto" className="text-[#E52B34] hover:underline font-bold transition-all">
                Contáctanos directamente
              </Link>{" "}
              para desarrollar un plan de asesoría personalizado a gran escala.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
