'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('dm_booking_theme');
    if (stored === 'light') setIsDarkMode(false);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Não foi possível entrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-root" data-theme={isDarkMode ? 'dark' : 'light'}>
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-sm rounded-2xl">
          <CardContent className="px-6 pt-8 pb-8">
            <div className="flex flex-col items-center text-center mb-7">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4 overflow-hidden"
                style={{
                  backgroundColor: '#121315',
                  border: isDarkMode ? '1px solid rgba(201,138,75,0.35)' : '1.5px solid rgba(60,42,24,0.15)',
                }}
              >
                <img src="/dm/logo.webp" alt="Barbería Diego Martins" className="w-[70%] h-[70%] object-contain" />
              </div>
              <h1 className="font-display text-3xl font-light tracking-wide">Barbería Diego Martins</h1>
              <p className="text-xs tracking-widest uppercase mt-1 text-[var(--muted-foreground)]">Acceso del equipo</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus className="rounded-xl" />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="rounded-xl" />
              </div>
              <Button type="submit" className="w-full btn-brand rounded-xl h-11 text-xs tracking-widest uppercase" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}