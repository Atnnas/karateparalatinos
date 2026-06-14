"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ShieldAlert, LogIn, LogOut, Clock, XCircle } from "lucide-react";
import React, { Suspense } from "react";

function AccessDeniedContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const queryStatus = searchParams.get("status");

  // Determine the display message and status state
  const isPending = queryStatus === "pending" || (session?.user as any)?.status === "pending";
  const isRejected = queryStatus === "rejected" || (session?.user as any)?.status === "rejected";

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[var(--background)] px-4">
      {/* Dojo background overlay styling */}
      <div className="absolute inset-0 bg-dojo-wood shadow-wood-3d shine-sweep-wood glass-reflection-wood -z-10" />

      {/* Glassmorphism Card */}
      <div className="w-full max-w-md rounded-2xl border border-[#8B6914]/30 bg-white/10 p-8 text-center backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        {isPending ? (
          <>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 border-2 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Clock className="h-10 w-10" />
            </div>
            <h1 className="font-impact-condensed text-3xl font-bold tracking-widest text-[#3B2210] uppercase mb-4 drop-shadow-[0_1px_1px_rgba(255,240,210,0.3)]">
              Acceso Pendiente
            </h1>
            <p className="text-neutral-700 font-medium mb-8 leading-relaxed">
              Hola, <span className="font-semibold text-neutral-900">{session?.user?.name || "Usuario"}</span>. Tu cuenta ha sido registrada, pero actualmente está en espera de aprobación por un administrador.
            </p>
          </>
        ) : isRejected ? (
          <>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-600/20 text-red-600 border-2 border-red-600/50 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              <XCircle className="h-10 w-10" />
            </div>
            <h1 className="font-impact-condensed text-3xl font-bold tracking-widest text-[#E52B34] uppercase mb-4">
              Acceso Rechazado
            </h1>
            <p className="text-neutral-700 font-medium mb-8 leading-relaxed">
              Lo sentimos, tu solicitud de acceso al sistema de Karate para Latinos ha sido rechazada por el administrador.
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#E52B34]/20 text-[#E52B34] border-2 border-[#E52B34]/50 shadow-[0_0_15px_rgba(229,43,52,0.3)]">
              <ShieldAlert className="h-10 w-10" />
            </div>
            <h1 className="font-impact-condensed text-3xl font-bold tracking-widest text-[#3B2210] uppercase mb-4 drop-shadow-[0_1px_1px_rgba(255,240,210,0.3)]">
              Acceso Denegado
            </h1>
            <p className="text-neutral-700 font-medium mb-8 leading-relaxed">
              Debes iniciar sesión con una cuenta de Google autorizada para acceder a esta sección de la plataforma.
            </p>
          </>
        )}

        <div className="flex flex-col gap-4">
          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center justify-center gap-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-impact-condensed text-md py-3 px-6 transition-all shadow-md active:scale-95"
            >
              <LogOut className="h-5 w-5" />
              Cerrar sesión / Cambiar cuenta
            </button>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#E52B34] hover:bg-[#c82028] text-white font-impact-condensed text-md py-3 px-6 transition-all shadow-md active:scale-95 border border-[#E52B34]"
            >
              <LogIn className="h-5 w-5" />
              Iniciar sesión con Google
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AccessDeniedPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Cargando...</div>}>
      <AccessDeniedContent />
    </Suspense>
  );
}
