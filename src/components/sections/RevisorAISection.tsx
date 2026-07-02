"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { 
  ArrowLeft, 
  Dumbbell, 
  Activity, 
  Flame, 
  Zap, 
  Target, 
  ShieldAlert,
  Play
} from "lucide-react";

// Dynamically import revisor clients with ssr: false to prevent window/document SSR errors
const BicepCurlRevisorClient = dynamic(
  () => import("@/components/revisores/BicepCurlRevisorClient").then(m => m.BicepCurlRevisorClient),
  { ssr: false }
);
const BurpeeRevisorClient = dynamic(
  () => import("@/components/revisores/BurpeeRevisorClient").then(m => m.BurpeeRevisorClient),
  { ssr: false }
);
const PushupRevisorClient = dynamic(
  () => import("@/components/revisores/PushupRevisorClient").then(m => m.PushupRevisorClient),
  { ssr: false }
);
const ShoulderPressRevisorClient = dynamic(
  () => import("@/components/revisores/ShoulderPressRevisorClient").then(m => m.ShoulderPressRevisorClient),
  { ssr: false }
);
const SquatRevisorClient = dynamic(
  () => import("@/components/revisores/SquatRevisorClient").then(m => m.SquatRevisorClient),
  { ssr: false }
);
const TricepKickbackRevisorClient = dynamic(
  () => import("@/components/revisores/TricepKickbackRevisorClient").then(m => m.TricepKickbackRevisorClient),
  { ssr: false }
);

interface ExerciseOption {
  id: string;
  slug: string;
  name: string;
  jpName: string;
  description: string;
  target: string;
  difficulty: "Principiante" | "Intermedio" | "Avanzado";
  difficultyColor: string;
  duration: string;
  icon: React.ComponentType<any>;
}

const EXERCISES: ExerciseOption[] = [
  {
    id: "6a3f6010982a923c435fe8a1",
    slug: "bicepcurl-revisor",
    name: "Curl de Bíceps",
    jpName: "上腕二頭筋カール",
    description: "Revisa tu técnica de curl de bíceps de perfil. Mantén tus codos fijos a los lados del cuerpo y tu espalda alineada sin balancearte al levantar el peso.",
    target: "Bíceps y Antebrazo",
    difficulty: "Principiante",
    difficultyColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    duration: "5 Minutos",
    icon: Dumbbell
  },
  {
    id: "6a3f6640982a923c435ff20a",
    slug: "tricepkickback-revisor",
    name: "Patada de Tríceps",
    jpName: "上腕三頭筋キickback",
    description: "Evalúa tu técnica de patada de tríceps de perfil. Inclina tu torso hacia adelante manteniendo la espalda recta y extiende por completo el codo.",
    target: "Tríceps y Deltoides",
    difficulty: "Intermedio",
    difficultyColor: "bg-amber-50 text-amber-700 border-amber-200",
    duration: "5 Minutos",
    icon: Target
  },
  {
    id: "6a332d98613142441f7c2882",
    slug: "pushup-revisor",
    name: "Flexiones de Brazos",
    jpName: "腕立て伏せ",
    description: "Monitorea tu técnica de pechadas/lagartijas de perfil en posición de plancha. Flexiona los codos al ángulo correcto para contar repeticiones.",
    target: "Pectorales y Tríceps",
    difficulty: "Intermedio",
    difficultyColor: "bg-amber-50 text-amber-700 border-amber-200",
    duration: "5 Minutos",
    icon: Activity
  },
  {
    id: "6a332bcdb31be55d35382312",
    slug: "squat-revisor",
    name: "Sentadillas con IA",
    jpName: "スクワット",
    description: "Revisa tu técnica de sentadillas de perfil. Flexiona las rodillas a la profundidad correcta y mantén el torso estable y los talones fijos.",
    target: "Cuádriceps y Glúteos",
    difficulty: "Intermedio",
    difficultyColor: "bg-amber-50 text-amber-700 border-amber-200",
    duration: "5 Minutos",
    icon: Zap
  },
  {
    id: "6a3f60e2982a923c435feb05",
    slug: "shoulderpress-revisor",
    name: "Press Militar",
    jpName: "ショルダープレス",
    description: "Verifica tu técnica de press de hombros de frente. Mantén tus antebrazos verticales y empuja con fuerza y simetría.",
    target: "Hombros y Tríceps",
    difficulty: "Intermedio",
    difficultyColor: "bg-amber-50 text-amber-700 border-amber-200",
    duration: "5 Minutos",
    icon: Target
  },
  {
    id: "6a333b68a6ea476fbae2b9a1",
    slug: "burpee-revisor",
    name: "Burpees Completos",
    jpName: "バーピー",
    description: "Evalúa tu técnica de burpees de perfil. Realiza la secuencia fluida: de pie, plancha con pecho al suelo, regreso y salto final extendiendo las manos.",
    target: "Cuerpo Completo / Cardio",
    difficulty: "Avanzado",
    difficultyColor: "bg-rose-50 text-rose-700 border-rose-200",
    duration: "7 Minutos",
    icon: Flame
  }
];

