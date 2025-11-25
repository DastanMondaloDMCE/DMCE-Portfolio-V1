
import React, { useState, useEffect } from 'react';
import { X, Lock, LayoutDashboard, Briefcase, Users, Layers, Plus, Trash2, Cpu, Save } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { APP_NAME } from '../constants';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'services' | 'testimonials' | 'skills'>('projects');
  
  const { 
    projects, updateProject, addProject, deleteProject,
    services, updateService,
    testimonials, updateTestimonial,
    skills, updateSkill,
    resetToDefaults
  } = useContent();

  // Prevent scrolling when admin is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'dmce') {
      setIsAuthenticated(true);
    } else {
      alert('Access Denied: Invalid Neural Key');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-fade-in">
      
      {/* Container */}
      <div className="w-full max-w-7xl h-[95vh] bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-2xl flex overflow-hidden relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-full transition-colors border border-white/10"
        >
          <X size={20} />
        </button>

        {!isAuthenticated ? (
          // Login Screen
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-grid-pattern">
            <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mb-8 animate-pulse-slow border border-blue-500/20">
              <Lock className="text-blue-500" size={32} />
            </div>
            <h2 className="text-4xl font-serif font-bold text-white mb-2 tracking-tight">{APP_NAME} <span className="text-gray-600">Command</span></h2>
            <p className="text-gray-500 mb-10 text-sm uppercase tracking-widest">Restricted Access // Enter Neural Key</p>
            
            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Keycode..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-center text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder-gray-700 font-mono"
                autoFocus
              />
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2">
                 Authenticate
              </button>
            </form>
          </div>
        ) : (
          // Dashboard
          <>
            {/* Sidebar */}
            <div className="w-72 bg-black/40 border-r border-white/5 flex flex-col p-6 backdrop-blur-md">
              <div className="flex items-center space-x-3 mb-12 px-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/50">
                   <LayoutDashboard size={16} className="text-white" />
                </div>
                <span className="font-bold text-white tracking-wider">ADMIN</span>
              </div>

              <nav className="flex-1 space-y-2">
                {[
                  { id: 'projects', label: 'Projects', icon: Briefcase },
                  { id: 'services', label: 'Services', icon: Layers },
                  { id: 'skills', label: 'Skills', icon: Cpu },
                  { id: 'testimonials', label: 'Reviews', icon: Users },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button 
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center space-x-3 px-4 py-4 rounded-xl transition-all text-sm font-medium ${
                        activeTab === item.id 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="pt-6 border-t border-white/5">
                <button 
                  onClick={resetToDefaults}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-sm"
                >
                  <Trash2 size={18} />
                  <span>Factory Reset</span>
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-10 bg-[#0a0a0a]">
              
              {/* Header */}
              <div className="flex justify-between items-center mb-10">
                <div>
                   <h2 className="text-3xl font-bold text-white capitalize mb-1">{activeTab}</h2>
                   <p className="text-gray-500 text-sm">Manage your portfolio content</p>
                </div>
                
                {activeTab === 'projects' && (
                  <button 
                    onClick={() => addProject({
                      title: "New Project",
                      description: "Description pending...",
                      tags: ["New"],
                      imageUrl: "https://picsum.photos/600/400",
                      link: "#",
                      category: "General",
                      client: "Internal",
                      role: "Developer",
                      year: "2024",
                      challenge: "Draft challenge...",
                      solution: "Draft solution..."
                    })}
                    className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors font-bold text-sm shadow-lg shadow-white/5"
                  >
                    <Plus size={16} />
                    <span>Add Project</span>
                  </button>
                )}
              </div>

              {/* Editors */}
              <div className="space-y-6 pb-20">
                
                {/* PROJECTS EDITOR */}
                {activeTab === 'projects' && projects.map((project) => (
                  <div key={project.id} className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl hover:border-white/20 transition-colors">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs font-mono text-gray-500">#{project.id}</div>
                         <h3 className="font-bold text-white text-lg">{project.title}</h3>
                      </div>
                      <button onClick={() => deleteProject(project.id)} className="text-gray-500 hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-lg">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Title</label>
                          <input 
                            value={project.title}
                            onChange={(e) => updateProject(project.id, { title: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Category & Client</label>
                          <div className="grid grid-cols-2 gap-2">
                            <input 
                                value={project.category || ''}
                                onChange={(e) => updateProject(project.id, { category: e.target.value })}
                                placeholder="Category"
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-colors"
                            />
                            <input 
                                value={project.client || ''}
                                onChange={(e) => updateProject(project.id, { client: e.target.value })}
                                placeholder="Client"
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-colors"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Overview Description</label>
                          <textarea 
                            value={project.description}
                            onChange={(e) => updateProject(project.id, { description: e.target.value })}
                            rows={4}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none resize-none transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Challenge</label>
                          <textarea 
                            value={project.challenge || ''}
                            onChange={(e) => updateProject(project.id, { challenge: e.target.value })}
                            rows={3}
                            placeholder="What was the hard part?"
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none resize-none transition-colors"
                          />
                        </div>
                      </div>
                      <div className="space-y-5">
                         <div className="space-y-2">
                          <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Image URL</label>
                          <input 
                            value={project.imageUrl}
                            onChange={(e) => updateProject(project.id, { imageUrl: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-colors text-xs font-mono"
                          />
                          <div className="h-32 w-full rounded-lg overflow-hidden border border-white/5 mt-2 bg-black/20">
                             <img src={project.imageUrl} alt="Preview" className="w-full h-full object-cover opacity-50" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Tags</label>
                          <input 
                            value={project.tags.join(', ')}
                            onChange={(e) => updateProject(project.id, { tags: e.target.value.split(',').map(s => s.trim()) })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-colors"
                          />
                        </div>
                         <div className="space-y-2">
                          <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Link</label>
                          <input 
                            value={project.link}
                            onChange={(e) => updateProject(project.id, { link: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-colors text-blue-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Solution</label>
                          <textarea 
                            value={project.solution || ''}
                            onChange={(e) => updateProject(project.id, { solution: e.target.value })}
                            rows={3}
                            placeholder="How did you fix it?"
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none resize-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* SERVICES EDITOR */}
                {activeTab === 'services' && services.map((service, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Title</label>
                          <input 
                            value={service.title}
                            onChange={(e) => updateService(idx, { title: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Icon Key (Lucide)</label>
                          <input 
                            value={service.icon}
                            onChange={(e) => updateService(idx, { icon: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Description</label>
                          <textarea 
                            value={service.description}
                            onChange={(e) => updateService(idx, { description: e.target.value })}
                            rows={2}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none resize-none"
                          />
                        </div>
                     </div>
                  </div>
                ))}

                {/* SKILLS EDITOR */}
                {activeTab === 'skills' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skills.map((skill, idx) => (
                      <div key={idx} className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl hover:bg-white/[0.05] transition-colors">
                         <div className="flex justify-between items-center mb-6">
                           <h3 className="font-bold text-white">{skill.subject}</h3>
                           <span className="text-xs font-mono text-blue-500 bg-blue-500/10 px-2 py-1 rounded">{skill.A}%</span>
                         </div>
                         <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Subject Name</label>
                              <input 
                                value={skill.subject}
                                onChange={(e) => updateSkill(idx, { subject: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Proficiency Level</label>
                              <input 
                                type="range"
                                min="0"
                                max="100"
                                value={skill.A}
                                onChange={(e) => updateSkill(idx, { A: parseInt(e.target.value) })}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                              />
                            </div>
                         </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TESTIMONIALS EDITOR */}
                {activeTab === 'testimonials' && testimonials.map((t, idx) => (
                  <div key={idx} className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Name</label>
                          <input 
                            value={t.name}
                            onChange={(e) => updateTestimonial(idx, { name: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Role/Company</label>
                          <input 
                            value={t.role}
                            onChange={(e) => updateTestimonial(idx, { role: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Quote</label>
                          <textarea 
                            value={t.text}
                            onChange={(e) => updateTestimonial(idx, { text: e.target.value })}
                            rows={3}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none resize-none"
                          />
                        </div>
                     </div>
                  </div>
                ))}

              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
