"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square, Award } from "lucide-react";

// Requisitos de cinturones
const beltRequirements = [
  {
    current: "Blanco (9º Kyu)",
    next: "Amarillo (8º Kyu)",
    time: "3-4 meses de entrenamiento regular",
    katas: ["Taikyoku Shodan", "Heian Shodan (Básico)"],
    kihon: "Golpes rectos (Oi-Tsuki), bloqueos básicos (Gedan-Barai, Age-Uke) y posición Zenkutsu-Dachi.",
    tips: "Enfócate en la estabilidad de tus posiciones y en mantener la espalda recta al avanzar."
  },
  {
    current: "Amarillo (8º Kyu)",
    next: "Naranja (7º Kyu)",
    time: "4 meses desde el grado anterior",
    katas: ["Heian Shodan", "Heian Nidan"],
    kihon: "Bloqueos dobles (Morote-Uke), patada frontal (Mae-Geri) y transición fluida a Kokutsu-Dachi.",
    tips: "Asegura la rotación de cadera en los bloqueos y la correcta recogida de la pierna en las patadas."
  },
  {
    current: "Naranja (7º Kyu)",
    next: "Verde (6º Kyu)",
    time: "4-5 meses desde el grado anterior",
    katas: ["Heian Nidan", "Heian Sandan"],
    kihon: "Patada lateral (Yoko-Geri Keage/Kekomi), golpe de codo (Empi-Uchi) y Shuto-Uke (mano espada).",
    tips: "Desarrolla fuerza en los costados y practica el balance sobre un solo pie para las patadas laterales."
  },
  {
    current: "Verde (6º Kyu)",
    next: "Azul (5º/4º Kyu)",
    time: "5-6 meses desde el grado anterior",
    katas: ["Heian Sandan", "Heian Yondan"],
    kihon: "Golpe de revés (Uraken-Uchi), bloqueos combinados a doble altura y patada circular (Mawashi-Geri).",
    tips: "Aumenta el control de tu respiración en los puntos de tensión y mejora la fluidez de tus Katas."
  },
  {
    current: "Azul (4º Kyu)",
    next: "Marrón (3º/2º/1º Kyu)",
    time: "6 meses desde el grado anterior",
    katas: ["Heian Yondan", "Heian Godan", "Tekki Shodan"],
    kihon: "Bloqueo y contraataque simultáneos, defensa personal aplicada (Bunkai) y combinaciones dinámicas.",
    tips: "Es hora de transicionar de la fuerza muscular bruta al uso inteligente de la biomecánica corporal."
  },
  {
    current: "Marrón (1º Kyu)",
    next: "Negro (1º Dan - Shodan)",
    time: "12 meses desde el grado anterior",
    katas: ["Heian 1-5", "Tekki Shodan", "Bassai Dai (Kata de Selección)"],
    kihon: "Kihon-Kumite formal, Jiyu-Kumite (combate libre regulado) y dominio total de la teoría y filosofía marcial.",
    tips: "El cinturón negro no es la meta final, sino el inicio del verdadero aprendizaje. Mantén tu mente de principiante."
  }
];

