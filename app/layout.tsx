import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Control de Gastos – Mil Sabores",
  description: "Panel de control de gastos y órdenes de compra de Grupo Mil Sabores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-neutral-950 text-white flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
