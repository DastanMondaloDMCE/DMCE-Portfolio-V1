
import React, { useState, useEffect, useRef } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const Testimonials: React.FC = () => {
  const { testimonials } = useContent();
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
        const scrollAmount = 400;
        const currentScroll = scrollContainerRef.current.scrollLeft;
        scrollContainerRef.current.scrollTo({
            left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
            behavior: 'smooth'
        });
    }
  };

  return (
    <div ref={domRef} className="w-full max-w-[100vw] overflow-hidden">
      <div className={`flex flex-col md:flex-row justify-between items-end mb-12 px-6 md:px-12 lg:px-24 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div>
           <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4 block">Testimonials</span>
           <h2 className="text-4xl md:text-6xl font-bold font-serif">Client Voices</h2>
        </div>
        
        <div className="flex items-center gap-4 mt-6 md:mt-0">
            <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <ChevronRight size={20} />
            </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 pb-12 px-6 md:px-12 lg:px-24 no-scrollbar snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {testimonials.map((item, index) => (
          <div 
            key={index} 
            className={`min-w-[300px] md:min-w-[450px] snap-center relative group bg-[#0e0e0e] p-10 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            
            <div className="flex justify-between items-start mb-8">
                <Quote className="text-blue-500/50 w-8 h-8" />
                <div className="flex gap-1 text-yellow-500">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                </div>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8 relative z-10 italic">
              "{item.text}"
            </p>
            
            <div className="flex items-center gap-4 border-t border-white/5 pt-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 flex items-center justify-center text-sm font-bold text-white font-serif border border-white/10">
                {item.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">{item.name}</h4>
                <p className="text-blue-400 text-xs uppercase tracking-wide font-bold">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Spacer for end of scroll */}
        <div className="min-w-[20px]"></div>
      </div>
      
      <div className={`px-6 md:px-12 lg:px-24 border-t border-white/5 pt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-center text-gray-600 text-sm uppercase tracking-widest mb-10">Trusted by innovative teams at</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <span className="text-xl md:text-2xl font-bold font-serif text-white">Acme Corp</span>
            <span className="text-xl md:text-2xl font-bold font-sans text-white tracking-tighter">GlobalTech</span>
            <span className="text-xl md:text-2xl font-bold font-mono text-white">Nebula.ai</span>
            <span className="text-xl md:text-2xl font-bold font-serif italic text-white">Vanguard</span>
        </div>
      </div>
    </div>
  );
};
