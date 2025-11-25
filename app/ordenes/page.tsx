"use client";

import React, { useEffect, useState, useMemo } from "react";
import Papa from "papaparse";
import { generarPDFPedido } from "@/app/lib/pdf-pedido";

// ==== TIPOS ====

type ClienteCSV = {
  "Codigo Razon Social": string;
  "Razon Social": string;
  RUT: string;
  Local: string;
  Dirección: string;
  Cco: string;
  Ubicación: string;
  Zona: string;
  Sucursal: string;
  ID_LOCAL: string;
};

type ProductoConvenio = {
  "Codigo Razon Social": string;
  codigo: string;
  Producto: string;
  Kg: string;
  "Kilos Tope": string;
  Precio: string;
  "Cantidad Tope": string;
};

type ProductoForm = {
  codigo: string;
  descripcion: string;
  kg: number;
  precio: number;
  cantidad: number;
  topeKg: number;
  topeCantidad: number;
};

// === URLs ===
const URL_CLIENTES =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRJPT0N0HwPHlzRnvzm4I85I1atfy_AiTCrfM74wMTEZjJzaZmi0xGHFPB8IGDr9E025_k7E98-Soi0/pub?gid=0&single=true&output=csv";

const URL_CONVENIO =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRJPT0N0HwPHlzRnvzm4I85I1atfy_AiTCrfM74wMTEZjJzaZmi0xGHFPB8IGDr9E025_k7E98-Soi0/pub?gid=1375366871&single=true&output=csv";

const URL_APPSCRIPT_NV =
  "https://script.google.com/macros/s/AKfycbzC6mo_JiWiUV-ZFTohbDFF-SYvFVFkcuWdg9tub73-v51swIJRxUKGC0fKwFptgEJ9/exec";

