"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: 'dashboard' },
  { href: '/admin/enquiries', label: 'Enquiries', icon: 'contact_mail' },
  { href: '/admin/orders', label: 'Orders', icon: 'shopping_bag' },
  { href: '/admin/services', label: 'Services', icon: 'design_services' },
  { href: '/admin/payments', label: 'Payments', icon: 'payments' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't apply layout to login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const tokenResult = await firebaseUser.getIdTokenResult();
        if (tokenResult.claims.isAdmin === true) {
          setUser(firebaseUser);
          setLoading(false);
          return;
        }
      }
      // Not authenticated or not admin — redirect to login
      router.push('/admin/login');
    });

    return () => unsubscribe();
  }, [router, isLoginPage]);

  // Login page renders without the admin shell
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!user) return null;

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-[260px] bg-zinc-950 border-r border-zinc-800 flex flex-col z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-zinc-800">
          <Link href="/admin" className="block" onClick={() => setSidebarOpen(false)}>
            <span className="text-sm font-black tracking-tighter text-white uppercase block">
              Ramdas Yadav
            </span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-yellow-400 uppercase">
              Admin Panel
            </span>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all rounded-sm ${
                  isActive
                    ? 'bg-yellow-400 text-black'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User info + Logout */}
        <div className="p-4 border-t border-zinc-800">
          <div className="mb-3 px-2">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest truncate">
              {user.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider text-red-400 hover:bg-red-950/50 hover:text-red-300 transition-all rounded-sm"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Logout
          </button>
        </div>

        {/* Back to site */}
        <div className="p-4 border-t border-zinc-800">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-400 text-xs font-bold uppercase tracking-widest transition-colors px-2"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          <div className="hidden lg:block">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
              {sidebarLinks.find((l) => l.href === pathname)?.label || 'Admin'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-black text-lg">person</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
