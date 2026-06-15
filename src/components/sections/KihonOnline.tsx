"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { 
  Camera, 
  Mic, 
  MicOff, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  ArrowLeft, 
  CheckCircle2, 
  Compass, 
  Zap, 
  HelpCircle 
} from "lucide-react";

// Normaliza las coordenadas del esqueleto de referencia usando el centro y escala del torso del usuario
interface PoseLandmark {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
}

const normalizeReferenceLandmarks = (
  userLms: PoseLandmark[],
  presetLms: PoseLandmark[]
): PoseLandmark[] => {
  const userL11 = userLms[11];
  const userL12 = userLms[12];
  const userL23 = userLms[23];
  const userL24 = userLms[24];

  const presetL11 = presetLms[11];
  const presetL12 = presetLms[12];
  const presetL23 = presetLms[23];
  const presetL24 = presetLms[24];

  if (!userL11 || !userL12 || !userL23 || !userL24 || !presetL11 || !presetL12 || !presetL23 || !presetL24) {
    return presetLms;
  }

  // Centros de los torsos
  const userCenterX = (userL11.x + userL12.x + userL23.x + userL24.x) / 4;
  const userCenterY = (userL11.y + userL12.y + userL23.y + userL24.y) / 4;

  const presetCenterX = (presetL11.x + presetL12.x + presetL23.x + presetL24.x) / 4;
  const presetCenterY = (presetL11.y + presetL12.y + presetL23.y + presetL24.y) / 4;

  // Escala basada en el alto del torso
  const userHeight = Math.abs((userL11.y + userL12.y) / 2 - (userL23.y + userL24.y) / 2);
  const presetHeight = Math.abs((presetL11.y + presetL12.y) / 2 - (presetL23.y + presetL24.y) / 2);
  
  // Escala basada en el ancho de hombros
  const userWidth = Math.abs(userL11.x - userL12.x);
  const presetWidth = Math.abs(presetL11.x - presetL12.x);

  const scaleY = presetHeight > 0 ? userHeight / presetHeight : 1;
  const scaleX = presetWidth > 0 ? userWidth / presetWidth : 1;
  
  // Promediamos escalas para evitar distorsión de aspecto
  const scale = (scaleX + scaleY) / 2;

  return presetLms.map((pt) => {
    if (!pt) return pt;
    const dx = pt.x - presetCenterX;
    const dy = pt.y - presetCenterY;
    return {
      x: dx * scale + userCenterX,
      y: dy * scale + userCenterY
    };
  });
};



interface ISpeechRecognitionResult {
  transcript: string;
}

interface ISpeechRecognitionResultList {
  [key: number]: {
    [key: number]: ISpeechRecognitionResult;
    length: number;
  };
  length: number;
}

interface ISpeechRecognitionEvent {
  results: ISpeechRecognitionResultList;
}

interface ISpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives?: number;
  lang: string;
  onstart: () => void;
  onend: () => void;
  onresult: (event: ISpeechRecognitionEvent) => void;
  start: () => void;
  stop: () => void;
}

