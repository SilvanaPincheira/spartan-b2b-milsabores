"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Building2,
  Package,
  FileText,
  Truck,
  Receipt,
  Gauge,
  UserCheck,
  ShieldCheck,
  Briefcase,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { name: "Inicio", href: "/Inicio", icon: Home },
    { name: "Consumos", href: "/consumos", icon: Gauge },
    { name: "Sucursales", href: "/sucursales", icon: Building2 },
    { name: "Productos", href: "/productos", icon: Package },
    { name: "Órdenes de Compra", href: "/ordenes", icon: FileText },
    { name: "Facturas", href: "/facturas", icon: Receipt },
    { name: "Reportería", href: "/reporteria", icon: Truck },
    { name: "Panel Auditora", href: "/auditoras", icon: UserCheck },
    { name: "Supervisora", href: "/supervisora", icon: ShieldCheck },
    { name: "Gerencia", href: "/gerencia", icon: Briefcase },
  ];

  // 🔒 Función para cerrar sesión
const handleLogout = () => {
  localStorage.removeItem("rol");
  localStorage.removeItem("userName");
  router.push("/login");
};


  return (
    <aside className="h-screen w-64 bg-black text-gray-200 flex flex-col items-center py-6 border-r border-gray-800">

      {/* LOGO */}
      <div className="flex flex-col items-center mb-8">
        <Image
          src="data:image/png;base64,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"
          alt="Logo"
          width={120}
          height={120}
          className="mb-2"
        />
        <h1 className="text-white font-bold text-lg tracking-wide">Mil Sabores</h1>
      </div>

      {/* MENÚ PRINCIPAL */}
      <nav className="flex-1 w-full">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-all ${
                active
                  ? "bg-gray-800 text-white font-semibold"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* BOTÓN DE CIERRE DE SESIÓN */}
      <button
        onClick={handleLogout}
        className="mt-auto mb-4 flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Cerrar sesión</span>
      </button>
    </aside>
  );
}

