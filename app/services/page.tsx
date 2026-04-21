"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { SlideUp, FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations';

const servicesData = [
  // REGISTRATION SERVICES
  {
    category: "Registration",
    title: "Private Limited Company Registration",
    description: "Complete company incorporation for startups and growing businesses.",
    icon: "domain",
    points: [
      "Name approval & incorporation",
      "MoA & AoA drafting",
      "PAN, TAN & bank setup support"
    ]
  },
  {
    category: "Registration",
    title: "LLP Registration",
    description: "Ideal structure for professionals and small businesses.",
    icon: "business",
    points: [
      "LLP agreement drafting",
      "MCA registration process",
      "Compliance guidance"
    ]
  },
  {
    category: "Registration",
    title: "Partnership Firm Registration",
    description: "Simple and effective setup for multi-owner businesses.",
    icon: "handshake",
    points: [
      "Partnership deed creation",
      "Registration support",
      "Legal compliance guidance"
    ]
  },
  {
    category: "Registration",
    title: "Proprietorship Registration",
    description: "Quick and easy business setup for individuals.",
    icon: "person",
    points: [
      "Minimal compliance structure",
      "GST & Shop Act linkage",
      "Fast processing"
    ]
  },
  {
    category: "Registration",
    title: "GST Registration",
    description: "Mandatory tax registration for eligible businesses.",
    icon: "receipt_long",
    points: [
      "Application filing",
      "Documentation support",
      "Quick approval assistance"
    ]
  },
  {
    category: "Registration",
    title: "Udyam (MSME) Registration",
    description: "Get government recognition and benefits for your business.",
    icon: "factory",
    points: [
      "Instant certificate",
      "Access to subsidies",
      "MSME benefits"
    ]
  },
  {
    category: "Registration",
    title: "Shop Act (Gumasta) Registration",
    description: "Legal permission to operate business locally.",
    icon: "storefront",
    points: [
      "Online application support",
      "Documentation assistance",
      "Local compliance"
    ]
  },
  {
    category: "Registration",
    title: "Import Export Code (IEC)",
    description: "Required for businesses involved in international trade.",
    icon: "flight_takeoff",
    points: [
      "DGFT registration",
      "Fast approval process",
      "Export/import eligibility"
    ]
  },
  
  // TAX & COMPLIANCE
  {
    category: "Tax",
    title: "GST Return Filing",
    description: "Accurate and timely GST compliance services.",
    icon: "request_quote",
    points: [
      "Monthly/quarterly filing",
      "Error-free submission",
      "Compliance tracking"
    ]
  },
  {
    category: "Tax",
    title: "Income Tax Return Filing",
    description: "Hassle-free income tax filing for individuals and businesses.",
    icon: "account_balance",
    points: [
      "Tax calculation",
      "Filing support",
      "Refund assistance"
    ]
  },
  {
    category: "Tax",
    title: "TDS Filing",
    description: "Ensure proper tax deduction and reporting compliance.",
    icon: "money_off",
    points: [
      "Quarterly filings",
      "Error-free reports",
      "Penalty avoidance"
    ]
  },
  {
    category: "Tax",
    title: "Tax Planning & Advisory",
    description: "Optimize your taxes with expert planning.",
    icon: "savings",
    points: [
      "Legal tax saving strategies",
      "Financial structuring",
      "Long-term planning"
    ]
  },
  {
    category: "Tax",
    title: "Business Compliance Management",
    description: "Stay compliant with all legal and tax requirements.",
    icon: "rule",
    points: [
      "Regular compliance tracking",
      "Filing reminders",
      "End-to-end support"
    ]
  },

  // BUSINESS & CONSULTING
  {
    category: "Business",
    title: "Startup Consultancy",
    description: "End-to-end guidance to launch your business.",
    icon: "rocket_launch",
    points: [
      "Business structure advice",
      "Registration roadmap",
      "Growth strategy"
    ]
  },
  {
    category: "Business",
    title: "Project Report Preparation",
    description: "Professional reports for loans and business planning.",
    icon: "description",
    points: [
      "Bank-ready reports",
      "Financial projections",
      "Business analysis"
    ]
  },
  {
    category: "Business",
    title: "Business Structure Advisory",
    description: "Choose the best structure for your business.",
    icon: "account_tree",
    points: [
      "Proprietorship vs LLP vs Pvt Ltd",
      "Cost & compliance comparison",
      "Expert recommendations"
    ]
  },
  {
    category: "Business",
    title: "Accounting & Bookkeeping",
    description: "Maintain accurate financial records for your business.",
    icon: "book",
    points: [
      "Sales & purchase tracking",
      "Expense management",
      "Financial reporting"
    ]
  },
  {
    category: "Business",
    title: "Import Export Guidance",
    description: "Expert assistance for international business setup.",
    icon: "public",
    points: [
      "Documentation support",
      "Compliance guidance",
      "Trade process understanding"
    ]
  }
];

