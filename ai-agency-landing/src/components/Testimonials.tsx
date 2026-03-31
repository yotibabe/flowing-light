import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO Luminary",
    quote: "\"A complete rebuild in five days. I didn't think it was possible, but the results speak for themselves. The AI-driven approach is a game changer.\""
  },
  {
    name: "Marcus Webb",
    role: "Head of Growth Arcline",
    quote: "\"Conversions up 4x since we launched. The continuous optimization feature means we're always improving without lifting a finger.\""
  },
  {
    name: "Elena Voss",
    role: "Brand Director Helix",
    quote: "\"They didn't just design our site, they captured our brand essence perfectly. The liquid glass aesthetic feels premium and completely unique.\""
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white mb-6"
        >
          What They Say
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]"
        >
          Don't take our word for it.
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="liquid-glass rounded-2xl p-8 flex flex-col justify-between"
          >
            <p className="text-white/80 font-body font-light text-sm italic mb-8">
              {testimonial.quote}
            </p>
            <div>
              <div className="text-white font-body font-medium text-sm mb-1">
                {testimonial.name}
              </div>
              <div className="text-white/50 font-body font-light text-xs">
                {testimonial.role}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};