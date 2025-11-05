"use client";

import { useState, useEffect } from "react";
import {
  AlertTriangle,
  FileText,
  Package,
  Receipt,
  BarChart,
  MapPin,
} from "lucide-react";
import GaugeChart from "react-gauge-chart";

export default function Dashboard() {
  const [date, setDate] = useState("");
  const [sucursal, setSucursal] = useState("Las Condes");
  const [showAviso, setShowAviso] = useState(false);

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString("es-CL", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setDate(formatted);

    // 🔔 Simula verificación de pedido semanal pendiente
    const pedidoPendiente = true; // Cambia a false si no debe aparecer
    if (pedidoPendiente) {
      const timer = setTimeout(() => setShowAviso(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-800 text-white p-6 flex flex-col justify-between">
      {/* Título principal */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-amber-500 tracking-wide">
          Spartan B2B
        </h1>
        <p className="text-gray-400 text-sm italic mt-1">
          Plataforma de Gestión – Grupo Mil Sabores
        </p>
      </div>

      {/* ENCABEZADO */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <MapPin size={22} className="text-amber-500" />
          Bienvenido,{" "}
          <span className="text-amber-400 font-semibold">
            Sucursal {sucursal}
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">{date}</p>
        <p className="text-sm text-gray-500 mt-1 italic">
          Grupo Mil Sabores — Sistema de Gestión
        </p>
      </header>

      {/* TARJETAS KPI */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <KpiCard
          color="bg-neutral-800 border border-neutral-700"
          title="Órdenes Pendientes"
          value="3"
          icon={FileText}
        />
        <KpiCard
          color="bg-neutral-800 border border-neutral-700"
          title="Facturas Recibidas"
          value="24"
          icon={Receipt}
        />
        <KpiCard
          color="bg-neutral-800 border border-neutral-700"
          title="Productos Convenio"
          value="10"
          icon={Package}
        />
        <KpiCard
          color="bg-neutral-800 border border-neutral-700"
          title="Total acumulado 2025"
          value="$120.000.000"
          icon={BarChart}
        />
      </section>

      {/* CONTENIDO CENTRAL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mt-8">
        {/* ODOMETRO */}
        <div className="bg-neutral-900 rounded-2xl p-6 flex flex-col items-center justify-center shadow-md">
          <h2 className="text-lg font-semibold mb-3 text-amber-400">
            Avance presupuesto de Consumo Mensual
          </h2>
          <div className="scale-[0.8] w-full max-w-[400px] mx-auto">
            <GaugeChart
              id="gauge-chart"
              nrOfLevels={20}
              percent={0.53}
              colors={["#dc2626", "#eab308", "#16a34a"]}
              arcWidth={0.25}
              textColor="#ffffff"
              animate={false}
            />
          </div>
          <p className="mt-2 text-3xl font-bold text-amber-400">53%</p>
          <p className="text-sm text-gray-400 mt-1">
            <span className="font-semibold text-white">$11.633.263</span> de
            22.000.000
          </p>
        </div>

        {/* TOP 10 PRODUCTOS */}
        <div className="bg-neutral-900 rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-semibold text-amber-400 mb-3">
            Consumo Actual
          </h2>
          <table className="min-w-full text-sm text-gray-300">
            <thead>
              <tr className="text-amber-400 border-b border-neutral-700">
                <th className="pb-2 text-left">Producto</th>
                <th className="pb-2 text-right">consumo Tope Mensual (Kg)</th>
                <th className="pb-2 text-right">Consumo Actual (Kg)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["DISHWASHER CAJA 4X5 KG", "1000 kg", "836 kg"],
                ["RINSE AID CAJA 4X5 KG", "1500 kg", "1936 kg"],
                ["DELIMER CAJA 4X5 LTS", "1000 kg", "921 kg"],
                ["ALCOHOL GEL 6X800 ML", "480 kg", "389 kg"],
                ["DM-500 CAJA 4X5 KG", "2000 kg", "1812 kg"],
              ].map(([producto, kg, monto], i) => (
                <tr
                  key={i}
                  className="border-b border-neutral-800 hover:bg-neutral-800/40"
                >
                  <td className="py-2">{producto}</td>
                  <td className="py-2 text-right">{kg}</td>
                  <td className="py-2 text-right">{monto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ALERTA INFERIOR */}
      <footer className="sticky bottom-0 left-0 right-0 mt-10">
        <div className="flex items-center gap-3 bg-amber-600/90 text-black px-4 py-3 rounded-t-lg shadow-md justify-center">
          <AlertTriangle size={20} className="text-black/80" />
          <span className="font-medium">
            Tiene 10 órdenes sin factura asociada
          </span>
        </div>
      </footer>

      {/* ⚠️ MENSAJE FLOTANTE */}
      {showAviso && (
        <div className="fixed bottom-6 right-6 bg-amber-500 text-black font-medium px-5 py-3 rounded-xl shadow-lg border border-amber-300 flex items-center gap-2 animate-bounce z-50">
          <AlertTriangle size={20} className="text-black/80" />
          <span>
            Importante: Esta sucursal no ha realizado su pedido semanal.{" "}
            <button
              onClick={() => {
                window.location.href = "/sucursales/3";
                setShowAviso(false);
              }}
              className="underline font-semibold ml-1"
            >
              Revisar pedido sugerido
            </button>
          </span>
          <button
            onClick={() => setShowAviso(false)}
            className="ml-3 text-black font-bold hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

/* COMPONENTE KPI */
function KpiCard({ color, title, value, icon: Icon }: any) {
  return (
    <div
      className={`flex flex-col items-start justify-between p-5 rounded-2xl shadow-sm hover:shadow-md ${color} transition-transform transform hover:scale-[1.01]`}
    >
      <div className="flex items-center gap-3 mb-3 text-gray-200">
        <Icon size={22} className="opacity-80 text-amber-400" />
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <span className="text-3xl font-bold text-amber-400">{value}</span>
    </div>
  );
}

