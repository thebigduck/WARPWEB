import React from 'react';

interface DocSubSubTitleProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const DocSubSubTitle: React.FC<DocSubSubTitleProps> = ({ id, children, className = "" }) => (
  <h3 id={id} className={`text-lg sm:text-xl font-medium mb-4 mt-8 text-nebula-aqua scroll-mt-24 ${className} font-['Chypre',_Inter,_sans-serif]`}>
    {children}
  </h3>
);
