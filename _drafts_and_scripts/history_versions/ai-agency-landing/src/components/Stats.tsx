import React from 'react';
import { motion } from 'framer-motion';
import { HLSVideo } from './HLSVideo';

const stats = [
  { value: "200+", label: "Sites launched" },
  { value: "98%", label: "Client satisfaction" },
  { value: "3.2x", label: "More conversions" },
  { value: "5 days", label: "Average delivery" },
];

export const Stats = () => {
  return (
    <section className="relative w-full py-32 flex items-center justify-center overflow-hidden">
      {/* Background HLS video */}
      <HLSVideo
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
        src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8"
        autoPlay
        loop
        muted
        playsInline
        style={{ filter: 'saturate(0)' }}
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
      <div className="relative z-10 px-6 md:px-16 lg:px-24 w-full max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="liquid-glass rounded-3xl p-12 md:p-16 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center"
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-white/60 font-body font-light text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};