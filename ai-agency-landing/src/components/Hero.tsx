import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { BlurText } from './BlurText';

export const Hero = () => {
  return (
    <section className="relative w-full h-[1000px] overflow-hidden bg-black flex flex-col items-center pt-[150px]">
      {/* Background Video */}
      <video
        className="absolute top-[20%] w-full h-auto object-contain z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero_bg.jpeg"
      />
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-black/5 z-0 pointer-events-none" />
      <div 
        className="absolute bottom-0 left-0 right-0 z-[1] h-[300px] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, black)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="liquid-glass rounded-full px-1 py-1 pr-4 flex items-center gap-3 mb-8"
        >
          <span className="bg-white text-black text-xs font-semibold px-2.5 py-1 rounded-full">New</span>
          <span className="text-sm font-medium text-white/90">Introducing AI‑powered web design.</span>
        </motion.div>

        {/* Heading */}
        <BlurText 
          text="The Website Your Brand Deserves"
          className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] tracking-[-4px] mb-8"
        />

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-lg md:text-xl font-body font-light text-white/60 max-w-2xl mb-12"
        >
          Stunning design. Blazing performance. Built by AI, refined by experts. This is web design, wildly reimagined.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <button className="liquid-glass-strong rounded-full px-8 py-4 flex items-center gap-2 text-white font-medium hover:bg-white/5 transition-colors">
            Get Started
            <ArrowUpRight className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 text-white font-medium hover:text-white/80 transition-colors px-8 py-4">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
              <Play className="w-4 h-4 ml-1" />
            </div>
            Watch the Film
          </button>
        </motion.div>
      </div>

      {/* Partners Bar */}
      <div className="relative z-10 mt-auto pb-16 pt-16 flex flex-col items-center w-full px-6">
        <div className="liquid-glass rounded-full px-4 py-1.5 text-xs font-medium text-white mb-8">
          Trusted by the teams behind
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80">
          {["Stripe", "Vercel", "Linear", "Notion", "Figma"].map((partner) => (
            <span key={partner} className="text-2xl md:text-3xl font-heading italic text-white">
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};