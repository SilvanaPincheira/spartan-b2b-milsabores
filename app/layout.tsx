import "./globals.css";
import SidebarWrapper from "./components/SidebarWrapper";

export const metadata = {
  title: "Portal B2B – Mil Sabores",
  description: "Panel de control de consumos y órdenes de compra de Grupo Mil Sabores",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-neutral-950 text-white flex min-h-screen">
        <SidebarWrapper>{children}</SidebarWrapper>
      </body>
    </html>
  );
}
