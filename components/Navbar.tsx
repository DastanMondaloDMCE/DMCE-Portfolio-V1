import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { APP_NAME, NAV_ITEMS } from '../constants';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-xl border-white/10 py-4 shadow-lg shadow-black/50' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo - changed to safe interaction to prevent refresh loops */}
        <a href="#home" className="text-2xl md:text-3xl font-bold font-serif tracking-tighter text-white hover:text-gray-300 transition-colors relative group z-50">
          {APP_NAME}
          <span className="absolute -right-2 top-0 text-blue-500 text-xs animate-pulse">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-10">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-xs font-bold text-gray-400 hover:text-white transition-colors duration-300 uppercase tracking-[0.2em] relative group py-2"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white hover:text-blue-400 transition-colors z-50 relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto clip-path-open' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="flex flex-col space-y-8 text-center relative z-10">
          {NAV_ITEMS.map((item, idx) => (
            <a 
              key={item.label} 
              href={item.href}
              className={`text-4xl font-serif font-medium text-white/80 hover:text-white transition-all duration-500 transform ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="absolute bottom-12 text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} DMCE.
        </div>
      </div>
    </nav>
  );
};