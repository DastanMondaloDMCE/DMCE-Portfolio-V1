
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { AIChat } from './components/AIChat';
import { Footer } from './components/Footer';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { Socials } from './components/Socials';
import { Ventures } from './components/Ventures'; // Import Ventures
import { ContentProvider } from './context/ContentContext';
import { AdminPanel } from './components/AdminPanel';

const App: React.FC = () => {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <ContentProvider>
      <div className="relative min-h-screen bg-premium-black text-white overflow-x-hidden selection:bg-blue-500/30">
        {/* Background ambient light effects - Optimized for Mobile Performance */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          {/* Reduced blur radius and used standard opacity to prevent GPU compositing failures on mobile */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        </div>

        <Navbar />
        
        <main className="flex flex-col gap-0">
          <section id="home" className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 pt-20">
            <Hero />
          </section>

          <section id="ventures" className="min-h-screen flex items-center py-24 px-6 md:px-12 lg:px-24 bg-white/[0.01]">
             <Ventures />
          </section>

          <section id="about" className="min-h-screen flex items-center py-24 px-6 md:px-12 lg:px-24">
            <About />
          </section>

          <section id="services" className="min-h-screen flex items-center py-24 px-6 md:px-12 lg:px-24 bg-white/[0.02]">
            <Services />
          </section>

          <section id="skills" className="min-h-[80vh] flex items-center py-24 px-6 md:px-12 lg:px-24">
            <Skills />
          </section>

          <section id="projects" className="min-h-screen flex flex-col justify-center py-24 px-6 md:px-12 lg:px-24">
            <Projects />
          </section>

          <section id="testimonials" className="min-h-[80vh] flex items-center py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-transparent to-black/40">
            <Testimonials />
          </section>

          <section id="socials" className="min-h-[60vh] flex items-center justify-center py-24 px-6 md:px-12 lg:px-24 bg-white/[0.01]">
            <Socials />
          </section>

          <section id="contact" className="min-h-[80vh] flex items-center py-24 px-6 md:px-12 lg:px-24">
            <Contact />
          </section>
        </main>

        <Footer onOpenAdmin={() => setAdminOpen(true)} />
        <AIChat />
        <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
      </div>
    </ContentProvider>
  );
};

export default App;
