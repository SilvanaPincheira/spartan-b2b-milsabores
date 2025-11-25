"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import Link from "next/link";

const URL_HISTORIAL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS28uebQLIdPEe5dEUUpbzEmwdnphbtBdk6-4yJ3xcTi7EU4p6UvbPKYuvnx2_5pyR6VPbvRq8AdxM4/pub?gid=1794618162&single=true&output=csv";

export default function DetallePedido({ params }: any) {
  const { id } = params;

  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ⭐ DUPLICAR NOTA DE VENTA
  const duplicarNV = (rowsData: any[]) => {
    if (!rowsData || rowsData.length === 0) return;

    const cliente = {
      nombre: rowsData[0]["Razon Social"],
      rut: rowsData[0]["Rut"],
      sucursal: rowsData[0]["Sucursal"],
      codigoSucursal: rowsData[0]["Codigo sucursal"],
      direccion: rowsData[0]["Direccion"],
      comuna: rowsData[0]["Comuna"],
      zona: rowsData[0]["Zona"],
      local: rowsData[0]["local"],
      contacto: "",
      email: "pia.ramirez@spartan.cl",
      ejecutivo: "PIA RAMIREZ",
    };

    const productos = rowsData.map((p) => ({
      codigo: p.ProductoCodigo,
      descripcion: p.ProductoNombre,
      kg: Number(p.Kg),
      cantidad: Number(p.Cantidad),
      precio: Number(p.Precio),
      topeKg: Number(p.KgTope),
      topeCantidad: Number(p.CantidadTope),
    }));

    localStorage.setItem("duplicar_cliente", JSON.stringify(cliente));
    localStorage.setItem("duplicar_productos", JSON.stringify(productos));

    window.location.href = "/nota-de-venta";
  };

  // ⭐ Cargar datos del historial
  useEffect(() => {
    Papa.parse(URL_HISTORIAL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        const allRows = results.data;

        const filtro = allRows.filter((r: any) => r.NV_ID === id);
        setRows(filtro);
        setLoading(false);
      },
    });
  }, [id]);

  if (loading) {
    return <div className="text-white p-10">Cargando…</div>;
  }

  if (!rows.length) {
    return (
      <div className="text-white p-10">
        <p>No existe la Nota de Venta {id}</p>
        <Link href="/historial" className="text-amber-400 underline">
          Volver al historial
        </Link>
      </div>
    );
  }

  const c = rows[0];

  const total = rows.reduce(
    (acc, r) => acc + Number(r.MontoTotal || 0),
    0
  );

  return (
    <div className="p-10 bg-neutral-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-amber-400 mb-8">
        Detalle Nota de Venta — {id}
      </h1>

      {/* DATOS DEL CLIENTE */}
      <div className="bg-neutral-800 border border-neutral-700 p-6 rounded-xl mb-10">
        <h2 className="text-xl text-amber-300 mb-4">Datos del Cliente</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <Campo label="Razón Social" value={c["Razon Social"]} />
          <Campo label="Sucursal" value={c.Sucursal} />

          <Campo label="RUT" value={c.Rut} />
          <Campo label="Código RS" value={c["Codigo sucursal"]} />

          <Campo label="Dirección" value={c.Direccion} />
          <Campo label="Comuna" value={c.Comuna} />

          <Campo label="Local" value={c.local} />
          <Campo label="Zona" value={c.Zona} />

          <Campo label="Fecha" value={c.Fecha} />
          <Campo label="Usuario" value={c.Loginusuario} />
        </div>
      </div>

      {/* PRODUCTOS */}
      <div className="bg-neutral-800 border border-neutral-700 p-6 rounded-xl">
        <h2 className="text-xl text-amber-300 mb-4">Productos</h2>

        <table className="w-full text-xs">
          <thead className="text-amber-400 border-b border-neutral-600">
            <tr>
              <th className="p-2 text-left">Código</th>
              <th className="p-2 text-left">Producto</th>
              <th className="p-2 text-right">Kg</th>
              <th className="p-2 text-right">Kg Tope</th>
              <th className="p-2 text-right">Cant. Tope</th>
              <th className="p-2 text-right">Cantidad</th>
              <th className="p-2 text-right">Precio</th>
              <th className="p-2 text-right">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((p, i) => (
              <tr key={i} className="border-b border-neutral-700">
                <td className="p-2">{p.ProductoCodigo}</td>
                <td className="p-2">{p.ProductoNombre}</td>
                <td className="p-2 text-right">{p.Kg}</td>
                <td className="p-2 text-right">{p.KgTope}</td>
                <td className="p-2 text-right">{p.CantidadTope}</td>
                <td className="p-2 text-right">{p.Cantidad}</td>
                <td className="p-2 text-right">
                  ${Number(p.Precio).toLocaleString("es-CL")}
                </td>
                <td className="p-2 text-right">
                  ${Number(p.MontoTotal).toLocaleString("es-CL")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right text-xl mt-6 text-amber-400">
          Total Pedido: ${total.toLocaleString("es-CL")}
        </div>
      </div>

      {/* BOTONES */}
      <div className="mt-10 flex gap-3">
        <Link href="/historial">
          <button className="bg-neutral-700 px-4 py-2 rounded hover:bg-neutral-600">
            ← Volver
          </button>
        </Link>

        <button
          onClick={() => duplicarNV(rows)}
          className="bg-amber-500 text-black px-4 py-2 rounded hover:bg-amber-600"
        >
          Duplicar Nota de Venta
        </button>
      </div>
    </div>
  );
}

function Campo({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <label className="text-gray-400 text-xs">{label}</label>
      <div className="p-2 bg-neutral-700 rounded">{value || "-"}</div>
    </div>
  );
}
