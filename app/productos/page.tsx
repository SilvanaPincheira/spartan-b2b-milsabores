"use client";

import { Package, Gauge } from "lucide-react";

export default function ProductosPage() {
  // Productos oficiales del convenio 2025
  const productos = [
    { codigo: "PTS1317495", desc: "DISHWASHER CAJA 4X5 KG", precio: 3902, kilos: 1000, promVtaMes: 3901500 },
    { codigo: "PTS1316495", desc: "RINSE AID CAJA 4X5 KG", precio: 3497, kilos: 1500, promVtaMes: 5244750 },
    { codigo: "PTS1010495", desc: "DELIMER CAJA 4X5 LTS", precio: 4577, kilos: 1000, promVtaMes: 4576500 },
    { codigo: "PTS3035666", desc: "ALCOHOL GEL 6X800 ML", precio: 7004, kilos: 480, promVtaMes: 3361920 },
    { codigo: "PTS1313495", desc: "DM-500 CAJA 4X5 KG", precio: 3284, kilos: 2000, promVtaMes: 6568000 },
    { codigo: "PTS1312495", desc: "FOAMING CAUSTIC CLEANER FP CAJA 4X5 KGS", precio: 3709, kilos: 2000, promVtaMes: 7418000 },
    { codigo: "PTS9312606", desc: "T2 HAND CLEANER CAJA 6X800 ML", precio: 6366, kilos: 480, promVtaMes: 3055680 },
    { codigo: "PTS1384045", desc: "CHLORINATED DEGREASER CAJA 4X5 KG", precio: 3178, kilos: 2000, promVtaMes: 6356000 },
    { codigo: "PTS0105495", desc: "CLEAN BY PEROXY CAJA 4X5 KG", precio: 2859, kilos: 500, promVtaMes: 1429500 },
    { codigo: "PTS0104020", desc: "SPARLAC 60 ENV 20 KGS", precio: 7290, kilos: 500, promVtaMes: 3645000 },
  ];

  // Cálculos derivados
  const productosCalculados = productos.map((p) => {
    const kilosLocal = p.kilos / 100;
    const montoLocal = (p.precio * p.kilos) / 100;
    const kilosSucursal = kilosLocal * 7;
    const montoSucursal = montoLocal * 7;
    return { ...p, kilosLocal, montoLocal, kilosSucursal, montoSucursal };
  });

  const totalKilos = productos.reduce((a, p) => a + p.kilos, 0);
  const totalPromVtaMes = productos.reduce((a, p) => a + p.promVtaMes, 0);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold text-amber-400 flex items-center gap-2 mb-6">
        <Package size={22} /> Convenio de Productos – Grupo Mil Sabores 2025
      </h1>

      <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/70 shadow">
        <table className="min-w-full text-sm text-gray-300">
          <thead className="bg-neutral-800 text-amber-400">
            <tr>
              <th className="py-3 px-4 text-left">Código</th>
              <th className="py-3 px-4 text-left">Descripción</th>
              <th className="py-3 px-4 text-right">Precio Vta</th>
              <th className="py-3 px-4 text-right">Kilos Mes</th>
              <th className="py-3 px-4 text-right">Prom Vta Mes</th>
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
                <td className="py-2 px-4 text-right">${p.promVtaMes.toLocaleString("es-CL")}</td>
                <td className="py-2 px-4 text-right text-gray-200">{p.kilosLocal.toLocaleString("es-CL")} kg</td>
                <td className="py-2 px-4 text-right text-gray-200">${p.montoLocal.toLocaleString("es-CL")}</td>
                <td className="py-2 px-4 text-right text-amber-400 font-semibold">{p.kilosSucursal.toLocaleString("es-CL")} kg</td>
                <td className="py-2 px-4 text-right text-amber-400 font-semibold">${p.montoSucursal.toLocaleString("es-CL")}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-neutral-700 text-amber-400 font-bold bg-neutral-800/60">
              <td colSpan={3} className="py-3 px-4 text-right">Totales Globales:</td>
              <td className="py-3 px-4 text-right">{totalKilos.toLocaleString("es-CL")} kg</td>
              <td className="py-3 px-4 text-right">${totalPromVtaMes.toLocaleString("es-CL")}</td>
              <td colSpan={4}></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="text-sm text-gray-400 italic mt-3">
        Valores referenciales actualizados al convenio vigente — año 2025.
      </p>

      <div className="mt-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Gauge className="text-amber-400" size={24} />
          <h2 className="text-lg font-semibold text-amber-400">Presupuesto Base (100 locales)</h2>
        </div>
        <p className="text-right text-gray-300">
          <span className="font-semibold text-white">{totalKilos.toLocaleString("es-CL")} kg</span>{" "}
          —{" "}
          <span className="text-amber-400 font-bold">${totalPromVtaMes.toLocaleString("es-CL")}</span>
        </p>
      </div>
    </div>
  );
}

