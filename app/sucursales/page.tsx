"use client";

import { useEffect, useState, useMemo } from "react";
import Papa from "papaparse";
import { Building2, Filter, Search } from "lucide-react";

type SucursalItem = {
  codigo: string;
  razonSocial: string;
  rut: string;
  local: string;
  direccion: string;
  estado: string;
  cco: string;
  ubicacion: string;
  zona: string;
  sucursal: string; // columna nueva
};

// 📌 URL pública del CSV de sucursales
const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vREJ43NtBSeZNkFnTZ_9S9rsDp0YNhY6qOdtt-srwVD4UpXHrybM4z5w8D7080ds1jUicZjWke80WAx/pub?gid=0&single=true&output=csv";

export default function SucursalesPage() {
  const [data, setData] = useState<SucursalItem[]>([]);
  const [busqueda, setBusqueda] = useState("");

  // -------------------------------------------------------
  // 🔹 1. Leer Google Sheets CSV
  // -------------------------------------------------------
  useEffect(() => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        const rows = results.data as any[];

        const clean = rows
          .filter((r) => r["Sucursal"] && r["RUT"])
          .map((r) => ({
            codigo: r["Codigo Razon Social"] || "",
            razonSocial: r["RAZÓN SOCIAL"] || "",
            rut: r["RUT"] || "",
            local: r["LOCAL"] || "",
            direccion: r["DIRECCIÓN"] || "",
            estado: r["ESTADO"] || "",
            cco: r["Cco"] || "",
            ubicacion: r["UBICACIÓN"] || "",
            zona: r["ZONA"] || "",
            sucursal: r["Sucursal"] || "",
          }));

        setData(clean);
      },
    });
  }, []);

  // -------------------------------------------------------
  // 🔎 2. Filtro universal
  // -------------------------------------------------------
  const dataFiltrada = useMemo(() => {
    const txt = busqueda.toLowerCase().trim();
    if (!txt) return data;

    return data.filter((x) =>
      [
        x.sucursal,
        x.razonSocial,
        x.local,
        x.direccion,
        x.zona,
        x.ubicacion,
        x.rut,
        x.codigo,
      ]
        .join(" ")
        .toLowerCase()
        .includes(txt)
    );
  }, [busqueda, data]);

  return (
    <div className="p-6 text-white">
      {/* ------------------------------------------------ */}
      {/* HEADER */}
      {/* ------------------------------------------------ */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-amber-400">
          <Building2 className="w-6 h-6" />
          Sucursales – Grupo Mil Sabores
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Listado general de sucursales por Razón Social, Zona y Ubicación.
        </p>
      </header>

      {/* ------------------------------------------------ */}
      {/* BUSCADOR */}
      {/* ------------------------------------------------ */}
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar: sucursal, razón social, zona, ubicación, rut..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-gray-200"
        />
      </div>

      {/* ------------------------------------------------ */}
      {/* TABLA */}
      {/* ------------------------------------------------ */}
      <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow">
        <table className="min-w-full text-sm text-gray-300">
          <thead className="bg-neutral-800 text-amber-400">
            <tr>
              <th className="py-3 px-4 text-left">Sucursal</th>
              <th className="py-3 px-4 text-left">Razón Social</th>
              <th className="py-3 px-4 text-left">Ubicación</th>
              <th className="py-3 px-4 text-left">Zona</th>
            </tr>
          </thead>

          <tbody>
            {dataFiltrada.map((s, idx) => (
              <tr
                key={idx}
                className="border-t border-neutral-800 hover:bg-neutral-800/40 transition"
              >
                <td className="py-2 px-4 font-medium">{s.sucursal}</td>
                <td className="py-2 px-4">{s.razonSocial}</td>
                <td className="py-2 px-4">{s.ubicacion}</td>
                <td className="py-2 px-4">{s.zona}</td>
              </tr>
            ))}

            {dataFiltrada.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="py-4 text-center text-gray-500 italic"
                >
                  No se encontraron resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
