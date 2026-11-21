// Cix Nail Artist — sucursales en Santa Cruz de la Sierra.
// Source of truth: imgs/cix nail_salon_business_details.md
export interface Branch {
  id: string;
  name: string;
  zone: string;
  whatsappUrl: string;
  mapsUrl: string;
}

export const BRANCHES: Branch[] = [
  {
    id: 'central',
    name: 'CIX Central',
    zone: 'Zona Norte · Av. Beni',
    whatsappUrl: 'https://wa.me/message/SGYOW5XIK73RP1',
    mapsUrl: 'https://maps.app.goo.gl/xiD6tQbQ9jn4egry9',
  },
  {
    id: 'equipetrol',
    name: 'CIX Equipetrol',
    zone: 'Zona Equipetrol',
    whatsappUrl: 'https://api.whatsapp.com/send?phone=59167943253',
    mapsUrl: 'https://maps.app.goo.gl/hLMgcDFuUdGJR9Xr9',
  },
  {
    id: 'urbari',
    name: 'CIX Urbarí',
    zone: 'Zona Urbarí y Las Palmas',
    whatsappUrl: 'https://api.whatsapp.com/send?phone=59168906506',
    mapsUrl: 'https://maps.app.goo.gl/pQu2CgVUhfLFa5Y99',
  },
];
