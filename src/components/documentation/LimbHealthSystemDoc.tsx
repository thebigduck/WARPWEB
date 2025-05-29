// --- File: src/components/documentation/LimbHealthSystemDoc.tsx ---
import React from 'react';
import { 
    CodeBlock, 
    ListItem, 
    SubListItem, 
    DocSubTitle, 
    DocSubSubTitle,
} from '@/components/ui'; // Assuming DocMainTitle is handled by DocumentationPageLayout
import { DocumentationArticleProps } from '@/types';

const LimbHealthSystemDoc: React.FC<DocumentationArticleProps> = ({ parentId, expandedSections, toggleExpansion, getSectionId }) => {
  // Helper to generate unique IDs for sections within this document
  // The parentId 'lhs-plugin' is defined in pages/documentation.tsx for this article's meta
  const sectionId = (baseId: string) => getSectionId ? getSectionId(parentId, baseId) : `${parentId}-${baseId}`; // getSectionId should already incorporate parentId

  return (
    <article className="space-y-8 doc-article">
      {/* Content starts directly with H2 equivalent (DocSubTitle) as H1 is handled by DocumentationPageLayout */}
      
      <section id={sectionId('overview-link')}>
        <DocSubTitle 
            id={sectionId('overview-sublink')} 
            onClick={() => toggleExpansion(sectionId('overview-sublink'))} 
            isExpanded={!!expandedSections[sectionId('overview-sublink')]}
        >
            1. Overview
        </DocSubTitle>
        {expandedSections[sectionId('overview-sublink')] && (
            <div className="pl-6 pt-3 space-y-3">
                <p>The <strong>Limb Health System (LHS)</strong> plugin provides a per-limb health and stamina model for characters, with support for status effects (e.g., bleeding, fractures) and conditional states (e.g., broken arm, crippled leg). It is built on Unreal’s Gameplay Ability System (GAS) and works alongside the Armor System (AS) and Projectile System (PDS), all coordinated by the central Damage Router Component in the <strong>Damage System (DS)</strong> plugin. LHS also includes a data-driven framework for medical consumables to restore health and remove negative effects.</p>
            </div>
        )}
      </section>

      <section id={sectionId('core-features-link')}>
        <DocSubTitle 
            id={sectionId('core-features-sublink')}
            onClick={() => toggleExpansion(sectionId('core-features-sublink'))}
            isExpanded={!!expandedSections[sectionId('core-features-sublink')]}
        >
            2. Core Features
        </DocSubTitle>
        {expandedSections[sectionId('core-features-sublink')] && (
            <div className="pl-6 pt-3 space-y-3">
                <ul className="list-none space-y-1 pl-0">
                    <ListItem><strong>Limb-Based Health:</strong> Distinct health pools for each limb plus global health.</ListItem>
                    <ListItem><strong>Stamina Management:</strong> Tracks stamina consumption and regeneration.</ListItem>
                    <ListItem><strong>Status Effects:</strong> Bleeding, poison, fractures, and other effects via GAS.</ListItem>
                    <ListItem><strong>Conditional States:</strong> Auto-applied states (e.g., “broken arm”) when limb health or status thresholds are reached.</ListItem>
                    <ListItem><strong>Medical Item Framework:</strong> <CodeBlock inline>UMedicalItemDataAsset</CodeBlock> for heal-over-time, status removal, and quality-based efficacy.</ListItem>
                    <ListItem><strong>Data-Driven Design:</strong> All definitions (limbs, states, items) configured via <CodeBlock inline>UDataAsset</CodeBlock> classes.</ListItem>
                    <ListItem><strong>GAS Integration:</strong> Attributes and effects managed by <CodeBlock inline>UAbilitySystemComponent</CodeBlock> and <CodeBlock inline>UCharacterAttributeSet</CodeBlock>.</ListItem>
                    <ListItem><strong>Server-Authoritative:</strong> All health, stamina, and effect logic runs on the server with replication to clients.</ListItem>
                </ul>
            </div>
        )}
      </section>

      <section id={sectionId('key-classes-link')}>
        <DocSubTitle 
            id={sectionId('key-classes-sublink')}
            onClick={() => toggleExpansion(sectionId('key-classes-sublink'))}
            isExpanded={!!expandedSections[sectionId('key-classes-sublink')]}
        >
            3. Key C++ Classes & Data Assets
        </DocSubTitle>
        {expandedSections[sectionId('key-classes-sublink')] && (
            <div className="pl-6 pt-3 space-y-3">
                <div className="overflow-x-auto bg-deep-space-blue/50 p-3 my-4 rounded-md shadow-inner border border-shadow-slate/60">
                    <table className="min-w-full divide-y divide-shadow-slate/40 text-sm">
                        <thead className="bg-comet-grey/50">
                            <tr>
                                <th className="px-4 py-2 text-left font-medium text-cyber-teal">Class / Asset</th>
                                <th className="px-4 py-2 text-left font-medium text-cyber-teal">Type</th>
                                <th className="px-4 py-2 text-left font-medium text-cyber-teal">Responsibility</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-shadow-slate/40">
                            <tr><td className="px-4 py-3 align-top"><CodeBlock inline>ULimbSystemComponent</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>UActorComponent</CodeBlock></td><td className="px-4 py-3 align-top">Manages limb definitions, delegates damage events to GAS, and coordinates conditional states.</td></tr>
                            <tr><td className="px-4 py-3 align-top"><CodeBlock inline>UCharacterAttributeSet</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>UAttributeSet</CodeBlock></td><td className="px-4 py-3 align-top">Defines global and per-limb attributes: health, stamina, resistances.</td></tr>
                            <tr><td className="px-4 py-3 align-top"><CodeBlock inline>UMedicalItemDataAsset</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>UPrimaryDataAsset</CodeBlock></td><td className="px-4 py-3 align-top">Describes medical consumables: healing effects, statuses to remove, application time, quality modifiers.</td></tr>
                            <tr>
                                <td className="px-4 py-3 align-top"><CodeBlock inline>LimbSystemTypes.h</CodeBlock></td><td className="px-4 py-3 align-top">Header</td>
                                <td className="px-4 py-3 align-top">Contains:
                                    <ul className="list-none mt-1 space-y-0.5 pl-0"> {/* Use list-none for table cell lists */}
                                        <SubListItem><CodeBlock inline>FLimbDefinition</CodeBlock> (static limb info)</SubListItem>
                                        <SubListItem><CodeBlock inline>FLimbRuntimeData</CodeBlock> (optional runtime tracking)</SubListItem>
                                        <SubListItem><CodeBlock inline>FActiveStatusEffect</CodeBlock></SubListItem>
                                        <SubListItem><CodeBlock inline>FConditionalStateDefinition</CodeBlock></SubListItem>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 align-top font-medium text-starlight-blue">Module Files</td><td className="px-4 py-3 align-top"></td>
                                <td className="px-4 py-3 align-top">
                                    <ul className="list-none mt-1 space-y-0.5 pl-0">
                                        <SubListItem><CodeBlock inline>ILimbHealthSystemModule.h</CodeBlock></SubListItem>
                                        <SubListItem><CodeBlock inline>LimbHealthSystemModule.cpp</CodeBlock></SubListItem>
                                        <SubListItem><CodeBlock inline>LimbHealthSystem.Build.cs</CodeBlock></SubListItem>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )}
      </section>

      <section id={sectionId('directory-structure-link')}>
        <DocSubTitle 
            id={sectionId('directory-structure-sublink')}
            onClick={() => toggleExpansion(sectionId('directory-structure-sublink'))}
            isExpanded={!!expandedSections[sectionId('directory-structure-sublink')]}
        >
            4. Directory Structure
        </DocSubTitle>
        {expandedSections[sectionId('directory-structure-sublink')] && (
            <div className="pl-6 pt-3 space-y-3">
                <CodeBlock>
                    {`LimbHealthSystem/
└── Source/
    └── LimbHealthSystem/
        ├── LimbHealthSystem.Build.cs
        ├── Public/
        │   ├── ILimbHealthSystemModule.h
        │   ├── LimbSystemTypes.h
        │   ├── CharacterAttributeSet.h
        │   ├── LimbSystemComponent.h
        │   └── MedicalItemDataAsset.h
        └── Private/
            ├── LimbHealthSystemModule.cpp
            ├── CharacterAttributeSet.cpp
            ├── LimbSystemComponent.cpp
            └── MedicalItemDataAsset.cpp`}
                </CodeBlock>
            </div>
        )}
      </section>

      <section id={sectionId('integration-points-link')}>
        <DocSubTitle 
            id={sectionId('integration-points-sublink')}
            onClick={() => toggleExpansion(sectionId('integration-points-sublink'))}
            isExpanded={!!expandedSections[sectionId('integration-points-sublink')]}
        >
            5. Integration Points
        </DocSubTitle>
        {expandedSections[sectionId('integration-points-sublink')] && (
            <div className="pl-6 pt-3 space-y-3">
                <DocSubSubTitle id={sectionId('integration-ds')}>5.1 Damage System (DS) Dependency</DocSubSubTitle>
                <p className="font-medium text-nebula-aqua">Shared Types:</p>
                <ul className="list-none space-y-1 pl-0">
                    <ListItem>Include <CodeBlock inline>#include "ItemSystemTypes.h"</CodeBlock> and <CodeBlock inline>#include "DamageSystemTypes.h"</CodeBlock> from DS for <CodeBlock inline>EItemInstanceQuality</CodeBlock>, <CodeBlock inline>FStatModifier</CodeBlock>, <CodeBlock inline>ERoundType</CodeBlock>, etc.</ListItem>
                    <ListItem>Include <CodeBlock inline>#include "MyGameGameplayEffectContext.h"</CodeBlock> (DS) in <CodeBlock inline>CharacterAttributeSet.cpp</CodeBlock> and <CodeBlock inline>LimbSystemComponent.cpp</CodeBlock> to access the <CodeBlock inline>FDamageContext*</CodeBlock> pointer.</ListItem>
                </ul>
                <p className="font-medium text-nebula-aqua mt-3">Damage Routing:</p>
                 <ul className="list-none space-y-1 pl-0">
                    <ListItem><CodeBlock inline>UDamageRouterComponent</CodeBlock> (DS) applies <CodeBlock inline>GameplayEffect</CodeBlock> specs to the LHS’s <CodeBlock inline>UAbilitySystemComponent</CodeBlock>.</ListItem>
                    <ListItem>In <CodeBlock inline>UCharacterAttributeSet::PostGameplayEffectExecute</CodeBlock>, cast the incoming <CodeBlock inline>FGameplayEffectContext</CodeBlock> to <CodeBlock inline>FMyGameGameplayEffectContext</CodeBlock> to update <CodeBlock inline>DamageContextBeingProcessed</CodeBlock> flags (<CodeBlock inline>bTargetKilled</CodeBlock>, <CodeBlock inline>ResultingAppliedStatusEffectTags</CodeBlock>).</ListItem>
                </ul>
                <DocSubSubTitle id={sectionId('integration-gas')}>5.2 Gameplay Ability System (GAS)</DocSubSubTitle>
                <ul className="list-none space-y-1 pl-0">
                    <ListItem><strong>Attributes:</strong> Health and stamina attributes live in <CodeBlock inline>UCharacterAttributeSet</CodeBlock>.</ListItem>
                    <ListItem><strong>Effects:</strong> Damage, healing, and status changes are applied via <CodeBlock inline>UGameplayEffect</CodeBlock> assets defined in data tables or Blueprints.</ListItem>
                    <ListItem><strong>Abilities:</strong> Define <CodeBlock inline>UGameplayAbility</CodeBlock> classes for using medical items, triggering regeneration, or clearing conditions.</ListItem>
                </ul>
            </div>
        )}
      </section>

      <section id={sectionId('setup-usage-link')}>
        <DocSubTitle 
            id={sectionId('setup-usage-sublink')}
            onClick={() => toggleExpansion(sectionId('setup-usage-sublink'))}
            isExpanded={!!expandedSections[sectionId('setup-usage-sublink')]}
        >
            6. Setup & Usage Notes
        </DocSubTitle>
        {expandedSections[sectionId('setup-usage-sublink')] && (
            <div className="pl-6 pt-3 space-y-3">
                <ol className="list-none space-y-2 my-2 pl-0 doc-ordered-list">
                    <ListItem ordered><strong>Component Attachment</strong>
                        <p className="mt-1">In your Character class (C++ or Blueprint), add:</p>
                        <CodeBlock>{`UPROPERTY(VisibleAnywhere) UAbilitySystemComponent* AbilitySystemComponent;
UPROPERTY(VisibleAnywhere) ULimbSystemComponent* LimbSystemComponent;
UPROPERTY() UCharacterAttributeSet* AttributeSet;`}</CodeBlock>
                    </ListItem>
                    <ListItem ordered><strong>Initialize GAS & Limbs</strong>
                        <CodeBlock>{`// In BeginPlay or OnPossess
AbilitySystemComponent->InitAbilityActorInfo(this, this);
AbilitySystemComponent->InitStats(UCharacterAttributeSet::StaticClass(), StatsDataTable);
LimbSystemComponent->InitializeLimbSystem(LimbDefinitionsDataAsset->Definitions, AbilitySystemComponent);`}</CodeBlock>
                    </ListItem>
                    <ListItem ordered><strong>Create DataAssets</strong>
                        <ul className="list-none mt-1 space-y-0.5 pl-4">
                            <SubListItem><strong>DA_HumanoidLimbs:</strong> Array of <CodeBlock inline>FLimbDefinition</CodeBlock> (bone names → limb tags).</SubListItem>
                            <SubListItem><strong>UMedicalItemDataAsset:</strong> Configure <CodeBlock inline>EffectsToApply</CodeBlock>, <CodeBlock inline>StatusEffectsToRemove</CodeBlock>, <CodeBlock inline>ApplicationTimeSeconds</CodeBlock>, and quality tiers.</SubListItem>
                        </ul>
                    </ListItem>
                    <ListItem ordered><strong>GameplayEffects & Tags</strong>
                        <p className="mt-1">Define healing, status, and penalty GEs. Define tags in <CodeBlock inline>Config/DefaultGameplayTags.ini</CodeBlock>. Reference these in your data assets and abilities.</p>
                    </ListItem>
                    <ListItem ordered><strong>Module Dependencies</strong>
                        <p className="mt-1">In <strong>LimbHealthSystem.Build.cs</strong>, add <CodeBlock inline>"DamageSystem"</CodeBlock> under <CodeBlock inline>PublicDependencyModuleNames</CodeBlock>. In <CodeBlock inline>LimbHealthSystem.uplugin</CodeBlock>, list <CodeBlock inline>"DamageSystem"</CodeBlock> in the <CodeBlock inline>"Plugins"</CodeBlock> array.</p>
                    </ListItem>
                    <ListItem ordered><strong>Include Paths</strong>
                        <p className="mt-1">Ensure <CodeBlock inline>#include "ItemSystemTypes.h"</CodeBlock> and <CodeBlock inline>#include "MyGameGameplayEffectContext.h"</CodeBlock> resolve via the DS module’s <CodeBlock inline>Public/</CodeBlock> directory.</p>
                    </ListItem>
                </ol>
            </div>
        )}
      </section>
    </article>
  );
};
export default LimbHealthSystemDoc;
