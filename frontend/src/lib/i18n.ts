'use client';

// ─────────────────────────────────────────────────────────────
// Booking page i18n — Spanish (default), Portuguese, English.
// Choice persists in localStorage; header toggle cycles ES→PT→EN.
// ─────────────────────────────────────────────────────────────

export type Lang = 'es' | 'pt' | 'en';
export const LANGS: Lang[] = ['es', 'pt', 'en'];
export const LANG_LABEL: Record<Lang, string> = { es: 'ES', pt: 'PT', en: 'EN' };
const STORAGE_KEY = 'cix_booking_lang';

export function loadLang(): Lang {
  if (typeof window === 'undefined') return 'es';
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'pt' || stored === 'en' ? stored : 'es';
}

export function saveLang(lang: Lang): void {
  localStorage.setItem(STORAGE_KEY, lang);
}

export function nextLang(lang: Lang): Lang {
  return LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length];
}

export const LOCALES: Record<Lang, string> = { es: 'es-BO', pt: 'pt-BR', en: 'en-US' };

export function money(value: number, lang: Lang): string {
  return `${Math.round(value || 0)} Bs`;
}

// Service copy keyed by product id (DB names stay canonical Spanish).
const SERVICE_COPY: Record<string, Record<Lang, { name: string; description: string }>> = {
  'cix-prod-01': {
    es: { name: 'Manicura Gel', description: 'Manicura en gel de larga duración. Un solo tono, francesas o decoración a elección.' },
    pt: { name: 'Manicura Gel', description: 'Manicura em gel de longa duração. Um só tom, francesinhas ou decoração à escolha.' },
    en: { name: 'Gel Manicure', description: 'Long-lasting gel manicure. One tone, French tips or nail art of your choice.' },
  },
  'cix-prod-02': {
    es: { name: 'Pedicura Pedispa', description: 'Pedicura con spa: hidratación, exfoliación y acabado perfecto. Un solo tono, francesas o decoración.' },
    pt: { name: 'Pedicura Pedispa', description: 'Pedicura spa: hidratação, esfoliação e acabamento perfeito. Um só tom, francesinhas ou decoração.' },
    en: { name: 'Pedispa Pedicure', description: 'Spa pedicure with hydration, exfoliation and a flawless finish. One tone, French tips or nail art.' },
  },
  'cix-prod-03': {
    es: { name: 'Combo Manos y Pies', description: 'Manicura y pedicura en la misma sesión. Elige la técnica y el diseño para cada una.' },
    pt: { name: 'Combo Mãos e Pés', description: 'Manicura e pedicura na mesma sessão. Escolha a técnica e o desenho para cada uma.' },
    en: { name: 'Hands & Feet Combo', description: 'Manicure and pedicure in one session. Pick the technique and design for each.' },
  },
  'cix-prod-04': {
    es: { name: 'Manicura Acrílica con Decoración', description: 'Acrílico con diseño y decoración a mano, hecho para durar.' },
    pt: { name: 'Manicura Acrílica com Decoração', description: 'Acrílico com design e decoração à mão, feito para durar.' },
    en: { name: 'Acrylic Manicure with Nail Art', description: 'Acrylic with hand-painted design and decoration, made to last.' },
  },
};

export function serviceCopy(id: string, lang: Lang): { name: string; description: string } | null {
  return SERVICE_COPY[id]?.[lang] ?? null;
}

const CATEGORY_COPY: Record<string, Record<Lang, string>> = {
  Servicios: { es: 'Servicios', pt: 'Serviços', en: 'Services' },
  Destacados: { es: 'Destacados', pt: 'Destaques', en: 'Featured' },
};

export function categoryLabel(name: string, lang: Lang): string {
  return CATEGORY_COPY[name]?.[lang] ?? name;
}