const categoriesList = [
    { id: "All", label: "All" },
    { id: "Registration", label: "Registration" },
    { id: "Tax", label: "Tax & Compliance" },
    { id: "Business", label: "Business & Consulting" },
];

const categoryHeaders: Record<string, { title: string, subtitle: string }> = {
    "Registration": { title: "Registration \nServices", subtitle: "Secure Your Identity" },
    "Tax": { title: "Tax & \nCompliance", subtitle: "Navigate Complexities" },
    "Business": { title: "Business & \nConsulting", subtitle: "Strategic Growth" }
};

import { useEnquiry } from '@/context/EnquiryContext';

const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export default function Services() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { openEnquiry } = useEnquiry();

  const filteredServices = servicesData.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All" || service.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const categoriesToRender = activeTab === "All" 
    ? ["Registration", "Tax", "Business"].filter(tab => filteredServices.some(s => s.category === tab))
    : [activeTab].filter(tab => filteredServices.some(s => s.category === tab));

  return (
    <>
      <Navbar />

      <main className="pt-0">
        {/* Hero Section */}
        <section className="relative bg-inverse-surface text-on-primary overflow-hidden h-[614px] flex items-center">
          <FadeIn className="absolute inset-0 opacity-20 grayscale scale-110">
            <img className="w-full h-full object-cover" alt="Modern geometric skyscraper facade with sharp angles and dramatic high contrast shadows in monochrome architectural style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgJj6zGL59AVnReik1VwV-z2e-0JJSQOGm00cIGKHGsMC47k13w9QmT8b_kEXdvsbpLGJCe44Xt-q2Rp_r7LCFHNYsTG2KTOR6aww1Aiya15dth69Ek6X5n24Tunr7814Zju1vr3lZkfKzsUD-uE-5JI4sndyHIjorozPKE32MOCRRk79gzIRhT1RGzwwkIj1xiMyrnSi1EEpLlSFblS_zjKs33juDUOcyDXXzUT3Gj5Mf1BWC3C0Oow1B84-Hu7R-CZHnlbDaELgL"/>
          </FadeIn>
          <SlideUp className="max-w-7xl mx-auto px-8 relative z-10 grid grid-cols-12 w-full">
            <div className="col-span-12 md:col-span-8">
              <span className="font-label tracking-[0.3em] text-primary-container uppercase text-sm mb-6 block font-bold text-yellow-500">STRATEGIC GUIDANCE</span>
              <h1 className="font-headline text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8 text-white">
                Our <br/>Services
              </h1>
              <p className="font-body text-xl md:text-2xl text-zinc-300 max-w-2xl mb-10 leading-relaxed">
                Comprehensive financial and compliance solutions for businesses and individuals aiming for absolute market authority.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => openEnquiry()}
                  className="bg-primary-container text-black font-bold uppercase px-10 py-5 tracking-widest text-sm hover:bg-white transition-colors"
                >
                  Get Consultation
                </button>
                <button className="border border-zinc-500 text-white font-bold uppercase px-10 py-5 tracking-widest text-sm hover:bg-zinc-800 transition-colors">
                  Browse Services
                </button>
              </div>
            </div>
          </SlideUp>
        </section>

        {/* Search & Filter Bar */}
        <section className="bg-surface-container-low border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="relative w-full md:w-1/3 flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-zinc-400">search</span>
                <input 
                  className="w-full bg-white border-none py-4 pl-12 pr-4 font-label text-xs tracking-widest focus:ring-0 text-black placeholder:text-zinc-400 focus:outline-none" 
                  placeholder="Search GST, Company Registration..." 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                {categoriesList.map(cat => (
                  <button 
                    key={cat.id} 
                    onClick={() => setActiveTab(cat.id)}
                    className={`px-8 py-3 font-label text-xs tracking-[0.2em] uppercase font-bold transition-colors whitespace-nowrap ${
                      activeTab === cat.id 
                      ? "bg-primary-container text-black" 
                      : "bg-transparent text-zinc-500 hover:text-black"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Content Grid */}
        <div className="bg-surface min-h-[50vh]">
          {filteredServices.length === 0 ? (
            <section className="py-32 max-w-7xl mx-auto px-8 text-center flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-6xl mb-6 text-zinc-300">search_off</span>
              <h3 className="text-2xl font-bold mb-3 uppercase tracking-tight text-black">No services found</h3>
              <p className="text-zinc-500 font-inter max-w-md mx-auto text-sm leading-relaxed mb-8">
                We couldn't find any services matching "{searchQuery}". Try using different keywords or browse our categories.
              </p>
              <button 
                onClick={() => { setSearchQuery(""); setActiveTab("All"); }}
                className="px-8 py-4 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
              >
                Clear Filters
              </button>
            </section>
          ) : (
            categoriesToRender.map((category) => {
              const categoryServices = filteredServices.filter(s => s.category === category);
              if (categoryServices.length === 0) return null;
              
              const headerInfo = categoryHeaders[category];

              return (
                <section key={category} className="py-24 border-b border-zinc-200 border-opacity-60 last:border-b-0">
                  <div className="max-w-7xl mx-auto px-8">
                    <div className="flex items-end justify-between mb-12 border-l-8 border-primary-container pl-6">
                      <h2 className="font-headline text-5xl font-black uppercase tracking-tighter text-black whitespace-pre-line leading-tight">{headerInfo.title}</h2>
                      <span className="font-label text-zinc-400 tracking-[0.5em] text-xs uppercase hidden md:block font-bold">{headerInfo.subtitle}</span>
                    </div>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {categoryServices.map((service, idx) => (
                        <StaggerItem key={idx} className="group relative bg-white p-8 flex flex-col h-full service-card transition-all duration-300 hover:shadow-xl">
                          <div className="absolute top-0 left-0 h-1 bg-primary-container accent-bar transition-all duration-500 w-0 group-hover:w-full"></div>
                          <span className="material-symbols-outlined text-4xl mb-6 text-black">{service.icon}</span>
                          <h3 className="text-xl font-bold mb-3 uppercase tracking-tight text-black">{service.title}</h3>
                          <p className="text-zinc-600 text-sm mb-6 leading-relaxed">{service.description}</p>
                          <ul className="space-y-3 mb-8 flex-grow">
                            {service.points.map((point, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2 text-xs font-medium text-zinc-600">
                                <span className="material-symbols-outlined text-sm text-green-600 shrink-0">check_circle</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-col gap-3 mt-auto">
                            <button 
                              onClick={() => openEnquiry(service.title)}
                              className="w-full bg-zinc-900 text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                            >
                              Enquire Now
                            </button>
                            <Link 
                              href={`/services/${generateSlug(service.title)}`}
                              className="w-full border border-zinc-200 text-zinc-900 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-50 transition-colors text-center block"
                            >
                              Learn More
                            </Link>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </section>
              );
            })
          )}
        </div>
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
          <button 
            onClick={() => openEnquiry()}
            className="bg-black text-primary-container px-12 py-6 font-black uppercase tracking-[0.2em] text-sm hover:translate-x-2 transition-transform duration-300 shadow-xl"
          >
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
  )
}

