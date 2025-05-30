import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useState, useEffect, useRef } from 'react';

// Import components
import { Header } from '@/components/Header'; 
import { Footer } from '@/components/Footer'; 
import { Modal } from '@/components/ui'; // Corrected import path

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
  }, [currentPage]);

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

  const extendedPageProps = {
    ...pageProps,
    setCurrentPage,
    scrollToInternalSection,
    showModal,
    headerOffset,
    currentPage
  };

  return (
    <div className="bg-deep-space-blue text-starlight-blue min-h-screen font-chypre antialiased selection:bg-cyber-teal selection:text-deep-space-blue">
      <Header 
        currentPage={currentPage} 
        handleNavClick={handleNavClick} 
        scrollToInternalSection={scrollToInternalSection} 
        setCurrentPage={setCurrentPage} 
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <Component {...extendedPageProps} />
      </main>
      <Footer />
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle} message={modalMessage} />
    </div>
  );
}