export default function Herramientas() {
  // Mokuso Breathing State
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<"Inhalar" | "Retener" | "Exhalar" | "Listo">("Listo");
  const [breathCount, setBreathCount] = useState(4); // 4s cycle
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Belt Checker State
  const [selectedBeltIndex, setSelectedBeltIndex] = useState(0);

  // Mokuso Loop Logic
  useEffect(() => {
    if (!isBreathingActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setBreathCount((prev) => {
        if (prev === 1) {
          // Cambiar fase
          setBreathingPhase((currentPhase) => {
            if (currentPhase === "Inhalar") return "Retener";
            if (currentPhase === "Retener") return "Exhalar";
            return "Inhalar"; // Loop
          });
          return 4; // Reiniciar cuenta
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isBreathingActive]);

  const toggleBreathing = () => {
    setIsBreathingActive((prev) => {
      const next = !prev;
      if (next) {
        setBreathingPhase("Inhalar");
        setBreathCount(4);
      } else {
        setBreathingPhase("Listo");
      }
      return next;
    });
  };

  // Breathing Visual Helper Values
  const getCircleScale = () => {
    if (breathingPhase === "Inhalar") {
      // Scale from 1 to 1.4 based on breathCount (4 down to 1)
      return 1 + (4 - breathCount) * 0.1;
    }
    if (breathingPhase === "Retener") {
      return 1.4;
    }
    if (breathingPhase === "Exhalar") {
      // Scale from 1.4 down to 1 based on breathCount (4 down to 1)
      return 1 + breathCount * 0.1;
    }
    return 1;
  };

  const getCircleColor = () => {
    if (breathingPhase === "Inhalar") return "rgba(229, 43, 52, 0.25)"; // Soft red
    if (breathingPhase === "Retener") return "rgba(229, 43, 52, 0.4)"; // Deep red
    if (breathingPhase === "Exhalar") return "rgba(85, 99, 88, 0.25)"; // Sage
    return "rgba(85, 99, 88, 0.1)";
  };

  return (
    <section
      id="herramientas"
      className="relative py-24 bg-[var(--background-alt)] overflow-hidden border-t border-neutral-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-title-serif text-xs text-[#556358] tracking-[0.25em] uppercase block mb-3"
          >
            CENTRO DIGITAL DE AYUDA
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-impact-condensed text-3xl sm:text-5xl font-bold tracking-wider text-neutral-900"
          >
            HERRAMIENTAS PARA <span className="text-[#E52B34]">ENTRENAR</span> EN CASA
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-neutral-600 mt-6 font-light leading-relaxed text-sm sm:text-base"
          >
            Integramos utilidades web interactivas y gratuitas para complementar tus prácticas diarias de meditación y estructurar tu progreso técnico.
          </motion.p>
        </div>

        {/* Dos Columnas de Herramientas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Herramienta 1: Mokuso Breathing Timer */}
          <div className="glass-card p-8 sm:p-10 flex flex-col justify-between items-center relative overflow-hidden shadow-sm">
            <div className="w-full text-center sm:text-left mb-6">
              <span className="font-title-serif text-[10px] text-[#556358] tracking-[0.2em] uppercase">
                Meditación Activa
              </span>
              <h3 className="font-impact-condensed text-2xl text-neutral-900 mt-1">
                Temporizador de Mokuso (黙想)
              </h3>
              <p className="font-body text-neutral-600 text-xs font-light mt-2 leading-relaxed max-w-md">
                Usa este temporizador basado en el patrón box breathing (4s inhalar, 4s retener, 4s exhalar) para calmar tu mente antes de entrenar o competir.
              </p>
            </div>

            {/* Círculo Interactivo de Respiración */}
            <div className="relative w-72 h-72 flex items-center justify-center my-8">
              {/* Círculo pulsante exterior */}
              <motion.div
                animate={{
                  scale: getCircleScale(),
                  backgroundColor: getCircleColor(),
                }}
                transition={{ duration: 1, ease: "linear" }}
                className="absolute w-44 h-44 rounded-full flex items-center justify-center"
              />

              {/* Anillo límite */}
              <div className="absolute w-60 h-60 rounded-full border border-neutral-200 pointer-events-none" />
              <div className="absolute w-44 h-44 rounded-full border border-[#556358]/20 pointer-events-none" />

              {/* Contenido Central */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={breathingPhase}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="font-impact-condensed text-3xl text-neutral-900 tracking-widest"
                  >
                    {breathingPhase}
                  </motion.span>
                </AnimatePresence>

                {isBreathingActive && (
                  <motion.span
                    key={breathCount}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#E52B34] font-mono font-bold text-xl mt-2"
                  >
                    {breathCount}s
                  </motion.span>
                )}
              </div>
            </div>

            {/* Controles del temporizador */}
            <div className="flex gap-4 w-full justify-center">
              <button
                onClick={toggleBreathing}
                className={`btn-kpl-primary text-xs ${isBreathingActive ? "bg-neutral-200 border-neutral-300 text-neutral-800 hover:text-neutral-900" : ""}`}
              >
                {isBreathingActive ? (
                  <>
                    <Square className="w-4 h-4" /> Detener
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" /> Iniciar Mokuso
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Herramienta 2: Calculadora de Requisitos de Grado */}
          <div className="glass-card p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-sm">
            <div className="w-full text-center sm:text-left mb-6">
              <span className="font-title-serif text-[10px] text-[#556358] tracking-[0.2em] uppercase">
                Requisitos Técnicos
              </span>
              <h3 className="font-impact-condensed text-2xl text-neutral-900 mt-1">
                Consultar Siguiente Grado
              </h3>
              <p className="font-body text-neutral-600 text-xs font-light mt-2 leading-relaxed">
                Selecciona tu rango actual en karate para revisar qué Katas, Kihon (conceptos básicos) y tiempos mínimos requiere tu próximo paso de cinturón.
              </p>
            </div>

            {/* Selector de Cinturón */}
            <div className="space-y-4 my-4">
              <div>
                <label className="block text-xs font-title-serif text-[#556358] uppercase tracking-wider mb-2">
                  Cinturón Actual
                </label>
                <select
                  value={selectedBeltIndex}
                  onChange={(e) => setSelectedBeltIndex(Number(e.target.value))}
                  className="w-full bg-white border border-neutral-200 rounded-lg py-3 px-4 text-sm font-body text-neutral-900 focus:border-[#E52B34] focus:outline-none transition-colors shadow-sm"
                >
                  {beltRequirements.map((item, idx) => (
                    <option key={idx} value={idx}>
                      {item.current}
                    </option>
                  ))}
                </select>
              </div>

              {/* Panel de Requisitos */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedBeltIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="border border-neutral-200 rounded-xl p-5 bg-white space-y-4 text-left shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-neutral-200/60 pb-3">
                    <span className="text-xs text-neutral-500 font-body">Siguiente objetivo:</span>
                    <span className="font-impact-condensed text-base text-[#E52B34] tracking-wider flex items-center gap-1.5">
                      <Award className="w-4 h-4" /> {beltRequirements[selectedBeltIndex].next}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-title-serif text-[#556358] block mb-1">TIEMPO MÍNIMO REQUERIDO</span>
                    <p className="text-xs text-neutral-900 font-body font-medium">
                      {beltRequirements[selectedBeltIndex].time}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-title-serif text-[#556358] block mb-1">KATAS CLAVE A MASTERIZAR</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {beltRequirements[selectedBeltIndex].katas.map((kata, kIdx) => (
                        <span key={kIdx} className="text-[10px] bg-[var(--background-alt)] border border-neutral-200/60 text-neutral-800 py-1 px-2.5 rounded-full font-mono font-medium">
                          {kata}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-title-serif text-[#556358] block mb-1">ENFOQUE KIHON (TÉCNICO)</span>
                    <p className="text-xs text-neutral-600 font-body leading-relaxed">
                      {beltRequirements[selectedBeltIndex].kihon}
                    </p>
                  </div>

                  <div className="bg-[#556358]/8 border-l-2 border-[#556358] p-3 rounded-r-md">
                    <span className="text-[9px] font-title-serif text-[#556358] block mb-0.5">CONSEJO DOJO</span>
                    <p className="text-[11px] italic text-neutral-800 font-body leading-relaxed">
                      {beltRequirements[selectedBeltIndex].tips}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
