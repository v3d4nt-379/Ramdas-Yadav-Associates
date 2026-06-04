"use client";

import { useEffect, useState, useCallback } from 'react';
import { collection, getDocs, doc, updateDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Order, OrderStatus, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/types';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((docSnap) => ({
        ...docSnap.data(),
        order_internal_id: docSnap.id,
      })) as (Order & { order_internal_id: string })[];
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = async (internalId: string, newStatus: OrderStatus) => {
    setUpdatingId(internalId);
    try {
      await updateDoc(doc(db, 'orders', internalId), {
        order_status: newStatus,
        updatedAt: new Date(),
      });
      setOrders((prev) =>
        prev.map((o) =>
          (o as any).order_internal_id === internalId ? { ...o, order_status: newStatus } : o
        )
      );
      if ((selectedOrder as any)?.order_internal_id === internalId) {
        setSelectedOrder((prev) => prev ? { ...prev, order_status: newStatus } : null);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingId(null);
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

  const filteredOrders = orders.filter((o) => {
    if (filterStatus !== 'all' && o.order_status !== filterStatus) return false;
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      o.order_id.toLowerCase().includes(term) ||
      o.cust_name.toLowerCase().includes(term) ||
      o.cust_phone.includes(term) ||
      o.cust_email?.toLowerCase().includes(term) ||
      o.service_name.toLowerCase().includes(term)
    );
  });

  const statusCounts = {
    all: orders.length,
    placed: orders.filter((o) => o.order_status === 'placed').length,
    initiated: orders.filter((o) => o.order_status === 'initiated').length,
    documents_requested: orders.filter((o) => o.order_status === 'documents_requested').length,
    in_progress: orders.filter((o) => o.order_status === 'in_progress').length,
    completed: orders.filter((o) => o.order_status === 'completed').length,
    declined_refunded: orders.filter((o) => o.order_status === 'declined_refunded').length,
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
          <h1 className="text-3xl font-black tracking-tight text-zinc-900">Orders</h1>
          <p className="text-zinc-500 text-sm mt-1">{filteredOrders.length} orders total</p>
        </div>
        <button
          onClick={() => { setLoading(true); fetchOrders(); }}
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
            { key: 'placed', label: 'Placed' },
            { key: 'initiated', label: 'Initiated' },
            { key: 'documents_requested', label: 'Docs Requested' },
            { key: 'in_progress', label: 'In Progress' },
            { key: 'completed', label: 'Completed' },
            { key: 'declined_refunded', label: 'Declined' },
          ] as const
        ).map((filter) => (
          <button
            key={filter.key}
            onClick={() => setFilterStatus(filter.key)}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${
              filterStatus === filter.key
                ? 'bg-zinc-900 text-white'
                : 'bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900'
            }`}
          >
            {filter.label} <span className="ml-2 opacity-60">{statusCounts[filter.key]}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-lg">search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Order ID, name, email..."
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
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Order Ref</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Customer</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Service</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Status</th>
                <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Date</th>
                <th className="text-center px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const typedOrder = order as any;
                const status = order.order_status as OrderStatus;
                return (
                <tr
                  key={typedOrder.order_internal_id}
                  className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <td className="px-6 py-4">
                    <p className="font-mono text-xs font-bold text-zinc-900">{order.order_id}</p>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 mt-1 inline-block ${order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-sm text-zinc-900">{order.cust_name}</p>
                    <p className="text-xs text-zinc-500">{order.cust_phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-zinc-700 font-medium max-w-[200px] truncate">{order.service_name}</p>
                    <p className="text-xs text-zinc-500">₹{(order.service_price / 100).toLocaleString('en-IN')}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 inline-block ${ORDER_STATUS_COLORS[status]}`}>
                      {ORDER_STATUS_LABELS[status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-zinc-500">{formatDate(order.createdAt)}</p>
                  </td>
                  <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-zinc-400 hover:text-zinc-700 transition-colors p-1"
                      title="View details"
                    >
                      <span className="material-symbols-outlined text-lg">visibility</span>
                    </button>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-5xl text-zinc-300 mb-4 block">receipt_long</span>
            <p className="text-zinc-500 font-bold">No orders found</p>
          </div>
        )}
      </div>

      {/* ─── Detail Modal ──────────────────────────────────────── */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="relative w-full max-w-2xl bg-white shadow-2xl border border-zinc-200 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-zinc-950 text-white p-6 shrink-0 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400 mb-1">Order Details</p>
                <h2 className="text-xl font-black tracking-tight font-mono">{selectedOrder.order_id}</h2>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-zinc-400 hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3">Customer</p>
                  <p className="font-bold text-sm text-zinc-900">{selectedOrder.cust_name}</p>
                  <p className="text-sm text-zinc-600">{selectedOrder.cust_phone}</p>
                  {selectedOrder.cust_email && <p className="text-sm text-zinc-600">{selectedOrder.cust_email}</p>}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3">Service</p>
                  <p className="font-bold text-sm text-zinc-900">{selectedOrder.service_name}</p>
                  <p className="text-sm text-zinc-600">₹{(selectedOrder.service_price / 100).toLocaleString('en-IN')}</p>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 mt-2 inline-block ${selectedOrder.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    Payment: {selectedOrder.payment_status}
                  </span>
                </div>
              </div>

              {selectedOrder.order_message && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3">Customer Note</p>
                  <div className="bg-zinc-50 border border-zinc-200 px-4 py-3">
                    <p className="text-sm text-zinc-700 whitespace-pre-wrap">{selectedOrder.order_message}</p>
                  </div>
                </div>
              )}

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3">Payment Info</p>
                <div className="bg-zinc-50 border border-zinc-200 px-4 py-3 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Payment ID</p>
                    <p className="text-xs font-mono">{selectedOrder.payment_id || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Razorpay Order ID</p>
                    <p className="text-xs font-mono">{selectedOrder.razorpay_order_id || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3">Update Order Status</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['placed', 'initiated', 'documents_requested', 'in_progress', 'completed', 'declined_refunded'] as OrderStatus[]).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange((selectedOrder as any).order_internal_id, status)}
                      disabled={selectedOrder.order_status === status || updatingId === (selectedOrder as any).order_internal_id}
                      className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-all ${
                        selectedOrder.order_status === status
                          ? 'bg-zinc-900 text-white ring-2 ring-yellow-400'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                      } ${(updatingId === (selectedOrder as any).order_internal_id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {ORDER_STATUS_LABELS[status]}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-zinc-500 mt-3">
                  Note: Setting status to "Declined & Refunded" does <strong className="text-zinc-800">not</strong> automatically refund the payment. Go to the Payments tab to process the refund.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
