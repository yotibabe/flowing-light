import React from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const BlurText: React.FC<BlurTextProps> = ({ text, className = '', delay = 0 }) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
        duration: 0.35,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)',
    },
  };

  return (
    <motion.h1
      className={`flex flex-wrap justify-center ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};