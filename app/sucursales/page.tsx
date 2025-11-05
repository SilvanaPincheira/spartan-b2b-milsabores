"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart3, Building2, Filter } from "lucide-react";

type Row = { sucursalId: string; sucursal: string; pedidos: number[] };

const BASE: Row[] = [
  { sucursalId: "1", sucursal: "Tobalaba – Local 1 – Tanta",     pedidos: [18,20,22,19,23,25,28,27,30,31] },
  { sucursalId: "2", sucursal: "Tobalaba – Local 2 – Osaka",     pedidos: [15,18,20,22,21,25,24,26,29,30] },
  { sucursalId: "3", sucursal: "Tobalaba – Local 3 – Panchita",  pedidos: [20,22,23,25,26,27,29,28,31,32] },
  { sucursalId: "4", sucursal: "Tobalaba – Local 4 – Jalisco",   pedidos: [14,16,19,18,20,22,24,23,25,26] },
  { sucursalId: "5", sucursal: "Tobalaba – Local 5 – La Mar",    pedidos: [17,19,21,20,22,23,25,26,28,29] },
  { sucursalId: "6", sucursal: "Tobalaba – Local 6 – Barra Chalaca", pedidos: [16,18,20,21,23,24,26,27,29,30] },
  { sucursalId: "7", sucursal: "Tobalaba – Local 7 – El Japonés",    pedidos: [13,15,17,18,19,21,23,24,26,27] },
];

const MESES = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov (Sug.)"];

const sugerido3 = (arr: number[]) => {
  const u3 = arr.slice(-3);
  return Math.round(u3.reduce((a,b) => a+b, 0) / u3.length);
};

export default function HistorialPedidosPage() {
  const [rol, setRol] = useState<string | null>(null);
  const [miSucursalId, setMiSucursalId] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<string>("Todas");

  useEffect(() => {
    const r = localStorage.getItem("rol");
    const sid = localStorage.getItem("sucursalId");
    setRol(r);
    setMiSucursalId(sid);
    if (r === "Auditora" && sid) setFiltro(sid); // por defecto, filtra a su sucursal
  }, []);

  // Data que se mostrará según el rol
  const data = useMemo(() => {
    if (rol === "Auditora" && miSucursalId) {
      return BASE.filter(x => x.sucursalId === miSucursalId);
    }
    // Supervisor(a)/Gerencia: permite ver todas o filtrar por una
    if (filtro !== "Todas") return BASE.filter(x => x.sucursalId === filtro);
    return BASE;
  }, [rol, miSucursalId, filtro]);

  // Listado de sucursales para el filtro visible solo si NO es auditora
  const sucursalesOpts = useMemo(
    () => [{ id: "Todas", nombre: "Todas" }, ...BASE.map(x => ({ id: x.sucursalId, nombre: x.sucursal }))],
    []
  );

  return (
    <div className="p-6 text-white">
      {/* Header */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-amber-400">
          <BarChart3 className="w-6 h-6" />
          Historial de Pedidos Mensuales
        </h1>

        {/* Filtro visible solo para Supervisora/Gerencia */}
        {(rol === "Supervisora" || rol === "Gerencia") && (
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="bg-neutral-900 border border-neutral-700 text-gray-200 rounded-lg px-3 py-1 text-sm"
            >
              {sucursalesOpts.map(s => (
                <option key={s.id} value={s.id}>{s.nombre}</option>
              ))}
            </select>
          </div>
        )}
      </header>

      {/* Contexto del grupo */}
      <div className="text-gray-400 text-sm flex items-center gap-2 mb-4">
        <Building2 size={14} /> Sucursales Grupo Mil Sabores
        {rol === "Auditora" && miSucursalId && (
          <span className="ml-2 inline-flex items-center gap-2 bg-neutral-800 text-amber-400 px-2 py-0.5 rounded-full text-xs border border-neutral-700">
            Tu sucursal
          </span>
        )}
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow">
        <table className="min-w-full text-sm text-gray-300">
          <thead className="bg-neutral-800 text-amber-400">
            <tr>
              <th className="py-3 px-4 text-left">Sucursal</th>
              {MESES.map((m) => (
                <th key={m} className="py-3 px-2 text-right">{m}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((fila) => {
              const sug = sugerido3(fila.pedidos);
              return (
                <tr
                  key={fila.sucursalId}
                  className="border-t border-neutral-800 hover:bg-neutral-800/40 transition"
                >
                  <td className="py-2 px-4 font-medium">{fila.sucursal}</td>
                  {fila.pedidos.map((p, j) => (
                    <td key={j} className="py-2 px-2 text-right">{p}</td>
                  ))}
                  <td className="py-2 px-2 text-right text-amber-400 font-semibold">{sug}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-gray-400 text-xs mt-3 italic">
        El sugerido de noviembre es el promedio de Ago–Oct para cada sucursal.
      </p>
    </div>
  );
}
