import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-6 md:px-16 flex justify-between items-center">
      {/* Left: Logo */}
      <div className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-full shadow-lg">
        <Sparkles className="w-6 h-6" />
      </div>

      {/* Center: Links & Button */}
      <div className="liquid-glass rounded-full px-2 py-2 flex items-center gap-6">
        <div className="hidden md:flex items-center gap-6 pl-6">
          {['Home', 'Services', 'Work', 'Process', 'Pricing'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        
        {/* Get Started Button */}
        <button className="bg-white text-black text-sm font-medium rounded-full px-5 py-2.5 flex items-center gap-2 hover:bg-white/90 transition-colors ml-2 md:ml-4">
          Get Started
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
      
      {/* Right: Empty to balance the logo width if we want center alignment of the pill, 
          but flex justify-between handles it if we don't have a specific right element. 
          To perfectly center the pill, we need a right placeholder. */}
      <div className="w-12 hidden md:block"></div>
    </nav>
  );
};