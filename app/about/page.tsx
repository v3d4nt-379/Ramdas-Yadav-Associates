import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import EnquiryButton from "@/components/ui/EnquiryButton";

export default function About() {
  return (
    <>
      <Navbar />

      <main className="pt-0">

        {/* 1. HERO SECTION */}
        <section className="relative bg-zinc-950 text-white pt-40 pb-28 px-8 text-center border-b border-zinc-800">
          <div className="max-w-4xl mx-auto">
            <span className="font-label tracking-[0.3em] text-yellow-500 uppercase text-xs mb-6 block font-bold">Who We Are</span>
            <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.95]">
              About Ramdas Yadav <br />& Associates
            </h1>
            <p className="font-inter text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Delivering reliable financial, taxation, and business advisory services with a commitment to precision, compliance, and long-term growth.
            </p>
          </div>
        </section>

        {/* 2. FOUNDER SECTION */}
        <section className="py-24 bg-surface" id="founder">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              {/* Founder Image Column */}
              <div className="relative group perspective w-full max-w-[500px] mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-yellow-400 rounded-[2rem] transform translate-x-4 translate-y-4 opacity-20 group-hover:translate-x-6 group-hover:translate-y-6 transition-all duration-500"></div>

                {/* Image Container */}
                <div className="bg-gradient-to-b from-zinc-100 to-zinc-200 rounded-[2rem] p-8 pb-0 aspect-[4/5] flex items-end justify-center relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-zinc-200 z-10">
                  <img
                    src="/yadav_aboutus.png"
                    alt="CA Mr. Ramdas Yadav"
                    className="w-full h-auto object-contain filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.2)] group-hover:drop-shadow-[0_25px_25px_rgba(250,204,21,0.5)] group-hover:scale-105 transition-all duration-500 origin-bottom"
                  />
                </div>
              </div>

              {/* Founder Text Column */}
              <div>
                <span className="font-label tracking-[0.3em] text-yellow-600 uppercase text-xs mb-4 block font-bold">Principal Founder</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-zinc-900">Mr. Ramdas Yadav</h2>
                <h3 className="text-lg text-zinc-500 font-bold uppercase tracking-widest mb-8">CA Finalist | Tax Consultant | Business Advisor</h3>

                <div className="space-y-6 text-zinc-600 text-lg leading-relaxed mb-10">
                  <p>
                    Ramdas Yadav is a dedicated finance professional specializing in taxation, compliance, and business advisory. With hands-on experience assisting clients across income tax, GST, and business registrations, he focuses on delivering practical and result-oriented financial solutions.
                  </p>
                  <p>
                    His approach combines technical accuracy with real-world problem-solving, helping businesses navigate regulatory requirements while building a strong financial foundation for growth.
                  </p>
                </div>

                <div className="bg-zinc-50 border-l-4 border-yellow-400 p-6">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 mb-4">Core Expertise</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-zinc-700 font-medium">
                      <span className="material-symbols-outlined text-green-600">check_circle</span>
                      Direct & Indirect Taxation
                    </li>
                    <li className="flex items-center gap-3 text-zinc-700 font-medium">
                      <span className="material-symbols-outlined text-green-600">check_circle</span>
                      Business Formation & Compliance
                    </li>
                    <li className="flex items-center gap-3 text-zinc-700 font-medium">
                      <span className="material-symbols-outlined text-green-600">check_circle</span>
                      Financial Advisory
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 3. EXPERIENCE & EXPERTISE */}
        <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-5 pointer-events-none transform translate-x-1/3 -translate-y-1/3">
            <span className="material-symbols-outlined text-[400px]">account_balance</span>
          </div>
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Experience & Expertise</h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                With practical exposure to taxation and compliance services, the firm has supported startups, small businesses, and individuals in managing their financial and legal requirements efficiently.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Taxation & Compliance", icon: "request_quote" },
                { title: "Business Registration", icon: "domain" },
                { title: "Financial Advisory", icon: "monitoring" },
                { title: "Accounting Support", icon: "account_balance_wallet" }
              ].map((card, idx) => (
                <div key={idx} className="bg-zinc-900 border border-zinc-800 p-8 hover:border-yellow-500 hover:bg-zinc-800 transition-all duration-300 text-center group">
                  <span className="material-symbols-outlined text-5xl text-zinc-600 group-hover:text-yellow-400 mb-6 transition-colors duration-300 block">{card.icon}</span>
                  <h3 className="text-xl font-bold text-white leading-snug">{card.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. MISSION & VISION */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="bg-zinc-50 border border-zinc-200 p-10 md:p-16 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-8">
                  <span className="material-symbols-outlined text-4xl text-yellow-500">flag</span>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-900">Our Mission</h2>
                </div>
                <p className="text-zinc-600 text-xl md:text-2xl font-light leading-relaxed">
                  "To provide reliable, transparent, and efficient financial services that empower businesses to operate confidently and grow sustainably."
                </p>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 p-10 md:p-16 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-8">
                  <span className="material-symbols-outlined text-4xl text-yellow-500">visibility</span>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-900">Our Vision</h2>
                </div>
                <p className="text-zinc-600 text-xl md:text-2xl font-light leading-relaxed">
                  "To become a trusted financial partner for startups and small businesses by delivering consistent value and professional excellence."
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 5. WHY CHOOSE US & 6. STATS */}
        <section className="py-24 bg-yellow-400 text-black border-y-[16px] border-black">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

              {/* Why Choose Us */}
              <div className="lg:col-span-7">
                <span className="font-label tracking-[0.3em] font-bold uppercase text-xs mb-4 block text-zinc-900">Core Value Proposition</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 uppercase">Why Choose Us</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  {[
                    "Personalized Client Support",
                    "Practical & Result-Oriented Approach",
                    "Timely Compliance & Filing",
                    "Affordable & Transparent Pricing",
                    "End-to-End Business Support"
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <span className="material-symbols-outlined mt-0.5 border-2 border-black rounded-full text-black bg-white select-none">done</span>
                      <h4 className="font-bold text-lg leading-snug">{item}</h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 border-t-2 border-black/20 lg:border-t-0 lg:border-l-2 pt-10 lg:pt-0 lg:pl-10">
                <div className="bg-black text-white p-8 hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-5xl font-black mb-2 text-yellow-400">50+</h3>
                  <p className="text-sm font-bold uppercase tracking-widest text-zinc-300 block">Clients Served</p>
                </div>
                <div className="bg-black text-white p-8 hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="text-5xl font-black mb-2 text-yellow-400">2+</h3>
                  <p className="text-sm font-bold uppercase tracking-widest text-zinc-300 block">Years Experience</p>
                </div>
                <div className="bg-black text-white p-8 hover:-translate-y-2 transition-transform duration-300 sm:col-span-2">
                  <h3 className="text-5xl font-black mb-2 text-yellow-400">10+</h3>
                  <p className="text-sm font-bold uppercase tracking-widest text-zinc-300 block">Services Offered</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 7. CTA SECTION */}
        <section className="bg-zinc-100 py-32 px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <span className="material-symbols-outlined text-5xl text-yellow-500 mb-2">construction</span>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-black tracking-tighter text-zinc-900 leading-tight uppercase">
              Let’s build your business with the right financial foundation.
            </h2>
            <p className="text-zinc-500 text-lg font-medium max-w-2xl mx-auto pb-4">
              Our dedicated team is ready to provide precise, robust, and dynamic solutions tailored exclusively for your operations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <EnquiryButton
                text="Get Consultation"
                className="bg-black text-yellow-400 px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-zinc-900 hover:-translate-y-1 transition-all duration-300 shadow-xl"
              />
              <Link
                href="/contact"
                className="bg-white border-2 border-black text-black px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors duration-300 shadow-xl inline-block"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-zinc-950 dark:bg-black w-full pt-20 pb-10 border-t border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 max-w-7xl mx-auto">
          <div className="md:col-span-2">
            <div className="text-2xl font-black tracking-tighter text-white mb-6 uppercase">Ramdas Yadav Associates</div>
            <p className="text-zinc-400 font-inter text-sm leading-relaxed max-w-md mb-8">
              Defining the future of professional financial services through unmatched expertise and architectural precision. Trusted by market leaders globally.
            </p>
            <div className="flex gap-4">
              <a className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-white hover:bg-yellow-400 hover:text-black transition-all" href="#"><span className="material-symbols-outlined text-lg">public</span></a>
              <a className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-white hover:bg-yellow-400 hover:text-black transition-all" href="#"><span className="material-symbols-outlined text-lg">share</span></a>
              <a className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-white hover:bg-yellow-400 hover:text-black transition-all" href="#"><span className="material-symbols-outlined text-lg">mail</span></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4" href="/">Home</Link></li>
              <li><Link className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4" href="/about">About Us</Link></li>
              <li><Link className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4" href="/services">Services</Link></li>
              <li><Link className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4" href="/#process">Process</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Resources</h4>
            <ul className="space-y-4">
              <li><Link className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4" href="#">Privacy Policy</Link></li>
              <li><Link className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4" href="#">Terms of Service</Link></li>
              <li><Link className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4" href="/contact">Contact Us</Link></li>
              <li><Link className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4 text-yellow-400 font-bold" href="#">Client Login</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-20 pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-500 font-inter text-sm">© 2024 Ramdas Yadav Associates. All rights reserved.</p>
          <p className="text-zinc-500 font-inter text-sm">Architectural Authority in Finance</p>
        </div>
      </footer>
    </>
  );
}
