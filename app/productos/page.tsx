"use client";

import React from "react";

interface Producto {
  codigo: string;
  descripcion: string;
  precio: number;
  kilosMes: number;
  promVtaMes: number;
}

export default function ProductosPage() {
  const productos: Producto[] = [
    { codigo: "PTS1317405", descripcion: "DISHWASHER CAJA 4X5 KG", precio: 3902, kilosMes: 1000, promVtaMes: 3901500 },
    { codigo: "PTS1316405", descripcion: "RINSE AID CAJA 4X5 KG", precio: 3497, kilosMes: 1500, promVtaMes: 5244750 },
    { codigo: "PTS1010405", descripcion: "DELIMER CAJA 4X5 LTS", precio: 4577, kilosMes: 1000, promVtaMes: 4576500 },
    { codigo: "PTS0305606", descripcion: "ALCOHOL GEL 6X800 ML", precio: 7004, kilosMes: 480, promVtaMes: 3361920 },
    { codigo: "PTS1313405", descripcion: "DM-500 CAJA 4X5 KG", precio: 3284, kilosMes: 2000, promVtaMes: 6568000 },
    { codigo: "PTS1312405", descripcion: "FOAMING CAUSTIC CLEANER FP CAJA 4X5 KGS", precio: 3709, kilosMes: 2000, promVtaMes: 7418000 },
    { codigo: "PTS0312606", descripcion: "T2 HAND CLEANER CAJA 6X800 ML", precio: 6366, kilosMes: 480, promVtaMes: 3055680 },
    { codigo: "PTS1304405", descripcion: "CHLORINATED DEGREASER CAJA 4X5 KG", precio: 3178, kilosMes: 2000, promVtaMes: 6356000 },
    { codigo: "PTS0105405", descripcion: "CLEAN BY PEROXY CAJA 4X5 KG", precio: 2859, kilosMes: 500, promVtaMes: 1429500 },
    { codigo: "PTS0104020", descripcion: "SPARLAC 60 ENV 20 KGS", precio: 7290, kilosMes: 500, promVtaMes: 3645000 },
  ];

  return (
    <section className="p-8 bg-neutral-950 min-h-screen text-gray-200">
      <h1 className="text-2xl font-bold text-amber-400 mb-6">
        Convenio de Productos — Grupo Mil Sabores
      </h1>

      <div className="overflow-x-auto rounded-xl border border-gray-800 shadow-lg">
        <table className="min-w-full text-sm text-gray-300">
          <thead className="bg-neutral-900 text-amber-400">
            <tr>
              <th className="px-4 py-3 text-left">Código</th>
              <th className="px-4 py-3 text-left">Descripción</th>
              <th className="px-4 py-3 text-right">Precio Vta</th>
              <th className="px-4 py-3 text-right">Kilos Mes</th>
              <th className="px-4 py-3 text-right">Prom Vta Mes</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr
                key={p.codigo}
                className="border-t border-gray-800 hover:bg-neutral-900 transition"
              >
                <td className="px-4 py-2 font-mono text-gray-100">{p.codigo}</td>
                <td className="px-4 py-2">{p.descripcion}</td>
                <td className="px-4 py-2 text-right">
                  ${p.precio.toLocaleString("es-CL")}
                </td>
                <td className="px-4 py-2 text-right">
                  {p.kilosMes.toLocaleString("es-CL")}
                </td>
                <td className="px-4 py-2 text-right">
                  ${p.promVtaMes.toLocaleString("es-CL")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-500 mt-4 italic">
        Valores referenciales actualizados al convenio vigente — año 2025.
      </p>
    </section>
  );
}
