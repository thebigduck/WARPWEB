import React from 'react';

interface ChevronUpIconProps {
  className?: string;
}

export const ChevronUpIcon: React.FC<ChevronUpIconProps> = ({ className = "w-5 h-5 text-starlight-blue/70" }) => (
 <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
);
