"use client";

import React from "react";

const expenses = [
  { fecha: "12/10/2025", folio: "1055", oc: "2057", categoria: "Químicos", monto: 1320000 },
  { fecha: "27/10/2025", folio: "1166", oc: "1166", categoria: "Accesorios", monto: 880000 },
  { fecha: "27/10/2025", folio: "1683", oc: "1635", categoria: "Máquinas", monto: 1315020 },
  { fecha: "30/10/2025", folio: "1695", oc: "1700", categoria: "Quimicos", monto: 4315020 },
];

export default function ExpenseTable() {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-4 mt-10 shadow-md">
      <table className="min-w-full text-sm text-gray-200">
        <thead className="text-left border-b border-neutral-700 text-gray-400">
          <tr>
            <th className="pb-2">Fecha</th>
            <th className="pb-2">Folio</th>
            <th className="pb-2">N° OC</th>
            <th className="pb-2">Categoría</th>
            <th className="pb-2 text-right">Monto Total</th>
            <th className="pb-2 text-center">Detalle</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e, i) => (
            <tr key={i} className="border-t border-neutral-800 hover:bg-neutral-800/50 transition">
              <td className="py-3">{e.fecha}</td>
              <td>{e.folio}</td>
              <td>{e.oc}</td>
              <td>{e.categoria}</td>
              <td className="text-right font-semibold text-gray-100">
                ${e.monto.toLocaleString("es-CL")}
              </td>
              <td className="text-center">
                <button
                  className={`px-3 py-1 rounded-lg text-sm font-medium text-black ${
                    i === 2
                      ? "bg-pink-600 hover:bg-pink-500"
                      : "bg-amber-500 hover:bg-amber-400"
                  } transition`}
                >
                  Ver detalle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
