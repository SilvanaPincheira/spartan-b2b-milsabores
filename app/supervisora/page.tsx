"use client";

import { ShieldCheck } from "lucide-react";

export default function SupervisoraPage() {
  return (
    <section className="min-h-screen bg-neutral-900 text-white p-10">
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck size={28} className="text-amber-400" />
        <h1 className="text-3xl font-bold text-amber-400">
          Panel de Supervisora de Calidad
        </h1>
      </div>

      <p className="text-gray-400 text-lg mb-4">
        Aquí la supervisora podrá monitorear las auditoras, revisar pedidos,
        analizar consumos y controlar los indicadores de desempeño.
      </p>

      <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6">
        <p className="text-gray-400 italic">
          📊 Panel de seguimiento y KPIs próximamente.
        </p>
      </div>
    </section>
  );
}
