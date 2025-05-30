import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className = "" }) => (
  <div className={`py-8 ${className}`}>
    <h2 className="text-3xl font-bold text-center text-white mb-2">{title}</h2>
    {subtitle && <p className="text-lg text-center text-gray-400">{subtitle}</p>}
  </div>
);

export default SectionTitle;
