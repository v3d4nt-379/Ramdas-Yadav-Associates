"use client";

import { useEffect, useState, useCallback } from 'react';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Payment } from '@/types';

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [refundingId, setRefundingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = useCallback(async () => {
    try {
      const q = query(collection(db, 'payments'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((docSnap) => ({
        ...docSnap.data(),
        payment_id: docSnap.id,
      })) as Payment[];
      setPayments(data);
    } catch (err) {
      console.error('Error fetching payments:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchPayments();
  }, [fetchPayments]);

  const handleRefund = async (paymentId: string, amount: number) => {
    if (!confirm('Are you sure you want to issue a full refund for this payment? This action cannot be undone.')) {
      return;
    }

    setRefundingId(paymentId);
    setError(null);

    try {
      const res = await fetch('/api/admin/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_id: paymentId, amount }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Refund failed');
      }

      // Update local state
      setPayments((prev) =>
        prev.map((p) =>
          p.payment_id === paymentId ? { ...p, status: 'refunded', razorpay_refund_id: data.refund_id } : p
        )
      );
      
      alert('Refund processed successfully!');
    } catch (err: any) {
      console.error('Refund error:', err);
      setError(err.message || 'An error occurred during refund processing.');
    } finally {
      setRefundingId(null);
    }
  };

  const formatDate = (timestamp: Timestamp | any) => {
    if (!timestamp || typeof timestamp.toDate !== 'function') return '—';
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  const filteredPayments = payments.filter((p) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      p.payment_id.toLowerCase().includes(term) ||
      p.order_id.toLowerCase().includes(term) ||
      p.razorpay_order_id.toLowerCase().includes(term)
    );
  });

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
          <h1 className="text-3xl font-black tracking-tight text-zinc-900">Payments</h1>
          <p className="text-zinc-500 text-sm mt-1">{filteredPayments.length} transactions total</p>
        </div>
        <button
          onClick={() => { setLoading(true); fetchPayments(); }}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-sm font-bold uppercase tracking-wider text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 transition-all"
        >
          <span className="material-symbols-outlined text-lg">refresh</span>
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 text-sm mb-6 border-l-4 border-red-600">
          {error}
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-lg">search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Payment ID, Order ID..."
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
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Transaction Details</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Amount</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Status</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Date</th>
                <th className="text-right px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.payment_id} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-mono text-xs font-bold text-zinc-900">{payment.payment_id}</p>
                    <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">Order: {payment.order_id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-zinc-900">₹{(payment.amount / 100).toLocaleString('en-IN')}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 inline-block ${
                      payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                      payment.status === 'refunded' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                    {payment.razorpay_refund_id && (
                      <p className="text-[10px] text-zinc-500 mt-1 font-mono">Ref: {payment.razorpay_refund_id}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-zinc-500">{formatDate(payment.createdAt)}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {payment.status === 'paid' && (
                      <button
                        onClick={() => handleRefund(payment.payment_id, payment.amount)}
                        disabled={refundingId === payment.payment_id}
                        className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 border transition-all ${
                          refundingId === payment.payment_id
                            ? 'border-zinc-200 text-zinc-400 cursor-not-allowed bg-zinc-50'
                            : 'border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300'
                        }`}
                      >
                        {refundingId === payment.payment_id ? 'Processing...' : 'Refund'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPayments.length === 0 && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-5xl text-zinc-300 mb-4 block">payments</span>
            <p className="text-zinc-500 font-bold">No payments found</p>
          </div>
        )}
      </div>
    </div>
  );
}
