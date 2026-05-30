"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import { useEnquiry } from '@/context/EnquiryContext';
import { SlideUp, FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations';

export default function Home() {
  const { openEnquiry } = useEnquiry();

  const [typedChars, setTypedChars] = useState(0);
  const textLines = [
    "Building",
    "Financial",
    "Confidence for",
    "Your Future "
  ];
  const fullText = textLines.join('\n');

  useEffect(() => {
    const timeout = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current++;
        setTypedChars(prev => prev < fullText.length ? prev + 1 : prev);
        if (current >= fullText.length) {
          clearInterval(interval);
        }
      }, 70); // Adjusted pacing
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(timeout);
  }, [fullText.length]);

  const displayedText = fullText.slice(0, typedChars);
  const displayedLines = displayedText.split('\n');

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="text-white py-24 md:py-32 lg:py-40 overflow-hidden relative bg-[#0a0a0a]">
        {/* Background Image that fades in */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 4.2 }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/InShot_gemini.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(
                90deg,
                rgba(10,10,10,0.85) 0%,
                rgba(10,10,10,0.65) 35%,
                rgba(10,10,10,0.35) 65%,
                rgba(10,10,10,0.15) 100%
              )
            `
          }}
        />

        {/* Mobile gradient fallback to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent lg:hidden z-0 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="z-10 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 mb-6 border-l-4 border-primary-container bg-black/30 backdrop-blur-md font-label text-xs tracking-[0.2em] uppercase text-primary-container shadow-sm"
            >
              Excellence in Advisory
            </motion.div>

            <div className="relative mb-8 w-full">
              {/* Invisible placeholder to prevent layout shift */}
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] opacity-0 flex flex-col pointer-events-none select-none" aria-hidden="true">
                {textLines.map((line, i) => (
                  <span key={`ph-${i}`} className="block pb-2">{line}</span>
                ))}
              </h1>

              {/* Actual typing text */}
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] drop-shadow-xl flex flex-col absolute top-0 left-0 text-white w-full h-full">
                {displayedLines.map((line, i) => (
                  <span key={`line-${i}`} className="block pb-2">
                    {line}
                    {i === displayedLines.length - 1 && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        className="inline-block w-[4px] md:w-[6px] h-[0.9em] bg-primary-container align-baseline ml-2"
                      />
                    )}
                  </span>
                ))}
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3.8, ease: "easeOut" }}
              className="text-lg md:text-xl text-zinc-200 mb-10 max-w-xl leading-relaxed drop-shadow-md"
            >
              We provide expert tax, audit, and consulting services tailored for businesses and individuals aiming for global excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 4.2, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-6 w-full"
            >
              <button
                onClick={() => openEnquiry()}
                className="bg-primary-container text-on-primary-fixed px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300 shadow-xl"
              >
                Get Consultation
              </button>
              <Link href="/services" className="border border-white/20 bg-black/20 backdrop-blur-md text-white px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all text-center shadow-xl">
                Explore Services
              </Link>
            </motion.div>
          </div>
          {/* Spacer to maintain grid and let background image shine on the right side */}
          <div className="hidden lg:block min-h-[450px]"></div>
        </div>
      </section>

      {/* Updated Services Section */}
      <section className="bg-surface py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="font-label text-xs tracking-[0.2em] uppercase text-primary font-bold">Expertise</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-2">Our Services</h2>
          </div>
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Category 1: Registration Services */}
            <StaggerItem className="bg-surface-container-lowest p-10 border-t-4 border-primary shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-4xl text-primary">app_registration</span>
                <h3 className="text-2xl font-bold tracking-tight">Registration Services</h3>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="w-1.5 h-1.5 bg-primary-container"></span> Pancard</li>
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="w-1.5 h-1.5 bg-primary-container"></span> Shop Act Registration</li>
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="w-1.5 h-1.5 bg-primary-container"></span> Udyam Registration</li>
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="w-1.5 h-1.5 bg-primary-container"></span> Food Licenses</li>
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="w-1.5 h-1.5 bg-primary-container"></span> PF / ESIC Registration</li>
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="w-1.5 h-1.5 bg-primary-container"></span> GST Registration</li>
                <li className="text-primary font-bold text-sm tracking-widest mt-2 uppercase">+ more</li>
              </ul>
              <Link className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider group hover:text-primary transition-colors" href="/services">
                View All Services <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </StaggerItem>

            {/* Category 2: Tax Services */}
            <StaggerItem className="bg-surface-container-lowest p-10 border-t-4 border-primary shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-4xl text-primary">payments</span>
                <h3 className="text-2xl font-bold tracking-tight">Tax Services</h3>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="w-1.5 h-1.5 bg-primary-container"></span> Income Tax Returns</li>
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="w-1.5 h-1.5 bg-primary-container"></span> GST Returns</li>
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="w-1.5 h-1.5 bg-primary-container"></span> TDS Returns</li>
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="w-1.5 h-1.5 bg-primary-container"></span> Tax Consultancy</li>
                <li className="text-primary font-bold text-sm tracking-widest mt-2 uppercase">+ more</li>
              </ul>
              <Link className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider group hover:text-primary transition-colors" href="/services">
                View All Services <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </StaggerItem>

            {/* Category 3: Other Services */}
            <StaggerItem className="bg-surface-container-lowest p-10 border-t-4 border-primary shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-4xl text-primary">category</span>
                <h3 className="text-2xl font-bold tracking-tight">Other Services</h3>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="w-1.5 h-1.5 bg-primary-container"></span> Accounting &amp; Bookkeeping</li>
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="w-1.5 h-1.5 bg-primary-container"></span> Audit (Co-op Audit)</li>
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="w-1.5 h-1.5 bg-primary-container"></span> Project Reports</li>
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="w-1.5 h-1.5 bg-primary-container"></span> Startup Registration</li>
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="w-1.5 h-1.5 bg-primary-container"></span> Digital Signature</li>
                <li className="flex items-center gap-3 text-on-surface-variant"><span className="w-1.5 h-1.5 bg-primary-container"></span> Insurance Services</li>
                <li className="text-primary font-bold text-sm tracking-widest mt-2 uppercase">+ more</li>
              </ul>
              <Link className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider group hover:text-primary transition-colors" href="/services">
                View All Services <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="bg-inverse-surface text-inverse-on-surface py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center lg:text-left">
            <StaggerItem>
              <p className="text-5xl md:text-6xl font-black text-primary-container mb-2">500+</p>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Clients Served</p>
            </StaggerItem>
            <StaggerItem>
              <p className="text-5xl md:text-6xl font-black text-primary-container mb-2">10+</p>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Years Experience</p>
            </StaggerItem>
            <StaggerItem>
              <p className="text-5xl md:text-6xl font-black text-primary-container mb-2">1000+</p>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Returns Filed</p>
            </StaggerItem>
            <StaggerItem>
              <p className="text-5xl md:text-6xl font-black text-primary-container mb-2">200+</p>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Businesses Registered</p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>



      {/* About Section (Light Grey Theme) */}
      <section className="bg-surface-container-low py-32 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <FadeIn delay={0.2} className="order-2 lg:order-1 relative">
            <img alt="Team handshake" className="w-full aspect-square object-cover grayscale shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmU9NIYq2hRKDTZRQeFQtYuYM2QQxPOM6dHfRmPEy9aLn6SGee6CkGWurxKS5P3GO07VOqxP0o1k2xG_VZoB4oeDvTzJiLzC3GJOissRR9pPVmO6GX53OeJf5D5n480CK5LWNSkGp_aOqzFn_l5YgtM3VLZMji9LnDQpyNU7O7tvxJUSdSB02OO-j0_F_5lqUVgfYRntAutIf7BKYNbQx0wBzDOu2m6t6Gnvkg8libXwMeyouQjiOZXSABwZE0QtEQ8MxqxomW9h8T" />
            <div className="absolute -bottom-8 -right-8 bg-primary-container p-12 hidden md:block">
              <p className="text-4xl font-black text-on-primary-fixed">25+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-on-primary-fixed">Years of Legacy</p>
            </div>
          </FadeIn>
          <SlideUp className="order-1 lg:order-2">
            <span className="font-label text-xs tracking-[0.2em] uppercase text-primary font-bold">Who We Are</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-2 mb-8 leading-tight">Your Trusted Partner</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
              Ramdas Yadav Associates stands at the intersection of traditional trust and modern financial agility. We don't just process numbers; we build the foundational pillars that allow businesses to thrive in volatile markets. Our approach is deeply rooted in transparency and data-driven strategy.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                <div>
                  <h4 className="font-bold text-base text-on-surface">Experienced Professionals</h4>
                  <p className="text-on-surface-variant text-sm">A multi-disciplinary team of CAs and consultants with global experience.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                <div>
                  <h4 className="font-bold text-base text-on-surface">Client-Centric Approach</h4>
                  <p className="text-on-surface-variant text-sm">Tailored solutions that address specific business pain points and goals.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                <div>
                  <h4 className="font-bold text-base text-on-surface">Proven Track Record</h4>
                  <p className="text-on-surface-variant text-sm">Supporting Fortune 500 companies and growing SMEs for over two decades.</p>
                </div>
              </li>
            </ul>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/about" className="bg-inverse-surface text-inverse-on-surface px-8 py-3.5 font-bold text-xs uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-fixed transition-all duration-300 shadow-sm hover:shadow-md text-center">
                About Us
              </Link>
              <Link href="/services" className="border-2 border-outline px-8 py-3.5 font-bold text-xs uppercase tracking-wider hover:bg-surface-variant hover:border-surface-variant text-on-surface transition-all duration-300 text-center">
                Our Services
              </Link>
            </div>
          </SlideUp>
        </div>

        {/* Portfolio/Team Section */}
        <div className="max-w-7xl mx-auto mt-32">
          <div className="mb-12 text-center">
            <span className="font-label text-xs tracking-[0.2em] uppercase text-primary font-bold">Leadership</span>
            {/* <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-2">Meet Our Partners</h2> */}
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Dummy (Left) */}
            <StaggerItem className="bg-surface-container-lowest p-10 border-t-4 border-primary shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col h-full">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-lg border-4 border-white">
                <img alt="CA Nitin Pawar" className="w-full h-full object-cover object-top transition-transform duration-500 bg-surface-container-high hover:scale-110" src="/nitin_yadav_1.png" />
              </div>
              <h3 className="font-black text-2xl tracking-tight mb-1">CA Nitin Pawar</h3>
              <p className="text-primary text-xs uppercase tracking-widest font-bold mb-3">Designated Partner</p>
              <p className="text-on-surface-variant text-sm font-bold mb-1">M.Com, CA</p>
              <p className="text-on-surface text-sm font-bold">Audit & Assurance Specialist</p>
              <div className="w-12 h-1 bg-primary-container mx-auto my-4"></div>
              <p className="text-on-surface-variant text-sm leading-relaxed">Head of the firm's Audit & Assurance practice. Specializes in Statutory Audits, Bank Branch Audits, and GST/TDS compliance.</p>
            </StaggerItem>

            {/* Card 2: Ramdas Yadav (Middle) */}
            <StaggerItem className="bg-surface-container-lowest p-10 border-t-4 border-primary shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col h-full transform md:-translate-y-4">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-lg border-4 border-white">
                <img alt="Ramdas Yadav" className="w-full h-full object-cover object-top transition-transform duration-500 bg-surface-container-high hover:scale-110" src="/ramdas_yadav_team_512.webp" />
              </div>
              <h3 className="font-black text-2xl tracking-tight mb-1">CA Ramdas Yadav</h3>
              <p className="text-primary text-xs uppercase tracking-widest font-bold mb-3">Founder & Principal</p>
              <p className="text-on-surface-variant text-sm font-bold mb-1">M.Com., CA.Final., G.D.C. & A.</p>
              <p className="text-on-surface text-sm font-bold">+91 8698037909</p>
              <div className="w-12 h-1 bg-primary-container mx-auto my-4"></div>
              <p className="text-on-surface-variant text-sm leading-relaxed">The firm's visionary leader bringing decades of expertise in direct taxes, corporate law, and strategic financial planning.</p>
            </StaggerItem>

            {/* Card 3: Ajinkya Yadav (Right) */}
            <StaggerItem className="bg-surface-container-lowest p-10 border-t-4 border-primary shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col h-full">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-lg border-4 border-white">
                <img alt="Ajinkya Yadav" className="w-full h-full object-cover object-top transition-transform duration-500 bg-surface-container-high hover:scale-110" src="/ajinkya_yadav_team_512.webp" />
              </div>
              <h3 className="font-black text-2xl tracking-tight mb-1">Ajinkya Yadav</h3>
              <p className="text-primary text-xs uppercase tracking-widest font-bold mb-3">Managing Partner</p>
              <p className="text-on-surface-variant text-sm font-bold mb-1">M.Com., G.D.C. & A., Certified Auditor</p>
              <p className="text-on-surface text-sm font-bold">+91 8999356208</p>
              <div className="w-12 h-1 bg-primary-container mx-auto my-4"></div>
              <p className="text-on-surface-variant text-sm leading-relaxed">Driving innovation and excellence. Expert in Taxation and Government Audits with a focus on comprehensive compliance.</p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-surface py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="font-label text-xs tracking-[0.2em] uppercase text-primary font-bold">Methodology</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-2">How We Work</h2>
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Step 1 */}
            <StaggerItem className="relative">
              <div className="text-8xl font-black text-surface-container mb-6 absolute -top-10 -left-4 z-0 opacity-50">01</div>
              <div className="relative z-10">
                <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                  Consultation
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Deep-dive sessions to understand your business objectives and financial landscape.
                </p>
              </div>
            </StaggerItem>
            {/* Step 2 */}
            <StaggerItem className="relative">
              <div className="text-8xl font-black text-surface-container mb-6 absolute -top-10 -left-4 z-0 opacity-50">02</div>
              <div className="relative z-10">
                <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                  Analysis
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Rigorous data analysis and risk assessment to identify key optimization opportunities.
                </p>
              </div>
            </StaggerItem>
            {/* Step 3 */}
            <StaggerItem className="relative">
              <div className="text-8xl font-black text-surface-container mb-6 absolute -top-10 -left-4 z-0 opacity-50">03</div>
              <div className="relative z-10">
                <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                  Strategy
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Formulating a bespoke roadmap combining tax efficiency with growth-focused advisory.
                </p>
              </div>
            </StaggerItem>
            {/* Step 4 */}
            <StaggerItem className="relative">
              <div className="text-8xl font-black text-surface-container mb-6 absolute -top-10 -left-4 z-0 opacity-50">04</div>
              <div className="relative z-10">
                <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                  Execution
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Seamless implementation of strategies with continuous monitoring and reporting.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-surface-container-low py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="font-label text-xs tracking-[0.2em] uppercase text-primary font-bold">Advantages</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-2">Why Choose Us</h2>
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StaggerItem className="bg-surface-container-lowest p-10 border-l-8 border-primary-container shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <span className="material-symbols-outlined text-4xl text-primary mb-6">verified</span>
              <h4 className="text-xl font-bold mb-2">Hassle-free compliance handling</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">We take the complex burden of regulatory compliance off your shoulders so you can focus on growth.</p>
            </StaggerItem>
            <StaggerItem className="bg-surface-container-lowest p-10 border-l-8 border-primary-container shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <span className="material-symbols-outlined text-4xl text-primary mb-6">psychology</span>
              <h4 className="text-xl font-bold mb-2">Expert CA guidance</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Direct access to experienced Chartered Accountants for strategic financial decision-making.</p>
            </StaggerItem>
            <StaggerItem className="bg-surface-container-lowest p-10 border-l-8 border-primary-container shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <span className="material-symbols-outlined text-4xl text-primary mb-6">account_balance_wallet</span>
              <h4 className="text-xl font-bold mb-2">Affordable and transparent pricing</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">No hidden costs. We provide high-end corporate consulting at competitive market rates.</p>
            </StaggerItem>
            <StaggerItem className="bg-surface-container-lowest p-10 border-l-8 border-primary-container shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <span className="material-symbols-outlined text-4xl text-primary mb-6">support_agent</span>
              <h4 className="text-xl font-bold mb-2">End-to-end business support</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">From initial registration to ongoing auditing and tax planning, we are your lifelong growth partner.</p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-surface-container-high py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="font-label text-xs tracking-[0.2em] uppercase text-primary font-bold">Clients</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-2">What Our Clients Say</h2>
          </div>
          <SlideUp className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-lowest p-12 border-t-8 border-primary-container">
              <span className="material-symbols-outlined text-surface-container-highest text-6xl mb-6">format_quote</span>
              <p className="text-xl text-on-surface leading-relaxed mb-8 italic">
                "The strategic tax planning provided by Ramdas Yadav Associates transformed our international operations. Their precision and depth of knowledge are unparalleled in the industry."
              </p>
              <div>
                <p className="font-black text-lg">Jonathan Sterling</p>
                <p className="text-sm uppercase tracking-widest text-on-surface-variant">CFO, Global Logistics Corp</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-12 border-t-8 border-primary-container">
              <span className="material-symbols-outlined text-surface-container-highest text-6xl mb-6">format_quote</span>
              <p className="text-xl text-on-surface leading-relaxed mb-8 italic">
                "A partner you can trust. Their business advisory team helped us navigate a complex merger with absolute ease and strategic foresight."
              </p>
              <div>
                <p className="font-black text-lg">Sarah Chen</p>
                <p className="text-sm uppercase tracking-widest text-on-surface-variant">Managing Director, TechVentures Asia</p>
              </div>
            </div>
          </SlideUp>
        </div>
      </section>

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
