"use client";

import { useState } from "react";
import { Building2, Filter, MapPin } from "lucide-react";

export default function SucursalesPage() {
  const [filtro, setFiltro] = useState("Todas");

  const sucursales = [
    { id: 1, nombre: "Tobalaba – Local 1 – Tanta", grupo: "Grupo Los Robles", credito: "30 días", rut: "76.854.879-5", direccion: "Av. El Valle 541, Huechuraba" },
    { id: 2, nombre: "Tobalaba – Local 2 – Osaka", grupo: "Grupo Los Robles", credito: "30 días", rut: "76.854.879-5", direccion: "Av. El Valle 541, Huechuraba" },
    { id: 3, nombre: "Tobalaba – Local 3 – Panchita", grupo: "Grupo Mil Sabores", credito: "30 días", rut: "78.523.412-8", direccion: "Av. Lo Bascuñán 287, Santiago" },
    { id: 4, nombre: "Tobalaba – Local 4 – Jalisco", grupo: "Grupo Mil Sabores", credito: "30 días", rut: "78.523.412-8", direccion: "Av. Lo Bascuñán 287, Santiago" },
    { id: 5, nombre: "Tobalaba – Local 5 – La Mar", grupo: "Grupo Los Robles", credito: "30 días", rut: "76.854.879-5", direccion: "Av. El Valle 541, Huechuraba" },
    { id: 6, nombre: "Tobalaba – Local 6 – Barra Chalaca", grupo: "Grupo Mil Sabores", credito: "30 días", rut: "78.523.412-8", direccion: "Av. Lo Bascuñán 287, Santiago" },
    { id: 7, nombre: "Tobalaba – Local 7 – El Japonés", grupo: "Grupo Mil Sabores", credito: "30 días", rut: "78.523.412-8", direccion: "Av. Lo Bascuñán 287, Santiago" },
  ];

  const filtradas =
    filtro === "Todas" ? sucursales : sucursales.filter((s) => s.grupo === filtro);

  return (
    <div className="p-6 text-white">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-amber-400">
          <Building2 className="w-6 h-6" />
          Sucursales – Grupo Mil Sabores
        </h1>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="bg-neutral-900 border border-neutral-700 text-gray-200 rounded-lg px-3 py-1 text-sm"
          >
            <option value="Todas">Todas</option>
            <option value="Grupo Mil Sabores">Grupo Mil Sabores</option>
            <option value="Grupo Los Robles">Grupo Los Robles</option>
          </select>
        </div>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow">
        <table className="min-w-full text-sm text-gray-300">
          <thead className="bg-neutral-800 text-amber-400">
            <tr>
              <th className="py-3 px-4 text-left">Sucursal</th>
              <th className="py-3 px-4 text-left">Grupo</th>
              <th className="py-3 px-4 text-left">RUT</th>
              <th className="py-3 px-4 text-left">Crédito</th>
              <th className="py-3 px-4 text-left">Dirección</th>
            </tr>
          </thead>
          <tbody>
          {filtradas.map((s) => (
    <tr
      key={s.id}
      onClick={() => (window.location.href = `/sucursales/${s.id}`)}
      className="border-t border-neutral-800 hover:bg-neutral-800/40 transition cursor-pointer"
    >
                <td className="py-3 px-4 font-medium">{s.nombre}</td>
                <td className="py-3 px-4">{s.grupo}</td>
                <td className="py-3 px-4">{s.rut}</td>
                <td className="py-3 px-4">{s.credito}</td>
                <td className="py-3 px-4 flex items-center gap-2">
                  <MapPin size={14} className="text-amber-400" />
                  {s.direccion}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
