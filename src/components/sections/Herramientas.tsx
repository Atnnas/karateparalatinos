"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Camera, 
  Mic, 
  Target, 
  Eye, 
  Video, 
  Sparkles, 
  Zap, 
  Lock, 
  Users, 
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
    status: "En Desarrollo",
    statusColor: "bg-amber-500/10 border-amber-500/30 text-amber-600",
    category: "Clase en Vivo (Meet)",
    icon: Users,
    description: "Conexión interactiva remota en tiempo real en colaboración con Google Meet. Permite al Sensei evaluar la postura del alumno a distancia, activar siluetas guía de manera remota y capturar posiciones directamente a la base de datos sin interrumpir el entrenamiento del alumno.",
    features: [
      { label: "Integración Meet", desc: "Funciona directamente en el panel lateral de Google Meet." },
      { label: "Captura Remota", desc: "El Sensei guarda tus poses a la base de datos desde su pantalla." },
      { label: "Guía Interactiva", desc: "El Sensei activa siluetas fantasma en tu pantalla a distancia." },
      { label: "Seguridad Elevada", desc: "Acceso protegido exclusivo para instructores con rol de admin." }
    ],
    requirements: [
      { name: "Google Meet", supported: true },
      { name: "Conexión Estable", supported: true },
      { name: "Rol de Instructor", supported: true }
    ],
    actionText: "EXCLUSIVO PARA INSTRUCTORES",
    actionLink: "#",
    active: false,
    badge: "Exclusivo Sensei"
  },
  {
    id: "kata-ai",
    name: "Kata AI Analyzer",
    jpName: "型AIアナライザー",
    status: "Planificado",
    statusColor: "bg-neutral-500/10 border-neutral-500/30 text-neutral-600",
    category: "Formas AI",
    icon: Sparkles,
    description: "Realiza formas completas (Katas como Heian Shodan) frente a la cámara. Nuestra red neuronal evaluará la secuencia exacta de movimientos, el ritmo, los giros, la postura del torso y la transición del centro de gravedad, otorgando una puntuación final de ejecución.",
    features: [
      { label: "Secuenciador de Movimientos", desc: "Valida que realices el orden correcto de las técnicas." },
      { label: "Métricas de Ritmo", desc: "Mide las pausas y aceleraciones de la kata completa." },
      { label: "Centro de Gravedad", desc: "Analiza el balance y la altura de la cadera en los giros." },
      { label: "Calificación Oficial", desc: "Obtén retroalimentación y estrellas por tu nivel de ejecución." }
    ],
    requirements: [
      { name: "Cámara Web", supported: true },
      { name: "Espacio (3 metros)", supported: true },
      { name: "Buena Iluminación", supported: true }
    ],
    actionText: "EN FASE DE DISEÑO",
    actionLink: "#",
    active: false
  },
  {
    id: "kumite-speed",
    name: "Kumite Speedometer",
    jpName: "組手スピードメーター",
    status: "Planificado",
    statusColor: "bg-neutral-500/10 border-neutral-500/30 text-neutral-600",
    category: "Velocidad de Combate",
    icon: Zap,
    description: "Mide y optimiza tu velocidad de ataque y tiempo de reacción. El sistema generará estímulos visuales en pantalla y registrará en milisegundos cuánto tardas en reaccionar con un golpe y la aceleración máxima de tu puño o patada.",
    features: [
      { label: "Tiempo de Reacción", desc: "Mide los milisegundos desde el estímulo hasta el inicio del golpe." },
      { label: "Acelerómetro 2D", desc: "Cálculo matemático de la velocidad pico y aceleración del impacto." },
      { label: "Tabla de Récords", desc: "Compite contra tus propios tiempos y los de otros practicantes." },
      { label: "Temporizador Reactivo", desc: "Intervalos aleatorios diseñados para mejorar tus reflejos." }
    ],
    requirements: [
      { name: "Cámara Web", supported: true },
      { name: "Área de Guardia", supported: true },
      { name: "Reflejos Rápidos", supported: true }
    ],
    actionText: "EN FASE DE DISEÑO",
    actionLink: "#",
    active: false
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

      <div className="relative z-20 max-w-[96vw] xl:max-w-[94vw] 2xl:max-w-[1620px] mx-auto px-4 sm:px-8 lg:px-12 w-full flex flex-col justify-start items-center pt-0">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-title-serif text-xs text-[#556358] tracking-[0.25em] uppercase block mb-3"
          >
            CENTRO DIGITAL DE ENTRENAMIENTO
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-impact-condensed text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-neutral-900 leading-[1.08] mb-3"
          >
            TABLERO DE <span className="text-[#E52B34] drop-shadow-[0_2px_8px_rgba(229,43,52,0.15)]">APLICACIONES</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-body text-neutral-600 mt-2 font-light leading-relaxed text-sm sm:text-base max-w-2xl mx-auto"
          >
            Conéctate con tu dojo. Controla y navega por el ecosistema de herramientas de visión artificial y aprendizaje interactivo diseñadas para tu Karate en casa.
          </motion.p>
        </div>

        {/* Dashboard Layout Container */}
        <div className="w-full flex flex-col md:flex-row gap-6 bg-white/65 border border-neutral-200/90 shadow-lg rounded-2xl overflow-hidden p-4 sm:p-6 min-h-[580px] backdrop-blur-md">
          
          {/* LEFT: Sidebar Tabs (Responsive menu) */}
          <div className="w-full md:w-[280px] xl:w-[320px] shrink-0 flex flex-col gap-2.5">
            <span className="text-[10px] font-title-serif font-extrabold uppercase text-neutral-400 tracking-widest pl-2 hidden md:block">
              Módulos de Entrenamiento
            </span>
            
            {/* Horizontal scroll on mobile, Vertical stack on desktop */}
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none snap-x snap-mandatory">
              {tools.map((tool) => {
                const TabIcon = tool.icon;
                const isSelected = activeTab === tool.id;
                
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTab(tool.id)}
                    className={`snap-center flex items-center justify-between gap-3 text-left px-4 py-3 border rounded-xl transition-all cursor-pointer min-w-[200px] md:min-w-0 ${
                      isSelected
                        ? "bg-neutral-900 text-white border-neutral-900 shadow-md shadow-neutral-900/10 scale-[1.01]"
                        : "bg-white/95 text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                        isSelected ? "bg-[#E52B34] text-white" : "bg-neutral-100 text-[#E52B34]"
                      }`}>
                        <TabIcon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="font-impact-condensed tracking-wider text-sm block">
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
                        <Lock className={`w-3.5 h-3.5 ${isSelected ? "text-neutral-400" : "text-neutral-400"}`} />
                      ) : (
                        <ChevronRight className={`w-4 h-4 transition-transform hidden md:block ${
                          isSelected ? "translate-x-1 text-white" : "text-neutral-300"
                        }`} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Main Viewport (App details) */}
          <div className="flex-1 border border-neutral-200 bg-white/95 rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col justify-between relative min-w-0">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTool.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 flex-1"
              >
                {/* Viewport Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold font-title-serif uppercase tracking-wider px-2 py-0.5 border ${currentTool.statusColor}`}>
                        {currentTool.status}
                      </span>
                      <span className="text-xs font-title-serif font-bold text-neutral-400 tracking-wider">
                        {currentTool.category}
                      </span>
                    </div>
                    <h3 className="font-impact-condensed text-2xl sm:text-3xl text-neutral-900 tracking-wide flex items-baseline gap-2">
                      {currentTool.name}
                      <span className="font-serif text-xs text-neutral-400 block sm:inline">({currentTool.jpName})</span>
                    </h3>
                  </div>
                  
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-md">
                    <ToolIcon className="w-6 h-6 text-[#E52B34]" />
                  </div>
                </div>

                {/* Main description */}
                <div className="space-y-4">
                  <h4 className="text-xs font-title-serif font-extrabold uppercase text-[#E52B34] tracking-wider">
                    Descripción del Módulo
                  </h4>
                  <p className="font-body text-neutral-700 text-sm sm:text-base font-light leading-relaxed">
                    {currentTool.description}
                  </p>
                </div>

                {/* Features & Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <div className="space-y-4">
                    <h4 className="text-xs font-title-serif font-extrabold uppercase text-[#E52B34] tracking-wider">
                      Características Principales
                    </h4>
                    <div className="space-y-3 font-body text-xs text-neutral-600">
                      {currentTool.features.map((feat, index) => (
                        <div key={index} className="flex gap-2.5 items-start">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-neutral-900 font-semibold block">{feat.label}</strong>
                            <span className="text-neutral-500 font-light block leading-tight mt-0.5">{feat.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements sidebar inside viewport */}
                  <div className="space-y-4 border-t sm:border-t-0 sm:border-l border-neutral-200 pt-5 sm:pt-0 sm:pl-6">
                    <h4 className="text-xs font-title-serif font-extrabold uppercase text-[#E52B34] tracking-wider flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-neutral-400" /> Requerimientos del Sistema
                    </h4>
                    <div className="space-y-3 font-body text-xs text-neutral-700">
                      {currentTool.requirements.map((req, index) => (
                        <div key={index} className="flex items-center justify-between border-b border-neutral-100 pb-2">
                          <span className="font-medium">{req.name}</span>
                          <span className="text-[10px] font-bold font-title-serif uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-100">
                            Requerido
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {!currentTool.active && (
                      <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 text-[11px] font-body leading-relaxed flex gap-2.5 items-start rounded-xl mt-4">
                        <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>Este módulo se encuentra en fase de desarrollo o planificación de diseño y requiere roles autorizados para el acceso una vez desplegado.</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Viewport Footer Trigger */}
                <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-neutral-400 text-[11px] font-body font-light">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>¿Tienes dudas? Consulta con el Sensei.</span>
                  </div>
                  
                  {currentTool.active ? (
                    <Link
                      href={currentTool.actionLink}
                      className="btn-kpl-primary text-xs tracking-widest px-8 py-3.5 shadow-md flex items-center justify-center gap-2 self-end"
                    >
                      {currentTool.actionText}
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="btn-kpl-secondary text-xs tracking-widest px-8 py-3.5 opacity-40 cursor-not-allowed flex items-center justify-center gap-2 self-end border-neutral-300 text-neutral-500 bg-neutral-100 font-bold"
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
