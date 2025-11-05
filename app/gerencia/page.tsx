"use client";

import { useState } from "react";
import { BarChart3, Building2, Users, DollarSign, Circle } from "lucide-react";

export default function GerenciaPage() {
  const [zonaSeleccionada, setZonaSeleccionada] = useState<string | null>(null);

  /* =====================================================
     DATOS BASE: Razones sociales con presupuesto anual
  ===================================================== */
  const razones = [
    { nombre: "Grupo Mil Sabores", presupuesto: 100_000_000 },
    { nombre: "Grupo Los Robles", presupuesto: 90_000_000 },
    { nombre: "Grupo Jalisco", presupuesto: 120_000_000 },
  ];

  /* =====================================================
     COMPRAS SIMULADAS (monto mes, 3 meses y acumulado)
  ===================================================== */
  const compras = [
    // Grupo Mil Sabores (supera presupuesto)
    { razon: "Grupo Mil Sabores", zona: "Zona 1", sucursal: "Tobalaba – Tanta", mes: 14_500_000, ult3m: 37_000_000, acumulado: 41_000_000 },
    { razon: "Grupo Mil Sabores", zona: "Zona 2", sucursal: "Providencia – Panchita", mes: 11_200_000, ult3m: 32_000_000, acumulado: 36_000_000 },
    { razon: "Grupo Mil Sabores", zona: "Zona 3", sucursal: "Huechuraba – La Mar", mes: 10_800_000, ult3m: 31_000_000, acumulado: 35_000_000 },

    // Grupo Los Robles (casi al límite)
    { razon: "Grupo Los Robles", zona: "Zona 4", sucursal: "Las Condes – Osaka", mes: 8_900_000, ult3m: 26_000_000, acumulado: 39_000_000 },
    { razon: "Grupo Los Robles", zona: "Zona 5", sucursal: "Ñuñoa – Los Robles", mes: 9_100_000, ult3m: 27_000_000, acumulado: 39_000_000 },

    // Grupo Jalisco (bajo el presupuesto)
    { razon: "Grupo Jalisco", zona: "Zona 7", sucursal: "La Florida – Jalisco", mes: 7_200_000, ult3m: 20_000_000, acumulado: 38_000_000 },
    { razon: "Grupo Jalisco", zona: "Zona 8", sucursal: "Tobalaba – Jalisco", mes: 6_400_000, ult3m: 18_000_000, acumulado: 37_000_000 },
  ];

  /* =====================================================
     CÁLCULOS GLOBALES
  ===================================================== */
  const totalMes = compras.reduce((a, b) => a + b.mes, 0);
  const total3m = compras.reduce((a, b) => a + b.ult3m, 0);
  const totalAcum = compras.reduce((a, b) => a + b.acumulado, 0);
  const presupuestoGlobal = razones.reduce((a, b) => a + b.presupuesto, 0);
  const avanceGlobal = Math.min((totalAcum / presupuestoGlobal) * 100, 150);

  const colorBarra =
    avanceGlobal >= 100
      ? "bg-red-600"
      : avanceGlobal >= 80
      ? "bg-amber-500"
      : "bg-green-600";

  /* =====================================================
     COMPARATIVO POR RAZÓN SOCIAL
  ===================================================== */
  const totalesPorRazon = razones.map((r) => {
    const grupo = compras.filter((c) => c.razon === r.nombre);
    const mes = grupo.reduce((a, b) => a + b.mes, 0);
    const ult3m = grupo.reduce((a, b) => a + b.ult3m, 0);
    const acumulado = grupo.reduce((a, b) => a + b.acumulado, 0);
    const avance = (acumulado / r.presupuesto) * 100;

    let estadoColor =
      avance >= 100 ? "text-red-500" : avance >= 80 ? "text-amber-400" : "text-green-500";
    let estadoTexto =
      avance >= 100 ? "Sobre Presupuesto" : avance >= 80 ? "Cercano al Tope" : "En Rango";

    return { ...r, mes, ult3m, acumulado, avance, estadoColor, estadoTexto };
  });

  /* =====================================================
     AGRUPAR POR ZONA
  ===================================================== */
  const zonas = Array.from(new Set(compras.map((c) => c.zona))).map((z) => {
    const grupo = compras.filter((c) => c.zona === z);
    const razon = grupo[0].razon;
    const mes = grupo.reduce((a, b) => a + b.mes, 0);
    const ult3m = grupo.reduce((a, b) => a + b.ult3m, 0);
    const acumulado = grupo.reduce((a, b) => a + b.acumulado, 0);

    // Presupuesto zonal (10 zonas por grupo)
    const razonPresupuesto = razones.find((r) => r.nombre === razon)?.presupuesto || 0;
    const presupuestoZona = razonPresupuesto / 10;
    const avanceZona = (acumulado / presupuestoZona) * 100;

    const estadoColor =
      avanceZona >= 100
        ? "text-red-500"
        : avanceZona >= 80
        ? "text-amber-400"
        : "text-green-500";
    const estadoTexto =
      avanceZona >= 100
        ? "Sobre Presupuesto"
        : avanceZona >= 80
        ? "Cercano al Tope"
        : "En Rango";

    return {
      nombre: z,
      razon,
      mes,
      ult3m,
      acumulado,
      presupuestoZona,
      avanceZona,
      estadoColor,
      estadoTexto,
      sucursales: grupo,
    };
  });

  /* =====================================================
     RENDER
  ===================================================== */
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
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <ResumenCard icon={DollarSign} titulo="Compra Mes Actual" valor={totalMes} />
        <ResumenCard icon={Building2} titulo="Últimos 3 Meses" valor={total3m} />
        <ResumenCard icon={Users} titulo="Acumulado Anual" valor={totalAcum} />
      </section>

      {/* BARRA GLOBAL DE AVANCE */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-10 shadow">
        <h2 className="text-lg font-semibold text-amber-400 mb-3">
          Presupuesto Global vs Acumulado
        </h2>
        <div className="w-full bg-neutral-800 rounded-full h-5 overflow-hidden mb-2">
          <div className={`${colorBarra} h-5`} style={{ width: `${avanceGlobal}%` }}></div>
        </div>
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-white">
            ${totalAcum.toLocaleString("es-CL")}
          </span>{" "}
          de ${presupuestoGlobal.toLocaleString("es-CL")} (
          <span className="text-amber-400">{avanceGlobal.toFixed(1)}%</span>)
        </p>
      </div>

      {/* COMPARATIVO POR RAZÓN SOCIAL */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-10">
        <h2 className="text-lg font-semibold text-amber-400 mb-4">
          Comparativo por Razón Social
        </h2>
        <table className="min-w-full text-sm text-gray-300">
          <thead>
            <tr className="text-amber-400 border-b border-neutral-700">
              <th className="text-left py-2">Razón Social</th>
              <th className="text-right py-2">Mes Actual</th>
              <th className="text-right py-2">Últimos 3 Meses</th>
              <th className="text-right py-2">Acumulado</th>
              <th className="text-right py-2">Presupuesto Anual</th>
              <th className="text-center py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {totalesPorRazon.map((r, i) => (
              <tr key={i} className="border-b border-neutral-800 hover:bg-neutral-800/40">
                <td className="py-2">{r.nombre}</td>
                <td className="py-2 text-right">${r.mes.toLocaleString("es-CL")}</td>
                <td className="py-2 text-right">${r.ult3m.toLocaleString("es-CL")}</td>
                <td className="py-2 text-right">${r.acumulado.toLocaleString("es-CL")}</td>
                <td className="py-2 text-right">${r.presupuesto.toLocaleString("es-CL")}</td>
                <td className={`py-2 text-center font-semibold ${r.estadoColor}`}>
                  <div className="flex items-center justify-center gap-2">
                    <Circle size={10} className={r.estadoColor} />
                    {r.estadoTexto}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ANÁLISIS POR ZONA */}
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
              <th className="text-right py-2">Presupuesto Zona</th>
              <th className="text-center py-2">Estado</th>
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
                  <td className="py-2 text-right">${z.presupuestoZona.toLocaleString("es-CL")}</td>
                  <td className={`py-2 text-center font-semibold ${z.estadoColor}`}>
                    <div className="flex items-center justify-center gap-2">
                      <Circle size={10} className={z.estadoColor} />
                      {z.estadoTexto}
                    </div>
                  </td>
                </tr>

                {zonaSeleccionada === z.nombre &&
                  z.sucursales.map((s, j) => (
                    <tr
                      key={j}
                      className="border-b border-neutral-900 bg-neutral-950/40 text-gray-400"
                    >
                      <td className="py-2 pl-8">↳ {s.sucursal}</td>
                      <td className="py-2">{s.razon}</td>
                      <td className="py-2 text-right">${s.mes.toLocaleString("es-CL")}</td>
                      <td className="py-2 text-right">${s.ult3m.toLocaleString("es-CL")}</td>
                      <td className="py-2 text-right">${s.acumulado.toLocaleString("es-CL")}</td>
                      <td className="py-2"></td>
                      <td></td>
                    </tr>
                  ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =====================================================
   COMPONENTE DE CARD GLOBAL
===================================================== */
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

