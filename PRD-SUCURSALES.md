# PRD: Gestión de Sucursales (Branches) — Cix Nail Artist

## Resumen ejecutivo
Permite al equipo de Cix Nail Artist administrar las sucursales/sedes que aparecen en la web de reservas pública. Cada sucursal tiene nombre, zona/dirección, enlace WhatsApp, enlace Google Maps, orden de visualización y estado activo/inactivo. La gestión se hace desde el backoffice (`/sucursales`) con CRUD completo y soft-delete; la web pública consume solo las sucursales activas vía `GET /api/public/booking/config`.

---

## 1. Alcance y objetivos

| Objetivo | Estado |
|----------|--------|
| CRUD completo de sucursales desde backoffice | ✅ Implementado |
| Soft-delete (ocultar sin perder historial) | ✅ Implementado |
| Orden personalizable (sort_order) | ✅ Implementado |
| Normalización automática de URLs WhatsApp | ✅ Implementado |
| Filtro `is_active` en endpoint público | ✅ Implementado |
| Modal de selección de sucursal en flujo de reserva | ✅ Implementado |

**Fuera de alcance**: gestión de horarios por sucursal, asignación de estilistas a sucursales, inventario por sede.

---

## 2. Modelo de datos

### Tabla `branches` (SQLite)

| Columna | Tipo | Nullable | Default | Descripción |
|---------|------|----------|---------|-------------|
| `id` | TEXT | NO | — | PK: `branch-{timestamp}-{random}` |
| `name` | TEXT | NO | — | Nombre visible (ej. "CIX Central") |
| `zone` | TEXT | YES | NULL | Zona/dirección breve (ej. "Zona Norte · Av. Beni") |
| `whatsapp_url` | TEXT | YES | NULL | Enlace wa.me normalizado |
| `maps_url` | TEXT | YES | NULL | Enlace Google Maps (embed o app) |
| `is_active` | INTEGER | NO | 1 | 1 = visible en web, 0 = oculta |
| `sort_order` | INTEGER | NO | 0 | Orden de muestra (menor primero) |
| `created_at` | TEXT | NO | `now()` | ISO 8601 |
| `updated_at` | TEXT | NO | `now()` | ISO 8601 |
| `deleted_at` | TEXT | YES | NULL | Soft-delete timestamp |

**Índices**: ninguno explícito; consultas filtran por `deleted_at IS NULL` y `is_active = 1`.

### TypeScript (frontend) — `BookingBranch`

```ts
export interface BookingBranch {
  id: string;
  name: string;
  zone: string;
  whatsappUrl: string;
  mapsUrl: string;
  sortOrder?: number;
  isActive?: boolean;   // solo en respuesta admin; público no lo expone
}
```

---

