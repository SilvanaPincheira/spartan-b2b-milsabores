"use client";

import { Briefcase } from "lucide-react";

export default function GerenciaPage() {
  return (
    <section className="min-h-screen bg-neutral-900 text-white p-10">
      <div className="flex items-center gap-3 mb-6">
        <Briefcase size={28} className="text-amber-400" />
        <h1 className="text-3xl font-bold text-amber-400">
          Panel de Gerencia
        </h1>
      </div>

      <p className="text-gray-400 text-lg mb-4">
        En esta vista el Gerente podrá acceder a reportes globales, consumo por
        sucursal, zona y producto, además de los indicadores de desempeño.
      </p>

      <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6">
        <p className="text-gray-400 italic">
          📈 Vista ejecutiva en desarrollo — disponible para la demo del piloto.
        </p>
      </div>
    </section>
  );
}
