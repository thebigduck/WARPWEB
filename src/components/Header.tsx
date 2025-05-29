import React, { useState } from 'react';
import Link from 'next/link'; // For Next.js internal navigation
// Import navigationLinks and handleNavClick if they are managed globally or passed as props
// For simplicity, direct links are used here.

interface NavItem {
  id: string;
  title: string;
  isPageLink?: boolean;
  isPrimaryCta?: boolean;
  href?: string; // For Next.js Link
  scrollToId?: string; // For same-page scroll
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simplified navigation for header based on user request
  const navigationLinks: NavItem[] = [
    { id: 'documentation', title: 'Documentation', isPageLink: true, href: '/documentation' },
    { id: 'cta-header', title: 'Get Plugins', isPrimaryCta: true, href: '/#cta' } // Assuming CTA is on landing page
  ];
  
  // Placeholder for logo path
  const logoPath = '/Warp.jpg'; // Place Warp.jpg in /public directory

  return (
    <header className="bg-deep-space-blue/90 backdrop-blur-md sticky top-0 z-50 shadow-2xl border-b border-shadow-slate/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" legacyBehavior>
            <a className="flex items-center group">
              <img 
                src={logoPath} 
                alt="Site Logo" 
                className="h-10 w-auto group-hover:opacity-90 transition-opacity duration-200 mr-3 rounded-sm shadow-md" 
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display='none';
                  const fallback = target.nextSibling as HTMLElement;
                  if (fallback) fallback.style.display='flex';
                }}
              />
              <span style={{display: 'none'}} className="h-10 w-10 bg-cyber-teal text-deep-space-blue rounded-sm mr-3 items-center justify-center font-bold text-xl">W</span>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-starlight-blue group-hover:text-cyber-teal tracking-tight transition-colors duration-200">
                UE <span className="text-cyber-teal group-hover:text-nebula-aqua transition-colors duration-200">FPS Systems</span>
              </h1>
            </a>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {navigationLinks.map((item) => (
              <Link key={item.id} href={item.href || '#'} passHref legacyBehavior>
                <a
                  className={`px-3 py-2 lg:px-4 rounded-md text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105
                    ${item.isPrimaryCta 
                      ? 'bg-cyber-teal hover:bg-nebula-aqua text-deep-space-blue shadow-md hover:shadow-cyber-teal/40' 
                      : 'text-starlight-blue hover:bg-comet-grey hover:text-nebula-aqua'
                    }`}
                >
                  {item.title}
                </a>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-starlight-blue hover:text-cyber-teal focus:outline-none focus:text-cyber-teal p-2 rounded-md"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-comet-grey/95 backdrop-blur-sm absolute w-full shadow-lg rounded-b-md">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationLinks.map((item) => (
              <Link key={item.id} href={item.href || '#'} passHref legacyBehavior>
                <a
                  className={`block px-3 py-2 rounded-md text-base font-medium
                  ${item.isPrimaryCta 
                    ? 'bg-cyber-teal text-deep-space-blue text-center my-2' 
                    : 'text-starlight-blue hover:bg-shadow-slate hover:text-nebula-aqua'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                >
                  {item.title}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;