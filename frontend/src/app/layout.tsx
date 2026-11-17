import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { Toaster } from "react-hot-toast";
import "./globals.css";
import "./brand.css";
import AuthGuard from "@/components/layout/AuthGuard";

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Diego Martins Barbearia",
  description: "Agendamento e gestão da Diego Martins Barbearia · Diego Martins",
};

export const viewport: Viewport = {
  themeColor: "#141618",
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
    <html lang="pt-BR">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <AuthGuard>{children}</AuthGuard>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}