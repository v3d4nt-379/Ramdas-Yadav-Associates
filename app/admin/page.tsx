"use client";

import { useEffect, useState } from 'react';
import { collection, query, getCountFromServer, where, getDocs, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Enquiry, Order, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, ENQUIRY_STATUS_LABELS, ENQUIRY_STATUS_COLORS } from '@/types';
import Link from 'next/link';

interface DashboardStats {
  totalEnquiries: number;
  newEnquiries: number;
  totalOrders: number;
  activeOrders: number;
  totalServices: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEnquiries: 0,
    newEnquiries: 0,
    totalOrders: 0,
    activeOrders: 0,
    totalServices: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // 1. Stats
        const enquiriesSnap = await getCountFromServer(collection(db, 'enquiries'));
        const newEnqSnap = await getCountFromServer(query(collection(db, 'enquiries'), where('enquiry_status', '==', 'new')));
        const ordersSnap = await getCountFromServer(collection(db, 'orders'));
        const activeSnap = await getCountFromServer(query(
          collection(db, 'orders'),
          where('order_status', 'in', ['placed', 'initiated', 'documents_requested', 'in_progress'])
        ));
        const servicesSnap = await getCountFromServer(collection(db, 'services'));
        
        // Calculate Revenue from Payments
        const paymentsSnap = await getDocs(query(collection(db, 'payments'), where('status', '==', 'paid')));
        let revenue = 0;
        paymentsSnap.forEach(doc => {
          revenue += doc.data().amount || 0;
        });

        setStats({
          totalEnquiries: enquiriesSnap.data().count,
          newEnquiries: newEnqSnap.data().count,
          totalOrders: ordersSnap.data().count,
          activeOrders: activeSnap.data().count,
          totalServices: servicesSnap.data().count,
          totalRevenue: revenue,
        });

