"use client";

export default function AdminEnquiries() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Enquiries</h1>
        <p className="text-zinc-500 text-sm mt-1">Manage incoming customer enquiries</p>
      </div>

      <div className="bg-white border border-zinc-200 p-12 text-center">
        <span className="material-symbols-outlined text-6xl text-zinc-300 mb-4 block">
          construction
        </span>
        <h2 className="text-xl font-bold text-zinc-900 mb-2">Coming in Phase 2</h2>
        <p className="text-zinc-500 text-sm max-w-md mx-auto">
          The enquiry management system will be connected to Firestore once the customer-facing
          enquiry form is updated. You&apos;ll be able to view, filter, and update enquiry statuses here.
        </p>
      </div>
    </div>
  );
}
