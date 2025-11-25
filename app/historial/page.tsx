"use client";

import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Link from "next/link";

// URL CSV del Google Sheet
const URL_HISTORIAL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS28uebQLIdPEe5dEUUpbzEmwdnphbtBdk6-4yJ3xcTi7EU4p6UvbPKYuvnx2_5pyR6VPbvRq8AdxM4/pub?gid=1794618162&single=true&output=csv";

type FilaHistorial = {
  NV_ID: string;
  Fecha: string;
  Sucursal: string;
  "Razon Social": string;
  Rut: string;
  "Codigo sucursal": string;
  Direccion: string;
  Comuna: string;
  Local: string;
  Zona: string;
  Loginusuario: string;
  ProductoCodigo: string;
  ProductoNombre: string;
  Kg: string;
  KgTope: string;
  CantidadTope: string;
  Cantidad: string;
  Precio: string;
  MontoTotal: string;
  Observaciones: string;
};

export default function HistorialPedidos() {
  const [rows, setRows] = useState<FilaHistorial[]>([]);

  useEffect(() => {
    Papa.parse(URL_HISTORIAL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (res: any) => {
        setRows(res.data as FilaHistorial[]);
      },
    });
  }, []);

  // Agrupar por NV_ID → tomar SOLO la primera fila de cada pedido
  const pedidosUnicos = Object.values(
    rows.reduce((acc: any, fila) => {
      if (!acc[fila.NV_ID]) acc[fila.NV_ID] = fila;
      return acc;
    }, {})
  );

  return (
    <div className="p-10 bg-neutral-900 min-h-screen text-white">
      <h1 className="text-3xl text-amber-400 font-bold mb-8">
        📚 Historial de Pedidos
      </h1>

      <table className="w-full text-sm">
        <thead className="border-b border-neutral-700 text-amber-300">
          <tr>
            <th className="p-2 text-left">NV_ID</th>
            <th className="p-2 text-left">Fecha</th>
            <th className="p-2 text-left">Sucursal</th>
            <th className="p-2 text-left">Razón Social</th>
            <th className="p-2 text-left">Rut</th>
            <th className="p-2 text-left">Código RS</th>
            <th className="p-2 text-left">Dirección</th>
            <th className="p-2 text-center">Detalle</th>
          </tr>
        </thead>

        <tbody>
          {pedidosUnicos.map((p: any, i) => (
            <tr key={i} className="border-b border-neutral-700">
              <td className="p-2">{p.NV_ID}</td>
              <td className="p-2">{p.Fecha}</td>
              <td className="p-2">{p.Sucursal}</td>
              <td className="p-2">{p["Razon Social"]}</td>
              <td className="p-2">{p.Rut}</td>
              <td className="p-2">{p["Codigo sucursal"]}</td>
              <td className="p-2">{p.Direccion}</td>

              <td className="p-2 text-center">
                <Link
                  href={`/historial/${encodeURIComponent(p.NV_ID)}`}
                  className="bg-amber-500 text-black px-3 py-1 rounded hover:bg-amber-600"
                >
                  Ver Detalle
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
