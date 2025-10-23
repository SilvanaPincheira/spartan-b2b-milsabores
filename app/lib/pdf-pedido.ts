// lib/pdf-pedido.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface PedidoData {
  numero: string;
  fecha: string;
  cliente: {
    nombre: string;
    rut: string;
    sucursal: string;
    direccion: string;
    contacto: string;
    email: string;
    ejecutivo: string;
  };
  productos: {
    codigo: string;
    descripcion: string;
    kg: number;
    cantidad: number;
    precio: number;
    total: number;
  }[];
  totalPedido: number;
}

export function generarPDFPedido(data: PedidoData) {
  const doc = new jsPDF();
  const marginLeft = 15;
  let y = 20;

  // Encabezado
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 170, 0);
  doc.text("Nota de Pedido — Grupo Mil Sabores", marginLeft, y);
  y += 10;

  doc.setFontSize(11);
  doc.setTextColor(60);
  doc.text(`N° Pedido: ${data.numero}`, marginLeft, y);
  doc.text(`Fecha: ${data.fecha}`, 150, y);
  y += 10;

  // Datos cliente
  doc.setTextColor(255, 170, 0);
  doc.text("Datos del Cliente", marginLeft, y);
  y += 6;
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(`Nombre: ${data.cliente.nombre}`, marginLeft, y);
  doc.text(`RUT: ${data.cliente.rut}`, 120, y);
  y += 6;
  doc.text(`Sucursal: ${data.cliente.sucursal}`, marginLeft, y);
  doc.text(`Ejecutivo: ${data.cliente.ejecutivo}`, 120, y);
  y += 6;
  doc.text(`Dirección: ${data.cliente.direccion}`, marginLeft, y);
  y += 6;
  doc.text(`Contacto: ${data.cliente.contacto}`, marginLeft, y);
  doc.text(`Email: ${data.cliente.email}`, 120, y);
  y += 10;

  // Tabla productos
  const productos = data.productos.map((p) => [
    p.codigo,
    p.descripcion,
    `${p.kg} kg`,
    p.cantidad,
    `$${p.precio.toLocaleString()}`,
    `$${p.total.toLocaleString()}`,
  ]);

  autoTable(doc, {
    head: [["Código", "Descripción", "Kg", "Cant.", "Precio convenio", "Total"]],
    body: productos,
    startY: y,
    styles: { fontSize: 9 },
    headStyles: {
      fillColor: [255, 170, 0],
      textColor: [0, 0, 0],
      halign: "center",
    },
    columnStyles: { 5: { halign: "right" }, 4: { halign: "right" } },
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`Total Pedido: $${data.totalPedido.toLocaleString()}`, 150, finalY);

  // Descargar
  doc.save(`${data.numero}.pdf`);
}
