import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Terms of Service | Ramdas Yadav Associates",
  description:
    "Read the terms and conditions governing the use of Ramdas Yadav Associates' website and professional services.",
};

export default function TermsOfService() {
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
            <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
              Terms of Service
            </h1>
            <p className="font-inter text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Please read these terms carefully before using our website or
              purchasing any services.
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
              {/* Section 1 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    gavel
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    1. Acceptance of Terms
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    By accessing and using the website of Ramdas Yadav Associates
                    (&quot;we,&quot; &quot;our,&quot; or &quot;the Firm&quot;),
                    you agree to be bound by these Terms of Service. If you do
                    not agree to these terms, please do not use our website or
                    services.
                  </p>
                  <p>
                    These terms apply to all visitors, users, enquirers, and
                    customers of the website and services offered by the Firm.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    description
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    2. Services Offered
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    Ramdas Yadav Associates provides professional services
                    including but not limited to:
                  </p>
                  <div className="bg-zinc-50 border border-zinc-200 p-6 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-green-600 text-lg mt-0.5">
                        check_circle
                      </span>
                      <span>
                        Business registrations (Company, LLP, Partnership,
                        Proprietorship, GST, MSME, etc.)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-green-600 text-lg mt-0.5">
                        check_circle
                      </span>
                      <span>
                        Tax compliance services (GST filing, Income Tax, TDS)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-green-600 text-lg mt-0.5">
                        check_circle
                      </span>
                      <span>
                        Business consulting and advisory services
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-green-600 text-lg mt-0.5">
                        check_circle
                      </span>
                      <span>Accounting, bookkeeping, and audit services</span>
                    </div>
                  </div>
                  <p>
                    The scope, timeline, and deliverables of each service are
                    determined based on the nature of the service and the
                    customer&apos;s specific requirements.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    shopping_cart
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    3. Orders & Purchases
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    When you purchase a service through our website, you agree to
                    the following:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      You will provide accurate and complete information
                      (name, phone, email) during the order process
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      Payment is required at the time of placing the order
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      An order is confirmed only after successful payment
                      verification
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      You will receive an Order ID and tracking link via email
                      upon successful payment
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      The Firm reserves the right to decline an order and
                      issue a full refund if the service cannot be provided
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    payments
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    4. Payment Terms
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    All payments are processed through{" "}
                    <strong>Razorpay</strong>, a secure and PCI-DSS compliant
                    payment gateway. We accept:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { icon: "credit_card", label: "Debit/Credit Cards" },
                      { icon: "qr_code_2", label: "UPI" },
                      { icon: "account_balance", label: "Net Banking" },
                      { icon: "wallet", label: "Wallets" },
                    ].map((method) => (
                      <div
                        key={method.label}
                        className="bg-zinc-50 border border-zinc-200 p-4 text-center"
                      >
                        <span className="material-symbols-outlined text-2xl text-zinc-700 mb-2 block">
                          {method.icon}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                          {method.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p>
                    All prices displayed on the website are in Indian Rupees
                    (INR). Prices are subject to change without prior notice, but
                    orders placed at the listed price will be honored at that
                    price.
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    assignment_return
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    5. Refund & Cancellation
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    Our refund and cancellation policy is detailed on our{" "}
                    <Link
                      href="/refund-policy"
                      className="text-yellow-600 underline underline-offset-4 hover:text-yellow-700 font-medium"
                    >
                      Refund & Cancellation Policy
                    </Link>{" "}
                    page. In summary:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      Full refund if an order is declined by the Firm
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      Cancellation is allowed before work has been initiated
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      No refund once the service work has begun
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 6 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    person
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    6. User Responsibilities
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>As a user of our website and services, you agree to:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      Provide accurate and truthful information in all forms
                      and communications
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      Promptly provide requested documents necessary for
                      service completion
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      Not misuse the website or attempt unauthorized access to
                      any system
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      Respect intellectual property and not reproduce website
                      content without permission
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 7 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    copyright
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    7. Intellectual Property
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    All content on this website — including text, design,
                    graphics, logos, and images — is the property of Ramdas Yadav
                    Associates and is protected under Indian intellectual
                    property laws. Unauthorized reproduction, distribution, or
                    use is prohibited.
                  </p>
                </div>
              </div>

              {/* Section 8 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    warning
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    8. Limitation of Liability
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    Ramdas Yadav Associates provides services on a best-effort
                    basis. While we strive for accuracy and timely service
                    delivery:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      We are not liable for delays caused by government
                      departments, regulatory bodies, or external third
                      parties
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      We are not liable for outcomes dependent on government
                      approvals or third-party actions
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      Our total liability shall not exceed the amount paid by
                      the customer for the specific service
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 9 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    security
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    9. Confidentiality
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    We treat all client information with the highest level of
                    confidentiality. Financial documents, personal details, and
                    business information shared with us are used exclusively for
                    the purpose of providing the contracted services and are
                    never disclosed to unauthorized parties.
                  </p>
                </div>
              </div>

              {/* Section 10 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    balance
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    10. Governing Law & Jurisdiction
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    These Terms of Service are governed by and construed in
                    accordance with the laws of India. Any disputes arising from
                    these terms shall be subject to the exclusive jurisdiction of
                    the courts in Satara, Maharashtra.
                  </p>
                </div>
              </div>

              {/* Section 11 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    edit_note
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    11. Modifications
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    We reserve the right to modify these Terms of Service at any
                    time. Updated terms will be posted on this page. Continued
                    use of the website after changes constitutes acceptance of
                    the updated terms.
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
                    Questions?
                  </h2>
                </div>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  If you have any questions about these Terms of Service, please
                  contact us:
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
                  className="text-yellow-400 font-bold hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4"
                  href="/terms-of-service"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4"
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