const T = {
  // header / hero
  tagline: { es: 'Manicura y Pedicura · Santa Cruz', pt: 'Manicura e Pedicura · Santa Cruz', en: 'Manicure & Pedicure · Santa Cruz' },
  barberRole: { es: 'Nail Artist', pt: 'Nail Artist', en: 'Nail Artist' },
  admin: { es: 'Admin', pt: 'Admin', en: 'Admin' },
  themeToggle: { es: 'Cambiar tema', pt: 'Alternar tema', en: 'Toggle theme' },
  langToggle: { es: 'Cambiar idioma', pt: 'Mudar idioma', en: 'Change language' },
  // about
  aboutTitle: { es: 'Cix Nail Artist', pt: 'Cix Nail Artist', en: 'Cix Nail Artist' },
  aboutBody: {
    es: 'Un espacio pensado para ti. En Cix Nail Artist cada manicura y cada pedicura se hacen con atención cercana, técnica actual y cuidado en cada detalle. Eres la razón de nuestro trabajo diario.',
    pt: 'Um espaço feito para você. Na Cix Nail Artist cada manicura e cada pedicura são feitas com atendimento próximo, técnica atual e atenção a cada detalhe. Você é a razão do nosso trabalho diário.',
    en: 'A space made for you. At Cix Nail Artist every manicure and pedicure gets personal attention, modern technique and care in every detail. You are the reason for our daily work.',
  },
  serviceInfoTitle: { es: 'Antes de tu cita', pt: 'Antes do seu horário', en: 'Good to know' },
  infoDuration: { es: 'Servicios de', pt: 'Procedimentos de', en: 'Services from' },
  infoDurationTo: { es: 'a', pt: 'a', en: 'to' },
  infoLocation: { es: 'Atención en el salón · Zona Equipetrol, Santa Cruz de la Sierra', pt: 'Atendimento no salão · Zona Equipetrol, Santa Cruz de la Sierra', en: 'In-salon service · Zona Equipetrol, Santa Cruz de la Sierra' },
  infoPayment: { es: 'Pago: efectivo o código QR', pt: 'Pagamento: dinheiro ou código QR', en: 'Payment: cash or QR code' },
  // location
  locationTitle: { es: 'Ubicación', pt: 'Localização', en: 'Location' },
  directions: { es: 'Cómo llegar', pt: 'Como chegar', en: 'Get directions' },
  // gallery
  galleryTitle: { es: 'Nuestro trabajo', pt: 'Nosso trabalho', en: 'Our work' },
  ctaTitle1: { es: '¿Lista para', pt: 'Pronta para', en: 'Ready to' },
  ctaTitle2: { es: 'mimarte las manos?', pt: 'mimar as mãos?', en: 'treat your hands?' },
  ctaSub: { es: 'Elige un servicio y agenda tu cita.', pt: 'Escolha um serviço e agende seu horário.', en: 'Pick a service and book your slot.' },
  bookNow: { es: 'Reservar ahora', pt: 'Agendar agora', en: 'Book now' },
  // sections
  featured: { es: 'Servicios destacados', pt: 'Serviços em destaque', en: 'Featured services' },
  // loading / errors
  loading: { es: 'Cargando', pt: 'Carregando', en: 'Loading' },
  loadError: { es: 'No se pudieron cargar los servicios. Revisa tu conexión e inténtalo de nuevo.', pt: 'Não foi possível carregar os serviços. Verifique sua conexão e tente novamente.', en: 'Could not load services. Check your connection and try again.' },
  retry: { es: 'Intentar de nuevo', pt: 'Tentar novamente', en: 'Try again' },
  servicesUnavailable: { es: 'Servicios no disponibles por el momento.', pt: 'Serviços indisponíveis no momento.', en: 'Services unavailable right now.' },
  bookingPaused: { es: 'Las reservas online están pausadas por el momento. Escríbenos por WhatsApp para reservar tu horario.', pt: 'Os agendamentos online estão pausados no momento. Fale com a gente pelo WhatsApp para reservar seu horário.', en: 'Online booking is paused right now. Message us on WhatsApp to reserve your slot.' },
  talkWhatsapp: { es: 'Hablar por WhatsApp', pt: 'Falar no WhatsApp', en: 'Chat on WhatsApp' },
  // calendar step
  back: { es: 'Volver', pt: 'Voltar', en: 'Back' },
  chooseTime: { es: 'Elige el horario', pt: 'Escolha o horário', en: 'Pick a time' },
  noSlots: { es: 'No hay horarios disponibles ese día.', pt: 'Sem horários disponíveis nesse dia.', en: 'No slots available that day.' },
  summary: { es: 'Resumen', pt: 'Resumo', en: 'Summary' },
  service: { es: 'servicio', pt: 'serviço', en: 'service' },
  services: { es: 'servicios', pt: 'serviços', en: 'services' },
  professional: { es: 'Profesional', pt: 'Profissional', en: 'Professional' },
  totalDuration: { es: 'Duración total', pt: 'Duração total', en: 'Total duration' },
  total: { es: 'Total', pt: 'Total', en: 'Total' },
  bookAt: { es: 'Reservar a las', pt: 'Agendar às', en: 'Book at' },
  removeItem: { es: 'Quitar', pt: 'Remover', en: 'Remove' },
  // identify step
  identify: { es: 'Identificación', pt: 'Identificação', en: 'Your details' },
  whoAreYou: { es: '¿Quién eres?', pt: 'Quem é você?', en: 'Who are you?' },
  identifySub: {
    es: 'Necesitamos tu WhatsApp para confirmar el horario y registrar tus visitas en el programa de fidelidad.',
    pt: 'Precisamos do seu WhatsApp para confirmar o horário e registrar suas visitas no programa de fidelidade.',
    en: 'We need your WhatsApp to confirm the slot and track your visits in the loyalty program.',
  },
  yourName: { es: 'Tu nombre', pt: 'Seu nome', en: 'Your name' },
  namePlaceholder: { es: 'Ej: María Pérez', pt: 'Ex: Maria Silva', en: 'e.g. Mary Smith' },
  welcomeBack: { es: '¡Hola de nuevo,', pt: 'Olá de volta,', en: 'Welcome back,' },
  youHave: { es: 'Tienes', pt: 'Você tem', en: 'You have' },
  visit: { es: 'visita', pt: 'visita', en: 'visit' },
  visits: { es: 'visitas', pt: 'visitas', en: 'visits' },
  firstTime: { es: '¿Primera vez por aquí? ¡Bienvenida!', pt: 'Primeira vez por aqui? Seja muito bem-vinda!', en: 'First time here? Welcome!' },
  booking: { es: 'Reservando...', pt: 'Agendando...', en: 'Booking...' },
  confirmBooking: { es: 'Confirmar reserva', pt: 'Confirmar agendamento', en: 'Confirm booking' },
  consent: { es: 'Al continuar, aceptas recibir mensajes sobre tu reserva.', pt: 'Ao continuar, você concorda em receber mensagens sobre o seu agendamento.', en: 'By continuing you agree to receive messages about your booking.' },
  bookingError: { es: 'No se pudo completar la reserva. Inténtalo de nuevo.', pt: 'Não foi possível concluir o agendamento. Tente novamente.', en: 'Could not complete the booking. Please try again.' },
  // success step
  booked: { es: '¡Reservado!', pt: 'Agendado!', en: 'Booked!' },
  hello: { es: 'Hola', pt: 'Olá', en: 'Hi' },
  successBody1: { es: 'Tu horario quedó confirmado para el', pt: 'Seu horário foi confirmado para', en: 'Your slot is confirmed for' },
  successBody2: { es: 'a las', pt: 'às', en: 'at' },
  with: { es: 'Con:', pt: 'Com:', en: 'With:' },
  rewardUnlocked: { es: '¡Recompensa desbloqueada!', pt: 'Recompensa desbloqueada!', en: 'Reward unlocked!' },
  rewardBody1: { es: '¡Completaste', pt: 'Você completou', en: 'You completed' },
  rewardBody2: { es: 'visitas! Tu beneficio de', pt: 'visitas! Seu benefício de', en: 'visits! Your reward of' },
  rewardBody3: { es: 'ya está disponible.', pt: 'já está liberado.', en: 'is now available.' },
  newBooking: { es: 'Nueva reserva', pt: 'Novo agendamento', en: 'New booking' },
  reschedule: { es: '¿Necesitas cambiar? Escríbenos por WhatsApp', pt: 'Precisa remarcar? Fale no WhatsApp', en: 'Need to reschedule? Message us on WhatsApp' },
  // cart
  yourServices: { es: 'Tus servicios', pt: 'Seus serviços', en: 'Your services' },
  close: { es: 'Cerrar', pt: 'Fechar', en: 'Close' },
  viewSelected: { es: 'Ver servicios seleccionados', pt: 'Ver serviços selecionados', en: 'View selected services' },
  // service card
  moreInfo: { es: 'Más info', pt: 'Mais info', en: 'More info' },
  less: { es: 'Menos', pt: 'Menos', en: 'Less' },
  add: { es: 'Agregar', pt: 'Adicionar', en: 'Add' },
  remove: { es: 'Quitar', pt: 'Remover', en: 'Remove' },
  // loyalty
  loyalty: { es: 'Fidelidad', pt: 'Fidelidade', en: 'Loyalty' },
  rewardReady: { es: '¡Tu recompensa está disponible!', pt: 'Sua recompensa está liberada!', en: 'Your reward is ready!' },
  remaining1: { es: 'Falta', pt: 'Falta', en: 'Only' },
  remaining2: { es: 'visita para ganar', pt: 'visita para ganhar', en: 'visit to go' },
  remaining2pl: { es: 'visitas para ganar', pt: 'visitas para ganhar', en: 'visits to go' },
  every: { es: 'Cada', pt: 'A cada', en: 'Every' },
  visitsColon: { es: 'visitas:', pt: 'visitas:', en: 'visits:' },
} as const;

export type TKey = keyof typeof T;

export function t(key: TKey, lang: Lang): string {
  return T[key][lang];
}
