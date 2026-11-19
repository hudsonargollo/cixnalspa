import type { Metadata, Viewport } from 'next';
import './booking.css';

export const metadata: Metadata = {
  title: 'Barbería Diego Martins · Reservas',
  description: 'Reserva tu horario en la Barbería Diego Martins, Santa Cruz de la Sierra. Cortes, barba, cejas y combos. Desde 2004.',
};

export const viewport: Viewport = {
  themeColor: '#141618',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}