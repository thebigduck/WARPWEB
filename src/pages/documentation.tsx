import DocumentationPageLayout from '@/components/DocumentationPageLayout';
// Import individual documentation article components
import DeveloperIntegrationGuide from '@/components/documentation/DeveloperIntegrationGuide';
import ProjectileSystemDoc from '@/components/documentation/ProjectileSystemDoc';
import LimbHealthSystemDoc from '@/components/documentation/LimbHealthSystemDoc';
import ArmorSystemDoc from '@/components/documentation/ArmorSystemDoc';
import DamageSystemDoc from '@/components/documentation/DamageSystemDoc';
import { DocumentationArticleProps, DocArticleMeta } from '@/types';

// Define the structure for documentation sections, including IDs for linking
export const docArticles: DocArticleMeta[] = [
    { id: 'dev-guide-main', title: 'Developer Integration Guide (v2)', component: DeveloperIntegrationGuide, parentId: 'dev-guide', sections: [] },
    { id: 'pds-plugin-main', title: 'Projectile System (PDS) Plugin', component: ProjectileSystemDoc, parentId: 'pds-plugin', sections: [] },
    { id: 'lhs-plugin-main', title: 'Limb Health System (LHS) Plugin', component: LimbHealthSystemDoc, parentId: 'lhs-plugin', sections: [] },
    { id: 'as-plugin-main', title: 'Armor System (AS) Plugin', component: ArmorSystemDoc, parentId: 'as-plugin', sections: [] },
    { id: 'ds-plugin-main', title: 'Damage System (DS) Plugin', component: DamageSystemDoc, parentId: 'ds-plugin', sections: [] },
  ];
  
  // This is a simplified list for the side nav.
  // The actual generation of H2 links would happen within DocumentationPageLayout based on the content of each article.
  export const sideNavStructure = docArticles.map(article => ({
      id: article.id,
      title: article.title,
      parentId: article.parentId, // Used to group H2s under H1 in side nav
      level: 1, // All these are top-level articles (H1s)
      // H2 sections would be dynamically generated or defined within each article component if needed for deep linking
  }));
  
  
  export default function Documentation() {
    return (
      <DocumentationPageLayout articles={docArticles} navStructure={sideNavStructure}>
        {/* The DocumentationPageLayout will handle rendering the correct article */}
      </DocumentationPageLayout>
    );
  }
  