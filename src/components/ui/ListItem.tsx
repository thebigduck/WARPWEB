import React from 'react';

interface ListItemProps {
  children: React.ReactNode;
  ordered?: boolean;
  className?: string;
}

const ListItem: React.FC<ListItemProps> = ({ children, ordered = false, className = "" }) => (
  <li className={`mb-2 flex items-start ${className}`}>
    {!ordered && (
      <svg className="w-5 h-5 text-[#74C69D] mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"> {/* cyber-teal */}
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
      </svg>
    )}
    <span className="text-[#D8F3DC]">{children}</span> {/* starlight-blue */}
  </li>
);

export default ListItem;
