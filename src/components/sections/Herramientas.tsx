"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Camera, 
  Lock, 
  Users, 
  Eye,
  ShieldAlert,
  CheckCircle,
  HelpCircle
} from "lucide-react";

interface Feature {
  label: string;
  desc: string;
}

interface Requirement {
  name: string;
  supported: boolean;
}

interface Tool {
  id: string;
  name: string;
  jpName: string;
  status: "Disponible" | "En Desarrollo" | "Planificado";
  statusColor: string;
  category: string;
  icon: React.ComponentType<any>;
  description: string;
  features: Feature[];
  requirements: Requirement[];
  actionText: string;
  actionLink: string;
  active: boolean;
  badge?: string;
}

const tools: Tool[] = [
  {
    id: "kihon",
    name: "Kihon Online",
    jpName: "基本オンライン",
    status: "Disponible",
    statusColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600",
    category: "Entrenamiento Individual",
    icon: Camera,
    description: "Perfecciona tus posiciones básicas (Dachi) y técnicas de golpeo mediante visión artificial en tiempo real. Activa tu cámara web para obtener métricas biomecánicas inmediatas de tus codos y rodillas, compáralas con siluetas de referencia adaptativas y guarda poses mediante comandos de voz.",
    features: [
      { label: "Ángulos en Vivo", desc: "Cálculo de la apertura de tus articulaciones." },
      { label: "Comandos por Voz", desc: "Usa el comando 'Guardar' a distancia." },
      { label: "Silueta Adaptativa", desc: "Alineación contra siluetas adaptativas." }
    ],
    requirements: [
      { name: "Cámara Web", supported: true },
      { name: "Micrófono", supported: true },
      { name: "Espacio (2m)", supported: true }
    ],
    actionText: "ENTRAR",
    actionLink: "/herramientas/kihon-online",
    active: true
  },
  {
    id: "dojo-virtual",
    name: "Dojo Virtual",
    jpName: "バーチャル道場",
    status: "Disponible",
    statusColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600",
    category: "Clase en Vivo (Meet)",
    icon: Users,
    description: "Conexión interactiva remota en tiempo real en colaboración con Google Meet. Permite al Sensei evaluar la postura del alumno a distancia, activar siluetas guía de manera remota y capturar posiciones directamente a la base de datos sin interrumpir el entrenamiento del alumno.",
    features: [
      { label: "Integración Meet", desc: "Funciona directamente en el panel lateral de Meet." },
      { label: "Captura Remota", desc: "El Sensei guarda tus poses a la base de datos." },
      { label: "Guía Interactiva", desc: "El Sensei activa siluetas fantasma a distancia." }
    ],
    requirements: [
      { name: "Cámara y Micro", supported: true },
      { name: "Conexión Estable", supported: true },
      { name: "Código de Sala", supported: true }
    ],
    actionText: "ENTRAR",
    actionLink: "/herramientas/dojo-virtual",
    active: true,
    badge: "Colaborativo"
  },
  {
    id: "revisor-ai",
    name: "Revisor AI",
    jpName: "AI レビュアー",
    status: "Disponible",
    statusColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600",
    category: "Evaluación por Cámara",
    icon: Eye,
    description: "Analiza tu postura en tiempo real con visión artificial inteligente. Activa tu cámara web para evaluar tu ejecución en tiempo real de curl de bíceps, patada de tríceps, flexiones, sentadillas, press militar y burpees con correcciones inmediatas.",
    features: [
      { label: "Múltiples Ejercicios", desc: "Bíceps, Tríceps, Sentadillas, Flexiones, Hombros, Burpees." },
      { label: "Visión Artificial", desc: "Cálculo biomecánico de ángulos en tiempo real." },
      { label: "Corrección por Voz", desc: "Alerta sonora y de voz sobre errores de postura." }
    ],
    requirements: [
      { name: "Cámara Web", supported: true },
      { name: "Espacio (2m)", supported: true },
      { name: "Buena Iluminación", supported: true }
    ],
    actionText: "ENTRAR",
    actionLink: "/herramientas/revisor-ai",
    active: true,
    badge: "Inteligencia Artificial"
  }
];

