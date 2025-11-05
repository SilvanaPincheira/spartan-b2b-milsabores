import "./globals.css";
import Sidebar from "./components/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const metadata = {
  title: "Portal B2B – Mil Sabores",
  description: "Panel de control de consumos y órdenes de compra de Grupo Mil Sabores",
};

// 👇 el componente RootLayout no debe ser "use client"
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-neutral-950 text-white flex min-h-screen">
        <SidebarWrapper>{children}</SidebarWrapper>
      </body>
    </html>
  );
}

// 👇 crea un pequeño wrapper cliente separado
function SidebarWrapper({ children }: { children: React.ReactNode }) {
  "use client";
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    if (!rol && pathname !== "/login") {
      router.push("/login");
    }
  }, [pathname, router]);

  const ocultarSidebar = pathname === "/login";

  return (
    <>
      {!ocultarSidebar && <Sidebar />}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </>
  );
}

