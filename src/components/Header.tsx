import React from 'react';
import { navigationLinks } from '@/types'; // Assuming navigationLinks will be defined here or passed as props

interface HeaderProps {
  currentPage: string;
  handleNavClick: (item: any) => void; // Adjust 'any' to your nav item type
  scrollToInternalSection: (id: string) => void;
  setCurrentPage: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, handleNavClick, scrollToInternalSection, setCurrentPage }) => {
  // Hardcoding navigationLinks for now as per the original example structure
  const localNavigationLinks = [
    { id: 'documentation', title: 'Documentation', isPageLink: true },
    { id: 'cta-header', title: 'Get Plugins', isPrimaryCta: true, scrollToId: 'cta' } 
  ];
  
  return (
    <header className="bg-deep-space-blue/90 backdrop-blur-md sticky top-0 z-50 shadow-2xl border-b border-shadow-slate/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button 
            onClick={() => { 
              if (currentPage === 'documentation') {
                setCurrentPage('landing'); 
                window.scrollTo(0,0); 
              } else {
                scrollToInternalSection('hero');
              }
            }} 
            className="flex items-center group"
          >
            <img src="/Warp.jpg" alt="Site Logo" className="h-10 w-auto group-hover:opacity-90 transition-opacity duration-200 mr-3 rounded-sm shadow-md" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; ((e.target as HTMLImageElement).nextSibling as HTMLElement).style.display='flex'; }}/>
            <span style={{display: 'none'}} className="h-10 w-10 bg-cyber-teal text-deep-space-blue rounded-sm mr-3 items-center justify-center font-bold text-xl">W</span>
            
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-starlight-blue group-hover:text-cyber-teal tracking-tight transition-colors duration-200">
              UE <span className="text-cyber-teal group-hover:text-nebula-aqua transition-colors duration-200">FPS Systems</span>
            </h1>
          </button>
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {localNavigationLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`px-3 py-2 lg:px-4 rounded-md text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105
                  ${item.isPrimaryCta 
                    ? 'bg-cyber-teal hover:bg-nebula-aqua text-deep-space-blue shadow-md hover:shadow-cyber-teal/40' 
                    : (currentPage === 'documentation' && item.id === 'documentation') 
                      ? 'bg-cyber-teal text-deep-space-blue shadow-md'
                      : 'text-starlight-blue hover:bg-comet-grey hover:text-nebula-aqua'
                  }`}
              >
                {item.title}
              </button>
            ))}
          </nav>
          <div className="md:hidden"> 
            <select
              onChange={(e) => {
                  const selectedId = e.target.value;
                  if (selectedId === 'home-landing') {
                      setCurrentPage('landing');
                      // Ensure scrollToInternalSection is called after page state is set
                      setTimeout(() => scrollToInternalSection('hero'), 0); 
                  } else {
                      const section = localNavigationLinks.find(s => s.id === selectedId || s.scrollToId === selectedId);
                      if (section) handleNavClick(section);
                  }
              }}
              value={currentPage === 'documentation' ? 'documentation' : 'home-landing'}
              className="bg-comet-grey text-starlight-blue p-2 rounded-md text-sm w-full max-w-[180px] border border-shadow-slate focus:ring-cyber-teal focus:border-cyber-teal"
            >
              <option value="home-landing">Home</option>
              <option value="documentation">Documentation</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
