import React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '../icons';

interface DocMainTitleProps {
  id: string;
  children: React.ReactNode;
  onClick: () => void;
  isExpanded: boolean;
  className?: string;
}

export const DocMainTitle: React.FC<DocMainTitleProps> = ({id, children, onClick, isExpanded, className=""}) => ( 
  <button onClick={onClick} className={`w-full flex justify-between items-center text-left text-2xl sm:text-3xl font-bold mb-6 text-cyber-teal scroll-mt-24 py-2 hover:text-nebula-aqua transition-colors ${className}`}>
      <h1 id={id} className="flex-grow font-['Chypre',_Inter,_sans-serif] font-bold">{children}</h1>
      {isExpanded ? <ChevronUpIcon className="w-6 h-6 text-cyber-teal ml-2"/> : <ChevronDownIcon className="w-6 h-6 text-cyber-teal ml-2"/>}
  </button>
);

interface DocSubTitleProps {
  id: string;
  children: React.ReactNode;
  onClick: () => void;
  isExpanded: boolean;
  className?: string;
}

export const DocSubTitle: React.FC<DocSubTitleProps> = ({id, children, onClick, isExpanded, className=""}) => ( 
  <button onClick={onClick} className={`w-full flex justify-between items-center text-left text-xl sm:text-2xl font-bold mb-4 text-cyber-teal border-l-4 border-cyber-teal/50 pl-4 scroll-mt-24 py-1 hover:text-nebula-aqua transition-colors ${className}`}>
      <h2 id={id} className="flex-grow font-['Chypre',_Inter,_sans-serif] font-bold">{children}</h2>
      {isExpanded ? <ChevronUpIcon className="w-5 h-5 text-cyber-teal ml-2"/> : <ChevronDownIcon className="w-5 h-5 text-cyber-teal ml-2"/>}
  </button>
);

interface DocSubSubTitleProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const DocSubSubTitle: React.FC<DocSubSubTitleProps> = ({id, children, className=""}) => ( 
  <h3 id={id} className={`text-lg sm:text-xl font-medium mb-4 mt-8 text-nebula-aqua scroll-mt-24 ${className} font-['Chypre',_Inter,_sans-serif]`}>
      {children}
  </h3>
);

interface DocSubSubSubTitleProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}
  
export const DocSubSubSubTitle: React.FC<DocSubSubSubTitleProps> = ({id, children, className=""}) => ( 
  <h4 id={id} className={`text-base sm:text-lg font-medium mb-3 mt-6 text-starlight-blue scroll-mt-24 ${className} font-['Chypre',_Inter,_sans-serif]`}>
      {children}
  </h4>
);
