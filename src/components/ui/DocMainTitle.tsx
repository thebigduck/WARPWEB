import React from 'react';
import ChevronUpIcon from '@/components/icons/ChevronUpIcon';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon';

interface DocMainTitleProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  onClick: () => void;
  className?: string;
  id: string;
}

const DocMainTitle: React.FC<DocMainTitleProps> = ({ title, isExpanded, onToggle, onClick, className = "", id }) => (
  <div id={id} className={`flex items-center justify-between py-4 cursor-pointer ${className}`} onClick={onClick}>
    <h1 className="text-2xl font-bold text-white">{title}</h1>
    <button onClick={(e) => { e.stopPropagation(); onToggle(); }} className="text-gray-400 hover:text-white">
      {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </button>
  </div>
);

export default DocMainTitle;
