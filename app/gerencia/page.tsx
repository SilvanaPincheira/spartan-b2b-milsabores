"use client";

import { useState } from "react";
import { BarChart3, Building2, Users, DollarSign } from "lucide-react";

export default function GerenciaPage() {
  const [zonaSeleccionada, setZonaSeleccionada] = useState<string | null>(null);

  // 🔹 Datos simulados base
  const razones = [
    { nombre: "Grupo Mil Sabores", zonas: ["Zona 1", "Zona 2", "Zona 3"] },
    { nombre: "Grupo Los Robles", zonas: ["Zona 4", "Zona 5", "Zona 6"] },
    { nombre: "Grupo Jalisco", zonas: ["Zona 7", "Zona 8", "Zona 9", "Zona 10"] },
  ];

  // 🔹 Compras mensuales simuladas
  const compras = [
    { razon: "Grupo Mil Sabores", zona: "Zona 1", sucursal: "Tobalaba – Tanta", mes: 13500000, ult3m: 37500000, acumulado: 112000000 },
    { razon: "Grupo Mil Sabores", zona: "Zona 2", sucursal: "Providencia – Panchita", mes: 9800000, ult3m: 31000000, acumulado: 98700000 },
    { razon: "Grupo Los Robles", zona: "Zona 4", sucursal: "Tobalaba – Osaka", mes: 8800000, ult3m: 27300000, acumulado: 90400000 },
    { razon: "Grupo Jalisco", zona: "Zona 7", sucursal: "La Florida – Jalisco", mes: 11200000, ult3m: 31200000, acumulado: 97400000 },
    { razon: "Grupo Jalisco", zona: "Zona 7", sucursal: "Tobalaba – Jalisco", mes: 7600000, ult3m: 21800000, acumulado: 78500000 },
    { razon: "Grupo Mil Sabores", zona: "Zona 3", sucursal: "Huechuraba – La Mar", mes: 10200000, ult3m: 29500000, acumulado: 88900000 },
    { razon: "Grupo Los Robles", zona: "Zona 5", sucursal: "Las Condes – Osaka", mes: 9700000, ult3m: 28400000, acumulado: 87200000 },
    { razon: "Grupo Mil Sabores", zona: "Zona 1", sucursal: "Tobalaba – Panchita", mes: 9400000, ult3m: 26000000, acumulado: 81000000 },
  ];

  // 🔹 Totales globales
  const totalMes = compras.reduce((a, b) => a + b.mes, 0);
  const total3m = compras.reduce((a, b) => a + b.ult3m, 0);
  const totalAcum = compras.reduce((a, b) => a + b.acumulado, 0);

  // 🔹 Agrupar por razón social
  const totalesPorRazon = razones.map((r) => {
    const grupo = compras.filter((c) => c.razon === r.nombre);
    return {
      nombre: r.nombre,
      mes: grupo.reduce((a, b) => a + b.mes, 0),
      ult3m: grupo.reduce((a, b) => a + b.ult3m, 0),
      acumulado: grupo.reduce((a, b) => a + b.acumulado, 0),
    };
  });

  // 🔹 Agrupar por zona
  const zonas = Array.from(new Set(compras.map((c) => c.zona))).map((z) => {
    const grupo = compras.filter((c) => c.zona === z);
    return {
      nombre: z,
      razon: grupo[0].razon,
      mes: grupo.reduce((a, b) => a + b.mes, 0),
      ult3m: grupo.reduce((a, b) => a + b.ult3m, 0),
      acumulado: grupo.reduce((a, b) => a + b.acumulado, 0),
      sucursales: grupo,
    };
  });

  return (
    <div className="p-6 text-white">
      {/* ENCABEZADO */}
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 size={28} className="text-amber-500" />
        <h1 className="text-3xl font-bold text-amber-400">
          Análisis de Negocio – Vista Gerencial
        </h1>
      </div>

      {/* RESUMEN GLOBAL */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <ResumenCard icon={DollarSign} titulo="Compra Mes Actual" valor={totalMes} />
        <ResumenCard icon={Building2} titulo="Últimos 3 Meses" valor={total3m} />
        <ResumenCard icon={Users} titulo="Acumulado Anual" valor={totalAcum} />
      </section>

      {/* POR RAZÓN SOCIAL */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-10">
        <h2 className="text-lg font-semibold text-amber-400 mb-4">
          Comparativo por Razón Social
        </h2>
        <table className="min-w-full text-sm text-gray-300">
          <thead>
            <tr className="text-amber-400 border-b border-neutral-700">
              <th className="py-2 text-left">Razón Social</th>
              <th className="py-2 text-right">Mes Actual</th>
              <th className="py-2 text-right">Últimos 3 Meses</th>
              <th className="py-2 text-right">Acumulado Anual</th>
            </tr>
          </thead>
          <tbody>
            {totalesPorRazon.map((r, i) => (
              <tr
                key={i}
                className="border-b border-neutral-800 hover:bg-neutral-800/40 cursor-pointer"
              >
                <td className="py-2">{r.nombre}</td>
                <td className="py-2 text-right">${r.mes.toLocaleString("es-CL")}</td>
                <td className="py-2 text-right">${r.ult3m.toLocaleString("es-CL")}</td>
                <td className="py-2 text-right">${r.acumulado.toLocaleString("es-CL")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* POR ZONA */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-10">
        <h2 className="text-lg font-semibold text-amber-400 mb-4">Análisis por Zona</h2>
        <table className="min-w-full text-sm text-gray-300">
          <thead>
            <tr className="text-amber-400 border-b border-neutral-700">
              <th className="text-left py-2">Zona</th>
              <th className="text-left py-2">Razón Social</th>
              <th className="text-right py-2">Mes Actual</th>
              <th className="text-right py-2">Últimos 3 Meses</th>
              <th className="text-right py-2">Acumulado</th>
            </tr>
          </thead>
          <tbody>
            {zonas.map((z, i) => (
              <>
                <tr
                  key={i}
                  onClick={() =>
                    setZonaSeleccionada(zonaSeleccionada === z.nombre ? null : z.nombre)
                  }
                  className="border-b border-neutral-800 hover:bg-neutral-800/40 cursor-pointer"
                >
                  <td className="py-2 font-medium text-amber-400">{z.nombre}</td>
                  <td className="py-2">{z.razon}</td>
                  <td className="py-2 text-right">${z.mes.toLocaleString("es-CL")}</td>
                  <td className="py-2 text-right">${z.ult3m.toLocaleString("es-CL")}</td>
                  <td className="py-2 text-right">${z.acumulado.toLocaleString("es-CL")}</td>
                </tr>

                {zonaSeleccionada === z.nombre && (
                  <>
                    {z.sucursales.map((s, j) => (
                      <tr
                        key={j}
                        className="border-b border-neutral-900 bg-neutral-950/40 text-gray-400"
                      >
                        <td className="py-2 pl-8">↳ {s.sucursal}</td>
                        <td className="py-2">{s.razon}</td>
                        <td className="py-2 text-right">${s.mes.toLocaleString("es-CL")}</td>
                        <td className="py-2 text-right">${s.ult3m.toLocaleString("es-CL")}</td>
                        <td className="py-2 text-right">${s.acumulado.toLocaleString("es-CL")}</td>
                      </tr>
                    ))}
                  </>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// CARD GLOBAL
function ResumenCard({ icon: Icon, titulo, valor }: any) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col items-start justify-between hover:bg-neutral-800/70 transition">
      <div className="flex items-center gap-3 mb-3 text-gray-200">
        <Icon size={22} className="text-amber-400" />
        <h3 className="text-base font-semibold">{titulo}</h3>
      </div>
      <span className="text-2xl font-bold text-amber-400">
        ${valor.toLocaleString("es-CL")}
      </span>
    </div>
  );
}
