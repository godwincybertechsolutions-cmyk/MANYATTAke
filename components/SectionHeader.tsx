import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  subtitle: string;
  dark?: boolean;
}

const SectionHeader: React.FC<Props> = ({ title, subtitle, dark = false }) => {
  return (
    <motion.div 
      className="text-center mb-16 max-w-2xl mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <motion.span 
        className={`text-xs font-bold uppercase tracking-[0.2em] mb-4 block ${dark ? 'text-primary' : 'text-primary'}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {subtitle}
      </motion.span>
      <motion.h2 
        className={`font-serif text-4xl md:text-5xl font-medium mb-6 ${dark ? 'text-white' : 'text-dark'}`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {title}
      </motion.h2>
      <motion.div 
        className="w-24 h-1 bg-primary mx-auto rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: 96 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
    </motion.div>
  );
};

export default SectionHeader;