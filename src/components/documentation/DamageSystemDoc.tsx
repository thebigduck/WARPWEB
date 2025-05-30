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

const DamageSystemDocContent: React.FC<DocumentationArticleProps> = ({ parentId, expandedSections, toggleExpansion, getSectionId }) => {
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
        <p>The <strong>Damage System (DS)</strong> plugin is the foundational utility layer for orchestrating all damage events and exposing shared core types to the gameplay ecosystem. It provides:</p>
        <ul className="list-none space-y-1 pl-0">
            <ListItem><CodeBlock inline>FDamageContext</CodeBlock>: A mutable struct carrying every piece of data for a damage event.</ListItem>
            <ListItem><CodeBlock inline>UDamageRouterComponent</CodeBlock>: An actor component that drives the ordered pipeline:
                <ol className="list-decimal list-inside ml-4 mt-1 text-sm doc-ordered-list">
                    <li>Projectile Impact</li>
                    <li>Armor Mitigation</li>
                    <li>Health Application & Status Effects</li>
                    <li>Outcome Broadcasting (GameplayCues)</li>
                </ol>
            </ListItem>
            <ListItem><strong>Shared Core Types</strong>: Centralized enums and structs previously scattered across PDS, AS, and LHS.</ListItem>
        </ul>
        <p>All processing is <strong>server-authoritative</strong>, and the module is designed for <strong>extensibility</strong>, allowing insertion of global modifiers or custom routing steps.</p>
      </CollapsibleSection>

      <hr className="border-shadow-slate/50 my-8"/>

      <CollapsibleSection
        id={sectionId('core-features-link')}
        title="2. Core Features"
        isExpanded={!!expandedSections[sectionId('core-features-link')]}
        onClick={() => toggleExpansion(sectionId('core-features-link'))}
      >
        <ul className="list-none space-y-2 pl-0">
            <ListItem><strong>Centralized Damage Data</strong>
                <p className="mt-1 text-sm text-starlight-blue/90"><CodeBlock inline>FDamageContext</CodeBlock> encapsulates source, target, projectile data, armor results, health results, and outcome flags.</p>
            </ListItem>
            <ListItem><strong>Ordered Processing</strong>
                <p className="mt-1 text-sm text-starlight-blue/90"><CodeBlock inline>{`UDamageRouterComponent::ProcessDamageEvent()`}</CodeBlock> enforces a consistent flow across all subsystems.</p>
            </ListItem>
            <ListItem><strong>Decoupling</strong>
                <p className="mt-1 text-sm text-starlight-blue/90">PDS, AS, and LHS only depend on DS’s shared types and routing API—no direct inter-plugin dependencies.</p>
            </ListItem>
            <ListItem><strong>Shared Core Types</strong>
                <ul className="list-none mt-1 space-y-0.5 pl-4">
                    <SubListItem><CodeBlock inline>DamageSystemTypes.h</CodeBlock>:
                        <ul className="list-none mt-1 space-y-0.5 pl-4">
                            <SubListItem><CodeBlock inline>FDamageContext</CodeBlock></SubListItem>
                            <SubListItem><CodeBlock inline>ERoundType</CodeBlock></SubListItem>
                            <SubListItem><CodeBlock inline>EProjectileType</CodeBlock></SubListItem>
                        </ul>
                    </SubListItem>
                    <SubListItem><CodeBlock inline>ItemSystemTypes.h</CodeBlock>:
                        <ul className="list-none mt-1 space-y-0.5 pl-4">
                            <SubListItem><CodeBlock inline>EItemInstanceQuality</CodeBlock></SubListItem>
                            <SubListItem><CodeBlock inline>EStatModificationOperand</CodeBlock></SubListItem>
                            <SubListItem><CodeBlock inline>FStatModifier</CodeBlock></SubListItem>
                            <SubListItem><CodeBlock inline>FQualityModifierSet</CodeBlock></SubListItem>
                            <SubListItem><CodeBlock inline>FItemQualityModifierMapping</CodeBlock></SubListItem>
                        </ul>
                    </SubListItem>
                    <SubListItem><CodeBlock inline>MyGameGameplayEffectContext.h</CodeBlock>:
                        <ul className="list-none mt-1 space-y-0.5 pl-4">
                            <SubListItem><CodeBlock inline>FMyGameGameplayEffectContext</CodeBlock> (extends <CodeBlock inline>FGameplayEffectContext</CodeBlock> with <CodeBlock inline>FDamageContext*</CodeBlock> and <CodeBlock inline>HitLimbTag</CodeBlock>)</SubListItem>
                        </ul>
                    </SubListItem>
                </ul>
            </ListItem>
            <ListItem><strong>Extensibility</strong>
                <p className="mt-1 text-sm text-starlight-blue/90">Hooks for global modifiers or custom routing stages can be inserted in the router component.</p>
            </ListItem>
        </ul>
      </CollapsibleSection>

      <hr className="border-shadow-slate/50 my-8"/>

      <CollapsibleSection
        id={sectionId('key-classes-link')}
        title="3. Key C++ Classes & Data Structures"
        isExpanded={!!expandedSections[sectionId('key-classes-link')]}
        onClick={() => toggleExpansion(sectionId('key-classes-link'))}
      >
        <div className="overflow-x-auto bg-deep-space-blue/50 p-3 my-4 rounded-md shadow-inner border border-shadow-slate/60">
            <table className="min-w-full divide-y divide-shadow-slate/40 text-sm">
                <thead className="bg-comet-grey/50">
                    <tr>
                        <th className="px-4 py-2 text-left font-medium text-cyber-teal">Type</th>
                        <th className="px-4 py-2 text-left font-medium text-cyber-teal">Location</th>
                        <th className="px-4 py-2 text-left font-medium text-cyber-teal">Purpose</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-shadow-slate/40">
                    <tr><td className="px-4 py-3 align-top"><CodeBlock inline>FDamageContext</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>DamageSystemTypes.h</CodeBlock></td><td className="px-4 py-3 align-top">Carries all data for a damage event, including projectile info, armor results, and health outcomes.</td></tr>
                    <tr><td className="px-4 py-3 align-top"><CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>DamageSystemTypes.h</CodeBlock></td><td className="px-4 py-3 align-top">Enumerations for round and projectile behavior (moved from PDS).</td></tr>
                    <tr><td className="px-4 py-3 align-top"><CodeBlock inline>EItemInstanceQuality</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>ItemSystemTypes.h</CodeBlock></td><td className="px-4 py-3 align-top">Item/armor quality enums (moved from AS).</td></tr>
                    <tr><td className="px-4 py-3 align-top"><CodeBlock inline>FStatModifier</CodeBlock>, <CodeBlock inline>FQualityModifierSet</CodeBlock>, <CodeBlock inline>FItemQualityModifierMapping</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>ItemSystemTypes.h</CodeBlock></td><td className="px-4 py-3 align-top">Structures for quality-based stat adjustments.</td></tr>
                    <tr><td className="px-4 py-3 align-top"><CodeBlock inline>FMyGameGameplayEffectContext</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>MyGameGameplayEffectContext.h</CodeBlock></td><td className="px-4 py-3 align-top">Custom GE context holding a pointer to the active <CodeBlock inline>FDamageContext</CodeBlock>.</td></tr>
                    <tr><td className="px-4 py-3 align-top"><CodeBlock inline>UDamageRouterComponent</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>DamageRouterComponent.h/.cpp</CodeBlock></td><td className="px-4 py-3 align-top">Drives the damage pipeline; calls into PDS, AS, and LHS in order, then broadcasts outcomes.</td></tr>
                </tbody>
            </table>
        </div>
        <p className="text-sm italic">Module Files: <CodeBlock inline>IDamageSystemModule.h</CodeBlock>, <CodeBlock inline>DamageSystemModule.cpp</CodeBlock>, <CodeBlock inline>DamageSystem.Build.cs</CodeBlock></p>
      </CollapsibleSection>

      <hr className="border-shadow-slate/50 my-8"/>

      <CollapsibleSection
        id={sectionId('directory-structure-link')}
        title="4. Directory Structure"
        isExpanded={!!expandedSections[sectionId('directory-structure-link')]}
        onClick={() => toggleExpansion(sectionId('directory-structure-link'))}
      >
        <CodeBlock language="text">
            {`DamageSystem/
└── Source/
    └── DamageSystem/
        ├── DamageSystem.Build.cs
        ├── Public/
        │   ├── IDamageSystemModule.h
        │   ├── DamageSystemTypes.h
        │   ├── ItemSystemTypes.h
        │   ├── MyGameGameplayEffectContext.h
        │   └── DamageRouterComponent.h
        └── Private/
            ├── DamageSystemModule.cpp
            ├── MyGameGameplayEffectContext.cpp
            └── DamageRouterComponent.cpp`}
        </CodeBlock>
      </CollapsibleSection>

      <hr className="border-shadow-slate/50 my-8"/>

      <CollapsibleSection
        id={sectionId('integration-points-link')}
        title="5. Integration Points"
        isExpanded={!!expandedSections[sectionId('integration-points-link')]}
        onClick={() => toggleExpansion(sectionId('integration-points-link'))}
      >
        <DocSubSubTitle id={sectionId('integration-provider')} title="5.1 Provider of Core Types" />
        <p><strong>LHS</strong>, <strong>AS</strong>, and <strong>PDS</strong> add DS’s plugin as a dependency to consume:</p>
        <ul className="list-none space-y-1 pl-4">
            <SubListItem><CodeBlock inline>FDamageContext</CodeBlock>, <CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock></SubListItem>
            <SubListItem><CodeBlock inline>EItemInstanceQuality</CodeBlock>, <CodeBlock inline>FStatModifier</CodeBlock>, etc.</SubListItem>
            <SubListItem><CodeBlock inline>FMyGameGameplayEffectContext</CodeBlock></SubListItem>
        </ul>

        <DocSubSubTitle id={sectionId('integration-orchestrator')} title="5.2 Orchestrator of Damage Flow" />
        <p><strong>Damage Sources</strong> (PDS, melee, hazards) populate <CodeBlock inline>FDamageContext</CodeBlock> and call:</p>
        <CodeBlock language="cpp">{`Target->FindComponentByClass<UDamageRouterComponent>()->ProcessDamageEvent(Context);`}</CodeBlock>
        <p><strong>Armor Mitigation</strong>:</p>
        <CodeBlock language="cpp">{`ArmorComponent->ProcessDamageInteraction(Context, HitLimbTag, HitBoneName);`}</CodeBlock>
        <p><strong>Health & Effects</strong>:</p>
        <CodeBlock language="cpp">{`UDamageRouterComponent::ProcessHealthAndEffects(Context);
// Creates and applies a GameplayEffect using Context.DirectDamageEffectClassToApply`}</CodeBlock>
        <p><strong>Outcome Broadcasting</strong>:</p>
        <CodeBlock language="cpp">{`UDamageRouterComponent::BroadcastPostDamageOutcomes(Context);
// Triggers GameplayCues based on flags in Context`}</CodeBlock>

        <DocSubSubTitle id={sectionId('integration-gameplaycue')} title="5.3 GameplayCue System" />
        <p>Uses final state in <CodeBlock inline>FDamageContext</CodeBlock> to emit cues (e.g., <CodeBlock inline>Damage.Hit</CodeBlock>, <CodeBlock inline>Damage.ArmorPenetrated</CodeBlock>, <CodeBlock inline>Damage.Killed</CodeBlock>).</p>
      </CollapsibleSection>

      <hr className="border-shadow-slate/50 my-8"/>

      <CollapsibleSection
        id={sectionId('setup-usage-link')}
        title="6. Setup & Usage Notes"
        isExpanded={!!expandedSections[sectionId('setup-usage-link')]}
        onClick={() => toggleExpansion(sectionId('setup-usage-link'))}
      >
        <ul className="list-none space-y-2 pl-0">
            <ListItem><strong>Module Dependencies</strong>: In <strong><CodeBlock inline>LimbHealthSystem.Build.cs</CodeBlock></strong>, <strong><CodeBlock inline>ArmorSystem.Build.cs</CodeBlock></strong>, and <strong><CodeBlock inline>ProjectileSystem.Build.cs</CodeBlock></strong>, add <CodeBlock inline>{`"DamageSystem"`}</CodeBlock> to their <CodeBlock inline>PublicDependencyModuleNames</CodeBlock>. In each plugin&apos;s <CodeBlock inline>.uplugin</CodeBlock> file, list <CodeBlock inline>{`"DamageSystem"`}</CodeBlock> under <CodeBlock inline>{`"Plugins"`}</CodeBlock>.</ListItem>
            <ListItem><strong>Attach Router</strong>: Add <CodeBlock inline>UDamageRouterComponent</CodeBlock> to any actor class that should receive routed damage.</ListItem>
            <ListItem><strong>Populate & Dispatch</strong>: All damage-dealing code must populate <CodeBlock inline>FDamageContext</CodeBlock> (from <CodeBlock inline>DamageSystemTypes.h</CodeBlock>) and call <CodeBlock inline>ProcessDamageEvent()</CodeBlock> on the router.</ListItem>
            <ListItem><strong>GameplayEffect Requirements</strong>: Effects referenced by <CodeBlock inline>Context.DirectDamageEffectClassToApply</CodeBlock> must implement an <CodeBlock inline>ExecutionCalculation</CodeBlock> that:
                <ol className="list-decimal list-inside ml-4 mt-1 text-sm doc-ordered-list">
                    <li>Retrieves <CodeBlock inline>FMyGameGameplayEffectContext</CodeBlock>.</li>
                    <li>Reads the SetByCaller <CodeBlock inline>{`"Data.Damage"`}</CodeBlock>.</li>
                    <li>Applies damage to the correct limb attribute based on <CodeBlock inline>HitLimbTag</CodeBlock>.</li>
                </ol>
            </ListItem>
            <ListItem><strong>Extending the Router</strong>: You can subclass <CodeBlock inline>UDamageRouterComponent</CodeBlock> or bind to its events to insert custom stages (e.g., world effects, AI reactions).</ListItem>
        </ul>
      </CollapsibleSection>

    </article>
  );
};

export default DamageSystemDocContent;
