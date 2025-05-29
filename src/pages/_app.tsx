import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useState, useEffect, useRef } from 'react';

// Import components
import { Header } from '@/components/Header'; // Assuming Header is a named export
import { Footer } from '@/components/Footer'; // Assuming Footer is a named export
import { Modal } from '@/components/ui/Modal'; // Assuming Modal is a named export

// Define NavItem type if not already globally available via types.ts (matching Header.tsx usage)
interface NavItem {
  id: string;
  title: string;
  isPageLink?: boolean;
  isPrimaryCta?: boolean;
  scrollToId?: string;
}

const LANDING_PAGE_INTERNAL_SECTIONS = [
  'hero', 'key-benefits', 'features', 'testimonials', 'synergistic-systems', 'faq', 'cta'
];

export default function MyApp({ Component, pageProps }: AppProps) {
  const [currentPage, setCurrentPage] = useState('landing');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const headerOffset = 80; 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const showModal = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (currentPage === 'landing') {
      LANDING_PAGE_INTERNAL_SECTIONS.forEach(id => {
        sectionRefs.current[id] = document.getElementById(id);
      });
    }
  }, [currentPage]); // Added LANDING_PAGE_INTERNAL_SECTIONS

  const handleNavClick = (navItem: NavItem) => {
    if (navItem.isPageLink && navItem.id === 'documentation') {
      setCurrentPage('documentation');
      if (typeof window !== 'undefined') window.scrollTo(0, 0);
    } else if (navItem.scrollToId) {
        if (currentPage !== 'landing') {
            setCurrentPage('landing');
            setTimeout(() => {
                scrollToInternalSection(navItem.scrollToId as string);
            }, 100); 
        } else {
            scrollToInternalSection(navItem.scrollToId as string);
        }
    }
  };

  const scrollToInternalSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element && typeof window !== 'undefined') {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const globalStyles = `
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Chypre', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      background-color: #0A192F; /* deep-space-blue */
      color: #A8B2D1; /* starlight-blue */
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    ::-webkit-scrollbar { width: 10px; height: 10px; }
    ::-webkit-scrollbar-track { background: #071323; /* shadow-slate */ }
    ::-webkit-scrollbar-thumb { background: #64FFDA; /* cyber-teal */ border-radius: 10px; border: 2px solid #071323; }
    ::-webkit-scrollbar-thumb:hover { background: #7DF9FF; /* nebula-aqua */ }
    
    section[id] { scroll-margin-top: ${headerOffset}px; } 
    .documentation-page-content section[id], 
    .documentation-page-content h1[id], 
    .documentation-page-content h2[id], 
    .documentation-page-content h3[id], 
    .documentation-page-content h4[id] { 
        scroll-margin-top: ${headerOffset + 20}px;
    }
    .doc-article ol {
        list-style-type: decimal;
        padding-left: 1.5rem; 
    }
    .doc-article ul { 
        list-style-type: disc;
        padding-left: 1.5rem;
    }
    .doc-article ul.list-none, .doc-article ol.list-none { 
        list-style-type: none;
        padding-left: 0;
    }
    .doc-article ol > li::marker { 
        color: #64FFDA; 
        font-weight: 500;
    }
    .doc-article ul > li, .doc-article ol > li {
        margin-bottom: 0.65rem;
    }
    .doc-article ul ul > li, .doc-article ol ol > li {
        margin-bottom: 0.4rem;
    }
    .doc-article table ul {
        list-style-type: none; 
        padding-left: 0;
    }
      .doc-article table ul li {
        padding-left: 0; 
    }
    .doc-article table ul ul {
          padding-left: 1rem; 
    }
    .doc-article table .ListItem > svg, .doc-article table .SubListItem > svg {
        margin-top: 0.125rem; 
    }
    .doc-article table .ListItem > span, .doc-article table .SubListItem > span {
        display: inline; 
    }
      .doc-article table code { 
        white-space: normal; 
    }
  `;

  return (
    <div className="bg-deep-space-blue text-starlight-blue min-h-screen font-chypre antialiased selection:bg-cyber-teal selection:text-deep-space-blue">
      <style jsx global>{globalStyles}</style>
      <Header 
        currentPage={currentPage} 
        handleNavClick={handleNavClick} 
        scrollToInternalSection={scrollToInternalSection} 
        setCurrentPage={setCurrentPage} 
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Component {...pageProps} 
          setCurrentPage={setCurrentPage} 
          scrollToInternalSection={scrollToInternalSection} 
          showModal={showModal}
        />
      </main>
      <Footer />
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle} message={modalMessage} />
    </div>
  );
}
