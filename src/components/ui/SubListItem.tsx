import React from 'react';

interface SubListItemProps {
  children: React.ReactNode;
  ordered?: boolean;
  className?: string;
}

const SubListItem: React.FC<SubListItemProps> = ({ children, ordered = false, className = "" }) => ( 
  <li className={`ml-5 mb-1 flex items-start ${className}`}> 
    {!ordered && (
      <svg className="w-4 h-4 text-[#95D5B2] mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"> {/* nebula-aqua */}
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
      </svg>
    )}
    <span className="text-[#D8F3DC]/90 text-sm">{children}</span>  {/* starlight-blue */}
  </li>
);

export default SubListItem;