        // 2. Recent Orders (Last 5)
        const recentOrdersSnap = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(5)));
        setRecentOrders(recentOrdersSnap.docs.map(d => ({ ...d.data(), order_internal_id: d.id } as any)));

        // 3. Recent Enquiries (Last 5)
        const recentEnquiriesSnap = await getDocs(query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'), limit(5)));
        setRecentEnquiries(recentEnquiriesSnap.docs.map(d => ({ ...d.data(), enquiry_internal_id: d.id } as any)));

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const formatDate = (timestamp: Timestamp | any) => {
    if (!timestamp || typeof timestamp.toDate !== 'function') return '—';
    return timestamp.toDate().toLocaleDateString('en-IN', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const statCards = [
    { label: 'Revenue', value: `₹${(stats.totalRevenue / 100).toLocaleString('en-IN')}`, icon: 'account_balance', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', iconColor: 'text-emerald-500' },
    { label: 'Total Orders', value: stats.totalOrders, icon: 'shopping_bag', color: 'bg-green-50 text-green-700 border-green-200', iconColor: 'text-green-500' },
    { label: 'Active Orders', value: stats.activeOrders, icon: 'pending_actions', color: 'bg-purple-50 text-purple-700 border-purple-200', iconColor: 'text-purple-500' },
    { label: 'New Enquiries', value: stats.newEnquiries, icon: 'mark_email_unread', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', iconColor: 'text-yellow-500' },
    { label: 'Total Enquiries', value: stats.totalEnquiries, icon: 'contact_mail', color: 'bg-blue-50 text-blue-700 border-blue-200', iconColor: 'text-blue-500' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Dashboard</h1>
        <p className="text-zinc-500 text-sm mt-1">Overview of your business activity</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
        {statCards.map((card) => (
          <div key={card.label} className={`border rounded-sm p-6 ${card.color} transition-shadow hover:shadow-md`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`material-symbols-outlined text-3xl ${card.iconColor}`}>{card.icon}</span>
            </div>
            <p className="text-3xl font-black tracking-tight">
              {loading ? <span className="inline-block w-8 h-8 bg-current/10 rounded animate-pulse"></span> : card.value}
            </p>
            <p className="text-xs font-bold uppercase tracking-widest mt-1 opacity-70">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-zinc-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/enquiries" className="flex items-center gap-4 bg-white border border-zinc-200 p-5 hover:border-yellow-400 hover:shadow-md transition-all group">
            <span className="material-symbols-outlined text-2xl text-zinc-400 group-hover:text-yellow-500 transition-colors">contact_mail</span>
            <div>
              <p className="font-bold text-sm text-zinc-900">View Enquiries</p>
              <p className="text-xs text-zinc-500">Manage customer enquiries</p>
            </div>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-4 bg-white border border-zinc-200 p-5 hover:border-yellow-400 hover:shadow-md transition-all group">
            <span className="material-symbols-outlined text-2xl text-zinc-400 group-hover:text-yellow-500 transition-colors">shopping_bag</span>
            <div>
              <p className="font-bold text-sm text-zinc-900">View Orders</p>
              <p className="text-xs text-zinc-500">Track purchased services</p>
            </div>
          </Link>
          <Link href="/admin/services" className="flex items-center gap-4 bg-white border border-zinc-200 p-5 hover:border-yellow-400 hover:shadow-md transition-all group">
            <span className="material-symbols-outlined text-2xl text-zinc-400 group-hover:text-yellow-500 transition-colors">design_services</span>
            <div>
              <p className="font-bold text-sm text-zinc-900">Manage Services</p>
              <p className="text-xs text-zinc-500">Update pricing & availability</p>
            </div>
          </Link>
          <Link href="/admin/payments" className="flex items-center gap-4 bg-white border border-zinc-200 p-5 hover:border-yellow-400 hover:shadow-md transition-all group">
            <span className="material-symbols-outlined text-2xl text-zinc-400 group-hover:text-yellow-500 transition-colors">payments</span>
            <div>
              <p className="font-bold text-sm text-zinc-900">Payments</p>
              <p className="text-xs text-zinc-500">View payment history</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Activity Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        
        {/* Recent Orders */}
        <div className="bg-white border border-zinc-200">
          <div className="px-6 py-4 border-b border-zinc-200 flex justify-between items-center bg-zinc-50">
            <h2 className="font-bold text-zinc-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs font-bold text-yellow-600 hover:text-yellow-700 uppercase tracking-wider">View All</Link>
          </div>
          <div className="divide-y divide-zinc-100">
            {loading ? (
              <div className="p-6 text-center text-zinc-400 text-sm">Loading...</div>
            ) : recentOrders.length === 0 ? (
              <div className="p-6 text-center text-zinc-400 text-sm">No orders yet</div>
            ) : (
              recentOrders.map(order => (
                <div key={order.order_id} className="p-4 hover:bg-zinc-50 transition-colors flex justify-between items-center">
                  <div>
                    <p className="font-mono text-xs font-bold text-zinc-900">{order.order_id}</p>
                    <p className="text-sm font-medium text-zinc-700 mt-1">{order.cust_name}</p>
                    <p className="text-xs text-zinc-500">{order.service_name}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 inline-block mb-2 ${ORDER_STATUS_COLORS[order.order_status]}`}>
                      {ORDER_STATUS_LABELS[order.order_status]}
                    </span>
                    <p className="text-xs text-zinc-400">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white border border-zinc-200">
          <div className="px-6 py-4 border-b border-zinc-200 flex justify-between items-center bg-zinc-50">
            <h2 className="font-bold text-zinc-900">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-xs font-bold text-yellow-600 hover:text-yellow-700 uppercase tracking-wider">View All</Link>
          </div>
          <div className="divide-y divide-zinc-100">
            {loading ? (
              <div className="p-6 text-center text-zinc-400 text-sm">Loading...</div>
            ) : recentEnquiries.length === 0 ? (
              <div className="p-6 text-center text-zinc-400 text-sm">No enquiries yet</div>
            ) : (
              recentEnquiries.map(enq => (
                <div key={enq.enquiry_id} className="p-4 hover:bg-zinc-50 transition-colors flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-zinc-900">{enq.cust_name}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{enq.cust_phone}</p>
                    <p className="text-xs text-zinc-600 mt-1 max-w-[200px] truncate">{enq.service_name}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 inline-block mb-2 ${ENQUIRY_STATUS_COLORS[enq.enquiry_status]}`}>
                      {ENQUIRY_STATUS_LABELS[enq.enquiry_status]}
                    </span>
                    <p className="text-xs text-zinc-400">{formatDate(enq.createdAt)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
