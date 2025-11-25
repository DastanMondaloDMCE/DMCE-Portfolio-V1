import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, MousePointer2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Trigger animation slightly after mount to ensure DOM is ready
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Helper for staggered animations
  const getDelayClass = (delay: number) => {
    return isMounted 
      ? `opacity-100 translate-y-0 transition-all duration-1000 ease-out delay-[${delay}ms]` 
      : 'opacity-0 translate-y-10';
  };

  return (
    <div className="flex flex-col items-start justify-center max-w-6xl relative z-10">
      {/* Availability Badge */}
      <div 
        className={`mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-900/10 backdrop-blur-md text-blue-300 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-1000 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        Available for 2024 Commissions
      </div>
      
      {/* Main Heading */}
      <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-bold font-serif leading-[0.85] mb-10 tracking-tighter mix-blend-difference">
        <span 
          className={`block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400 transition-all duration-1000 ease-out delay-100 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          DMCE
        </span>
        <span 
          className={`block text-4xl md:text-6xl lg:text-7xl mt-4 text-white font-sans font-light tracking-tight transition-all duration-1000 ease-out delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          Digital Masterpiece
        </span>
        <span 
          className={`block text-4xl md:text-6xl lg:text-7xl text-gray-500 font-sans font-light tracking-tight ml-2 md:ml-24 transition-all duration-1000 ease-out delay-300 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          Creative Engineering.
        </span>
      </h1>

      {/* Description */}
      <div 
        className={`flex flex-col md:flex-row gap-12 items-start transition-all duration-1000 ease-out delay-500 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed border-l border-blue-500/50 pl-6">
          Defining the intersection of <span className="text-white font-medium">aesthetic excellence</span> and <span className="text-white font-medium">engineering precision</span>. 
          We are a premier digital studio delivering high-performance web applications, 
          AI-integrated systems, and award-winning spatial interfaces.
        </p>
      </div>

      {/* CTA Buttons */}
      <div 
        className={`flex flex-col sm:flex-row gap-6 mt-16 transition-all duration-1000 ease-out delay-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <a 
          href="#projects" 
          className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold text-sm rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
        >
          <span className="relative z-10 flex items-center">
            Explore Portfolio <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
          <div className="absolute inset-0 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
        </a>
        
        <a 
          href="#contact" 
          className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-sm rounded-full hover:bg-white/5 transition-colors hover:border-white/40"
        >
          <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity -ml-6 group-hover:ml-0 duration-300">
            <MousePointer2 size={14} />
          </span>
          Initiate Contact
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute -bottom-32 left-0 w-full flex flex-col items-center transition-all duration-1000 delay-[1200ms] ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-[10px] uppercase tracking-widest text-gray-600 mb-2">Scroll</span>
        <a href="#about" className="text-white hover:text-blue-400 transition-colors animate-bounce p-2 border border-white/10 rounded-full">
          <ChevronDown size={20} />
        </a>
      </div>
    </div>
  );
};