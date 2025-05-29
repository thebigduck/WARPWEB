import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DocArticleMeta, DocumentationArticleProps, DocSection } from '@/types'; 
import { ChevronDownIcon, ChevronUpIcon } from '@/components/icons';
import { SectionTitle } from '@/components/ui'; 

const HEADER_OFFSET = 80;

interface DocumentationPageLayoutProps {
  articles: DocArticleMeta[]; 
  navStructure: DocSection[]; 
}

const DocumentationPageLayout: React.FC<DocumentationPageLayoutProps> = ({ articles, navStructure }) => {
  const router = useRouter();
  const [activeDocId, setActiveDocId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.substring(1);
      if (hash && navStructure.some(s => s.id === hash)) return hash;
    }
    return navStructure.find(s => s.level === 1)?.id || '';
  });
  
  const [expandedNavSections, setExpandedNavSections] = useState<Record<string, boolean>>({});
  const mainContentRef = useRef<HTMLDivElement>(null);
  const navLinkRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const contentEl = mainContentRef.current;
    if (!contentEl) return;

    const handleScroll = () => {
      let currentSectionId = '';
      const scrollPosition = contentEl.scrollTop + HEADER_OFFSET + 40; 

      for (const section of navStructure) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollPosition) {
          currentSectionId = section.id;
        } else if (el && el.offsetTop > scrollPosition) {
          break;
        }
      }
      if (currentSectionId && activeDocId !== currentSectionId) {
        setActiveDocId(currentSectionId);
      }
    };

    contentEl.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => contentEl.removeEventListener('scroll', handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navStructure]); // Removed activeDocId as per previous step to avoid potential loop with click updates

  useEffect(() => {
    if (activeDocId) {
      const newExpanded: Record<string, boolean> = {};
      let current: DocSection | undefined = navStructure.find(s => s.id === activeDocId);
      const parentsToExpand: string[] = [];

      while (current) {
        if (current.level <= 2) {
          parentsToExpand.push(current.id);
        }
        const currentParentId = current.parent;
        const currentSubSectionOfId = current.subSectionOf;
        const currentIterationLevel = current.level;

        const h1Parent = currentParentId
          ? navStructure.find(s => s.parent === currentParentId && s.level === 1)
          : undefined;

        current = navStructure.find(s => {
          if (currentSubSectionOfId && s.id === currentSubSectionOfId) return true;
          if (currentIterationLevel > 1 && h1Parent && s.id === h1Parent.id) return true;
          return false;
        });
      }
      parentsToExpand.forEach(id => newExpanded[id] = true);
      // Preserve existing expansions and add new ones
      setExpandedNavSections(prev => {
        const updated = {...prev};
        parentsToExpand.forEach(id => updated[id] = true);
        return updated;
      });
    }
  }, [activeDocId, navStructure]);

  const handleNavLinkClick = (id: string, level: number, parentGroupId: string | undefined) => {
    const mainContentEl = mainContentRef.current;
    const elementToScrollTo = document.getElementById(id);

    if (mainContentEl && elementToScrollTo) {
      const topPos = elementToScrollTo.offsetTop - HEADER_OFFSET;
      mainContentEl.scrollTo({ top: topPos, behavior: 'smooth' });
    }
    router.replace(`${router.pathname}#${id}`, undefined, { shallow: true });
    setActiveDocId(id); // Set this section as active

    // Toggle expansion logic for navigation
    if (level === 1) {
      setExpandedNavSections(prev => ({ ...prev, [id]: !prev[id] }));
    } else if (level === 2 && parentGroupId) {
      const h1Parent = navStructure.find(s => s.id === parentGroupId && s.level === 1); // Assuming parentGroupId IS the H1's ID
      if (h1Parent) {
        setExpandedNavSections(prev => ({
          ...prev,
          [h1Parent.id]: true, // Ensure H1 parent is expanded
          [id]: !prev[id]      // Toggle the H2 itself
        }));
      }
    }
  };
  
  const currentTopLevelArticleParentId = navStructure.find(s => s.id === activeDocId)?.parent || navStructure.find(s => s.id === activeDocId && s.level ===1 )?.id;
  const activeArticleMeta = articles.find(a => a.parentId === currentTopLevelArticleParentId || a.id === currentTopLevelArticleParentId );
  const ArticleComponent = activeArticleMeta?.component;

  const renderDocNavRecursive = (currentParentId: string | undefined, currentLevel: number) => {
    if (currentParentId === undefined && currentLevel === 1) { // Top-level call, parentId is conceptual root
        // This case is handled by the initial map in the main return
        return null;
    }
    const children = navStructure.filter(s => s.parent === currentParentId && s.level === currentLevel);
    if (children.length === 0) return null;

    return (
      <ul className={`${currentLevel > 1 ? 'pl-4' : ''} space-y-1`}> {/* Adjusted padding for H2s */}
        {children.map(section => (
          <li key={section.id}>
            <button
              ref={el => { navLinkRefs.current[section.id] = el; }} 
              onClick={() => handleNavLinkClick(section.id, section.level, section.parent)}
              className={`block w-full text-left py-1 px-2 rounded transition-colors duration-150
                ${activeDocId === section.id ? 'bg-cyber-teal text-deep-space-blue font-semibold' : 'text-starlight-blue hover:bg-comet-grey hover:text-nebula-aqua'}
                text-sm`}
            >
              {section.title.replace(/\((?:v2|DS|LHS|AS|PDS)\)/g, '').replace(/^\d+\.\s*/, '').trim()}
            </button>
            {/* No further recursion for H3 in nav, handled by article component */}
          </li>
        ))}
      </ul>
    );
  };

  const articleExpandedSections = navStructure.reduce((acc, section) => {
    if (activeArticleMeta && section.parent === activeArticleMeta.parentId) { 
        acc[section.id] = !!expandedNavSections[section.id];
    }
    return acc;
  }, {} as Record<string, boolean>);

  const toggleArticleSectionExpansion = (sectionId: string) => {
    setExpandedNavSections(prev => ({...prev, [sectionId]: !prev[sectionId]}));
  };

  const getSectionIdForArticle = (articleParentIdFromProps: string, baseId: string) => {
    // If articles pass their own parentId (e.g. 'dev-guide') and a base (e.g. 'intro-link')
    // This function ensures the ID matches one in navStructure.
    // This might need adjustment based on how ArticleComponents generate their internal section IDs.
    const foundId = `${articleParentIdFromProps}-${baseId}`.replace(/-main$/, ''); // Attempt to match pattern
    if (navStructure.some(s => s.id === foundId)) return foundId;
    return baseId; // Fallback
  };

  return (
    <div className="flex flex-col lg:flex-row py-12 sm:py-16 gap-x-8 gap-y-6 bg-deep-space-blue text-starlight-blue">
      <aside className="w-full lg:w-72 xl:w-80 lg:sticky lg:top-24 self-start bg-comet-grey p-5 rounded-lg shadow-lg max-h-[calc(100vh-12rem)] overflow-y-auto border border-shadow-slate scrollbar-thin scrollbar-thumb-comet-grey scrollbar-track-deep-space-blue">
        <h2 className="text-xl font-bold text-cyber-teal mb-4 border-b border-shadow-slate pb-2">Documentation Menu</h2>
        <nav>
          {navStructure.filter(s => s.level === 1).map(topLevelSection => (
            <div key={topLevelSection.id} className="mb-3">
              <button
                ref={el => { navLinkRefs.current[topLevelSection.id] = el; }}
                onClick={() => handleNavLinkClick(topLevelSection.id, 1, topLevelSection.id )}
                className={`flex justify-between items-center w-full text-left py-1.5 px-2 rounded transition-colors duration-150 font-bold text-lg
                    ${expandedNavSections[topLevelSection.id] || (activeArticleMeta && activeArticleMeta.id === topLevelSection.id) 
                        ? 'text-cyber-teal bg-deep-space-blue/30' 
                        : 'text-cyber-teal hover:bg-comet-grey/70'}`}
              >
                <span>{topLevelSection.title.replace(/\s*\((?:v2|DS|LHS|AS|PDS)\)/g, '').trim()}</span>
                {expandedNavSections[topLevelSection.id] ? <ChevronUpIcon className="w-5 h-5 text-cyber-teal/80"/> : <ChevronDownIcon className="w-5 h-5 text-cyber-teal/80"/>}
              </button>
              {expandedNavSections[topLevelSection.id] && renderDocNavRecursive(topLevelSection.parent, 2)}
            </div>
          ))}
        </nav>
      </aside>

      <div ref={mainContentRef} className="w-full lg:flex-1 bg-comet-grey p-6 sm:p-10 rounded-lg shadow-2xl border border-shadow-slate text-starlight-blue leading-relaxed max-h-[calc(100vh-8rem)] lg:max-h-[calc(100vh-12rem)] overflow-y-auto scroll-pt-24 documentation-page-content">
        <button 
            onClick={() => router.push('/')} 
            className="mb-10 bg-cyber-teal hover:bg-nebula-aqua text-deep-space-blue font-bold py-2 px-6 rounded-md shadow-md hover:shadow-cyber-teal/40 transition-all duration-300 flex items-center"
        >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
            Back to Home
        </button>
        <SectionTitle className="mb-16 text-left !pb-6 !text-3xl sm:!text-4xl">Unreal Engine FPS Gameplay Systems</SectionTitle>
        
        {ArticleComponent && activeArticleMeta ? (
          <ArticleComponent 
            parentId={activeArticleMeta.parentId} 
            expandedSections={articleExpandedSections} 
            toggleExpansion={toggleArticleSectionExpansion} 
            getSectionId={getSectionIdForArticle} 
          />
        ) : (
          <p>Select an article to view its documentation. If an article is selected and not showing, check console for errors.</p>
        )}
      </div>
    </div>
  );
};

export default DocumentationPageLayout;
