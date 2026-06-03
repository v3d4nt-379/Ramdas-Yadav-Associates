import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import EnquiryButton from "@/components/ui/EnquiryButton";
import { notFound } from "next/navigation";

export const serviceDetails: Record<string, any> = {
  "private-limited-company-registration": {
    title: "Private Limited Company Registration",
    description: "Complete company incorporation solution for startups and growing businesses with end-to-end legal and compliance support.",
    detailedExplanation: "A Private Limited Company is one of the most preferred business structures in India for startups and scalable businesses. It provides limited liability protection, a separate legal identity, and better credibility with investors and financial institutions. Our team ensures a smooth incorporation process—from name approval to post-registration compliance—so you can focus on building your business.",
    included: [
      "Name approval & incorporation process",
      "MoA (Memorandum of Association) & AoA (Articles of Association)",
      "PAN & TAN application filing",
      "Bank account setup assistance"
    ],
    process: [
      "Consultation & Requirement Analysis",
      "Name Reservation via MCA",
      "Document Preparation & Filing",
      "Certificate of Incorporation",
      "PAN, TAN & Account Setup"
    ],
    documents: [
      "PAN & Aadhaar of all directors",
      "Latest utility bill for address proof",
      "Passport size photographs",
      "NOC from property owner for registered office"
    ],
    benefits: [
      "Limited liability protection for shareholders",
      "Separate legal entity status",
      "Easier access to venture funding & investments",
      "Higher credibility among suppliers and clients"
    ]
  },
  "llp-registration": {
    title: "LLP Registration",
    description: "A flexible and low-compliance business structure ideal for professionals and small businesses.",
    detailedExplanation: "LLP combines the benefits of a partnership and a company. It offers limited liability protection to partners while maintaining operational flexibility. It is best suited for professionals, consultants, and small business owners who want a structured yet simple business model.",
    included: [
      "LLP agreement drafting & vetting",
      "MCA registration process handling",
      "DIN & DSC assistance",
      "Post-incorporation compliance guidance"
    ],
    process: [
      "Partner Identification & Documentation",
      "Name Reservation Filing",
      "LLP Incorporation Submission",
      "LLP Agreement Drafting & Finalization"
    ],
    documents: [
      "PAN & Aadhaar of designated partners",
      "Latest residential address proof",
      "Registered office premises proof"
    ],
    benefits: [
      "Limited liability for individual partners",
      "Lower regulatory compliance than Pvt Ltd",
      "Flexible internal management structure",
      "Cost-effective setup and maintenance"
    ]
  },
  "partnership-firm-registration": {
    title: "Partnership Firm Registration",
    description: "A simple and cost-effective business structure for businesses with multiple owners.",
    detailedExplanation: "A Partnership Firm is one of the easiest ways to start a business with two or more people. It involves minimal compliance and allows shared responsibilities among partners. We assist in drafting legally sound agreements and ensuring proper registration for smooth business operations.",
    included: [
      "Partnership deed drafting and notarization",
      "Registration support with Registrar of Firms",
      "Legal and structural compliance guidance"
    ],
    process: [
      "Drafting of Partnership Deed",
      "Mutual Agreement Finalization",
      "Firm Registration with Local Authorities",
      "Business PAN Application"
    ],
    documents: [
      "Identity proofs of all acting partners",
      "Residential address proofs",
      "Business address property documents"
    ],
    benefits: [
      "Extremely easy to establish and operate",
      "Low cost of formation",
      "Shared decision making and risk",
      "Minimal statutory compliance"
    ]
  },
  "proprietorship-registration": {
    title: "Proprietorship Registration",
    description: "The quickest and simplest way to start a business for individuals with minimal compliance.",
    detailedExplanation: "A Proprietorship is ideal for individuals who want full control over their business with minimal legal formalities. Though it does not provide separate legal identity, it is widely used for small businesses and freelancers.",
    included: [
      "GST registration mapping and support",
      "Shop Act (Gumasta) License registration",
      "Initial business setup guidance"
    ],
    process: [
      "Primary Documentation Collection",
      "GST / Shop Act Application Processing",
      "Business Activation & Operations Rollout"
    ],
    documents: [
      "Proprietor's PAN & Aadhaar card",
      "Business address utility bill",
      "Current bank account details"
    ],
    benefits: [
      "Fastest and easiest setup timeline",
      "Absolute control over business decisions",
      "Minimal to zero regulatory compliance overhead",
      "Highly cost-effective maintenance"
    ]
  }
};

