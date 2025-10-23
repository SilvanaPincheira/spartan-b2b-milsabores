"use client";

import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function NotaPedidoPage() {
  const [cliente, setCliente] = useState({
    nombre: "Mil Sabores S.A.",
    rut: "76.854.298-7",
    codigoSucursal: "SUC-001",
    ejecutivo: "Eduardo Ríos",
    direccion: "San Ignacio 9000, Santiago Centro",
    comuna: "Santiago",
    contacto: "Juanito Pérez",
    telefono: "+56 9 8574 236",
    email: "juanito.perez@mil.cl",
  });

  const [productos, setProductos] = useState([
    { codigo: "PT-001", descripcion: "Detergente Industrial 20L", kg: 20, cantidad: 2, precio: 25000 },
    { codigo: "PT-002", descripcion: "Desengrasante Alcalino 10L", kg: 10, cantidad: 1, precio: 18000 },
  ]);

  const handleChangeCliente = (campo: string, valor: string) => {
    setCliente({ ...cliente, [campo]: valor });
  };

  const handleChangeProducto = (index: number, campo: string, valor: any) => {
    const updated = [...productos];
    updated[index] = { ...updated[index], [campo]: valor };
    setProductos(updated);
  };

  const agregarProducto = () => {
    setProductos([
      ...productos,
      { codigo: "", descripcion: "", kg: 0, cantidad: 0, precio: 0 },
    ]);
  };

  const total = productos.reduce((sum, p) => sum + p.cantidad * p.precio, 0);

  // === PDF GENERATOR ===
  const generarPDF = () => {
    const doc = new jsPDF();

    // === LOGO (reemplaza con tu base64 real) ===
    const logoBase64 =
      "data:image/png;base64,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"; // ⚠️ Reemplaza esta línea con tu base64 real
    doc.addImage(logoBase64, "PNG", 14, 10, 25, 25); // (x, y, width, height)

    // === ENCABEZADO ===
    doc.setFontSize(16);
    doc.text("NOTA DE PEDIDO – Grupo Mil Sabores", 105, 20, { align: "center" });

    // === DATOS CLIENTE ===
    doc.setFontSize(12);
    doc.text("Datos del Cliente:", 14, 40);
    doc.setFontSize(10);
    doc.text(`Nombre: ${cliente.nombre}`, 14, 47);
    doc.text(`RUT: ${cliente.rut}`, 14, 53);
    doc.text(`Código Sucursal: ${cliente.codigoSucursal}`, 14, 59);
    doc.text(`Ejecutivo: ${cliente.ejecutivo}`, 14, 65);
    doc.text(`Dirección: ${cliente.direccion}`, 14, 71);
    doc.text(`Comuna: ${cliente.comuna}`, 14, 77);
    doc.text(`Contacto: ${cliente.contacto}`, 14, 83);
    doc.text(`Teléfono: ${cliente.telefono}`, 14, 89);
    doc.text(`Email: ${cliente.email}`, 14, 95);
    doc.text(`Fecha emisión: ${new Date().toLocaleDateString("es-CL")}`, 14, 101);

    // === TABLA DE PRODUCTOS ===
    const filas = productos.map((p: any) => [
      p.codigo,
      p.descripcion,
      `${p.kg} kg`,
      p.cantidad,
      `$${p.precio.toLocaleString("es-CL")}`,
      `$${(p.precio * p.cantidad).toLocaleString("es-CL")}`,
    ]);

    autoTable(doc, {
      startY: 110,
      head: [["Código", "Descripción", "Kg", "Cantidad", "Precio", "Total"]],
      body: filas,
      theme: "grid",
      styles: { fontSize: 9, halign: "center" },
      headStyles: { fillColor: [255, 193, 7], textColor: 0 },
    });

    // === TOTALES ===
    const iva = total * 0.19;
    const totalFinal = total + iva;
    const yFinal = (doc as any).lastAutoTable.finalY || 120;

    doc.setFontSize(11);
    doc.text(`Total Neto: $${total.toLocaleString("es-CL")}`, 140, yFinal + 10);
    doc.text(`IVA (19%): $${iva.toLocaleString("es-CL")}`, 140, yFinal + 16);
    doc.text(`Total Final: $${totalFinal.toLocaleString("es-CL")}`, 140, yFinal + 22);

    // === PIE ===
    doc.setFontSize(9);
    doc.text("Spartan B2B – Documento generado automáticamente", 105, 285, { align: "center" });

    // === DESCARGA ===
    doc.save(`NotaPedido_${cliente.codigoSucursal}.pdf`);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-10">
      <h1 className="text-3xl font-bold text-amber-400 mb-8">
        🧾 Nota de Pedido — Grupo Mil Sabores
      </h1>

      {/* 🧍 DATOS DEL CLIENTE */}
      <section className="bg-neutral-800 rounded-2xl p-6 mb-8 border border-neutral-700">
        <h2 className="text-xl font-semibold text-amber-300 mb-4">
          Datos del Cliente
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Nombre" value={cliente.nombre} onChange={(e) => handleChangeCliente("nombre", e.target.value)} />
          <Input label="RUT" value={cliente.rut} onChange={(e) => handleChangeCliente("rut", e.target.value)} />
          <Input label="Código Sucursal" value={cliente.codigoSucursal} onChange={(e) => handleChangeCliente("codigoSucursal", e.target.value)} />
          <Input label="Ejecutivo" value={cliente.ejecutivo} onChange={(e) => handleChangeCliente("ejecutivo", e.target.value)} />
          <Input label="Dirección" value={cliente.direccion} onChange={(e) => handleChangeCliente("direccion", e.target.value)} />
          <Input label="Comuna" value={cliente.comuna} onChange={(e) => handleChangeCliente("comuna", e.target.value)} />
          <Input label="Contacto" value={cliente.contacto} onChange={(e) => handleChangeCliente("contacto", e.target.value)} />
          <Input label="Teléfono" value={cliente.telefono} onChange={(e) => handleChangeCliente("telefono", e.target.value)} />
          <Input label="Correo electrónico" value={cliente.email} onChange={(e) => handleChangeCliente("email", e.target.value)} />
        </div>
      </section>

      {/* 📦 PRODUCTOS */}
      <section className="bg-neutral-800 rounded-2xl p-6 border border-neutral-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-amber-300">
            Productos Solicitados
          </h2>
          <button
            onClick={agregarProducto}
            className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-4 py-2 rounded-lg"
          >
            + Agregar producto
          </button>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-amber-400 border-b border-neutral-700">
              <th className="p-2 text-left">Código</th>
              <th className="p-2 text-left">Descripción</th>
              <th className="p-2 text-right">Kg</th>
              <th className="p-2 text-right">Cantidad</th>
              <th className="p-2 text-right">Precio convenio</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p, index) => (
              <tr key={index} className="border-b border-neutral-700">
                <td className="p-2">
                  <input
                    value={p.codigo}
                    onChange={(e) => handleChangeProducto(index, "codigo", e.target.value)}
                    className="bg-neutral-700 rounded p-1 w-full"
                  />
                </td>
                <td className="p-2">
                  <input
                    value={p.descripcion}
                    onChange={(e) => handleChangeProducto(index, "descripcion", e.target.value)}
                    className="bg-neutral-700 rounded p-1 w-full"
                  />
                </td>
                <td className="p-2 text-right">
                  <input
                    type="number"
                    value={p.kg}
                    onChange={(e) => handleChangeProducto(index, "kg", Number(e.target.value))}
                    className="bg-neutral-700 rounded p-1 text-right w-20"
                  />
                </td>
                <td className="p-2 text-right">
                  <input
                    type="number"
                    value={p.cantidad}
                    onChange={(e) => handleChangeProducto(index, "cantidad", Number(e.target.value))}
                    className="bg-neutral-700 rounded p-1 text-right w-20"
                  />
                </td>
                <td className="p-2 text-right">
                  <input
                    type="number"
                    value={p.precio}
                    onChange={(e) => handleChangeProducto(index, "precio", Number(e.target.value))}
                    className="bg-neutral-700 rounded p-1 text-right w-28"
                  />
                </td>
                <td className="p-2 text-right">
                  ${(p.cantidad * p.precio).toLocaleString("es-CL")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mt-4 font-semibold text-amber-400">
          Total Pedido: ${total.toLocaleString("es-CL")}
        </div>
      </section>

      {/* BOTONES */}
      <div className="mt-10 flex justify-end gap-4">
        <button className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-xl font-semibold">
          Enviar Pedido
        </button>
        <button
          onClick={generarPDF}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          📄 Generar PDF
        </button>
      </div>
    </div>
  );
}

// 🔹 INPUT COMPONENTE REUTILIZABLE
function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-400 text-sm mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="p-2 rounded bg-neutral-700 text-sm"
      />
    </div>
  );
}
