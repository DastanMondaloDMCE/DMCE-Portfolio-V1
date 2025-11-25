
import React, { useState, useEffect, useRef } from 'react';
import { Code, Palette, Bot, Zap, ArrowUpRight, Layers, Cpu, Globe, ArrowRight, Briefcase, Handshake, TrendingUp } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const icons: Record<string, any> = {
  Code, Palette, Bot, Zap, Layers, Cpu, Globe, Briefcase, Handshake, TrendingUp
};

export const Services: React.FC = () => {
  const { services } = useContent();
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle Sticky Scroll Logic
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!targetRef.current) return;
      
      const { top, height } = targetRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Distance from top of viewport to top of container
      // We want to start scrolling when top reaches 0
      const scrollDistance = -top;
      const maxScroll = height - viewportHeight;
      
      // Calculate 0 to 1 progress
      let progress = scrollDistance / maxScroll;
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Render Mobile Vertical Layout
  if (isMobile) {
    return (
      <div className="w-full py-12">
        <div className="mb-12 text-center">
          <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4 block">Capabilities</span>
          <h2 className="text-4xl font-bold font-serif mb-4">Engineered for Growth</h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {services.map((service, index) => {
            const Icon = icons[service.icon] || Code;
            return (
              <div key={index} className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl">
                <Icon size={32} className="text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Render Desktop Sticky Horizontal Layout
  return (
    // height needs to be large enough to allow for the horizontal scroll duration
    // 300vh means you scroll 3 screen heights to get through the horizontal content
    <div ref={targetRef} className="relative h-[300vh]"> 
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-[#050505]">
        
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Horizontal Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-12 pl-24 pr-[50vw] will-change-transform"
          style={{ transform: `translateX(-${scrollProgress * 75}%)` }} // Adjust percentage based on number of items
        >
          {/* Intro Card */}
          <div className="min-w-[500px] flex flex-col justify-center z-10">
            <span className="text-blue-500 font-bold tracking-[0.2em] uppercase text-xs mb-6 flex items-center gap-2">
               <span className="w-8 h-[1px] bg-blue-500"></span>
               Our Capabilities
            </span>
            <h2 className="text-8xl font-serif font-bold text-white leading-[0.9] mb-8">
              Engineered <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">For Growth.</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-md leading-relaxed mb-8">
              We don't just build websites; we architect business solutions. Experience the synergy of commercial strategy and engineering precision.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-500" style={{ width: `${scrollProgress * 100}%` }}></div>
              </div>
              Scroll to Explore
            </div>
          </div>

          {/* Service Cards */}
          {services.map((service, index) => {
            const Icon = icons[service.icon] || Code;
            return (
              <div 
                key={index}
                className="group relative min-w-[400px] h-[500px] bg-white/[0.03] border border-white/5 p-10 rounded-[2.5rem] backdrop-blur-sm flex flex-col justify-between hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500"
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform duration-500">
                     <Icon size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 leading-tight">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 mt-6">
                   <span className="text-xs font-mono text-gray-500">0{index + 1}</span>
                   <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-blue-500 transition-colors">
                      <ArrowUpRight size={18} />
                   </button>
                </div>
              </div>
            );
          })}

          {/* Process / CTA Card at end */}
          <div className="min-w-[400px] h-[500px] flex flex-col justify-center items-start pl-12 border-l border-white/10">
             <h3 className="text-4xl font-serif font-bold text-white mb-6">Ready to Scale?</h3>
             <p className="text-gray-400 mb-8 max-w-xs">Let's translate your business goals into digital reality.</p>
             <a href="#contact" className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors">
                Book Strategy Call <ArrowRight size={18} />
             </a>
          </div>

        </div>
      </div>
    </div>
  );
};
