'use client';

import type { BookingBranch } from '@/lib/booking-types';
import { t, type Lang } from '@/lib/i18n';

interface BranchModalProps {
  open: boolean;
  onClose: () => void;
  lang: Lang;
  branches: BookingBranch[];
}

// Popup shown when the client taps any WhatsApp CTA: pick a sucursal,
// then jump straight to that branch's WhatsApp chat.
export function BranchModal({ open, onClose, lang, branches }: BranchModalProps) {
  if (!open || branches.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t('chooseBranch', lang)}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(20,14,13,0.55)', backdropFilter: 'blur(2px)' }}
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden animate-fade-in-up"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', boxShadow: '0 12px 40px rgba(0,0,0,0.25)' }}
      >
        <div className="px-5 pt-5 pb-4 flex items-start justify-between gap-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <div>
            <h2 className="font-display text-xl font-light" style={{ color: 'var(--text-primary)' }}>{t('chooseBranch', lang)}</h2>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t('chooseBranchSub', lang)}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-all hover:opacity-70"
            style={{ backgroundColor: 'var(--bg-surface-hover)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}
            aria-label={t('close', lang)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-3">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="rounded-xl p-4"
              style={{ backgroundColor: 'var(--bg-surface-hover)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="mb-3">
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{branch.name}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{branch.zone}</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={branch.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: '#25D366', color: '#fff' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.445h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411zm-8.475 18.29h-.005c-1.78 0-3.526-.477-5.052-1.379l-.363-.214-3.756.98.999-3.648-.236-.375a9.86 9.86 0 0 1-1.516-5.26c.002-5.45 4.458-9.886 9.936-9.886 2.653 0 5.147 1.029 7.023 2.899a9.82 9.82 0 0 1 2.909 6.994c-.003 5.45-4.459 9.889-9.939 9.889z" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-full text-xs font-medium transition-all hover:opacity-80"
                  style={{ border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}
                  aria-label={`${t('directions', lang)} — ${branch.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  {t('directions', lang)}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
