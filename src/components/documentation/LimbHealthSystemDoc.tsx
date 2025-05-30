import React from 'react';
import {
    DocSubTitle,
    DocSubSubTitle,
    ListItem,
    SubListItem,
    CodeBlock
} from '@/components/ui/DocComponents';
import { DocumentationArticleProps } from '@/types';

interface CollapsibleSectionProps {
  id: string; 
  title: string;
  isExpanded: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ id, title, isExpanded, onClick, children }) => {
  return (
    <section id={id} className="mb-8 scroll-mt-24">
      <DocSubTitle id={`${id}-header`} onClick={onClick} onToggle={onClick} isExpanded={isExpanded}>{title}</DocSubTitle>
      {isExpanded && <div className={`pt-3 pl-6 space-y-4`}>{children}</div>}
    </section>
  );
};

const LimbHealthSystemDocContent: React.FC<DocumentationArticleProps> = ({ parentId, expandedSections, toggleExpansion, getSectionId }) => {
  const sectionId = (baseId: string) => getSectionId(parentId, baseId); 

  return (
    <article className="doc-article space-y-6">
      <hr className="border-shadow-slate/50 my-8"/>

      <CollapsibleSection
        id={sectionId('overview-link')}
        title="1. Overview"
        isExpanded={!!expandedSections[sectionId('overview-link')]}
        onClick={() => toggleExpansion(sectionId('overview-link'))}
      >
        <p>The <strong>Limb Health System (LHS)</strong> plugin provides a per-limb health and stamina model for characters, with support for status effects (e.g., bleeding, fractures) and conditional states (e.g., “broken arm”, “crippled leg”). It is built on Unreal’s Gameplay Ability System (GAS) and works alongside the Armor System (AS) and Projectile System (PDS), all coordinated by the central Damage Router Component in the <strong>Damage System (DS)</strong> plugin. LHS also includes a data-driven framework for medical consumables to restore health and remove negative effects.</p>
      </CollapsibleSection>

      <hr className="border-shadow-slate/50 my-8"/>

      <CollapsibleSection
        id={sectionId('core-features-link')}
        title="2. Core Features"
        isExpanded={!!expandedSections[sectionId('core-features-link')]}
        onClick={() => toggleExpansion(sectionId('core-features-link'))}
      >
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
      </CollapsibleSection>

      <hr className="border-shadow-slate/50 my-8"/>

      <CollapsibleSection
        id={sectionId('key-classes-link')}
        title="3. Key C++ Classes & Data Assets"
        isExpanded={!!expandedSections[sectionId('key-classes-link')]}
        onClick={() => toggleExpansion(sectionId('key-classes-link'))}
      >
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
                        <td className="px-4 py-3 align-top"><CodeBlock inline>LimbSystemTypes.h</CodeBlock></td>
                        <td className="px-4 py-3 align-top">Header</td>
                        <td className="px-4 py-3 align-top">
                            Contains:
                            <ul className="list-none mt-1 space-y-0.5 pl-0">
                                <SubListItem><CodeBlock inline>FLimbDefinition</CodeBlock> (static limb info)</SubListItem>
                                <SubListItem><CodeBlock inline>FLimbRuntimeData</CodeBlock> (optional runtime tracking)</SubListItem>
                                <SubListItem><CodeBlock inline>FActiveStatusEffect</CodeBlock></SubListItem>
                                <SubListItem><CodeBlock inline>FConditionalStateDefinition</CodeBlock></SubListItem>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3 align-top font-medium text-starlight-blue">Module Files</td>
                        <td className="px-4 py-3 align-top"></td>
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
      </CollapsibleSection>

      <hr className="border-shadow-slate/50 my-8"/>

      <CollapsibleSection
        id={sectionId('directory-structure-link')}
        title="4. Directory Structure"
        isExpanded={!!expandedSections[sectionId('directory-structure-link')]}
        onClick={() => toggleExpansion(sectionId('directory-structure-link'))}
      >
        <CodeBlock language="text">
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
      </CollapsibleSection>

      <hr className="border-shadow-slate/50 my-8"/>

      <CollapsibleSection
        id={sectionId('integration-points-link')}
        title="5. Integration Points"
        isExpanded={!!expandedSections[sectionId('integration-points-link')]}
        onClick={() => toggleExpansion(sectionId('integration-points-link'))}
      >
        <DocSubSubTitle id={sectionId('integration-ds')}>5.1 Damage System (DS) Dependency</DocSubSubTitle>
        <p className="font-medium text-nebula-aqua">Shared Types:</p>
        <ul className="list-none space-y-1 pl-0">
            <ListItem>Include <CodeBlock inline>{`#include "ItemSystemTypes.h"`}</CodeBlock> and <CodeBlock inline>{`#include "DamageSystemTypes.h"`}</CodeBlock> from <strong>DS</strong> for <CodeBlock inline>EItemInstanceQuality</CodeBlock>, <CodeBlock inline>FStatModifier</CodeBlock>, <CodeBlock inline>ERoundType</CodeBlock>, etc.</ListItem>
            <ListItem>Include <CodeBlock inline>{`#include "MyGameGameplayEffectContext.h"`}</CodeBlock> (DS) in <CodeBlock inline>CharacterAttributeSet.cpp</CodeBlock> and <CodeBlock inline>LimbSystemComponent.cpp</CodeBlock> to access the <CodeBlock inline>FDamageContext*</CodeBlock> pointer.</ListItem>
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
      </CollapsibleSection>

      <hr className="border-shadow-slate/50 my-8"/>

      <CollapsibleSection
        id={sectionId('setup-usage-link')}
        title="6. Setup & Usage Notes"
        isExpanded={!!expandedSections[sectionId('setup-usage-link')]}
        onClick={() => toggleExpansion(sectionId('setup-usage-link'))}
      >
        <ol className="list-none space-y-3 pl-0">
            <ListItem ordered><strong>Component Attachment</strong>
                <p className="mt-1">In your Character class (C++ or Blueprint), add:</p>
                <CodeBlock language="cpp">{`UPROPERTY(VisibleAnywhere) UAbilitySystemComponent* AbilitySystemComponent;
UPROPERTY(VisibleAnywhere) ULimbSystemComponent* LimbSystemComponent;
UPROPERTY() UCharacterAttributeSet* AttributeSet;`}</CodeBlock>
            </ListItem>
            <ListItem ordered><strong>Initialize GAS & Limbs</strong>
                <CodeBlock language="cpp">{`// In BeginPlay or OnPossess
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
                <p className="mt-1">In <strong>LimbHealthSystem.Build.cs</strong>, add <CodeBlock inline>{`"DamageSystem"`}</CodeBlock> under <CodeBlock inline>PublicDependencyModuleNames</CodeBlock>. In <CodeBlock inline>LimbHealthSystem.uplugin</CodeBlock>, list <CodeBlock inline>{`"DamageSystem"`}</CodeBlock> in the <CodeBlock inline>{`"Plugins"`}</CodeBlock> array.</p>
            </ListItem>
            <ListItem ordered><strong>Include Paths</strong>
                <p className="mt-1">Ensure <CodeBlock inline>{`#include "ItemSystemTypes.h"`}</CodeBlock> and <CodeBlock inline>{`#include "MyGameGameplayEffectContext.h"`}</CodeBlock> resolve via the DS module’s <CodeBlock inline>Public/</CodeBlock> directory.</p>
            </ListItem>
        </ol>
      </CollapsibleSection>

    </article>
  );
};

export default LimbHealthSystemDocContent;
