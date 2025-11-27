
import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, TrendingUp, Users, Target, X, Globe, ChevronRight, MapPin, Mail, AtSign } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Venture } from '../types';

export const Ventures: React.FC = () => {
  const { ventures } = useContent();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedVenture, setSelectedVenture] = useState<Venture | null>(null);
  const domRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (selectedVenture) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedVenture]);

  return (
    <div ref={domRef} className="w-full relative">
      {/* Section Header */}
      <div className={`mb-16 flex flex-col items-start transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
         <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 flex items-center gap-2">
            <Target size={14} /> Entrepreneurship
         </span>
         <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Built & Owned.</h2>
         <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
            Beyond client work, I build brands, scale SaaS products, and invest in the future of digital commerce.
         </p>
      </div>

      {/* Ventures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {ventures.map((venture, index) => (
            <div 
              key={venture.id}
              onClick={() => setSelectedVenture(venture)}
              className={`group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer border border-white/5 transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 ${
                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
               {/* Background Image */}
               <div className="absolute inset-0 bg-black">
                  <img 
                    src={venture.coverUrl} 
                    alt={venture.name} 
                    loading="lazy"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
               </div>

               {/* Content */}
               <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                     <div className="w-16 h-16 bg-black/40 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-colors duration-500 overflow-hidden">
                        {venture.logoUrl ? (
                            <img 
                              src={venture.logoUrl} 
                              alt="logo" 
                              className="w-full h-full object-contain p-2" 
                            />
                        ) : (
                            <span className="text-xl font-bold font-serif">{venture.name.charAt(0)}</span>
                        )}
                     </div>
                     <span className="px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
                        {venture.status}
                     </span>
                  </div>

                  <div>
                     <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">{venture.name}</h3>
                     <p className="text-gray-300 text-sm line-clamp-2 mb-4 opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-sm">
                        {venture.description}
                     </p>
                     <div className="flex items-center text-blue-400 text-xs font-bold uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        View Entire Status <ChevronRight size={14} />
                     </div>
                  </div>
               </div>
            </div>
         ))}
      </div>

      {/* Full Screen "Entire View" Modal */}
      {selectedVenture && (
         <div className="fixed inset-0 z-[100] bg-[#050505] overflow-y-auto animate-fade-in">
            {/* Close / Nav */}
            <div className="fixed top-0 left-0 w-full z-[101] px-6 py-6 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent pointer-events-none">
               <div className="pointer-events-auto">
                  <h3 className="text-xl font-serif font-bold text-white">{selectedVenture.name}</h3>
               </div>
               <button 
                  onClick={() => setSelectedVenture(null)}
                  className="pointer-events-auto w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
               >
                  <X size={20} />
               </button>
            </div>

            {/* Modal Content */}
            <div className="min-h-screen w-full relative">
               {/* Hero Section */}
               <div className="h-[60vh] w-full relative overflow-hidden">
                  <img 
                    src={selectedVenture.coverUrl} 
                    alt="Cover" 
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-24">
                     <div className="inline-block px-4 py-2 mb-6 border border-blue-500/30 bg-blue-500/10 rounded-full text-blue-400 text-xs font-bold tracking-[0.2em] uppercase animate-fade-in-up">
                        {selectedVenture.role}
                     </div>
                     <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-6 animate-slide-down leading-none drop-shadow-lg">
                        {selectedVenture.name}
                     </h1>
                  </div>
               </div>

               {/* Details */}
               <div className="px-6 md:px-12 lg:px-24 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
                  {/* Left Column: Stats & Contact */}
                  <div className="lg:col-span-4 space-y-8 animate-fade-in delay-200">
                     <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                        <h4 className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-6">Key Metrics</h4>
                        <div className="space-y-6">
                           {selectedVenture.stats.map((stat, i) => (
                              <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                 <span className="text-gray-400">{stat.label}</span>
                                 <span className="text-2xl text-white font-bold font-serif">{stat.value}</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Contact / HQ Card */}
                     {selectedVenture.contact && (
                        <div className="bg-blue-900/10 border border-blue-500/20 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                           
                           <h4 className="text-sm text-blue-400 font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                              <Globe size={14} /> Headquarters
                           </h4>
                           
                           <div className="space-y-4">
                              <div className="flex items-center gap-3 text-gray-300">
                                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                    <Mail size={14} />
                                 </div>
                                 <span className="text-sm">{selectedVenture.contact.email}</span>
                              </div>
                              <div className="flex items-center gap-3 text-gray-300">
                                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                    <MapPin size={14} />
                                 </div>
                                 <span className="text-sm">{selectedVenture.contact.location}</span>
                              </div>
                              <div className="flex items-center gap-3 text-gray-300">
                                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                    <AtSign size={14} />
                                 </div>
                                 <span className="text-sm">{selectedVenture.contact.handle}</span>
                              </div>
                           </div>
                        </div>
                     )}

                     <a 
                        href={selectedVenture.website}
                        target="_blank" 
                        rel="noreferrer"
                        className="group flex items-center justify-center gap-3 w-full py-5 bg-white text-black rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
                     >
                        <span>Visit Live Brand</span>
                        <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </a>
                  </div>

                  {/* Right Column: Story */}
                  <div className="lg:col-span-8 animate-fade-in delay-300">
                     <h3 className="text-3xl text-white font-bold mb-8">The Vision</h3>
                     <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light mb-12">
                        {selectedVenture.longDescription}
                     </p>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 border-l border-blue-500/50 bg-blue-900/5">
                           <TrendingUp className="text-blue-500 mb-4" size={32} />
                           <h4 className="text-white font-bold mb-2">Growth Trajectory</h4>
                           <p className="text-gray-500 text-sm">Consistently outperforming market benchmarks through data-driven iteration and premium design.</p>
                        </div>
                        <div className="p-8 border-l border-purple-500/50 bg-purple-900/5">
                           <Users className="text-purple-500 mb-4" size={32} />
                           <h4 className="text-white font-bold mb-2">User Centric</h4>
                           <p className="text-gray-500 text-sm">Built with the end-user in mind, focusing on accessibility, performance, and aesthetic delight.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};
