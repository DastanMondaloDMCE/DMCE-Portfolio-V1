
import React from 'react';
import { APP_NAME, SOCIAL_LINKS } from '../constants';
import { Github, Linkedin, Twitter, Instagram, Dribbble } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

const icons: Record<string, any> = {
  Github, Linkedin, Twitter, Instagram, Dribbble
};

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="border-t border-white/5 bg-black py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-xl font-serif font-bold text-white mb-4">{APP_NAME}</h2>
        
        <div className="flex justify-center flex-wrap gap-6 mb-8">
          {SOCIAL_LINKS.map((link) => {
             const Icon = icons[link.icon] || Github;
             return (
               <a 
                 key={link.platform} 
                 href={link.url} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group"
                 aria-label={link.platform}
               >
                 <Icon size={18} className="group-hover:text-blue-500 transition-colors" />
                 <span className="hidden md:inline text-xs uppercase tracking-wider">{link.platform}</span>
               </a>
             );
          })}
        </div>

        <div className="text-sm text-gray-700 flex flex-col items-center gap-2">
          <p>&copy; {new Date().getFullYear()} Alex Sterling. All rights reserved.</p>
          {onOpenAdmin && (
            <button 
              onClick={onOpenAdmin}
              className="text-xs text-gray-800 hover:text-gray-600 transition-colors uppercase tracking-widest mt-4"
            >
              Admin Access
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
