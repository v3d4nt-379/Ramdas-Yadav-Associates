"use client";

import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Service } from '@/types';

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');
  const [saving, setSaving] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const q = query(collection(db, 'services'), orderBy('service_category'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((docSnap) => ({
        ...docSnap.data(),
        service_id: docSnap.id,
      })) as Service[];
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleActive(serviceId: string, currentStatus: boolean) {
    try {
      await updateDoc(doc(db, 'services', serviceId), {
        isActive: !currentStatus,
      });
      setServices((prev) =>
        prev.map((s) =>
          s.service_id === serviceId ? { ...s, isActive: !currentStatus } : s
        )
      );
    } catch (error) {
      console.error('Error toggling service:', error);
    }
  }

  async function handleSavePrice(serviceId: string) {
    const priceInPaise = Math.round(parseFloat(editPrice) * 100);
    if (isNaN(priceInPaise) || priceInPaise < 0) {
      alert('Please enter a valid price');
      return;
    }

    setSaving(true);
    try {
      await updateDoc(doc(db, 'services', serviceId), {
        service_price: priceInPaise,
      });
      setServices((prev) =>
        prev.map((s) =>
          s.service_id === serviceId ? { ...s, service_price: priceInPaise } : s
        )
      );
      setEditingId(null);
      setEditPrice('');
    } catch (error) {
      console.error('Error updating price:', error);
    } finally {
      setSaving(false);
    }
  }

  const categories = ['All', ...Array.from(new Set(services.map((s) => s.service_category)))];
  const filteredServices =
    filterCategory === 'All'
      ? services
      : services.filter((s) => s.service_category === filterCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900">Services</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Manage pricing and availability — {services.length} services total
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${
              filterCategory === cat
                ? 'bg-zinc-900 text-white'
                : 'bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Table */}
      <div className="bg-white border border-zinc-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Service
                </th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Category
                </th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Type
                </th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Price (₹)
                </th>
                <th className="text-center px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Active
                </th>
                <th className="text-center px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr
                  key={service.service_id}
                  className={`border-b border-zinc-100 hover:bg-zinc-50 transition-colors ${
                    !service.isActive ? 'opacity-50' : ''
                  }`}
                >
                  {/* Service Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-zinc-400 text-xl">
                        {service.icon}
                      </span>
                      <div>
                        <p className="font-bold text-sm text-zinc-900">{service.service_name}</p>
                        <p className="text-xs text-zinc-500 max-w-xs truncate">
                          {service.service_description}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 bg-zinc-100 px-3 py-1 inline-block">
                      {service.service_category}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 inline-block ${
                        service.service_type === 'fixed'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {service.service_type}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4">
                    {editingId === service.service_id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400 font-bold">₹</span>
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-24 border border-yellow-400 px-2 py-1 text-sm font-bold focus:ring-1 focus:ring-yellow-400 outline-none"
                          autoFocus
                          min="0"
                          step="1"
                        />
                        <button
                          onClick={() => handleSavePrice(service.service_id)}
                          disabled={saving}
                          className="text-green-600 hover:text-green-700 transition-colors"
                        >
                          <span className="material-symbols-outlined text-xl">check</span>
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditPrice('');
                          }}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                      </div>
                    ) : (
                      <span className="font-bold text-zinc-900 text-sm">
                        ₹{(service.service_price / 100).toLocaleString('en-IN')}
                      </span>
                    )}
                  </td>

                  {/* Active Toggle */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleToggleActive(service.service_id, service.isActive)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        service.isActive ? 'bg-green-500' : 'bg-zinc-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                          service.isActive ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => {
                        setEditingId(service.service_id);
                        setEditPrice((service.service_price / 100).toString());
                      }}
                      className="text-zinc-400 hover:text-yellow-600 transition-colors"
                      title="Edit price"
                    >
                      <span className="material-symbols-outlined text-xl">edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-5xl text-zinc-300 mb-4 block">
              search_off
            </span>
            <p className="text-zinc-500 font-bold">No services found</p>
            <p className="text-zinc-400 text-sm mt-1">
              {services.length === 0
                ? 'Run the seed script to populate services.'
                : 'Try a different category filter.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