export default async function ServiceDetail({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  const service = serviceDetails[slug];

  if (!service) {
    notFound();
  }

  return (
    <>
      <Navbar />
      
      <main className="pt-0">
        
        {/* HERO SECTION */}
        <section className="relative bg-zinc-950 text-white min-h-[500px] flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 grayscale scale-105 pointer-events-none">
             <img className="w-full h-full object-cover" alt="Corporate Architecture Background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmU9NIYq2hRKDTZRQeFQtYuYM2QQxPOM6dHfRmPEy9aLn6SGee6CkGWurxKS5P3GO07VOqxP0o1k2xG_VZoB4oeDvTzJiLzC3GJOissRR9pPVmO6GX53OeJf5D5n480CK5LWNSkGp_aOqzFn_l5YgtM3VLZMji9LnDQpyNU7O7tvxJUSdSB02OO-j0_F_5lqUVgfYRntAutIf7BKYNbQx0wBzDOu2m6t6Gnvkg8libXwMeyouQjiOZXSABwZE0QtEQ8MxqxomW9h8T"/>
          </div>
          <div className="max-w-7xl mx-auto px-8 py-20 relative z-10 w-full flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="lg:w-2/3">
              <Link href="/services" className="inline-flex items-center text-yellow-400 hover:text-white uppercase tracking-widest text-[11px] font-bold mb-8 transition-colors">
                <span className="material-symbols-outlined text-[14px] mr-2">arrow_back</span>
                All Services
              </Link>
              <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.95] mb-6 text-white max-w-4xl">
                {service.title}
              </h1>
              <p className="font-inter text-lg text-zinc-400 max-w-2xl leading-relaxed">
                {service.description}
              </p>
            </div>
            
            {/* CTA Buttons in Hero */}
            <div className="lg:w-1/3 flex flex-col sm:flex-row lg:flex-col gap-4 lg:mb-2">
               <EnquiryButton 
                  serviceTitle={service.title}
                  text="Enquire Now"
                  className="bg-yellow-500 text-black px-8 py-5 font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors w-full text-center shadow-lg hover:shadow-xl"
               />
               <Link 
                  href="/services"
                  className="border border-zinc-700 text-white px-8 py-5 font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors w-full text-center"
               >
                  View All Services
               </Link>
            </div>
          </div>
        </section>

        {/* CONTENT LAYOUT */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
             
             {/* Left Column / Main Information */}
             <div className="lg:col-span-8 space-y-24">
                
                {/* Overview */}
                <div>
                  <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-400 mb-6">Service Overview</h2>
                  <div className="pl-6 md:pl-8 border-l-4 border-yellow-400">
                     <p className="text-2xl md:text-3xl text-zinc-800 font-light leading-[1.6] tracking-tight">
                        {service.detailedExplanation}
                     </p>
                  </div>
                </div>

                {/* Process Timeline */}
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-zinc-900 mb-10">Application Process</h2>
                  <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 before:to-transparent">
                     {service.process.map((step: string, idx: number) => (
                        <div key={idx} className="relative flex items-center md:justify-between flex-row md:odd:flex-row-reverse group select-none">
                           <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-zinc-100 text-zinc-400 font-bold text-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_1px_rgba(0,0,0,0.05)] z-10 transition-colors group-hover:bg-yellow-400 group-hover:text-black">
                              {idx + 1}
                           </div>
                           <div className="ml-6 md:ml-0 md:w-[calc(50%-3rem)] py-6 bg-white transition-transform duration-300 md:group-even:text-right">
                              <p className="text-lg font-bold text-zinc-900 leading-tight">{step}</p>
                              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mt-2 block">Phase {(idx + 1).toString().padStart(2, '0')}</span>
                           </div>
                        </div>
                     ))}
                  </div>
                </div>

                {/* Offerings Box */}
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-zinc-900 mb-8">Scope of Service</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {service.included.map((item: string, idx: number) => (
                        <div key={idx} className="bg-zinc-50 border border-zinc-100 p-6 hover:border-zinc-300 transition-colors flex gap-4 items-start">
                           <span className="material-symbols-outlined text-zinc-300 shrink-0 select-none">segment</span>
                           <h4 className="font-semibold text-zinc-700 leading-snug">{item}</h4>
                        </div>
                     ))}
                  </div>
                </div>

             </div>

             {/* Right Column / Sticky Sidebar (Benefits & Setup) */}
             <div className="lg:col-span-4 relative">
                <div className="sticky top-32 space-y-8">
                   
                   {/* Documents Checklist Container */}
                   <div className="bg-zinc-950 text-white p-8 lg:p-10 shadow-2xl relative overflow-hidden">
                      <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
                         <span className="material-symbols-outlined text-[150px]">inventory_2</span>
                      </div>
                      <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-yellow-400 mb-6">Required Paperwork</h3>
                      <ul className="space-y-2">
                        {service.documents.map((doc: string, idx: number) => (
                          <li key={idx} className="group flex gap-3 items-start border-b border-zinc-800/50 pb-3 p-3 -mx-3 rounded-lg hover:bg-zinc-900 transition-colors duration-300 cursor-default">
                             <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2 shrink-0 group-hover:bg-yellow-400 group-hover:shadow-[0_0_8px_rgba(250,204,21,0.6)] transition-all duration-300"></div>
                             <span className="text-sm font-medium text-zinc-300 leading-relaxed group-hover:text-white transition-colors duration-300">{doc}</span>
                          </li>
                        ))}
                      </ul>
                   </div>

                   {/* Key Advantages Container */}
                   <div className="bg-zinc-50 border border-zinc-200 p-8 lg:p-10">
                      <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-zinc-500 mb-6">Key Advantages</h3>
                      <div className="space-y-6">
                        {service.benefits.map((benefit: string, idx: number) => (
                          <div key={idx} className="flex gap-4">
                             <span className="material-symbols-outlined text-green-600 shrink-0">verified</span>
                             <p className="font-bold text-zinc-800 text-sm leading-relaxed">{benefit}</p>
                          </div>
                        ))}
                      </div>
                   </div>

                </div>
             </div>
             
          </div>
        </section>

        {/* BOTTOM CTA BLOCK */}
        <section className="bg-zinc-100 py-32 px-8 border-t border-zinc-200">
           <div className="max-w-4xl mx-auto text-center space-y-8">
              <span className="material-symbols-outlined text-5xl text-zinc-300 mb-2">handshake</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-900 leading-tight">
                 Ready to secure your business future?
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                 Partner with elite domain experts to ensure compliance, transparency, and unshakeable financial structure.
              </p>
              <div className="pt-4">
                 <EnquiryButton 
                   serviceTitle={service.title}
                   text="Initiate Process"
                   className="bg-black text-white px-12 py-5 font-bold uppercase tracking-[0.2em] text-sm hover:bg-zinc-800 hover:-translate-y-1 transition-all duration-300 shadow-xl"
                 />
              </div>
           </div>
        </section>
        
      </main>

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
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Legal</h4>
            <ul className="space-y-4">
              <li><Link className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4" href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4" href="/terms-of-service">Terms of Service</Link></li>
              <li><Link className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4" href="/refund-policy">Refund & Cancellation Policy</Link></li>
              <li><Link className="text-zinc-400 hover:text-white transition-colors font-inter text-sm hover:underline decoration-yellow-400 underline-offset-4" href="/contact">Contact Us</Link></li>
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
