"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6 mt-20">
        <div className="max-w-md w-full bg-white p-8 md:p-12 border border-zinc-200 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-green-600 text-4xl">check_circle</span>
          </div>

          <h1 className="text-3xl font-black uppercase tracking-tight mb-2 text-zinc-900">
            Payment Successful
          </h1>
          <p className="text-zinc-500 mb-8 text-sm">
            Thank you for your purchase. We have received your payment securely.
          </p>

          {orderId && (
            <div className="bg-zinc-50 border border-zinc-200 p-4 mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1">
                Order Reference
              </p>
              <p className="font-mono text-lg font-bold text-zinc-900">{orderId}</p>
            </div>
          )}

          <div className="space-y-4">
            <Link
              href="/services"
              className="block w-full py-4 text-xs font-bold uppercase tracking-widest bg-black text-white hover:bg-zinc-800 transition-colors"
            >
              Browse More Services
            </Link>
            <Link
              href="/"
              className="block w-full py-4 text-xs font-bold uppercase tracking-widest bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-zinc-400">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
