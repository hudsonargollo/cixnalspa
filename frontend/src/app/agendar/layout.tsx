import type { Metadata, Viewport } from 'next';
import './booking.css';

export const metadata: Metadata = {
  title: 'Cix Nail Artist · Reservas',
  description: 'Reserva tu horario en Cix Nail Artist, Santa Cruz de la Sierra. Manicura, pedicura, gel, acrílico y pedispa.',
};

export const viewport: Viewport = {
  themeColor: '#1c1413',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}