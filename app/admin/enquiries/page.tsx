"use client";

import { useEffect, useState, useCallback } from 'react';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  type Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Enquiry, EnquiryStatus } from '@/types';
import { ENQUIRY_STATUS_LABELS, ENQUIRY_STATUS_COLORS } from '@/types';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<EnquiryStatus | 'all'>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchEnquiries = useCallback(async () => {
    try {
      const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((docSnap) => ({
        ...docSnap.data(),
        enquiry_id: docSnap.id,
      })) as Enquiry[];
      setEnquiries(data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchEnquiries();
  }, [fetchEnquiries]);

  const handleStatusChange = async (enquiryId: string, newStatus: EnquiryStatus) => {
    setUpdatingId(enquiryId);
    try {
      await updateDoc(doc(db, 'enquiries', enquiryId), {
        enquiry_status: newStatus,
      });
      setEnquiries((prev) =>
        prev.map((e) =>
          e.enquiry_id === enquiryId ? { ...e, enquiry_status: newStatus } : e
        )
      );
      if (selectedEnquiry?.enquiry_id === enquiryId) {
        setSelectedEnquiry((prev) => prev ? { ...prev, enquiry_status: newStatus } : null);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (enquiryId: string) => {
    if (!confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'enquiries', enquiryId));
      setEnquiries((prev) => prev.filter((e) => e.enquiry_id !== enquiryId));
      if (selectedEnquiry?.enquiry_id === enquiryId) {
        setSelectedEnquiry(null);
      }
    } catch (error) {
      console.error('Error deleting enquiry:', error);
    }
  };

  const formatDate = (timestamp: Timestamp | null | undefined) => {
    if (!timestamp || !timestamp.toDate) return '—';
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Filter by status + search (all client-side)
  const filteredEnquiries = enquiries.filter((e) => {
    // Status filter
    if (filterStatus !== 'all' && e.enquiry_status !== filterStatus) return false;
    // Search filter
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      e.cust_name.toLowerCase().includes(term) ||
      e.cust_phone.includes(term) ||
      e.cust_email?.toLowerCase().includes(term) ||
      e.service_name.toLowerCase().includes(term)
    );
  });

  const statusCounts = {
    all: enquiries.length,
    new: enquiries.filter((e) => e.enquiry_status === 'new').length,
    contacted: enquiries.filter((e) => e.enquiry_status === 'contacted').length,
    in_progress: enquiries.filter((e) => e.enquiry_status === 'in_progress').length,
    closed: enquiries.filter((e) => e.enquiry_status === 'closed').length,
  };

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
          <h1 className="text-3xl font-black tracking-tight text-zinc-900">Enquiries</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {filteredEnquiries.length} enquiries total
          </p>
        </div>
        <button
          onClick={() => { setLoading(true); fetchEnquiries(); }}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-sm font-bold uppercase tracking-wider text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 transition-all"
        >
          <span className="material-symbols-outlined text-lg">refresh</span>
          Refresh
        </button>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(
          [
            { key: 'all', label: 'All' },
            { key: 'new', label: 'New' },
            { key: 'contacted', label: 'Contacted' },
            { key: 'in_progress', label: 'In Progress' },
            { key: 'closed', label: 'Closed' },
          ] as const
        ).map((filter) => (
          <button
            key={filter.key}
            onClick={() => setFilterStatus(filter.key)}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${
              filterStatus === filter.key
                ? 'bg-zinc-900 text-white'
                : 'bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900'
            }`}
          >
            {filter.label}
            <span className="ml-2 opacity-60">
              {statusCounts[filter.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-lg">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, phone, email, or service..."
            className="w-full pl-11 pr-4 py-3 border border-zinc-200 bg-white text-sm font-medium focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-zinc-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Customer
                </th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Service
                </th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Date
                </th>
                <th className="text-center px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEnquiries.map((enquiry) => (
                <tr
                  key={enquiry.enquiry_id}
                  className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedEnquiry(enquiry)}
                >
                  <td className="px-6 py-4">
                    <p className="font-bold text-sm text-zinc-900">{enquiry.cust_name}</p>
                    <p className="text-xs text-zinc-500">{enquiry.cust_phone}</p>
                    {enquiry.cust_email && (
                      <p className="text-xs text-zinc-400">{enquiry.cust_email}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-zinc-700 font-medium max-w-[200px] truncate">
                      {enquiry.service_name}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 inline-block ${
                        ENQUIRY_STATUS_COLORS[enquiry.enquiry_status]
                      }`}
                    >
                      {ENQUIRY_STATUS_LABELS[enquiry.enquiry_status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-zinc-500">
                      {formatDate(enquiry.createdAt)}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setSelectedEnquiry(enquiry)}
                        className="text-zinc-400 hover:text-zinc-700 transition-colors p-1"
                        title="View details"
                      >
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </button>
                      <button
                        onClick={() => handleDelete(enquiry.enquiry_id)}
                        className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEnquiries.length === 0 && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-5xl text-zinc-300 mb-4 block">
              inbox
            </span>
            <p className="text-zinc-500 font-bold">No enquiries found</p>
            <p className="text-zinc-400 text-sm mt-1">
              {searchTerm
                ? 'Try a different search term.'
                : 'Enquiries will appear here when customers submit them.'}
            </p>
          </div>
        )}
      </div>

      {/* ─── Detail Modal ──────────────────────────────────────── */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedEnquiry(null)}
          />
          <div className="relative w-full max-w-lg bg-white shadow-2xl border border-zinc-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-zinc-950 text-white p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400 mb-1">
                  Enquiry Details
                </p>
                <h2 className="text-xl font-black tracking-tight">
                  {selectedEnquiry.cust_name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3">
                  Contact Information
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-zinc-400 text-lg">call</span>
                    <a
                      href={`tel:+91${selectedEnquiry.cust_phone}`}
                      className="text-sm font-medium text-zinc-900 hover:text-yellow-600 transition-colors"
                    >
                      +91 {selectedEnquiry.cust_phone}
                    </a>
                  </div>
                  {selectedEnquiry.cust_email && (
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-zinc-400 text-lg">mail</span>
                      <a
                        href={`mailto:${selectedEnquiry.cust_email}`}
                        className="text-sm font-medium text-zinc-900 hover:text-yellow-600 transition-colors"
                      >
                        {selectedEnquiry.cust_email}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Service */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3">
                  Service Enquired
                </p>
                <div className="bg-zinc-50 border border-zinc-200 px-4 py-3">
                  <p className="font-bold text-sm text-zinc-900">
                    {selectedEnquiry.service_name}
                  </p>
                </div>
              </div>

              {/* Message */}
              {selectedEnquiry.enquiry_message && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3">
                    Customer Message
                  </p>
                  <div className="bg-zinc-50 border border-zinc-200 px-4 py-3">
                    <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">
                      {selectedEnquiry.enquiry_message}
                    </p>
                  </div>
                </div>
              )}

              {/* Date */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3">
                  Submitted On
                </p>
                <p className="text-sm text-zinc-700">
                  {formatDate(selectedEnquiry.createdAt)}
                </p>
              </div>

              {/* Status Update */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3">
                  Update Status
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    ['new', 'contacted', 'in_progress', 'closed'] as EnquiryStatus[]
                  ).map((status) => (
                    <button
                      key={status}
                      onClick={() =>
                        handleStatusChange(selectedEnquiry.enquiry_id, status)
                      }
                      disabled={
                        selectedEnquiry.enquiry_status === status ||
                        updatingId === selectedEnquiry.enquiry_id
                      }
                      className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                        selectedEnquiry.enquiry_status === status
                          ? 'bg-zinc-900 text-white ring-2 ring-yellow-400'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                      } ${
                        updatingId === selectedEnquiry.enquiry_id
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                    >
                      {ENQUIRY_STATUS_LABELS[status]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-2 flex gap-3">
                <a
                  href={`https://wa.me/91${selectedEnquiry.cust_phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-green-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">chat</span>
                  WhatsApp
                </a>
                <a
                  href={`tel:+91${selectedEnquiry.cust_phone}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">call</span>
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