export default function RevisorAISection() {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseOption | null>(null);

  const guestUser = { name: "Invitado", email: "invitado@karateparalatinos.com" };

  const routineObj = selectedExercise ? {
    _id: selectedExercise.id,
    title: selectedExercise.name,
    slug: selectedExercise.slug,
    description: selectedExercise.description,
    estimated_duration: selectedExercise.slug === "burpee-revisor" ? 7 : 5,
    difficulty: selectedExercise.difficulty
  } : null;

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-start items-center overflow-x-hidden bg-[var(--background)] preguntas-section pb-20">
      {/* ===== Background Watermark Kanji (Traditional Vibe) ===== */}
      <div className="absolute right-10 md:right-20 lg:right-32 top-[12%] text-[24vw] md:text-[14vw] font-black text-neutral-900/[0.012] select-none pointer-events-none leading-none z-0 font-serif">
        評価
      </div>

      {/* ===== Stylized Rising Sun (Hinomaru) ===== */}
      <div className="absolute right-[-100px] md:right-[4%] lg:right-[8%] bottom-[8%] w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] lg:w-[520px] lg:h-[520px] z-0 pointer-events-none flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-tr from-[#E52B34] via-[#FF4D55] to-[#B81B22] opacity-[0.06] rounded-full blur-[3px] shadow-[0_0_100px_rgba(229,43,52,0.2)] animate-pulse duration-[8000ms]" />
        <div className="absolute w-[80%] h-[80%] border border-dashed border-[#E52B34]/10 rounded-full animate-[spin_120s_linear_infinite] z-0" />
      </div>

      <div className="relative z-20 w-full max-w-[95vw] sm:max-w-6xl mx-auto px-4 flex flex-col justify-start items-center">
        
        {/* Navigation & Header */}
        <div className="w-full flex flex-col items-start mb-10">
          <Link
            href="/herramientas"
            className="flex items-center gap-2 text-xs font-title-serif font-extrabold text-[#556358] hover:text-[#E52B34] transition-colors mb-6 group uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Volver a Herramientas
          </Link>
          
          <div className="text-center md:text-left w-full border-b border-neutral-200/80 pb-6 flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
            <div>
              <span className="font-title-serif text-xs text-[#556358] tracking-[0.25em] uppercase block mb-2">
                Evaluador Biomecánico
              </span>
              <h1 className="font-impact-condensed text-4xl sm:text-5xl font-bold tracking-wide text-neutral-900 leading-none">
                REVISOR <span className="bg-gradient-to-r from-[#E52B34] via-[#FF4D55] to-[#B81B22] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(229,43,52,0.12)]">AI</span>
              </h1>
            </div>
            <p className="font-body text-neutral-600 text-sm max-w-md font-light text-center md:text-right">
              {selectedExercise 
                ? `Evaluando técnica en vivo para ${selectedExercise.name}. Sigue las guías en pantalla.` 
                : "Selecciona una rutina para iniciar el espejo interactivo con visión artificial y evaluar tu técnica en tiempo real."
              }
            </p>
          </div>
        </div>

        {selectedExercise && routineObj ? (
          /* ===== CAMERA INTERFACE (NATIVE ACTIVE RUNNER) ===== */
          <div className="w-full space-y-6 animate-in fade-in zoom-in-95 duration-300">
            {/* Header info bar */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/80 border border-neutral-200/90 p-4 shadow-sm backdrop-blur-md gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-900 text-white flex items-center justify-center">
                  <selectedExercise.icon className="w-5 h-5 text-[#E52B34]" />
                </div>
                <div>
                  <h2 className="font-impact-condensed text-lg text-neutral-900 tracking-wide">
                    {selectedExercise.name} <span className="font-serif text-xs text-neutral-400 font-normal">({selectedExercise.jpName})</span>
                  </h2>
                  <span className="text-[10px] text-neutral-500 font-body block uppercase tracking-wider">{selectedExercise.target}</span>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedExercise(null)}
                className="px-5 py-2 border border-neutral-300 hover:border-[#E52B34] text-neutral-700 hover:text-[#E52B34] transition-all text-xs font-bold font-sans-condensed tracking-widest flex items-center gap-2 cursor-pointer bg-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> ELEGIR OTRO EJERCICIO
              </button>
            </div>

            {/* Native Component Mount */}
            <div className="w-full rounded-none border border-neutral-200 bg-black shadow-xl relative overflow-hidden">
              {selectedExercise.slug === "bicepcurl-revisor" && (
                <BicepCurlRevisorClient user={guestUser} routine={routineObj} />
              )}
              {selectedExercise.slug === "tricepkickback-revisor" && (
                <TricepKickbackRevisorClient user={guestUser} routine={routineObj} />
              )}
              {selectedExercise.slug === "pushup-revisor" && (
                <PushupRevisorClient user={guestUser} routine={routineObj} />
              )}
              {selectedExercise.slug === "squat-revisor" && (
                <SquatRevisorClient user={guestUser} routine={routineObj} />
              )}
              {selectedExercise.slug === "shoulderpress-revisor" && (
                <ShoulderPressRevisorClient user={guestUser} routine={routineObj} />
              )}
              {selectedExercise.slug === "burpee-revisor" && (
                <BurpeeRevisorClient user={guestUser} routine={routineObj} />
              )}
            </div>
            
            {/* Warning / Instructions banner */}
            <div className="w-full bg-amber-50 border border-amber-200/70 p-4 flex gap-3 items-start max-w-4xl mx-auto shadow-sm">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="font-body text-xs text-amber-800 leading-relaxed">
                <strong className="font-semibold block mb-0.5">Indicaciones de Uso:</strong>
                <ul className="list-disc pl-4 space-y-1 mt-1 text-amber-700/90 font-light">
                  <li>Otorga permisos de <strong>Cámara Web</strong> al navegador cuando sea solicitado.</li>
                  <li>Colócate a una distancia de aproximadamente <strong>2 metros</strong> de la cámara para que capture todo tu cuerpo.</li>
                  <li>Asegúrate de estar en un área bien iluminada y sin objetos que obstruyan la visibilidad de tus articulaciones.</li>
                  <li>Sigue la postura de la silueta holográfica para calibrar y comenzar a contar las repeticiones automáticamente.</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* ===== SELECTION GRID ===== */
          <div className="w-full space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EXERCISES.map((exercise) => {
                const ExerciseIcon = exercise.icon;
                return (
                  <div
                    key={exercise.id}
                    className="flex flex-col justify-between border border-neutral-200/90 bg-white/65 hover:bg-white/90 hover:border-[#E52B34]/30 shadow-md hover:shadow-lg transition-all duration-300 p-6 min-h-[280px] relative group backdrop-blur-md rounded-none"
                  >
                    {/* Top corner red accent line on hover */}
                    <div className="absolute top-0 left-0 w-0 h-1 bg-[#E52B34] transition-all duration-300 group-hover:w-full" />
                    
                    <div className="space-y-4">
                      {/* Icon + JP Name */}
                      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                        <div className="w-10 h-10 bg-neutral-900 text-white flex items-center justify-center shadow-md">
                          <ExerciseIcon className="w-5 h-5 text-[#E52B34]" />
                        </div>
                        <span className="font-mono text-[9px] text-[#556358] text-right leading-tight">
                          {exercise.jpName}
                        </span>
                      </div>
                      
                      {/* Title & Stats */}
                      <div className="space-y-1">
                        <h3 className="font-impact-condensed text-xl text-neutral-900 tracking-wide">
                          {exercise.name}
                        </h3>
                        <div className="flex items-center gap-2 pt-1">
                          <span className={`text-[9px] font-bold font-title-serif uppercase tracking-wider px-2 py-0.5 border ${exercise.difficultyColor}`}>
                            {exercise.difficulty}
                          </span>
                          <span className="text-[10px] font-body text-neutral-400 font-semibold uppercase tracking-wider">
                            {exercise.duration}
                          </span>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="font-body text-neutral-600 text-xs font-light leading-relaxed">
                        {exercise.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-neutral-100/60 flex items-center justify-between">
                      <span className="text-[10px] text-neutral-400 font-body">
                        Enfoque: <strong className="text-neutral-700 font-medium">{exercise.target}</strong>
                      </span>
                      <button
                        onClick={() => setSelectedExercise(exercise)}
                        className="bg-neutral-900 hover:bg-[#E52B34] text-white transition-colors duration-300 px-4 py-2 text-[10px] tracking-widest font-sans-condensed font-bold flex items-center gap-1.5 cursor-pointer rounded-none"
                      >
                        <Play className="w-3 h-3 fill-white" /> EVALUAR
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
