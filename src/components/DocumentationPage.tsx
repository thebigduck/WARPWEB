import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  DocMainTitle,
  DocSubTitle,
  DocSubSubTitle,
  DocSubSubSubTitle
} from '@/components/ui';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon'; // For the back button

// Import existing documentation content components
import ArmorSystemDoc from '@/components/documentation/ArmorSystemDoc';
import DamageSystemDoc from '@/components/documentation/DamageSystemDoc';
import DeveloperIntegrationGuide from '@/components/documentation/DeveloperIntegrationGuide';
import LimbHealthSystemDoc from '@/components/documentation/LimbHealthSystemDoc';
import ProjectileSystemDoc from '@/components/documentation/ProjectileSystemDoc';

interface DocumentationPageProps {
  setCurrentPage: (page: string) => void;
  headerOffset: number;
}

interface DocSection {
  id: string;
  title: string;
  level: 1 | 2 | 3 | 4;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: React.ComponentType<any>; // Changed from ComponentType<{}> to ComponentType<any>
  content?: React.ReactNode;
  subSections?: DocSection[];
}

// Base props for Title Components used in navigation
interface NavTitleProps {
  id: string;
  title: string;
  onClick: () => void;
  className: string;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const DOC_SECTIONS_DATA: DocSection[] = [
  {
    id: 'dev-guide',
    title: 'Developer Integration Guide',
    level: 1,
    component: DeveloperIntegrationGuide, // This component might expect props not provided here yet
    subSections: [
      { id: 'dev-guide-setup', title: 'Initial Setup', level: 2, content: 'Content for initial setup...' },
      { id: 'dev-guide-config', title: 'Configuration', level: 2, content: 'Content for configuration...' },
    ]
  },
  {
    id: 'damage-system',
    title: 'Damage System',
    level: 1,
    component: DamageSystemDoc, // This component might expect props
    subSections: [
      { id: 'ds-overview', title: 'Overview', level: 2, content: 'Overview of the damage system...' },
      { id: 'ds-api', title: 'API Reference', level: 2, content: 'API details...' },
    ]
  },
  {
    id: 'armor-system',
    title: 'Armor System',
    level: 1,
    component: ArmorSystemDoc, // This component might expect props
  },
  {
    id: 'limb-health-system',
    title: 'Limb Health System',
    level: 1,
    component: LimbHealthSystemDoc, // This component might expect props
  },
  {
    id: 'projectile-system',
    title: 'Projectile System',
    level: 1,
    component: ProjectileSystemDoc, // This component might expect props
  },
];

export const DocumentationPage: React.FC<DocumentationPageProps> = ({ setCurrentPage, headerOffset }) => {
  const [activeDocSection, setActiveDocSection] = useState<string | null>(DOC_SECTIONS_DATA[0]?.id || null);
  const [expandedDocSections, setExpandedDocSections] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    DOC_SECTIONS_DATA.forEach(section => {
      if (section.level === 1) initialState[section.id] = true;
    });
    return initialState;
  });

  const docSectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const docContentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const registerRef = useCallback((id: string) => (el: HTMLElement | null) => {
    docSectionRefs.current[id] = el;
  }, []);

  const scrollToDocSection = useCallback((id: string) => {
    const element = docSectionRefs.current[id];
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset - 20;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }, [headerOffset]);

  const toggleDocSectionExpansion = (id: string) => {
    setExpandedDocSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentActiveId = entry.target.id;
          setActiveDocSection(currentActiveId);
          const navLink = navRef.current?.querySelector(`[data-navid="${currentActiveId}"]`);
          if (navLink) {
            navLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: `-${headerOffset + 19}px 0px -75% 0px`,
      threshold: 0.01,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const currentRefs = Object.values(docSectionRefs.current).filter(el => el !== null) as HTMLElement[];
    currentRefs.forEach(sectionEl => observer.observe(sectionEl));

    return () => {
      currentRefs.forEach(sectionEl => observer.unobserve(sectionEl));
    };
  }, [headerOffset, registerRef]);

  const renderDocNavRecursive = (sections: DocSection[], currentLevel: number = 1): React.ReactNode => {
    return sections.map((section) => {
      const isActive = activeDocSection === section.id;
      const isExpanded = expandedDocSections[section.id] || false;
      const hasSubSections = section.subSections && section.subSections.length > 0;

      let TitleComponent: React.ComponentType<NavTitleProps>;
      let titleProps: NavTitleProps = {
        id: `nav-${section.id}`,
        title: section.title,
        onClick: () => scrollToDocSection(section.id),
        className: `${isActive ? 'text-cyber-teal' : 'text-starlight-blue hover:text-nebula-aqua'} ${currentLevel > 1 ? `ml-${(currentLevel) * 2}` : ''} transition-colors duration-200 pr-2 cursor-pointer`,
      };

      switch (section.level) {
        case 1:
          TitleComponent = DocMainTitle as React.ComponentType<NavTitleProps>;
          if (hasSubSections) titleProps = { ...titleProps, isExpanded, onToggle: () => toggleDocSectionExpansion(section.id) };
          break;
        case 2:
          TitleComponent = DocSubTitle as React.ComponentType<NavTitleProps>;
          if (hasSubSections) titleProps = { ...titleProps, isExpanded, onToggle: () => toggleDocSectionExpansion(section.id) };
          break;
        case 3:
          TitleComponent = DocSubSubTitle as React.ComponentType<NavTitleProps>;
          break;
        case 4:
        default:
          TitleComponent = DocSubSubSubTitle as React.ComponentType<NavTitleProps>;
          break;
      }

      return (
        <div key={section.id} data-navid={section.id}>
          <TitleComponent {...titleProps} />
          {hasSubSections && isExpanded && (
            <div className={`ml-4 border-l border-comet-grey/50`}>
              {renderDocNavRecursive(section.subSections!, section.level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  const renderDocContentRecursive = (sections: DocSection[]): React.ReactNode => {
    return sections.map(section => (
      <React.Fragment key={section.id}>
        <section id={section.id} ref={registerRef(section.id)} className="mb-12 scroll-mt-24 min-h-[100px]">
          {/* The `component` prop on DocSection is now ComponentType<any>.
              If these components (ArmorSystemDoc, etc.) expect specific props like expandedSections
              or toggleExpansion, they are not being passed down here.
              This might be something to address in a future step if those props are needed by the components. */}
          {section.component && <section.component />}
          {section.content && <div className="prose prose-invert max-w-none text-starlight-blue mt-4">{section.content}</div>}
        </section>
      </React.Fragment>
    ));
  };

  return (
    <div className="flex flex-col lg:flex-row py-8 gap-8">
      <aside ref={navRef} className="lg:w-1/4 sticky top-24 self-start max-h-[calc(100vh-120px)] overflow-y-auto bg-comet-grey/30 p-4 rounded-lg shadow-lg border border-shadow-slate/50 scrollbar-thin scrollbar-thumb-cyber-teal/50 scrollbar-track-deep-space-blue/50">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-cyber-teal">Documentation Index</h2>
            <button 
                onClick={() => { setCurrentPage('landing'); if (typeof window !== 'undefined') window.scrollTo(0,0); }}
                className="text-sm text-nebula-aqua hover:text-cyber-teal flex items-center"
                title="Back to Home"
            >
                <ArrowRightIcon className="w-4 h-4 mr-1 rotate-180" /> Home
            </button>
        </div>
        <nav>
           {renderDocNavRecursive(DOC_SECTIONS_DATA, 1)}
        </nav>
      </aside>
      <main ref={docContentRef} className="lg:w-3/4 documentation-page-content doc-article">
        {renderDocContentRecursive(DOC_SECTIONS_DATA)}
      </main>
    </div>
  );
};

export default DocumentationPage;
