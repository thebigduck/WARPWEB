import React from 'react';

interface DocSubSubSubTitleProps {
  title: string;
  onClick: () => void;
  className?: string;
  id: string;
}

const DocSubSubSubTitle: React.FC<DocSubSubSubTitleProps> = ({ title, onClick, className = "", id }) => (
  <div id={id} className={`py-1 cursor-pointer ml-12 ${className}`} onClick={onClick}>
    <h4 className="text-base font-normal text-gray-400">{title}</h4>
  </div>
);

export default DocSubSubSubTitle;
