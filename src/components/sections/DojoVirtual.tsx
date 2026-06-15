"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  Users, 
  Lock, 
  ShieldAlert, 
  CheckCircle, 
  HelpCircle, 
  Play, 
  ArrowRight, 
  RefreshCw, 
  AlertCircle, 
  Save, 
  Sliders,
  ChevronRight,
  Eye,
  LogOut,
  SlidersHorizontal
} from "lucide-react";

interface PoseLandmark {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
}

interface PosePreset {
  _id: string;
  name: string;
  category: "superior" | "inferior";
  angles: { left: number; right: number };
  landmarks: PoseLandmark[];
}

export default function DojoVirtual() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // URL Room Code Check
  const urlCode = searchParams.get("code")?.toUpperCase() || "";

  // Core Connection States
  const [roomCode, setRoomCode] = useState<string>(urlCode);
  const [role, setRole] = useState<"student" | "sensei" | null>(null);
  const [roomInfo, setRoomInfo] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string>("");

  // Student Inputs
  const [studentInputCode, setStudentInputCode] = useState("");
  const [studentInputName, setStudentInputName] = useState("");

  // Sensei Inputs
  const [targetStudentName, setTargetStudentName] = useState("");

  // Sync / Active Data
  const [studentPoseData, setStudentPoseData] = useState<any>(null);
  const [presets, setPresets] = useState<PosePreset[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>("");
  const [guidedMode, setGuidedMode] = useState(true);
  const [tolerance, setTolerance] = useState(15);
  const [newPoseName, setNewPoseName] = useState("");
  const [isSavingPose, setIsSavingPose] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState("");

  // Refs for tracking student alignment triggers (TTS audio beep)
  const hasTriggeredAlignRef = useRef(false);
  const isGuidedModeRef = useRef(guidedMode);
  
  // Student Camera & Pose Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const poseInstanceRef = useRef<any>(null);
  const cameraInstanceRef = useRef<any>(null);
  const latestPoseLandmarksRef = useRef<PoseLandmark[] | null>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  // Active sync presets for Student
  const currentPresetRef = useRef<PosePreset | null>(null);

  // Load presets list (Sensei only)
  useEffect(() => {
    if (role === "sensei") {
      fetch("/api/presets")
        .then((res) => res.json())
        .then((data) => {
          if (data.presets) setPresets(data.presets);
        })
        .catch((err) => console.error("Error loading presets:", err));
    }
  }, [role]);

  // Handle URL Code changes
  useEffect(() => {
    if (urlCode && !role) {
      // Auto fill or trigger connection
      setStudentInputCode(urlCode);
    }
  }, [urlCode, role]);

  // TTS Voice helper
  const speak = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-MX";
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const speakRef = useRef(speak);
  useEffect(() => {
    speakRef.current = speak;
  });

  // Handle room creation (Sensei)
  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    setConnectionError("");

    try {
      const res = await fetch("/api/dojo/room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentName: targetStudentName || "Alumno" })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al crear la sala");

      setRoomCode(data.roomCode);
      setRoomInfo(data);
      setRole("sensei");
      router.push(`/herramientas/dojo-virtual?code=${data.roomCode}`);
    } catch (err: any) {
      setConnectionError(err.message || "Error al conectar");
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle room joining (Student)
  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentInputCode) return;

    setIsConnecting(true);
    setConnectionError("");

    try {
      const res = await fetch(`/api/dojo/room?code=${studentInputCode.trim()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Código de sala no válido");

      setRoomCode(data.roomCode);
      setRoomInfo(data);
      setRole("student");
      
      // Save student custom name if given
      if (studentInputName) {
        setRoomInfo((prev: any) => ({ ...prev, studentName: studentInputName }));
      }
      
      router.push(`/herramientas/dojo-virtual?code=${data.roomCode}`);
      speak("Conectado al dojo virtual. Esperando instrucciones de tu Sensei.");
    } catch (err: any) {
      setConnectionError(err.message || "Error al conectar");
    } finally {
      setIsConnecting(false);
    }
  };

  // Load MediaPipe scripts dynamically (Student only)
  useEffect(() => {
    if (role !== "student") return;

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
        setConnectionError("No se pudieron cargar las librerías de visión artificial.");
      });
  }, [role]);

  // Calculations (reused from KihonOnline.tsx)
  const calculateAngle = (ptA: PoseLandmark, ptB: PoseLandmark, ptC: PoseLandmark) => {
    if (!ptA || !ptB || !ptC) return 0;
    const vecAB = { x: ptA.x - ptB.x, y: ptA.y - ptB.y, z: (ptA.z || 0) - (ptB.z || 0) };
    const vecCB = { x: ptC.x - ptB.x, y: ptC.y - ptB.y, z: (ptC.z || 0) - (ptB.z || 0) };

    const dot = vecAB.x * vecCB.x + vecAB.y * vecCB.y + vecAB.z * vecCB.z;
    const lenA = Math.sqrt(vecAB.x * vecAB.x + vecAB.y * vecAB.y + vecAB.z * vecAB.z);
    const lenC = Math.sqrt(vecCB.x * vecCB.x + vecCB.y * vecCB.y + vecCB.z * vecCB.z);

    if (lenA === 0 || lenC === 0) return 0;

    const cosTheta = Math.min(1, Math.max(-1, dot / (lenA * lenC)));
    const angle = Math.acos(cosTheta) * (180.0 / Math.PI);
    return Math.round(angle);
  };

  const calculateCurrentAngles = (landmarks: PoseLandmark[], mode: "superior" | "inferior") => {
    if (mode === "superior") {
      const leftElbow = calculateAngle(landmarks[11], landmarks[13], landmarks[15]);
      const rightElbow = calculateAngle(landmarks[12], landmarks[14], landmarks[16]);
      return { left: leftElbow, right: rightElbow };
    } else {
      const leftKnee = calculateAngle(landmarks[23], landmarks[25], landmarks[27]);
      const rightKnee = calculateAngle(landmarks[24], landmarks[26], landmarks[28]);
      return { left: leftKnee, right: rightKnee };
    }
  };

  const normalizeReferenceLandmarks = (current: PoseLandmark[], reference: PoseLandmark[]): PoseLandmark[] => {
    if (!current || !reference || current.length < 33 || reference.length < 33) return reference;

    const curHLeft = current[11];
    const curHRight = current[12];
    const refHLeft = reference[11];
    const refHRight = reference[12];

    if (!curHLeft || !curHRight || !refHLeft || !refHRight) return reference;

    const curCenter = { x: (curHLeft.x + curHRight.x) / 2, y: (curHLeft.y + curHRight.y) / 2 };
    const refCenter = { x: (refHLeft.x + refHRight.x) / 2, y: (refHLeft.y + refHRight.y) / 2 };

    const curWidth = Math.sqrt(Math.pow(curHLeft.x - curHRight.x, 2) + Math.pow(curHLeft.y - curHRight.y, 2));
    const refWidth = Math.sqrt(Math.pow(refHLeft.x - refHRight.x, 2) + Math.pow(refHLeft.y - refHRight.y, 2));

    const scale = curWidth / (refWidth || 1);

    return reference.map((pt) => {
      if (!pt) return pt;
      const dx = pt.x - refCenter.x;
      const dy = pt.y - refCenter.y;
      return {
        ...pt,
        x: curCenter.x + dx * scale,
        y: curCenter.y + dy * scale,
        z: pt.z ? pt.z * scale : undefined
      };
    });
  };

  // Helper Drawing functions (reused from KihonOnline.tsx)
  const drawGhostSkeleton = (ctx: CanvasRenderingContext2D, lms: PoseLandmark[], w: number, h: number, color: string, thickness: number) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.lineCap = "round";
    ctx.shadowBlur = 8;
    ctx.shadowColor = "rgba(6, 182, 212, 0.8)"; 

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

    // Body connections
    drawLine(11, 12);
    drawLine(11, 23);
    drawLine(12, 24);
    drawLine(23, 24);

    // Arms
    drawLine(11, 13);
    drawLine(13, 15);
    drawLine(12, 14);
    drawLine(14, 16);

    // Legs
    drawLine(23, 25);
    drawLine(25, 27);
    drawLine(24, 26);
    drawLine(26, 28);

    const drawGhostPoint = (idx: number) => {
      const pt = lms[idx];
      if (pt) {
        ctx.fillStyle = "rgba(6, 182, 212, 0.5)";
        ctx.beginPath();
        ctx.arc((1 - pt.x) * w, pt.y * h, 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    };
    [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28].forEach(drawGhostPoint);
    ctx.restore();
  };

  const drawActiveSkeleton = (
    ctx: CanvasRenderingContext2D,
    lms: PoseLandmark[],
    w: number,
    h: number,
    leftJointColor: string,
    rightJointColor: string,
    mode: "superior" | "inferior"
  ) => {
    ctx.save();
    ctx.lineCap = "round";

    const drawJointLine = (idxA: number, idxB: number, color: string, thickness = 4) => {
      const ptA = lms[idxA];
      const ptB = lms[idxB];
      if (ptA && ptB) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness;
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        ctx.beginPath();
        ctx.moveTo((1 - ptA.x) * w, ptA.y * h);
        ctx.lineTo((1 - ptB.x) * w, ptB.y * h);
        ctx.stroke();
        ctx.restore();
      }
    };

    const drawPoint = (idx: number, color: string, radius = 6, outerRing = false) => {
      const pt = lms[idx];
      if (pt) {
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;

        if (outerRing) {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc((1 - pt.x) * w, pt.y * h, radius + 4, 0, 2 * Math.PI);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.arc((1 - pt.x) * w, pt.y * h, radius, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc((1 - pt.x) * w, pt.y * h, radius, 0, 2 * Math.PI);
          ctx.fill();
        }
        ctx.restore();
      }
    };

    // Tronco y hombros
    drawJointLine(11, 12, "rgba(255, 255, 255, 0.85)", 3);
    drawJointLine(11, 23, "rgba(255, 255, 255, 0.8)", 3);
    drawJointLine(12, 24, "rgba(255, 255, 255, 0.8)", 3);
    drawJointLine(23, 24, "rgba(255, 255, 255, 0.85)", 3);

    if (mode === "superior") {
      // Brazos color dinámico
      drawJointLine(11, 13, leftJointColor, 4);
      drawJointLine(13, 15, leftJointColor, 4);
      drawJointLine(12, 14, rightJointColor, 4);
      drawJointLine(14, 16, rightJointColor, 4);

      // Piernas blancas estáticas
      drawJointLine(23, 25, "rgba(255, 255, 255, 0.6)", 3);
      drawJointLine(25, 27, "rgba(255, 255, 255, 0.6)", 3);
      drawJointLine(24, 26, "rgba(255, 255, 255, 0.6)", 3);
      drawJointLine(26, 28, "rgba(255, 255, 255, 0.6)", 3);
      
      // Resaltar codos
      drawPoint(13, leftJointColor, 7, true);
      drawPoint(14, rightJointColor, 7, true);
    } else {
      // Brazos blancos estáticos
      drawJointLine(11, 13, "rgba(255, 255, 255, 0.6)", 3);
      drawJointLine(13, 15, "rgba(255, 255, 255, 0.6)", 3);
      drawJointLine(12, 14, "rgba(255, 255, 255, 0.6)", 3);
      drawJointLine(14, 16, "rgba(255, 255, 255, 0.6)", 3);

      // Piernas color dinámico
      drawJointLine(23, 25, leftJointColor, 4);
      drawJointLine(25, 27, leftJointColor, 4);
      drawJointLine(24, 26, rightJointColor, 4);
      drawJointLine(26, 28, rightJointColor, 4);
      
      // Resaltar rodillas
      drawPoint(25, leftJointColor, 7, true);
      drawPoint(26, rightJointColor, 7, true);
    }

    // Dibujar el resto de articulaciones con puntos blancos
    [11, 12, 15, 16, 23, 24, 27, 28].forEach((idx) => drawPoint(idx, "rgba(255, 255, 255, 0.8)", 4));
    
    ctx.restore();
  };

  // Draw Center of Gravity (COG)
  const drawCenterOfGravity = (ctx: CanvasRenderingContext2D, lms: PoseLandmark[], w: number, h: number) => {
    const ankleL = lms[27];
    const ankleR = lms[28];
    const shoulderL = lms[11];
    const shoulderR = lms[12];
    const hipL = lms[23];
    const hipR = lms[24];

    if (ankleL && ankleR && shoulderL && shoulderR && hipL && hipR) {
      const comX = (shoulderL.x + shoulderR.x + hipL.x + hipR.x) / 4;
      const torsoTopY = (shoulderL.y + shoulderR.y) / 2;
      const baseFloorY = (ankleL.y + ankleR.y) / 2;

      const drawComX = (1 - comX) * w;
      const drawTorsoTopY = torsoTopY * h;
      const drawFloorY = baseFloorY * h;
      const drawAnkleLX = (1 - ankleL.x) * w;
      const drawAnkleRX = (1 - ankleR.x) * w;

      const isStable = comX >= Math.min(ankleL.x, ankleR.x) && comX <= Math.max(ankleL.x, ankleR.x);
      const balanceColor = isStable ? "rgba(34, 197, 94, 0.85)" : "rgba(239, 68, 68, 0.9)";

      ctx.save();
      // Draw COG Plumb Line
      ctx.strokeStyle = balanceColor;
      ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 4]); 
      ctx.shadowBlur = 8;
      ctx.shadowColor = balanceColor;
      ctx.beginPath();
      ctx.moveTo(drawComX, drawTorsoTopY);
      ctx.lineTo(drawComX, drawFloorY);
      ctx.stroke();

      // Draw Base of Support
      ctx.setLineDash([]); 
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(drawAnkleLX, drawFloorY);
      ctx.lineTo(drawAnkleRX, drawFloorY);
      ctx.stroke();

      // Draw indicator dot on the floor
      ctx.fillStyle = balanceColor;
      ctx.beginPath();
      ctx.arc(drawComX, drawFloorY, 5, 0, 2 * Math.PI);
      ctx.fill();

      if (!isStable) {
        ctx.fillStyle = "rgba(239, 68, 68, 0.95)";
        ctx.font = "bold 9px monospace";
        ctx.shadowBlur = 2;
        ctx.shadowColor = "#000000";
        ctx.fillText("DESEQUILIBRADO", drawComX + 8, drawFloorY - 8);
      }
      ctx.restore();
    }
  };

  // Draw texts for angles
  const drawAnglesOnSkeleton = (ctx: CanvasRenderingContext2D, lms: PoseLandmark[], w: number, h: number, currentAngles: any, mode: string) => {
    ctx.font = "bold 13px monospace";
    ctx.fillStyle = "#ffffff";
    ctx.shadowBlur = 4;
    ctx.shadowColor = "#000000";

    if (mode === "superior") {
      const elbowL = lms[13];
      const elbowR = lms[14];
      if (elbowL) ctx.fillText(`${currentAngles.left}°`, (1 - elbowL.x) * w + 10, elbowL.y * h);
      if (elbowR) ctx.fillText(`${currentAngles.right}°`, (1 - elbowR.x) * w - 35, elbowR.y * h);
    } else {
      const kneeL = lms[25];
      const kneeR = lms[26];
      if (kneeL) ctx.fillText(`${currentAngles.left}°`, (1 - kneeL.x) * w + 10, kneeL.y * h);
      if (kneeR) ctx.fillText(`${currentAngles.right}°`, (1 - kneeR.x) * w - 35, kneeR.y * h);
    }
  };

  // Student Main Pose Handling
  const handlePoseResults = (results: any) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Draw video frame
    ctx.save();
    ctx.clearRect(0, 0, width, height);

    if (results.image) {
      // Mirror camera
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(results.image, 0, 0, width, height);
      ctx.restore();
    }

    const landmarks = results.poseLandmarks;
    if (!landmarks) {
      latestPoseLandmarksRef.current = null;
      return;
    }

    latestPoseLandmarksRef.current = landmarks;

    // Read current mode from preset or fallback to superior
    const mode = currentPresetRef.current?.category || "superior";
    const currentAngles = calculateCurrentAngles(landmarks, mode);

    // Setup Target Alignment variables
    let targetLeft: number | null = null;
    let targetRight: number | null = null;

    if (currentPresetRef.current) {
      targetLeft = currentPresetRef.current.angles.left;
      targetRight = currentPresetRef.current.angles.right;
    }

    let leftColor = "rgba(255, 0, 0, 0.8)"; // Red default
    let rightColor = "rgba(255, 0, 0, 0.8)";
    const tol = tolerance; 
    let score = 0;
    let aligned = false;

    if (targetLeft !== null && targetRight !== null) {
      const diffL = Math.abs(currentAngles.left - targetLeft);
      const diffR = Math.abs(currentAngles.right - targetRight);

      if (diffL <= tol) leftColor = "rgba(34, 197, 94, 0.85)"; // Green
      if (diffR <= tol) rightColor = "rgba(34, 197, 94, 0.85)";

      const maxDiff = 60;
      const scoreL = Math.max(0, 100 - (diffL / maxDiff) * 100);
      const scoreR = Math.max(0, 100 - (diffR / maxDiff) * 100);
      score = Math.round((scoreL + scoreR) / 2);

      aligned = diffL <= tol && diffR <= tol;

      // Audio trigger
      if (aligned && !hasTriggeredAlignRef.current) {
        hasTriggeredAlignRef.current = true;
        speak("¡Alineación correcta!");
        try {
          const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
          const audioCtx = new AudioContextClass();
          const osc = audioCtx.createOscillator();
          osc.type = "sine";
          osc.frequency.setValueAtTime(880, audioCtx.currentTime); 
          osc.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.15); 
        } catch {}
      } else if (score < 80) {
        hasTriggeredAlignRef.current = false;
      }
    }

    // 1. Draw reference ghost silhouette
    if (currentPresetRef.current) {
      const normalizedLms = normalizeReferenceLandmarks(landmarks, currentPresetRef.current.landmarks);
      drawGhostSkeleton(ctx, normalizedLms, width, height, "rgba(6, 182, 212, 0.35)", 5);
    }

    // 2. Draw active skeleton
    drawActiveSkeleton(ctx, landmarks, width, height, leftColor, rightColor, mode);

    // 3. Draw Center of Gravity
    drawCenterOfGravity(ctx, landmarks, width, height);

    // 4. Draw joints angles text
    drawAnglesOnSkeleton(ctx, landmarks, width, height, currentAngles, mode);

    // Save calculation metrics locally so sync loop can read them
    (window as any).lastStudentPose = {
      landmarks: landmarks,
      angles: currentAngles,
      alignmentScore: score,
      isAligned: aligned,
      mode: mode
    };
  };

  // Student MediaPipe Initialization Effect
  useEffect(() => {
    if (!scriptsLoaded || role !== "student" || !cameraActive) return;
    if (!videoRef.current || !canvasRef.current) return;

    const PoseClass = (window as any).Pose;
    const CameraClass = (window as any).Camera;

    if (!PoseClass || !CameraClass) return;

    const pose = new PoseClass({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    pose.onResults(handlePoseResults);
    poseInstanceRef.current = pose;

    const camera = new CameraClass(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          await pose.send({ image: videoRef.current });
        }
      },
      width: 640,
      height: 480
    });

    camera.start();
    cameraInstanceRef.current = camera;

    return () => {
      if (cameraInstanceRef.current) {
        try { cameraInstanceRef.current.stop(); } catch {}
      }
      if (poseInstanceRef.current) {
        try { poseInstanceRef.current.close(); } catch {}
      }
    };
  }, [scriptsLoaded, role, cameraActive]);

  // STUDENT SYNC POLLING LOOP (polls every 800ms)
  useEffect(() => {
    if (role !== "student") return;

    let isActive = true;

    const syncLoop = async () => {
      if (!isActive) return;

      const cachedPose = (window as any).lastStudentPose || {
        landmarks: [],
        angles: { left: 0, right: 0 },
        alignmentScore: 0,
        isAligned: false,
        mode: "superior"
      };

      try {
        const res = await fetch("/api/dojo/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomCode,
            role: "student",
            studentPose: cachedPose
          })
        });

        const data = await res.json();
        if (res.ok && data.control) {
          setGuidedMode(data.control.guidedMode);
          setTolerance(data.control.tolerance);

          // If Sensei has changed the reference Preset ID
          if (data.control.presetId) {
            if (!currentPresetRef.current || currentPresetRef.current._id !== data.control.presetId) {
              // Fetch preset details
              const presetRes = await fetch(`/api/presets`);
              const presetData = await presetRes.json();
              if (presetRes.ok && presetData.presets) {
                const found = presetData.presets.find((p: any) => p._id === data.control.presetId);
                if (found) {
                  currentPresetRef.current = found;
                  setSelectedPresetId(found._id);
                  speak(`Tu Sensei ha colocado la postura de referencia: ${found.name}`);
                }
              }
            }
          } else {
            currentPresetRef.current = null;
            setSelectedPresetId("");
          }

          // Handle reset pose remotely
          if (data.control.command === "reset_pose") {
            currentPresetRef.current = null;
            setSelectedPresetId("");
            speak("Posición de referencia reiniciada.");
          }
        }
      } catch (err) {
        console.error("Error syncing student loop:", err);
      }

      // Poll again in 800ms
      setTimeout(syncLoop, 800);
    };

    syncLoop();

    return () => {
      isActive = false;
    };
  }, [role, roomCode]);

  // SENSEI SYNC POLLING LOOP (polls every 800ms)
  useEffect(() => {
    if (role !== "sensei") return;

    let isActive = true;

    const syncLoop = async () => {
      if (!isActive) return;

      try {
        const res = await fetch("/api/dojo/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomCode,
            role: "sensei"
          })
        });

        const data = await res.json();
        if (res.ok) {
          if (data.studentPose) {
            setStudentPoseData(data.studentPose);
            
            // Draw student wireframe skeleton on Sensei canvas
            drawSenseiCanvas(data.studentPose);
          }

          if (data.poseSaved) {
            setSaveSuccessMessage("¡Postura del alumno guardada con éxito en la base de datos!");
            setNewPoseName("");
            setTimeout(() => setSaveSuccessMessage(""), 5000);
          }
        }
      } catch (err) {
        console.error("Error syncing sensei loop:", err);
      }

      setTimeout(syncLoop, 800);
    };

    syncLoop();

    return () => {
      isActive = false;
    };
  }, [role, roomCode]);

  // Sensei Canvas drawing logic
  const drawSenseiCanvas = (studentPose: any) => {
    const canvas = document.getElementById("sensei-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Draw dark cyber grid backdrop
    ctx.fillStyle = "#0c0f12";
    ctx.fillRect(0, 0, w, h);

    // Draw grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
    ctx.lineWidth = 1;
    const gridSpacing = 40;
    for (let x = 0; x < w; x += gridSpacing) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSpacing) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    const lms = studentPose.landmarks;
    if (!lms || lms.length === 0) {
      // Show waiting indicator
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.fillText("Esperando que el alumno active su cámara...", w / 2, h / 2);
      return;
    }

    const mode = studentPose.mode || "superior";
    const tol = tolerance;
    const currentAngles = studentPose.angles || { left: 0, right: 0 };
    
    // Evaluation colors
    let leftColor = "rgba(255, 0, 0, 0.8)";
    let rightColor = "rgba(255, 0, 0, 0.8)";

    // If Sensei has active preset selected, load it to draw alongside
    const senseiActivePreset = presets.find((p) => p._id === selectedPresetId);
    if (senseiActivePreset) {
      const diffL = Math.abs(currentAngles.left - senseiActivePreset.angles.left);
      const diffR = Math.abs(currentAngles.right - senseiActivePreset.angles.right);

      if (diffL <= tol) leftColor = "rgba(34, 197, 94, 0.85)";
      if (diffR <= tol) rightColor = "rgba(34, 197, 94, 0.85)";

      // Draw reference silhouette in light cyan
      const normalizedLms = normalizeReferenceLandmarks(lms, senseiActivePreset.landmarks);
      drawGhostSkeleton(ctx, normalizedLms, w, h, "rgba(6, 182, 212, 0.25)", 4);
    }

    // Draw active wireframe
    drawActiveSkeleton(ctx, lms, w, h, leftColor, rightColor, mode);

    // Draw center of gravity
    drawCenterOfGravity(ctx, lms, w, h);

    // Draw angle text labels
    drawAnglesOnSkeleton(ctx, lms, w, h, currentAngles, mode);

    // Draw details in overlay HUD
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "bold 9px monospace";
    ctx.textAlign = "left";
    ctx.fillText(`ALINEADO: ${studentPose.isAligned ? "SÍ" : "NO"}`, 15, 25);
    ctx.fillText(`PRECISIÓN: ${studentPose.alignmentScore}%`, 15, 40);
  };

  // Push controller changes from Sensei to MongoDB
  const updateSenseiControls = async (updatedFields: any) => {
    try {
      const res = await fetch("/api/dojo/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomCode,
          role: "sensei",
          control: {
            presetId: updatedFields.presetId !== undefined ? updatedFields.presetId : selectedPresetId,
            guidedMode: updatedFields.guidedMode !== undefined ? updatedFields.guidedMode : guidedMode,
            tolerance: updatedFields.tolerance !== undefined ? updatedFields.tolerance : tolerance,
            command: updatedFields.command || "none",
            newPoseName: updatedFields.newPoseName || ""
          }
        })
      });
      if (!res.ok) console.warn("Failed pushing Sensei controls to room.");
    } catch (err) {
      console.error(err);
    }
  };

  // Trigger Save Pose on the student remotely
  const triggerRemoteSavePose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPoseName.trim()) return;
    setIsSavingPose(true);
    updateSenseiControls({
      command: "save_pose",
      newPoseName: newPoseName.trim()
    }).finally(() => {
      setIsSavingPose(false);
    });
  };

  // Leave room reset
  const handleExitRoom = () => {
    if (cameraInstanceRef.current) {
      try { cameraInstanceRef.current.stop(); } catch {}
    }
    if (poseInstanceRef.current) {
      try { poseInstanceRef.current.close(); } catch {}
    }
    setRole(null);
    setRoomCode("");
    setRoomInfo(null);
    setStudentPoseData(null);
    setCameraActive(false);
    router.push("/herramientas/dojo-virtual");
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-start items-center overflow-x-hidden bg-[var(--background)] preguntas-section pb-20">
      
      {/* Background Watermark */}
      <div className="absolute right-10 top-[12%] text-[24vw] md:text-[14vw] font-black text-neutral-900/[0.012] select-none pointer-events-none leading-none z-0 font-serif">
        道場
      </div>

      <div className="relative z-20 w-full max-w-[99vw] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 flex flex-col justify-start items-center pt-0">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-title-serif text-xs text-[#556358] tracking-[0.25em] uppercase block mb-3">
            ENTRENAMIENTO SINCRO COLABORATIVO
          </span>
          <h1 className="font-impact-condensed text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-neutral-900 leading-[1.08] mb-3">
            DOJO <span className="bg-gradient-to-r from-[#E52B34] via-[#FF4D55] to-[#B81B22] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(229,43,52,0.12)]">VIRTUAL</span>
          </h1>
          <p className="font-body text-neutral-600 mt-2 font-light leading-relaxed text-sm sm:text-base max-w-2xl mx-auto">
            El Sensei evalúa la postura y guarda posiciones remotamente mientras el alumno entrena frente a la cámara.
          </p>
        </div>

        {/* LOBBY: Choice between joining as student or creating as instructor */}
        <AnimatePresence mode="wait">
          {role === null && (
            <motion.div 
              key="lobby"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/65 border border-neutral-200/90 shadow-lg rounded-none p-6 sm:p-8 md:p-10 backdrop-blur-md"
            >
              {/* Left Side: JOIN AS STUDENT (Lobby) */}
              <div className="space-y-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200 pb-8 md:pb-0 md:pr-8">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Camera className="w-5 h-5 text-[#E52B34]" />
                    <h2 className="font-impact-condensed text-xl sm:text-2xl text-neutral-950 tracking-wider">
                      CONECTARSE COMO ALUMNO
                    </h2>
                  </div>
                  <p className="font-body text-xs sm:text-sm text-neutral-600 font-light leading-relaxed mb-4">
                    Ingresa a la clase en vivo. Necesitarás encender tu cámara web y colocar el código alfanumérico que tu Sensei te haya asignado.
                  </p>
                </div>

                <form onSubmit={handleJoinRoom} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-title-serif uppercase tracking-wider text-[#556358] block">
                      Nombre del Practicante
                    </label>
                    <input 
                      type="text" 
                      placeholder="Tu nombre (ej. Juan)" 
                      value={studentInputName}
                      onChange={(e) => setStudentInputName(e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-250 rounded-none bg-white font-body text-sm text-neutral-900 focus:outline-none focus:border-[#E52B34] focus:ring-1 focus:ring-[#E52B34]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold font-title-serif uppercase tracking-wider text-[#556358] block">
                      Código de la Sala *
                    </label>
                    <input 
                      type="text" 
                      required
                      maxLength={6}
                      placeholder="Ej: AB12XY" 
                      value={studentInputCode}
                      onChange={(e) => setStudentInputCode(e.target.value.toUpperCase())}
                      className="w-full px-4 py-3 border border-neutral-250 rounded-none bg-white font-body text-sm font-semibold tracking-widest text-neutral-900 focus:outline-none focus:border-[#E52B34] focus:ring-1 focus:ring-[#E52B34]"
                    />
                  </div>

                  {connectionError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 rounded-none font-body text-xs flex gap-2 items-center">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{connectionError}</span>
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={isConnecting}
                    className="w-full bg-gradient-to-r from-[#E52B34] via-[#FF4D55] to-[#B81B22] text-white rounded-none text-xs font-bold font-sans-condensed tracking-widest py-3.5 flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                  >
                    {isConnecting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                    CONECTAR CAMARA AL DOJO
                  </button>
                </form>
              </div>

              {/* Right Side: CREATE ROOM AS SENSEI (Instructor only) */}
              <div className="space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-neutral-900" />
                    <h2 className="font-impact-condensed text-xl sm:text-2xl text-neutral-950 tracking-wider">
                      MODO INSTRUCTOR (SENSEI)
                    </h2>
                  </div>
                  <p className="font-body text-xs sm:text-sm text-neutral-600 font-light leading-relaxed mb-4">
                    Abre una sala para tu alumno. Podrás supervisar su postura, seleccionar la silueta que debe copiar y guardar sus mejores posiciones directamente.
                  </p>
                </div>

                {(session?.user as any)?.role === "admin" ? (
                  <form onSubmit={handleCreateRoom} className="space-y-4 pt-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold font-title-serif uppercase tracking-wider text-[#556358] block">
                        Nombre del Alumno a Evaluar
                      </label>
                      <input 
                        type="text" 
                        placeholder="Ej. Juan Pérez" 
                        value={targetStudentName}
                        onChange={(e) => setTargetStudentName(e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-250 rounded-none bg-white font-body text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isConnecting}
                      className="w-full bg-neutral-900 text-white rounded-none text-xs font-bold font-sans-condensed tracking-widest py-3.5 flex items-center justify-center gap-2 hover:bg-neutral-950 transition-colors"
                    >
                      {isConnecting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Users className="w-4 h-4" />}
                      CREAR NUEVA SALA DE CLASE
                    </button>
                  </form>
                ) : (
                  <div className="bg-neutral-50 border border-neutral-200 p-5 rounded-none space-y-4 flex-1 flex flex-col justify-center items-center text-center">
                    <Lock className="w-8 h-8 text-neutral-400" />
                    <div>
                      <p className="font-body text-xs font-bold text-neutral-800">Acceso exclusivo para Instructores</p>
                      <p className="font-body text-[11px] text-neutral-500 font-light mt-1 max-w-[280px]">
                        Por favor, inicia sesión con un correo de administrador para poder abrir y controlar salas.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* VIEW: ALUMNO / STUDENT camera section */}
          {role === "student" && (
            <motion.div 
              key="student-panel"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full flex flex-col xl:flex-row gap-8 bg-white/65 border border-neutral-200/90 shadow-lg rounded-none p-6 sm:p-8 md:p-10 min-h-[580px] backdrop-blur-md"
            >
              {/* Camera Area */}
              <div className="flex-1 flex flex-col items-center justify-center bg-black/95 border border-neutral-800 p-4 relative min-h-[480px]">
                
                {/* Hidden video element for MediaPipe input */}
                <video 
                  ref={videoRef}
                  style={{ display: "none" }}
                  width="640"
                  height="480"
                  playsInline
                  muted
                />

                {/* Main Overlay Canvas */}
                <canvas 
                  ref={canvasRef}
                  width="640"
                  height="480"
                  className="w-full max-w-[640px] aspect-[4/3] bg-neutral-900 border border-neutral-800"
                />

                {!cameraActive && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950/90 text-center p-6 space-y-4 z-20">
                    <Camera className="w-10 h-10 text-neutral-400 animate-pulse" />
                    <div>
                      <p className="font-body text-sm font-semibold text-white">Cámara Inactiva</p>
                      <p className="font-body text-xs text-neutral-500 max-w-sm mt-1 leading-relaxed">
                        Se requieren permisos de cámara web. Actívala a continuación para comenzar a transmitir tu postura al Sensei.
                      </p>
                    </div>
                    
                    <button
                      onClick={() => setCameraActive(true)}
                      className="bg-gradient-to-r from-[#E52B34] via-[#FF4D55] to-[#B81B22] text-white rounded-none text-xs font-bold font-sans-condensed tracking-widest px-8 py-3 hover:opacity-95"
                    >
                      ENCENDER CAMARA EN VIVO
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar student status panel */}
              <div className="w-full xl:w-[320px] shrink-0 border border-neutral-200 bg-white/95 rounded-none p-6 sm:p-8 flex flex-col justify-between">
                
                <div className="space-y-6">
                  {/* Status header */}
                  <div className="border-b border-neutral-100 pb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-bold font-title-serif uppercase px-2 py-0.5 border border-emerald-500/30 text-emerald-600 bg-emerald-50">
                        CONECTADO
                      </span>
                      <h2 className="font-impact-condensed text-xl text-neutral-900 tracking-wide mt-1">
                        SALA: {roomCode}
                      </h2>
                    </div>
                    
                    <button 
                      onClick={handleExitRoom}
                      className="p-2 border border-neutral-200 hover:border-red-200 hover:bg-red-50 text-neutral-400 hover:text-red-600 rounded-none transition-all"
                      title="Salir del Dojo"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Mode Info */}
                  <div className="space-y-3 font-body text-xs text-neutral-700">
                    <div className="flex justify-between border-b border-neutral-100 pb-2">
                      <span className="font-medium text-neutral-400">Alumno:</span>
                      <span className="font-bold text-neutral-800">{roomInfo?.studentName || "Estudiante"}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-100 pb-2">
                      <span className="font-medium text-neutral-400">Sensei:</span>
                      <span className="font-bold text-neutral-800">{roomInfo?.senseiName}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-100 pb-2">
                      <span className="font-medium text-neutral-400">Modo Guiado:</span>
                      <span className="font-bold text-neutral-800">{guidedMode ? "Activo" : "Experto"}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-100 pb-2">
                      <span className="font-medium text-neutral-400">Tolerancia:</span>
                      <span className="font-bold text-[#E52B34]">{tolerance}°</span>
                    </div>
                  </div>

                  {/* Silhouette reference panel */}
                  <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-none space-y-3">
                    <h3 className="text-[10px] font-bold font-title-serif uppercase text-[#E52B34] tracking-wider">
                      Postura de Referencia
                    </h3>
                    {selectedPresetId ? (
                      <div className="space-y-2">
                        <p className="font-impact-condensed text-sm text-neutral-900 tracking-wide">
                          {currentPresetRef.current?.name || "Cargando..."}
                        </p>
                        <p className="font-body text-[11px] text-neutral-500 font-light leading-relaxed">
                          La silueta fantasma en pantalla indica la posición oficial asignada de forma remota por tu instructor.
                        </p>
                      </div>
                    ) : (
                      <p className="font-body text-[11px] text-neutral-400 font-light italic">
                        Esperando que tu Sensei inyecte una postura de referencia...
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-100 text-[10px] font-body text-neutral-400 leading-normal flex gap-2 items-start">
                  <HelpCircle className="w-3.5 h-3.5 shrink-0 text-neutral-300 mt-0.5" />
                  <span>Colócate a 2 metros de distancia para que MediaPipe logre identificar tu cuerpo completo.</span>
                </div>

              </div>
            </motion.div>
          )}

          {/* VIEW: SENSEI / INSTRUCTOR dashboard section */}
          {role === "sensei" && (
            <motion.div 
              key="sensei-panel"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full flex flex-col xl:flex-row gap-8 bg-white/65 border border-neutral-200/90 shadow-lg rounded-none p-6 sm:p-8 md:p-10 min-h-[580px] backdrop-blur-md"
            >
              {/* Left Panel: Real-Time Wireframe Canvas rendering student skeleton */}
              <div className="flex-1 flex flex-col items-center justify-center bg-[#0c0f12] border border-neutral-800 p-4 relative min-h-[480px]">
                
                {/* Cyber Grid Canvas */}
                <canvas 
                  id="sensei-canvas"
                  width="640"
                  height="480"
                  className="w-full max-w-[640px] aspect-[4/3] bg-[#0c0f12] border border-neutral-800"
                />

                {/* Accuracy HUD metrics */}
                {studentPoseData && (
                  <div className="absolute top-8 right-8 bg-black/80 border border-neutral-850 p-4 space-y-1 font-body text-xs rounded-none z-10 backdrop-blur-sm">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">MÉTRICA ALUMNO</span>
                    <div className="flex justify-between gap-6 pt-1 border-t border-neutral-800">
                      <span className="text-neutral-400">Coincidencia:</span>
                      <span className={`font-bold ${studentPoseData.isAligned ? "text-emerald-500" : "text-amber-500"}`}>
                        {studentPoseData.alignmentScore}%
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Panel: Controls (Presets, Tolerance, Mode, Save Pose) */}
              <div className="w-full xl:w-[380px] shrink-0 border border-neutral-200 bg-white/95 rounded-none p-6 sm:p-8 flex flex-col justify-between space-y-6">
                
                <div className="space-y-6">
                  {/* Status header */}
                  <div className="border-b border-neutral-100 pb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-bold font-title-serif uppercase px-2 py-0.5 border border-amber-500/30 text-amber-600 bg-amber-50">
                        MONITOR ACTIVADO
                      </span>
                      <h2 className="font-impact-condensed text-xl text-neutral-900 tracking-wide mt-1">
                        SALA: {roomCode}
                      </h2>
                    </div>
                    
                    <button 
                      onClick={handleExitRoom}
                      className="p-2 border border-neutral-200 hover:border-red-200 hover:bg-red-50 text-neutral-400 hover:text-red-600 rounded-none transition-all"
                      title="Cerrar Sala"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Student profile details */}
                  <div className="font-body text-xs text-neutral-700 space-y-2 border-b border-neutral-100 pb-4">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Alumno en Línea:</span>
                      <span className="font-bold text-neutral-900">{roomInfo?.studentName || "Buscando..."}</span>
                    </div>
                  </div>

                  {/* 1. PRESET INJECTION CONTROL */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-title-serif font-extrabold uppercase text-[#E52B34] tracking-wider flex items-center gap-1.5">
                      <Eye className="w-4 h-4" /> Inyectar Postura Oficial
                    </h3>
                    <select
                      value={selectedPresetId}
                      onChange={(e) => {
                        setSelectedPresetId(e.target.value);
                        updateSenseiControls({ presetId: e.target.value });
                      }}
                      className="w-full px-4 py-3 border border-neutral-250 rounded-none bg-white font-body text-sm text-neutral-900 focus:outline-none focus:border-neutral-900"
                    >
                      <option value="">-- Sin Silueta Guía --</option>
                      {presets.map((preset) => (
                        <option key={preset._id} value={preset._id}>
                          {preset.name} ({preset.category === "superior" ? "Codos" : "Rodillas"})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 2. LIVE TOLERANCE CONTROLLER */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-title-serif font-extrabold uppercase text-[#E52B34] tracking-wider flex items-center gap-1.5">
                      <SlidersHorizontal className="w-4 h-4" /> Tolerancia de Postura: {tolerance}°
                    </h3>
                    <input 
                      type="range"
                      min={5}
                      max={35}
                      step={1}
                      value={tolerance}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setTolerance(val);
                        updateSenseiControls({ tolerance: val });
                      }}
                      className="w-full h-1.5 bg-neutral-200 rounded-none appearance-none cursor-pointer accent-[#E52B34]"
                    />
                    <div className="flex justify-between text-[9px] font-body text-neutral-400">
                      <span>Exigente (5°)</span>
                      <span>Permisivo (35°)</span>
                    </div>
                  </div>

                  {/* 3. CAPTURE & SAVE POSE FORM */}
                  <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-5 rounded-none space-y-4">
                    <h3 className="text-xs font-title-serif font-extrabold uppercase text-[#E52B34] tracking-wider flex items-center gap-1.5">
                      <Save className="w-4 h-4" /> Capturar Postura Alumno
                    </h3>
                    
                    <p className="font-body text-[11px] text-neutral-500 font-light leading-relaxed">
                      Si el alumno está posicionado correctamente, escribe un nombre abajo y captura sus coordenadas para agregarlo al catálogo.
                    </p>

                    <form onSubmit={triggerRemoteSavePose} className="space-y-3">
                      <input 
                        type="text"
                        required
                        placeholder="Nombre de postura (ej: Zenkutsu Dachi)"
                        value={newPoseName}
                        onChange={(e) => setNewPoseName(e.target.value)}
                        className="w-full px-3 py-2.5 border border-neutral-250 rounded-none bg-white font-body text-xs text-neutral-900 focus:outline-none"
                      />

                      {saveSuccessMessage && (
                        <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-3.5 py-2 rounded-none font-body text-[10px] flex gap-1.5 items-center">
                          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                          <span>{saveSuccessMessage}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSavingPose || !studentPoseData?.landmarks || studentPoseData.landmarks.length === 0}
                        className="w-full bg-[#E52B34] text-white rounded-none text-xs font-bold font-sans-condensed tracking-widest py-3 flex items-center justify-center gap-2 hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {isSavingPose ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        CAPTURAR Y GUARDAR EN CATALOGO
                      </button>
                    </form>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-100 text-[10px] font-body text-neutral-400 leading-normal flex gap-2 items-start">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-neutral-300 mt-0.5" />
                  <span>Tu sesión de instructor es 100% segura. Los cambios en el selector se aplican al alumno al instante.</span>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
