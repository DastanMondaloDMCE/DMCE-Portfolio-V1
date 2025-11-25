import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export const Contact: React.FC = () => {
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
    }, { threshold: 0.2 });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={domRef} 
      className={`max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/10 p-8 md:p-16 overflow-hidden relative transition-all duration-1000 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/10 rounded-full blur-[100px] -mr-16 -mt-16 pointer-events-none animate-pulse-slow"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Create Something<br/>Extraordinary.</h2>
          <p className="text-gray-400 mb-8">
            I am currently open for freelance projects and consulting roles. 
            Drop a line if you want to collaborate on the next big thing.
          </p>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 group">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                <p className="text-white">hello@alexsterling.dev</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 group">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                <p className="text-white">San Francisco, CA</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 group">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                <p className="text-white">+1 (555) 012-3456</p>
              </div>
            </div>
          </div>
        </div>

        <form 
          className={`space-y-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} 
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-gray-500 uppercase">First Name</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-500 uppercase">Last Name</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase">Email</label>
            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all" />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase">Message</label>
            <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all resize-none"></textarea>
          </div>

          <button className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};