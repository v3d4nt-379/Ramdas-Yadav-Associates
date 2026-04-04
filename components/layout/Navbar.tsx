"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
            href="/#about"
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
            href="/#contact"
          >
            Contact Us
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-primary-container text-on-primary-fixed px-8 py-3 font-bold text-sm uppercase tracking-wider hover:bg-black hover:text-primary-container transition-all duration-300">
            Get Consultation
          </button>
          <button className="lg:hidden text-zinc-900">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
