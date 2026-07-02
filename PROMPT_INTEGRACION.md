# Prompt de Integración de Evaluador de Visión Artificial (Iframe)

Copia y pega el contenido a continuación en el chat de Inteligencia Artificial del otro proyecto para guiar la implementación:

---

Actúa como un desarrollador React/TypeScript experto. Necesito integrar una funcionalidad de visión artificial interactiva (un evaluador de ejercicios por cámara) que ya está desarrollado y desplegado en otra de nuestras plataformas.

La integración debe hacerse de forma limpia y segura a través de un `iframe` que se comunique con nuestra aplicación en tiempo real mediante `postMessage`.

Por favor, implementa las siguientes especificaciones y componentes:

### 1. Requisitos Técnicos
1. **Permisos de Cámara**: El `iframe` requiere acceso a la webcam del usuario. Debes añadir el atributo `allow="camera; microphone"` de forma explícita al tag `<iframe>`.
2. **Dimensiones**: El evaluador debe lucir premium e integrarse perfectamente. Hazlo responsivo con un aspect-ratio cómodo (se recomienda `aspect-[4/3]` o `h-[650px]`) con bordes redondeados (`rounded-2xl`) y sombras.
3. **Filtro de Origen**: Para evitar vulnerabilidades de seguridad (XSS), debes validar que los mensajes recibidos provengan estrictamente del dominio de origen del evaluador: `https://kuma-web-page-deploy.vercel.app` (reemplaza por tu dominio final si es necesario).

---

### 2. Estructura de Mensajes (`postMessage`)
El evaluador envía los siguientes mensajes al exterior a través de la ventana padre (`window.parent`):

- **Mensaje de repetición contada**:
  ```json
  { "type": "REP_COUNT", "reps": 5 }
  ```
- **Mensaje de entrenamiento finalizado**:
  ```json
  { "type": "WORKOUT_COMPLETED" }
  ```

Deberás crear un escuchador de eventos (`window.addEventListener('message', ...)`) que capture estas repeticiones en tiempo real en el estado de React y ejecute la llamada para registrar o guardar el progreso en nuestra base de datos cuando se complete.

---

### 3. Ejemplo Práctico de Componente Integrador
Crea un componente React interactivo y estilizado con Tailwind CSS (por ejemplo, `KumaWorkoutRevisor.tsx`):

```tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Loader2, CheckCircle2 } from 'lucide-react';

interface KumaWorkoutRevisorProps {
  routineId: string;
  onWorkoutComplete: (finalReps: number) => void;
}

export function KumaWorkoutRevisor({ routineId, onWorkoutComplete }: KumaWorkoutRevisorProps) {
  const [reps, setReps] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const EVALUATOR_ORIGIN = "https://kuma-web-page-deploy.vercel.app";

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // 1. Validar el origen por seguridad
      if (event.origin !== EVALUATOR_ORIGIN) return;

      const data = event.data;

      // 2. Escuchar repeticiones
      if (data?.type === 'REP_COUNT') {
        setReps(data.reps);
      }

      // 3. Escuchar finalización
      if (data?.type === 'WORKOUT_COMPLETED') {
        setCompleted(true);
        onWorkoutComplete(data.reps || reps);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onWorkoutComplete, reps]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
      
      {/* HUD de repeticiones en la app contenedora */}
      <div className="bg-zinc-900/60 p-4 border-b border-white/5 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Espejo de IA Activo</span>
        </div>
        <div className="bg-black/40 px-4 py-1.5 rounded-full border border-white/5">
          <span className="text-zinc-500 text-xs font-bold mr-1">Reps:</span>
          <span className="text-lg font-black font-mono text-cyan-400">{reps}</span>
        </div>
      </div>

      <div className="relative w-full aspect-[4/3] min-h-[500px]">
        {/* Pantalla de carga */}
        {loading && (
          <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center space-y-4 z-20">
            <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Cargando Visión Artificial...</p>
          </div>
        )}

        {/* Iframe del evaluador */}
        <iframe
          ref={iframeRef}
          src={`${EVALUATOR_ORIGIN}/routines/embed/${routineId}`}
          className="w-full h-full border-none"
          allow="camera; microphone"
          onLoad={() => setLoading(false)}
        />
        
        {/* Pantalla de Felicitaciones / Finalizado */}
        <AnimatePresence>
          {completed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 z-30 text-center space-y-6"
            >
              <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
              <div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">¡Entrenamiento Guardado!</h3>
                <p className="text-zinc-400 text-xs mt-2">Completaste un total de {reps} repeticiones de forma exitosa.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
```
