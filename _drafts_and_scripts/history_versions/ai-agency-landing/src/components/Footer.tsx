import React from 'react';
import { motion } from 'framer-motion';
import { HLSVideo } from './HLSVideo';

export const Footer = () => {
  return (
    <section id="pricing" className="relative w-full min-h-[800px] flex flex-col justify-end overflow-hidden pt-32">
      {/* Background HLS video */}
      <HLSVideo
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* Top + bottom fade gradients */}
      <div 
        className="absolute top-0 left-0 right-0 h-[200px] z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, black, transparent)' }}
      />
      <div 
        className="absolute bottom-0 left-0 right-0 h-[200px] z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to top, black, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto w-full mb-auto mt-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.9] mb-6"
        >
          Your next website starts here.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg font-body font-light text-white/60 mb-10"
        >
          Book a free strategy call. See what AI‑powered design can do.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <button className="liquid-glass-strong rounded-full px-8 py-4 text-white font-medium hover:bg-white/5 transition-colors">
            Book a Call
          </button>
          <button className="bg-white text-black rounded-full px-8 py-4 font-medium hover:bg-white/90 transition-colors">
            View Pricing
          </button>
        </motion.div>
      </div>

      {/* Footer Links */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 mt-32 pb-8">
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/40 text-xs font-body">
            © 2026 Studio
          </div>
          <div className="flex items-center gap-6 text-white/40 text-xs font-body">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </section>
  );
};