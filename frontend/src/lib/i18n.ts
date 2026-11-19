'use client';

// ─────────────────────────────────────────────────────────────
// Booking page i18n — Spanish (default), Portuguese, English.
// Choice persists in localStorage; header toggle cycles ES→PT→EN.
// ─────────────────────────────────────────────────────────────

export type Lang = 'es' | 'pt' | 'en';
export const LANGS: Lang[] = ['es', 'pt', 'en'];
export const LANG_LABEL: Record<Lang, string> = { es: 'ES', pt: 'PT', en: 'EN' };
const STORAGE_KEY = 'dm_booking_lang';

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
  'dm-corte': {
    es: { name: 'Corte', description: 'Corte a tijera y máquina, degradados y contornos definidos, con lavado y peinado final.' },
    pt: { name: 'Corte', description: 'Corte com tesoura e máquina, degradês e contornos definidos, com lavagem e finalização.' },
    en: { name: 'Haircut', description: 'Scissor and clipper cut, fades and crisp lines, finished with a wash and style.' },
  },
  'dm-barba': {
    es: { name: 'Barba', description: 'Perfilado y modelado de barba con toalla caliente, navaja y aceite para un acabado impecable.' },
    pt: { name: 'Barba', description: 'Design e modelagem de barba com toalha quente, navalha e óleo para um acabamento impecável.' },
    en: { name: 'Beard', description: 'Beard shaping and sculpting with hot towel, razor and oil for a flawless finish.' },
  },
  'dm-cabello-barba': {
    es: { name: 'Cabello + Barba', description: 'El combo completo: corte de cabello más barba perfilada. Sal renovado de pies a cabeza.' },
    pt: { name: 'Cabelo + Barba', description: 'O combo completo: corte de cabelo mais barba desenhada. Saia renovado da cabeça aos pés.' },
    en: { name: 'Hair + Beard', description: 'The full combo: haircut plus sculpted beard. Leave looking sharp from head to toe.' },
  },
  'dm-cejas': {
    es: { name: 'Cejas', description: 'Diseño y alineación de cejas con navaja: simetría y limpieza para realzar tu mirada.' },
    pt: { name: 'Sobrancelhas', description: 'Design e alinhamento de sobrancelhas com navalha: simetria e limpeza para realçar o olhar.' },
    en: { name: 'Eyebrows', description: 'Eyebrow shaping and clean-up with razor: symmetry and definition to frame your look.' },
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
  tagline: { es: 'Barbería · Desde 2004', pt: 'Barbearia · Desde 2004', en: 'Barbershop · Since 2004' },
  barberRole: { es: 'Barbero', pt: 'Barbeiro', en: 'Barber' },
  admin: { es: 'Admin', pt: 'Admin', en: 'Admin' },
  themeToggle: { es: 'Cambiar tema', pt: 'Alternar tema', en: 'Toggle theme' },
  langToggle: { es: 'Cambiar idioma', pt: 'Mudar idioma', en: 'Change language' },
  // about
  aboutTitle: { es: 'Quién soy', pt: 'Quem sou eu', en: 'About me' },
  aboutBody: {
    es: 'Un espacio hecho para ti. En la Barbería Diego Martins, cada corte y cada barba se hacen con atención cercana, técnica actualizada y cuidado en cada detalle. Más de 20 años de oficio, desde 2004.',
    pt: 'Um espaço feito para você. Na Barbería Diego Martins, cada corte e cada barba são feitos com atendimento próximo, técnica atual e atenção a cada detalhe. Mais de 20 anos de ofício, desde 2004.',
    en: 'A space made for you. At Diego Martins Barbershop, every cut and every beard gets personal attention, modern technique and care in every detail. Over 20 years of craft, since 2004.',
  },
  serviceInfoTitle: { es: 'Atención', pt: 'Atendimento', en: 'Good to know' },
  infoDuration: { es: 'Servicios de', pt: 'Procedimentos de', en: 'Services from' },
  infoDurationTo: { es: 'a', pt: 'a', en: 'to' },
  infoLocation: { es: 'Atención en la barbería — Santa Cruz de la Sierra', pt: 'Atendimento na barbería — Santa Cruz de la Sierra', en: 'In-shop service — Santa Cruz de la Sierra' },
  infoPayment: { es: 'Pago: efectivo, QR o tarjeta', pt: 'Pagamento: dinheiro, QR ou cartão', en: 'Payment: cash, QR or card' },
  // location
  locationTitle: { es: 'Ubicación', pt: 'Localização', en: 'Location' },
  directions: { es: 'Cómo llegar', pt: 'Como chegar', en: 'Get directions' },
  // gallery
  galleryTitle: { es: 'Nuestro trabajo', pt: 'Nosso trabalho', en: 'Our work' },
  ctaTitle1: { es: '¿Listo para', pt: 'Pronto para', en: 'Ready to' },
  ctaTitle2: { es: 'renovar tu estilo?', pt: 'renovar o visual?', en: 'refresh your look?' },
  ctaSub: { es: 'Elige un servicio y agenda con Diego.', pt: 'Escolha um serviço e agende com o Diego.', en: 'Pick a service and book with Diego.' },
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
  namePlaceholder: { es: 'Ej: Juan Pérez', pt: 'Ex: João Silva', en: 'e.g. John Smith' },
  welcomeBack: { es: '¡Hola de nuevo,', pt: 'Olá de volta,', en: 'Welcome back,' },
  youHave: { es: 'Tienes', pt: 'Você tem', en: 'You have' },
  visit: { es: 'visita', pt: 'visita', en: 'visit' },
  visits: { es: 'visitas', pt: 'visitas', en: 'visits' },
  firstTime: { es: '¿Primera vez por aquí? ¡Bienvenido!', pt: 'Primeira vez por aqui? Seja muito bem-vindo!', en: 'First time here? Welcome!' },
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