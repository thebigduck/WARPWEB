export interface DocSection {
    id: string;
    title: string;
    level: 1 | 2 | 3 | 4; 
    parent?: string; 
    subSectionOf?: string; // ID of the H2 parent if this is an H3, or H1 parent if H2
  }
  
  export interface DocArticleMeta {
      id: string; 
      title: string; 
      component: React.FC<DocumentationArticleProps>; 
      parentId: string; 
      sections: Array<{id: string; title: string; level: 2}>; 
  }
  
  export interface DocumentationArticleProps {
    parentId: string; // Added parentId
    expandedSections: Record<string, boolean>;
    toggleExpansion: (sectionId: string) => void;
    // Optional: Pass a function to get unique IDs if needed within deeply nested components
    getSectionId?: (articleParentId: string, baseId: string) => string;
  }