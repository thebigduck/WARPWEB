// This file can be used to define shared TypeScript types across your application.

// Example: Props for individual documentation article components
export interface DocumentationArticleProps {
  parentId: string; // ID of the main article, e.g., 'dev-guide-main'
  expandedSections: Record<string, boolean>;
  toggleExpansion: (sectionId: string) => void;
  getSectionId: (articleParentId: string, baseId: string) => string; // Make mandatory
}

// You can add other shared types here, for example:
// export interface NavItem {
//   id: string;
//   title: string;
//   isPageLink?: boolean;
//   isPrimaryCta?: boolean;
//   scrollToId?: string;
// }

// Type for the items in DOC_SECTIONS_DATA in DocumentationPage.tsx
// (This is also defined locally in DocumentationPage.tsx, kept here for reference or potential shared use)
export interface DocSectionDataEntry {
  id: string;
  title: string;
  level: 1 | 2 | 3 | 4;
  component?: string; 
  isArticle?: boolean; 
  parentGroup: string; 
  subSectionOf?: string; 
}
