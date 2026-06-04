"use client";

import { useState, useEffect, FormEvent } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
  serviceName: string;
  servicePricePaise: number;
}

export default function PurchaseModal({ isOpen, onClose, serviceId, serviceName, servicePricePaise }: PurchaseModalProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [scriptReady, setScriptReady] = useState(false);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setError("");
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Full Name is required.");
    if (!/^[0-9]{10}$/.test(phone)) return setError("Enter a valid 10-digit phone number.");
    if (!scriptReady) return setError("Payment system is still loading. Please wait a moment.");

    setIsSubmitting(true);

    try {
      // Step 1: Create Razorpay order on server
      const createRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service_id: serviceId }),
      });
      const orderData = await createRes.json();

      if (!createRes.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Step 2: Open Razorpay checkout popup
      const rzpOptions = {
        key: orderData.key_id,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Ramdas Yadav Associates",
        description: serviceName,
        order_id: orderData.order.id,
        handler: async function (response: any) {
          // Step 3: Verify payment on server
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                service_id: serviceId,
                customerDetails: {
                  name: name.trim(),
                  phone,
                  email: email.trim() || undefined,
                  message: message.trim() || undefined,
                },
              }),
            });
            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || 'Verification failed');
            }

            // Success — redirect
            router.push(`/payment-success?order_id=${verifyData.order_id}`);
          } catch (verifyErr: any) {
            setError(`Payment received but verification failed: ${verifyErr.message}. Please contact support immediately.`);
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: name.trim(),
          email: email.trim(),
          contact: phone,
        },
        theme: { color: "#000000" },
        modal: {
          ondismiss: () => setIsSubmitting(false),
        },
      };

      const rzp = new window.Razorpay(rzpOptions);
      rzp.on('payment.failed', (res: any) => {
        setError(`Payment failed: ${res.error.description}`);
        setIsSubmitting(false);
      });
      rzp.open();

    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const displayPrice = `\u20B9${(servicePricePaise / 100).toLocaleString('en-IN')}`;

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        onReady={() => setScriptReady(true)}
      />
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => !isSubmitting && onClose()}
        />

        {/* Modal */}
        <div className="relative w-full max-w-5xl bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]">

          {/* Close button */}
          <button
            onClick={() => !isSubmitting && onClose()}
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center text-zinc-600 md:text-zinc-600 transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          {/* Left: Order Summary (desktop only) */}
          <div className="hidden md:flex md:w-2/5 relative bg-zinc-950 text-white p-12 flex-col justify-between">
            <div className="absolute inset-0 opacity-20 grayscale">
              <img className="w-full h-full object-cover" alt="" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgJj6zGL59AVnReik1VwV-z2e-0JJSQOGm00cIGKHGsMC47k13w9QmT8b_kEXdvsbpLGJCe44Xt-q2Rp_r7LCFHNYsTG2KTOR6aww1Aiya15dth69Ek6X5n24Tunr7814Zju1vr3lZkfKzsUD-uE-5JI4sndyHIjorozPKE32MOCRRk79gzIRhT1RGzwwkIj1xiMyrnSi1EEpLlSFblS_zjKs33juDUOcyDXXzUT3Gj5Mf1BWC3C0Oow1B84-Hu7R-CZHnlbDaELgL" />
            </div>
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 mb-6 border-l-2 border-yellow-400 bg-white/5 text-[10px] tracking-[0.2em] uppercase text-yellow-400 font-bold">
                Secure Checkout
              </div>
              <h2 className="text-3xl font-black tracking-tight leading-tight mb-2">Order Summary</h2>
              <div className="mt-8 bg-white/5 border border-white/10 p-6 rounded-lg backdrop-blur-sm">
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mb-1">Service</p>
                <p className="text-lg font-medium text-white mb-6">{serviceName}</p>
                <div className="h-px bg-white/10 w-full mb-6"></div>
                <div className="flex justify-between items-end">
                  <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Total</p>
                  <p className="text-3xl font-black text-white">{displayPrice}</p>
                </div>
              </div>
            </div>
            <div className="relative z-10 mt-12 space-y-4">
              <div className="flex gap-3 items-center">
                <span className="material-symbols-outlined text-green-400 text-2xl">lock</span>
                <p className="text-xs text-zinc-400">256-bit Encrypted Secure Payment</p>
              </div>
              <div className="flex gap-3 items-center">
                <span className="material-symbols-outlined text-yellow-400 text-2xl">support_agent</span>
                <p className="text-xs text-zinc-400">24/7 Expert Support Included</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:w-3/5 p-6 sm:p-8 md:p-12 overflow-y-auto">
            {/* Mobile summary */}
            <div className="md:hidden bg-zinc-50 border border-zinc-200 p-4 mb-6 rounded">
              <div className="flex justify-between items-center">
                <p className="font-medium text-zinc-900 line-clamp-1 mr-4">{serviceName}</p>
                <p className="text-xl font-black">{displayPrice}</p>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-6 uppercase tracking-tight">Billing Details</h3>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 text-sm mb-6 border-l-4 border-red-600">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-600 mb-2">Full Name *</label>
                  <input
                    type="text" required disabled={isSubmitting}
                    value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full border border-zinc-200 px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-zinc-400 disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-600 mb-2">Phone *</label>
                  <input
                    type="tel" required disabled={isSubmitting}
                    maxLength={10} value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full border border-zinc-200 px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-zinc-400 disabled:opacity-50"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-600 mb-2">Email (Optional)</label>
                <input
                  type="email" disabled={isSubmitting}
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-zinc-200 px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-zinc-400 disabled:opacity-50"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-600 mb-2">Note (Optional)</label>
                <textarea
                  disabled={isSubmitting} value={message} onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full border border-zinc-200 px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none placeholder:text-zinc-400 disabled:opacity-50"
                  placeholder="Any specific requirements..."
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !scriptReady}
                  className={`w-full py-4 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                    isSubmitting || !scriptReady
                      ? 'bg-zinc-400 text-white cursor-not-allowed'
                      : 'bg-black text-white hover:bg-zinc-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? (
                    <><span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>Processing...</>
                  ) : !scriptReady ? (
                    'Loading Secure Checkout...'
                  ) : (
                    `Pay ${displayPrice}`
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-zinc-400 uppercase tracking-widest">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  Secured by Razorpay
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
