"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

const serviceCategories = {
  "Registration Services": [
    "Private Limited Company Registration",
    "LLP Registration",
    "Partnership Firm Registration",
    "Proprietorship Registration",
    "GST Registration",
    "Udyam (MSME) Registration",
    "Shop Act (Gumasta) Registration",
    "Import Export Code (IEC)"
  ],
  "Tax & Compliance": [
    "GST Return Filing",
    "Income Tax Return Filing",
    "TDS Filing",
    "Tax Planning & Advisory",
    "Business Compliance Management"
  ],
  "Business & Consulting": [
    "Startup Consultancy",
    "Project Report Preparation",
    "Business Structure Advisory",
    "Accounting & Bookkeeping",
    "Import Export Guidance"
  ]
};

const allServices = Object.values(serviceCategories).flat();

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Full Name is required.");
    if (!phone.match(/^[0-9]{10}$/)) return setError("Phone must be a valid 10-digit number.");
    if (!service || !allServices.includes(service)) return setError("Please select a valid service from the list.");

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      // Reset form after success
      setTimeout(() => {
        setIsSuccess(false);
        setName("");
        setPhone("");
        setEmail("");
        setService("");
        setSearchQuery("");
        setMessage("");
      }, 5000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCategories = Object.entries(serviceCategories).map(([category, services]) => {
    return {
      category,
      services: services.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    };
  }).filter(c => c.services.length > 0);

  return (
    <>
      <Navbar />

      <main className="pt-0">
        
        {/* HERO SECTION */}
        <section className="relative bg-zinc-950 text-white pt-32 pb-24 px-8 text-center border-b border-zinc-800">
          <div className="max-w-3xl mx-auto">
            <span className="font-label tracking-[0.3em] text-yellow-400 uppercase text-xs mb-6 block font-bold">Reach Out</span>
            <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
              Contact Us
            </h1>
            <p className="font-inter text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Get in touch with our experts for professional guidance and support tailored to your financial goals.
            </p>
          </div>
        </section>

        {/* CONTACT CARDS & FORM CONTAINER */}
        <section className="py-24 bg-surface relative z-10 -mt-10">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* LEFT: Contact Information Cards */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Phone Contacts */}
              <div className="bg-white border border-zinc-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                   <span className="material-symbols-outlined text-yellow-500 text-3xl">support_agent</span>
                   <h3 className="text-xl font-bold uppercase tracking-tight text-zinc-900">Talk to Experts</h3>
                </div>
                
                <div className="space-y-6">
                   <div>
                      <p className="font-black text-black text-lg">CA Mr. Ramdas Yadav</p>
                      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">Founder & Principal</p>
                      <p className="text-sm text-zinc-600 mb-2">M.Com., CA.Final., G.D.C. & A.</p>
                      <a href="tel:+918698037909" className="text-lg font-bold text-zinc-900 hover:text-yellow-600 transition-colors inline-block font-inter">+91 8698037909</a>
                   </div>
                   <div className="h-px bg-zinc-100"></div>
                   <div>
                      <p className="font-black text-black text-lg">Mr. Ajinkya Yadav</p>
                      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">Managing Partner</p>
                      <p className="text-sm text-zinc-600 mb-2">M.Com., G.D.C. & A., Certified Auditor</p>
                      <a href="tel:+918999356208" className="text-lg font-bold text-zinc-900 hover:text-yellow-600 transition-colors inline-block font-inter">+91 8999356208</a>
                   </div>
                </div>
                <div className="mt-8 pt-4 border-t border-zinc-100 flex flex-col gap-3 text-sm">
                   <div className="flex items-center gap-2 font-medium text-green-700">
                     <span className="material-symbols-outlined text-lg border border-green-700 rounded-full p-0.5">schedule</span>
                     <span>Available Mon–Sat, 10 AM – 7 PM</span>
                   </div>
                   <div className="flex items-center gap-2 font-medium text-zinc-700">
                     <span className="material-symbols-outlined text-lg border border-zinc-400 rounded-full p-0.5">mail</span>
                     <a href="mailto:ramdasyadav999@gmail.com" className="hover:text-yellow-600 transition-colors">ramdasyadav999@gmail.com</a>
                   </div>
                </div>
              </div>

              {/* Office Locations */}
              <div className="bg-white border border-zinc-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex items-center gap-3 mb-6">
                   <span className="material-symbols-outlined text-yellow-500 text-3xl">location_on</span>
                   <h3 className="text-xl font-bold uppercase tracking-tight text-zinc-900">Office Locations</h3>
                </div>
                <div className="space-y-6">
                   <div>
                      <p className="font-bold text-black uppercase tracking-widest text-xs mb-1">Head Office</p>
                      <p className="text-zinc-600 text-sm">Satara, Maharashtra</p>
                   </div>
                   <div>
                      <p className="font-bold text-black uppercase tracking-widest text-xs mb-1">Branch Office</p>
                      <p className="text-zinc-600 text-sm">Rahimatpur, Maharashtra</p>
                   </div>
                </div>
              </div>

              {/* Quick Connect (WhatsApp & Email) */}
              <div className="bg-zinc-950 p-8 shadow-xl text-white">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold uppercase tracking-tight">Direct Connect</h3>
                    <span className="material-symbols-outlined text-yellow-400 text-3xl">bolt</span>
                 </div>
                 <div className="space-y-4">
                    <a href="https://wa.me/918698037909" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 border border-zinc-700 hover:bg-zinc-800 text-white font-bold text-sm uppercase tracking-widest py-4 transition-colors">
                       <span className="material-symbols-outlined">chat</span>
                       Chat with us
                    </a>
                    <a href="mailto:ramdasyadav999@gmail.com" className="w-full flex items-center justify-center gap-2 border border-transparent hover:border-zinc-800 text-zinc-400 hover:text-white font-bold text-xs uppercase tracking-widest py-3 transition-colors">
                       <span className="material-symbols-outlined text-sm">mail</span>
                       ramdasyadav999@gmail.com
                    </a>
                 </div>
              </div>

            </div>

            {/* RIGHT: Form */}
            <div className="lg:col-span-7">
               <div className="bg-white border border-zinc-200 p-8 md:p-12 shadow-xl sticky top-24">
                  {isSuccess ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-20 min-h-[500px] animate-in fade-in duration-500">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-green-600 text-4xl">check_circle</span>
                      </div>
                      <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter text-zinc-900">Enquiry Submitted</h3>
                      <p className="text-zinc-500 font-inter max-w-sm mb-8 leading-relaxed">
                        Thank you for reaching out. Our team has received your request and will contact you directly.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter text-zinc-900">Send an Enquiry</h3>
                      <p className="text-sm text-zinc-500 mb-10 font-medium">Fill out the form below and secure your consultation today.</p>
                      
                      {error && (
                        <div className="bg-red-50 text-red-600 p-4 font-inter text-sm mb-6 border-l-4 border-red-600 font-medium">
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Full Name *</label>
                            <input 
                              type="text" 
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full bg-zinc-50/50 border border-zinc-200 px-4 py-3.5 font-inter text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-zinc-400"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Phone Number *</label>
                            <input 
                              type="tel" 
                              required
                              maxLength={10}
                              value={phone}
                              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                              className="w-full bg-zinc-50/50 border border-zinc-200 px-4 py-3.5 font-inter text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-zinc-400"
                              placeholder="9876543210"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Email Address (Optional)</label>
                          <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-zinc-50/50 border border-zinc-200 px-4 py-3.5 font-inter text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-zinc-400"
                            placeholder="john@example.com"
                          />
                        </div>

                        <div className="relative" ref={dropdownRef}>
                          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Service Required *</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              value={searchQuery}
                              onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setService("");
                                setIsDropdownOpen(true);
                              }}
                              onFocus={() => setIsDropdownOpen(true)}
                              className="w-full bg-zinc-50/50 border border-zinc-200 px-4 py-3.5 pr-10 font-inter text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-zinc-400 cursor-text"
                              placeholder="Search or select a service..."
                            />
                            <span 
                              className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer p-1"
                              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                              {isDropdownOpen ? 'expand_less' : 'expand_more'}
                            </span>
                          </div>

                          {isDropdownOpen && (
                            <div className="absolute z-10 w-full mt-2 bg-white border border-zinc-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)] max-h-[300px] overflow-y-auto animate-in fade-in slide-in-from-top-1">
                              {filteredCategories.length > 0 ? (
                                filteredCategories.map((group) => (
                                  <div key={group.category}>
                                    <div className="bg-zinc-100/80 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500 sticky top-0 border-y border-zinc-200 backdrop-blur-sm">
                                      {group.category}
                                    </div>
                                    {group.services.map((srv) => (
                                      <div 
                                        key={srv}
                                        className={`px-4 py-3 text-sm font-inter cursor-pointer transition-colors ${
                                          service === srv || searchQuery === srv ? 'bg-yellow-50 text-black font-semibold' : 'hover:bg-zinc-50 text-zinc-700'
                                        }`}
                                        onClick={() => {
                                          setService(srv);
                                          setSearchQuery(srv);
                                          setIsDropdownOpen(false);
                                        }}
                                      >
                                        {srv}
                                      </div>
                                    ))}
                                  </div>
                                ))
                              ) : (
                                <div className="px-4 py-8 text-sm text-center text-zinc-500 font-medium">
                                  No services matching criteria.
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Message (Optional)</label>
                          <textarea 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                            className="w-full bg-zinc-50/50 border border-zinc-200 px-4 py-3.5 font-inter text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all resize-none placeholder:text-zinc-400"
                            placeholder="Briefly describe your requirements..."
                          ></textarea>
                        </div>

                        <div className="pt-2">
                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`w-full py-5 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                              isSubmitting 
                                ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed' 
                                : 'bg-black text-yellow-400 hover:bg-zinc-900 shadow-xl hover:-translate-y-1'
                            }`}
                          >
                            {isSubmitting ? (
                              <>
                                <span className="w-4 h-4 border-2 border-zinc-500/30 border-t-zinc-500 rounded-full animate-spin"></span>
                                Processing...
                              </>
                            ) : (
                              'Submit Enquiry'
                            )}
                          </button>
                        </div>
                      </form>
                    </>
                  )}
               </div>
            </div>

          </div>
        </section>

        {/* GOOGLE MAP EMBED */}
        <section className="bg-zinc-100 overflow-hidden h-[450px] w-full border-y border-zinc-200">
           <iframe 
              src="https://maps.google.com/maps?q=17.700173,74.006020&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location Map"
              className="grayscale hover:grayscale-0 transition-all duration-700"
            ></iframe>
        </section>

        {/* CTA SECTION */}
        <section className="bg-yellow-400 py-24 px-8 text-center border-b-[16px] border-black">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black mb-8 leading-tight">
              Still have questions? <br /> Talk directly to our expert.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:+918698037909" className="bg-black text-white px-10 py-5 font-bold uppercase tracking-widest text-sm hover:translate-y-[2px] transition-transform shadow-xl flex items-center justify-center gap-3">
                 <span className="material-symbols-outlined text-[18px]">call</span>
                 Call Now
              </a>
              <a href="https://wa.me/918698037909" className="bg-white border-2 border-black text-black px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors shadow-xl flex items-center justify-center gap-3">
                 <span className="material-symbols-outlined text-[18px]">chat</span>
                 WhatsApp
              </a>
            </div>
          </div>
        </section>
        
      </main>

      {/* FOOTER */}
      <footer className="bg-zinc-950 dark:bg-black w-full pt-20 pb-10">
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
