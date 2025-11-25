import React, { useState, useEffect, useRef } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';
import { useContent } from '../context/ContentContext';

export const Skills: React.FC = () => {
  const { skills } = useContent();
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
    }, { threshold: 0.1 });
    
    if (domRef.current) observer.observe(domRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={domRef} className="w-full max-w-6xl mx-auto">
      <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Proficiency</span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-white">Technical Landscape</h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          A quantitative breakdown of my engineering capabilities and architectural command.
        </p>
      </div>

      <div 
        className={`h-[400px] md:h-[550px] w-full bg-gradient-to-b from-white/[0.03] to-transparent rounded-3xl border border-white/5 p-4 relative backdrop-blur-sm transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* We use isVisible to conditionally render the chart to ensure the container has size before Recharts mounts */}
        {isVisible && (
          <div className="w-full h-full animate-fade-in">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skills}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600, dy: 4 }} 
                />
                <Radar
                  name="Skill Level"
                  dataKey="A"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="#3b82f6"
                  fillOpacity={0.2}
                  isAnimationActive={true}
                  animationDuration={1500}
                />
                <Tooltip 
                  cursor={false}
                  contentStyle={{ 
                    backgroundColor: 'rgba(5,5,5,0.9)', 
                    borderColor: 'rgba(255,255,255,0.1)', 
                    borderRadius: '12px', 
                    color: '#fff',
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' 
                  }}
                  itemStyle={{ color: '#60a5fa' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}
        
        <div className="absolute bottom-6 right-6 flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest border border-white/5 px-3 py-1 rounded-full bg-black/40">
           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
           Live Data Visualization
        </div>
      </div>

      <div className="mt-16 flex flex-wrap gap-4 justify-center">
        {skills.map((skill, index) => (
          <div 
            key={skill.subject}
            className={`group relative overflow-hidden px-6 py-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all duration-500 cursor-default ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${400 + (index * 50)}ms` }}
          >
            <div className="flex items-center gap-3 relative z-10">
               <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{skill.subject}</span>
               <span className="text-blue-500 text-xs font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">{skill.A}%</span>
            </div>
            
            {/* Hover Fill Effect */}
            <div 
               className="absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-700 ease-out group-hover:w-full"
               style={{ width: `${skill.A}%`, opacity: 0.5 }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};