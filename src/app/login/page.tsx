"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div className="rounded-lg bg-white bg-opacity-10 backdrop-blur-lg p-8 text-center shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-white">Inicia sesión</h1>
        <button
          onClick={() => signIn("google")}
          className="rounded bg-white bg-opacity-20 px-6 py-3 text-lg font-medium text-white hover:bg-opacity-30"
        >
          Iniciar con Google
        </button>
      </div>
    </div>
  );
}
