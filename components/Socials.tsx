
import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Twitter, Instagram, Dribbble, ArrowUpRight, Share2, Facebook, Youtube, Video } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const icons: Record<string, any> = {
  Github, Linkedin, Twitter, Instagram, Dribbble, Facebook, Youtube, Video
};

export const Socials: React.FC = () => {
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
    <div ref={domRef} className="w-full relative">
      <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block flex items-center justify-center gap-2">
           <Share2 size={12} /> Digital Presence
        </span>
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">Connect Across Platforms</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {SOCIAL_LINKS.map((link, index) => {
          const Icon = icons[link.icon] || Github;
          
          return (
            <a 
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col justify-between p-8 h-64 rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden transition-all duration-500 hover:border-blue-500/30 hover:bg-blue-900/10 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Background Glow */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px] group-hover:bg-blue-500/20 transition-all duration-500"></div>

              <div className="relative z-10 flex justify-between items-start">
                <div className="p-3 bg-white/5 rounded-2xl text-gray-300 group-hover:text-white group-hover:bg-blue-600 transition-all duration-500">
                  <Icon size={24} />
                </div>
                <div className="p-2 rounded-full border border-white/10 text-gray-500 group-hover:text-white group-hover:border-blue-500/50 transition-colors">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-1">{link.platform}</h3>
                <p className="text-sm text-gray-500 font-mono mb-4">{link.username}</p>
                <div className="text-[10px] uppercase tracking-widest text-blue-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  {link.label}
                </div>
              </div>

              {/* Hover Line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
