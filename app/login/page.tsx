"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// === URLs ===

// HOJA Roles (usuario / clave)
const ROLES_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSLKyOAM6dchMCX6y7VGm4S4Qkmzw4193ktJo2ZZGLawP-tsNqKHZ9ONRLI19J99E7EQuPq9mZdjnES/pub?gid=0&single=true&output=csv";

// HOJA Sucursales Mil Sabores
const LOCALES_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSLKyOAM6dchMCX6y7VGm4S4Qkmzw4193ktJo2ZZGLawP-tsNqKHZ9ONRLI19J99E7EQuPq9mZdjnES/pub?gid=1153805717&single=true&output=csv";

interface RolItem {
  usuario: string;
  clave: string;
}

interface LocalItem {
  sucursal: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [usuarios, setUsuarios] = useState<RolItem[]>([]);
  const [locales, setLocales] = useState<LocalItem[]>([]);

  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState("");

  // === 1. Cargar usuarios ===
  useEffect(() => {
    fetch(ROLES_URL)
      .then((res) => res.text())
      .then((csv) => {
        const lines = csv.split("\n").slice(1);
        const data = lines
          .map((l) => l.split(","))
          .filter((cols) => cols.length >= 2)
          .map((cols) => ({
            usuario: cols[0].trim(),
            clave: cols[1].trim(),
          }));

        setUsuarios(data);
      });
  }, []);

  // === 2. Cargar sucursales ===
  useEffect(() => {
    fetch(LOCALES_URL)
      .then((res) => res.text())
      .then((csv) => {
        const lines = csv.split("\n").slice(1);
        const data = lines
          .map((l) => l.split(","))
          .filter((cols) => cols.length >= 1)
          .map((cols) => ({
            sucursal: cols[0].trim(),
          }));

        setLocales(data);
      });
  }, []);

  // === VALIDAR LOGIN ===
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const u = usuarios.find((x) => x.usuario === usuario);

    if (!u) {
      alert("Usuario no encontrado");
      return;
    }

    if (u.clave !== clave.trim()) {
      alert("Clave incorrecta");
      return;
    }

    if (!sucursalSeleccionada) {
      alert("Selecciona una sucursal");
      return;
    }

    // Guardar sesión
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("sucursalSeleccionada", sucursalSeleccionada);

    router.push("/"); // dashboard principal
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-amber-400 mb-2">
          Portal B2B – Mil Sabores
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Inicia sesión para continuar
        </p>

        {/* Usuario */}
        <label className="block text-sm text-gray-300 mb-1">Usuario</label>
        <select
          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 mb-4"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        >
          <option value="">Seleccione usuario</option>
          {usuarios.map((u, i) => (
            <option key={i} value={u.usuario}>
              {u.usuario}
            </option>
          ))}
        </select>

        {/* Clave */}
        {usuario && (
          <>
            <label className="block text-sm text-gray-300 mb-1">Clave</label>
            <input
              type="password"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 mb-4"
              placeholder="Clave"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
          </>
        )}

        {/* Sucursal */}
        {usuario && (
          <>
            <label className="block text-sm text-gray-300 mb-1">
              Sucursal
            </label>
            <select
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 mb-4"
              value={sucursalSeleccionada}
              onChange={(e) => setSucursalSeleccionada(e.target.value)}
            >
              <option value="">Seleccione sucursal</option>
              {locales.map((l, i) => (
                <option key={i} value={l.sucursal}>
                  {l.sucursal}
                </option>
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
