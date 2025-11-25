
import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Github, X, ArrowRight, Filter, Maximize2, ArrowUpRight, ChevronRight, BookOpen } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Project } from '../types';

export const Projects: React.FC = () => {
  const { projects } = useContent();
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  
  const domRef = useRef<HTMLDivElement>(null);

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category || "General")))];

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
    if (activeCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => (p.category || "General") === activeCategory));
    }
  }, [activeCategory, projects]);

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [activeProject]);

  return (
    <div ref={domRef} className="relative w-full">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Header */}
      <div className={`mb-20 flex flex-col lg:flex-row justify-between items-end transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-8 lg:mb-0">
          <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Selected Works</span>
          <h2 className="text-6xl md:text-8xl font-serif font-bold text-white leading-none tracking-tight">
            Explore <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-gray-200 to-gray-500">Innovation.</span>
          </h2>
        </div>
        
        {/* Modern Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, idx) => (
             <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                activeCategory === cat 
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                  : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        {filteredProjects.length > 0 ? (
          <>
            {filteredProjects.map((project, index) => {
              // Create an asymmetrical layout
              const isLarge = index % 3 === 0;
              const colSpan = isLarge ? "lg:col-span-8" : "lg:col-span-4";
              const heightClass = isLarge ? "h-[60vh]" : "h-[40vh] lg:h-[60vh]";
              
              return (
                <div 
                  key={project.id} 
                  onClick={() => setActiveProject(project)}
                  className={`group relative ${colSpan} ${heightClass} rounded-[2rem] overflow-hidden cursor-pointer border border-white/5 transition-all duration-700 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-900/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent z-10 transition-colors duration-500"></div>
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] grayscale group-hover:grayscale-0" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 p-8 md:p-10 z-20 w-full">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-2 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded border border-white/10">
                            {project.category}
                          </span>
                        </div>
                        
                        <h3 className={`font-serif text-white mb-2 leading-none group-hover:translate-x-2 transition-transform duration-500 ${isLarge ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
                          {project.title}
                        </h3>
                        
                        {isLarge && (
                          <p className="text-gray-400 text-sm max-w-md mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                            {project.description}
                          </p>
                        )}
                      </div>

                      <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transform translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="col-span-12 flex flex-col items-center justify-center py-32 border border-dashed border-white/10 rounded-[2rem] bg-white/[0.02]">
            <Filter className="w-12 h-12 text-gray-700 mb-4" />
            <p className="text-gray-500 font-serif text-lg">No masterpieces found in this category.</p>
          </div>
        )}
      </div>

      {/* Popup Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-12">
           {/* Backdrop */}
           <div 
             className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fade-in"
             onClick={() => setActiveProject(null)}
           ></div>

           {/* Popup Content */}
           <div className="relative w-full max-w-7xl h-full max-h-[90vh] bg-[#0a0a0a] rounded-[2rem] border border-white/10 shadow-2xl flex flex-col lg:flex-row overflow-hidden animate-fade-in-up">
              
              {/* Close Button */}
              <button 
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 z-50 p-3 bg-black/50 backdrop-blur-md rounded-full text-white border border-white/10 hover:bg-white hover:text-black transition-all duration-300 group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform" />
              </button>

              {/* Left Side: Visual */}
              <div className="w-full lg:w-5/12 h-64 lg:h-full relative shrink-0">
                 <img 
                    src={activeProject.imageUrl} 
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0a0a0a]"></div>
                 
                 <div className="absolute bottom-6 left-6 right-6 lg:bottom-12 lg:left-12 lg:right-12">
                    <span className="inline-block px-3 py-1 mb-4 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {activeProject.category}
                    </span>
                    <h2 className="text-3xl lg:text-5xl font-serif font-bold text-white mb-2 leading-none">{activeProject.title}</h2>
                    <p className="text-gray-400 text-sm font-mono">{activeProject.year || '2024'} // {activeProject.client || 'Client Name'}</p>
                 </div>
              </div>

              {/* Right Side: Details */}
              <div className="w-full lg:w-7/12 h-full overflow-y-auto bg-[#0a0a0a] p-6 lg:p-12 no-scrollbar flex flex-col">
                 
                 {/* Intro */}
                 <div className="mb-10 border-b border-white/10 pb-8">
                     <p className="text-xl text-gray-300 font-light leading-relaxed">
                        {activeProject.description}
                     </p>
                 </div>

                 {/* Details Grid */}
                 <div className="grid grid-cols-2 gap-8 mb-10">
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Role</h4>
                        <p className="text-white text-lg font-serif">{activeProject.role || "Lead Engineer"}</p>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Stack</h4>
                        <div className="flex flex-wrap gap-2">
                             {activeProject.tags.map(t => (
                                 <span key={t} className="text-xs text-blue-400 border border-blue-500/20 px-2 py-1 rounded bg-blue-500/5">{t}</span>
                             ))}
                        </div>
                    </div>
                 </div>

                 {/* Case Study */}
                 <div className="space-y-8 mb-12 flex-grow">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                            The Challenge
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-sm lg:text-base pl-3 border-l border-white/5">
                            {activeProject.challenge || "Creating a seamless user experience while managing complex data structures and ensuring high performance across all devices."}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                             <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                            The Solution
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-sm lg:text-base pl-3 border-l border-white/5">
                            {activeProject.solution || "Leveraging modern frameworks and optimized rendering engines to deliver a fluid, responsive interface that exceeds client expectations."}
                        </p>
                    </div>
                 </div>

                 {/* Action Bar */}
                 <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10 mt-auto">
                     {activeProject.link && activeProject.link !== "#" && (
                        <a 
                            href={activeProject.link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 group"
                        >
                            <span>Live Demo</span>
                            <ArrowUpRight size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                     )}
                     <button className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl font-bold border border-white/10 transition-all">
                        <Github size={18} />
                        <span>Source Code</span>
                     </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
