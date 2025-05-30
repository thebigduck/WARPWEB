import React from 'react';
import ChevronUpIcon from '@/components/icons/ChevronUpIcon';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon';

interface DocSubTitleProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  onClick: () => void;
  className?: string;
  id: string;
}

const DocSubTitle: React.FC<DocSubTitleProps> = ({ title, isExpanded, onToggle, onClick, className = "", id }) => (
  <div id={id} className={`flex items-center justify-between py-3 cursor-pointer ml-4 ${className}`} onClick={onClick}>
    <h2 className="text-xl font-semibold text-gray-200">{title}</h2>
    <button onClick={(e) => { e.stopPropagation(); onToggle(); }} className="text-gray-400 hover:text-white">
      {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </button>
  </div>
);

export default DocSubTitle;
