import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import "./brand.css";
import AuthGuard from "@/components/layout/AuthGuard";

// Desktop static export can't fetch Google Fonts at build time, so use a
// plain font stack there. The CSS variable still exists so the UI doesn't
// break, but the font is resolved from the system instead of being loaded
// from Google Fonts.
const isDesktop = process.env.NEXT_BUILD_MODE === "desktop";
const display = isDesktop
  ? { variable: "--font-display", className: "" }
  : {
      subsets: ["latin"],
      weight: ["300", "400", "500", "600", "700"],
      style: ["normal", "italic"],
      variable: "--font-display",
      display: "swap",
    };
const body = isDesktop
  ? { variable: "--font-body", className: "" }
  : {
      subsets: ["latin"],
      weight: ["300", "400", "500", "600", "700"],
      variable: "--font-body",
      display: "swap",
    };

export const metadata: Metadata = {
  title: "Área del equipo",
  description: "Reservas y gestión de Cix Nail Artist · Manicura y pedicura en Santa Cruz de la Sierra",
};

export const viewport: Viewport = {
  themeColor: "#1c1413",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <AuthGuard>{children}</AuthGuard>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}