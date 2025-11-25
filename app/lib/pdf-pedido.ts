// lib/pdf-pedido.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface PedidoData {
  numero: string;   // TEMP o real
  fecha: string;
  loginusuario?: string;

  cliente: {
    nombre: string;
    rut: string;
    sucursal: string;
    codigoSucursal: string;
    direccion: string;
    comuna: string;
    zona: string;
    local: string;
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

/** Formatea fecha ISO a formato chileno */
function formatearFecha(fechaIso: string) {
  const f = new Date(fechaIso);
  return f.toLocaleString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function generarPDFPedido(data: PedidoData) {
  const doc = new jsPDF();
  const x = 15;
  let y = 20;

  // =========================
  //       ENCABEZADO
  // =========================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 170, 0);
  doc.text("Nota de Pedido — Grupo Mil Sabores", x, y);
  y += 12;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(0);

  doc.text(`N° Pedido: ${data.numero}`, x, y);
  doc.text(`Fecha: ${formatearFecha(data.fecha)}`, 150, y);
  y += 7;

  doc.text(`Generado por: ${data.loginusuario || "-"}`, x, y);
  y += 12;

  // =========================
  //     DATOS DEL CLIENTE
  // =========================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 170, 0);
  doc.text("Datos del Cliente", x, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(0);

  const c = data.cliente;

  // FILA 1
  doc.text(`Nombre: ${c.nombre}`, x, y);
  doc.text(`RUT: ${c.rut}`, 120, y);
  y += 6;

  // FILA 2
  doc.text(`Sucursal: ${c.sucursal}`, x, y);
  doc.text(`Código sucursal: ${c.codigoSucursal}`, 120, y);
  y += 6;

  // FILA 3
  doc.text(`Local: ${c.local}`, x, y);
  doc.text(`Comuna: ${c.comuna}`, 120, y);
  y += 6;

  // FILA 4
  doc.text(`Zona: ${c.zona}`, x, y);
  y += 6;

  // FILA 5
  doc.text(`Dirección: ${c.direccion}`, x, y);
  y += 10;

  // =========================
  //        TABLA PRODUCTOS
  // =========================
  const productosTabla = data.productos.map((p) => [
    p.codigo,
    p.descripcion,
    `${p.kg} kg`,
    p.cantidad,
    `$${p.precio.toLocaleString("es-CL")}`,
    `$${p.total.toLocaleString("es-CL")}`,
  ]);

  autoTable(doc, {
    head: [["Código", "Descripción", "Kg", "Cant.", "Precio convenio", "Total"]],
    body: productosTabla,
    startY: y,
    styles: { fontSize: 9 },
    headStyles: {
      fillColor: [255, 170, 0],
      textColor: [0, 0, 0],
      halign: "center",
    },
    columnStyles: {
      4: { halign: "right" },
      5: { halign: "right" },
    },
  });

  const finalY = (doc as any).lastAutoTable.finalY + 12;

  // =========================
  //       TOTAL PEDIDO
  // =========================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(
    `Total Pedido: $${data.totalPedido.toLocaleString("es-CL")}`,
    150,
    finalY
  );

  // Retorna el PDF como Base64
  return doc.output("datauristring");
}
