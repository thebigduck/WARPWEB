import React from 'react';
// Assuming ChevronDownIcon and ChevronUpIcon are imported from @/components/icons or defined here
// For simplicity, let's assume they are available globally or imported
// import { ChevronDownIcon, ChevronUpIcon } from '@/components/icons';

interface DocTitleProps {
  id: string;
  children: React.ReactNode;
  onClick?: () => void;
  isExpanded?: boolean;
  className?: string;
}

export const DocMainTitle: React.FC<DocTitleProps> = ({ id, children, onClick, isExpanded, className }) => ( 
    <button onClick={onClick} className={`w-full flex justify-between items-center text-left text-cyber-teal scroll-mt-24 py-2 hover:text-nebula-aqua transition-colors doc-title-button ${className}`}>
        <h1 id={id} className="flex-grow font-['Chypre',_Inter,_sans-serif] text-h1-main font-bold">{children}</h1>
        {onClick && (isExpanded ? <ChevronUpIcon className="w-6 h-6 text-cyber-teal ml-2"/> : <ChevronDownIcon className="w-6 h-6 text-cyber-teal ml-2"/>)}
    </button>
);

export const DocSubTitle: React.FC<DocTitleProps> = ({ id, children, onClick, isExpanded, className }) => ( 
    <button onClick={onClick} className={`w-full flex justify-between items-center text-left text-cyber-teal border-l-4 border-cyber-teal/50 pl-4 scroll-mt-24 py-1 hover:text-nebula-aqua transition-colors doc-title-button ${className}`}>
        <h2 id={id} className="flex-grow font-['Chypre',_Inter,_sans-serif] text-h2-main font-bold">{children}</h2>
        {onClick && (isExpanded ? <ChevronUpIcon className="w-5 h-5 text-cyber-teal ml-2"/> : <ChevronDownIcon className="w-5 h-5 text-cyber-teal ml-2"/>)}
    </button>
);

export const DocSubSubTitle: React.FC<Omit<DocTitleProps, 'onClick' | 'isExpanded'>> = ({ id, children, className }) => ( 
    <h3 id={id} className={`text-h3-main font-medium mb-3 mt-6 text-nebula-aqua scroll-mt-24 ${className} font-['Chypre',_Inter,_sans-serif]`}>
        {children}
    </h3>
);
  
export const DocSubSubSubTitle: React.FC<Omit<DocTitleProps, 'onClick' | 'isExpanded'>> = ({ id, children, className }) => ( 
    <h4 id={id} className={`text-h4-main font-medium mb-2 mt-5 text-starlight-blue scroll-mt-24 ${className} font-['Chypre',_Inter,_sans-serif]`}>
        {children}
    </h4>
);