import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Control de Gastos – Mil Sabores",
  description:
    "Panel de control de gastos y órdenes de compra de Grupo Mil Sabores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-neutral-950 text-white h-screen">
        <div className="flex min-h-screen">
          {/* Sidebar a toda la altura de la ventana */}
          <aside className="w-64 bg-black text-white flex flex-col justify-between fixed top-0 left-0 h-screen border-r border-neutral-800">
            <Sidebar />
          </aside>

          {/* Contenido principal con margen para dejar espacio al sidebar */}
          <main className="flex-1 ml-64 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 p-8 overflow-y-auto min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
