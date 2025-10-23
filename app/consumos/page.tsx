"use client";

import React from "react";

export default function ConsumosPage() {
  // === PRODUCTOS REALES ===
  const productos = [
    { codigo: "PTS1317405", descripcion: "DISHWASHER CAJA 4X5 KG", convenioKg: 1000 },
    { codigo: "PTS1316405", descripcion: "RINSE AID CAJA 4X5 KG", convenioKg: 1500 },
    { codigo: "PTS1010405", descripcion: "DELIMER CAJA 4X5 LTS", convenioKg: 1000 },
    { codigo: "PTS0305606", descripcion: "ALCOHOL GEL 6X800 ML", convenioKg: 480 },
    { codigo: "PTS1313405", descripcion: "DM-500 CAJA 4X5 KG", convenioKg: 2000 },
    { codigo: "PTS1312405", descripcion: "FOAMING CAUSTIC CLEANER FP CAJA 4X5 KGS", convenioKg: 2000 },
    { codigo: "PTS0312606", descripcion: "T2 HAND CLEANER CAJA 6X800 ML", convenioKg: 480 },
    { codigo: "PTS1304405", descripcion: "CHLORINATED DEGREASER CAJA 4X5 KG", convenioKg: 2000 },
    { codigo: "PTS0105405", descripcion: "CLEAN BY PEROXY CAJA 4X5 KG", convenioKg: 500 },
    { codigo: "PTS0104020", descripcion: "SPARLAC 60 ENV 20 KGS", convenioKg: 500 },
  ];

  // === MESES DEL AÑO ===
  const meses = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
  ];

  // === SIMULAMOS CONSUMOS (DATOS INVENTADOS) ===
  const data = productos.map((p) => {
    const consumosMensuales = Array.from({ length: 12 }, () =>
      Math.round(p.convenioKg * (0.8 + Math.random() * 0.5)) // entre 80% y 130%
    );

    const mesActual = 9; // Octubre (índice 9)
    const consumoActual = consumosMensuales[mesActual];
    const desviacionKg = consumoActual - p.convenioKg;
    const desviacionPct = (consumoActual / p.convenioKg - 1) * 100;

    let color = "bg-green-500"; // ✅ Normal o bajo
    if (consumoActual > p.convenioKg * 1.1) color = "bg-red-500"; // 🔴 sobreconsumo
    else if (consumoActual > p.convenioKg * 0.9) color = "bg-yellow-400"; // 🟡 leve

    return {
      ...p,
      consumosMensuales,
      consumoActual,
      desviacionKg,
      desviacionPct,
      color,
    };
  });

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-10">
      <h1 className="text-3xl font-bold text-amber-400 mb-6">
        📊 Control de Consumos — Grupo Mil Sabores
      </h1>

      <section className="bg-neutral-800 rounded-2xl p-6 border border-neutral-700 shadow-lg">
        <h2 className="text-xl font-semibold text-amber-300 mb-4">
          Desviaciones Mensuales (Kilos)
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-200 border-collapse">
            <thead>
              <tr className="text-amber-400 border-b border-neutral-700 text-center">
                <th className="p-2 text-left">Código</th>
                <th className="p-2 text-left">Descripción</th>
                <th className="p-2 text-right">Consumo Convenido (Kg)</th>
                <th className="p-2 text-right">Consumo Mes Actual</th>
                <th className="p-2 text-right">Desviación (Kg)</th>
                <th className="p-2 text-center">Semáforo</th>
                <th className="p-2 text-center">% Desviación</th>
              </tr>
            </thead>

            <tbody>
              {data.map((p, i) => (
                <tr
                  key={i}
                  className="border-b border-neutral-800 hover:bg-neutral-700/40"
                >
                  <td className="p-2">{p.codigo}</td>
                  <td className="p-2">{p.descripcion}</td>
                  <td className="p-2 text-right">
                    {p.convenioKg.toLocaleString("es-CL")}
                  </td>
                  <td className="p-2 text-right">
                    {p.consumoActual.toLocaleString("es-CL")}
                  </td>
                  <td
                    className={`p-2 text-right ${
                      p.desviacionKg > 0 ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {p.desviacionKg > 0 ? "+" : ""}
                    {p.desviacionKg.toLocaleString("es-CL")}
                  </td>
                  <td className="p-2 text-center">
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${p.color}`}
                    ></span>
                  </td>
                  <td
                    className={`p-2 text-center ${
                      p.desviacionPct > 0 ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {p.desviacionPct > 0 ? "+" : ""}
                    {p.desviacionPct.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-gray-400 text-xs mt-4 italic text-right">
          * Los valores corresponden a consumo estimado para Octubre 2025.
        </p>
      </section>
    </div>
  );
}
