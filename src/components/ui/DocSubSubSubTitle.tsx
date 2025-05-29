import React from 'react';

interface DocSubSubSubTitleProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const DocSubSubSubTitle: React.FC<DocSubSubSubTitleProps> = ({ id, children, className = "" }) => (
  <h4 id={id} className={`text-base sm:text-lg font-medium mb-3 mt-6 text-starlight-blue scroll-mt-24 ${className} font-['Chypre',_Inter,_sans-serif]`}>
    {children}
  </h4>
);
