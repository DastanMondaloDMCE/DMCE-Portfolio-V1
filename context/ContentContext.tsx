
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, SkillData, Venture } from '../types';
import { PROJECTS, SERVICES, TESTIMONIALS, SKILLS_DATA, VENTURES } from '../constants';

interface ContentContextType {
  projects: Project[];
  ventures: Venture[];
  services: any[];
  testimonials: any[];
  skills: SkillData[];
  updateProject: (id: number, data: Partial<Project>) => void;
  addProject: (data: Omit<Project, 'id'>) => void;
  deleteProject: (id: number) => void;
  updateService: (index: number, data: any) => void;
  updateTestimonial: (index: number, data: any) => void;
  updateSkill: (index: number, data: Partial<SkillData>) => void;
  resetToDefaults: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Safe local storage wrapper
const safeGetItem = (key: string, fallback: any) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.warn(`LocalStorage access failed for key "${key}". Using fallback.`, error);
    return fallback;
  }
};

const safeSetItem = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`LocalStorage write failed for key "${key}".`, error);
  }
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => safeGetItem('dmce_projects', PROJECTS));
  const [ventures, setVentures] = useState<Venture[]>(() => safeGetItem('dmce_ventures', VENTURES));
  const [services, setServices] = useState<any[]>(() => safeGetItem('dmce_services', SERVICES));
  const [testimonials, setTestimonials] = useState<any[]>(() => safeGetItem('dmce_testimonials', TESTIMONIALS));
  const [skills, setSkills] = useState<SkillData[]>(() => safeGetItem('dmce_skills', SKILLS_DATA));

  useEffect(() => {
    safeSetItem('dmce_projects', projects);
  }, [projects]);

  useEffect(() => {
    safeSetItem('dmce_ventures', ventures);
  }, [ventures]);

  useEffect(() => {
    safeSetItem('dmce_services', services);
  }, [services]);

  useEffect(() => {
    safeSetItem('dmce_testimonials', testimonials);
  }, [testimonials]);
  
  useEffect(() => {
    safeSetItem('dmce_skills', skills);
  }, [skills]);

  const updateProject = (id: number, data: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const addProject = (data: Omit<Project, 'id'>) => {
    const newId = Math.max(...projects.map(p => p.id), 0) + 1;
    setProjects(prev => [...prev, { ...data, id: newId }]);
  };

  const deleteProject = (id: number) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateService = (index: number, data: any) => {
    setServices(prev => prev.map((s, i) => i === index ? { ...s, ...data } : s));
  };

  const updateTestimonial = (index: number, data: any) => {
    setTestimonials(prev => prev.map((t, i) => i === index ? { ...t, ...data } : t));
  };

  const updateSkill = (index: number, data: Partial<SkillData>) => {
    setSkills(prev => prev.map((s, i) => i === index ? { ...s, ...data } : s));
  };

  const resetToDefaults = () => {
    if (window.confirm("Are you sure? This will wipe all your custom edits.")) {
      setProjects(PROJECTS);
      setVentures(VENTURES);
      setServices(SERVICES);
      setTestimonials(TESTIMONIALS);
      setSkills(SKILLS_DATA);
      try {
        localStorage.clear();
        window.location.reload();
      } catch (e) {
        console.error("Failed to clear local storage", e);
      }
    }
  };

  return (
    <ContentContext.Provider value={{
      projects,
      ventures,
      services,
      testimonials,
      skills,
      updateProject,
      addProject,
      deleteProject,
      updateService,
      updateTestimonial,
      updateSkill,
      resetToDefaults
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
