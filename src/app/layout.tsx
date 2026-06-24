import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Repositorio Sellers",
  description: "Repositorio de sellers por tienda bancaria",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
