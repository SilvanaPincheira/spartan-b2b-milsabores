"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, FileText, Receipt, Package, Gauge } from "lucide-react";

export default function SucursalDetalle() {
  const router = useRouter();
  const { id } = useParams();

  // Datos simulados — puedes reemplazar por datos reales más adelante
  const sucursales = [
    { id: "1", nombre: "Tobalaba – Local 1 – Tanta", grupo: "Grupo Los Robles", rut: "76.854.879-5", direccion: "Av. El Valle 541, Huechuraba", totalConsumo: 8700000, facturas: 21, ordenes: 3, productos: 16 },
    { id: "2", nombre: "Tobalaba – Local 2 – Osaka", grupo: "Grupo Los Robles", rut: "76.854.879-5", direccion: "Av. El Valle 541, Huechuraba", totalConsumo: 9200000, facturas: 24, ordenes: 2, productos: 14 },
    { id: "3", nombre: "Tobalaba – Local 3 – Panchita", grupo: "Grupo Mil Sabores", rut: "78.523.412-8", direccion: "Av. Lo Bascuñán 287, Santiago", totalConsumo: 11300000, facturas: 30, ordenes: 5, productos: 20 },
    { id: "4", nombre: "Tobalaba – Local 4 – Jalisco", grupo: "Grupo Mil Sabores", rut: "78.523.412-8", direccion: "Av. Lo Bascuñán 287, Santiago", totalConsumo: 8600000, facturas: 25, ordenes: 2, productos: 15 },
  ];

  const sucursal = sucursales.find((s) => s.id === id);

  if (!sucursal) {
    return (
      <div className="p-6 text-gray-300">
        <p>No se encontró la sucursal solicitada.</p>
      </div>
    );
  }

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

      {/* MAPA */}
<div className="rounded-2xl overflow-hidden mb-8 border border-neutral-800 shadow-lg">
  <iframe
    src={`https://www.google.com/maps?q=${encodeURIComponent(sucursal.direccion)}&output=embed`}
    width="100%"
    height="300"
    style={{ border: 0 }}
    loading="lazy"
    allowFullScreen
  ></iframe>
</div>


      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard
          icon={Gauge}
          titulo="Consumo Total"
          valor={`$${sucursal.totalConsumo.toLocaleString("es-CL")}`}
        />
        <KpiCard icon={Receipt} titulo="Facturas" valor={sucursal.facturas} />
        <KpiCard icon={FileText} titulo="Órdenes Pendientes" valor={sucursal.ordenes} />
        <KpiCard icon={Package} titulo="Productos Activos" valor={sucursal.productos} />
      </section>

      {/* TABLA SIMPLE */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 shadow-lg p-6">
        <h2 className="text-lg font-semibold text-amber-400 mb-3">
          Historial de Consumos
        </h2>
        <table className="min-w-full text-sm text-gray-300">
          <thead>
            <tr className="text-amber-400 border-b border-neutral-700">
              <th className="text-left py-2">Periodo</th>
              <th className="text-right py-2">Monto</th>
              <th className="text-right py-2">Facturas</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Enero 2025", "$1.850.000", "3"],
              ["Febrero 2025", "$2.100.000", "5"],
              ["Marzo 2025", "$2.850.000", "7"],
              ["Abril 2025", "$1.900.000", "6"],
            ].map(([periodo, monto, facturas], i) => (
              <tr
                key={i}
                className="border-b border-neutral-800 hover:bg-neutral-800/40 transition"
              >
                <td className="py-2">{periodo}</td>
                <td className="py-2 text-right">{monto}</td>
                <td className="py-2 text-right">{facturas}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
