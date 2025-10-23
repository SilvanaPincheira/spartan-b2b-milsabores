"use client";

import React, { useState } from "react";

type ProductoConsumo = {
  codigo: string;
  producto: string;
  unidad: string;
  kilos: number;
  [key: string]: string | number;
};

export default function ConsumosPage() {
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];

  const [productos] = useState<ProductoConsumo[]>([
    {
      codigo: "PT-001",
      producto: "Detergente Industrial 20L",
      unidad: "Kg",
      kilos: 20,
      Enero: 150,
      Febrero: 130,
      Marzo: 140,
      Abril: 125,
      Mayo: 135,
      Junio: 150,
      Julio: 145,
      Agosto: 160,
      Septiembre: 155,
      Octubre: 120,
      Noviembre: 0,
      Diciembre: 0,
    },
    {
      codigo: "PT-002",
      producto: "Desengrasante Alcalino 10L",
      unidad: "Kg",
      kilos: 10,
      Enero: 90,
      Febrero: 95,
      Marzo: 100,
      Abril: 85,
      Mayo: 110,
      Junio: 100,
      Julio: 105,
      Agosto: 115,
      Septiembre: 98,
      Octubre: 90,
      Noviembre: 0,
      Diciembre: 0,
    },
  ]);

  // 🔹 Mes actual dinámico (por ejemplo Octubre 2025)
  const mesActual = "Octubre";

  const calcularPromedio = (p: ProductoConsumo) => {
    const valores = meses
      .map((m) => Number(p[m]) || 0)
      .filter((v) => v > 0);
    if (valores.length === 0) return 0;
    return valores.reduce((a, b) => a + b, 0) / valores.length;
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-10">
      <h1 className="text-3xl font-bold text-amber-400 mb-6">
        📊 Reporte de Consumos — Año 2025
      </h1>

      <section className="bg-neutral-800 rounded-2xl p-6 border border-neutral-700 shadow-lg">
        <h2 className="text-xl font-semibold text-amber-300 mb-4">
          Detalle mensual por producto (Kg)
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-200 border-collapse">
            <thead>
              <tr className="text-amber-400 border-b border-neutral-700 text-center">
                <th className="p-2 text-left">Código</th>
                <th className="p-2 text-left">Producto</th>
                <th className="p-2">Unidad</th>
                {meses.map((m) => (
                  <th key={m} className="p-2 text-center">{m}</th>
                ))}
                <th className="p-2 text-center">Promedio</th>
                <th className="p-2 text-center">Mes Actual</th>
                <th className="p-2 text-center">Desviación</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((p, i) => {
                const promedio = calcularPromedio(p);
                const actual = Number(p[mesActual]) || 0;
                const desviacion = actual - promedio;
                const color =
                  desviacion > 0 ? "text-green-400" :
                  desviacion < 0 ? "text-red-400" :
                  "text-gray-300";

                return (
                  <tr
                    key={i}
                    className="border-b border-neutral-800 hover:bg-neutral-700/50 transition"
                  >
                    <td className="p-2">{p.codigo}</td>
                    <td className="p-2">{p.producto}</td>
                    <td className="p-2 text-center">{p.unidad}</td>

                    {meses.map((m) => {
                      const valor = Number(p[m]) || 0;
                      return (
                        <td key={m} className="p-2 text-center">
                          {valor > 0 ? valor : "-"}
                        </td>
                      );
                    })}

                    <td className="p-2 text-center text-amber-300 font-semibold">
                      {promedio.toFixed(1)}
                    </td>
                    <td className="p-2 text-center">{actual}</td>
                    <td className={`p-2 text-center font-semibold ${color}`}>
                      {desviacion.toFixed(1)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-400 mt-4 text-right">
          *Datos de consumo total por producto en kilogramos (Kg) — actualizados Octubre 2025
        </p>
      </section>
    </div>
  );
}
