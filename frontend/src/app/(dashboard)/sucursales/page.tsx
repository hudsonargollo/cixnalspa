'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { BookingBranch } from '@/lib/booking-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { Plus, Pencil, Trash2, MessageCircle, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

type BranchForm = { name: string; zone: string; whatsapp_url: string; maps_url: string; is_active: boolean; sort_order: number };
const EMPTY_FORM: BranchForm = { name: '', zone: '', whatsapp_url: '', maps_url: '', is_active: true, sort_order: 0 };

export default function BranchesPage() {
  const [branches, setBranches] = useState<BookingBranch[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BookingBranch | null>(null);
  const [form, setForm] = useState<BranchForm>(EMPTY_FORM);

  async function load() {
    try {
      const { data } = await api.get('/branches');
      setBranches(data.branches || []);
    } catch {
      toast.error('No se pudieron cargar las sucursales');
    }
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditing(null);
    setForm({ ...EMPTY_FORM, sort_order: branches.length + 1 });
    setOpen(true);
  }

  function openEdit(b: BookingBranch) {
    setEditing(b);
    setForm({
      name: b.name,
      zone: b.zone || '',
      whatsapp_url: b.whatsappUrl || '',
      maps_url: b.mapsUrl || '',
      is_active: b.isActive !== false,
      sort_order: b.sortOrder || 0,
    });
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    try {
      if (editing) await api.put(`/branches/${editing.id}`, form);
      else await api.post('/branches', form);
      toast.success(editing ? 'Sucursal actualizada' : 'Sucursal agregada');
      setOpen(false);
      await load();
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Error al guardar');
    }
  }

  async function handleDelete(b: BookingBranch) {
    if (!confirm(`Eliminar la sucursal ${b.name}? Se ocultará de la web de reservas.`)) return;
    try {
      await api.delete(`/branches/${b.id}`);
      toast.success('Sucursal eliminada');
      await load();
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Error al eliminar');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold">Sucursales</h1>
          <p className="text-sm text-[var(--muted-foreground)]">Administra las sedes que aparecen en la página de reservas.</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" /> Agregar sucursal
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
        <table className="w-full text-sm">
          <thead className="bg-[var(--secondary)] text-left">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Zona</th>
              <th className="p-3">WhatsApp</th>
              <th className="p-3">Mapa</th>
              <th className="p-3">Orden</th>
              <th className="p-3">Estado</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {branches.map((b) => (
              <tr key={b.id} className="border-t border-[var(--border)] hover:bg-[var(--secondary)]">
                <td className="p-3 font-medium">{b.name}</td>
                <td className="p-3">{b.zone || '—'}</td>
                <td className="p-3">
                  {b.whatsappUrl ? (
                    <a href={b.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-green-600 hover:underline">
                      <MessageCircle className="h-3.5 w-3.5" /> Abrir
                    </a>
                  ) : <span className="text-[var(--muted-foreground)]">—</span>}
                </td>
                <td className="p-3">
                  {b.mapsUrl ? (
                    <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                      <MapPin className="h-3.5 w-3.5" /> Ver
                    </a>
                  ) : <span className="text-[var(--muted-foreground)]">—</span>}
                </td>
                <td className="p-3">{b.sortOrder ?? 0}</td>
                <td className="p-3">{b.isActive ? 'Activa' : 'Inactiva'}</td>
                <td className="p-3 text-right space-x-2">
                  <button className="text-sm underline inline-flex items-center gap-1" onClick={() => openEdit(b)}><Pencil className="h-3.5 w-3.5" /> Editar</button>
                  <button className="text-sm underline text-red-600 inline-flex items-center gap-1" onClick={() => handleDelete(b)}><Trash2 className="h-3.5 w-3.5" /> Eliminar</button>
                </td>
              </tr>
            ))}
            {branches.length === 0 && (
              <tr><td colSpan={7} className="p-6 text-center text-[var(--muted-foreground)]">Ninguna sucursal todavía. Agrega la primera.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Editar sucursal' : 'Agregar sucursal'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label>Nombre *</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="CIX Central" required />
          </div>
          <div>
            <Label>Zona / dirección</Label>
            <Input value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value })} placeholder="Zona Norte · Av. Beni" />
          </div>
          <div>
            <Label>WhatsApp (link o número)</Label>
            <Input value={form.whatsapp_url} onChange={(e) => setForm({ ...form, whatsapp_url: e.target.value })} placeholder="https://wa.me/59167943253 o 59167943253" />
            <p className="text-[11px] mt-1 text-[var(--muted-foreground)]">Acepta enlaces wa.me / api.whatsapp.com o un número con código de país.</p>
          </div>
          <div>
            <Label>Link de Google Maps</Label>
            <Input value={form.maps_url} onChange={(e) => setForm({ ...form, maps_url: e.target.value })} placeholder="https://maps.app.goo.gl/..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Orden de muestra</Label>
              <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input type="checkbox" id="branch_active" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
              <Label htmlFor="branch_active" className="!mb-0">Visible en reservas</Label>
            </div>
          </div>
          <Button type="submit" className="w-full">{editing ? 'Guardar cambios' : 'Agregar sucursal'}</Button>
        </form>
      </Modal>
    </div>
  );
}
