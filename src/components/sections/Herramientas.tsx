"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Camera, 
  Lock, 
  Users, 
  Eye,
  ShieldAlert,
  CheckCircle,
  HelpCircle,
  ChevronRight
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
      { label: "Ángulos en Vivo", desc: "Cálculo matemático de la apertura de tus articulaciones." },
      { label: "Comandos por Voz", desc: "Usa el comando 'Guardar' a distancia sin tocar la pantalla." },
      { label: "Silueta Adaptativa", desc: "Alineación contra siluetas que se adaptan a tu estatura." },
      { label: "HUD Inteligente", desc: "Alterna entre modo guiado asistido y modo experto." }
    ],
    requirements: [
      { name: "Cámara Web", supported: true },
      { name: "Micrófono", supported: true },
      { name: "Espacio (2 metros)", supported: true }
    ],
    actionText: "ENTRAR AL DOJO DIGITAL",
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
      { label: "Integración Meet", desc: "Funciona directamente en el panel lateral de Google Meet o navegador." },
      { label: "Captura Remota", desc: "El Sensei guarda tus poses a la base de datos desde su pantalla." },
      { label: "Guía Interactiva", desc: "El Sensei activa siluetas fantasma en tu pantalla a distancia." },
      { label: "Seguridad Elevada", desc: "Acceso protegido exclusivo para instructores con rol de admin." }
    ],
    requirements: [
      { name: "Cámara y Micro", supported: true },
      { name: "Conexión Estable", supported: true },
      { name: "Código de Sala", supported: true }
    ],
    actionText: "ENTRAR AL DOJO VIRTUAL",
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
      { label: "Múltiples Ejercicios", desc: "Evalúa Bíceps, Tríceps, Sentadillas, Flexiones, Press Militar y Burpees." },
      { label: "Visión Artificial", desc: "Cálculo biomecánico de ángulos corporales en tiempo real." },
      { label: "Corrección por Voz", desc: "Alerta sonora y mensajes hablados sobre errores de postura." },
      { label: "Sin Instalación", desc: "Funciona directamente en tu navegador mediante tu cámara web." }
    ],
    requirements: [
      { name: "Cámara Web", supported: true },
      { name: "Espacio (2 metros)", supported: true },
      { name: "Buena Iluminación", supported: true }
    ],
    actionText: "ENTRAR AL REVISOR AI",
    actionLink: "/herramientas/revisor-ai",
    active: true,
    badge: "Inteligencia Artificial"
  }
];

