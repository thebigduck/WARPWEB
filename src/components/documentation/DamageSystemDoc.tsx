import React from 'react';
import { CodeBlock, ListItem, SubListItem, DocSubTitle, DocSubSubTitle } from '@/components/ui'; // Removed DocSubSubSubTitle
import { DocumentationArticleProps } from '@/types';

const DamageSystemDoc: React.FC<DocumentationArticleProps> = ({ expandedSections, toggleExpansion }) => {
  const getSectionId = (baseId: string) => `ds-plugin-${baseId}`; // Helper to ensure unique IDs
  const q = String.fromCharCode(34); // Double quote character

  return (
    <article className="space-y-8 doc-article">
      <section id={getSectionId('overview-link')}>
        <DocSubTitle 
            id={getSectionId('overview-sublink')} 
            onClick={() => toggleExpansion(getSectionId('overview-sublink'))} 
            isExpanded={!!expandedSections[getSectionId('overview-sublink')]}
        >
            1. Overview
        </DocSubTitle>
        {expandedSections[getSectionId('overview-sublink')] && (
            <div className="pl-6 pt-3 space-y-3">
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
            </div>
        )}
      </section>

      <section id={getSectionId('core-features-link')}>
        <DocSubTitle 
            id={getSectionId('core-features-sublink')}
            onClick={() => toggleExpansion(getSectionId('core-features-sublink'))}
            isExpanded={!!expandedSections[getSectionId('core-features-sublink')]}
        >
            2. Core Features
        </DocSubTitle>
        {expandedSections[getSectionId('core-features-sublink')] && (
            <div className="pl-6 pt-3 space-y-3">
                 <ul className="list-none space-y-1 pl-0">
                    <ListItem><strong>Centralized Damage Data</strong>: <CodeBlock inline>FDamageContext</CodeBlock> encapsulates source, target, projectile data, armor results, health results, and outcome flags.</ListItem>
                    <ListItem><strong>Ordered Processing</strong>: <CodeBlock inline>{`${q}UDamageRouterComponent::ProcessDamageEvent()${q}`}</CodeBlock> enforces a consistent flow across all subsystems.</ListItem>
                    <ListItem><strong>Decoupling</strong>: PDS, AS, and LHS only depend on DS’s shared types and routing API—no direct inter-plugin dependencies.</ListItem>
                    <ListItem><strong>Shared Core Types</strong>:
                        <ul className="list-none mt-1 space-y-0.5 pl-4">
                            <SubListItem><CodeBlock inline>DamageSystemTypes.h</CodeBlock>: <CodeBlock inline>FDamageContext</CodeBlock>, <CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock></SubListItem>
                            <SubListItem><CodeBlock inline>ItemSystemTypes.h</CodeBlock>: <CodeBlock inline>EItemInstanceQuality</CodeBlock>, <CodeBlock inline>EStatModificationOperand</CodeBlock>, <CodeBlock inline>FStatModifier</CodeBlock>, <CodeBlock inline>FQualityModifierSet</CodeBlock>, <CodeBlock inline>FItemQualityModifierMapping</CodeBlock></SubListItem>
                            <SubListItem><CodeBlock inline>MyGameGameplayEffectContext.h</CodeBlock>: <CodeBlock inline>FMyGameGameplayEffectContext</CodeBlock> (extends <CodeBlock inline>FGameplayEffectContext</CodeBlock> with <CodeBlock inline>FDamageContext*</CodeBlock> and <CodeBlock inline>HitLimbTag</CodeBlock>)</SubListItem>
                        </ul>
                    </ListItem>
                    <ListItem><strong>Extensibility</strong>: Hooks for global modifiers or custom routing stages can be inserted in the router component.</ListItem>
                </ul>
            </div>
        )}
      </section>

      <section id={getSectionId('key-classes-link')}>
        <DocSubTitle 
            id={getSectionId('key-classes-sublink')}
            onClick={() => toggleExpansion(getSectionId('key-classes-sublink'))}
            isExpanded={!!expandedSections[getSectionId('key-classes-sublink')]}
        >
            3. Key C++ Classes & Data Structures
        </DocSubTitle>
        {expandedSections[getSectionId('key-classes-sublink')] && (
            <div className="pl-6 pt-3 space-y-3">
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
                            <tr><td className="px-4 py-3 align-top"><CodeBlock inline>EItemInstanceQuality</CodeBlock>,</td><td className="px-4 py-3 align-top"><CodeBlock inline>ItemSystemTypes.h</CodeBlock></td><td className="px-4 py-3 align-top">Item/armor quality enums (moved from AS).</td></tr>
                            <tr><td className="px-4 py-3 align-top"><CodeBlock inline>FStatModifier</CodeBlock>, <CodeBlock inline>FQualityModifierSet</CodeBlock>,<CodeBlock inline>FItemQualityModifierMapping</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>ItemSystemTypes.h</CodeBlock></td><td className="px-4 py-3 align-top">Structures for quality-based stat adjustments.</td></tr>
                            <tr><td className="px-4 py-3 align-top"><CodeBlock inline>FMyGameGameplayEffectContext</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>MyGameGameplayEffectContext.h</CodeBlock></td><td className="px-4 py-3 align-top">Custom GE context holding a pointer to the active <CodeBlock inline>FDamageContext</CodeBlock>.</td></tr>
                            <tr><td className="px-4 py-3 align-top"><CodeBlock inline>UDamageRouterComponent</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>DamageRouterComponent.h/.cpp</CodeBlock></td><td className="px-4 py-3 align-top">Drives the damage pipeline; calls into PDS, AS, and LHS in order, then broadcasts outcomes.</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-sm italic">Module Files: <CodeBlock inline>IDamageSystemModule.h</CodeBlock>, <CodeBlock inline>DamageSystemModule.cpp</CodeBlock>, <CodeBlock inline>DamageSystem.Build.cs</CodeBlock></p>
            </div>
        )}
      </section>

      <section id={getSectionId('directory-structure-link')}>
        <DocSubTitle 
            id={getSectionId('directory-structure-sublink')}
            onClick={() => toggleExpansion(getSectionId('directory-structure-sublink'))}
            isExpanded={!!expandedSections[getSectionId('directory-structure-sublink')]}
        >
            4. Directory Structure
        </DocSubTitle>
        {expandedSections[getSectionId('directory-structure-sublink')] && (
            <div className="pl-6 pt-3 space-y-3">
                 <CodeBlock>{`DamageSystem/                          ← Plugin root
└── Source/
    └── DamageSystem/                 ← Module root
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
            └── DamageRouterComponent.cpp`}</CodeBlock>
            </div>
        )}
      </section>

      <section id={getSectionId('integration-points-link')}>
        <DocSubTitle 
            id={getSectionId('integration-points-sublink')}
            onClick={() => toggleExpansion(getSectionId('integration-points-sublink'))}
            isExpanded={!!expandedSections[getSectionId('integration-points-sublink')]}
        >
            5. Integration Points
        </DocSubTitle>
        {expandedSections[getSectionId('integration-points-sublink')] && (
            <div className="pl-6 pt-3 space-y-3">
                <DocSubSubTitle id={getSectionId('integration-provider')}>5.1 Provider of Core Types</DocSubSubTitle>
                <p>LHS, AS, and PDS add DS’s plugin as a dependency to consume:</p>
                <ul className="list-none space-y-1 pl-0">
                    <ListItem><CodeBlock inline>FDamageContext</CodeBlock>, <CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock></ListItem>
                    <ListItem><CodeBlock inline>EItemInstanceQuality</CodeBlock>, <CodeBlock inline>FStatModifier</CodeBlock>, etc.</ListItem>
                    <ListItem><CodeBlock inline>FMyGameGameplayEffectContext</CodeBlock></ListItem>
                </ul>

                <DocSubSubTitle id={getSectionId('integration-orchestrator')}>5.2 Orchestrator of Damage Flow</DocSubSubTitle>
                <p>Damage Sources (PDS, melee, hazards) populate <CodeBlock inline>FDamageContext</CodeBlock> and call:</p>
                <CodeBlock>{`Target->FindComponentByClass<UDamageRouterComponent>()->ProcessDamageEvent(Context);`}</CodeBlock>
                <p>Armor Mitigation:</p>
                <CodeBlock>{`ArmorComponent->ProcessDamageInteraction(Context, HitLimbTag, HitBoneName);`}</CodeBlock>
                <p>Health & Effects:</p>
                <CodeBlock>{`UDamageRouterComponent::ProcessHealthAndEffects(Context);
// Creates and applies a GameplayEffect using Context.DirectDamageEffectClassToApply`}</CodeBlock>
                <p>Outcome Broadcasting:</p>
                <CodeBlock>{`UDamageRouterComponent::BroadcastPostDamageOutcomes(Context);
// Triggers GameplayCues based on flags in Context`}</CodeBlock>

                <DocSubSubTitle id={getSectionId('integration-gameplaycue')}>5.3 GameplayCue System</DocSubSubTitle>
                <p>Uses final state in <CodeBlock inline>FDamageContext</CodeBlock> to emit cues (e.g., <CodeBlock inline>Damage.Hit</CodeBlock>, <CodeBlock inline>Damage.ArmorPenetrated</CodeBlock>, <CodeBlock inline>Damage.Killed</CodeBlock>).</p>
            </div>
        )}
      </section>

      <section id={getSectionId('setup-usage-link')}>
        <DocSubTitle 
            id={getSectionId('setup-usage-sublink')}
            onClick={() => toggleExpansion(getSectionId('setup-usage-sublink'))}
            isExpanded={!!expandedSections[getSectionId('setup-usage-sublink')]}
        >
            6. Setup & Usage Notes
        </DocSubTitle>
        {expandedSections[getSectionId('setup-usage-sublink')] && (
            <div className="pl-6 pt-3 space-y-3">
                <ul className="list-none space-y-1 pl-0">
                    <ListItem><strong>Module Dependencies</strong>: In <strong><CodeBlock inline>LimbHealthSystem.Build.cs</CodeBlock></strong>, <strong><CodeBlock inline>ArmorSystem.Build.cs</CodeBlock></strong>, and <strong><CodeBlock inline>ProjectileSystem.Build.cs</CodeBlock></strong>, add <CodeBlock inline>{`${q}DamageSystem${q}`}</CodeBlock> to their <CodeBlock inline>PublicDependencyModuleNames</CodeBlock>. In each plugin’s <CodeBlock inline>.uplugin</CodeBlock>, list <CodeBlock inline>{`${q}DamageSystem${q}`}</CodeBlock> under <CodeBlock inline>{`${q}Plugins${q}`}</CodeBlock>.</ListItem>
                    <ListItem><strong>Attach Router</strong>: Add <CodeBlock inline>UDamageRouterComponent</CodeBlock> to any actor class that should receive routed damage.</ListItem>
                    <ListItem><strong>Populate & Dispatch</strong>: All damage-dealing code must populate <CodeBlock inline>FDamageContext</CodeBlock> (from <CodeBlock inline>DamageSystemTypes.h</CodeBlock>) and call <CodeBlock inline>ProcessDamageEvent()</CodeBlock> on the router.</ListItem>
                    <ListItem><strong>GameplayEffect Requirements</strong>: Effects referenced by <CodeBlock inline>Context.DirectDamageEffectClassToApply</CodeBlock> must implement an <CodeBlock inline>ExecutionCalculation</CodeBlock> that:
                        <ol className="list-decimal list-inside ml-4 mt-1 text-sm doc-ordered-list">
                            <li>Retrieves <CodeBlock inline>FMyGameGameplayEffectContext</CodeBlock>.</li>
                            <li>Reads the SetByCaller <CodeBlock inline>{`${q}Data.Damage${q}`}</CodeBlock>.</li>
                            <li>Applies damage to the correct limb attribute based on <CodeBlock inline>HitLimbTag</CodeBlock>.</li>
                        </ol>
                    </ListItem>
                    <ListItem><strong>Extending the Router</strong>: You can subclass <CodeBlock inline>UDamageRouterComponent</CodeBlock> or bind to its events to insert custom stages (e.g., world effects, AI reactions).</ListItem>
                </ul>
            </div>
        )}
      </section>
    </article>
  );
};
export default DamageSystemDoc;
