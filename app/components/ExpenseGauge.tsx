"use client";
import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

export default function ExpenseGauge() {
  const total = 22_000_000;
  const actual = 11_633_263;
  const porcentaje = Math.round((actual / total) * 100);

  // Colores según el avance
  const fillColor =
    porcentaje < 50
      ? "#f97316" // naranja
      : porcentaje < 80
      ? "#22c55e" // verde
      : "#15803d"; // verde oscuro

  // Datos para el gráfico
  const data = [{ name: "Avance", value: porcentaje, fill: fillColor }];

  return (
    <div className="bg-neutral-950 rounded-2xl p-6 flex flex-col items-center text-center w-full max-w-md mx-auto shadow-lg border border-neutral-800">
      <h2 className="text-lg font-semibold mb-4 text-gray-100">
        Avance presupuesto de Gastos
      </h2>

      <ResponsiveContainer width="100%" height={180}>
        <RadialBarChart
          cx="50%"
          cy="80%"
          innerRadius="70%"
          outerRadius="100%"
          barSize={25}
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            tick={false}
            angleAxisId={0}
          />
          <RadialBar
            background
            clockWise
            dataKey="value"
            cornerRadius={15}
            fill={fillColor}
          />
        </RadialBarChart>
      </ResponsiveContainer>

      <div className="-mt-8">
        <p className="text-5xl font-bold text-white">{porcentaje}%</p>
        <p className="text-sm text-gray-400 mt-1">
          <span className="font-semibold text-gray-100">
            ${actual.toLocaleString("es-CL")}
          </span>{" "}
          de {total.toLocaleString("es-CL")}
        </p>
      </div>
    </div>
  );
}
