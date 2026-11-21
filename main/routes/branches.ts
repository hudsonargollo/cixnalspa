/**
 * /api/branches — sucursales management (Cix Nail Artist).
 * Full CRUD + soft delete. Public clients read them via
 * GET /api/public/booking/config (branches[]).
 */
import { Router, Request, Response } from 'express';
import { getDatabase, now } from '../db';

const router = Router();

interface Branch {
  id: string;
  name: string;
  zone: string | null;
  whatsapp_url: string | null;
  maps_url: string | null;
  is_active: number;
  sort_order: number;
  deleted_at: string | null;
}

function publicBranch(b: Branch) {
  return {
    id: b.id,
    name: b.name,
    zone: b.zone || '',
    whatsappUrl: b.whatsapp_url || '',
    mapsUrl: b.maps_url || '',
    isActive: b.is_active === 1,
    sortOrder: b.sort_order,
  };
}

function normalizeWhatsappUrl(raw: string): string {
  const value = raw.trim();
  if (!value) return '';
  // Accept a raw number/wa.me id and turn it into a tappable wa.me link.
  if (/^\+?\d[\d\s\-()]{6,}$/.test(value)) {
    return `https://wa.me/${value.replace(/\D/g, '')}`;
  }
  if (!/^https?:\/\//i.test(value)) return `https://${value}`;
  return value;
}

router.get('/', (_req: Request, res: Response) => {
  try {
    const rows = getDatabase()
      .prepare('SELECT * FROM branches WHERE deleted_at IS NULL ORDER BY sort_order, name')
      .all() as Branch[];
    res.json({ branches: rows.map(publicBranch) });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const row = getDatabase()
      .prepare('SELECT * FROM branches WHERE id = ? AND deleted_at IS NULL')
      .get(req.params.id) as Branch | undefined;
    if (!row) return res.status(404).json({ error: 'Sucursal no encontrada' });
    res.json({ branch: publicBranch(row) });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', (req: Request, res: Response) => {
  try {
    const { name, zone, whatsapp_url, maps_url, is_active, sort_order } = req.body;
    if (!name || !String(name).trim()) return res.status(400).json({ error: 'El nombre es obligatorio' });
    const id = `branch-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    getDatabase().prepare(`
      INSERT INTO branches (id, name, zone, whatsapp_url, maps_url, is_active, sort_order, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      String(name).trim(),
      zone ? String(zone).trim() : null,
      whatsapp_url ? normalizeWhatsappUrl(String(whatsapp_url)) : null,
      maps_url ? String(maps_url).trim() : null,
      is_active === false ? 0 : 1,
      Number(sort_order) || 0,
      now(),
      now()
    );
    res.status(201).json({ branch: publicBranch(getDatabase().prepare('SELECT * FROM branches WHERE id = ?').get(id) as Branch) });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', (req: Request, res: Response) => {
  try {
    const db = getDatabase();
    const existing = db.prepare('SELECT * FROM branches WHERE id = ? AND deleted_at IS NULL').get(req.params.id) as Branch | undefined;
    if (!existing) return res.status(404).json({ error: 'Sucursal no encontrada' });
    const { name, zone, whatsapp_url, maps_url, is_active, sort_order } = req.body;
    if (name !== undefined && !String(name).trim()) return res.status(400).json({ error: 'El nombre es obligatorio' });

    db.prepare(`
      UPDATE branches SET
        name = COALESCE(?, name),
        zone = ?,
        whatsapp_url = ?,
        maps_url = ?,
        is_active = ?,
        sort_order = ?,
        updated_at = ?
      WHERE id = ?
    `).run(
      name === undefined ? null : String(name).trim(),
      zone === undefined ? existing.zone : (zone ? String(zone).trim() : null),
      whatsapp_url === undefined ? existing.whatsapp_url : (whatsapp_url ? normalizeWhatsappUrl(String(whatsapp_url)) : null),
      maps_url === undefined ? existing.maps_url : (maps_url ? String(maps_url).trim() : null),
      is_active === undefined ? existing.is_active : (is_active ? 1 : 0),
      sort_order === undefined ? existing.sort_order : Number(sort_order),
      now(),
      req.params.id
    );
    res.json({ branch: publicBranch(db.prepare('SELECT * FROM branches WHERE id = ?').get(req.params.id) as Branch) });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Soft delete — sets deleted_at so restart seeding cannot resurrect the branch.
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const result = getDatabase().prepare('UPDATE branches SET deleted_at = ?, updated_at = ? WHERE id = ? AND deleted_at IS NULL').run(now(), now(), req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Sucursal no encontrada' });
    res.json({ message: 'Sucursal eliminada' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export const branchRoutes = router;
