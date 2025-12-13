import React from 'react';

interface Props {
  title: string;
  subtitle: string;
  dark?: boolean;
}

const SectionHeader: React.FC<Props> = ({ title, subtitle, dark = false }) => {
  return (
    <div className="text-center mb-16 max-w-2xl mx-auto px-4">
      <span className={`text-xs font-bold uppercase tracking-[0.2em] mb-4 block ${dark ? 'text-primary' : 'text-primary'}`}>
        {subtitle}
      </span>
      <h2 className={`font-serif text-4xl md:text-5xl font-medium mb-6 ${dark ? 'text-white' : 'text-dark'}`}>
        {title}
      </h2>
      <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
    </div>
  );
};

export default SectionHeader;