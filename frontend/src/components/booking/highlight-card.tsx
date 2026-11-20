'use client';

import type { BookingService } from '@/lib/booking-types';
import { money, serviceCopy, t, type Lang } from '@/lib/i18n';
import { iconUrl } from './service-icons';

// Embossed rosewood icons derived from the CIX Nail Artist logo.
export { categoryIconMap, iconUrl } from './service-icons';

interface HighlightCardProps {
  service: BookingService;
  /** Optional icon name from icons.ts or a config categoryIcon; falls back to built-in medical SVG */
  icon?: string;
  imageUrl?: string;
  isSelected: boolean;
  onToggle: (service: BookingService) => void;
  lang: Lang;
}

export function HighlightCard({ service, imageUrl, isSelected, onToggle, lang, icon }: HighlightCardProps) {
  const copy = serviceCopy(service.id, lang);
  const name = copy?.name ?? service.name;
  const description = copy?.description ?? service.description;

  return (
    <div
      className="relative flex-none w-[220px] rounded-2xl snap-center cursor-pointer transition-all duration-300 flex flex-col overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: isSelected ? '1.5px solid var(--text-primary)' : '1px solid var(--border-subtle)',
        boxShadow: isSelected ? '0 2px 16px rgba(0,0,0,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
      }}
      onClick={() => onToggle(service)}
    >
      <div className="w-full h-48 overflow-hidden flex-shrink-0" style={{ backgroundColor: 'var(--bg-surface-hover)' }}>
        {iconUrl(icon) ? (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-surface-hover)' }}>
            <img src={iconUrl(icon)!} alt="" className="w-20 h-20 object-contain" aria-hidden="true" />
          </div>
        ) : imageUrl ? (
          <img src={imageUrl} alt={name} loading="lazy" className="w-full h-full object-cover" style={{ objectPosition: 'center 15%' }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.55 }}>
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v8M8 12h8" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display text-xl font-light leading-tight mb-2" style={{ color: 'var(--text-primary)' }}>
          {name}
        </h3>

        <p className="text-xs leading-relaxed flex-1 mb-4 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>

        <div className="pt-3 flex items-center justify-between" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <div>
            <div className="font-display text-lg font-light" style={{ color: 'var(--text-primary)' }}>{money(service.price, lang)}</div>
            <div className="flex items-center gap-1 text-xs mt-0.5" style={{ color: 'var(--text-disabled)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {service.duration} min
            </div>
          </div>

          <button
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
            style={isSelected
              ? { backgroundColor: 'var(--text-primary)', color: 'var(--bg-app)', transform: 'scale(1.05)' }
              : { backgroundColor: 'var(--bg-surface-hover)', color: 'var(--text-disabled)', border: '1px solid var(--border-subtle)' }}
            onClick={(event) => { event.stopPropagation(); onToggle(service); }}
            aria-label={isSelected ? t('remove', lang) : t('add', lang)}
          >
            {isSelected ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}