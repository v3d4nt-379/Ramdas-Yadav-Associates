import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export default function Services() {
  return (
    <>
      <Navbar />

      <main className="pt-0">
        {/* Hero Section */}
        <section className="relative bg-inverse-surface text-on-primary overflow-hidden h-[614px] flex items-center">
          <div className="absolute inset-0 opacity-20 grayscale scale-110">
            <img className="w-full h-full object-cover" alt="Modern geometric skyscraper facade with sharp angles and dramatic high contrast shadows in monochrome architectural style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgJj6zGL59AVnReik1VwV-z2e-0JJSQOGm00cIGKHGsMC47k13w9QmT8b_kEXdvsbpLGJCe44Xt-q2Rp_r7LCFHNYsTG2KTOR6aww1Aiya15dth69Ek6X5n24Tunr7814Zju1vr3lZkfKzsUD-uE-5JI4sndyHIjorozPKE32MOCRRk79gzIRhT1RGzwwkIj1xiMyrnSi1EEpLlSFblS_zjKs33juDUOcyDXXzUT3Gj5Mf1BWC3C0Oow1B84-Hu7R-CZHnlbDaELgL"/>
          </div>
          <div className="max-w-7xl mx-auto px-8 relative z-10 grid grid-cols-12 w-full">
            <div className="col-span-12 md:col-span-8">
              <span className="font-label tracking-[0.3em] text-primary-container uppercase text-sm mb-6 block font-bold text-yellow-500">STRATEGIC GUIDANCE</span>
              <h1 className="font-headline text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8 text-white">
                Our <br/>Services
              </h1>
              <p className="font-body text-xl md:text-2xl text-zinc-300 max-w-2xl mb-10 leading-relaxed">
                Comprehensive financial and compliance solutions for businesses and individuals aiming for absolute market authority.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary-container text-black font-bold uppercase px-10 py-5 tracking-widest text-sm hover:bg-white transition-colors">
                  Get Consultation
                </button>
                <button className="border border-zinc-500 text-white font-bold uppercase px-10 py-5 tracking-widest text-sm hover:bg-zinc-800 transition-colors">
                  Browse Services
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <section className="bg-surface-container-low border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="relative w-full md:w-1/3 flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-zinc-400">search</span>
                <input className="w-full bg-white border-none py-4 pl-12 pr-4 font-label text-xs tracking-widest focus:ring-0 text-black placeholder:text-zinc-400 focus:outline-none" placeholder="SEARCH SERVICES..." type="text"/>
              </div>
              <div className="flex gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                <button className="px-8 py-3 font-label text-xs tracking-[0.2em] uppercase font-bold bg-primary-container text-black">All</button>
                <button className="px-8 py-3 font-label text-xs tracking-[0.2em] uppercase font-bold bg-transparent text-zinc-500 hover:text-black">Registration</button>
                <button className="px-8 py-3 font-label text-xs tracking-[0.2em] uppercase font-bold bg-transparent text-zinc-500 hover:text-black">Tax</button>
                <button className="px-8 py-3 font-label text-xs tracking-[0.2em] uppercase font-bold bg-transparent text-zinc-500 hover:text-black">Other</button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Content - Registration */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-24">
              <div className="flex items-end justify-between mb-12 border-l-8 border-primary-container pl-6">
                <h2 className="font-headline text-5xl font-black uppercase tracking-tighter text-black">Registration <br/>Services</h2>
                <span className="font-label text-zinc-400 tracking-[0.5em] text-xs uppercase hidden md:block font-bold">Secure Your Identity</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Service Card 1 */}
                <div className="group relative bg-white p-8 flex flex-col h-full service-card transition-all duration-300 hover:shadow-xl">
                  <div className="absolute top-0 left-0 h-1 bg-primary-container accent-bar transition-all duration-500 w-0 group-hover:w-full"></div>
                  <span className="material-symbols-outlined text-4xl mb-6 text-black">corporate_fare</span>
                  <h3 className="text-xl font-bold mb-3 uppercase tracking-tight text-black">Private Limited Co.</h3>
                  <p className="text-zinc-600 text-sm mb-6 leading-relaxed">Complete structural incorporation for startups and SMEs.</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-start gap-2 text-xs font-medium text-zinc-600">
                      <span className="material-symbols-outlined text-sm text-green-600">check_circle</span>
                      Digital Signature Certificate (DSC) included.
                    </li>
                    <li className="flex items-start gap-2 text-xs font-medium text-zinc-600">
                      <span className="material-symbols-outlined text-sm text-green-600">check_circle</span>
                      MoA &amp; AoA drafting and filing.
                    </li>
                    <li className="flex items-start gap-2 text-xs font-medium text-zinc-600">
                      <span className="material-symbols-outlined text-sm text-green-600">check_circle</span>
                      PAN/TAN application process.
                    </li>
                  </ul>
                  <div className="flex flex-col gap-3">
                    <button className="w-full bg-zinc-900 text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors">Enquire Now</button>
                    <button className="w-full border border-zinc-200 text-zinc-900 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-50 transition-colors">Learn More</button>
                  </div>
                </div>
                {/* Service Card 2 */}
                <div className="group relative bg-white p-8 flex flex-col h-full service-card transition-all duration-300 hover:shadow-xl">
                  <div className="absolute top-0 left-0 h-1 bg-primary-container accent-bar transition-all duration-500 w-0 group-hover:w-full"></div>
                  <span className="material-symbols-outlined text-4xl mb-6 text-black">receipt_long</span>
                  <h3 className="text-xl font-bold mb-3 uppercase tracking-tight text-black">GST Registration</h3>
                  <p className="text-zinc-600 text-sm mb-6 leading-relaxed">Hassle-free Goods and Services Tax identification for all businesses.</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-start gap-2 text-xs font-medium text-zinc-600">
                      <span className="material-symbols-outlined text-sm text-green-600">check_circle</span>
                      Mandatory &amp; Voluntary GST Registration.
                    </li>
                    <li className="flex items-start gap-2 text-xs font-medium text-zinc-600">
                      <span className="material-symbols-outlined text-sm text-green-600">check_circle</span>
                      Composition Scheme Advisory.
                    </li>
                    <li className="flex items-start gap-2 text-xs font-medium text-zinc-600">
                      <span className="material-symbols-outlined text-sm text-green-600">check_circle</span>
                      LUT Application for Exporters.
                    </li>
                  </ul>
                  <div className="flex flex-col gap-3">
                    <button className="w-full bg-zinc-900 text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors">Enquire Now</button>
                    <button className="w-full border border-zinc-200 text-zinc-900 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-50 transition-colors">Learn More</button>
                  </div>
                </div>
                {/* Service Card 3 */}
                <div className="group relative bg-white p-8 flex flex-col h-full service-card transition-all duration-300 hover:shadow-xl">
                  <div className="absolute top-0 left-0 h-1 bg-primary-container accent-bar transition-all duration-500 w-0 group-hover:w-full"></div>
                  <span className="material-symbols-outlined text-4xl mb-6 text-black">branding_watermark</span>
                  <h3 className="text-xl font-bold mb-3 uppercase tracking-tight text-black">Trademark Filing</h3>
                  <p className="text-zinc-600 text-sm mb-6 leading-relaxed">Protect your brand identity with legal IP registration.</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-start gap-2 text-xs font-medium text-zinc-600">
                      <span className="material-symbols-outlined text-sm text-green-600">check_circle</span>
                      Comprehensive TM Search.
                    </li>
                    <li className="flex items-start gap-2 text-xs font-medium text-zinc-600">
                      <span className="material-symbols-outlined text-sm text-green-600">check_circle</span>
                      Classes identification &amp; filing.
                    </li>
                    <li className="flex items-start gap-2 text-xs font-medium text-zinc-600">
                      <span className="material-symbols-outlined text-sm text-green-600">check_circle</span>
                      Response to TM Objections.
                    </li>
                  </ul>
                  <div className="flex flex-col gap-3">
                    <button className="w-full bg-zinc-900 text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors">Enquire Now</button>
                    <button className="w-full border border-zinc-200 text-zinc-900 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-50 transition-colors">Learn More</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* CTA Section (Accent Theme) */}
      <section className="bg-primary-container py-24 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.4),transparent)]"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-on-primary-fixed mb-4">
              Ready to grow your <br />business with confidence?
            </h2>
            <p className="text-on-primary-fixed/80 text-lg max-w-xl font-medium">
              Let's discuss how our strategic consulting can drive your financial success.
            </p>
          </div>
          <button className="bg-black text-primary-container px-12 py-6 font-black uppercase tracking-[0.2em] text-sm hover:translate-x-2 transition-transform duration-300 shadow-xl">
            Contact Us Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 dark:bg-black w-full pt-20 pb-10 border-t border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 max-w-7xl mx-auto">
          <div className="md:col-span-2">
            <div className="text-2xl font-black tracking-tighter text-white mb-6 uppercase">Ramdas Yadav Associates</div>
            <p className="text-zinc-400 font-inter text-sm leading-relaxed max-w-md mb-8">
              Defining the future of professional financial services through unmatched expertise and architectural precision. Trusted by market leaders globally.
            </p>
            <div className="flex gap-4">
              <a className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-white hover:bg-primary-container hover:text-black transition-all" href="#"><span className="material-symbols-outlined text-lg">public</span></a>
              <a className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-white hover:bg-primary-container hover:text-black transition-all" href="#"><span className="material-symbols-outlined text-lg">share</span></a>
              <a className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-white hover:bg-primary-container hover:text-black transition-all" href="#"><span className="material-symbols-outlined text-lg">mail</span></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4" href="/">Home</Link></li>
              <li><Link className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4" href="/#about">About Us</Link></li>
              <li><Link className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4" href="/services">Services</Link></li>
              <li><Link className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4" href="/#process">Process</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Resources</h4>
            <ul className="space-y-4">
              <li><a className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4" href="#">Privacy Policy</a></li>
              <li><a className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4" href="#">Terms of Service</a></li>
              <li><a className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4" href="#">Contact Us</a></li>
              <li><a className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4 text-yellow-400 font-bold" href="#">Client Login</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-20 pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-500 font-inter text-sm">© 2024 Ramdas Yadav Associates. All rights reserved.</p>
          <p className="text-zinc-500 font-inter text-sm">Architectural Authority in Finance</p>
        </div>
      </footer>
    </>
  )
}
