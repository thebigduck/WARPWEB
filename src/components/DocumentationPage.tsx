import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Grid,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  Button
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { StaticDocMainTitle } from '@/components/ui/DocComponents'; 

import DeveloperIntegrationGuideContent from '@/components/documentation/DeveloperIntegrationGuide';
import ProjectileSystemDocContent from '@/components/documentation/ProjectileSystemDoc';
import LimbHealthSystemDocContent from '@/components/documentation/LimbHealthSystemDoc';
import ArmorSystemDocContent from '@/components/documentation/ArmorSystemDoc';
import DamageSystemDocContent from '@/components/documentation/DamageSystemDoc';

interface DocumentationPageProps {
  setCurrentPage: (page: string) => void;
  headerOffset: number; 
}

export interface DocumentationArticleProps {
    parentId: string; 
    expandedSections: Record<string, boolean>;
    toggleExpansion: (sectionId: string) => void;
    getSectionId: (parentId: string, baseId: string) => string;
}

interface DocSection {
  id: string;
  title: string;
  level: 1 | 2 | 3 | 4; 
  component?: string; 
  isArticle?: boolean; 
  parentGroup: string; 
  subSectionOf?: string; 
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const contentComponentMap: Record<string, React.ComponentType<any>> = {
    DeveloperIntegrationGuideContent,
    ProjectileSystemDocContent,
    LimbHealthSystemDocContent,
    ArmorSystemDocContent,
    DamageSystemDocContent,
};

// DOC_SECTIONS_DATA should be fully populated by the user here
// based on refactor.tsx (lines 400-457)
const DOC_SECTIONS_DATA: DocSection[] = [
  // Developer Integration Guide (parentGroup: 'dev-guide')
  { id: 'dev-guide-main', title: 'Developer Integration Guide (v2)', parentGroup: 'dev-guide', level: 1, component: 'DeveloperIntegrationGuideContent', isArticle: true },
  { id: 'dev-guide-main-intro-link', title: '1. Introduction', parentGroup: 'dev-guide', level: 2 }, 
  { id: 'dev-guide-main-intro-purpose', title: '1.1 Purpose of This Guide', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-intro-link' },
  { id: 'dev-guide-main-intro-ecosystem', title: '1.2 Plugin Ecosystem Overview', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-intro-link' },
  { id: 'dev-guide-main-prerequisites-link', title: '2. Prerequisites', parentGroup: 'dev-guide', level: 2 },
  { id: 'dev-guide-main-plugin-setup-link', title: '3. Plugin Setup', parentGroup: 'dev-guide', level: 2 },
  { id: 'dev-guide-main-plugin-setup-adding', title: '3.1 Adding Plugins', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-plugin-setup-link' },
  { id: 'dev-guide-main-plugin-setup-enabling', title: '3.2 Enabling Plugins', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-plugin-setup-link' },
  { id: 'dev-guide-main-core-concepts-link', title: '4. Core Concepts & Dependencies', parentGroup: 'dev-guide', level: 2 },
  { id: 'dev-guide-main-core-concepts-api', title: '4.1 API Macros', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-core-concepts-link' },
  { id: 'dev-guide-main-core-concepts-shared-types', title: '4.2 Shared Data Types', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-core-concepts-link' },
  { id: 'dev-guide-main-core-concepts-dependencies', title: '4.3 Plugin Dependency Config', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-core-concepts-link' },
  { id: 'dev-guide-main-lhs-integration-link', title: '5. LHS Integration', parentGroup: 'dev-guide', level: 2 },
  { id: 'dev-guide-main-lhs-character-setup', title: '5.1 Character Setup (LHS)', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-lhs-integration-link' },
  { id: 'dev-guide-main-lhs-data-asset', title: '5.2 Data Asset Creation (LHS)', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-lhs-integration-link' },
  { id: 'dev-guide-main-lhs-damage-feedback', title: '5.3 Damage Feedback (LHS)', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-lhs-integration-link' },
  { id: 'dev-guide-main-as-integration-link', title: '6. AS Integration', parentGroup: 'dev-guide', level: 2 },
  { id: 'dev-guide-main-as-character-setup', title: '6.1 Character Setup (AS)', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-as-integration-link' },
  { id: 'dev-guide-main-as-data-asset', title: '6.2 Data Asset Creation (AS)', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-as-integration-link' },
  { id: 'dev-guide-main-as-equipping', title: '6.3 Equipping Armor (AS)', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-as-integration-link' },
  { id: 'dev-guide-main-as-damage-interaction', title: '6.4 Damage Interaction (AS)', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-as-integration-link' },
  { id: 'dev-guide-main-pds-integration-link', title: '7. PDS Integration', parentGroup: 'dev-guide', level: 2 },
  { id: 'dev-guide-main-pds-archetype-data', title: '7.1 Archetype Data Assets (PDS)', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-pds-integration-link' },
  { id: 'dev-guide-main-pds-firing-logic', title: '7.2 Firing Logic (PDS)', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-pds-integration-link' },
  { id: 'dev-guide-main-pds-dispatching-context', title: '7.3 Populating Context (PDS)', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-pds-integration-link' },
  { id: 'dev-guide-main-ds-integration-link', title: '8. DS Integration', parentGroup: 'dev-guide', level: 2 },
  { id: 'dev-guide-main-ds-actor-setup', title: '8.1 Actor Setup (DS)', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-ds-integration-link' },
  { id: 'dev-guide-main-ds-direct-damage-ge', title: '8.2 Direct Damage GE (DS)', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-ds-integration-link' },
  { id: 'dev-guide-main-ds-gameplaycue-setup', title: '8.3 GameplayCue Setup (DS)', parentGroup: 'dev-guide', level: 3, subSectionOf: 'dev-guide-main-ds-integration-link' },
  { id: 'dev-guide-main-damage-flow-link', title: '9. Damage Flow Example', parentGroup: 'dev-guide', level: 2 },
  { id: 'dev-guide-main-best-practices-link', title: '10. Best Practices & Troubleshooting', parentGroup: 'dev-guide', level: 2 },
 
  { id: 'pds-plugin-main', title: 'Projectile System (PDS) Plugin', parentGroup: 'pds-plugin', level: 1, component: 'ProjectileSystemDocContent', isArticle: true },
  { id: 'pds-plugin-main-overview-link', title: '1. Overview', parentGroup: 'pds-plugin', level: 2 },
  { id: 'pds-plugin-main-core-features-link', title: '2. Core Features', parentGroup: 'pds-plugin', level: 2 },
  { id: 'pds-plugin-main-key-classes-link', title: '3. Key C++ Classes & Data Assets', parentGroup: 'pds-plugin', level: 2 },
  { id: 'pds-plugin-main-directory-structure-link', title: '4. Directory Structure', parentGroup: 'pds-plugin', level: 2 },
  { id: 'pds-plugin-main-integration-points-link', title: '5. Integration Points', parentGroup: 'pds-plugin', level: 2 },
  { id: 'pds-plugin-main-integration-ds', title: '5.1 Damage System (DS)', parentGroup: 'pds-plugin', level: 3, subSectionOf: 'pds-plugin-main-integration-points-link'},
  { id: 'pds-plugin-main-integration-as', title: '5.2 Armor System (AS)', parentGroup: 'pds-plugin', level: 3, subSectionOf: 'pds-plugin-main-integration-points-link'},
  { id: 'pds-plugin-main-integration-lhs', title: '5.3 Limb Health System (LHS)', parentGroup: 'pds-plugin', level: 3, subSectionOf: 'pds-plugin-main-integration-points-link'},
  { id: 'pds-plugin-main-integration-weapon', title: '5.4 External Weapon System', parentGroup: 'pds-plugin', level: 3, subSectionOf: 'pds-plugin-main-integration-points-link'},
  { id: 'pds-plugin-main-setup-usage-link', title: '6. Setup & Usage Notes', parentGroup: 'pds-plugin', level: 2 },

  { id: 'lhs-plugin-main', title: 'Limb Health System (LHS) Plugin', parentGroup: 'lhs-plugin', level: 1, component: 'LimbHealthSystemDocContent', isArticle: true },
  { id: 'lhs-plugin-main-overview-link', title: '1. Overview', parentGroup: 'lhs-plugin', level: 2 },
  { id: 'lhs-plugin-main-core-features-link', title: '2. Core Features', parentGroup: 'lhs-plugin', level: 2 },
  { id: 'lhs-plugin-main-key-classes-link', title: '3. Key C++ Classes & Data Assets', parentGroup: 'lhs-plugin', level: 2 },
  { id: 'lhs-plugin-main-directory-structure-link', title: '4. Directory Structure', parentGroup: 'lhs-plugin', level: 2 },
  { id: 'lhs-plugin-main-integration-points-link', title: '5. Integration Points', parentGroup: 'lhs-plugin', level: 2 },
  { id: 'lhs-plugin-main-integration-ds', title: '5.1 Damage System (DS) Dependency', parentGroup: 'lhs-plugin', level: 3, subSectionOf: 'lhs-plugin-main-integration-points-link'},
  { id: 'lhs-plugin-main-integration-gas', title: '5.2 Gameplay Ability System (GAS)', parentGroup: 'lhs-plugin', level: 3, subSectionOf: 'lhs-plugin-main-integration-points-link'},
  { id: 'lhs-plugin-main-setup-usage-link', title: '6. Setup & Usage Notes', parentGroup: 'lhs-plugin', level: 2 },

  { id: 'as-plugin-main', title: 'Armor System (AS) Plugin', parentGroup: 'as-plugin', level: 1, component: 'ArmorSystemDocContent', isArticle: true },
  { id: 'as-plugin-main-overview-link', title: '1. Overview', parentGroup: 'as-plugin', level: 2 },
  { id: 'as-plugin-main-core-features-link', title: '2. Core Features', parentGroup: 'as-plugin', level: 2 },
  { id: 'as-plugin-main-key-classes-link', title: '3. Key C++ Classes & Data Assets', parentGroup: 'as-plugin', level: 2 },
  { id: 'as-plugin-main-directory-structure-link', title: '4. Directory Structure', parentGroup: 'as-plugin', level: 2 },
  { id: 'as-plugin-main-integration-points-link', title: '5. Integration Points', parentGroup: 'as-plugin', level: 2 },
  { id: 'as-plugin-main-integration-ds', title: '5.1 Damage System (DS)', parentGroup: 'as-plugin', level: 3, subSectionOf: 'as-plugin-main-integration-points-link'},
  { id: 'as-plugin-main-integration-lhs', title: '5.2 Limb Health System (LHS)', parentGroup: 'as-plugin', level: 3, subSectionOf: 'as-plugin-main-integration-points-link'},
  { id: 'as-plugin-main-integration-pds', title: '5.3 Projectile System (PDS)', parentGroup: 'as-plugin', level: 3, subSectionOf: 'as-plugin-main-integration-points-link'},
  { id: 'as-plugin-main-setup-usage-link', title: '6. Setup & Usage Notes', parentGroup: 'as-plugin', level: 2 },

  { id: 'ds-plugin-main', title: 'Damage System (DS) Plugin', parentGroup: 'ds-plugin', level: 1, component: 'DamageSystemDocContent', isArticle: true },
  { id: 'ds-plugin-main-overview-link', title: '1. Overview', parentGroup: 'ds-plugin', level: 2 },
  { id: 'ds-plugin-main-core-features-link', title: '2. Core Features', parentGroup: 'ds-plugin', level: 2 },
  { id: 'ds-plugin-main-key-classes-link', title: '3. Key C++ Classes & Data Structures', parentGroup: 'ds-plugin', level: 2 },
  { id: 'ds-plugin-main-directory-structure-link', title: '4. Directory Structure', parentGroup: 'ds-plugin', level: 2 },
  { id: 'ds-plugin-main-integration-points-link', title: '5. Integration Points', parentGroup: 'ds-plugin', level: 2 },
  { id: 'ds-plugin-main-integration-provider', title: '5.1 Provider of Core Types', parentGroup: 'ds-plugin', level: 3, subSectionOf: 'ds-plugin-main-integration-points-link'},
  { id: 'ds-plugin-main-integration-orchestrator', title: '5.2 Orchestrator of Damage Flow', parentGroup: 'ds-plugin', level: 3, subSectionOf: 'ds-plugin-main-integration-points-link'},
  { id: 'ds-plugin-main-integration-gameplaycue', title: '5.3 GameplayCue System', parentGroup: 'ds-plugin', level: 3, subSectionOf: 'ds-plugin-main-integration-points-link'},
  { id: 'ds-plugin-main-setup-usage-link', title: '6. Setup & Usage Notes', parentGroup: 'ds-plugin', level: 2 },
];

export const DocumentationPage: React.FC<DocumentationPageProps> = ({ setCurrentPage, headerOffset }) => {
  const initialActiveDoc = DOC_SECTIONS_DATA.length > 0 ? (DOC_SECTIONS_DATA.find(s => s.level === 1)?.id || DOC_SECTIONS_DATA[0].id) : '';
  const [activeDocSection, setActiveDocSection] = useState<string>(initialActiveDoc);
  const [expandedNav, setExpandedNav] = useState<Record<string, boolean>>({});
  const contentRefs = useRef<Record<string, HTMLElement | null>>({});
  const mainContentRef = useRef<HTMLDivElement>(null);

  const getSectionIdForArticle = useCallback((articleParentId: string, baseId: string) => {
    return `${articleParentId}-${baseId}`;
  }, []);

  useEffect(() => {
    const allSectionIds: string[] = [];
    const collectIdsRecursive = (sections: DocSection[]) => {
        sections.forEach(section => {
            allSectionIds.push(section.id);
            // The DOC_SECTIONS_DATA is flat, no nested subSections arrays to recurse here
        });
    };
    collectIdsRecursive(DOC_SECTIONS_DATA);
    allSectionIds.forEach(id => {
        contentRefs.current[id] = document.getElementById(id);
    });
  }, []); 

  useEffect(() => {
    if (activeDocSection) {
      const newExpanded: Record<string, boolean> = {};
      let current = DOC_SECTIONS_DATA.find(s => s.id === activeDocSection);
      const parentsToExpand: string[] = [];
      while(current) {
        parentsToExpand.push(current.id);
        let nextParentId = current.subSectionOf;
        if (!nextParentId && current.level === 2 && current.parentGroup) { 
            const h1ParentOfGroup = DOC_SECTIONS_DATA.find(s => s.parentGroup === current?.parentGroup && s.level === 1);
            if(h1ParentOfGroup) nextParentId = h1ParentOfGroup.id;
        }
        current = nextParentId ? DOC_SECTIONS_DATA.find(s => s.id === nextParentId) : undefined;
      }
      parentsToExpand.forEach(id => newExpanded[id] = true);
      setExpandedNav(prev => ({...prev, ...newExpanded}));
    }
  }, [activeDocSection]);

  useEffect(() => {
    const contentArea = mainContentRef.current;
    if (!contentArea || DOC_SECTIONS_DATA.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = contentArea.scrollTop;
      let currentId = activeDocSection; 
      let minOffsetTop = Infinity;

      for (const section of DOC_SECTIONS_DATA) {
        const element = contentRefs.current[section.id];
        if (element) {
            const elementTopInScrollable = element.offsetTop - headerOffset - 20;
            if (elementTopInScrollable <= scrollPosition + 50 && scrollPosition - elementTopInScrollable < minOffsetTop) { 
                minOffsetTop = scrollPosition - elementTopInScrollable;
                currentId = section.id;
            }
        }
      }
      if (activeDocSection !== currentId && currentId) {
          setActiveDocSection(currentId);
      }
    };

    contentArea.addEventListener('scroll', handleScroll, { passive: true });
    return () => contentArea.removeEventListener('scroll', handleScroll);
  }, [activeDocSection, headerOffset]); 

  const handleNavClick = (id: string) => {
    const element = contentRefs.current[id];
    const contentArea = mainContentRef.current;
    if (element && contentArea) {
      contentArea.scrollTo({
        top: element.offsetTop - headerOffset - 20, 
        behavior: 'smooth'
      });
    }
    setActiveDocSection(id);
  };

  const toggleNavExpansion = (sectionId: string) => {
    setExpandedNav(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const renderNavItems = (currentParentGroupId: string, currentLevel: number, parentItemId?: string) => {
    const items = DOC_SECTIONS_DATA.filter(s => {
        if (currentLevel === 1) return s.parentGroup === currentParentGroupId && s.level === 1;
        if (currentLevel === 2) return s.parentGroup === currentParentGroupId && s.level === 2; 
        if (currentLevel === 3) return s.parentGroup === currentParentGroupId && s.level === 3 && s.subSectionOf === parentItemId;
        return false;
    });

    return items.map(item => {
      const hasSubNav = 
        (item.level === 1 && DOC_SECTIONS_DATA.some(s => s.parentGroup === item.parentGroup && s.level === 2)) ||
        (item.level === 2 && DOC_SECTIONS_DATA.some(s => s.subSectionOf === item.id && s.level === 3 && s.parentGroup === item.parentGroup ));
      const isOpen = !!expandedNav[item.id];

      return (
        <React.Fragment key={item.id}>
          <ListItemButton 
            selected={activeDocSection === item.id}
            onClick={() => { 
                handleNavClick(item.id);
                if (hasSubNav) toggleNavExpansion(item.id);
            }}
            sx={{
              pl: item.level === 1 ? 1 : item.level === 2 ? 2.5 : 4, 
              bgcolor: activeDocSection === item.id ? '#74C69D !important' : 'transparent',
              color: activeDocSection === item.id ? '#081C15 !important' : '#D8F3DC',
              '&:hover': { bgcolor: '#2D6A4F', color: '#95D5B2' },
              fontWeight: item.level === 1 ? 'bold' : 'normal',
              fontSize: item.level === 1 ? '1.05rem' : item.level === 2 ? '0.9rem' : '0.85rem',
              py: item.level === 1 ? 0.75 : 0.5,
            }}
          >
            <ListItemText primary={item.title.replace(/\((?:v2|DS|LHS|AS|PDS)\)/g, '').replace(/^\d+\.\s*/, '').trim()} />
            {hasSubNav && (isOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          {hasSubNav && (
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.level === 1 && renderNavItems(item.parentGroup, 2)} 
                {item.level === 2 && renderNavItems(item.parentGroup, 3, item.id)}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });
  };
  
  const getArticleComponentAndId = () => {
    let articleMeta = DOC_SECTIONS_DATA.find(s => s.id === activeDocSection && s.isArticle);
    let currentArticleParentId = articleMeta?.id;

    if (!articleMeta) {
        const activeItem = DOC_SECTIONS_DATA.find(s => s.id === activeDocSection);
        const parentGroupId = activeItem?.parentGroup;
        if (parentGroupId) {
            articleMeta = DOC_SECTIONS_DATA.find(s => s.parentGroup === parentGroupId && s.level === 1 && s.isArticle);
            currentArticleParentId = articleMeta?.id;
        }
    }
    if (!articleMeta && DOC_SECTIONS_DATA.length > 0) { 
        articleMeta = DOC_SECTIONS_DATA.find(s => s.isArticle);
        currentArticleParentId = articleMeta?.id;
    }
    
    const ComponentToRender = articleMeta && articleMeta.component ? contentComponentMap[articleMeta.component] : null;
    return { ComponentToRender, currentArticleParentId: currentArticleParentId || '' };
  };

  const { ComponentToRender: ActiveArticleComponent, currentArticleParentId } = getArticleComponentAndId();

  return (
    <Grid container spacing={3} sx={{ py: {xs:2, md:3} }}>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 3' }}>
        <Paper 
            elevation={2} 
            className="lg:sticky lg:top-24 bg-[#2D6A4F] border border-[#1B4332]"
            sx={{ p: 1.5, maxHeight: {md: 'calc(100vh - 12rem)'}, overflowY: 'auto'}}
        >
          <Box sx={{display: 'flex', justifyContent:'space-between', alignItems:'center', mb:1, borderBottom:1, borderColor:'#1B4332', pb:1}}>
            <Typography variant="h6" className="text-[#74C69D] text-lg">Documentation</Typography>
            <Button 
                startIcon={<ArrowBackIcon />} 
                onClick={() => { setCurrentPage('landing'); if(typeof window !== 'undefined') window.scrollTo(0,0);}}
                size="small"
                sx={{color: '#95D5B2', textTransform:'none', '&:hover': {color: '#74C69D', bgcolor: 'transparent'}, fontSize: '0.8rem'}}
            >
                Home
            </Button>
          </Box>
          <List component="nav" dense>
            { Array.from(new Set(DOC_SECTIONS_DATA.filter(s => s.level === 1 && s.parentGroup).map(s => s.parentGroup))).map(parentGroup => parentGroup && renderNavItems(parentGroup, 1)) }
          </List>
        </Paper>
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 9' }}>
        <Paper 
            elevation={2} 
            ref={mainContentRef} 
            className="bg-[#2D6A4F] border border-[#1B4332] text-[#D8F3DC] leading-relaxed documentation-page-content"
            sx={{ p: {xs:2, sm:3, md:4}, maxHeight: {md: 'calc(100vh - 8rem)'}, overflowY: 'auto', scrollPaddingTop: `${headerOffset + 20}px`}}
        >
          <StaticDocMainTitle id="doc-main-page-title" className="mb-6 !text-3xl sm:!text-4xl">
             {DOC_SECTIONS_DATA.find(s => s.id === currentArticleParentId)?.title || "Documentation Topics"}
          </StaticDocMainTitle>
          
          {ActiveArticleComponent && currentArticleParentId ? 
            <ActiveArticleComponent 
                parentId={currentArticleParentId} 
                expandedSections={expandedNav} 
                toggleExpansion={toggleNavExpansion} 
                getSectionId={getSectionIdForArticle}
            /> : 
            <Typography>Select a documentation section. Ensure DOC_SECTIONS_DATA is correctly populated and IDs match content components.</Typography>}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DocumentationPage;
