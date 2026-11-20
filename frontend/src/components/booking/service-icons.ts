'use client';

import type { BookingService } from '@/lib/booking-types';
import { money, serviceCopy, t, type Lang } from '@/lib/i18n';

const ICON_DIR = '/cixnails/icons/';

// Embossed rosewood icons derived from the CIX Nail Artist logo. The `icon`
// field on a service/category is the key to pick one of these.
export const categoryIconMap: Record<string, string> = {
  manicura: 'manicure',
  pedicura: 'pedicure',
  gel: 'gel',
  acrilico: 'acrylic',
  francesas: 'french',
  decoracion: 'decoracion',
  combo: 'combo',
  destacados: 'combo',
};

/** Logo-derived icon URL for a category/service icon key. */
export function iconUrl(key?: string | null): string | null {
  if (!key) return null;
  const name = categoryIconMap[key] ?? key;
  return `${ICON_DIR}${name}.svg`;
}
