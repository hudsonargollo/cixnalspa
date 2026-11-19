import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase, now } from '../db';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'diegomartins-local-secret-change-in-production';
const JWT_EXPIRES_IN = '24h';

function buildLocalTenant(db: ReturnType<typeof getDatabase>, userRole: string) {
  const rows = db.prepare('SELECT key, value FROM settings').all() as { key: string; value: string }[];
  const s: Record<string, string> = Object.fromEntries(rows.map(r => [r.key, r.value]));

  return {
    id: 1,
    business_name:   s.business_name   || 'Barbería Diego Martins',
    slug:            'local',
    database_name:   'local',
    business_type:   'salon',
    country:         s.country         || 'BO',
    currency:        s.currency        || 'BOB',
    currency_symbol: s.currency_symbol || 'Bs',
    timezone:        s.timezone        || 'America/La_Paz',
    plan:            'desktop',
    status:          'active',
    role:            userRole,
  };
}

// Login accepts an email OR a phone + password (FAQ-style login for the new
// WhatsApp-only onboarding flow). Phone is the customer-facing identifier now.
function resolveUser(db: ReturnType<typeof getDatabase>, identifier: string, password: string) {
  const trimmed = (identifier || '').replace(/\D/g, '');
  const byPhone = db.prepare('SELECT * FROM users WHERE phone = ? AND is_active = 1').get(trimmed) as any;
  if (byPhone && bcrypt.compareSync(password, byPhone.password)) return byPhone;
  return db.prepare('SELECT * FROM users WHERE email = ? AND is_active = 1').get(identifier) as any;
}

router.post('/login', (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) return res.status(400).json({ error: 'Identifier and password required' });

    const db = getDatabase();
    const user = resolveUser(db, identifier, password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role, phone: user.phone }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const tenant = buildLocalTenant(db, user.role);

    res.json({
      access_token: token,
      token_type: 'bearer',
      expires_in: 86400,
      user: { id: user.id, name: user.name, phone: user.phone, role: user.role },
      tenants: [tenant],
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/tenants/select', (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    const db = getDatabase();
    const user = db.prepare('SELECT id, name, email, role FROM users WHERE id = ?').get(decoded.userId) as any;
    if (!user) return res.status(404).json({ error: 'User not found' });

    const tenant = buildLocalTenant(db, user.role);
    const newToken = jwt.sign({ userId: user.id, email: user.email, role: user.role, tenantId: 1 }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({ access_token: newToken, token_type: 'bearer', tenant });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

router.post('/logout', (_req: Request, res: Response) => {
  res.json({ message: 'Logged out successfully' });
});

router.post('/refresh', (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'No token provided' });
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const newToken = jwt.sign({ userId: decoded.userId, email: decoded.email, role: decoded.role, tenantId: decoded.tenantId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ access_token: newToken, token_type: 'bearer', expires_in: 86400 });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

router.get('/me', (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'No token provided' });
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const db = getDatabase();
    const user = db.prepare('SELECT id, name, email, role FROM users WHERE id = ?').get(decoded.userId) as any;
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user, tenants: [buildLocalTenant(db, user.role)] });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

router.post('/password/change', (req: Request, res: Response) => {
  try {
    const { current_password, password } = req.body;
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'No token provided' });
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const db = getDatabase();
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(decoded.userId) as any;
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!bcrypt.compareSync(current_password, user.password)) return res.status(400).json({ error: 'Current password is incorrect' });
    db.prepare('UPDATE users SET password = ?, updated_at = ? WHERE id = ?').run(bcrypt.hashSync(password, 10), now(), decoded.userId);
    res.json({ message: 'Password changed successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/setup/status', (_req: Request, res: Response) => {
  try {
    const db = getDatabase();
    const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
    res.json({ needsSetup: userCount.count === 0 });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/setup/initialize', (req: Request, res: Response) => {
  try {
    const { name, phone, password, business_name } = req.body;
    if (!name || !phone || !password) return res.status(400).json({ error: 'Name, phone, and password are required' });

    const db = getDatabase();
    const phoneDigits = (phone || '').replace(/\D/g, '');
    const lookup = db.prepare('SELECT id FROM users WHERE phone = ?').get(phoneDigits) as any;
    if (lookup) {
      return res.status(400).json({ error: 'User with this WhatsApp already exists' });
    }

    const userId = uuidv4();
    const email = `user-${userId}@diegomartins.local`;
    db.prepare(`INSERT INTO users (id, name, email, phone, password, role, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 'owner', 1, ?, ?)`).run(userId, name, email, phoneDigits, bcrypt.hashSync(password, 10), now(), now());
    db.prepare(`INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('business_type', 'salon', ?)`).run(now());
    if (business_name) db.prepare(`INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('business_name', ?, ?)`).run(business_name, now());

    const token = jwt.sign({ userId, email, role: 'owner', phone: phoneDigits }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const tenant = buildLocalTenant(db, 'owner');

    res.json({
      access_token: token,
      token_type: 'bearer',
      expires_in: 86400,
      user: { id: userId, name, phone: phoneDigits, role: 'owner' },
      tenants: [tenant],
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/setup/seed', (req: Request, res: Response) => {
  try {
    const { business_name } = req.body;
    const db = getDatabase();

    if (business_name) db.prepare(`INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('business_name', ?, ?)`).run(business_name, now());
    db.prepare(`INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('business_type', 'salon', ?)`).run(now());

    const cats = [
      ['cat-seed-1', 'Hair',    '#EC4899', '✂️', 1],
      ['cat-seed-2', 'Facial',  '#F59E0B', '💆', 2],
      ['cat-seed-3', 'Massage', '#6366F1', '🧘', 3],
    ];
    for (const [id, name, color, icon, sort] of cats) {
      db.prepare(`INSERT OR IGNORE INTO categories (id, name, color, icon, sort_order) VALUES (?, ?, ?, ?, ?)`).run(id, name, color, icon, sort);
    }
    const products = [
      ['prod-seed-1', 'cat-seed-1', 'Haircut',        350, 30],
      ['prod-seed-2', 'cat-seed-1', 'Hair Color',    1800, 90],
      ['prod-seed-3', 'cat-seed-2', 'Basic Facial',   600, 60],
      ['prod-seed-4', 'cat-seed-3', 'Body Massage',  1200, 60],
    ];
    for (const [id, catId, name, price, duration] of products) {
      db.prepare(`INSERT OR IGNORE INTO products (id, category_id, name, price, service_duration_minutes, kind, sort_order, is_active) VALUES (?, ?, ?, ?, ?, 'service', 1, 1)`).run(id, catId, name, price, duration);
    }

    res.json({ message: 'Demo data seeded successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export const authRoutes = router;
