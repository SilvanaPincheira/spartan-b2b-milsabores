"use client";

import { Package, Gauge } from "lucide-react";

export default function ProductosPage() {
  const productos = [
    { codigo: "PTS1317495", desc: "DISHWASHER CAJA 4X5 KG", precio: 3902, kilos: 1000 },
    { codigo: "PTS1316495", desc: "RINSE AID CAJA 4X5 KG", precio: 3497, kilos: 800 },
    { codigo: "PTS1010495", desc: "DELIMER CAJA 4X5 LTS", precio: 4577, kilos: 600 },
    { codigo: "PTS3035666", desc: "ALCOHOL GEL 6X800 ML", precio: 7004, kilos: 400 },
    { codigo: "PTS1313495", desc: "DM-500 CAJA 4X5 KG", precio: 3284, kilos: 500 },
    { codigo: "PTS0105495", desc: "CLEAN BY PEROXY 4X5 KG", precio: 2859, kilos: 300 },
  ];

  // Totales globales
  const totalKilos = productos.reduce((a, p) => a + p.kilos, 0);
  const totalMonto = productos.reduce((a, p) => a + p.kilos * p.precio, 0);

  // Cálculos por producto
  const productosCalculados = productos.map((p) => {
    const total$ = p.kilos * p.precio;
    const kilosLocal = p.kilos / 100;
    const montoLocal = kilosLocal * p.precio;
    const kilosSucursal = kilosLocal * 7;
    const montoSucursal = montoLocal * 7;
    return { ...p, total$, kilosLocal, montoLocal, kilosSucursal, montoSucursal };
  });

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold text-amber-400 flex items-center gap-2 mb-6">
        <Package size={22} /> Productos de Convenio – Distribución y Presupuesto
      </h1>

      <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/70 shadow">
        <table className="min-w-full text-sm text-gray-300">
          <thead className="bg-neutral-800 text-amber-400">
            <tr>
              <th className="py-3 px-4 text-left">Código</th>
              <th className="py-3 px-4 text-left">Producto</th>
              <th className="py-3 px-4 text-right">Precio Unitario</th>
              <th className="py-3 px-4 text-right">Total Kilos</th>
              <th className="py-3 px-4 text-right">Total $</th>
              <th className="py-3 px-4 text-right">Kg / Local</th>
              <th className="py-3 px-4 text-right">$ / Local</th>
              <th className="py-3 px-4 text-right">Kg / Sucursal (×7)</th>
              <th className="py-3 px-4 text-right">$ / Sucursal (×7)</th>
            </tr>
          </thead>
          <tbody>
            {productosCalculados.map((p, i) => (
              <tr key={i} className="border-t border-neutral-800 hover:bg-neutral-800/40 transition">
                <td className="py-2 px-4">{p.codigo}</td>
                <td className="py-2 px-4">{p.desc}</td>
                <td className="py-2 px-4 text-right">${p.precio.toLocaleString("es-CL")}</td>
                <td className="py-2 px-4 text-right">{p.kilos.toLocaleString("es-CL")} kg</td>
                <td className="py-2 px-4 text-right">${p.total$.toLocaleString("es-CL")}</td>
                <td className="py-2 px-4 text-right">{p.kilosLocal.toLocaleString("es-CL")} kg</td>
                <td className="py-2 px-4 text-right">${p.montoLocal.toLocaleString("es-CL")}</td>
                <td className="py-2 px-4 text-right text-amber-400 font-semibold">{p.kilosSucursal.toLocaleString("es-CL")} kg</td>
                <td className="py-2 px-4 text-right text-amber-400 font-semibold">
                  ${p.montoSucursal.toLocaleString("es-CL")}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="border-t border-neutral-700 text-amber-400 font-bold bg-neutral-800/60">
              <td colSpan={3} className="py-3 px-4 text-right">
                Totales Globales:
              </td>
              <td className="py-3 px-4 text-right">{totalKilos.toLocaleString("es-CL")} kg</td>
              <td className="py-3 px-4 text-right">${totalMonto.toLocaleString("es-CL")}</td>
              <td colSpan={4}></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Indicador global */}
      <div className="mt-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Gauge className="text-amber-400" size={24} />
          <h2 className="text-lg font-semibold text-amber-400">
            Total Convenio General
          </h2>
        </div>
        <p className="text-right text-gray-300">
          <span className="font-semibold text-white">{totalKilos.toLocaleString("es-CL")} kg</span> —{" "}
          <span className="text-amber-400 font-bold">${totalMonto.toLocaleString("es-CL")}</span>
        </p>
      </div>
    </div>
  );
}

