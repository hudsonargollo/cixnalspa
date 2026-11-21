'use client';

import { useState } from 'react';
import type { BookingService } from '@/lib/booking-types';
import { durationLabel } from '@/lib/booking-utils';
import { money, serviceCopy, categoryLabel, t, type Lang } from '@/lib/i18n';
import { iconUrl } from '@/components/booking/service-icons';

interface ServiceCardProps {
  service: BookingService;
  isSelected: boolean;
  onToggle: (service: BookingService) => void;
  lang: Lang;
}

export function ServiceCard({ service, isSelected, onToggle, lang }: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const copy = serviceCopy(service.id, lang);
  const name = copy?.name ?? service.name;
  const description = copy?.description ?? service.description;
  const thumb = service.image ?? iconUrl(service.categoryIcon);

  return (
    <div
      className="relative p-4 mb-4 rounded-3xl transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: isSelected ? '1.5px solid var(--brand-accent)' : '1px solid var(--border-subtle)',
        boxShadow: isSelected
          ? '0 8px 24px rgba(166,90,76,0.16)'
          : '0 2px 10px rgba(0,0,0,0.05)',
      }}
      onClick={() => onToggle(service)}
    >
      <div className="flex items-start gap-4">
        {thumb ? (
          <img
            src={thumb}
            alt=""
            loading="lazy"
            className="w-24 h-24 rounded-2xl shrink-0 object-cover"
            style={{
              objectFit: service.image ? 'cover' : 'contain',
              padding: service.image ? 0 : '10px',
              backgroundColor: service.image ? 'var(--bg-surface-hover)' : 'transparent',
            }}
            aria-hidden="true"
          />
        ) : (
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'var(--bg-surface-hover)' }}
          >
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--text-disabled)' }}>
              {service.category.charAt(0)}
            </span>
          </div>
        )}

        <div className="flex flex-col justify-center flex-1 min-w-0">
          <h3
            className="font-display text-[22px] font-light leading-snug mb-1.5"
            style={{ color: 'var(--text-primary)' }}
          >
            {name}
          </h3>

          <div className="flex items-center gap-2.5 text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {service.duration} min
            </span>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: service.categoryColor || 'var(--accent-line)' }} />
            <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
              {money(service.price, lang)}
            </span>
          </div>

          <button
            onClick={(event) => { event.stopPropagation(); setExpanded(!expanded); }}
            className="self-start text-[11px] font-medium uppercase tracking-widest flex items-center gap-1.5 transition-opacity hover:opacity-60"
            style={{ color: 'var(--brand-accent)' }}
          >
            {expanded ? t('less', lang) : t('moreInfo', lang)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        <button
          aria-label={isSelected ? `${t('remove', lang)} ${name}` : `${t('add', lang)} ${name}`}
          className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 shrink-0"
          style={isSelected
            ? { backgroundColor: 'var(--brand-accent)', color: '#fff3ee', transform: 'scale(1.05)' }
            : { backgroundColor: 'var(--bg-surface-hover)', color: 'var(--text-disabled)', border: '1px solid var(--border-subtle)' }}
          onClick={(event) => { event.stopPropagation(); onToggle(service); }}
        >
          {isSelected ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
        </button>
      </div>

      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="text-xs pt-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 flex items-center gap-1.5 text-[10px] uppercase tracking-widest" style={{ borderTop: '1px solid var(--border-subtle)', color: 'var(--text-disabled)' }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.categoryColor || 'var(--accent-line)' }} />
        {categoryLabel(service.category, lang)}
        <span className="sr-only">{durationLabel(service.duration)}</span>
      </div>
    </div>
  );
}
