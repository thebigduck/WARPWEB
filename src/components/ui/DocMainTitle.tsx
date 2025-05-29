import React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '../icons'; // Assuming icons are in ../icons

interface DocMainTitleProps {
  id: string;
  children: React.ReactNode;
  onClick: () => void;
  isExpanded: boolean;
  className?: string;
}

export const DocMainTitle: React.FC<DocMainTitleProps> = ({ id, children, onClick, isExpanded, className = "" }) => (
  <button onClick={onClick} className={`w-full flex justify-between items-center text-left text-2xl sm:text-3xl font-bold mb-6 text-cyber-teal scroll-mt-24 py-2 hover:text-nebula-aqua transition-colors ${className}`}>
    <h1 id={id} className="flex-grow font-['Chypre',_Inter,_sans-serif] font-bold">{children}</h1>
    {isExpanded ? <ChevronUpIcon className="w-6 h-6 text-cyber-teal ml-2"/> : <ChevronDownIcon className="w-6 h-6 text-cyber-teal ml-2"/>}
  </button>
);
