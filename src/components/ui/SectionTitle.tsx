import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, className = "" }) => ( 
  <h2 className={`text-3xl sm:text-[2.5rem] font-bold mb-12 text-cyber-teal border-b-2 border-cyber-teal/30 pb-4 text-center ${className}`}>
    {children}
  </h2>
);