import { LandingPage } from '@/components/LandingPage';

// These props are passed by _app.tsx to the page component
interface HomePageProps {
  setCurrentPage: (page: string) => void;
  scrollToInternalSection: (id: string) => void;
  showModal: (title: string, message: string) => void;
  // Add other props that _app.tsx might pass and LandingPage might need
}

export default function HomePage(props: HomePageProps) {
  // LandingPage expects setCurrentPage, scrollToInternalSection, showModal
  // These are passed down from _app.tsx through pageProps
  return <LandingPage 
            setCurrentPage={props.setCurrentPage} 
            scrollToInternalSection={props.scrollToInternalSection} 
            showModal={props.showModal} 
         />;
}
