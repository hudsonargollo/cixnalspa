import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return `${(amount || 0).toLocaleString('es-BO', { maximumFractionDigits: 2 })} Bs`;
}
