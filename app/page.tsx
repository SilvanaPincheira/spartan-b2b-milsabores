"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, FileText, Package, Receipt, BarChart, MapPin } from "lucide-react";
import GaugeChart from "react-gauge-chart";
import ExpenseTable from "./components/ExpenseTable";





export default function Dashboard() {
  const [date, setDate] = useState("");
  const [sucursal, setSucursal] = useState("Las Condes");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString("es-CL", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setDate(formatted);
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
          <span className="text-amber-400 font-semibold">Sucursal {sucursal}</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">{date}</p>
        <p className="text-sm text-gray-500 mt-1 italic">
          Grupo Mil Sabores — Sistema de Gestión
        </p>
      </header>

      {/* TARJETAS KPI */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <KpiCard color="bg-neutral-800 border border-neutral-700" title="Órdenes Pendientes" value="10" icon={FileText} />
        <KpiCard color="bg-neutral-800 border border-neutral-700" title="Facturas Recibidas" value="24" icon={Receipt} />
        <KpiCard color="bg-neutral-800 border border-neutral-700" title="Productos Convenio" value="85" icon={Package} />
        <KpiCard color="bg-neutral-800 border border-neutral-700" title="Total acumulado" value="$120.000.000" icon={BarChart} />
      </section>

     
{/* SECCIÓN ODOMETRO + TOP 10 */}
<section className="flex flex-col lg:flex-row justify-between items-start mt-12 gap-8">
  
  {/* ODOMETRO IZQUIERDA */}
  <div className="flex flex-col items-center bg-neutral-900 rounded-2xl p-6 w-full lg:w-1/2 shadow-md border border-neutral-800">
    <h2 className="text-lg font-semibold mb-3 text-amber-400">
      Avance presupuesto de Gastos
    </h2>
    <GaugeChart
      id="gauge-chart"
      nrOfLevels={20}
      percent={0.53}
      colors={["#dc2626", "#eab308", "#16a34a"]}
      arcWidth={0.3}
      textColor="#ffffff"
    />
    <p className="mt-4 text-3xl font-bold text-amber-400">53%</p>
    <p className="text-sm text-gray-400 mt-1">
      <span className="text-white font-semibold">$11.633.263</span> de 22.000.000
    </p>
  </div>

  {/* TABLA TOP 7 PRODUCTOS */}
  <div className="w-full lg:w-1/2 bg-neutral-900 rounded-2xl p-6 shadow-md border border-neutral-800">
    <h2 className="text-lg font-semibold text-amber-400 mb-4">Productos Top 7</h2>
    <table className="min-w-full text-sm text-gray-300">
      <thead>
        <tr className="text-gray-400 border-b border-neutral-700">
          <th className="text-left pb-2">Producto</th>
          <th className="text-right pb-2">Prom. Mensual (Kg)</th>
          <th className="text-right pb-2">Prom. Mensual ($)</th>
        </tr>
      </thead>
      <tbody>
        {[
          { producto: "Aceite Premium 5L", kg: 240, monto: 3100000 },
          { producto: "Harina Industrial 25Kg", kg: 180, monto: 2100000 },
          { producto: "Cacao 1Kg", kg: 130, monto: 1850000 },
          { producto: "Azúcar Rubia 25Kg", kg: 160, monto: 1780000 },
          { producto: "Margarina 20Kg", kg: 120, monto: 1550000 },
          { producto: "Leche en polvo 25Kg", kg: 90, monto: 1310000 },
          { producto: "Crema Vegetal 10L", kg: 75, monto: 1180000 },
          
        ].map((item, i) => (
          <tr key={i} className="border-b border-neutral-800 hover:bg-neutral-800/40 transition">
            <td className="py-2">{item.producto}</td>
            <td className="py-2 text-right">{item.kg.toLocaleString("es-CL")} kg</td>
            <td className="py-2 text-right">${item.monto.toLocaleString("es-CL")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

</section>



<section className="mt-10">
  <ExpenseTable />
</section>


      {/* ALERTA INFERIOR */}
      <footer className="sticky bottom-0 left-0 right-0 mt-10">
        <div className="flex items-center gap-3 bg-amber-600/90 text-black px-4 py-3 rounded-t-lg shadow-md justify-center">
          <AlertTriangle size={20} className="text-black/80" />
          <span className="font-medium">Tiene 10 órdenes sin factura asociada</span>
        </div>
      </footer>
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
