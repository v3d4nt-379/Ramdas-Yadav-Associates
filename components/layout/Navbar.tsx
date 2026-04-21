"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useEnquiry } from '@/context/EnquiryContext';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add background/shadow on scroll
      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide/Show on scroll down/up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down, hide
      } else {
        setIsVisible(true); // Scrolling up, show
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${isScrolled ? 'bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-md' : 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-sm'}`}
    >
      <div className="flex justify-between items-center px-8 py-4 max-w-full mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase transition-colors">Ramdas Yadav Associates</span>
        </div>
        <div className="hidden lg:flex items-center space-x-8">
          <Link 
            className={`font-inter tracking-tight font-bold text-sm uppercase transition-all duration-300 border-b-2 pb-1 ${pathname === '/' ? 'text-zinc-900 dark:text-white border-yellow-400' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border-transparent hover:border-yellow-400/50'}`} 
            href="/"
          >
            Home
          </Link>
          <Link 
            className={`font-inter tracking-tight font-bold text-sm uppercase transition-all duration-300 border-b-2 pb-1 ${pathname === '/about' ? 'text-zinc-900 dark:text-white border-yellow-400' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border-transparent hover:border-yellow-400/50'}`} 
            href="/about"
          >
            About Us
          </Link>
          <Link 
            className={`font-inter tracking-tight font-bold text-sm uppercase transition-all duration-300 border-b-2 pb-1 ${pathname === '/services' ? 'text-zinc-900 dark:text-white border-yellow-400' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border-transparent hover:border-yellow-400/50'}`} 
            href="/services"
          >
            Services
          </Link>
          <Link 
            className={`font-inter tracking-tight font-bold text-sm uppercase transition-all duration-300 border-b-2 pb-1 ${pathname === '/process' ? 'text-zinc-900 dark:text-white border-yellow-400' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border-transparent hover:border-yellow-400/50'}`} 
            href="/#process"
          >
            Process
          </Link>
          <Link 
            className={`font-inter tracking-tight font-bold text-sm uppercase transition-all duration-300 border-b-2 pb-1 ${pathname === '/contact' ? 'text-zinc-900 dark:text-white border-yellow-400' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border-transparent hover:border-yellow-400/50'}`} 
            href="/contact"
          >
            Contact Us
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => openEnquiry()} className="bg-primary-container text-on-primary-fixed px-6 py-2 md:px-8 md:py-3 font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-black hover:text-primary-container transition-all duration-300">
            Get Consultation
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-zinc-900 dark:text-white">
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      
      {/* Mobile Menu Drawer */}
      <div className={`fixed top-0 right-0 w-64 h-screen bg-white dark:bg-zinc-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col pt-24 px-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-8 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
           <span className="material-symbols-outlined">close</span>
        </button>
        <div className="flex flex-col space-y-6">
          <Link onClick={() => setIsMobileMenuOpen(false)} className={`font-inter tracking-tight font-bold text-lg uppercase transition-all duration-300 ${pathname === '/' ? 'text-yellow-500' : 'text-zinc-900 dark:text-white'}`} href="/">Home</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} className={`font-inter tracking-tight font-bold text-lg uppercase transition-all duration-300 ${pathname === '/about' ? 'text-yellow-500' : 'text-zinc-900 dark:text-white'}`} href="/about">About Us</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} className={`font-inter tracking-tight font-bold text-lg uppercase transition-all duration-300 ${pathname === '/services' ? 'text-yellow-500' : 'text-zinc-900 dark:text-white'}`} href="/services">Services</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} className={`font-inter tracking-tight font-bold text-lg uppercase transition-all duration-300 ${pathname === '/process' ? 'text-yellow-500' : 'text-zinc-900 dark:text-white'}`} href="/#process">Process</Link>
          <Link onClick={() => setIsMobileMenuOpen(false)} className={`font-inter tracking-tight font-bold text-lg uppercase transition-all duration-300 ${pathname === '/contact' ? 'text-yellow-500' : 'text-zinc-900 dark:text-white'}`} href="/contact">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
}
