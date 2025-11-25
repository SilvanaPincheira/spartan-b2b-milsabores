"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./Sidebar";

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");

    // Si no hay usuario y no estamos en /login -> redirige
    if (!usuario && pathname !== "/login") {
      router.push("/login");
    }
  }, [pathname, router]);

  // Ocultar sidebar en login
  const ocultarSidebar = pathname === "/login";

  return (
    <>
      {!ocultarSidebar && <Sidebar />}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </>
  );
}
