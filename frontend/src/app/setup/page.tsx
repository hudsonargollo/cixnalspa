'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import toast from 'react-hot-toast';

export default function SetupPage() {
  const { setup, loading } = useAuthStore();
  const [form, setForm] = useState({ name: '', phone: '', password: '', business_name: '' });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.phone.trim() || !form.password.trim() || !form.business_name.trim()) {
      setError('Completa todos los campos.');
      return;
    }
    const digits = form.phone.replace(/\D/g, '');
    if (!/^591\d{7,8}$/.test(`591${digits}`)) {
      setError('WhatsApp: usa el código 591 más el número de Bolivia (8 dígitos).');
      return;
    }
    try {
      await setup({
        name: form.name.trim(),
        password: form.password,
        business_name: form.business_name.trim(),
        phone: `591${digits}`,
      });
      toast.success('Tienda configurada con éxito');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Error en la configuración');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="pt-6">
          <h1 className="text-xl font-semibold mb-1">Bienvenida a Cix Nails Artist</h1>
          <p className="text-sm text-[var(--muted-foreground)] mb-6">
            Completa tu WhatsApp — será tu identificador. No necesitas ninguna otra configuración.
          </p>
          {error && <p className="text-xs text-red-400 mb-3">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="business_name">Nombre del salón</Label>
              <Input
                id="business_name"
                value={form.business_name}
                onChange={(e) => setForm({ ...form, business_name: e.target.value })}
                required
                autoFocus
                placeholder="Cix Nails Artist"
              />
            </div>
            <div>
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <Label htmlFor="phone">WhatsApp</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                placeholder="(2) 6xx xxxxx"
                inputMode="tel"
              />
              <p className="text-[10px] mt-1" style={{ color: 'var(--text-disabled)' }}>
                Usa el código 591 + el número de Bolivia.
              </p>
            </div>
            <div>
              <Label htmlFor="password">Contrasena de la cuenta</Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={6}
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Configurando...' : 'Crear cuenta y entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}