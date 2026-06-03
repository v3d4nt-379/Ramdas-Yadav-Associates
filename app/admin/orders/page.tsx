"use client";

export default function AdminOrders() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Orders</h1>
        <p className="text-zinc-500 text-sm mt-1">Track purchased services and order statuses</p>
      </div>

      <div className="bg-white border border-zinc-200 p-12 text-center">
        <span className="material-symbols-outlined text-6xl text-zinc-300 mb-4 block">
          construction
        </span>
        <h2 className="text-xl font-bold text-zinc-900 mb-2">Coming in Phase 3</h2>
        <p className="text-zinc-500 text-sm max-w-md mx-auto">
          The order management system will be built once the Razorpay payment flow is integrated.
          You&apos;ll be able to view orders, update statuses, and trigger refunds from here.
        </p>
      </div>
    </div>
  );
}
