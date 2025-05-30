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

const ArmorSystemDocContent: React.FC<DocumentationArticleProps> = ({ parentId, expandedSections, toggleExpansion, getSectionId }) => {
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
        <p>The <strong>Armor System (AS)</strong> plugin provides a data-driven framework for equippable armor pieces that protect characters from damage. It manages:</p>
        <ul className="list-none space-y-1 pl-0">
            <ListItem><strong>Durability</strong> — per-piece durability that degrades on impact and can be repaired.</ListItem>
            <ListItem><strong>Quality Tiers</strong> — discrete quality levels (e.g. Shoddy, Common, Fine, Masterwork, Legendary) that modify base stats.</ListItem>
            <ListItem><strong>Material Properties</strong> — each material (<CodeBlock inline>UMaterialTypeDataAsset</CodeBlock>) defines penetration resistance, ricochet chance, spall generation, density, and brittleness.</ListItem>
            <ListItem><strong>Damage Interaction</strong> — integrates with the central Damage System (<CodeBlock inline>FDamageContext</CodeBlock>) to calculate mitigation.</ListItem>
            <ListItem><strong>Limb Coverage</strong> — defines which limbs are protected via <CodeBlock inline>FGameplayTag</CodeBlock> coverage sets.</ListItem>
            <ListItem><strong>GAS Integration</strong> — grants <CodeBlock inline>UGameplayEffects</CodeBlock> & <CodeBlock inline>FGameplayTag</CodeBlock> containers when equipped.</ListItem>
            <ListItem><strong>Data-Driven</strong> — all archetypes, materials, and quality modifiers are defined in <CodeBlock inline>UDataAsset</CodeBlock> classes.</ListItem>
        </ul>
        <p>This plugin depends on the <strong>Damage System (DS)</strong> for shared types and the damage routing pipeline, and complements the Limb Health System (LHS) and Projectile System (PDS).</p>
      </CollapsibleSection>

      <hr className="border-shadow-slate/50 my-8"/>

      <CollapsibleSection
        id={sectionId('core-features-link')}
        title="2. Core Features"
        isExpanded={!!expandedSections[sectionId('core-features-link')]}
        onClick={() => toggleExpansion(sectionId('core-features-link'))}
      >
        <ol className="list-none space-y-3 pl-0">
            <ListItem ordered><strong>Equippable Armor:</strong> Characters can equip/unequip armor to named slots (e.g., Head, Chest, Arms, Legs).</ListItem>
            <ListItem ordered><strong>Durability Management:</strong>
                <ul className="list-none mt-1 space-y-0.5 pl-4">
                    <SubListItem><CodeBlock inline>CurrentDurability</CodeBlock> and <CodeBlock inline>MaxDurability</CodeBlock> per instance</SubListItem>
                    <SubListItem>Server-authoritative repair and break-on-zero logic</SubListItem>
                </ul>
            </ListItem>
            <ListItem ordered><strong>Quality Tiers:</strong> Uses <CodeBlock inline>EItemInstanceQuality</CodeBlock> from <CodeBlock inline>ItemSystemTypes.h</CodeBlock> (DS). Quality mappings adjust durability, weight, resistance, and passive effects.</ListItem>
            <ListItem ordered><strong>Material-Based Interactions:</strong> <CodeBlock inline>UMaterialTypeDataAsset</CodeBlock> defines material factors (penetration, ricochet, spall). Interacts with projectile data (<CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock> from <CodeBlock inline>DamageSystemTypes.h</CodeBlock>).</ListItem>
            <ListItem ordered><strong>Limb Coverage:</strong> <CodeBlock inline>CoverageTags</CodeBlock> in each archetype identify protected limbs via LHS tags (e.g., <CodeBlock inline>Tag.Limb.Head</CodeBlock>).</ListItem>
            <ListItem ordered><strong>GAS Integration:</strong> Grants passive effects (<CodeBlock inline>UGameplayEffect</CodeBlock> classes) and tags while equipped. Effects removed on unequip.</ListItem>
            <ListItem ordered><strong>Data-Driven Design:</strong> <CodeBlock inline>UArmorArchetypeDataAsset</CodeBlock> for base stats, visuals, coverage, quality modifiers. <CodeBlock inline>UMaterialTypeDataAsset</CodeBlock> for intrinsic material definitions.</ListItem>
        </ol>
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
                    <tr><td className="px-4 py-3 align-top"><CodeBlock inline>UArmorSystemComponent</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>UActorComponent</CodeBlock></td><td className="px-4 py-3 align-top">Manages equipped pieces, handles equip/unequip RPCs, processes <CodeBlock inline>{`ProcessDamageInteraction(FDamageContext&)`}</CodeBlock>.</td></tr>
                    <tr><td className="px-4 py-3 align-top"><CodeBlock inline>FArmorPieceInstance</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>struct</CodeBlock> (ArmorSystemTypes.h)</td><td className="px-4 py-3 align-top">Runtime data: archetype reference, quality, current/max durability, socket name, mesh component pointer.</td></tr>
                    <tr><td className="px-4 py-3 align-top"><CodeBlock inline>FEquippedArmorSlotInfo</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>struct</CodeBlock> (ArmorSystemTypes.h)</td><td className="px-4 py-3 align-top">Helper struct: slot tag + <CodeBlock inline>FArmorPieceInstance</CodeBlock>, used in replication array.</td></tr>
                    <tr><td className="px-4 py-3 align-top"><CodeBlock inline>UArmorArchetypeDataAsset</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>UPrimaryDataAsset</CodeBlock></td><td className="px-4 py-3 align-top">Defines base stats (durability, thickness, weight), visuals, coverage tags, material, and quality mappings.</td></tr>
                    <tr><td className="px-4 py-3 align-top"><CodeBlock inline>UMaterialTypeDataAsset</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>UDataAsset</CodeBlock></td><td className="px-4 py-3 align-top">Defines material factors: <CodeBlock inline>PenetrationResistanceFactor</CodeBlock>, <CodeBlock inline>RicochetChanceMultiplier</CodeBlock>, <CodeBlock inline>SpallGenerationFactor</CodeBlock>, <CodeBlock inline>DensityKgm3</CodeBlock>, <CodeBlock inline>BrittlenessFactor</CodeBlock>.</td></tr>
                    <tr><td className="px-4 py-3 align-top"><CodeBlock inline>ArmorSystemTypes.h</CodeBlock></td><td className="px-4 py-3 align-top">Header</td><td className="px-4 py-3 align-top">Declares <CodeBlock inline>FArmorPieceInstance</CodeBlock>, <CodeBlock inline>FEquippedArmorSlotInfo</CodeBlock>, any AS-specific enums/structs.</td></tr>
                </tbody>
            </table>
        </div>
        <p className="text-sm italic">Module Files:</p>
        <ul className="list-none space-y-0.5 pl-4">
            <SubListItem><CodeBlock inline>IArmorSystemModule.h</CodeBlock> — public module interface</SubListItem>
            <SubListItem><CodeBlock inline>ArmorSystemModule.cpp</CodeBlock> — module startup/shutdown</SubListItem>
            <SubListItem><CodeBlock inline>ArmorSystem.Build.cs</CodeBlock> — declares dependencies (includes <CodeBlock inline>{`"DamageSystem"`}</CodeBlock>)</SubListItem>
        </ul>
      </CollapsibleSection>

      <hr className="border-shadow-slate/50 my-8"/>

      <CollapsibleSection
        id={sectionId('directory-structure-link')}
        title="4. Directory Structure"
        isExpanded={!!expandedSections[sectionId('directory-structure-link')]}
        onClick={() => toggleExpansion(sectionId('directory-structure-link'))}
      >
        <CodeBlock language="text">
            {`ArmorSystem/
└── Source/
    └── ArmorSystem/
        ├── ArmorSystem.Build.cs
        ├── Public/
        │   ├── IArmorSystemModule.h
        │   ├── ArmorSystemTypes.h
        │   ├── MaterialTypeDataAsset.h
        │   ├── ArmorArchetypeDataAsset.h
        │   └── ArmorSystemComponent.h
        └── Private/
            ├── ArmorSystemModule.cpp
            ├── MaterialTypeDataAsset.cpp
            ├── ArmorArchetypeDataAsset.cpp
            └── ArmorSystemComponent.cpp`}
        </CodeBlock>
        <p className="text-sm italic text-starlight-blue/70 mt-2 p-3 bg-blue-900/20 rounded-md border border-blue-700/30"><strong>Note:</strong> <CodeBlock inline>ItemSystemTypes.h</CodeBlock>, <CodeBlock inline>DamageSystemTypes.h</CodeBlock>, and <CodeBlock inline>MyGameGameplayEffectContext.h</CodeBlock> are now owned by the <strong>DamageSystem</strong> plugin.</p>
      </CollapsibleSection>
      
      <hr className="border-shadow-slate/50 my-8"/>

      <CollapsibleSection
        id={sectionId('integration-points-link')}
        title="5. Integration Points"
        isExpanded={!!expandedSections[sectionId('integration-points-link')]}
        onClick={() => toggleExpansion(sectionId('integration-points-link'))}
      >
        <DocSubSubTitle id={sectionId('integration-ds')} title="5.1 Damage System (DS)"/>
        <p className="font-medium text-nebula-aqua">Shared Types:</p>
        <ul className="list-none space-y-1 pl-0">
            <ListItem><CodeBlock inline>ItemSystemTypes.h</CodeBlock> for <CodeBlock inline>EItemInstanceQuality</CodeBlock>, <CodeBlock inline>FStatModifier</CodeBlock>, etc.</ListItem>
            <ListItem><CodeBlock inline>DamageSystemTypes.h</CodeBlock> for <CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock>.</ListItem>
            <ListItem><CodeBlock inline>FDamageContext</CodeBlock> struct.</ListItem>
        </ul>
        <p className="font-medium text-nebula-aqua mt-3">Damage Routing:</p>
        <p><CodeBlock inline>UDamageRouterComponent</CodeBlock> invokes</p>
        <CodeBlock language="cpp">{`ArmorComponent->ProcessDamageInteraction(FDamageContext& Context, FGameplayTag HitLimbTag, FName HitBoneName);`}</CodeBlock>
        <p>AS updates <CodeBlock inline>Context.CurrentDamageToApply</CodeBlock>, <CodeBlock inline>Context.bArmorWasHit</CodeBlock>, <CodeBlock inline>Context.bArmorPenetrated</CodeBlock>, <CodeBlock inline>Context.DamageAbsorbedByArmor</CodeBlock>, etc.</p>
        
        <DocSubSubTitle id={sectionId('integration-lhs')} title="5.2 Limb Health System (LHS)"/>
        <p><CodeBlock inline>CoverageTags</CodeBlock> in <CodeBlock inline>UArmorArchetypeDataAsset</CodeBlock> must match LHS limb tags (e.g., <CodeBlock inline>Tag.Limb.Chest</CodeBlock>) so that AS correctly identifies which limb a given hit affects.</p>
        
        <DocSubSubTitle id={sectionId('integration-pds')} title="5.3 Projectile System (PDS)"/> 
        <p><CodeBlock inline>FDamageContext</CodeBlock> fields populated by PDS (mass, caliber, round type, behavior type) feed into AS’s mitigation calculations using material factors.</p>
      </CollapsibleSection>

      <hr className="border-shadow-slate/50 my-8"/>

      <CollapsibleSection
        id={sectionId('setup-usage-link')}
        title="6. Setup & Usage Notes"
        isExpanded={!!expandedSections[sectionId('setup-usage-link')]}
        onClick={() => toggleExpansion(sectionId('setup-usage-link'))}
      >
        <ol className="list-none space-y-3 pl-0">
            <ListItem ordered><strong>Add Component</strong>
                <CodeBlock language="cpp">{`// In your Character
UPROPERTY(VisibleAnywhere) UArmorSystemComponent* ArmorComponent;`}</CodeBlock>
            </ListItem>
            <ListItem ordered><strong>Module Dependency</strong>
                <p className="mt-1">In <strong><CodeBlock inline>ArmorSystem.Build.cs</CodeBlock></strong>:</p>
                <CodeBlock language="csharp">{`PublicDependencyModuleNames.AddRange(new string[]{
    "Core", "CoreUObject", "Engine",
    "GameplayTags", "GameplayAbilities",
    "DamageSystem"
});`}</CodeBlock>
                <p className="mt-1">In <strong><CodeBlock inline>ArmorSystem.uplugin</CodeBlock></strong>, add <CodeBlock inline>{`"DamageSystem"`}</CodeBlock> under <CodeBlock inline>{`"Plugins"`}</CodeBlock>.</p>
            </ListItem>
            <ListItem ordered><strong>Data Asset Creation</strong>
                <ul className="list-none mt-1 space-y-0.5 pl-4">
                    <SubListItem><strong>Material Assets</strong> (<CodeBlock inline>UMaterialTypeDataAsset</CodeBlock>): define material factors.</SubListItem>
                    <SubListItem><strong>Archetype Assets</strong> (<CodeBlock inline>UArmorArchetypeDataAsset</CodeBlock>):
                        <ul className="list-none mt-1 space-y-0.5 pl-4">
                            <SubListItem>Assign <CodeBlock inline>MaterialTypeDataAssetClass</CodeBlock></SubListItem>
                            <SubListItem>Set <CodeBlock inline>BaseMaxDurability</CodeBlock>, <CodeBlock inline>BaseArmorThicknessCm</CodeBlock>, <CodeBlock inline>BaseWeightKg</CodeBlock></SubListItem>
                            <SubListItem>Configure <CodeBlock inline>CoverageTags</CodeBlock> (FGameplayTagContainer of LHS limb tags)</SubListItem>
                            <SubListItem>Populate <CodeBlock inline>QualityStatModifiers</CodeBlock> (using mappings from <CodeBlock inline>ItemSystemTypes.h</CodeBlock>)</SubListItem>
                        </ul>
                    </SubListItem>
                </ul>
            </ListItem>
            <ListItem ordered><strong>Equipping Logic</strong>
                <p className="mt-1">Implement inventory/equipment UI or code to call on server:</p>
                <CodeBlock language="cpp">{`ArmorComponent->Server_EquipArmor(ArchetypeData, DesiredQuality, SlotTag);`}</CodeBlock>
                <p className="mt-1">On unequip:</p>
                <CodeBlock language="cpp">{`ArmorComponent->Server_UnequipArmor(SlotTag);`}</CodeBlock>
            </ListItem>
            <ListItem ordered><strong>ProcessDamageInteraction</strong>
                <p className="mt-1">Override or extend to incorporate full ballistic logic:</p>
                <CodeBlock language="cpp">{`void UArmorSystemComponent::ProcessDamageInteraction(
    FDamageContext& Context,
    FGameplayTag HitLimbTag,
    FName HitBoneName
);`}</CodeBlock>
                <p className="mt-1">Use <CodeBlock inline>Context.ProjectileMassKg</CodeBlock>, <CodeBlock inline>Context.ProjectileCaliberMm</CodeBlock>, <CodeBlock inline>Context.ProjectileRoundType</CodeBlock> with material factors to compute:</p>
                <ul className="list-none space-y-0.5 pl-4">
                    <SubListItem>Penetration chance</SubListItem>
                    <SubListItem>Ricochet probability</SubListItem>
                    <SubListItem>Spall energy</SubListItem>
                </ul>
                <p>Update <CodeBlock inline>Context.CurrentDamageToApply</CodeBlock> and reduce <CodeBlock inline>CurrentDurability</CodeBlock>.</p>
            </ListItem>
        </ol>
      </CollapsibleSection>

    </article>
  );
};

// Define CollapsibleSection here as it's used internally by this specific doc component structure
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

export default ArmorSystemDocContent;