export default function NotaDeVenta() {
  const [clientesData, setClientesData] = useState<ClienteCSV[]>([]);
  const [convenioData, setConvenioData] = useState<ProductoConvenio[]>([]);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState("");

  const [cliente, setCliente] = useState({
    nombre: "",
    rut: "",
    codigoSucursal: "",
    direccion: "",
    comuna: "",
    zona: "",
    local: "",
    id_local: "",
  });

  const [productos, setProductos] = useState<ProductoForm[]>([
    {
      codigo: "",
      descripcion: "",
      kg: 0,
      precio: 0,
      cantidad: 0,
      topeKg: 0,
      topeCantidad: 0,
    },
  ]);

  const [mensaje, setMensaje] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [warnings, setWarnings] = useState<{ [key: number]: string }>({});

  // ============================
  //   CARGA DE CSV
  // ============================

  useEffect(() => {
    Papa.parse(URL_CLIENTES, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => setClientesData(results.data as ClienteCSV[]),
    });
  }, []);

  useEffect(() => {
    Papa.parse(URL_CONVENIO, {
      download: true,
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      complete: (results: any) =>
        setConvenioData(results.data as ProductoConvenio[]),
    });
  }, []);

  const sucursales = useMemo(() => {
    const mapa = new Map<string, ClienteCSV>();
    clientesData.forEach((f) => mapa.set(f.ID_LOCAL, f));
    return Array.from(mapa.values());
  }, [clientesData]);

  useEffect(() => {
    if (!sucursalSeleccionada) return;
    const fila = clientesData.find((f) => f.ID_LOCAL === sucursalSeleccionada);
    if (!fila) return;

    setCliente({
      nombre: fila["Razon Social"],
      rut: fila.RUT,
      codigoSucursal: fila["Codigo Razon Social"],
      direccion: fila["Dirección"],
      comuna: fila.Ubicación,
      zona: fila.Zona,
      local: fila.Local,
      id_local: fila.ID_LOCAL,
    });
  }, [sucursalSeleccionada, clientesData]);

  const productosPermitidos = useMemo(() => {
    if (!cliente.codigoSucursal) return [];
    return convenioData.filter(
      (p) =>
        (p["Codigo Razon Social"] || "").trim().toUpperCase() ===
        cliente.codigoSucursal.trim().toUpperCase()
    );
  }, [cliente.codigoSucursal, convenioData]);

  const seleccionarProducto = (i: number, codigo: string) => {
    const fila = productosPermitidos.find((p) => p.codigo === codigo);
    if (!fila) return;

    const newList = [...productos];
    newList[i] = {
      codigo,
      descripcion: fila.Producto,
      kg: Number(fila.Kg),
      precio: Number(fila.Precio),
      cantidad: 0,
      topeKg: Number(fila["Kilos Tope"]),
      topeCantidad: Number(fila["Cantidad Tope"]),
    };
    setProductos(newList);
  };

  const addProduct = () =>
    setProductos([
      ...productos,
      {
        codigo: "",
        descripcion: "",
        kg: 0,
        precio: 0,
        cantidad: 0,
        topeKg: 0,
        topeCantidad: 0,
      },
    ]);

  const removeProduct = (i: number) => {
    if (productos.length === 1) return;
    setProductos(productos.filter((_, idx) => idx !== i));
  };

  const updateProduct = (i: number, field: string, val: any) => {
    const newList = [...productos];
    const newWarnings = { ...warnings };

    if (field === "cantidad") {
      const tope = newList[i].topeCantidad;

      if (val < 0) {
        newList[i].cantidad = 0;
        delete newWarnings[i];
        setProductos(newList);
        setWarnings(newWarnings);
        return;
      }

      if (val > tope) {
        newList[i].cantidad = tope;
        newWarnings[i] = `⚠️ Cantidad máxima permitida: ${tope}`;
        setProductos(newList);
        setWarnings(newWarnings);
        return;
      }

      delete newWarnings[i];
      newList[i].cantidad = val;
      setProductos(newList);
      setWarnings(newWarnings);
      return;
    }

    (newList[i] as any)[field] = val;
    setProductos(newList);
  };

  const total = productos.reduce(
    (acc, p) => acc + p.cantidad * p.kg * p.precio,
    0
  );

  // ============================
  //   PREVISUALIZAR PDF
  // ============================
  const verPDF = () => {
    try {
      const productosPDF = productos
        .filter((p) => p.codigo && p.cantidad > 0)
        .map((p) => ({
          codigo: p.codigo,
          descripcion: p.descripcion,
          kg: p.kg,
          cantidad: p.cantidad,
          precio: p.precio,
          total: p.cantidad * p.kg * p.precio,
        }));

      if (!cliente.codigoSucursal) {
        alert("Debes seleccionar una sucursal antes de ver el PDF.");
        return;
      }

      if (productosPDF.length === 0) {
        alert("Debes agregar al menos un producto antes de ver el PDF.");
        return;
      }

      const pedido = {
        numero: "NV-" ,
        fecha: new Date().toISOString(),
        cliente: {
          nombre: cliente.nombre,
          rut: cliente.rut,
          sucursal: cliente.local,
          codigoSucursal: cliente.codigoSucursal,
          direccion: cliente.direccion,
          comuna: cliente.comuna,
          zona: cliente.zona,
          local: cliente.local,
          contacto: "",
          email: "pia.ramirez@spartan.cl",
          ejecutivo: "PIA RAMIREZ",
        },
        productos: productosPDF,
        totalPedido: total,
      };

      const pdfBase64 = generarPDFPedido(pedido);
      const newWindow = window.open();
      newWindow?.document.write(
        `<iframe width="100%" height="100%" src="${pdfBase64}"></iframe>`
      );
    } catch (err) {
      console.error(err);
      alert("No se pudo generar el PDF");
    }
  };

  // ============================
  //   GUARDAR + ENVIAR
  // ============================
  const handleGuardarYEnviar = async () => {
    try {
      if (loading) return; // evita doble envío
      setLoading(true);
      setMensaje(null);
      setErrorMsg(null);

      if (!cliente.codigoSucursal)
        throw new Error("Debes seleccionar una sucursal.");

      const productosValidos = productos.filter(
        (p) => p.codigo && p.cantidad > 0
      );
      if (productosValidos.length === 0)
        throw new Error("Debes agregar al menos un producto.");

      const productosPDF = productosValidos.map((p) => ({
        codigo: p.codigo,
        descripcion: p.descripcion,
        kg: p.kg,
        cantidad: p.cantidad,
        precio: p.precio,
        total: p.cantidad * p.kg * p.precio,
      }));

      const pedido = {
        numero: "TEMP-" + Date.now(),
        fecha: new Date().toISOString(),
        loginusuario: localStorage.getItem("usuario") || "",

        cliente: {
          nombre: cliente.nombre,
          rut: cliente.rut,
          sucursal: cliente.local,
          codigoSucursal: cliente.codigoSucursal,
          direccion: cliente.direccion,
          comuna: cliente.comuna,
          zona: cliente.zona,
          local: cliente.local,
          contacto: "",
          email: "pia.ramirez@spartan.cl",
          ejecutivo: "PIA RAMIREZ",
        },

        productos: productosPDF,
        totalPedido: total,
      };

      const pdfBase64 = generarPDFPedido(pedido);

      const payload = {
        ...pedido,
        // Para Apps Script usamos los productos SIN `total`,
        // pero conservando topeKg / topeCantidad que están en productosValidos
        productos: productosValidos,
        total,
        pdfBase64,
      };

      const res = await fetch(URL_APPSCRIPT_NV, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.error) throw new Error(json.error);

      // 🔥 LIMPIAR FORMULARIO
      setCliente({
        nombre: "",
        rut: "",
        codigoSucursal: "",
        direccion: "",
        comuna: "",
        zona: "",
        local: "",
        id_local: "",
      });
      setSucursalSeleccionada("");
      setProductos([
        {
          codigo: "",
          descripcion: "",
          kg: 0,
          precio: 0,
          cantidad: 0,
          topeKg: 0,
          topeCantidad: 0,
        },
      ]);
      setWarnings({});
      setMensaje("Nota de venta enviada correctamente ✔");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Error al enviar la nota de venta");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  //   RENDER
  // ============================
  return (
    <div className="p-10 bg-neutral-900 text-white min-h-screen">
      <h1 className="text-3xl mb-8 font-bold text-amber-400">
        🧾 Nota de Venta — Grupo Mil Sabores
      </h1>

      {/* CLIENTE */}
      <div className="p-6 bg-neutral-800 rounded-xl border border-neutral-700 mb-10">
        <select
          className="w-full p-2 bg-neutral-700 rounded mb-4"
          value={sucursalSeleccionada}
          onChange={(e) => setSucursalSeleccionada(e.target.value)}
        >
          <option value="">Seleccionar sucursal…</option>
          {sucursales.map((s) => (
            <option key={s.ID_LOCAL} value={s.ID_LOCAL}>
              {s.Sucursal}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-4">
          <Campo label="Razón Social" value={cliente.nombre} />
          <Campo label="RUT" value={cliente.rut} />
          <Campo label="Código Sucursal" value={cliente.codigoSucursal} />
          <Campo label="Dirección" value={cliente.direccion} />
          <Campo label="Comuna" value={cliente.comuna} />
          <Campo label="Local" value={cliente.local} />
          <Campo label="Zona" value={cliente.zona} />
        </div>
      </div>

      {/* PRODUCTOS */}
      <div className="p-6 bg-neutral-800 rounded-xl border border-neutral-700">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold text-amber-300">
            Productos Solicitados
          </h2>
          <button
            onClick={addProduct}
            className="bg-amber-500 px-4 py-2 rounded text-black"
          >
            + Agregar
          </button>
        </div>

        <table className="w-full text-sm">
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
              <th className="p-2 text-center">Eliminar</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((p, i) => (
              <React.Fragment key={i}>
                <tr className="border-b border-neutral-700">
                  <td className="p-2">
                    <select
                      className="bg-neutral-700 p-1 rounded w-full"
                      value={p.codigo}
                      onChange={(e) => seleccionarProducto(i, e.target.value)}
                    >
                      <option value="">Seleccionar…</option>

                      {productosPermitidos.map((prod) => (
                        <option key={prod.codigo} value={prod.codigo}>
                          {prod.codigo} — {prod.Producto}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="p-2">{p.descripcion}</td>
                  <td className="p-2 text-right">{p.kg}</td>
                  <td className="p-2 text-right">{p.topeKg}</td>
                  <td className="p-2 text-right">{p.topeCantidad}</td>

                  <td className="p-2 text-right">
                    <input
                      type="number"
                      className="bg-neutral-700 p-1 rounded text-right w-20"
                      min={0}
                      value={p.cantidad}
                      onChange={(e) =>
                        updateProduct(i, "cantidad", Number(e.target.value))
                      }
                    />
                  </td>

                  <td className="p-2 text-right">
                    ${Number(p.precio || 0).toLocaleString("es-CL")}
                  </td>

                  <td className="p-2 text-right">
                    {Number(p.cantidad * p.kg * p.precio || 0).toLocaleString(
                      "es-CL"
                    )}
                  </td>

                  <td className="p-2 text-center">
                    <button
                      className="text-red-400"
                      onClick={() => removeProduct(i)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>

                {warnings[i] && (
                  <tr>
                    <td colSpan={9} className="text-red-400 text-sm p-2 pl-6">
                      {warnings[i]}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <div className="text-right text-amber-400 mt-4 text-lg">
          Total Pedido: ${total.toLocaleString("es-CL")}
        </div>

        {/* BOTONES */}
        <div className="text-right mt-4">
          <button
            onClick={verPDF}
            className="bg-neutral-700 px-4 py-2 rounded hover:bg-neutral-600 mr-3"
          >
            👁 Ver PDF
          </button>

          <button
            onClick={handleGuardarYEnviar}
            className="bg-amber-500 px-4 py-2 rounded text-black hover:bg-amber-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Enviando…" : "Guardar / PDF / Enviar"}
          </button>
        </div>

        {mensaje && <p className="mt-4 text-green-400">{mensaje}</p>}
        {errorMsg && <p className="mt-4 text-red-400">{errorMsg}</p>}
      </div>
    </div>
  );
}

// === COMPONENTE CAMPO ===
function Campo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-xs text-gray-400">{label}</label>
      <input
        className="bg-neutral-700 p-2 rounded w-full"
        value={value}
        readOnly
      />
    </div>
  );
}
