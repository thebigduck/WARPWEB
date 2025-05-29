import React from 'react';
import { CodeBlock, ListItem, SubListItem, DocSubTitle, DocSubSubTitle, DocSubSubSubTitle } from '@/components/ui'; // Assuming UI components are in /ui

interface CollapsibleSectionProps {
  id: string;
  title: string;
  level: 2 | 3 | 4; // H2, H3, H4
  isExpanded: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ id, title, level, isExpanded, onClick, children }) => {
  const TitleComponent = level === 2 ? DocSubTitle : level === 3 ? DocSubSubTitle : DocSubSubSubTitle;
  return (
    <section id={id} className="mb-8">
      <TitleComponent id={`${id}-header`} onClick={onClick} isExpanded={isExpanded}>
        {title}
      </TitleComponent>
      {isExpanded && <div className={`pt-3 ${level === 2 ? 'pl-6' : 'pl-8'}`}>{children}</div>}
    </section>
  );
};

const DeveloperIntegrationGuide: React.FC<{
    expandedSections: Record<string, boolean>;
    toggleExpansion: (sectionId: string) => void;
  }> = ({ expandedSections, toggleExpansion }) => {
    // Note: The actual content for each section would be extensive.
    // This is a structural placeholder.
    return (
      <article className="space-y-10 doc-article">
        {/* Section 1: Introduction */}
        <CollapsibleSection
          id="dev-guide-intro-link"
          title="1. Introduction"
          level={2}
          isExpanded={!!expandedSections['dev-guide-intro-link']}
          onClick={() => toggleExpansion('dev-guide-intro-link')}
        >
          <DocSubSubTitle id="dev-guide-intro-purpose">1.1 Purpose of This Guide</DocSubSubTitle>
          <p>This document provides in-depth instructions for integrating the <strong className="text-nebula-aqua">Limb Health System (LHS)</strong>, <strong className="text-nebula-aqua">Armor System (AS)</strong>, <strong className="text-nebula-aqua">Projectile System (PDS)</strong>, and the <strong className="text-nebula-aqua">Damage System (DS)</strong> into your Unreal Engine 5.5 project. DS now also hosts all core shared data types—ensuring a single source of truth for your combat framework.</p>
          
          <DocSubSubTitle id="dev-guide-intro-ecosystem">1.2 Plugin Ecosystem Overview</DocSubSubTitle>
          <div className="overflow-x-auto bg-deep-space-blue/50 p-3 my-4 rounded-md shadow-inner border border-shadow-slate/60">
              <table className="min-w-full divide-y divide-shadow-slate/40 text-sm">
                  {/* Table content as in previous versions */}
              </table>
          </div>
        </CollapsibleSection>
  
        {/* Section 2: Prerequisites */}
        <CollapsibleSection
          id="dev-guide-prerequisites-link"
          title="2. Prerequisites"
          level={2}
          isExpanded={!!expandedSections['dev-guide-prerequisites-link']}
          onClick={() => toggleExpansion('dev-guide-prerequisites-link')}
        >
          <ul className="list-none space-y-1 pl-0">
              <ListItem>Unreal Engine 5.5 (or newer compatible version).</ListItem>
              {/* ... other prerequisites ... */}
          </ul>
        </CollapsibleSection>
        
        {/* ... Repeat for all H2 sections from DeveloperIntegrationGuide.md ... */}
        {/* Ensure to pass correct IDs and titles */}
  
        <CollapsibleSection
          id="dev-guide-best-practices-link"
          title="10. Best Practices & Troubleshooting"
          level={2}
          isExpanded={!!expandedSections['dev-guide-best-practices-link']}
          onClick={() => toggleExpansion('dev-guide-best-practices-link')}
        >
          <></>{/* Content to be added for best practices and troubleshooting. */}
        </CollapsibleSection>
      </article>
    );
  };
  
  export default DeveloperIntegrationGuide;
  
  // --- File: src/components/ui/index.ts ---
  // Barrel file for UI components for easier imports
  /*
  export * from './CodeBlock';
  export * from './ListItem';
  export * from './SubListItem';
  // ... export other UI components (DocMainTitle, DocSubTitle etc.)
  */
  