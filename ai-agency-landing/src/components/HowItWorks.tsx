import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { HLSVideo } from './HLSVideo';

export const HowItWorks = () => {
  return (
    <section id="process" className="relative w-full min-h-[700px] py-32 px-6 md:px-16 lg:px-24 flex items-center justify-center overflow-hidden">
      {/* Background HLS video */}
      <HLSVideo
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
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
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto min-h-[500px] justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white mb-6"
        >
          How It Works
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-6"
        >
          You dream it. We ship it.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-lg font-body font-light text-white/60 max-w-2xl mb-10"
        >
          Share your vision. Our AI handles the rest—wireframes, design, code, launch. All in days, not quarters.
        </motion.p>

        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="liquid-glass-strong rounded-full px-8 py-4 flex items-center gap-2 text-white font-medium hover:bg-white/5 transition-colors"
        >
          Get Started
          <ArrowUpRight className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
};