## 3. API — Backoffice (`/api/branches`)

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/branches` | Admin | Lista todas (incluye inactivas, excluye soft-deleted). Orden: `sort_order, name`. |
| GET | `/api/branches/:id` | Admin | Detalle de una sucursal. |
| POST | `/api/branches` | Admin | Crea nueva. Body: `{ name*, zone?, whatsapp_url?, maps_url?, is_active?, sort_order? }`. |
| PUT | `/api/branches/:id` | Admin | Actualización parcial (PATCH semántico). Campos opcionales. |
| DELETE | `/api/branches/:id` | Admin | **Soft-delete**: setea `deleted_at = now()`. No borra fila. |

### Validaciones
- `name` obligatorio, trim, no vacío → 400.
- `whatsapp_url`: normalización automática (ver §5).
- `is_active`: booleano → 0/1 en BD.
- `sort_order`: número ≥ 0, default 0.
- 404 si `id` no existe o ya tiene `deleted_at`.

### Respuesta normalizada (`publicBranch`)
```ts
{
  id, name, zone: '', whatsappUrl: '', mapsUrl: '', isActive: boolean, sortOrder: number
}
```

---

## 4. API — Público (`/api/public/booking/config`)

- **Solo sucursales activas**: `WHERE deleted_at IS NULL AND is_active = 1`.
- Orden: `sort_order, name`.
- **No expone** `isActive` ni `deleted_at`; el cliente asume que todo lo que llega está activo.
- Consumido por `app/agendar/page.tsx` → `branches` en `BookingConfig`.

---

## 5. Normalización WhatsApp (`normalizeWhatsappUrl`)

```ts
function normalizeWhatsappUrl(raw: string): string {
  const v = raw.trim();
  if (!v) return '';
  // Número crudo → wa.me
  if (/^\+?\d[\d\s\-()]{6,}$/.test(v)) return `https://wa.me/${v.replace(/\D/g, '')}`;
  // Sin esquema → añade https://
  if (!/^https?:\/\//i.test(v)) return `https://${v}`;
  return v;
}
```

**Casos de prueba**
| Entrada | Salida |
|---------|--------|
| `59167943253` | `https://wa.me/59167943253` |
| `+591 67943253` | `https://wa.me/59167943253` |
| `https://wa.me/59167943253` | (sin cambios) |
| `wa.me/59167943253` | `https://wa.me/59167943253` |

---

## 6. Frontend — Backoffice (`/sucursales`)

### Vista principal
- Tabla responsive con columnas: **Nombre**, **Zona**, **WhatsApp** (link clicable), **Mapa** (link clicable), **Orden**, **Estado** (Activa/Inactiva), **Acciones** (Editar/Eliminar).
- Empty state: "Ninguna sucursal todavía. Agrega la primera."
- Botón "Agregar sucursal" → abre modal de creación.

### Modal Crear / Editar
| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| Nombre | text | ✅ | `required` HTML |
| Zona / dirección | text | ❌ | placeholder "Zona Norte · Av. Beni" |
| WhatsApp (link o número) | text | ❌ | ayuda: "Acepta enlaces wa.me / api.whatsapp.com o un número con código de país." |
| Link Google Maps | text | ❌ | placeholder "https://maps.app.goo.gl/..." |
| Orden de muestra | number | ❌ | default: `branches.length + 1` (crear) / valor actual (editar) |
| Visible en reservas | checkbox | ❌ | default: `true` (crear) / valor actual (editar) |

### Eliminación
- Confirmación nativa: `confirm(\`Eliminar la sucursal ${name}? Se ocultará de la web de reservas.\`)`
- Llama `DELETE /api/branches/:id` → soft-delete.
- Toast: "Sucursal eliminada" / "Error al eliminar".

### Feedback
- `react-hot-toast`: éxito ("Sucursal agregada"/"Sucursal actualizada"), error (mensaje del backend o genérico).

---

## 7. Frontend — Público (Flujo de reserva)

### `BranchModal` (`components/booking/branch-modal.tsx`)
- Se abre al tocar cualquier CTA de WhatsApp **si hay >1 sucursal activa**.
- Si hay 1 sola sucursal → abre directo su `whatsappUrl`.
- Renderiza tarjetas por sucursal:
  - Nombre + zona
  - Botón **WhatsApp** (verde, abre `whatsappUrl` en nueva pestaña)
  - Botón **Direcciones** (outline, abre `mapsUrl` en nueva pestaña)
- Accesibilidad: `role="dialog"`, `aria-modal`, `aria-label`, foco atrapado, ESC cierra, click overlay cierra.

### `app/agendar/page.tsx`
- Llama `GET /api/public/booking/config` → `config.branches`.
- Estado `branchModalOpen` controla modal.
- Lógica de decisión (líneas ~264-265):
  ```ts
  if (branches.length > 1) setBranchModalOpen(true);
  else if (branches[0]?.whatsappUrl) window.open(branches[0].whatsappUrl, '_blank');
  ```

---

## 8. Seeding y migraciones (`main/db.ts`)

- `ensureBranchesTable()`: crea tabla + columna `deleted_at` si no existe (ALTER TABLE).
- Seed con `INSERT OR IGNORE` (id determinista) → **no resucita** sucursales soft-deleted.
- Ejemplos seed: "CIX Central", "CIX Norte", "CIX Sur" (Santa Cruz de la Sierra).

---

## 9. Reglas de negocio implícitas

1. **Soft-delete irreversible desde UI**: no hay "restaurar"; requeriría SQL manual.
2. **Una sucursal = un destino WhatsApp**: no hay múltiples números por sede.
3. **Orden global**: `sort_order` aplica tanto en backoffice como en web pública.
4. **Inactiva ≠ eliminada**: `is_active = 0` oculta de la web pero sigue listada en backoffice (badge "Inactiva").
5. **WhatsApp normalizado al guardar**: lo que el usuario escribe se transforma a `https://wa.me/...` antes de persistir.

---

## 10. Pruebas de aceptación (manuales)

| Escenario | Pasos | Resultado esperado |
|-----------|-------|-------------------|
| Crear sucursal | Ir a `/sucursales` → Agregar → completar nombre + zona → Guardar | Aparece en tabla, estado "Activa", orden auto. |
| Editar sucursal | Click Editar → cambiar zona → Guardar | Cambio persistente, toast éxito. |
| Desactivar | Editar → descheck "Visible en reservas" → Guardar | Badge "Inactiva"; **no** aparece en `/agendar`. |
| Eliminar | Click Eliminar → confirmar | Desaparece de tabla; `deleted_at` seteado; no resucita en restart. |
| WhatsApp número crudo | Crear con `59167943253` | Guardado como `https://wa.me/59167943253`; botón abre chat. |
| Múltiples sucursales en reserva | Ir a `/agendar` → click WhatsApp CTA | Abre `BranchModal` con todas las activas. |
| Una sola sucursal en reserva | Solo 1 activa → click WhatsApp CTA | Abre directo `wa.me` sin modal. |
| Soft-delete + restart | Eliminar → reiniciar servidor (`npm run build && npm start`) | Sucursal **no** reaparece (seed usa `INSERT OR IGNORE`). |

---

## 11. Archivos clave

| Archivo | Responsabilidad |
|---------|-----------------|
| `main/routes/branches.ts` | API CRUD backoffice + normalización WhatsApp |
| `main/routes/public-booking.ts` | Endpoint público `/config` (filtro `is_active=1`) |
| `main/db.ts` | Tabla, migración `deleted_at`, seed |
| `frontend/src/app/(dashboard)/sucursales/page.tsx` | UI backoffice completa |
| `frontend/src/components/booking/branch-modal.tsx` | Modal selección sucursal (público) |
| `frontend/src/app/agendar/page.tsx` | Lógica de decisión modal vs directo |
| `frontend/src/lib/booking-types.ts` | Tipos `BookingBranch`, `BookingConfig` |

---

## 12. Próximos pasos / Deuda técnica

- [ ] Tests unitarios para `normalizeWhatsappUrl`.
- [ ] Tests de integración API (supertest) para CRUD + soft-delete.
- [ ] E2E (Playwright): crear → editar → desactivar → eliminar → verificar público.
- [ ] Paginación en `/api/branches` si >50 sucursales.
- [ ] Auditoría: log de quién creó/editó/eliminó (tabla `branch_audit`).
- [ ] Validación `maps_url` (debe ser Google Maps / maps.app.goo.gl).
- [ ] Soporte multi-idioma en nombre/zona (actualmente solo texto libre).

---

## 13. Changelog

| Fecha | Commit | Cambio |
|-------|--------|--------|
| 2026-11-21 | `92e515e` | CRUD completo sucursales backoffice + soft-delete + normalización WhatsApp + modal público |
| 2026-11-20 | `efd3488` | Normalización Bolivia settings al arranque (afecta currency/tz en config público) |
| 2026-11-19 | `7ec4645` | WhatsApp chooser + direcciones, dashboard ES/BO (QR, NIT, Bs) |