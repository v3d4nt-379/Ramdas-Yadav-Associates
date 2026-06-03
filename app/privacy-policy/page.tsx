import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Privacy Policy | Ramdas Yadav Associates",
  description:
    "Learn how Ramdas Yadav Associates collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
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
              Privacy Policy
            </h1>
            <p className="font-inter text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Your privacy matters. This policy explains how we collect, use,
              and safeguard your personal data.
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
                    info
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    1. Introduction
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    Ramdas Yadav Associates (&quot;we,&quot; &quot;our,&quot; or
                    &quot;us&quot;) is a professional Chartered Accountancy and
                    financial consulting firm based in Satara, Maharashtra,
                    India. We are committed to protecting the privacy and
                    security of your personal information.
                  </p>
                  <p>
                    This Privacy Policy describes how we collect, use, store, and
                    share your personal data when you use our website, services,
                    or interact with us in any way. By using our website or
                    services, you agree to the terms outlined in this policy.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    database
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    2. Information We Collect
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>We collect information that you provide directly to us:</p>
                  <div className="bg-zinc-50 border border-zinc-200 p-6 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-green-600 text-lg mt-0.5">
                        check_circle
                      </span>
                      <div>
                        <span className="font-bold text-zinc-900">
                          Personal Identification:
                        </span>{" "}
                        Full name, phone number, email address
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-green-600 text-lg mt-0.5">
                        check_circle
                      </span>
                      <div>
                        <span className="font-bold text-zinc-900">
                          Enquiry Details:
                        </span>{" "}
                        Service of interest, messages, and any additional
                        information you share via forms
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-green-600 text-lg mt-0.5">
                        check_circle
                      </span>
                      <div>
                        <span className="font-bold text-zinc-900">
                          Payment Information:
                        </span>{" "}
                        Transaction IDs, payment status, and order details
                        (processed securely via Razorpay — we do not store card
                        numbers or bank details)
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-green-600 text-lg mt-0.5">
                        check_circle
                      </span>
                      <div>
                        <span className="font-bold text-zinc-900">
                          Usage Data:
                        </span>{" "}
                        Browser type, IP address, pages visited, and interaction
                        patterns collected automatically
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    settings
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    3. How We Use Your Information
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>We use the information we collect to:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      Respond to your enquiries and provide requested services
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      Process service orders and payments
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      Send order confirmations, status updates, and service
                      communications via email
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      Maintain and improve our website functionality
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      Comply with legal and regulatory requirements
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      Prevent fraud and ensure security of transactions
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
                    4. Payment Processing
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    All payments on our platform are processed securely through{" "}
                    <strong>Razorpay</strong>, a PCI-DSS compliant payment
                    gateway. We do not store, collect, or have access to your
                    credit/debit card numbers, UPI PINs, or net banking
                    credentials.
                  </p>
                  <p>
                    For payment-related data handling, please refer to{" "}
                    <a
                      href="https://razorpay.com/privacy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-600 underline underline-offset-4 hover:text-yellow-700 font-medium"
                    >
                      Razorpay&apos;s Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    storage
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    5. Data Storage & Security
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    Your data is stored securely using Google Firebase, which
                    provides enterprise-grade security, encryption at rest, and
                    encryption in transit. Our database is hosted in India
                    (asia-south1 region) for data residency compliance.
                  </p>
                  <p>
                    We implement appropriate technical and organizational
                    measures to protect your personal data against unauthorized
                    access, alteration, disclosure, or destruction.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    share
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    6. Data Sharing
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    We do <strong>not</strong> sell, trade, or rent your personal
                    information to third parties. We may share your data only in
                    the following circumstances:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      <strong>Service Providers:</strong> Payment processors
                      (Razorpay), email services (for transactional emails), and
                      hosting platforms necessary to operate our services
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      <strong>Legal Compliance:</strong> When required by Indian
                      law, court orders, or government authorities
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      <strong>Business Transfers:</strong> In the event of a
                      merger, acquisition, or restructuring
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 7 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    cookie
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    7. Cookies
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    Our website may use essential cookies to ensure proper
                    functionality, including authentication and session
                    management. We do not use third-party advertising or tracking
                    cookies.
                  </p>
                </div>
              </div>

              {/* Section 8 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    shield
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    8. Your Rights
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    In accordance with applicable Indian data protection laws
                    (including the Digital Personal Data Protection Act, 2023),
                    you have the right to:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      Access the personal data we hold about you
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      Request correction of inaccurate or incomplete data
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      Request deletion of your personal data (subject to legal
                      retention requirements)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 font-bold mt-0.5">
                        •
                      </span>
                      Withdraw consent for data processing
                    </li>
                  </ul>
                  <p>
                    To exercise any of these rights, please contact us using the
                    details provided below.
                  </p>
                </div>
              </div>

              {/* Section 9 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    child_care
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    9. Children&apos;s Privacy
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    Our services are not directed to individuals under the age of
                    18. We do not knowingly collect personal information from
                    children.
                  </p>
                </div>
              </div>

              {/* Section 10 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-yellow-500 text-2xl">
                    update
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                    10. Changes to This Policy
                  </h2>
                </div>
                <div className="pl-10 space-y-4 text-zinc-600 leading-relaxed">
                  <p>
                    We reserve the right to update this Privacy Policy at any
                    time. Changes will be posted on this page with the updated
                    date. We encourage you to review this page periodically.
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
                    Contact Us
                  </h2>
                </div>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  If you have any questions about this Privacy Policy or wish to
                  exercise your data rights, please contact us:
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
                  className="text-yellow-400 font-bold hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4"
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
