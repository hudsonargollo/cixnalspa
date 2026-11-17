import type { Metadata, Viewport } from 'next';
import './booking.css';

export const metadata: Metadata = {
  title: 'Diego Martins Barbearia · Agendamento',
  description: 'Agende seu horário na Diego Martins Barbearia. Cortes, barbas, combos e cuidados para o visual masculino.',
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