import React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '../icons';

interface DocSubTitleProps {
  id: string;
  children: React.ReactNode;
  onClick: () => void;
  isExpanded: boolean;
  className?: string;
}

export const DocSubTitle: React.FC<DocSubTitleProps> = ({ id, children, onClick, isExpanded, className = "" }) => (
  <button onClick={onClick} className={`w-full flex justify-between items-center text-left text-xl sm:text-2xl font-bold mb-4 text-cyber-teal border-l-4 border-cyber-teal/50 pl-4 scroll-mt-24 py-1 hover:text-nebula-aqua transition-colors ${className}`}>
    <h2 id={id} className="flex-grow font-['Chypre',_Inter,_sans-serif] font-bold">{children}</h2>
    {isExpanded ? <ChevronUpIcon className="w-5 h-5 text-cyber-teal ml-2"/> : <ChevronDownIcon className="w-5 h-5 text-cyber-teal ml-2"/>}
  </button>
);
