'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { Printer } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

const TABS = ['Negocio', 'Impuestos', 'Fidelidad', 'Impresoras'] as const;
type Tab = typeof TABS[number];

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('Negocio');

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Configuracion</h1>
      <div className="flex gap-2 mb-4 border-b border-[var(--border)]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'px-3 py-2 text-sm font-medium border-b-2 -mb-px',
              tab === t ? 'border-[var(--primary)] text-[var(--foreground)]' : 'border-transparent text-[var(--muted-foreground)]'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Negocio' && <BusinessSettings />}
      {tab === 'Impuestos' && <TaxSettings />}
      {tab === 'Fidelidad' && <LoyaltySettings />}
      {tab === 'Impresoras' && <PrinterSettings />}
    </div>
  );
}

function BusinessSettings() {
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    api.get('/settings/business').then((res) => setForm(res.data));
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await api.put('/settings/business', form);
      setForm(data);
      toast.success('Datos del negocio guardados');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Error al guardar');
    }
  }

  if (!form) return null;

  return (
    <Card className="max-w-lg">
      <CardContent className="pt-4">
        <form onSubmit={save} className="space-y-3">
          <div>
            <Label>Nombre de la tienda</Label>
            <Input value={form.business_name} onChange={(e) => setForm({ ...form, business_name: e.target.value })} />
          </div>
          <div>
            <Label>Direccion</Label>
            <Input value={form.business_address} onChange={(e) => setForm({ ...form, business_address: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Telefono</Label>
              <Input value={form.business_phone} onChange={(e) => setForm({ ...form, business_phone: e.target.value })} />
            </div>
            <div>
              <Label>NIT</Label>
              <Input value={form.gstin} onChange={(e) => setForm({ ...form, gstin: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Moneda</Label>
              <Input value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} />
            </div>
            <div>
              <Label>Departamento</Label>
              <Input value={form.state_code} onChange={(e) => setForm({ ...form, state_code: e.target.value })} />
            </div>
          </div>
          <Button type="submit">Guardar</Button>
        </form>
      </CardContent>
    </Card>
  );
}

function TaxSettings() {
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    api.get('/settings/tax').then((res) => setForm(res.data));
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await api.put('/settings/tax', form);
      setForm(data);
      toast.success('Configuracion de impuestos guardada');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Error al guardar');
    }
  }

  if (!form) return null;

  return (
    <Card className="max-w-lg">
      <CardContent className="pt-4">
        <form onSubmit={save} className="space-y-3">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="tax_registered" checked={form.tax_registered} onChange={(e) => setForm({ ...form, tax_registered: e.target.checked })} />
            <Label htmlFor="tax_registered" className="!mb-0">Contribuyente registrado</Label>
          </div>
          <div>
            <Label>Regimen de impuestos</Label>
            <Select value={form.tax_scheme} onChange={(e) => setForm({ ...form, tax_scheme: e.target.value })}>
              <option value="regular">Regular</option>
              <option value="composition">Simplificado</option>
            </Select>
          </div>
          <p className="text-xs text-[var(--muted-foreground)]">
            Los servicios se gravan automaticamente con la alicuota fija del 5%. Los productos vendidos en el mostrador usan la alicuota propia de cada producto (ver Servicios).
          </p>
          <Button type="submit">Guardar</Button>
        </form>
      </CardContent>
    </Card>
  );
}

function LoyaltySettings() {
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    api.get('/settings/loyalty').then((res) => setForm(res.data));
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await api.put('/settings/loyalty', form);
      setForm(data);
      toast.success('Configuracion de fidelidad guardada');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Error al guardar');
    }
  }

  if (!form) return null;

  return (
    <Card className="max-w-lg">
      <CardContent className="pt-4">
        <form onSubmit={save} className="space-y-3">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="loyalty_enabled" checked={form.loyalty_enabled} onChange={(e) => setForm({ ...form, loyalty_enabled: e.target.checked })} />
            <Label htmlFor="loyalty_enabled" className="!mb-0">Programa de fidelidad activo</Label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Puntos por Bs 1 gastado</Label>
              <Input type="number" step="0.01" value={form.loyalty_points_per_rs} onChange={(e) => setForm({ ...form, loyalty_points_per_rs: Number(e.target.value) })} />
            </div>
            <div>
              <Label>Valor de canje por punto</Label>
              <Input type="number" step="0.01" value={form.loyalty_redeem_value} onChange={(e) => setForm({ ...form, loyalty_redeem_value: Number(e.target.value) })} />
            </div>
          </div>
          <Button type="submit">Guardar</Button>
        </form>
      </CardContent>
    </Card>
  );
}

function PrinterSettings() {
  const [printers, setPrinters] = useState<Printer[]>([]);
  const [form, setForm] = useState({ name: '', connection_type: 'usb', ip_address: '', paper_width: '80mm' });

  async function load() {
    const { data } = await api.get('/printers');
    setPrinters(data.printers);
  }

  useEffect(() => {
    load();
  }, []);

  async function addPrinter(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post('/printers', form);
      toast.success('Impresora agregada');
      setForm({ name: '', connection_type: 'usb', ip_address: '', paper_width: '80mm' });
      load();
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Error al guardar');
    }
  }

  async function testPrinter(id: string) {
    try {
      await api.post(`/printers/${id}/test`);
      toast.success('Pagina de prueba enviada');
    } catch {
      toast.error('La impresora no respondio');
    }
  }

  return (
    <div className="space-y-4 max-w-lg">
      <Card>
        <CardContent className="pt-4 space-y-2">
          {printers.map((p) => (
            <div key={p.id} className="flex items-center justify-between text-sm">
              <div>
                <span className="font-medium">{p.name}</span>{' '}
                <span className="text-[var(--muted-foreground)]">({p.connection_type}{p.is_default === 1 ? ', predeterminada' : ''})</span>
              </div>
              <button className="underline" onClick={() => testPrinter(p.id)}>Probar impresion</button>
            </div>
          ))}
          {printers.length === 0 && <p className="text-sm text-[var(--muted-foreground)]">Ninguna impresora configurada</p>}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4">
          <form onSubmit={addPrinter} className="space-y-3">
            <div>
              <Label>Nombre</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <Label>Tipo de conexion</Label>
              <Select value={form.connection_type} onChange={(e) => setForm({ ...form, connection_type: e.target.value })}>
                <option value="usb">USB</option>
                <option value="network">Red</option>
                <option value="webusb">WebUSB</option>
              </Select>
            </div>
            {form.connection_type === 'network' && (
              <div>
                <Label>Direccion IP</Label>
                <Input value={form.ip_address} onChange={(e) => setForm({ ...form, ip_address: e.target.value })} required />
              </div>
            )}
            <Button type="submit">Agregar impresora</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
