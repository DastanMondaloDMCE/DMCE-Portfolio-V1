
import React, { useState, useEffect, useRef } from 'react';

export const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={domRef}
      className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="relative group">
        <div className="aspect-[3/4] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-in-out border border-white/10 relative z-10">
          <img 
            src="https://picsum.photos/800/1200" 
            alt="Portrait" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-500"></div>
        </div>
        <div className="absolute -top-4 -left-4 w-full h-full border border-white/5 rounded-2xl -z-10 transition-transform duration-500 group-hover:translate-x-[-8px] group-hover:translate-y-[-8px]"></div>
        
        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-premium-dark border border-white/10 p-6 rounded-xl hidden md:flex flex-col justify-center shadow-2xl z-20 animate-float">
          <span className="text-4xl font-bold text-white mb-1">8+</span>
          <span className="text-sm text-gray-400 uppercase tracking-wider">Years of Experience</span>
        </div>
      </div>

      <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Management & Commerce</h2>
        <div className="space-y-6 text-gray-400 leading-relaxed">
          <p>
            My value proposition extends far beyond the terminal. I operate as a <span className="text-white font-medium">Strategic Middleman</span> and <span className="text-white font-medium">Commercial Manager</span>, connecting the dots between capital, talent, and execution.
          </p>
          <p>
            Whether I am brokering high-value partnerships, managing complex operational workflows, or negotiating commercial deals, my focus is always on the bottom line. I don't just build products; I manage the business engines that power them.
          </p>
          <p>
            Currently, I'm focused on helping founders scale their <span className="text-white font-semibold">Operational Capacity</span> and <span className="text-white font-semibold">Market Reach</span> through effective management and strategic connections.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6">
          {[
            { title: "Management", desc: "Executive Oversight, Team Ops" },
            { title: "Middleman", desc: "Brokerage, Partnerships, Deals" },
            { title: "Commerce", desc: "Revenue Ops, Negotiation, B2B" },
            { title: "Technology", desc: "Full-Stack, AI Architecture" }
          ].map((item, index) => (
             <div key={item.title} className="group cursor-default">
              <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">{item.title}</h3>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
