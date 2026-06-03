"use client";

import { useEffect, useState } from 'react';
import { collection, query, getCountFromServer, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface DashboardStats {
  totalEnquiries: number;
  newEnquiries: number;
  totalOrders: number;
  activeOrders: number;
  totalServices: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEnquiries: 0,
    newEnquiries: 0,
    totalOrders: 0,
    activeOrders: 0,
    totalServices: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Total enquiries
        const enquiriesSnap = await getCountFromServer(collection(db, 'enquiries'));
        const totalEnquiries = enquiriesSnap.data().count;

        // New enquiries
        const newEnqQuery = query(collection(db, 'enquiries'), where('enquiry_status', '==', 'new'));
        const newEnqSnap = await getCountFromServer(newEnqQuery);
        const newEnquiries = newEnqSnap.data().count;

        // Total orders
        const ordersSnap = await getCountFromServer(collection(db, 'orders'));
        const totalOrders = ordersSnap.data().count;

        // Active orders (not completed or declined)
        const activeQuery = query(
          collection(db, 'orders'),
          where('order_status', 'in', ['placed', 'initiated', 'documents_requested', 'in_progress'])
        );
        const activeSnap = await getCountFromServer(activeQuery);
        const activeOrders = activeSnap.data().count;

        // Total services
        const servicesSnap = await getCountFromServer(collection(db, 'services'));
        const totalServices = servicesSnap.data().count;

        setStats({ totalEnquiries, newEnquiries, totalOrders, activeOrders, totalServices });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'Total Enquiries',
      value: stats.totalEnquiries,
      icon: 'contact_mail',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      iconColor: 'text-blue-500',
    },
    {
      label: 'New Enquiries',
      value: stats.newEnquiries,
      icon: 'mark_email_unread',
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      iconColor: 'text-yellow-500',
    },
    {
      label: 'Total Orders',
      value: stats.totalOrders,
      icon: 'shopping_bag',
      color: 'bg-green-50 text-green-700 border-green-200',
      iconColor: 'text-green-500',
    },
    {
      label: 'Active Orders',
      value: stats.activeOrders,
      icon: 'pending_actions',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      iconColor: 'text-purple-500',
    },
    {
      label: 'Services Listed',
      value: stats.totalServices,
      icon: 'design_services',
      color: 'bg-zinc-50 text-zinc-700 border-zinc-200',
      iconColor: 'text-zinc-500',
    },
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
          <div
            key={card.label}
            className={`border rounded-sm p-6 ${card.color} transition-shadow hover:shadow-md`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`material-symbols-outlined text-3xl ${card.iconColor}`}>
                {card.icon}
              </span>
            </div>
            <p className="text-3xl font-black tracking-tight">
              {loading ? (
                <span className="inline-block w-8 h-8 bg-current/10 rounded animate-pulse"></span>
              ) : (
                card.value
              )}
            </p>
            <p className="text-xs font-bold uppercase tracking-widest mt-1 opacity-70">
              {card.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-zinc-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/enquiries"
            className="flex items-center gap-4 bg-white border border-zinc-200 p-5 hover:border-yellow-400 hover:shadow-md transition-all group"
          >
            <span className="material-symbols-outlined text-2xl text-zinc-400 group-hover:text-yellow-500 transition-colors">
              contact_mail
            </span>
            <div>
              <p className="font-bold text-sm text-zinc-900">View Enquiries</p>
              <p className="text-xs text-zinc-500">Manage customer enquiries</p>
            </div>
          </a>
          <a
            href="/admin/orders"
            className="flex items-center gap-4 bg-white border border-zinc-200 p-5 hover:border-yellow-400 hover:shadow-md transition-all group"
          >
            <span className="material-symbols-outlined text-2xl text-zinc-400 group-hover:text-yellow-500 transition-colors">
              shopping_bag
            </span>
            <div>
              <p className="font-bold text-sm text-zinc-900">View Orders</p>
              <p className="text-xs text-zinc-500">Track purchased services</p>
            </div>
          </a>
          <a
            href="/admin/services"
            className="flex items-center gap-4 bg-white border border-zinc-200 p-5 hover:border-yellow-400 hover:shadow-md transition-all group"
          >
            <span className="material-symbols-outlined text-2xl text-zinc-400 group-hover:text-yellow-500 transition-colors">
              design_services
            </span>
            <div>
              <p className="font-bold text-sm text-zinc-900">Manage Services</p>
              <p className="text-xs text-zinc-500">Update pricing & availability</p>
            </div>
          </a>
          <a
            href="/admin/payments"
            className="flex items-center gap-4 bg-white border border-zinc-200 p-5 hover:border-yellow-400 hover:shadow-md transition-all group"
          >
            <span className="material-symbols-outlined text-2xl text-zinc-400 group-hover:text-yellow-500 transition-colors">
              payments
            </span>
            <div>
              <p className="font-bold text-sm text-zinc-900">Payments</p>
              <p className="text-xs text-zinc-500">View payment history</p>
            </div>
          </a>
        </div>
      </div>

      {/* Welcome message */}
      <div className="bg-zinc-950 text-white p-8 rounded-sm">
        <div className="flex items-start gap-4">
          <span className="material-symbols-outlined text-yellow-400 text-3xl mt-1">info</span>
          <div>
            <h3 className="font-bold text-lg mb-2">Welcome to the Admin Panel</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              This is your centralized dashboard for managing enquiries, orders, services, and payments.
              Use the sidebar to navigate between sections. Dashboard stats will update in real-time
              as customers interact with your website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
