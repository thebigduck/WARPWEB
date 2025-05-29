import React from 'react';
import DocumentationPageLayout from '@/components/DocumentationPageLayout';

// Import individual documentation article components
import DeveloperIntegrationGuide from '@/components/documentation/DeveloperIntegrationGuide';
import ProjectileSystemDoc from '@/components/documentation/ProjectileSystemDoc';
import LimbHealthSystemDoc from '@/components/documentation/LimbHealthSystemDoc';
import ArmorSystemDoc from '@/components/documentation/ArmorSystemDoc';
import DamageSystemDoc from '@/components/documentation/DamageSystemDoc';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DocArticleMeta, DocumentationArticleProps, DocSection } from '@/types';

export const docArticles: DocArticleMeta[] = [
  {
    id: 'dev-guide-main',
    title: 'Developer Integration Guide (v2)',
    component: DeveloperIntegrationGuide,
    parentId: 'dev-guide',
    sections: []
  },
  {
    id: 'pds-plugin-main',
    title: 'Projectile System (PDS) Plugin',
    component: ProjectileSystemDoc,
    parentId: 'pds-plugin',
    sections: []
  },
  {
    id: 'lhs-plugin-main',
    title: 'Limb Health System (LHS) Plugin',
    component: LimbHealthSystemDoc,
    parentId: 'lhs-plugin',
    sections: []
  },
  {
    id: 'as-plugin-main',
    title: 'Armor System (AS) Plugin',
    component: ArmorSystemDoc,
    parentId: 'as-plugin',
    sections: []
  },
  {
    id: 'ds-plugin-main',
    title: 'Damage System (DS) Plugin',
    component: DamageSystemDoc,
    parentId: 'ds-plugin',
    sections: []
  },
];

export const sideNavStructure: DocSection[] = docArticles.map(article => ({
    id: article.id,
    title: article.title,
    parent: article.parentId,
    level: 1, // Corrected: Removed 'as 1'
    // subSectionOf will be undefined for these top-level nav items
}));

const DocumentationPageWrapper = () => {
  return (
    <DocumentationPageLayout articles={docArticles} navStructure={sideNavStructure} />
  );
};

export default DocumentationPageWrapper;