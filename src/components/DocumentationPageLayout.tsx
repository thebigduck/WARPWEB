import React, { useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DocArticleMeta, DocumentationArticleProps } from '@/types';

interface DocumentationPageLayoutProps {
  articles: DocArticleMeta[];
  navStructure: Array<{ id: string; title: string; parentId: string; level: number }>;
}

const DocumentationPageLayout: React.FC<DocumentationPageLayoutProps> = ({ articles, navStructure }) => {
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Attempt to set active article from URL hash or default to the first article
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && articles.some(article => article.id === hash || navStructure.some(nav => nav.id === hash))) {
      // Find the top-level article ID for a section hash
      const section = navStructure.find(nav => nav.id === hash);
      const article = section ? articles.find(a => a.parentId === section.parentId || a.id === section.parentId || a.id === hash) : articles.find(a => a.id === hash);
      setActiveArticleId(article ? article.id : (articles.length > 0 ? articles[0].id : null));
      if (section) {
        setExpandedSections(prev => ({ ...prev, [section.id]: true, [section.parentId]: true }));
        // Ensure parent H1 is expanded if an H2 is targeted
        const parentArticleMeta = articles.find(a => a.parentId === section.parentId || a.id === section.parentId);
        if (parentArticleMeta) setExpandedSections(prev => ({ ...prev, [parentArticleMeta.id]: true}));
      }
    } else if (articles.length > 0) {
      setActiveArticleId(articles[0].id);
      setExpandedSections(prev => ({ ...prev, [articles[0].id]: true })); 
    }
  }, [articles, navStructure]);

  const handleNavClick = (id: string, isArticle: boolean) => {
    if (isArticle) {
      setActiveArticleId(id);
      // Toggle expansion for H1 articles
      setExpandedSections(prev => ({ ...prev, [id]: !prev[id] })); 
    } else {
        // For H2/H3 links, ensure the parent article is active and toggle the specific section
        const section = navStructure.find(nav => nav.id === id);
        const article = section ? articles.find(a => a.parentId === section.parentId || a.id === section.parentId) : null;
        if (article) setActiveArticleId(article.id);
        // Ensure H1 parent is expanded when H2 is clicked
        if (section && section.parentId && section.level === 2) { 
            setExpandedSections(prev => ({ ...prev, [section.parentId]: true, [id]: !prev[id]}));
        } else {
            setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
        }
    }
    window.location.hash = id;
  };

  const toggleSectionExpansion = (sectionId: string) => {
    setExpandedSections(prev => ({...prev, [sectionId]: !prev[sectionId]}));
    window.location.hash = sectionId;
  };

  const getSectionIdForArticle = (articleParentId: string, baseId: string) => {
    return `${articleParentId}-${baseId}`;
  };

  const activeArticle = articles.find(article => article.id === activeArticleId);
  const ArticleComponent = activeArticle?.component;

  // Group nav items by parentId for structured sidebar
  const groupedNav = navStructure.reduce<Record<string, Array<typeof navStructure[0]>>>((acc, item) => {
    const parentKey = item.parentId || item.id; // Group by parentId, or by item.id if it's a top-level item
    if (!acc[parentKey]) {
      acc[parentKey] = [];
    }
    if (item.level > 1) { // Only add sub-items to the arrays, top-level items are handled separately
        acc[parentKey].push(item);
    }
    return acc;
  }, {});

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-deep-space-blue text-starlight-blue">
      {/* Sidebar */}
      <aside className="w-full md:w-72 lg:w-80 bg-shadow-slate p-6 md:sticky md:top-20 md:self-start md:max-h-[calc(100vh-80px)] overflow-y-auto scrollbar-thin scrollbar-thumb-comet-grey scrollbar-track-deep-space-blue border-r border-comet-grey/30">
        <h2 className="text-xl font-semibold text-cyber-teal mb-6">Documentation</h2>
        <nav>
          <ul className="space-y-2">
            {articles.map(article => (
              <li key={article.id}>
                <a
                  href={`#${article.id}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(article.id, true); }}
                  className={`block py-2 px-3 rounded-md transition-colors duration-150 font-medium 
                    ${activeArticleId === article.id ? 'bg-cyber-teal text-deep-space-blue' : 'hover:bg-comet-grey/70 text-starlight-blue hover:text-nebula-aqua'}
                    text-base leading-relaxed`} // H1 style
                >
                  {article.title}
                </a>
                {/* Render H2s if this H1 article is active/expanded */}
                {expandedSections[article.id] && groupedNav[article.parentId] && (
                    <ul className="pl-4 mt-1 space-y-1">
                        {groupedNav[article.parentId].map(section => (
                             <li key={section.id}>
                                <a 
                                    href={`#${section.id}`}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(section.id, false); }}
                                    className={`block py-1.5 px-3 rounded-md transition-colors duration-150 text-sm
                                        ${window.location.hash === `#${section.id}` ? 'text-nebula-aqua font-semibold' : 'text-starlight-blue/80 hover:text-nebula-aqua hover:bg-comet-grey/50'}
                                        leading-relaxed`} // H2 style
                                >
                                    {section.title} {/* Assuming navStructure items have .title for H2s */}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        {ArticleComponent && activeArticle && (
          <ArticleComponent 
            parentId={activeArticle.parentId}
            expandedSections={expandedSections} 
            toggleExpansion={toggleSectionExpansion} 
            getSectionId={getSectionIdForArticle} 
          />
        )}
        {!ArticleComponent && <p>Select an article to view its documentation.</p>}
      </main>
    </div>
  );
};

export default DocumentationPageLayout;
