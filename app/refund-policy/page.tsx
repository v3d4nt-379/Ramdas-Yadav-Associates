import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Refund & Cancellation Policy | Ramdas Yadav Associates",
  description:
    "Understand our refund and cancellation policy for purchased services at Ramdas Yadav Associates.",
};

export default function RefundPolicy() {
  return (
    <>
      <Navbar />

      <main className="pt-0">
        {/* HERO */}
        <section className="relative bg-zinc-950 text-white pt-32 pb-24 px-8 text-center border-b border-zinc-800">
          <div className="max-w-3xl mx-auto">
            <span className="font-label tracking-[0.3em] text-yellow-400 uppercase text-xs mb-6 block font-bold">
              Legal
            </span>
            <h1 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
              Refund & Cancellation Policy
            </h1>
            <p className="font-inter text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Our commitment to fair and transparent handling of cancellations
              and refunds.
            </p>
            <p className="font-inter text-sm text-zinc-600 mt-6">
              Last updated: June 2025
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-20 bg-surface">
          <div className="max-w-4xl mx-auto px-8">
            <div className="space-y-12">
              {/* Important Notice */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 md:p-8">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-yellow-600 text-2xl mt-0.5">
                    info
                  </span>
                  <div>
                    <h3 className="font-black text-lg text-zinc-900 uppercase tracking-tight mb-2">
                      Important Notice
                    </h3>
                    <p className="text-zinc-700 leading-relaxed">
                      Ramdas Yadav Associates provides professional services
                      that involve time, effort, and regulatory processing.
                      Refund eligibility depends on the stage of service at the
                      time of cancellation. Please read this policy carefully
                      before purchasing any service.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 1 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    cancel
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    1. Cancellation Policy
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    You may request cancellation of a purchased service under the
                    following conditions:
                  </p>

                  {/* Cancellation Scenarios */}
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-green-600">
                          check_circle
                        </span>
                        <h4 className="font-bold text-green-900 uppercase text-sm tracking-wider">
                          Before Work Initiation — Full Refund
                        </h4>
                      </div>
                      <p className="text-green-800 text-sm ml-9">
                        If the service work has not yet been started by our team,
                        you are eligible for a <strong>full refund</strong>. This
                        typically applies to orders in &quot;Placed&quot; status.
                      </p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-yellow-600">
                          warning
                        </span>
                        <h4 className="font-bold text-yellow-900 uppercase text-sm tracking-wider">
                          After Work Initiation — No Refund
                        </h4>
                      </div>
                      <p className="text-yellow-800 text-sm ml-9">
                        Once the service work has been initiated (order status:
                        &quot;Initiated,&quot; &quot;Documents Requested,&quot;
                        &quot;In Progress&quot;), cancellation is{" "}
                        <strong>not eligible for a refund</strong> as
                        professional time and resources have been committed.
                      </p>
                    </div>

                    <div className="bg-zinc-100 border border-zinc-300 p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-zinc-600">
                          block
                        </span>
                        <h4 className="font-bold text-zinc-900 uppercase text-sm tracking-wider">
                          After Completion — No Refund
                        </h4>
                      </div>
                      <p className="text-zinc-700 text-sm ml-9">
                        Services marked as &quot;Completed&quot; are not eligible
                        for cancellation or refund.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    currency_rupee
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    2. Refund Policy
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>Refunds are applicable under the following scenarios:</p>

                  {/* Refund Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-zinc-950 text-white">
                          <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest">
                            Scenario
                          </th>
                          <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest">
                            Refund
                          </th>
                          <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest">
                            Timeline
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-zinc-200">
                          <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                            Order declined by admin
                          </td>
                          <td className="px-6 py-4 text-sm text-green-700 font-bold">
                            Full Refund
                          </td>
                          <td className="px-6 py-4 text-sm text-zinc-600">
                            5–7 business days
                          </td>
                        </tr>
                        <tr className="border-b border-zinc-200 bg-zinc-50">
                          <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                            Customer cancels before work starts
                          </td>
                          <td className="px-6 py-4 text-sm text-green-700 font-bold">
                            Full Refund
                          </td>
                          <td className="px-6 py-4 text-sm text-zinc-600">
                            5–7 business days
                          </td>
                        </tr>
                        <tr className="border-b border-zinc-200">
                          <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                            Payment failed / transaction error
                          </td>
                          <td className="px-6 py-4 text-sm text-green-700 font-bold">
                            Auto-reversed
                          </td>
                          <td className="px-6 py-4 text-sm text-zinc-600">
                            Immediate to 48 hours
                          </td>
                        </tr>
                        <tr className="border-b border-zinc-200 bg-zinc-50">
                          <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                            Customer cancels after work starts
                          </td>
                          <td className="px-6 py-4 text-sm text-red-600 font-bold">
                            No Refund
                          </td>
                          <td className="px-6 py-4 text-sm text-zinc-600">
                            N/A
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                            Service completed
                          </td>
                          <td className="px-6 py-4 text-sm text-red-600 font-bold">
                            No Refund
                          </td>
                          <td className="px-6 py-4 text-sm text-zinc-600">
                            N/A
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    sync
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    3. How Refunds Are Processed
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    All eligible refunds are processed through{" "}
                    <strong>Razorpay</strong> and credited back to the original
                    payment method used during purchase.
                  </p>
                  <div className="bg-zinc-50 border border-zinc-200 p-6 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-green-600 text-lg mt-0.5">
                        check_circle
                      </span>
                      <div>
                        <span className="font-bold text-zinc-900">
                          UPI Payments:
                        </span>{" "}
                        Refund credited within 5–7 business days
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-green-600 text-lg mt-0.5">
                        check_circle
                      </span>
                      <div>
                        <span className="font-bold text-zinc-900">
                          Credit/Debit Cards:
                        </span>{" "}
                        Refund credited within 5–10 business days
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-green-600 text-lg mt-0.5">
                        check_circle
                      </span>
                      <div>
                        <span className="font-bold text-zinc-900">
                          Net Banking:
                        </span>{" "}
                        Refund credited within 5–7 business days
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-green-600 text-lg mt-0.5">
                        check_circle
                      </span>
                      <div>
                        <span className="font-bold text-zinc-900">
                          Wallets:
                        </span>{" "}
                        Refund credited within 24–48 hours
                      </div>
                    </div>
                  </div>
                  <p>
                    Refund timelines depend on the payment method and the
                    respective bank&apos;s processing time. We are not
                    responsible for delays caused by banks or payment
                    intermediaries.
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    help
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    4. How to Request a Cancellation or Refund
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>To request a cancellation or refund:</p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-zinc-950 text-white flex items-center justify-center font-black text-sm shrink-0">
                        1
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900">
                          Contact us via email or phone
                        </p>
                        <p className="text-sm">
                          Provide your Order ID and the reason for cancellation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-zinc-950 text-white flex items-center justify-center font-black text-sm shrink-0">
                        2
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900">
                          Our team reviews the request
                        </p>
                        <p className="text-sm">
                          We verify the order status and refund eligibility
                          within 24 hours
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-zinc-950 text-white flex items-center justify-center font-black text-sm shrink-0">
                        3
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900">
                          Refund is processed (if eligible)
                        </p>
                        <p className="text-sm">
                          Amount is credited back to your original payment method
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    do_not_disturb
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    5. Non-Refundable Scenarios
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    The following scenarios are <strong>not eligible</strong> for
                    any refund:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold mt-0.5">✕</span>
                      Services where work has already been initiated or
                      partially completed
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold mt-0.5">✕</span>
                      Government fee components (filing fees, registration fees,
                      stamp duty) already paid to authorities on your behalf
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold mt-0.5">✕</span>
                      Services rejected or denied by government authorities due
                      to incomplete or inaccurate information provided by the
                      customer
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold mt-0.5">✕</span>
                      Failure to provide requested documents within the
                      specified timeframe
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 6 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    edit_note
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    6. Policy Changes
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    We reserve the right to modify this Refund & Cancellation
                    Policy at any time. Changes will be posted on this page with
                    the updated date. Orders placed before any policy change will
                    be governed by the policy in effect at the time of purchase.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-zinc-950 text-white p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-yellow-400 text-2xl">
                    contact_support
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight">
                    Need Help?
                  </h2>
                </div>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  For cancellation or refund requests, contact us with your Order
                  ID:
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-yellow-400 text-lg">
                      business
                    </span>
                    <span className="text-zinc-300">
                      Ramdas Yadav Associates, Satara, Maharashtra, India
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-yellow-400 text-lg">
                      mail
                    </span>
                    <a
                      href="mailto:ramdasyadav999@gmail.com"
                      className="text-zinc-300 hover:text-yellow-400 transition-colors"
                    >
                      ramdasyadav999@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-yellow-400 text-lg">
                      call
                    </span>
                    <a
                      href="tel:+918698037909"
                      className="text-zinc-300 hover:text-yellow-400 transition-colors"
                    >
                      +91 8698037909
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-zinc-950 dark:bg-black w-full pt-20 pb-10 border-t border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 max-w-7xl mx-auto">
          <div className="md:col-span-2">
            <div className="text-2xl font-black tracking-tighter text-white mb-6 uppercase">
              Ramdas Yadav Associates
            </div>
            <p className="text-zinc-400 font-inter text-sm leading-relaxed max-w-md mb-8">
              Defining the future of professional financial services through
              unmatched expertise and architectural precision. Trusted by market
              leaders globally.
            </p>
            <div className="flex gap-4">
              <a
                className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-white hover:bg-yellow-400 hover:text-black transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-lg">
                  public
                </span>
              </a>
              <a
                className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-white hover:bg-yellow-400 hover:text-black transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-lg">
                  share
                </span>
              </a>
              <a
                className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-white hover:bg-yellow-400 hover:text-black transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-lg">mail</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">
              Quick Links
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4"
                  href="/about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4"
                  href="/services"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4"
                  href="/contact"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">
              Legal
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4"
                  href="/terms-of-service"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  className="text-yellow-400 font-bold hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4"
                  href="/refund-policy"
                >
                  Refund & Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-20 pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-500 font-inter text-sm">
            © {new Date().getFullYear()} Ramdas Yadav Associates. All rights
            reserved.
          </p>
          <p className="text-zinc-500 font-inter text-sm">
            Architectural Authority in Finance
          </p>
        </div>
      </footer>
    </>
  );
}
