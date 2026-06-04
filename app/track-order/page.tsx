"use client";

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { ORDER_STATUS_LABELS, OrderStatus } from '@/types';

// Define the linear progress sequence
const STATUS_SEQUENCE: OrderStatus[] = [
  'placed',
  'initiated',
  'documents_requested',
  'in_progress',
  'completed'
];

export default function TrackOrder() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderData, setOrderData] = useState<any>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!orderId.trim() || !email.trim()) return setError('Order ID and Email are required.');

    setLoading(true);
    try {
      const res = await fetch('/api/track-order/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
      
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!otp.trim()) return setError('OTP is required.');

    setLoading(true);
    try {
      const res = await fetch('/api/track-order/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId.trim(), email: email.trim(), otp: otp.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to verify OTP');
      
      setOrderData(data.order);
      setStep(3);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderTimeline = (currentStatus: OrderStatus) => {
    if (currentStatus === 'declined_refunded') {
      return (
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center mt-8">
          <span className="material-symbols-outlined text-red-500 text-5xl mb-4">cancel</span>
          <h3 className="text-xl font-bold text-red-700 mb-2">Order Declined & Refunded</h3>
          <p className="text-sm text-red-600">Your order could not be processed and has been refunded.</p>
        </div>
      );
    }

    const currentIndex = STATUS_SEQUENCE.indexOf(currentStatus);

    return (
      <div className="mt-12 relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-200 md:left-1/2 md:-translate-x-1/2"></div>
        <div className="space-y-12">
          {STATUS_SEQUENCE.map((status, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;
            
            return (
              <div key={status} className={`relative flex items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Mobile line connecting dots is handled by the absolute bar above */}
                
                {/* Dot */}
                <div className={`absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full border-4 flex items-center justify-center z-10 -translate-x-1/2 bg-white transition-colors duration-500 ${
                  isCompleted ? 'border-green-500' : 'border-zinc-300'
                }`}>
                  {isCompleted && <div className="w-2.5 h-2.5 rounded-full bg-green-500" />}
                </div>

                {/* Content Box */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <div className={`p-6 bg-white border shadow-sm transition-all duration-300 ${isCurrent ? 'border-green-500 shadow-md scale-[1.02]' : 'border-zinc-200'}`}>
                    <h4 className={`text-sm font-bold uppercase tracking-widest ${isCompleted ? 'text-zinc-900' : 'text-zinc-400'}`}>
                      {ORDER_STATUS_LABELS[status]}
                    </h4>
                    {isCurrent && (
                      <p className="text-xs text-green-600 mt-2 font-medium">Currently here</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 mb-4">
              Track Your Order
            </h1>
            <p className="text-zinc-500 max-w-lg mx-auto">
              Enter your Order ID and Email to securely view the status of your service request.
            </p>
          </div>

          {step === 1 && (
            <div className="max-w-md mx-auto bg-white p-8 shadow-2xl border border-zinc-100">
              {error && <div className="bg-red-50 text-red-600 text-sm p-4 mb-6">{error}</div>}
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-600 mb-2">Order ID</label>
                  <input
                    type="text" required disabled={loading}
                    value={orderId} onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                    className="w-full border border-zinc-200 px-4 py-3 text-sm font-mono focus:border-black outline-none disabled:opacity-50"
                    placeholder="RYA-2026-00001"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-600 mb-2">Email Address</label>
                  <input
                    type="email" required disabled={loading}
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-zinc-200 px-4 py-3 text-sm focus:border-black outline-none disabled:opacity-50"
                    placeholder="you@example.com"
                  />
                </div>
                <button
                  type="submit" disabled={loading}
                  className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <span className="material-symbols-outlined animate-spin text-sm">sync</span> : null}
                  Send Secure OTP
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-md mx-auto bg-white p-8 shadow-2xl border border-zinc-100 text-center">
              <span className="material-symbols-outlined text-4xl text-green-500 mb-4">mark_email_read</span>
              <h2 className="text-xl font-bold mb-2">Check Your Email</h2>
              <p className="text-zinc-500 text-sm mb-8">We've sent a 6-digit OTP to {email}</p>
              
              {error && <div className="bg-red-50 text-red-600 text-sm p-4 mb-6">{error}</div>}
              
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div>
                  <input
                    type="text" required disabled={loading} maxLength={6}
                    value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full border border-zinc-200 px-4 py-4 text-2xl tracking-[0.5em] text-center font-mono focus:border-black outline-none disabled:opacity-50"
                    placeholder="------"
                  />
                </div>
                <button
                  type="submit" disabled={loading || otp.length !== 6}
                  className="w-full bg-yellow-500 text-black py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify & Track'}
                </button>
                <button
                  type="button" onClick={() => setStep(1)} disabled={loading}
                  className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900"
                >
                  Go Back
                </button>
              </form>
            </div>
          )}

          {step === 3 && orderData && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              {/* Order Header */}
              <div className="bg-zinc-950 text-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                   <img className="w-full h-full object-cover" alt="" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmU9NIYq2hRKDTZRQeFQtYuYM2QQxPOM6dHfRmPEy9aLn6SGee6CkGWurxKS5P3GO07VOqxP0o1k2xG_VZoB4oeDvTzJiLzC3GJOissRR9pPVmO6GX53OeJf5D5n480CK5LWNSkGp_aOqzFn_l5YgtM3VLZMji9LnDQpyNU7O7tvxJUSdSB02OO-j0_F_5lqUVgfYRntAutIf7BKYNbQx0wBzDOu2m6t6Gnvkg8libXwMeyouQjiOZXSABwZE0QtEQ8MxqxomW9h8T" />
                </div>
                <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400 mb-2">Order Reference</p>
                  <h2 className="text-3xl md:text-4xl font-black font-mono tracking-tight">{orderData.order_id}</h2>
                  <p className="text-sm text-zinc-400 mt-4">Placed on {new Date(orderData.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="relative z-10 bg-white/10 backdrop-blur-sm p-6 border border-white/20 min-w-[250px]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1">Service Requested</p>
                  <p className="font-bold text-lg">{orderData.service_name}</p>
                  <div className="h-px bg-white/20 w-full my-4"></div>
                  <div className="flex justify-between items-end">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Total Paid</p>
                    <p className="font-bold text-xl text-yellow-400">₹{(orderData.service_price / 100).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              {renderTimeline(orderData.order_status)}

              {/* Reset Button */}
              <div className="mt-16 text-center">
                <button
                  onClick={() => {
                    setStep(1);
                    setOtp('');
                    setOrderData(null);
                  }}
                  className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-black transition-colors"
                >
                  Track Another Order
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
