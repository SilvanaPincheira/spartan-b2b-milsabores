"use client";

import "./globals.css";
import Sidebar from "./components/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const metadata = {
  title: "Portal B2B – Mil Sabores",
  description:
    "Panel de control de consumos y órdenes de compra de Grupo Mil Sabores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const rol = localStorage.getItem("rol");

    // Permitir acceso solo si hay rol guardado o estamos en /login
    if (!rol && pathname !== "/login") {
      router.push("/login");
    }
  }, [pathname, router]);

  // Ocultar sidebar en la vista de login
  const ocultarSidebar = pathname === "/login";

  return (
    <html lang="es">
      <body className="bg-neutral-950 text-white flex min-h-screen">
        {!ocultarSidebar && <Sidebar />}
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
