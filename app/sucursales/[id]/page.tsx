"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  FileText,
  Receipt,
  Gauge,
  Package,
  PlusCircle,
} from "lucide-react";

// URL Google Sheet → Locales
const LOCALES_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vREJ43NtBSeZNkFnTZ_9S9rsDp0YNhY6qOdtt-srwVD4UpXHrybM4z5w8D7080ds1jUicZjWke80WAx/pub?gid=0&single=true&output=csv";

export default function SucursalDetalle() {
  const router = useRouter();
  const { id } = useParams(); // ← aquí recibimos TOB003, OPEN002, etc.

  const [loading, setLoading] = useState(true);
  const [sucursal, setSucursal] = useState<any>(null);

  // Datos demo (mientras no conectemos Notas de Venta)
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

  // Función para cargar CSV
  const fetchCSV = async (url: string) => {
    const res = await fetch(url);
    const text = await res.text();
    const rows = text.split("\n").map((r) => r.split(","));
    const headers = rows[0];
    return rows.slice(1).map((r) =>
      Object.fromEntries(headers.map((h, i) => [h.trim(), r[i]?.trim()]))
    );
  };

  // Cargar la sucursal según ID_LOCAL
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const locales = await fetchCSV(LOCALES_URL);
      const found = locales.find((l: any) => l.ID_LOCAL === id);

      if (!found) {
        setSucursal(null);
      } else {
        setSucursal({
          ...found,
          totalConsumo: 1130000,
          facturas: 30,
          ordenes: 25,
          productos: 20,
          topeMensual: 1200000,
        });
      }

      setLoading(false);
    };

    load();
  }, [id]);

  if (loading)
    return <div className="p-6 text-gray-400">Cargando sucursal...</div>;

  if (!sucursal)
    return <div className="p-6 text-gray-400">Sucursal no encontrada.</div>;

  // → Historial demo
  const historial = [
    { mes: "Junio", pedidos: 5 },
    { mes: "Julio", pedidos: 7 },
    { mes: "Agosto", pedidos: 6 },
    { mes: "Septiembre", pedidos: 5 },
    { mes: "Octubre", pedidos: 9 },
  ];

  // → Pedido sugerido (demo)
  const sugerido = productosConvenio.map((p) => ({
    ...p,
    promedioKilos: 800,
    monto: p.precio * 800,
  }));

  const totalSugerido = sugerido.reduce((a, b) => a + b.monto, 0);

  return (
    <div className="p-6 text-white">
      {/* HEADER */}
      <button
        onClick={() => router.push("/sucursales")}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-amber-400 mb-4"
      >
        <ArrowLeft size={16} /> Volver
      </button>

      <h1 className="text-2xl font-bold text-amber-400 mb-1">
        {sucursal.Local}
      </h1>

      <p className="text-sm text-gray-400 flex items-center gap-1 mb-6">
        <MapPin size={14} className="text-amber-400" />
        {sucursal.Direccion}
      </p>

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard icon={Gauge} titulo="Consumo Total" valor={`$${sucursal.totalConsumo.toLocaleString("es-CL")}`} />
        <KpiCard icon={Receipt} titulo="Facturas" valor={sucursal.facturas} />
        <KpiCard icon={FileText} titulo="Órdenes" valor={sucursal.ordenes} />
        <KpiCard icon={Package} titulo="Productos" valor={sucursal.productos} />
      </section>

      {/* PEDIDO SUGERIDO */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-amber-400 mb-3">
          Pedido Sugerido
        </h2>

        <table className="min-w-full text-sm text-gray-300 mb-4">
          <thead>
            <tr className="text-amber-400 border-b border-neutral-700">
              <th className="text-left py-2">Código</th>
              <th className="text-left py-2">Producto</th>
              <th className="text-right py-2">Promedio Kg</th>
              <th className="text-right py-2">Monto</th>
            </tr>
          </thead>
          <tbody>
            {sugerido.map((p, i) => (
              <tr key={i} className="border-b border-neutral-800">
                <td>{p.codigo}</td>
                <td>{p.desc}</td>
                <td className="text-right">{p.promedioKilos}</td>
                <td className="text-right">
                  ${p.monto.toLocaleString("es-CL")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="text-right font-semibold text-white">
          Total:{" "}
          <span className="text-amber-400">
            ${totalSugerido.toLocaleString("es-CL")}
          </span>
        </p>

        <button
          onClick={() => alert("Crear pedido sugerido")}
          className="mt-5 flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold px-4 py-2 rounded-lg transition"
        >
          <PlusCircle size={18} />
          Crear pedido
        </button>
      </div>
    </div>
  );
}

function KpiCard({ icon: Icon, titulo, valor }: any) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-2">
        <Icon size={22} className="text-amber-400" />
        <h3 className="text-base font-semibold">{titulo}</h3>
      </div>
      <span className="text-2xl font-bold text-amber-400">{valor}</span>
    </div>
  );
}
