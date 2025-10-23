"use client";

import React, { useState } from "react";

interface Producto {
  codigo: string;
  descripcion: string;
  cantidad: number;
  precio: number;
}

interface Factura {
  tipo: string;
  periodo: string;
  empleado: string;
  codigoSucursal: string;
  nombreSucursal: string;
  direccion: string;
  comuna: string;
  ciudad: string;
  folio: number;
  total: number;
  productos: Producto[];
}

export default function FacturasPage() {
  const [busqueda, setBusqueda] = useState("");
  const [facturaSeleccionada, setFacturaSeleccionada] = useState<Factura | null>(null);

  const facturas: Factura[] = [
    {
      tipo: "Factura deudores",
      periodo: "2025-10",
      empleado: "JUAN PEREZ",
      codigoSucursal: "C001",
      nombreSucursal: "LAS CONDES",
      direccion: "O’HIGGINS 314",
      comuna: "LAS CONDES",
      ciudad: "SANTIAGO",
      folio: 158757,
      total: 56560,
      productos: [
        { codigo: "PT-001", descripcion: "Detergente Industrial 20L", cantidad: 2, precio: 25000 },
        { codigo: "PT-002", descripcion: "Desengrasante Alcalino 10L", cantidad: 1, precio: 6500 },
      ],
    },
    {
      tipo: "Factura deudores",
      periodo: "2025-10",
      empleado: "JUAN PEREZ",
      codigoSucursal: "C001",
      nombreSucursal: "LAS CONDES",
      direccion: "O’HIGGINS 314",
      comuna: "LAS CONDES",
      ciudad: "SANTIAGO",
      folio: 158756,
      total: 59800,
      productos: [
        { codigo: "PT-003", descripcion: "Alcohol Gel 6x800ml", cantidad: 4, precio: 11000 },
        { codigo: "PT-004", descripcion: "Foaming Cleaner FP 4x5kg", cantidad: 2, precio: 13900 },
      ],
    },
    {
      tipo: "Factura deudores",
      periodo: "2025-09",
      empleado: "JUAN PEREZ",
      codigoSucursal: "C001",
      nombreSucursal: "LAS CONDES",
      direccion: "O’HIGGINS 314",
      comuna: "LAS CONDES",
      ciudad: "SANTIAGO",
      folio: 158720,
      total: 45500,
      productos: [
        { codigo: "PT-005", descripcion: "Rinse Aid 4x5kg", cantidad: 1, precio: 15500 },
        { codigo: "PT-006", descripcion: "Dishwasher 4x5kg", cantidad: 1, precio: 15000 },
        { codigo: "PT-007", descripcion: "DM-500 4x5kg", cantidad: 1, precio: 15000 },
      ],
    },
  ];

  const filtradas = facturas.filter((f) =>
    [f.nombreSucursal, f.codigoSucursal, f.folio.toString()].some((campo) =>
      campo.toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  return (
    <section className="p-8 bg-neutral-950 min-h-screen text-gray-200">
      <h1 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-2">
        🧾 Facturas y Notas de Crédito
      </h1>

      {/* 🔍 BUSCADOR */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar por Sucursal o Folio..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-1/2 p-2 rounded-md bg-neutral-800 border border-neutral-700 text-gray-200 placeholder-gray-500"
        />
        <p className="text-sm text-gray-500">
          Sesión:{" "}
          <span className="text-gray-300">
            sucursallascondes@milsabores.cl
          </span>
        </p>
      </div>

      {/* 📋 TABLA PRINCIPAL */}
      <div className="overflow-x-auto rounded-xl border border-gray-800 shadow-lg">
        <table className="min-w-full text-sm text-gray-300">
          <thead className="bg-neutral-900 text-amber-400">
            <tr>
              <th className="px-4 py-3 text-left">Tipo_DTE</th>
              <th className="px-4 py-3 text-left">Periodo</th>
              <th className="px-4 py-3 text-left">Empleado Ventas</th>
              <th className="px-4 py-3 text-left">Código Sucursal</th>
              <th className="px-4 py-3 text-left">Nombre Sucursal</th>
              <th className="px-4 py-3 text-left">Dirección</th>
              <th className="px-4 py-3 text-left">Comuna</th>
              <th className="px-4 py-3 text-left">Ciudad</th>
              <th className="px-4 py-3 text-right">Folio</th>
              <th className="px-4 py-3 text-right">Global Venta</th>
              <th className="px-4 py-3 text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.map((f, i) => (
              <tr
                key={i}
                className="border-t border-gray-800 hover:bg-neutral-900 transition"
              >
                <td className="px-4 py-2">{f.tipo}</td>
                <td className="px-4 py-2">{f.periodo}</td>
                <td className="px-4 py-2">{f.empleado}</td>
                <td className="px-4 py-2 font-mono text-gray-100">{f.codigoSucursal}</td>
                <td className="px-4 py-2">{f.nombreSucursal}</td>
                <td className="px-4 py-2">{f.direccion}</td>
                <td className="px-4 py-2">{f.comuna}</td>
                <td className="px-4 py-2">{f.ciudad}</td>
                <td className="px-4 py-2 text-right">{f.folio}</td>
                <td className="px-4 py-2 text-right">
                  ${f.total.toLocaleString("es-CL")}
                </td>
                <td
                  onClick={() => setFacturaSeleccionada(f)}
                  className="px-4 py-2 text-center text-blue-400 hover:underline cursor-pointer"
                >
                  Ver Detalle
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🪟 MODAL DETALLE FACTURA */}
      {facturaSeleccionada && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 p-6 rounded-2xl w-[650px] shadow-xl border border-neutral-700">
            <h2 className="text-xl font-bold text-amber-400 mb-4">
              📦 Detalle de la Factura #{facturaSeleccionada.folio}
            </h2>

            {/* DATOS GENERALES */}
            <div className="text-sm text-gray-300 mb-4 space-y-1">
              <p>
                <strong>Periodo:</strong> {facturaSeleccionada.periodo}
              </p>
              <p>
                <strong>Sucursal:</strong> {facturaSeleccionada.nombreSucursal} ({facturaSeleccionada.codigoSucursal})
              </p>
              <p>
                <strong>Dirección:</strong> {facturaSeleccionada.direccion}
              </p>
              <p>
                <strong>Comuna:</strong> {facturaSeleccionada.comuna}
              </p>
              <p>
                <strong>Total:</strong> ${facturaSeleccionada.total.toLocaleString("es-CL")}
              </p>
            </div>

            {/* TABLA PRODUCTOS */}
            <table className="w-full text-sm text-gray-300 border-t border-neutral-700">
              <thead className="text-amber-400">
                <tr>
                  <th className="text-left py-2">Código</th>
                  <th className="text-left py-2">Descripción</th>
                  <th className="text-right py-2">Cantidad</th>
                  <th className="text-right py-2">Precio</th>
                  <th className="text-right py-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {facturaSeleccionada.productos.map((p, i) => (
                  <tr key={i} className="border-t border-neutral-800">
                    <td>{p.codigo}</td>
                    <td>{p.descripcion}</td>
                    <td className="text-right">{p.cantidad}</td>
                    <td className="text-right">
                      ${p.precio.toLocaleString("es-CL")}
                    </td>
                    <td className="text-right">
                      ${(p.cantidad * p.precio).toLocaleString("es-CL")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setFacturaSeleccionada(null)}
                className="bg-amber-500 hover:bg-amber-600 text-black px-5 py-2 rounded-lg font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