export default function Herramientas() {
  return (
    <section
      id="herramientas"
      className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-start items-center overflow-x-hidden bg-[var(--background)] preguntas-section pb-20"
    >
      {/* ===== Background Watermark Kanji (Traditional Vibe) ===== */}
      <div className="absolute right-10 md:right-20 lg:right-32 top-[12%] text-[24vw] md:text-[14vw] font-black text-neutral-900/[0.012] select-none pointer-events-none leading-none z-0 font-serif">
        空手
      </div>

      {/* ===== Stylized Rising Sun (Hinomaru) ===== */}
      <div className="absolute right-[-100px] md:right-[4%] lg:right-[8%] bottom-[8%] w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] lg:w-[520px] lg:h-[520px] z-0 pointer-events-none flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-tr from-[#E52B34] via-[#FF4D55] to-[#B81B22] opacity-[0.08] rounded-full blur-[3px] shadow-[0_0_100px_rgba(229,43,52,0.2)] animate-pulse duration-[8000ms]" />
        <div className="absolute w-[80%] h-[80%] border border-dashed border-[#E52B34]/10 rounded-full animate-[spin_120s_linear_infinite] z-0" />
      </div>

      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 flex flex-col justify-start items-center pt-0">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-title-serif text-xs text-[#556358] tracking-[0.25em] uppercase block mb-3"
          >
            CENTRO DIGITAL DE ENTRENAMIENTO
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-impact-condensed text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide text-neutral-900 leading-[1.08] mb-3"
          >
            TABLERO DE <span className="bg-gradient-to-r from-[#E52B34] via-[#FF4D55] to-[#B81B22] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(229,43,52,0.12)]">APLICACIONES</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-body text-neutral-600 mt-3 font-light leading-relaxed text-sm sm:text-base max-w-2xl mx-auto"
          >
            Conéctate con tu dojo. Explora nuestro ecosistema de herramientas interactivas de visión artificial y aprendizaje diseñadas para potenciar tu práctica.
          </motion.p>
        </div>

        {/* 3-Column Premium Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {tools.map((tool) => {
            const ToolIcon = tool.icon;
            return (
              <div
                key={tool.id}
                className="flex flex-col justify-between border border-neutral-200/90 bg-white/65 hover:bg-white/95 hover:border-[#E52B34]/30 shadow-md hover:shadow-xl transition-all duration-300 p-8 min-h-[620px] relative group backdrop-blur-md rounded-none"
              >
                {/* Top red indicator border on hover */}
                <div className="absolute top-0 left-0 w-0 h-1 bg-[#E52B34] transition-all duration-300 group-hover:w-full" />
                
                {/* Live pulsing dot top-right */}
                {tool.status === "Disponible" && (
                  <span className="absolute top-4 right-4 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}

                <div>
                  {/* Icon and JP translation */}
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                    <div className="w-12 h-12 bg-neutral-900 text-white flex items-center justify-center shadow-md">
                      <ToolIcon className="w-6 h-6 text-[#E52B34]" />
                    </div>
                    <span className="font-mono text-[9px] text-[#556358] text-right leading-tight max-w-[120px]">
                      {tool.jpName}
                    </span>
                  </div>

                  {/* Title & Category info */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`text-[8px] font-bold font-title-serif uppercase tracking-wider px-2 py-0.5 border rounded-none ${tool.statusColor}`}>
                        {tool.status}
                      </span>
                      {tool.badge && (
                        <span className="text-[8px] font-bold font-title-serif uppercase px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-200/50">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    
                    <h2 className="font-impact-condensed text-2xl tracking-widest text-neutral-900 font-bold uppercase pt-1">
                      {tool.name}
                    </h2>
                  </div>

                  {/* Main Description */}
                  <p className="font-body text-neutral-600 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {tool.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 pt-4 border-t border-neutral-100">
                    <span className="text-[10px] font-title-serif font-extrabold uppercase text-[#E52B34] tracking-[0.15em] block">
                      Características
                    </span>
                    <div className="space-y-2.5">
                      {tool.features.map((feat, index) => (
                        <div key={index} className="flex gap-2.5 items-start p-2 bg-neutral-50/50 border border-neutral-100 hover:bg-white transition-all duration-200">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-neutral-900 font-semibold block text-[10px] uppercase font-sans-condensed">{feat.label}</strong>
                            <span className="text-neutral-500 font-light block leading-tight text-[9px] mt-0.5">{feat.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  {/* System Requirements */}
                  <div className="space-y-2 pt-4 mt-6 border-t border-neutral-100 pb-5">
                    <span className="text-[9px] font-title-serif font-extrabold uppercase text-neutral-400 tracking-[0.15em] block flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" /> Requerimientos
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {tool.requirements.map((req, index) => (
                        <span key={index} className="text-[9px] font-medium bg-neutral-100 text-neutral-600 px-2 py-0.5 border border-neutral-200/60 uppercase tracking-wider">
                          {req.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  {tool.active ? (
                    <Link
                      href={tool.actionLink}
                      className="relative overflow-hidden bg-gradient-to-r from-[#E52B34] via-[#FF4D55] to-[#B81B22] hover:from-[#c82028] hover:to-[#9f131a] text-white rounded-none text-sm tracking-[0.2em] py-4 shadow-[0_6px_20px_rgba(229,43,52,0.3),_inset_0_1px_1px_rgba(255,255,255,0.45),_inset_0_-2px_3px_rgba(0,0,0,0.15)] border-b-2 border-b-[#8c1a1f] transition-all duration-300 flex items-center justify-center font-impact-condensed uppercase hover:scale-[1.03] active:scale-[0.98] cursor-pointer shine-sweep w-full whitespace-nowrap"
                    >
                      <span className="mr-[-0.2em]">{tool.actionText}</span>
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="rounded-none text-sm tracking-[0.2em] py-4 opacity-40 cursor-not-allowed flex items-center justify-center border border-neutral-300 text-neutral-500 bg-neutral-100 font-impact-condensed uppercase w-full whitespace-nowrap"
                    >
                      <Lock className="w-4 h-4 mr-1.5" /> <span className="mr-[-0.2em]">{tool.actionText}</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Footer Support Text */}
        <div className="mt-12 flex items-center gap-2 text-neutral-400 text-xs font-body font-light justify-center">
          <HelpCircle className="w-4 h-4" />
          <span>¿Tienes dudas sobre los requerimientos de tu equipo? Consulta con el Sensei.</span>
        </div>

      </div>
    </section>
  );
}
