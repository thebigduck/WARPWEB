import React from 'react';

interface DocSubSubTitleProps {
  title: string;
  onClick: () => void;
  className?: string;
  id: string;
}

const DocSubSubTitle: React.FC<DocSubSubTitleProps> = ({ title, onClick, className = "", id }) => (
  <div id={id} className={`py-2 cursor-pointer ml-8 ${className}`} onClick={onClick}>
    <h3 className="text-lg font-medium text-gray-300">{title}</h3>
  </div>
);

export default DocSubSubTitle;
