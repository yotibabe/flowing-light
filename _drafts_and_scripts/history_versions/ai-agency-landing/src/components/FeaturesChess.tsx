import React from 'react';
import { motion } from 'framer-motion';

export const FeaturesChess = () => {
  return (
    <section id="services" className="py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white mb-6"
        >
          Capabilities
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]"
        >
          Pro features. Zero complexity.
        </motion.h2>
      </div>

      <div className="flex flex-col gap-24">
        {/* Row 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col items-start"
          >
            <h3 className="text-3xl md:text-4xl font-heading italic text-white mb-4 leading-tight">
              Designed to convert. Built to perform.
            </h3>
            <p className="text-white/60 font-body font-light text-base md:text-lg mb-8">
              Every pixel is intentional. Our AI studies what works across thousands of top sites—then builds yours to outperform them all.
            </p>
            <button className="liquid-glass-strong rounded-full px-6 py-3 text-white font-medium hover:bg-white/5 transition-colors">
              Learn more
            </button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="liquid-glass rounded-2xl overflow-hidden aspect-video relative p-1">
              <img 
                src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=futuristic%20abstract%20digital%20dashboard%20with%20glowing%20charts%20and%20glassmorphism&image_size=landscape_16_9" 
                alt="Dashboard UI" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col items-start"
          >
            <h3 className="text-3xl md:text-4xl font-heading italic text-white mb-4 leading-tight">
              It gets smarter. Automatically.
            </h3>
            <p className="text-white/60 font-body font-light text-base md:text-lg mb-8">
              Your site evolves on its own. AI monitors every click, scroll, and conversion—then optimizes in real time. No manual updates. Ever.
            </p>
            <button className="liquid-glass-strong rounded-full px-6 py-3 text-white font-medium hover:bg-white/5 transition-colors">
              See how it works
            </button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="liquid-glass rounded-2xl overflow-hidden aspect-video relative p-1">
              <img 
                src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=abstract%20artificial%20intelligence%20brain%20neural%20network%20dark%20theme&image_size=landscape_16_9" 
                alt="AI Neural Network" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};