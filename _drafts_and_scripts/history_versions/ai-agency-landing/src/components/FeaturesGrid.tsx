import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Palette, BarChart3, Shield } from 'lucide-react';

const cards = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Days, Not Months",
    description: "Concept to launch at a pace that redefines fast."
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: "Obsessively Crafted",
    description: "Every detail considered. Every element refined."
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Built to Convert",
    description: "Layouts informed by data. Decisions backed by performance."
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Secure by Default",
    description: "Enterprise-grade protection comes standard."
  }
];

export const FeaturesGrid = () => {
  return (
    <section id="work" className="py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white mb-6"
        >
          Why Us
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]"
        >
          The difference is everything.
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="liquid-glass rounded-2xl p-6 flex flex-col items-start"
          >
            <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center mb-6">
              {card.icon}
            </div>
            <h3 className="text-lg font-heading italic text-white mb-2">
              {card.title}
            </h3>
            <p className="text-white/60 font-body font-light text-sm">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};