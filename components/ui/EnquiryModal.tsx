"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

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

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService: string;
}

export default function EnquiryModal({ isOpen, onClose, initialService }: EnquiryModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Combobox state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Initialize state when opened
      setService(initialService || "");
      setSearchQuery(initialService || "");
      setIsSuccess(false);
      setError("");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, initialService]);

  // Click outside to close dropdown
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

    // Validation
    if (!name.trim()) return setError("Full Name is required.");
    if (!phone.match(/^[0-9]{10}$/)) return setError("Phone must be a valid 10-digit number.");
    if (!service || !allServices.includes(service)) return setError("Please select a valid service from the list.");

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          email: email.trim() || undefined,
          service,
          message: message.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(errMessage);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 p-safe">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl bg-surface shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] scale-100 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/10 md:bg-black/5 hover:bg-white/20 md:hover:bg-black/10 backdrop-blur-md rounded-full flex items-center justify-center text-white md:text-zinc-600 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Left Side: Trust Elements */}
        <div className="md:w-2/5 relative bg-inverse-surface text-inverse-on-surface p-8 md:p-12 flex flex-col justify-between hidden md:flex">
          <div className="absolute inset-0 opacity-20 grayscale">
            <img className="w-full h-full object-cover" alt="Corporate" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgJj6zGL59AVnReik1VwV-z2e-0JJSQOGm00cIGKHGsMC47k13w9QmT8b_kEXdvsbpLGJCe44Xt-q2Rp_r7LCFHNYsTG2KTOR6aww1Aiya15dth69Ek6X5n24Tunr7814Zju1vr3lZkfKzsUD-uE-5JI4sndyHIjorozPKE32MOCRRk79gzIRhT1RGzwwkIj1xiMyrnSi1EEpLlSFblS_zjKs33juDUOcyDXXzUT3Gj5Mf1BWC3C0Oow1B84-Hu7R-CZHnlbDaELgL" />
          </div>
          <div className="relative z-10">
            <div className="inline-block px-3 py-1 mb-6 border-l-2 border-primary-container bg-white/5 font-label text-[10px] tracking-[0.2em] uppercase text-primary-container">
              Expert Advisory
            </div>
            <h2 className="text-4xl font-black tracking-tight leading-tight mb-6">
              Let's Discuss <br />Your Business <br />Goals.
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Fill out the form and our expert consultants will get in touch with you shortly to provide tailored guidance.
            </p>
          </div>

          <div className="relative z-10 mt-12 space-y-6">
            <div className="flex gap-4 items-center">
              <span className="material-symbols-outlined text-primary-container text-3xl">verified</span>
              <div>
                <p className="font-bold text-sm text-white">Trust & Precision</p>
                <p className="text-xs text-zinc-500">25+ years of legacy</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <span className="material-symbols-outlined text-primary-container text-3xl">security</span>
              <div>
                <p className="font-bold text-sm text-white">Confidentiality Assured</p>
                <p className="text-xs text-zinc-500">100% secure consultation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-3/5 p-6 sm:p-8 md:p-12 overflow-y-auto">
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 min-h-[400px] animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-green-600 text-4xl">check_circle</span>
              </div>
              <h3 className="text-2xl font-black mb-3">Enquiry Submitted</h3>
              <p className="text-zinc-500 font-inter max-w-sm mb-8">
                Your enquiry has been submitted successfully. Our team will contact you soon.
              </p>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight md:hidden">Request Consultation</h3>
              <p className="text-sm text-zinc-500 mb-8 md:hidden">Fill out the form below and our team will get back to you shortly.</p>
              
              <h3 className="text-2xl font-bold mb-8 uppercase tracking-tight hidden md:block">Personal Details</h3>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 font-inter text-sm mb-6 border-l-4 border-red-600">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-600 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-zinc-200 px-4 py-3 font-inter text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-zinc-400"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-600 mb-2">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-surface-container-lowest border border-zinc-200 px-4 py-3 font-inter text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-zinc-400"
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-600 mb-2">Email Address (Optional)</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-zinc-200 px-4 py-3 font-inter text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-zinc-400"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="relative" ref={dropdownRef}>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-600 mb-2">Service Required *</label>
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
                      className="w-full bg-surface-container-lowest border border-zinc-200 px-4 py-3 pr-10 font-inter text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-zinc-400 cursor-text"
                      placeholder="Search or select a service..."
                    />
                    <span 
                      className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer p-1"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      {isDropdownOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-zinc-200 shadow-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                      {filteredCategories.length > 0 ? (
                        filteredCategories.map((group) => (
                          <div key={group.category}>
                            <div className="bg-zinc-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-500 sticky top-0 border-y border-zinc-100">
                              {group.category}
                            </div>
                            {group.services.map((srv) => (
                              <div 
                                key={srv}
                                className={`px-4 py-3 text-sm font-inter cursor-pointer transition-colors ${
                                  service === srv || searchQuery === srv ? 'bg-primary-container/20 text-black font-semibold' : 'hover:bg-zinc-50 text-zinc-700'
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
                        <div className="px-4 py-6 text-sm text-center text-zinc-500">
                          No services found
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-600 mb-2">Message (Optional)</label>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-surface-container-lowest border border-zinc-200 px-4 py-3 font-inter text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none placeholder:text-zinc-400"
                    placeholder="Briefly describe your requirements..."
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full py-4 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                      isSubmitting 
                        ? 'bg-zinc-400 text-white cursor-not-allowed' 
                        : 'bg-black text-white hover:bg-zinc-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                        Submitting...
                      </>
                    ) : (
                      'Submit Enquiry'
                    )}
                  </button>
                  <p className="text-[10px] text-zinc-400 text-center mt-4 uppercase tracking-widest">
                    By submitting, you agree to our privacy policy
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
