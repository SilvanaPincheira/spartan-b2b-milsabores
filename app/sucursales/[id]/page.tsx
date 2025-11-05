"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  FileText,
  Receipt,
  Package,
  Gauge,
} from "lucide-react";

export default function SucursalDetalle() {
  const router = useRouter();
  const { id } = useParams();

  const sucursales = [
    {
      id: "1",
      nombre: "Tobalaba – Local 1 – Tanta",
      grupo: "Grupo Los Robles",
      rut: "76.854.879-5",
      direccion: "Av. El Valle 541, Huechuraba",
      totalConsumo: 8700000,
      facturas: 21,
      ordenes: 3,
      productos: 16,
      topeMensual: 10000000,
    },
    {
      id: "2",
      nombre: "Tobalaba – Local 2 – Osaka",
      grupo: "Grupo Los Robles",
      rut: "76.854.879-5",
      direccion: "Av. El Valle 541, Huechuraba",
      totalConsumo: 9200000,
      facturas: 24,
      ordenes: 2,
      productos: 14,
      topeMensual: 11000000,
    },
    {
      id: "3",
      nombre: "Tobalaba – Local 3 – Panchita",
      grupo: "Grupo Mil Sabores",
      rut: "78.523.412-8",
      direccion: "Av. Lo Bascuñán 287, Santiago",
      totalConsumo: 11300000,
      facturas: 30,
      ordenes: 5,
      productos: 20,
      topeMensual: 12000000,
    },
    {
      id: "4",
      nombre: "Tobalaba – Local 4 – Jalisco",
      grupo: "Grupo Mil Sabores",
      rut: "78.523.412-8",
      direccion: "Av. Lo Bascuñán 287, Santiago",
      totalConsumo: 8600000,
      facturas: 25,
      ordenes: 2,
      productos: 15,
      topeMensual: 10000000,
    },
  ];

  const sucursal = sucursales.find((s) => s.id === id);
  if (!sucursal) {
    return (
      <div className="p-6 text-gray-300">
        <p>No se encontró la sucursal solicitada.</p>
      </div>
    );
  }

  // --- Historial de pedidos
  const historial = [
    { mes: "Enero", pedidos: 18 },
    { mes: "Febrero", pedidos: 20 },
    { mes: "Marzo", pedidos: 22 },
    { mes: "Abril", pedidos: 19 },
    { mes: "Mayo", pedidos: 23 },
    { mes: "Junio", pedidos: 25 },
    { mes: "Julio", pedidos: 28 },
    { mes: "Agosto", pedidos: 27 },
    { mes: "Septiembre", pedidos: 30 },
    { mes: "Octubre", pedidos: 31 },
  ];

  const ultimos3 = historial.slice(-3).map((h) => h.pedidos);
  const sugeridoUnidades = Math.round(
    ultimos3.reduce((a, b) => a + b, 0) / ultimos3.length
  );
  const sugeridoPesos = Math.round((sugeridoUnidades * 350000) / 10);
  const porcentaje = Math.min(
    (sucursal.totalConsumo / sucursal.topeMensual) * 100,
    100
  );

  const color =
    porcentaje < 70
      ? "bg-red-600"
      : porcentaje < 90
      ? "bg-amber-500"
      : "bg-green-600";

  return (
    <div className="p-6 text-white">
      {/* ENCABEZADO */}
      <button
        onClick={() => router.push("/sucursales")}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-amber-400 transition mb-4"
      >
        <ArrowLeft size={16} /> Volver a Sucursales
      </button>

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          {sucursal.nombre}
        </h1>
        <p className="text-gray-400 text-sm">
          {sucursal.grupo} – RUT {sucursal.rut}
        </p>
        <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
          <MapPin size={14} className="text-amber-400" /> {sucursal.direccion}
        </p>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard
          icon={Gauge}
          titulo="Consumo Total"
          valor={`$${sucursal.totalConsumo.toLocaleString("es-CL")}`}
        />
        <KpiCard icon={Receipt} titulo="Facturas" valor={sucursal.facturas} />
        <KpiCard
          icon={FileText}
          titulo="Órdenes Pendientes"
          valor={sucursal.ordenes}
        />
        <KpiCard
          icon={Package}
          titulo="Productos Activos"
          valor={sucursal.productos}
        />
      </section>

      {/* AVANCE DE CONSUMO */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-8 shadow-lg">
        <h2 className="text-lg font-semibold text-amber-400 mb-2">
          Avance de Consumo Mensual
        </h2>
        <div className="w-full bg-neutral-800 rounded-full h-4 overflow-hidden mb-3">
          <div
            className={`${color} h-4 transition-all duration-500`}
            style={{ width: `${porcentaje}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-white">
            ${sucursal.totalConsumo.toLocaleString("es-CL")}
          </span>{" "}
          de ${sucursal.topeMensual.toLocaleString("es-CL")} (
          <span className="text-amber-400">{porcentaje.toFixed(1)}%</span>)
        </p>
      </div>

      {/* HISTORIAL DE PEDIDOS */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-lg p-6">
        <h2 className="text-lg font-semibold text-amber-400 mb-3">
          Historial de Pedidos (Enero–Octubre)
        </h2>
        <table className="min-w-full text-sm text-gray-300">
          <thead>
            <tr className="text-amber-400 border-b border-neutral-700">
              <th className="text-left py-2">Mes</th>
              <th className="text-right py-2">Pedidos</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((item, i) => (
              <tr
                key={i}
                className="border-b border-neutral-800 hover:bg-neutral-800/40 transition"
              >
                <td className="py-2">{item.mes}</td>
                <td className="py-2 text-right">{item.pedidos}</td>
              </tr>
            ))}
            <tr className="bg-neutral-800/60 font-semibold text-amber-400 border-t border-neutral-700">
              <td className="py-2">Noviembre (Sugerido)</td>
              <td className="py-2 text-right">{sugeridoUnidades}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4 text-sm text-gray-400">
          <p>
            Sugerido de noviembre:{" "}
            <span className="text-white font-semibold">
              {sugeridoUnidades} pedidos
            </span>{" "}
            (~${sugeridoPesos.toLocaleString("es-CL")})
          </p>
          <p className="text-xs italic mt-1">
            Calculado como promedio de los últimos 3 meses (Ago–Oct).
          </p>
        </div>
      </div>

      {/* RESUMEN DE COMPRAS MENSUAL (DEMO VISUAL) */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-lg p-6 mt-8">
        <h2 className="text-lg font-semibold text-amber-400 mb-3">
          Resumen de Compras — Octubre 2025
        </h2>

        {/* Totales resumidos */}
        <div className="flex flex-col sm:flex-row justify-between mb-4">
          <p className="text-gray-300">
            <span className="text-white font-semibold">Total Pedidos:</span> 31
          </p>
          <p className="text-gray-300">
            <span className="text-white font-semibold">Total Kilos:</span> 4.980
            kg
          </p>
          <p className="text-gray-300">
            <span className="text-white font-semibold">Monto Total:</span>{" "}
            $33.186.350
          </p>
        </div>

        {/* Tabla de productos del convenio */}
        <table className="min-w-full text-sm text-gray-300">
          <thead>
            <tr className="text-amber-400 border-b border-neutral-700">
              <th className="text-left py-2">Código</th>
              <th className="text-left py-2">Descripción</th>
              <th className="text-right py-2">Precio Vta</th>
              <th className="text-right py-2">Kilos Mes</th>
              <th className="text-right py-2">Prom Vta Mes</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["PTS1317495", "DISHWASHER CAJA 4X5 KG", 3902, 1000, 3901500],
              ["PTS1316495", "RINSE AID CAJA 4X5 KG", 3497, 1500, 5244750],
              ["PTS1010495", "DELIMER CAJA 4X5 LTS", 4577, 1000, 4576500],
              ["PTS3035666", "ALCOHOL GEL 6X800 ML", 7004, 480, 3361920],
              ["PTS1313495", "DM-500 CAJA 4X5 KG", 3284, 2000, 6568000],
              ["PTS1312495", "FOAMING CAUSTIC CLEANER FP CAJA 4X5 KGS", 3709, 2000, 7418000],
              ["PTS9312606", "T2 HAND CLEANER CAJA 6X800 ML", 6366, 480, 3055680],
              ["PTS1384045", "CHLORINATED DEGREASER CAJA 4X5 KG", 3178, 2000, 6356000],
              ["PTS0105495", "CLEAN BY PEROXY CAJA 4X5 KG", 2859, 500, 1429500],
              ["PTS0104020", "SPARLAC 60 ENV 20 KGS", 7290, 500, 3645000],
            ].map(([codigo, desc, precio, kilos, total], i) => (
              <tr
                key={i}
                className="border-b border-neutral-800 hover:bg-neutral-800/40 transition"
              >
                <td className="py-2">{codigo}</td>
                <td className="py-2">{desc}</td>
                <td className="py-2 text-right">${precio.toLocaleString("es-CL")}</td>
                <td className="py-2 text-right">{kilos.toLocaleString("es-CL")}</td>
                <td className="py-2 text-right">${total.toLocaleString("es-CL")}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="text-xs text-gray-500 mt-3 italic">
          Valores de referencia actualizados al convenio vigente — año 2025.
        </p>
      </div>
    </div>
  );
}

function KpiCard({ icon: Icon, titulo, valor }: any) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between hover:bg-neutral-800/70 transition">
      <div className="flex items-center gap-3 mb-2">
        <Icon size={22} className="text-amber-400" />
        <h3 className="text-base font-semibold">{titulo}</h3>
      </div>
      <span className="text-2xl font-bold text-amber-400">{valor}</span>
    </div>
  );
}