export default function Herramientas() {
  const [activeTab, setActiveTab] = useState<string>("kihon");

  const currentTool = tools.find((t) => t.id === activeTab) || tools[0];
  const ToolIcon = currentTool.icon;

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

      <div className="relative z-20 w-full max-w-[99vw] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 flex flex-col justify-start items-center pt-0">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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
            className="font-impact-condensed text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-neutral-900 leading-[1.08] mb-3"
          >
            TABLERO DE <span className="bg-gradient-to-r from-[#E52B34] via-[#FF4D55] to-[#B81B22] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(229,43,52,0.12)]">APLICACIONES</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-body text-neutral-600 mt-3 font-light leading-relaxed text-sm sm:text-base max-w-2xl mx-auto"
          >
            Conéctate con tu dojo. Controla y navega por el ecosistema de herramientas de visión artificial y aprendizaje interactivo diseñadas para tu Karate en casa.
          </motion.p>
        </div>

        {/* Dashboard Layout Container */}
        <div className="w-full flex flex-col md:flex-row gap-10 lg:gap-12 bg-white/65 border border-neutral-200/90 shadow-lg rounded-none p-6 sm:p-8 md:p-10 min-h-[600px] backdrop-blur-md">
          
          {/* LEFT: Sidebar Tabs (Responsive menu) */}
          <div className="w-full md:w-[280px] xl:w-[320px] shrink-0 flex flex-col gap-4">
            <span className="text-[10px] font-title-serif font-extrabold uppercase text-neutral-400 tracking-widest pl-2 hidden md:block">
              Módulos de Entrenamiento
            </span>
            
            {/* Horizontal scroll on mobile, Vertical stack on desktop */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none snap-x snap-mandatory">
              {tools.map((tool) => {
                const TabIcon = tool.icon;
                const isSelected = activeTab === tool.id;
                
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTab(tool.id)}
                    className={`group snap-center flex items-center justify-between gap-3.5 text-left px-5 py-4.5 border rounded-none transition-all duration-300 cursor-pointer min-w-[210px] md:min-w-0 active:scale-[0.98] hover:scale-[1.02] relative ${
                      isSelected
                        ? "bg-gradient-to-r from-neutral-900 to-neutral-950 text-white border-l-4 border-l-[#E52B34] border-t-neutral-900 border-r-neutral-900 border-b-neutral-900 shadow-md shadow-neutral-900/15"
                        : "bg-white/95 text-neutral-700 border-neutral-200 hover:border-[#E52B34]/40 hover:bg-neutral-50/50 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] border-l-2 hover:border-l-[#E52B34]/30"
                    }`}
                  >
                    {/* Live indicator dot in top right */}
                    {tool.status === "Disponible" && (
                      <span className="absolute top-2 right-2 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    )}

                    <div className="flex items-center gap-3.5">
                      <div className={`w-9.5 h-9.5 rounded-none flex items-center justify-center transition-all ${
                        isSelected ? "bg-gradient-to-tr from-[#E52B34] to-[#FF4D55] text-white shadow-md shadow-[#E52B34]/20" : "bg-neutral-100 text-[#E52B34]"
                      }`}>
                        <TabIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-impact-condensed tracking-widest text-sm block">
                          {tool.name}
                        </span>
                        <span className={`font-mono text-[9px] block ${
                          isSelected ? "text-neutral-400" : "text-[#556358]"
                        }`}>
                          {tool.jpName}
                        </span>
                      </div>
                    </div>
                    
                    {/* Status Dot / Lock Icon */}
                    <div className="flex items-center gap-1.5 pl-2">
                      {tool.badge && (
                        <span className={`text-[8px] font-bold font-title-serif uppercase px-1.5 py-0.5 rounded-none hidden xl:inline-block ${
                          isSelected ? "bg-amber-600 text-white" : "bg-amber-100 text-amber-800"
                        }`}>
                          {tool.badge}
                        </span>
                      )}
                      {!tool.active ? (
                        <Lock className="w-3.5 h-3.5 text-neutral-400" />
                      ) : (
                        <ChevronRight className={`w-4 h-4 transition-transform hidden md:block ${
                          isSelected ? "translate-x-1 text-[#E52B34]" : "text-neutral-300 group-hover:text-[#E52B34] group-hover:translate-x-0.5"
                        }`} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Main Viewport (App details) */}
          <div className="flex-1 border border-neutral-200 bg-white/95 rounded-none p-8 sm:p-10 md:p-12 flex flex-col justify-between relative min-w-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTool.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-10 lg:space-y-12 flex-1"
              >
                {/* Viewport Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold font-title-serif uppercase tracking-wider px-2.5 py-1 border rounded-none ${currentTool.statusColor}`}>
                        {currentTool.status}
                      </span>
                      <span className="text-xs font-title-serif font-bold text-neutral-400 tracking-wider">
                        {currentTool.category}
                      </span>
                    </div>
                    <h2 className="font-impact-condensed text-3xl sm:text-4xl tracking-wide flex items-baseline gap-2">
                      <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-950 bg-clip-text text-transparent">
                        {currentTool.name}
                      </span>
                      <span className="font-serif text-xs text-neutral-400 block sm:inline">({currentTool.jpName})</span>
                    </h2>
                  </div>
                  
                  <div className="w-14 h-14 rounded-none bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-md">
                    <ToolIcon className="w-7 h-7 text-[#E52B34]" />
                  </div>
                </div>

                {/* Main description */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-title-serif font-extrabold uppercase text-[#E52B34] tracking-[0.2em] block">
                    Descripción del Módulo
                  </h3>
                  <p className="font-body text-neutral-700 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
                    {currentTool.description}
                  </p>
                </div>

                {/* Features & Specs Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 pt-2">
                  <div className="space-y-5">
                    <h3 className="text-xs font-title-serif font-extrabold uppercase text-[#E52B34] tracking-[0.15em] border-b border-neutral-100 pb-2">
                      Características Principales
                    </h3>
                    <div className="grid grid-cols-1 gap-4 font-body text-xs text-neutral-600">
                      {currentTool.features.map((feat, index) => (
                        <div key={index} className="flex gap-3.5 items-start p-4 bg-neutral-50/60 border border-neutral-100 hover:bg-white hover:border-[#E52B34]/15 hover:shadow-md transition-all duration-200">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-neutral-900 font-semibold block text-xs tracking-wide uppercase font-sans-condensed">{feat.label}</strong>
                            <span className="text-neutral-500 font-light block leading-relaxed mt-1 text-[11px]">{feat.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements sidebar inside viewport */}
                  <div className="space-y-5 lg:border-l lg:border-neutral-200 lg:pl-8">
                    <h3 className="text-xs font-title-serif font-extrabold uppercase text-[#E52B34] tracking-[0.15em] border-b border-neutral-100 pb-2 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-neutral-400" /> Requerimientos del Sistema
                    </h3>
                    <div className="space-y-4 font-body text-xs text-neutral-700">
                      {currentTool.requirements.map((req, index) => (
                        <div key={index} className="flex items-center justify-between border-b border-neutral-100/60 pb-3">
                          <span className="font-semibold text-neutral-800 tracking-wide text-xs">{req.name}</span>
                          <span className="text-[9px] font-bold font-title-serif uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 border border-emerald-100/70">
                            Requerido
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {!currentTool.active && (
                      <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 sm:p-5 text-[11px] font-body leading-relaxed flex gap-2.5 items-start rounded-none mt-4">
                        <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>Este módulo se encuentra en fase de desarrollo o planificación de diseño y requiere roles autorizados para el acceso una vez desplegado.</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Viewport Footer Trigger */}
                <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-2 text-neutral-400 text-[11px] font-body font-light">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>¿Tienes dudas? Consulta con el Sensei.</span>
                  </div>
                  
                  {currentTool.active ? (
                    <Link
                      href={currentTool.actionLink}
                      className="relative overflow-hidden bg-gradient-to-r from-[#E52B34] via-[#FF4D55] to-[#B81B22] hover:from-[#c82028] hover:to-[#9f131a] text-white rounded-none text-xs tracking-widest px-10 py-4.5 shadow-[0_4px_20px_rgba(229,43,52,0.3)] hover:shadow-[0_8px_30px_rgba(229,43,52,0.5)] transition-all duration-300 flex items-center justify-center gap-2 self-end font-sans-condensed font-bold hover:scale-[1.04] active:scale-95 group/btn cursor-pointer shine-sweep"
                    >
                      <span>{currentTool.actionText}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="btn-kpl-secondary rounded-none text-xs tracking-widest px-10 py-4.5 opacity-40 cursor-not-allowed flex items-center justify-center gap-2 self-end border-neutral-300 text-neutral-500 bg-neutral-100 font-bold"
                    >
                      <Lock className="w-3.5 h-3.5" /> {currentTool.actionText}
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
