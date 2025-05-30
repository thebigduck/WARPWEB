import { DocumentationPage } from '@/components/DocumentationPage';

// These props are passed by _app.tsx
interface DocumentationProps {
  setCurrentPage: (page: string) => void;
  headerOffset: number;
  // Add other props that _app.tsx might pass and DocumentationPage might need
}

export default function DocsPage(props: DocumentationProps) {
  // DocumentationPage expects setCurrentPage and headerOffset
  // These are passed down from _app.tsx through pageProps
  return <DocumentationPage 
            setCurrentPage={props.setCurrentPage} 
            headerOffset={props.headerOffset} 
         />;
}
