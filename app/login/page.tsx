"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (rol: string) => {
    setLoading(true);
    localStorage.setItem("rol", rol);

    // Simular tiempo de carga
    setTimeout(() => {
      if (rol === "auditor") router.push("/consumos");
      else if (rol === "supervisora") router.push("/reporteria");
      else if (rol === "gerente") router.push("/dashboard");
      else router.push("/");
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white">
      <div className="bg-neutral-900 border border-neutral-800 p-10 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-amber-400 mb-2">
          Portal B2B – Mil Sabores
        </h1>
        <p className="text-gray-400 mb-8 text-sm">
          Selecciona tu tipo de usuario para acceder
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleLogin("auditor")}
            className="bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-xl transition"
          >
            👩‍💼 Ingresar como Auditora
          </button>

          <button
            onClick={() => handleLogin("supervisora")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition"
          >
            👩‍🔬 Ingresar como Supervisora
          </button>

          <button
            onClick={() => handleLogin("gerente")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
          >
            👨‍💼 Ingresar como Gerente
          </button>
        </div>

        {loading && (
          <p className="mt-6 text-sm text-gray-400 animate-pulse">
            Cargando panel...
          </p>
        )}
      </div>

      <p className="mt-8 text-xs text-gray-500">
        © 2025 Spartan B2B – Grupo Mil Sabores
      </p>
    </div>
  );
}