export default function KihonOnline() {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  
  // Integración de Base de Datos y Sesión
  const { data: session } = useSession();
  const [presets, setPresets] = useState<any[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>("");
  const [newPresetName, setNewPresetName] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  
  // Modos y Entrenamientos
  const [trainingMode, setTrainingMode] = useState<"superior" | "inferior">("superior");
  const [isGuidedMode, setIsGuidedMode] = useState(true);

  // Estados de Pose
  const [savedPoseAngles, setSavedPoseAngles] = useState<{ left: number; right: number } | null>(null);
  const [savedPoseLandmarks, setSavedPoseLandmarks] = useState<PoseLandmark[] | null>(null);
  const [alignmentScore, setAlignmentScore] = useState<number>(0);
  const [isAligned, setIsAligned] = useState(false);

  // Estados de Voz
  const [isListening, setIsListening] = useState(false);
  const [lastHeardCommand, setLastHeardCommand] = useState<string>("");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [tolerance, setTolerance] = useState(15);
  const [micPermissionError, setMicPermissionError] = useState(false);

  // Refs de Hardware y Canvas
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const poseInstanceRef = useRef<unknown>(null);
  const cameraInstanceRef = useRef<unknown>(null);
  
  // Refs para Lógica de Estado y Evitar Re-declaraciones en Callback
  const recognitionRef = useRef<any>(null);
  const recognitionActiveRef = useRef<boolean>(true);
  const errorCountRef = useRef<number>(0);
  const lastErrorTimeRef = useRef<number>(0);
  const lastErrorRef = useRef<string>("");
  const hasTriggeredAlignRef = useRef<boolean>(false);
  const isGuidedModeRef = useRef<boolean>(true);
  const trainingModeRef = useRef<"superior" | "inferior">("superior");
  const voiceEnabledRef = useRef<boolean>(false);
  const toleranceRef = useRef<number>(15);
  const motionHistoryRef = useRef<{ left: {x: number, y: number, z: number}, right: {x: number, y: number, z: number}, time: number }[]>([]);
  const peakSpeedRef = useRef<number>(0);
  const kimeAlertActiveRef = useRef<number>(0);
  const currentSpeedRef = useRef<number>(0);
  const latestPoseLandmarksRef = useRef<PoseLandmark[] | null>(null);
  const lastValidPoseLandmarksRef = useRef<{ landmarks: PoseLandmark[]; timestamp: number } | null>(null);
  const savedPoseLandmarksRef = useRef<PoseLandmark[] | null>(null);
  const savedPoseAnglesRef = useRef<{ left: number; right: number } | null>(null);
  const handlePoseResultsRef = useRef<((results: { poseLandmarks?: PoseLandmark[]; image?: CanvasImageSource }) => void) | null>(null);
  const lastTriggerTimeRef = useRef<number>(0);
  const lastKimePowerRef = useRef<number>(0);

  // Funciones de control de voz / micrófono
  const startSpeechRecognition = () => {
    recognitionActiveRef.current = true;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error("Error al iniciar SpeechRecognition:", e);
      }
    }
  };

  const stopSpeechRecognition = () => {
    recognitionActiveRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error("Error al detener SpeechRecognition:", e);
      }
    }
    setIsListening(false);
  };

  // Sincronizar Refs
  useEffect(() => {
    isGuidedModeRef.current = isGuidedMode;
  }, [isGuidedMode]);

  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled;
  }, [voiceEnabled]);

  useEffect(() => {
    toleranceRef.current = tolerance;
  }, [tolerance]);

  useEffect(() => {
    trainingModeRef.current = trainingMode;
  }, [trainingMode]);

  useEffect(() => {
    savedPoseLandmarksRef.current = savedPoseLandmarks;
  }, [savedPoseLandmarks]);

  useEffect(() => {
    savedPoseAnglesRef.current = savedPoseAngles;
  }, [savedPoseAngles]);

  // Cargar presets de la Base de Datos
  const fetchPresets = async () => {
    try {
      const res = await fetch("/api/presets");
      if (res.ok) {
        const data = await res.json();
        setPresets(data);
      }
    } catch (err) {
      console.error("Error fetching presets:", err);
    }
  };

  useEffect(() => {
    fetchPresets();
  }, []);

  // Inicialización de Síntesis de Voz
  const speak = (text: string) => {
    if (voiceEnabledRef.current && typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-MX";
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakRef = useRef(speak);
  useEffect(() => {
    speakRef.current = speak;
  });

  // Fórmulas Biomecánicas en 3D (eje Z de profundidad)
  const calculateAngle = (
    a: PoseLandmark,
    b: PoseLandmark,
    c: PoseLandmark
  ): number => {
    const az = a.z || 0;
    const bz = b.z || 0;
    const cz = c.z || 0;

    // Vector BA
    const ba = { x: a.x - b.x, y: a.y - b.y, z: az - bz };
    // Vector BC
    const bc = { x: c.x - b.x, y: c.y - b.y, z: cz - bz };

    // Producto punto
    const dot = ba.x * bc.x + ba.y * bc.y + ba.z * bc.z;
    // Magnitudes
    const lenA = Math.sqrt(ba.x * ba.x + ba.y * ba.y + ba.z * ba.z);
    const lenC = Math.sqrt(bc.x * bc.x + bc.y * bc.y + bc.z * bc.z);

    if (lenA === 0 || lenC === 0) return 0;

    const cosTheta = Math.min(1, Math.max(-1, dot / (lenA * lenC)));
    const angle = Math.acos(cosTheta) * (180.0 / Math.PI);
    return Math.round(angle);
  };

  const calculateCurrentAngles = (landmarks: PoseLandmark[], mode: "superior" | "inferior") => {
    if (mode === "superior") {
      // Ángulo de Codos: Hombro (11/12) -> Codo (13/14) -> Muñeca (15/16)
      const leftElbow = calculateAngle(landmarks[11], landmarks[13], landmarks[15]);
      const rightElbow = calculateAngle(landmarks[12], landmarks[14], landmarks[16]);
      return { left: leftElbow, right: rightElbow };
    } else {
      // Ángulo de Rodillas: Cadera (23/24) -> Rodilla (25/26) -> Tobillo (27/28)
      const leftKnee = calculateAngle(landmarks[23], landmarks[25], landmarks[27]);
      const rightKnee = calculateAngle(landmarks[24], landmarks[26], landmarks[28]);
      return { left: leftKnee, right: rightKnee };
    }
  };

  // Guardar Pose de Referencia (Manual o Voz)
  const triggerSavePose = () => {
    const lms = latestPoseLandmarksRef.current || (lastValidPoseLandmarksRef.current && Date.now() - lastValidPoseLandmarksRef.current.timestamp < 1500 ? lastValidPoseLandmarksRef.current.landmarks : null);
    if (lms) {
      const currentAngles = calculateCurrentAngles(lms, trainingModeRef.current);
      setSavedPoseLandmarks(lms);
      setSavedPoseAngles(currentAngles);
      hasTriggeredAlignRef.current = false;
      speak("Posición guardada como referencia. Intenta replicarla.");
    } else {
      speak("Asegúrate de estar bien visible frente a la cámara antes de guardar.");
    }
  };

  // Limpiar Pose
  const triggerResetPose = () => {
    setSavedPoseLandmarks(null);
    setSavedPoseAngles(null);
    setAlignmentScore(0);
    setIsAligned(false);
    hasTriggeredAlignRef.current = false;
    speak("Postura de referencia borrada.");
  };

  // Cambiar modo de entrenamiento e inicializar/limpiar estados
  const changeTrainingMode = (mode: "superior" | "inferior") => {
    setTrainingMode(mode);
    setSavedPoseLandmarks(null);
    setSavedPoseAngles(null);
    setAlignmentScore(0);
    setIsAligned(false);
    hasTriggeredAlignRef.current = false;
    speak(mode === "superior" ? "Cambiado a entrenamiento de tren superior." : "Cambiado a entrenamiento de tren inferior.");
  };

  // Procesamiento de Comandos de Voz (retorna true si reconoció un comando válido)
  const handleSpeechCommand = (text: string): boolean => {
    // Solo actualizamos visualmente el comando en el HUD si no está vacío
    if (text.trim()) {
      setLastHeardCommand(text);
    }

    const now = Date.now();
    if (now - lastTriggerTimeRef.current < 2000) {
      return false; // Evita ejecuciones duplicadas en ráfaga
    }

    let triggered = false;

    // Listas depuradas de palabras clave (evitamos palabras muy cortas como "ya", "ok", "pie", "mano" 
    // que causan falsos positivos constantes con el ruido de fondo o respiración).
    const saveKeywords = [
      "guardar postura", "guardar posición", "guardar posicion", "guardar", 
      "grabar postura", "grabar", "capturar postura", "capturar", "fijar postura", "fijar"
    ];
    const resetKeywords = [
      "reiniciar postura", "limpiar postura", "borrar postura", "reiniciar", "limpiar", 
      "borrar", "reset", "resetear", "eliminar postura", "eliminar"
    ];
    const upperKeywords = [
      "tren superior", "entrenamiento superior", "modo superior", "superior", "hombros"
    ];
    const lowerKeywords = [
      "tren inferior", "entrenamiento inferior", "modo inferior", "inferior", "rodillas"
    ];
    const guidedKeywords = [
      "modo guiado", "guiado", "indicaciones"
    ];
    const expertKeywords = [
      "modo experto", "experto", "silencio"
    ];

    const matches = (keywords: string[]) => {
      return keywords.some(keyword => text.includes(keyword));
    };

    if (matches(saveKeywords)) {
      triggerSavePose();
      triggered = true;
    } else if (matches(resetKeywords)) {
      triggerResetPose();
      triggered = true;
    } else if (matches(guidedKeywords)) {
      setIsGuidedMode(true);
      speak("Modo guiado activado.");
      triggered = true;
    } else if (matches(expertKeywords)) {
      setIsGuidedMode(false);
      speak("Modo experto activado.");
      triggered = true;
    } else if (matches(upperKeywords)) {
      changeTrainingMode("superior");
      triggered = true;
    } else if (matches(lowerKeywords)) {
      changeTrainingMode("inferior");
      triggered = true;
    }

    if (triggered) {
      lastTriggerTimeRef.current = now;
    }
    return triggered;
  };

  const handleSpeechCommandRef = useRef(handleSpeechCommand);
  useEffect(() => {
    handleSpeechCommandRef.current = handleSpeechCommand;
  });

  // Bienvenida Guiada
  useEffect(() => {
    if (isGuidedModeRef.current) {
      speakRef.current(
        "Bienvenido a Kihon Online, tu dojo digital de postura. Colócate a dos metros de la cámara. Di 'Guardar' para registrar tu pose o selecciona un preset oficial."
      );
    }
  }, []);

  // Lógica de Reconocimiento de Voz
  useEffect(() => {
    const SpeechRecognitionClass = typeof window !== "undefined"
      ? ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)
      : undefined;

    if (!SpeechRecognitionClass) {
      console.warn("Reconocimiento de voz no soportado por este navegador.");
      return;
    }

    const rec = new SpeechRecognitionClass();
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 3;
    rec.lang = "es-MX";

    rec.onstart = () => {
      setIsListening(true);
      setMicPermissionError(false);
      errorCountRef.current = 0;
      lastErrorRef.current = "";
    };

    rec.onend = () => {
      if (recognitionActiveRef.current) {
        const now = Date.now();
        const lastErr = lastErrorRef.current;

        // Solo incrementamos contador de fallas rápidas ante errores reales (no silencios o stop intencional)
        if (lastErr && lastErr !== "no-speech" && lastErr !== "aborted") {
          if (now - lastErrorTimeRef.current < 1000) {
            errorCountRef.current += 1;
          } else {
            errorCountRef.current = 0;
          }
        }

        if (errorCountRef.current > 5) {
          console.warn("Demasiados errores seguidos en SpeechRecognition. Desactivando por seguridad.");
          recognitionActiveRef.current = false;
          setIsListening(false);
          return;
        }

        setTimeout(() => {
          if (recognitionActiveRef.current) {
            try {
              rec.start();
            } catch (e) {
              console.error("Error al reiniciar SpeechRecognition:", e);
            }
          }
        }, 300);
      } else {
        setIsListening(false);
      }
    };

    rec.onerror = (event: any) => {
      const err = event.error || "";
      lastErrorRef.current = err;
      lastErrorTimeRef.current = Date.now();
      
      // Usamos console.warn en lugar de console.error para no gatillar el overlay de Next.js
      // en avisos normales del ciclo de vida (no-speech o aborted).
      if (err === "aborted" || err === "no-speech") {
        console.warn(`SpeechRecognition notice: ${err}`);
      } else {
        console.error("SpeechRecognition error:", err);
      }
      
      if (err === "not-allowed" || err === "service-not-allowed") {
        setMicPermissionError(true);
        recognitionActiveRef.current = false;
        setIsListening(false);
      }
    };

    rec.onresult = (event: ISpeechRecognitionEvent) => {
      const lastIndex = event.results ? event.results.length - 1 : -1;
      const result = lastIndex >= 0 ? event.results[lastIndex] : null;
      if (!result) return;
      
      // Recorrer las alternativas de reconocimiento de forma segura
      const len = typeof result.length === "number" ? result.length : 0;
      for (let i = 0; i < len; i++) {
        const alt = result[i];
        if (alt && typeof alt.transcript === "string") {
          const text = alt.transcript.trim().toLowerCase();
          console.log(`Comando escuchado (alt ${i}):`, text);
          const matched = handleSpeechCommandRef.current(text);
          if (matched) {
            break; // Detener si alguna alternativa coincidió con un comando válido
          }
        }
      }
    };

    recognitionRef.current = rec;
    recognitionActiveRef.current = true;
    
    try {
      rec.start();
    } catch (e) {
      console.error("Error al iniciar SpeechRecognition:", e);
    }

    return () => {
      recognitionActiveRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, []);

  const getCorrectionText = (current: number, target: number, tol: number): string => {
    if (current < target - tol) return "Estirar más";
    if (current > target + tol) return "Doblar más";
    return "";
  };
  // Helper para dibujar esqueleto genérico
  function drawSkeleton(ctx: CanvasRenderingContext2D, lms: PoseLandmark[], w: number, h: number, color: string, thickness: number) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.lineCap = "round";
    ctx.shadowBlur = 8;
    ctx.shadowColor = "rgba(6, 182, 212, 0.8)"; // Neon cyan glow

    const drawLine = (idxA: number, idxB: number) => {
      const ptA = lms[idxA];
      const ptB = lms[idxB];
      if (ptA && ptB) {
        ctx.beginPath();
        ctx.moveTo((1 - ptA.x) * w, ptA.y * h);
        ctx.lineTo((1 - ptB.x) * w, ptB.y * h);
        ctx.stroke();
      }
    };

    // Tronco y Hombros
    drawLine(11, 12);
    drawLine(11, 23);
    drawLine(12, 24);
    drawLine(23, 24);

    // Brazos
    drawLine(11, 13);
    drawLine(13, 15);
    drawLine(12, 14);
    drawLine(14, 16);

    // Piernas
    drawLine(23, 25);
    drawLine(25, 27);
    drawLine(24, 26);
    drawLine(26, 28);

    // Dibujar puntos del esqueleto fantasma
    const drawGhostPoint = (idx: number) => {
      const pt = lms[idx];
      if (pt) {
        ctx.fillStyle = "rgba(6, 182, 212, 0.5)";
        ctx.shadowBlur = 0; // Sin sombra en los puntos fantasmas
        ctx.beginPath();
        ctx.arc((1 - pt.x) * w, pt.y * h, 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    };
    [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28].forEach(drawGhostPoint);

    ctx.restore();
  }

  // Helper para dibujar esqueleto con color dinámico en codos/rodillas
  function drawRealtimeSkeleton(
    ctx: CanvasRenderingContext2D,
    lms: PoseLandmark[],
    w: number,
    h: number,
    leftJointColor: string,
    rightJointColor: string,
    mode: "superior" | "inferior"
  ) {
    ctx.save();
    ctx.lineCap = "round";

    // Si el Kime está activo, hacemos vibrar visualmente el esqueleto
    const isKimeActive = Date.now() - kimeAlertActiveRef.current < 600;

    const getJointShake = () => {
      if (isKimeActive) {
        const progress = (Date.now() - kimeAlertActiveRef.current) / 600;
        const intensity = 10 * (1 - progress); // Sacudida momentánea limpia de hasta 10px
        return {
          x: (Math.random() - 0.5) * intensity,
          y: (Math.random() - 0.5) * intensity
        };
      }
      return { x: 0, y: 0 };
    };

    const drawJointLine = (idxA: number, idxB: number, color: string, thickness = 4) => {
      const ptA = lms[idxA];
      const ptB = lms[idxB];
      if (ptA && ptB) {
        ctx.save();
        
        const shakeA = getJointShake();
        const shakeB = getJointShake();

        const xA = (1 - ptA.x) * w + shakeA.x;
        const yA = ptA.y * h + shakeA.y;
        const xB = (1 - ptB.x) * w + shakeB.x;
        const yB = ptB.y * h + shakeB.y;

        if (isKimeActive) {
          const progress = (Date.now() - kimeAlertActiveRef.current) / 600;
          const decay = 1 - progress;
          
          // 1. Capa de brillo exterior de neón rojo carmesí puro y elegante
          ctx.save();
          ctx.strokeStyle = "rgba(229, 43, 52, 0.9)";
          ctx.lineWidth = thickness * 2.2 * decay;
          ctx.shadowBlur = 20 * decay;
          ctx.shadowColor = "rgba(229, 43, 52, 0.9)";
          ctx.beginPath();
          ctx.moveTo(xA, yA);
          ctx.lineTo(xB, yB);
          ctx.stroke();
          ctx.restore();

          // 2. Núcleo central blanco puro incandescente
          ctx.save();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
          ctx.lineWidth = thickness * 0.9;
          ctx.beginPath();
          ctx.moveTo(xA, yA);
          ctx.lineTo(xB, yB);
          ctx.stroke();
          ctx.restore();
        } else {
          ctx.strokeStyle = color;
          ctx.lineWidth = thickness;
          ctx.shadowBlur = color.includes("255, 255, 255") ? 2 : 12;
          ctx.shadowColor = color;
          ctx.beginPath();
          ctx.moveTo(xA, yA);
          ctx.lineTo(xB, yB);
          ctx.stroke();
        }
        ctx.restore();
      }
    };

    const drawPoint = (idx: number, color: string, radius = 6, outerRing = false) => {
      const pt = lms[idx];
      if (pt) {
        ctx.save();

        const shake = getJointShake();
        const px = (1 - pt.x) * w + shake.x;
        const py = pt.y * h + shake.y;

        if (isKimeActive) {
          const progress = (Date.now() - kimeAlertActiveRef.current) / 600;
          const decay = 1 - progress;
          const r = radius * 1.4;

          // Brillo exterior rojo carmesí
          ctx.fillStyle = "rgba(229, 43, 52, 0.95)";
          ctx.shadowBlur = 25 * decay;
          ctx.shadowColor = "rgba(229, 43, 52, 0.95)";
          ctx.beginPath();
          ctx.arc(px, py, r + 4 * decay, 0, 2 * Math.PI);
          ctx.fill();

          // Núcleo blanco
          ctx.fillStyle = "#ffffff";
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.arc(px, py, r - 1, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          let drawColor = color;
          let drawRadius = radius;

          ctx.shadowBlur = color.includes("255, 255, 255") ? 2 : 12;
          ctx.shadowColor = color;

          if (outerRing) {
            ctx.fillStyle = drawColor;
            ctx.beginPath();
            ctx.arc(px, py, drawRadius + 4, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.arc(px, py, drawRadius - 2, 0, 2 * Math.PI);
            ctx.fill();
          } else {
            ctx.fillStyle = drawColor;
            ctx.beginPath();
            ctx.arc(px, py, drawRadius, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
        ctx.restore();
      }
    };

    const grey = "rgba(255, 255, 255, 0.4)";

    // Tronco y cadera (Fijo en Gris neutro)
    drawJointLine(11, 12, grey, 3);
    drawJointLine(11, 23, grey, 3);
    drawJointLine(12, 24, grey, 3);
    drawJointLine(23, 24, grey, 3);

    // Brazos
    const lArmCol = mode === "superior" ? leftJointColor : grey;
    const rArmCol = mode === "superior" ? rightJointColor : grey;
    drawJointLine(11, 13, lArmCol, mode === "superior" ? 5 : 3);
    drawJointLine(13, 15, lArmCol, mode === "superior" ? 5 : 3);
    drawJointLine(12, 14, rArmCol, mode === "superior" ? 5 : 3);
    drawJointLine(14, 16, rArmCol, mode === "superior" ? 5 : 3);

    // Piernas
    const lLegCol = mode === "inferior" ? leftJointColor : grey;
    const rLegCol = mode === "inferior" ? rightJointColor : grey;
    drawJointLine(23, 25, lLegCol, mode === "inferior" ? 5 : 3);
    drawJointLine(25, 27, lLegCol, mode === "inferior" ? 5 : 3);
    drawJointLine(24, 26, rLegCol, mode === "inferior" ? 5 : 3);
    drawJointLine(26, 28, rLegCol, mode === "inferior" ? 5 : 3);

    // Dibujar puntos secundarios
    drawPoint(11, grey, 4); // Hombro I
    drawPoint(12, grey, 4); // Hombro D
    drawPoint(15, lArmCol, 5); // Muñeca I
    drawPoint(16, rArmCol, 5); // Muñeca D
    drawPoint(27, lLegCol, 5); // Tobillo I
    drawPoint(28, rLegCol, 5); // Tobillo D

    // Dibujar codos/rodillas destacados con anillo exterior y centro blanco si son los activos
    const isSup = mode === "superior";
    drawPoint(13, lArmCol, isSup ? 8 : 4, isSup); // Codo I
    drawPoint(14, rArmCol, isSup ? 8 : 4, isSup); // Codo D
    drawPoint(25, lLegCol, !isSup ? 8 : 4, !isSup); // Rodilla I
    drawPoint(26, rLegCol, !isSup ? 8 : 4, !isSup); // Rodilla D

    ctx.restore();
  }

  // Dibujo y Evaluación Biomecánica en el Canvas
  function handlePoseResults(results: { poseLandmarks?: PoseLandmark[]; image?: CanvasImageSource }) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);

    // Si el Kime está activo, hacemos vibrar toda la pantalla (cámara + vectores)
    const isKimeActive = Date.now() - kimeAlertActiveRef.current < 600;
    
    ctx.save(); // Salvar para el shake global de pantalla
    
    if (isKimeActive) {
      const progress = (Date.now() - kimeAlertActiveRef.current) / 600;
      const intensity = 8 * (1 - progress); // Sacudida sutil de pantalla de hasta 8px
      const shakeX = (Math.random() - 0.5) * intensity;
      const shakeY = (Math.random() - 0.5) * intensity;
      ctx.translate(shakeX, shakeY);
    }

    // 1. Dibujar cámara en Espejo (Eje X invertido)
    ctx.save();
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    if (results.image) {
      ctx.drawImage(results.image, 0, 0, width, height);
    }
    ctx.restore();

    const landmarks = results.poseLandmarks;
    if (!landmarks) {
      latestPoseLandmarksRef.current = null;
      ctx.restore(); // Restaurar el shake global de pantalla en caso de retorno temprano
      return;
    }

    // Guardar última pose en global para el comando de voz
    latestPoseLandmarksRef.current = landmarks;
    lastValidPoseLandmarksRef.current = { landmarks, timestamp: Date.now() };

    const mode = trainingModeRef.current;
    const currentAngles = calculateCurrentAngles(landmarks, mode);

    // Definir ángulos objetivo (guardado libre)
    let targetLeft: number | null = null;
    let targetRight: number | null = null;

    const savedAngles = savedPoseAnglesRef.current;
    if (savedAngles) {
      targetLeft = savedAngles.left;
      targetRight = savedAngles.right;
    }

    // Evaluación de alineación y color de las uniones
    let leftColor = "rgba(255, 0, 0, 0.8)"; // Red default
    let rightColor = "rgba(255, 0, 0, 0.8)";
    const tolerance = toleranceRef.current; // Tolerancia configurable

    const hasTarget = targetLeft !== null && targetRight !== null;
    let newScore = 0;

    if (hasTarget && targetLeft !== null && targetRight !== null) {
      const diffL = Math.abs(currentAngles.left - targetLeft);
      const diffR = Math.abs(currentAngles.right - targetRight);

      if (diffL <= tolerance) leftColor = "rgba(34, 197, 94, 0.85)"; // Green
      if (diffR <= tolerance) rightColor = "rgba(34, 197, 94, 0.85)";

      // Cálculo de score (porcentaje de coincidencia)
      const maxDiff = 60; // diferencia máxima penalizada
      const scoreL = Math.max(0, 100 - (diffL / maxDiff) * 100);
      const scoreR = Math.max(0, 100 - (diffR / maxDiff) * 100);
      newScore = Math.round((scoreL + scoreR) / 2);
      setAlignmentScore(newScore);

      // La alineación es correcta si ambas articulaciones están dentro de la tolerancia seleccionada
      const aligned = diffL <= tolerance && diffR <= tolerance;
      setIsAligned(aligned);

      // Feedback de audio al alinearse exitosamente (solo una vez por transición)
      if (aligned && !hasTriggeredAlignRef.current) {
        hasTriggeredAlignRef.current = true;
        speak("¡Alineación correcta!");
        // Sonido sutil si se soporta (beep)
        if (voiceEnabledRef.current) {
          try {
            const AudioContextClass = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
            const audioCtx = new AudioContextClass();
            const osc = audioCtx.createOscillator();
            osc.type = "sine";
            osc.frequency.setValueAtTime(880, audioCtx.currentTime); // Pitch agudo
            osc.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.15); // Duración corta
          } catch {}
        }
      } else if (newScore < 80) {
        // Reset del disparador para cuando caiga la alineación
        hasTriggeredAlignRef.current = false;
      }
    }

    // 2. Dibujar esqueleto fantasma de referencia (guardado libre)
    const refLms = savedPoseLandmarksRef.current;

    if (refLms) {
      // Normalizamos el esqueleto fantasma para que coincida con la escala y posición actual del usuario
      const normalizedLms: PoseLandmark[] = normalizeReferenceLandmarks(landmarks, refLms);
      drawSkeleton(ctx, normalizedLms, width, height, "rgba(6, 182, 212, 0.35)", 5); // Cyan semi-transparente
    }

    // 3. Dibujar esqueleto real-time
    drawRealtimeSkeleton(ctx, landmarks, width, height, leftColor, rightColor, mode);

    // 3.5. Dibujar Centro de Gravedad y Balance
    const ankleL = landmarks[27];
    const ankleR = landmarks[28];
    const shoulderL = landmarks[11];
    const shoulderR = landmarks[12];
    const hipL = landmarks[23];
    const hipR = landmarks[24];

    if (ankleL && ankleR && shoulderL && shoulderR && hipL && hipR) {
      const comX = (shoulderL.x + shoulderR.x + hipL.x + hipR.x) / 4;
      const torsoTopY = (shoulderL.y + shoulderR.y) / 2;
      const baseFloorY = (ankleL.y + ankleR.y) / 2;

      const drawComX = (1 - comX) * width;
      const drawTorsoTopY = torsoTopY * height;
      const drawFloorY = baseFloorY * height;
      const drawAnkleLX = (1 - ankleL.x) * width;
      const drawAnkleRX = (1 - ankleR.x) * width;

      const isStable = comX >= Math.min(ankleL.x, ankleR.x) && comX <= Math.max(ankleL.x, ankleR.x);
      const balanceColor = isStable ? "rgba(34, 197, 94, 0.8)" : "rgba(239, 68, 68, 0.9)";

      ctx.save();
      // Dibujar línea del Centro de Gravedad (plomada)
      ctx.strokeStyle = balanceColor;
      ctx.lineWidth = 3;
      ctx.setLineDash([4, 4]); // Línea discontinua
      ctx.shadowBlur = 8;
      ctx.shadowColor = balanceColor;
      ctx.beginPath();
      ctx.moveTo(drawComX, drawTorsoTopY);
      ctx.lineTo(drawComX, drawFloorY);
      ctx.stroke();

      // Dibujar base de sustentación entre pies
      ctx.setLineDash([]); // Línea sólida
      ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(drawAnkleLX, drawFloorY);
      ctx.lineTo(drawAnkleRX, drawFloorY);
      ctx.stroke();

      // Dibujar indicador en el suelo (punto del centro de gravedad)
      ctx.fillStyle = balanceColor;
      ctx.beginPath();
      ctx.arc(drawComX, drawFloorY, 5, 0, 2 * Math.PI);
      ctx.fill();

      if (!isStable) {
        ctx.fillStyle = "rgba(239, 68, 68, 0.95)";
        ctx.font = "bold 9px sans-serif";
        ctx.shadowBlur = 2;
        ctx.shadowColor = "#000000";
        ctx.fillText("DESEQUILIBRADO", drawComX + 8, drawFloorY - 8);
      }
      ctx.restore();
    }

    // 4. Dibujar textos de ángulos sobre las articulaciones (codos o rodillas)
    ctx.font = "bold 15px monospace";
    ctx.fillStyle = "#ffffff";
    ctx.shadowBlur = 4;
    ctx.shadowColor = "#000000";

    if (mode === "superior") {
      // Codo Izquierdo (Landmark 13)
      const lx = (1 - landmarks[13].x) * width;
      const ly = landmarks[13].y * height;
      ctx.fillStyle = leftColor;
      ctx.fillText(`${currentAngles.left}°`, lx + 12, ly + 5);
      if (targetLeft !== null) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fillText(`/${targetLeft}°`, lx + 12, ly + 20);

        const corr = getCorrectionText(currentAngles.left, targetLeft, tolerance);
        if (corr) {
          ctx.fillStyle = "rgba(239, 68, 68, 0.95)";
          ctx.font = "bold 11px sans-serif";
          ctx.fillText(corr, lx + 12, ly + 33);
          ctx.font = "bold 15px monospace";
        }
      }

      // Codo Derecho (Landmark 14)
      const rx = (1 - landmarks[14].x) * width;
      const ry = landmarks[14].y * height;
      ctx.fillStyle = rightColor;
      ctx.fillText(`${currentAngles.right}°`, rx - 45, ry + 5);
      if (targetRight !== null) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fillText(`/${targetRight}°`, rx - 45, ry + 20);

        const corr = getCorrectionText(currentAngles.right, targetRight, tolerance);
        if (corr) {
          ctx.fillStyle = "rgba(239, 68, 68, 0.95)";
          ctx.font = "bold 11px sans-serif";
          ctx.fillText(corr, rx - 90, ry + 33);
          ctx.font = "bold 15px monospace";
        }
      }
    } else {
      // Rodilla Izquierda (Landmark 25)
      const lx = (1 - landmarks[25].x) * width;
      const ly = landmarks[25].y * height;
      ctx.fillStyle = leftColor;
      ctx.fillText(`${currentAngles.left}°`, lx + 12, ly + 5);
      if (targetLeft !== null) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fillText(`/${targetLeft}°`, lx + 12, ly + 20);

        const corr = getCorrectionText(currentAngles.left, targetLeft, tolerance);
        if (corr) {
          ctx.fillStyle = "rgba(239, 68, 68, 0.95)";
          ctx.font = "bold 11px sans-serif";
          ctx.fillText(corr, lx + 12, ly + 33);
          ctx.font = "bold 15px monospace";
        }
      }

      // Rodilla Derecha (Landmark 26)
      const rx = (1 - landmarks[26].x) * width;
      const ry = landmarks[26].y * height;
      ctx.fillStyle = rightColor;
      ctx.fillText(`${currentAngles.right}°`, rx - 45, ry + 5);
      if (targetRight !== null) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fillText(`/${targetRight}°`, rx - 45, ry + 20);

        const corr = getCorrectionText(currentAngles.right, targetRight, tolerance);
        if (corr) {
          ctx.fillStyle = "rgba(239, 68, 68, 0.95)";
          ctx.font = "bold 11px sans-serif";
          ctx.fillText(corr, rx - 90, ry + 33);
          ctx.font = "bold 15px monospace";
        }
      }
    }

    // ===== Detección y Seguimiento de Velocidad / Kime =====
    const idxL = mode === "superior" ? 15 : 27;
    const idxR = mode === "superior" ? 16 : 28;
    const activeL = landmarks[idxL];
    const activeR = landmarks[idxR];

    if (activeL && activeR) {
      const history = motionHistoryRef.current;
      history.push({
        left: { x: activeL.x, y: activeL.y, z: activeL.z || 0 },
        right: { x: activeR.x, y: activeR.y, z: activeR.z || 0 },
        time: Date.now()
      });

      if (history.length > 8) {
        history.shift();
      }

      // Calcular velocidad
      if (history.length >= 4) {
        const prev = history[history.length - 4];
        const curr = history[history.length - 1];
        const dt = (curr.time - prev.time) / 1000; // segundos

        if (dt > 0) {
          const dlX = curr.left.x - prev.left.x;
          const dlY = curr.left.y - prev.left.y;
          // Ignoramos el eje Z porque MediaPipe tiene mucho ruido en la profundidad (eje Z),
          // lo que causa picos de velocidad falsos incluso si el usuario está quieto.
          const speedL = Math.sqrt(dlX * dlX + dlY * dlY) / dt;

          const drX = curr.right.x - prev.right.x;
          const drY = curr.right.y - prev.right.y;
          const speedR = Math.sqrt(drX * drX + drY * drY) / dt;

          const rawSpeed = Math.max(speedL, speedR);
          
          // Aplicamos un suavizado con filtro de promedio móvil exponencial (EMA) 
          // para eliminar ruidos bruscos de un solo fotograma (jitter).
          const smoothedSpeed = currentSpeedRef.current * 0.6 + rawSpeed * 0.4;
          currentSpeedRef.current = smoothedSpeed;

          // Detección de Kime (Explosividad)
          // Umbral de velocidad rápida y parada brusca en 2D (ajustado a 2.2 para ser más riguroso)
          if (smoothedSpeed > 2.2) {
            peakSpeedRef.current = Math.max(peakSpeedRef.current, smoothedSpeed);
          }

          if (peakSpeedRef.current > 2.2 && smoothedSpeed < 0.35) {
            // KIME detectado!
            kimeAlertActiveRef.current = Date.now();
            
            // Calculamos el poder del Kime basado en la velocidad pico alcanzada.
            // Una velocidad de 2.2 (mínima requerida) equivale al 50% de poder, y 3.8 o más al 100%.
            const calculatedPower = Math.round(
              Math.min(100, ((peakSpeedRef.current - 2.2) / 1.6) * 50 + 50)
            );
            lastKimePowerRef.current = calculatedPower;
            
            peakSpeedRef.current = 0; // Reset

            // Pitido agudo especial si voz activa
            if (voiceEnabledRef.current) {
              try {
                const AudioContextClass = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
                const audioCtx = new AudioContextClass();
                const osc = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(1400, audioCtx.currentTime); // Pitch muy agudo
                gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime); // Suave
                osc.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.12);
              } catch {}
            }
          }

          // Decaimiento del pico si la velocidad es baja
          if (smoothedSpeed < 0.4) {
            peakSpeedRef.current = Math.max(0, peakSpeedRef.current - 0.08);
          }
        }
      }
    }

    // ===== DIBUJAR HUD DE VELOCIDAD / KIME =====
    ctx.save();
    // 1. Barra de Velocidad
    const barW = 100;
    const barH = 5;
    const bx = (width - barW) / 2;
    const by = 12;

    // Fondo de barra
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.fillRect(bx, by, barW, barH);

    // Barra de velocidad actual (escalada de 3.5 a 3.0 por la eliminación de la componente Z)
    const valPercent = Math.min(100, (currentSpeedRef.current / 3.0) * 100);
    ctx.fillStyle = valPercent > 60 ? "rgba(229, 43, 52, 0.85)" : "rgba(6, 182, 212, 0.8)";
    ctx.fillRect(bx, by, (valPercent / 100) * barW, barH);

    // Etiqueta del medidor
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.font = "bold 8px sans-serif";
    ctx.fillText("VELOCIDAD", bx - 60, by + 5);

    // 2. Alerta de Kime activa
    if (Date.now() - kimeAlertActiveRef.current < 750) {
      ctx.fillStyle = "rgba(229, 43, 52, 0.95)";
      ctx.font = "bold 28px Impact, sans-serif";
      ctx.textAlign = "center";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "rgba(229, 43, 52, 0.9)";
      ctx.fillText("¡KIME!", width / 2, height / 2 - 40);
      
      // Mostrar el porcentaje de poder
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px monospace";
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#000000";
      ctx.fillText(`PODER: ${lastKimePowerRef.current}%`, width / 2, height / 2 - 15);
      
      ctx.textAlign = "left";
    }
    ctx.restore(); // Restore HUD save

    ctx.restore(); // Restore global shake save

    ctx.shadowBlur = 0; // Reset sombra
  }

  useEffect(() => {
    handlePoseResultsRef.current = handlePoseResults;
  });

  // Carga Dinámica de Scripts de MediaPipe desde CDN
  useEffect(() => {
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.body.appendChild(script);
      });
    };

    Promise.all([
      loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"),
      loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js")
    ])
      .then(() => {
        setScriptsLoaded(true);
      })
      .catch((err) => {
        console.error("Error cargando scripts de MediaPipe:", err);
        setCameraError(true);
      });
  }, []);

  // Inicialización de Cámara y MediaPipe Pose
  useEffect(() => {
    if (!scriptsLoaded) return;
    if (!videoRef.current || !canvasRef.current) return;

    const PoseClass = (window as unknown as { Pose: unknown }).Pose as new (config: { locateFile: (file: string) => string }) => {
      setOptions: (options: Record<string, unknown>) => void;
      onResults: (callback: (results: { poseLandmarks?: PoseLandmark[]; image?: CanvasImageSource }) => void) => void;
      send: (data: { image: HTMLVideoElement }) => Promise<void>;
      close: () => void;
    };
    const CameraClass = (window as unknown as { Camera: unknown }).Camera as new (video: HTMLVideoElement, config: { onFrame: () => Promise<void>; width: number; height: number }) => { start: () => Promise<void>; stop: () => void };

    if (!PoseClass || !CameraClass) return;

    const poseInstance = new PoseClass({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
    });

    poseInstance.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    poseInstance.onResults((results) => {
      if (handlePoseResultsRef.current) {
        handlePoseResultsRef.current(results);
      }
    });

    poseInstanceRef.current = poseInstance;

    const cameraInstance = new CameraClass(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          try {
            await poseInstance.send({ image: videoRef.current });
          } catch (e) {
            console.error("Error en procesamiento de cuadro de video:", e);
          }
        }
      },
      width: 640,
      height: 480
    });

    cameraInstance.start()
      .then(() => {
        setIsCameraActive(true);
      })
      .catch((err) => {
        console.error("Error al arrancar la cámara:", err);
        setCameraError(true);
      });

    cameraInstanceRef.current = cameraInstance;

    return () => {
      if (cameraInstanceRef.current) {
        try {
          (cameraInstanceRef.current as { stop: () => void }).stop();
        } catch {}
      }
      if (poseInstanceRef.current) {
        try {
          (poseInstanceRef.current as { close: () => void }).close();
        } catch {}
      }
    };
  }, [scriptsLoaded]);

  return (
    <section
      id="kihon-online"
      className="relative w-full min-h-screen bg-[var(--background)] overflow-x-hidden pt-[95px] sm:pt-[105px] lg:pt-[115px] pb-12 px-4 sm:px-8 lg:px-12 flex flex-col justify-start items-center"
    >
      {/* ===== Background Watermark Kanji ===== */}
      <div className="absolute left-6 top-[20%] text-[24vw] md:text-[14vw] font-black text-neutral-900/[0.015] select-none pointer-events-none z-0 font-serif">
        基本
      </div>

      <div className="absolute right-[-100px] bottom-[10%] w-[320px] h-[320px] bg-[#E52B34]/4 rounded-none blur-[80px] pointer-events-none z-0" />

      {/* Main Container - expanded to max-w-8xl to make use of screen space */}
      <div className="relative z-10 w-full max-w-8xl mx-auto flex flex-col items-center gap-6">
        
        {/* Header Bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-neutral-300/60 pb-5">
          <div className="flex items-center gap-4">
            <Link 
              href="/herramientas" 
              className="w-10 h-10 rounded-none border border-neutral-300 flex items-center justify-center bg-white text-neutral-800 hover:text-[#E52B34] hover:border-[#E52B34] transition-all shadow-sm cursor-pointer"
              title="Volver a Herramientas"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <span className="text-xs text-[#556358] tracking-widest font-title-serif block uppercase">HERRAMIENTA DIGITAL</span>
              <h2 className="font-impact-condensed text-2xl sm:text-3xl text-neutral-900 tracking-wide flex items-center gap-2 mt-0.5">
                KIHON ONLINE <span className="text-[#E52B34] text-lg select-none">{"//"}</span> Dojo de Posturas
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Voice Prompts Toggle Button */}
            <button
              onClick={() => {
                const val = !voiceEnabled;
                setVoiceEnabled(val);
                if (val) {
                  if (typeof window !== "undefined" && window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance("Indicaciones por voz activadas");
                    utterance.lang = "es-MX";
                    window.speechSynthesis.speak(utterance);
                  }
                }
              }}
              className={`h-10 px-3 border flex items-center gap-2 text-xs font-bold font-title-serif uppercase tracking-wider transition-all shadow-sm cursor-pointer ${
                voiceEnabled 
                  ? "bg-emerald-50 border-[#00875A] text-[#00875A] hover:bg-emerald-100" 
                  : "bg-neutral-50 border-neutral-300 text-neutral-500 hover:bg-neutral-100"
              }`}
              title={voiceEnabled ? "Desactivar indicaciones por voz" : "Activar indicaciones por voz"}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-neutral-400" />}
              <span>{voiceEnabled ? "Voz Activa" : "Voz Mutada"}</span>
            </button>

            {/* Voice Listening Status Toggle Button */}
            <button
              onClick={() => {
                if (isListening) {
                  stopSpeechRecognition();
                } else {
                  startSpeechRecognition();
                }
              }}
              className={`h-10 px-4 border flex items-center gap-3 text-xs font-bold font-title-serif uppercase tracking-wider transition-all shadow-sm cursor-pointer ${
                isListening 
                  ? "bg-emerald-50 border-[#00875A] text-[#00875A] hover:bg-emerald-100" 
                  : "bg-neutral-50 border-neutral-300 text-neutral-500 hover:bg-neutral-100"
              }`}
              title={isListening ? "Desactivar comandos de voz (micrófono)" : "Activar comandos de voz (micrófono)"}
            >
              <div className="relative flex h-3 w-3">
                {isListening && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-none h-3 w-3 ${isListening ? "bg-emerald-500" : "bg-neutral-400"}`}></span>
              </div>
              <span className="font-body text-xs font-semibold text-neutral-700">
                {isListening ? (
                  <span className="flex items-center gap-1.5"><Mic className="w-3.5 h-3.5 text-emerald-500" /> Escuchando voz</span>
                ) : (
                  <span className="flex items-center gap-1.5"><MicOff className="w-3.5 h-3.5 text-neutral-400" /> Micrófono inactivo</span>
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Error de Micrófono / Permiso */}
        {micPermissionError && (
          <div className="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-none flex items-center justify-between gap-4 font-body text-xs shadow-sm">
            <div className="flex items-center gap-2">
              <MicOff className="w-4 h-4 text-red-650 shrink-0" />
              <span>
                <strong>Permiso de micrófono denegado:</strong> Por favor, permite el acceso al micrófono en tu navegador (haz clic en el icono de cámara/micrófono de la barra de direcciones) y presiona el botón <strong>&quot;Micrófono inactivo&quot;</strong> para reintentar.
              </span>
            </div>
            <button 
              onClick={() => setMicPermissionError(false)} 
              className="text-red-500 hover:text-red-800 font-bold font-mono px-2 cursor-pointer"
            >
              X
            </button>
          </div>
        )}

        {/* main interactive viewport section - flex layout without fixed height */}
        <div className="w-full flex flex-col lg:flex-row gap-6 items-start justify-center mt-2">
          
          {/* Left Block: Camera Stream Canvas */}
          <div className="flex-1 w-full flex flex-col items-center bg-white/90 border border-[#8B6914]/25 rounded-none p-5 shadow-[4px_4px_0px_rgba(139,105,20,0.1)] relative">
            
            {/* HUD Overlay Indicators */}
            <div className="absolute top-8 left-8 z-20 flex flex-col gap-3 font-body">
              {/* Preset/Target Status Badge */}
              <div className="bg-neutral-900/85 backdrop-blur text-white text-xs px-3 py-2 rounded-none border border-neutral-800 shadow-[2px_2px_0px_rgba(0,0,0,0.2)] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#E52B34]" />
                <span>Objetivo: <strong className="text-[#E52B34] font-semibold">{savedPoseAngles ? "Replicar Postura Guardada" : "Guardar postura de referencia"}</strong></span>
              </div>
              
              {/* Last Voice Command Badge */}
              {lastHeardCommand && (
                <div className="bg-neutral-900/85 backdrop-blur text-white text-[11px] px-2.5 py-1.5 rounded-none border border-neutral-800 shadow-[2px_2px_0px_rgba(0,0,0,0.2)] flex items-center gap-1">
                  <span className="text-neutral-400 font-bold">Voz:</span>
                  <span className="italic text-emerald-400 font-medium">&quot;{lastHeardCommand}&quot;</span>
                </div>
              )}
            </div>

            {/* Score box (Only shown when there is an active target) */}
            {savedPoseAngles !== null && (
              <div className="absolute top-8 right-8 z-20 flex flex-col items-end gap-2 font-body">
                <div className="relative w-18 h-18 rounded-none bg-neutral-900/90 border border-neutral-800 backdrop-blur flex flex-col items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,0.25)] p-2">
                  <span className="text-[9px] text-neutral-400 uppercase font-title-serif tracking-wider leading-none">Precisión</span>
                  <span className={`text-xl font-bold font-mono tracking-tighter leading-none mt-2 ${isAligned ? "text-emerald-500 animate-pulse" : "text-white"}`}>
                    {alignmentScore}%
                  </span>
                </div>
                {isAligned && (
                  <span className="text-[9px] bg-emerald-600 text-white font-extrabold px-2 py-1 rounded-none shadow border border-emerald-500/30 tracking-widest uppercase">
                    ALINEADO
                  </span>
                )}
              </div>
            )}

            {/* Main Interactive Canvas */}
            <div className="w-full aspect-[4/3] max-h-[70vh] rounded-none overflow-hidden border border-neutral-300 shadow-inner bg-neutral-950 flex items-center justify-center relative">
              {!scriptsLoaded ? (
                <div className="text-center space-y-4 font-body text-neutral-400 p-8 flex flex-col items-center justify-center h-full">
                  <RefreshCw className="w-10 h-10 text-[#E52B34] animate-spin" />
                  <p className="text-sm font-light">Descargando librerías de visión artificial de Google MediaPipe...</p>
                </div>
              ) : cameraError ? (
                <div className="text-center space-y-4 font-body text-neutral-400 p-8 flex flex-col items-center justify-center h-full">
                  <Camera className="w-12 h-12 text-[#E52B34]" />
                  <p className="text-sm font-semibold text-neutral-200">Error de cámara o compatibilidad</p>
                  <p className="text-xs font-light max-w-sm">No pudimos arrancar tu webcam o cargar las dependencias necesarias. Asegúrate de conceder permisos de cámara y recargar la página.</p>
                </div>
              ) : !isCameraActive ? (
                <div className="text-center space-y-4 font-body text-neutral-400 p-8 flex flex-col items-center justify-center h-full font-light">
                  <Camera className="w-12 h-12 text-[#E52B34] animate-pulse" />
                  <p className="text-sm font-light">Iniciando cámara web. Por favor, concede los permisos en tu navegador...</p>
                </div>
              ) : null}

              {/* Hidden elements for processing */}
              <video
                ref={videoRef}
                className="hidden"
                width="640"
                height="480"
                playsInline
                muted
              />

              {/* Canvas viewport */}
              <canvas
                ref={canvasRef}
                className={`w-full h-full object-contain ${scriptsLoaded && isCameraActive ? "block" : "hidden"}`}
                width="640"
                height="480"
              />
            </div>

            {/* Quick Action Overlay bar under Canvas */}
            {scriptsLoaded && isCameraActive && (
              <div className="w-full flex flex-wrap gap-4 items-center justify-center mt-5">
                <button
                  onClick={triggerSavePose}
                  className="btn-kpl-primary text-xs px-5 py-3 rounded-none flex items-center gap-1.5 shadow-[2px_2px_0px_rgba(0,0,0,0.15)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" /> Guardar Postura (Voz: &quot;Guardar&quot;)
                </button>
                <button
                  onClick={triggerResetPose}
                  disabled={!savedPoseLandmarks}
                  className={`btn-kpl-secondary text-xs px-5 py-3 rounded-none flex items-center gap-1.5 shadow-[2px_2px_0px_rgba(0,0,0,0.15)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all ${!savedPoseLandmarks ? "opacity-35 cursor-not-allowed border-neutral-200 text-neutral-400 hover:bg-transparent" : "cursor-pointer"}`}
                >
                  <RefreshCw className="w-4 h-4" /> Limpiar Postura (Voz: &quot;Reiniciar&quot;)
                </button>
              </div>
            )}

            {/* Admin Save Pose Section */}
            {scriptsLoaded && isCameraActive && (session?.user as any)?.role === "admin" && (
              <div className="w-full mt-4 border border-dashed border-[#8B6914]/40 bg-neutral-50 p-4 flex flex-col sm:flex-row gap-3 items-center justify-center shadow-sm">
                <span className="text-xs font-bold font-title-serif uppercase tracking-wider text-neutral-700">Panel Admin:</span>
                <input
                  type="text"
                  placeholder="Nombre de la postura (ej. Zenkutsu Dachi)"
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  className="text-xs border border-neutral-300 px-3 py-2.5 rounded-none bg-white font-sans text-neutral-800 focus:border-[#E52B34] focus:outline-none w-full sm:w-64"
                />
                <button
                  onClick={async () => {
                    const lms = latestPoseLandmarksRef.current || (lastValidPoseLandmarksRef.current && Date.now() - lastValidPoseLandmarksRef.current.timestamp < 1500 ? lastValidPoseLandmarksRef.current.landmarks : null);
                    if (!lms) {
                      speak("Asegúrate de estar visible frente a la cámara antes de guardar.");
                      return;
                    }
                    if (!newPresetName.trim()) {
                      speak("Ingresa un nombre para la postura.");
                      return;
                    }
                    setIsSaving(true);
                    try {
                      const currentAngles = calculateCurrentAngles(lms, trainingModeRef.current);
                      const res = await fetch("/api/presets", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          name: newPresetName.trim(),
                          category: trainingModeRef.current,
                          angles: currentAngles,
                          landmarks: lms,
                        }),
                      });
                      const data = await res.json();
                      if (res.ok) {
                        setNewPresetName("");
                        speak("Postura guardada correctamente en el catálogo oficial.");
                        fetchPresets(); // Recargar catálogo
                      } else {
                        speak(data.error || "Error al guardar la postura.");
                      }
                    } catch (err) {
                      console.error("Error saving preset:", err);
                      speak("Error de conexión.");
                    } finally {
                      setIsSaving(false);
                    }
                  }}
                  disabled={isSaving}
                  className="btn-kpl-primary text-xs px-4 py-2.5 rounded-none cursor-pointer disabled:opacity-50 w-full sm:w-auto flex items-center justify-center font-bold"
                >
                  {isSaving ? "Guardando..." : "Subir a Catálogo BD"}
                </button>
              </div>
            )}
          </div>

          {/* Right Block: Controls & Guides Panel */}
          <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0 bg-white/90 border border-[#8B6914]/25 rounded-none p-5 shadow-[4px_4px_0px_rgba(139,105,20,0.1)] flex flex-col gap-5 relative overflow-hidden">
            
            {/* Top red bar accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#E52B34]" />

            <div className="flex flex-col gap-5">
              {/* Block 1: Segment Selector */}
              <div>
                <label className="block text-xs font-title-serif text-[#556358] uppercase tracking-wider mb-2 font-bold">
                  Segmento Corporal
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => changeTrainingMode("superior")}
                    className={`text-xs font-sans-condensed uppercase tracking-wider py-2.5 rounded-none border font-bold transition-all shadow-sm cursor-pointer ${trainingMode === "superior" ? "bg-[#E52B34] text-white border-[#E52B34] shadow-[inset_0_-2px_0_rgba(0,0,0,0.2)]" : "bg-white border-neutral-300 text-neutral-800 hover:border-[#E52B34]/50"}`}
                  >
                    Tren Superior
                  </button>
                  <button
                    onClick={() => changeTrainingMode("inferior")}
                    className={`text-xs font-sans-condensed uppercase tracking-wider py-2.5 rounded-none border font-bold transition-all shadow-sm cursor-pointer ${trainingMode === "inferior" ? "bg-[#E52B34] text-white border-[#E52B34] shadow-[inset_0_-2px_0_rgba(0,0,0,0.2)]" : "bg-white border-neutral-300 text-neutral-800 hover:border-[#E52B34]/50"}`}
                  >
                    Tren Inferior
                  </button>
                </div>
              </div>

              {/* Catálogo de Posturas oficiales en la base de datos */}
              <div className="border-t border-neutral-200 pt-4">
                <label className="block text-xs font-title-serif text-[#556358] uppercase tracking-wider mb-2 font-bold flex items-center justify-between">
                  <span>Catálogo de Posturas BD</span>
                  {presets.length > 0 && <span className="text-neutral-400 font-mono text-[10px]">{presets.length} posturas</span>}
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedPresetId}
                    onChange={(e) => {
                      const id = e.target.value;
                      setSelectedPresetId(id);
                      if (id === "") {
                        triggerResetPose();
                      } else {
                        const preset = presets.find((p) => p._id === id);
                        if (preset) {
                          // Cambiar segmento corporal si es diferente
                          if (preset.category !== trainingMode) {
                            changeTrainingMode(preset.category);
                          }
                          // Cargar landmarks y ángulos
                          setSavedPoseLandmarks(preset.landmarks);
                          setSavedPoseAngles(preset.angles);
                          hasTriggeredAlignRef.current = false;
                          speak(`Postura ${preset.name} cargada de la base de datos.`);
                        }
                      }
                    }}
                    className="flex-1 text-xs border border-neutral-300 px-2.5 py-2.5 rounded-none bg-white font-sans text-neutral-800 focus:border-[#E52B34] focus:outline-none cursor-pointer"
                  >
                    <option value="">-- Replicar Postura Libre --</option>
                    {presets.map((preset) => (
                      <option key={preset._id} value={preset._id}>
                        {preset.name} ({preset.category === "superior" ? "Tren Superior" : "Tren Inferior"})
                      </option>
                    ))}
                  </select>
                  {selectedPresetId && (
                    <button
                      onClick={() => {
                        setSelectedPresetId("");
                        triggerResetPose();
                      }}
                      className="px-2.5 border border-neutral-300 hover:border-[#E52B34] hover:text-[#E52B34] transition-all bg-white text-neutral-600 rounded-none cursor-pointer flex items-center justify-center"
                      title="Dejar de replicar"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  )}
                  {selectedPresetId && (session?.user as any)?.role === "admin" && (
                    <button
                      onClick={async () => {
                        if (confirm("¿Estás seguro de que deseas eliminar esta postura del catálogo oficial de la BD?")) {
                          try {
                            const res = await fetch(`/api/presets?presetId=${selectedPresetId}`, {
                              method: "DELETE",
                            });
                            const data = await res.json();
                            if (res.ok) {
                              setSelectedPresetId("");
                              triggerResetPose();
                              speak("Postura eliminada correctamente.");
                              fetchPresets();
                            } else {
                              speak(data.error || "Error al eliminar.");
                            }
                          } catch (err) {
                            console.error("Error deleting preset:", err);
                            speak("Error de conexión.");
                          }
                        }
                      }}
                      className="px-2.5 border border-red-300 hover:border-red-600 hover:bg-red-50 text-red-600 rounded-none cursor-pointer flex items-center justify-center"
                      title="Eliminar postura de la base de datos"
                    >
                      <span className="text-xs font-bold font-mono">X</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Explicación de Funcionamiento */}
              <div className="border border-neutral-200 bg-neutral-50 p-4 rounded-none text-xs font-body text-neutral-600 leading-relaxed shadow-sm">
                <span className="font-bold text-[#E52B34] font-title-serif block uppercase tracking-wider text-[10px] mb-1.5 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#E52B34]" /> CÓMO ENTRENAR
                </span>
                1. Posiciónate frente a la cámara.<br/>
                2. Adopta tu posición de Karate y haz clic en **Guardar Postura** (o di &quot;Guardar&quot;).<br/>
                3. Una silueta cian aparecerá sobre ti.<br/>
                4. Intenta replicarla. El esqueleto se pintará de verde cuando coincidas.
              </div>

              {/* Block 3: Mode Options */}
              <div className="border-t border-neutral-200 pt-5">
                <label className="block text-xs font-title-serif text-[#556358] uppercase tracking-wider mb-3 font-bold">
                  Configuración de Pantalla
                </label>
                
                <div className="space-y-3 font-body text-sm">
                  {/* Guided vs Expert switch */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-neutral-850 block text-xs">Modo Guiado Activo</span>
                      <span className="text-[10px] text-neutral-500 font-light block leading-none mt-1">Muestra ayudas visuales e instrucciones.</span>
                    </div>
                    <button
                      onClick={() => {
                        const val = !isGuidedMode;
                        setIsGuidedMode(val);
                        speak(val ? "Modo guiado activado." : "Modo experto activado.");
                      }}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-none border transition-colors duration-200 ease-in-out focus:outline-none ${isGuidedMode ? "bg-[#00875A] border-[#00875A]" : "bg-neutral-200 border-neutral-300"}`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-none bg-white shadow transition duration-200 ease-in-out ${isGuidedMode ? "translate-x-5" : "translate-x-0"}`}
                      />
                    </button>
                  </div>

                  {/* Voice Prompts Switch */}
                  <div className="flex items-center justify-between border-t border-neutral-100 pt-3 mt-3">
                    <div>
                      <span className="font-semibold text-neutral-850 block text-xs">Indicaciones por Voz</span>
                      <span className="text-[10px] text-neutral-500 font-light block leading-none mt-1">El dojo te guiará con voz artificial.</span>
                    </div>
                    <button
                      onClick={() => {
                        const val = !voiceEnabled;
                        setVoiceEnabled(val);
                        if (val) {
                          if (typeof window !== "undefined" && window.speechSynthesis) {
                            window.speechSynthesis.cancel();
                            const utterance = new SpeechSynthesisUtterance("Indicaciones por voz activadas");
                            utterance.lang = "es-MX";
                            window.speechSynthesis.speak(utterance);
                          }
                        }
                      }}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-none border transition-colors duration-200 ease-in-out focus:outline-none ${voiceEnabled ? "bg-[#00875A] border-[#00875A]" : "bg-neutral-200 border-neutral-300"}`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-none bg-white shadow transition duration-200 ease-in-out ${voiceEnabled ? "translate-x-5" : "translate-x-0"}`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Block 3.5: Match Tolerance Slider */}
              <div className="border-t border-neutral-200 pt-5">
                <label className="block text-xs font-title-serif text-[#556358] uppercase tracking-wider mb-2.5 font-bold flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 text-[#E52B34]" /> Tolerancia de Postura</span>
                  <span className="text-[#E52B34] font-mono font-bold text-xs">{tolerance}°</span>
                </label>
                <div className="space-y-2.5 font-body">
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={tolerance}
                    onChange={(e) => setTolerance(Number(e.target.value))}
                    className="w-full h-1 bg-neutral-200 rounded-none appearance-none cursor-pointer accent-[#E52B34]"
                  />
                  <div className="flex justify-between text-[9px] text-neutral-500 font-bold leading-none">
                    <span>Estricto (5°)</span>
                    <span className="text-[#E52B34] tracking-wider uppercase font-semibold">
                      {tolerance <= 9 ? "Muy Estricto" : tolerance <= 15 ? "Normal" : tolerance <= 22 ? "Permisivo" : "Fácil"}
                    </span>
                    <span>Fácil (30°)</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-light block leading-relaxed mt-1">
                    Establece el margen de error angular permitido para validar la postura de tus articulaciones.
                  </span>
                </div>
              </div>

              {/* Block 4: Voice Commands Cheatsheet (Replacing the top giant alert box) */}
              {isGuidedMode && (
                <div className="border-t border-neutral-200 pt-5 flex flex-col gap-3">
                  <label className="block text-xs font-title-serif text-[#556358] uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-[#E52B34]" /> Comandos de Voz
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-body">
                    <div className="bg-[#1A1A1E] border border-neutral-800 p-2 rounded-none text-white">
                      <span className="block font-extrabold text-[#E52B34]">&quot;Guardar&quot;</span>
                      <span className="text-neutral-400 font-light leading-tight">Fija postura.</span>
                    </div>
                    <div className="bg-[#1A1A1E] border border-neutral-800 p-2 rounded-none text-white">
                      <span className="block font-extrabold text-[#E52B34]">&quot;Reiniciar&quot;</span>
                      <span className="text-neutral-400 font-light leading-tight">Limpia.</span>
                    </div>
                    <div className="bg-[#1A1A1E] border border-neutral-800 p-2 rounded-none text-white">
                      <span className="block font-extrabold text-[#E52B34]">&quot;Guiado&quot; / &quot;Experto&quot;</span>
                      <span className="text-neutral-400 font-light leading-tight">Alterna HUD.</span>
                    </div>
                    <div className="bg-[#1A1A1E] border border-neutral-800 p-2 rounded-none text-white">
                      <span className="block font-extrabold text-[#E52B34]">&quot;Superior&quot; / &quot;Inferior&quot;</span>
                      <span className="text-neutral-400 font-light leading-tight">Cambia tren.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Section: Sensei Quote */}
              <div className="border border-neutral-200 bg-neutral-50/50 p-4 rounded-none text-xs text-neutral-600 font-light leading-relaxed italic mt-2 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05)]">
                <span className="font-bold text-[#E52B34] font-title-serif not-italic block uppercase tracking-wider text-[10px] mb-1.5">CONSEJO SENSEI</span>
                &quot;En karate, no importa qué tan fuerte golpees o qué tan rápido te muevas; si tus posiciones de soporte carecen de balance y ángulos correctos, tu energía se disipará al hacer contacto.&quot;
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
