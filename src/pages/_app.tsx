import React, { useState, useEffect, useRef, useMemo } from 'react'; // Added useMemo
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { Header } from '@/components/Header'; // Changed to named import
import Footer from '@/components/Footer';
import Modal from '@/components/ui/Modal';
import LandingPage from '@/components/LandingPage';
import DocumentationPage from '@/components/DocumentationPage';
import '@/styles/globals.css';

const theme = createTheme({
  // palette: {
  //   mode: 'dark', 
  //   primary: { main: '#74C69D' }, 
  //   background: { default: '#081C15' }, 
  // },
  // typography: {
  //   fontFamily: ['Chypre', 'Inter', 'Roboto', 'sans-serif'].join(','),
  // },
});

const NotFoundPage: React.FC = () => <div>Page not found</div>;
NotFoundPage.displayName = 'NotFoundPage';

// Removed Component, pageProps from MyAppProps as they are not used in this SPA-like setup
export default function MyApp({}: Omit<AppProps, 'Component' | 'pageProps'>) { 
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

  // Moved landingPageInternalSections inside useEffect or use useMemo
  const landingPageInternalSections = useMemo(() => [
    'hero', 'key-benefits', 'features', 'testimonials', 'synergistic-systems', 'faq', 'cta'
  ], []);

  const navigationLinks = useMemo(() => [
    { id: 'documentation', title: 'Documentation', isPageLink: true },
    { id: 'cta-header', title: 'Get Plugins', isPrimaryCta: true, scrollToId: 'cta' }
  ], []);

  useEffect(() => {
    if (currentPage === 'landing') {
      landingPageInternalSections.forEach(id => {
        const element = document.getElementById(id);
        if (element) sectionRefs.current[id] = element;
      });
    }
  }, [currentPage, landingPageInternalSections]);

  const handleNavClick = (navItem: { id: string; isPageLink?: boolean; scrollToId?: string }) => {
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

  const commonPageProps = {
    setCurrentPage,
    showModal,
  };

  const landingPageProps = {
    ...commonPageProps,
    scrollToInternalSection,
  };

  const docPageProps = {
    ...commonPageProps,
    headerOffset,
  };
  
  const headerProps = {
      ...commonPageProps,
      scrollToInternalSection,
      navigationLinks,
      handleNavClick,
      currentPage,
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>UE FPS Systems</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      
      <style jsx global>{`
        section[id] { scroll-margin-top: ${headerOffset}px !important; }
        .documentation-page-content section[id], 
        .documentation-page-content h1[id], 
        .documentation-page-content h2[id], 
        .documentation-page-content h3[id], 
        .documentation-page-content h4[id] { 
            scroll-margin-top: ${headerOffset + 20}px !important;
        }
      `}</style>

      <div className="bg-[#081C15] text-[#D8F3DC] min-h-screen font-chypre antialiased selection:bg-[#74C69D] selection:text-[#081C15]">
        <Header {...headerProps} />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8">
          { currentPage === 'landing' && <LandingPage {...landingPageProps} /> }
          { currentPage === 'documentation' && <DocumentationPage {...docPageProps} /> }
          { currentPage !== 'landing' && currentPage !== 'documentation' && <NotFoundPage /> }
        </main>
        <Footer />
        <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle} message={modalMessage} />
      </div>
    </ThemeProvider>
  );
}
