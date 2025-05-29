import React from 'react';

interface ListItemProps {
  children: React.ReactNode;
  ordered?: boolean;
  className?: string;
}

export const ListItem: React.FC<ListItemProps> = ({ children, ordered = false, className = "" }) => (
  <li className={`mb-2 flex items-start ${className}`}>
    {!ordered && (
      <svg className="w-5 h-5 text-cyber-teal mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
      </svg>
    )}
    <span className="text-starlight-blue">{children}</span>
  </li>
);

interface SubListItemProps {
  children: React.ReactNode;
  ordered?: boolean;
  className?: string;
}

export const SubListItem: React.FC<SubListItemProps> = ({ children, ordered = false, className = "" }) => (
  <li className={`ml-5 mb-1 flex items-start ${className}`}> 
     {!ordered && (
      <svg className="w-4 h-4 text-nebula-aqua mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
      </svg>
    )}
    <span className="text-starlight-blue/90 text-sm">{children}</span> 
  </li>
);