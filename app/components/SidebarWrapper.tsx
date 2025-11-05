"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./Sidebar";

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const rol = localStorage.getItem("rol");

    // Si no hay rol y no estamos en /login, redirige al login
    if (!rol && pathname !== "/login") {
      router.push("/login");
    }
  }, [pathname, router]);

  // Oculta el sidebar en la vista de login
  const ocultarSidebar = pathname === "/login";

  return (
    <>
      {!ocultarSidebar && <Sidebar />}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </>
  );
}
