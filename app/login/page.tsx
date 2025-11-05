"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SUCURSALES = [
  { id: "1", nombre: "Tobalaba – Local 1 – Tanta" },
  { id: "2", nombre: "Tobalaba – Local 2 – Osaka" },
  { id: "3", nombre: "Tobalaba – Local 3 – Panchita" },
  { id: "4", nombre: "Tobalaba – Local 4 – Jalisco" },
  { id: "5", nombre: "Tobalaba – Local 5 – La Mar" },
  { id: "6", nombre: "Tobalaba – Local 6 – Barra Chalaca" },
  { id: "7", nombre: "Tobalaba – Local 7 – El Japonés" },
];

export default function LoginPage() {
  const router = useRouter();
  const [rol, setRol] = useState<"Auditora" | "Supervisora" | "Gerencia">("Auditora");
  const [userName, setUserName] = useState("");
  const [sucursalId, setSucursalId] = useState("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sucursal = SUCURSALES.find(s => s.id === sucursalId);

    // Guarda sesión simulada
    localStorage.setItem("rol", rol);
    localStorage.setItem("userName", userName || rol);
    if (rol === "Auditora") {
      localStorage.setItem("sucursalId", sucursalId);
      localStorage.setItem("sucursalNombre", sucursal?.nombre || "");
    } else {
      localStorage.removeItem("sucursalId");
      localStorage.removeItem("sucursalNombre");
    }

    // Redirecciones
    if (rol === "Auditora") {
      router.push("/sucursales/historial");
    } else if (rol === "Supervisora") {
      router.push("/sucursales/historial");
    } else {
      router.push("/"); // o dashboard general de gerencia
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-amber-400 mb-2">Portal B2B – Mil Sabores</h1>
        <p className="text-sm text-gray-400 mb-6">Inicia sesión para continuar</p>

        <label className="block text-sm text-gray-300 mb-1">Rol</label>
        <select
          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 mb-4"
          value={rol}
          onChange={e => setRol(e.target.value as any)}
        >
          <option>Auditora</option>
          <option>Supervisora</option>
          <option>Gerencia</option>
        </select>

        <label className="block text-sm text-gray-300 mb-1">Nombre</label>
        <input
          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 mb-4"
          placeholder="Tu nombre"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />

        {/* Selección de sucursal solo para auditora */}
        {rol === "Auditora" && (
          <>
            <label className="block text-sm text-gray-300 mb-1">Sucursal</label>
            <select
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 mb-6"
              value={sucursalId}
              onChange={e => setSucursalId(e.target.value)}
            >
              {SUCURSALES.map(s => (
                <option key={s.id} value={s.id}>{s.nombre}</option>
              ))}
            </select>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded-lg"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
