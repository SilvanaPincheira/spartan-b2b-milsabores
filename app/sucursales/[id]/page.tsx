"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  FileText,
  Receipt,
  Package,
  Gauge,
  Calendar,
  PlusCircle,
} from "lucide-react";

export default function SucursalDetalle() {
  const router = useRouter();
  const { id } = useParams();

  // 🔹 Hooks
  const [mostrarTodo, setMostrarTodo] = useState(false);
  const [mesSeleccionado, setMesSeleccionado] = useState("Octubre");

  // 🔹 Datos base
  const sucursales = [
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
  ];

  const sucursal = sucursales.find((s) => s.id === id);
  if (!sucursal)
    return <div className="p-6 text-gray-400">Sucursal no encontrada.</div>;

  // 🔹 Historial de pedidos (6 meses)
  const historial = [
    { mes: "Mayo", pedidos: 7 },
    { mes: "Junio", pedidos: 5 },
    { mes: "Julio", pedidos: 8 },
    { mes: "Agosto", pedidos: 6 },
    { mes: "Septiembre", pedidos: 5 },
    { mes: "Octubre", pedidos: 9 },
  ];
  const mesesMostrados = mostrarTodo ? historial : historial.slice(-3);

  // 🔹 Productos convenio
  const productosConvenio = [
    { codigo: "PTS1317495", desc: "DISHWASHER CAJA 4X5 KG", precio: 3902 },
    { codigo: "PTS1316495", desc: "RINSE AID CAJA 4X5 KG", precio: 3497 },
    { codigo: "PTS1010495", desc: "DELIMER CAJA 4X5 LTS", precio: 4577 },
    { codigo: "PTS3035666", desc: "ALCOHOL GEL 6X800 ML", precio: 7004 },
    { codigo: "PTS1313495", desc: "DM-500 CAJA 4X5 KG", precio: 3284 },
    { codigo: "PTS1312495", desc: "FOAMING CAUSTIC CLEANER FP CAJA 4X5 KGS", precio: 3709 },
    { codigo: "PTS9312606", desc: "T2 HAND CLEANER CAJA 6X800 ML", precio: 6366 },
    { codigo: "PTS1384045", desc: "CHLORINATED DEGREASER CAJA 4X5 KG", precio: 3178 },
    { codigo: "PTS0105495", desc: "CLEAN BY PEROXY CAJA 4X5 KG", precio: 2859 },
    { codigo: "PTS0104020", desc: "SPARLAC 60 ENV 20 KGS", precio: 7290 },
  ];

  // 🔹 Función para generar consumo mensual variable
  const generarMes = (productos: any[]) => {
    const cantidadProductos = Math.floor(Math.random() * 6) + 4;
    const seleccionados = [...productos].sort(() => 0.5 - Math.random()).slice(0, cantidadProductos);

    return seleccionados.map((p) => {
      const kilos = Math.floor(Math.random() * 1700) + 300;
      const monto = kilos * p.precio;
      return { ...p, kilos, monto };
    });
  };

  // 🔹 Detalle de los últimos 6 meses
  const pedidosMensuales: Record<string, any[]> = {
    Mayo: generarMes(productosConvenio),
    Junio: generarMes(productosConvenio),
    Julio: generarMes(productosConvenio),
    Agosto: generarMes(productosConvenio),
    Septiembre: generarMes(productosConvenio),
    Octubre: generarMes(productosConvenio),
  };

  // 🔹 Cálculo del pedido sugerido (promedio por producto de los últimos 3 meses)
  const mesesReferencia = ["Agosto", "Septiembre", "Octubre"];
  const sugerido: any[] = [];

  productosConvenio.forEach((prod) => {
    const consumos = mesesReferencia.map(
      (mes) =>
        pedidosMensuales[mes].find((p) => p.codigo === prod.codigo)?.kilos || 0
    );
    const promedioKilos =
      consumos.reduce((a, b) => a + b, 0) / consumos.filter((v) => v > 0).length || 0;
    if (promedioKilos > 0) {
      sugerido.push({
        ...prod,
        promedioKilos: Math.round(promedioKilos),
        monto: Math.round(promedioKilos * prod.precio),
      });
    }
  });

  const totalSugerido = sugerido.reduce((acc, p) => acc + p.monto, 0);

  // 🔹 Avance consumo
  const porcentaje = Math.min((sucursal.totalConsumo / sucursal.topeMensual) * 100, 100);
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
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-amber-400 mb-4"
      >
        <ArrowLeft size={16} /> Volver a Sucursales
      </button>

      <h1 className="text-2xl font-bold text-amber-400 mb-1">{sucursal.nombre}</h1>
      <p className="text-sm text-gray-400 flex items-center gap-1 mb-6">
        <MapPin size={14} className="text-amber-400" /> {sucursal.direccion}
      </p>

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard icon={Gauge} titulo="Consumo Total" valor={`$${sucursal.totalConsumo.toLocaleString("es-CL")}`} />
        <KpiCard icon={Receipt} titulo="Facturas" valor={sucursal.facturas} />
        <KpiCard icon={FileText} titulo="Órdenes" valor={sucursal.ordenes} />
        <KpiCard icon={Package} titulo="Productos" valor={sucursal.productos} />
      </section>

      {/* BARRA DE AVANCE */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-8 shadow">
        <h2 className="text-lg font-semibold text-amber-400 mb-2">Avance de Consumo</h2>
        <div className="w-full bg-neutral-800 rounded-full h-4 mb-2 overflow-hidden">
          <div className={`${color} h-4`} style={{ width: `${porcentaje}%` }}></div>
        </div>
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-white">
            ${sucursal.totalConsumo.toLocaleString("es-CL")}
          </span>{" "}
          de ${sucursal.topeMensual.toLocaleString("es-CL")} (
          <span className="text-amber-400">{porcentaje.toFixed(1)}%</span>)
        </p>
      </div>

      {/* HISTORIAL */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-amber-400 mb-3">
          Historial de Pedidos (6 meses)
        </h2>
        <table className="min-w-full text-sm text-gray-300">
          <thead>
            <tr className="text-amber-400 border-b border-neutral-700">
              <th className="text-left py-2">Mes</th>
              <th className="text-right py-2">Pedidos</th>
            </tr>
          </thead>
          <tbody>
            {mesesMostrados.map((m, i) => (
              <tr key={i} className="border-b border-neutral-800 hover:bg-neutral-800/40">
                <td className="py-2">{m.mes}</td>
                <td className="py-2 text-right">{m.pedidos}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => setMostrarTodo(!mostrarTodo)}
          className="mt-3 text-sm text-amber-400 hover:underline"
        >
          {mostrarTodo ? "Ver menos" : "Mostrar más"}
        </button>
      </div>

      {/* DETALLE DE MES */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-amber-400 mb-3 flex items-center gap-2">
          <Calendar size={18} /> Detalle de Consumo — {mesSeleccionado}
        </h2>

        <div className="flex justify-end mb-4">
          <select
            value={mesSeleccionado}
            onChange={(e) => setMesSeleccionado(e.target.value)}
            className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1 text-sm text-gray-200"
          >
            {Object.keys(pedidosMensuales).map((mes) => (
              <option key={mes} value={mes}>{mes}</option>
            ))}
          </select>
        </div>

        <table className="min-w-full text-sm text-gray-300">
          <thead>
            <tr className="text-amber-400 border-b border-neutral-700">
              <th className="text-left py-2">Código</th>
              <th className="text-left py-2">Producto</th>
              <th className="text-right py-2">Kilos</th>
              <th className="text-right py-2">Monto</th>
            </tr>
          </thead>
          <tbody>
            {pedidosMensuales[mesSeleccionado].map((p, i) => (
              <tr key={i} className="border-b border-neutral-800 hover:bg-neutral-800/40">
                <td className="py-2">{p.codigo}</td>
                <td className="py-2">{p.desc}</td>
                <td className="py-2 text-right">{p.kilos.toLocaleString("es-CL")} kg</td>
                <td className="py-2 text-right">${p.monto.toLocaleString("es-CL")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PEDIDO SUGERIDO */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-amber-400 mb-3">
          Pedido Sugerido — Noviembre 2025
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          Basado en el promedio de consumo de los últimos 3 meses (Agosto, Septiembre, Octubre)
        </p>

        <table className="min-w-full text-sm text-gray-300 mb-4">
          <thead>
            <tr className="text-amber-400 border-b border-neutral-700">
              <th className="text-left py-2">Código</th>
              <th className="text-left py-2">Producto</th>
              <th className="text-right py-2">Promedio Kg</th>
              <th className="text-right py-2">Precio Unit.</th>
              <th className="text-right py-2">Monto Sugerido</th>
            </tr>
          </thead>
          <tbody>
            {sugerido.map((p, i) => (
              <tr key={i} className="border-b border-neutral-800 hover:bg-neutral-800/40">
                <td className="py-2">{p.codigo}</td>
                <td className="py-2">{p.desc}</td>
                <td className="py-2 text-right">{p.promedioKilos.toLocaleString("es-CL")} kg</td>
                <td className="py-2 text-right">${p.precio.toLocaleString("es-CL")}</td>
                <td className="py-2 text-right">${p.monto.toLocaleString("es-CL")}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="text-right font-semibold text-white">
          Total sugerido: <span className="text-amber-400">${totalSugerido.toLocaleString("es-CL")}</span>
        </p>

        <button
          onClick={() => alert("Función demo: Crear pedido sugerido")}
          className="mt-5 flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold px-4 py-2 rounded-lg transition"
        >
          <PlusCircle size={18} />
          Crear pedido sugerido
        </button>
      </div>
    </div>
  );
}

// KPI CARD
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
