"use client";

import { UserCheck } from "lucide-react";

export default function AuditorasPage() {
  return (
    <section className="min-h-screen bg-neutral-900 text-white p-10">
      <div className="flex items-center gap-3 mb-6">
        <UserCheck size={28} className="text-amber-400" />
        <h1 className="text-3xl font-bold text-amber-400">
          Panel de Auditoras
        </h1>
      </div>

      <p className="text-gray-400 text-lg mb-4">
        Aquí las auditoras podrán registrar pedidos, revisar consumos y enviar
        observaciones sobre las sucursales asignadas.
      </p>

      <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6">
        <p className="text-gray-400 italic">
          ⚙️ Módulo en desarrollo — disponible en la siguiente iteración del
          piloto Mil Sabores.
        </p>
      </div>
    </section>
  );
}
