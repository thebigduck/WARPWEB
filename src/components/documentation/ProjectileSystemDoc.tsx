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

const ProjectileSystemDocContent: React.FC<DocumentationArticleProps> = ({ parentId, expandedSections, toggleExpansion, getSectionId }) => {
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
        <p>The <strong>Projectile System (PDS)</strong> plugin manages the creation, simulation, and impact processing of all projectile types in your FPS game. It handles:</p>
        <ul className="list-none space-y-1 pl-0">
            <ListItem><strong>Projectile Movement & Collision:</strong> Instantaneous hitscan traces or physically simulated projectiles via <CodeBlock inline>UProjectileMovementComponent</CodeBlock>.</ListItem>
            <ListItem><strong>Damage Calculation & Effects:</strong> Populates <CodeBlock inline>FDamageContext</CodeBlock> (from DS) and invokes the central damage pipeline.</ListItem>
            <ListItem><strong>Advanced Ballistics:</strong> Ricochet, spall generation, environmental penetration, and configurable fragmentation.</ListItem>
            <ListItem><strong>Object Pooling (Recommended):</strong> Designed for reuse of <CodeBlock inline>ABaseProjectile</CodeBlock> instances to minimize runtime allocation.</ListItem>
            <ListItem><strong>Server-Authoritative Replication:</strong> All spawn, movement, and hit logic runs on the server; clients receive cosmetic updates.</ListItem>
        </ul>
        <p>This plugin is standalone but depends on the <strong>Damage System (DS)</strong> for core types and orchestration, and integrates upstream with the Armor System (AS) and Limb Health System (LHS).</p>
      </CollapsibleSection>

      <hr className="border-shadow-slate/50 my-8"/>

      <CollapsibleSection
        id={sectionId('core-features-link')}
        title="2. Core Features"
        isExpanded={!!expandedSections[sectionId('core-features-link')]}
        onClick={() => toggleExpansion(sectionId('core-features-link'))}
      >
        <ol className="list-none space-y-3 pl-0">
            <ListItem ordered><strong>Diverse Projectile Types</strong>
                <ul className="list-none mt-1 space-y-0.5 pl-4">
                    <SubListItem><CodeBlock inline>Hitscan</CodeBlock></SubListItem>
                    <SubListItem><CodeBlock inline>PhysicalBullet</CodeBlock> (mass, drag, gravity)</SubListItem>
                    <SubListItem><CodeBlock inline>Grenade</CodeBlock>, <CodeBlock inline>Rocket</CodeBlock>, etc., via <CodeBlock inline>EProjectileType</CodeBlock> (from <strong>DS</strong>).</SubListItem>
                </ul>
            </ListItem>
            <ListItem ordered><strong>Varied Round Types</strong>
                <p className="mt-1 text-sm text-starlight-blue/90"><CodeBlock inline>FMJ</CodeBlock>, <CodeBlock inline>AP</CodeBlock>, <CodeBlock inline>HP</CodeBlock>, <CodeBlock inline>Incendiary</CodeBlock>, etc., via <CodeBlock inline>ERoundType</CodeBlock> (from <strong>DS</strong>). Round type governs penetration, damage, and special effects.</p>
            </ListItem>
            <ListItem ordered><strong>Data-Driven Archetypes</strong>
                <p className="mt-1 text-sm text-starlight-blue/90"><CodeBlock inline>UProjectileArchetypeDataAsset</CodeBlock> defines all behavior: velocity, mass, caliber, round type, damage, and VFX/SFX.</p>
            </ListItem>
            <ListItem ordered><strong>Advanced Ballistics</strong>
                 <ul className="list-none mt-1 space-y-0.5 pl-4">
                    <SubListItem><strong>Ricochet</strong>: Bounce probability and angle configured in <CodeBlock inline>FProjectileRicochetConfig</CodeBlock>.</SubListItem>
                    <SubListItem><strong>Spall</strong>: Secondary fragment generation via <CodeBlock inline>FProjectileSpallConfig</CodeBlock>.</SubListItem>
                    <SubListItem><strong>Penetration</strong>: Multi-surface penetration based on material resistance.</SubListItem>
                    <SubListItem><strong>Fragmentation</strong>: Configurable sub-munition spawning on impact.</SubListItem>
                </ul>
            </ListItem>
            <ListItem ordered><strong>Damage & GameplayEffects</strong>
                <p className="mt-1 text-sm text-starlight-blue/90">On impact, fills <CodeBlock inline>FDamageContext</CodeBlock> (from <strong>DS</strong>) and calls <CodeBlock inline>{`UDamageRouterComponent::ProcessDamageEvent()`}</CodeBlock>. Uses <CodeBlock inline>DirectDamageEffectClassToApply</CodeBlock> from the archetype to apply damage via GAS.</p>
            </ListItem>
            <ListItem ordered><strong>Object Pooling</strong>
                <p className="mt-1 text-sm text-starlight-blue/90">Supports reuse of <CodeBlock inline>ABaseProjectile</CodeBlock> actors to reduce GC and improve performance.</p>
            </ListItem>
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
                    <tr><td className="px-4 py-3 align-top"><CodeBlock inline>ABaseProjectile</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>AActor</CodeBlock></td><td className="px-4 py-3 align-top">Base class for all physical projectiles: lifecycle, movement, collision, and impact processing.</td></tr>
                    <tr><td className="px-4 py-3 align-top"><CodeBlock inline>UProjectileArchetypeDataAsset</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>UPrimaryDataAsset</CodeBlock></td><td className="px-4 py-3 align-top">Defines stats and behaviors: <br/>- <CodeBlock inline>MassKg</CodeBlock>, <CodeBlock inline>CaliberMm</CodeBlock>, <CodeBlock inline>Velocity</CodeBlock><br/>- <CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock><br/>- <CodeBlock inline>BaseDamageAmount</CodeBlock>, <CodeBlock inline>DamageTypeClass</CodeBlock><br/>- <CodeBlock inline>RicochetConfig</CodeBlock>, <CodeBlock inline>SpallConfig</CodeBlock><br/>- <CodeBlock inline>DirectDamageGameplayEffectClass</CodeBlock></td></tr>
                    <tr><td className="px-4 py-3 align-top"><CodeBlock inline>ProjectileSystemTypes.h</CodeBlock></td><td className="px-4 py-3 align-top">Header</td><td className="px-4 py-3 align-top">PDS-specific structs: <br/>- <CodeBlock inline>FProjectileRicochetConfig</CodeBlock><br/>- <CodeBlock inline>FProjectileSpallConfig</CodeBlock><br/>- <CodeBlock inline>FProjectileImpactPayload</CodeBlock> (initial impact data for <CodeBlock inline>FDamageContext</CodeBlock>)</td></tr>
                    <tr><td className="px-4 py-3 align-top"><CodeBlock inline>ItemSystemTypes.h</CodeBlock> (DS)</td><td className="px-4 py-3 align-top">Header</td><td className="px-4 py-3 align-top">Shared types for ammo quality: <CodeBlock inline>EItemInstanceQuality</CodeBlock>, <CodeBlock inline>FStatModifier</CodeBlock>, <CodeBlock inline>FQualityModifierSet</CodeBlock>.</td></tr>
                    <tr><td className="px-4 py-3 align-top"><CodeBlock inline>DamageSystemTypes.h</CodeBlock> (DS)</td><td className="px-4 py-3 align-top">Header</td><td className="px-4 py-3 align-top">Shared enums: <CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock>, plus the <CodeBlock inline>FDamageContext</CodeBlock> struct.</td></tr>
                </tbody>
            </table>
        </div>
        <p className="text-sm italic">Module Files:</p>
        <ul className="list-none space-y-0.5 pl-4">
            <SubListItem><CodeBlock inline>IProjectileSystemModule.h</CodeBlock> — public interface</SubListItem>
            <SubListItem><CodeBlock inline>ProjectileSystemModule.cpp</CodeBlock> — module startup/shutdown</SubListItem>
            <SubListItem><CodeBlock inline>ProjectileSystem.Build.cs</CodeBlock> — declares dependency on <CodeBlock inline>{`"DamageSystem"`}</CodeBlock></SubListItem>
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
            {`ProjectileSystem/
└── Source/
    └── ProjectileSystem/
        ├── ProjectileSystem.Build.cs
        ├── Public/
        │   ├── IProjectileSystemModule.h
        │   ├── ProjectileSystemTypes.h    ← includes DS’s DamageSystemTypes.h
        │   ├── ProjectileArchetypeDataAsset.h
        │   └── ABaseProjectile.h
        └── Private/
            ├── ProjectileSystemModule.cpp
            ├── ProjectileArchetypeDataAsset.cpp
            └── ABaseProjectile.cpp`}
        </CodeBlock>
        <p className="text-sm italic text-starlight-blue/70 mt-2 p-3 bg-blue-900/20 rounded-md border border-blue-700/30"><strong>Note:</strong> <CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock>, <CodeBlock inline>FDamageContext</CodeBlock>, and <CodeBlock inline>ItemSystemTypes.h</CodeBlock> are now defined in the <strong>DamageSystem</strong> plugin.</p>
      </CollapsibleSection>

      <hr className="border-shadow-slate/50 my-8"/>

      <CollapsibleSection
        id={sectionId('integration-points-link')}
        title="5. Integration Points"
        isExpanded={!!expandedSections[sectionId('integration-points-link')]}
        onClick={() => toggleExpansion(sectionId('integration-points-link'))}
      >
        <DocSubSubTitle id={sectionId('integration-ds')}>5.1 Damage System (DS)</DocSubSubTitle>
        <ul className="list-none space-y-1 pl-0">
            <ListItem><strong>Dependencies</strong>:
                <ul className="list-none mt-1 space-y-0.5 pl-4">
                     <SubListItem><CodeBlock inline>DamageSystemTypes.h</CodeBlock> for <CodeBlock inline>FDamageContext</CodeBlock>, <CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock>.</SubListItem>
                     <SubListItem><CodeBlock inline>ItemSystemTypes.h</CodeBlock> for ammo quality.</SubListItem>
                </ul>
            </ListItem>
            <ListItem><strong>Workflow</strong>:
                <CodeBlock language="cpp">
{`// In ABaseProjectile::ProcessImpact or hitscan handler
FDamageContext Ctx;
// Populate from archetype & hit:
Ctx.ProjectileMassKg         = Archetype->MassKg;
Ctx.ProjectileCaliberMm      = Archetype->CaliberMm;
Ctx.ProjectileRoundType      = Archetype->RoundType;
Ctx.ProjectileBehaviorType   = Archetype->ProjectileBehaviorType;
Ctx.InitialDamagePotential   = Archetype->BaseDamageAmount;
Ctx.DirectDamageEffectClassToApply = Archetype->DirectDamageGameplayEffectClass;
Ctx.HitLimbTag               = HitLimbTag;
Ctx.CurrentDamageToApply     = Ctx.InitialDamagePotential;
// …other fields…
TargetActor->FindComponentByClass<UDamageRouterComponent>()->ProcessDamageEvent(Ctx);`}
                </CodeBlock>
            </ListItem>
        </ul>
        
        <DocSubSubTitle id={sectionId('integration-as')}>5.2 Armor System (AS)</DocSubSubTitle>
        <p>Receives the same <CodeBlock inline>FDamageContext</CodeBlock> for mitigation in <CodeBlock inline>ProcessDamageInteraction()</CodeBlock>.</p>
        
        <DocSubSubTitle id={sectionId('integration-lhs')}>5.3 Limb Health System (LHS)</DocSubSubTitle>
        <p>Final damage and status effects are applied to limb attributes via GAS using the populated context.</p>
        
        <DocSubSubTitle id={sectionId('integration-weapon')}>5.4 External Weapon System</DocSubSubTitle>
        <p>Selects the appropriate <CodeBlock inline>UProjectileArchetypeDataAsset</CodeBlock> and spawns or traces with the configured parameters.</p>
      </CollapsibleSection>

      <hr className="border-shadow-slate/50 my-8"/>

      <CollapsibleSection
        id={sectionId('setup-usage-link')}
        title="6. Setup & Usage Notes"
        isExpanded={!!expandedSections[sectionId('setup-usage-link')]}
        onClick={() => toggleExpansion(sectionId('setup-usage-link'))}
      >
        <ol className="list-none space-y-3 pl-0">
            <ListItem ordered><strong>Create Archetypes</strong>: Define <CodeBlock inline>UProjectileArchetypeDataAsset</CodeBlock> instances for each ammo/projectile type. Use DS enums (<CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock>) and quality types.</ListItem>
            <ListItem ordered><strong>Object Pooling</strong>: Implement a pool for <CodeBlock inline>ABaseProjectile</CodeBlock> to <CodeBlock inline>Spawn</CodeBlock>/<CodeBlock inline>Despawn</CodeBlock> rather than <CodeBlock inline>New</CodeBlock>/<CodeBlock inline>Destroy</CodeBlock>.</ListItem>
            <ListItem ordered><strong>Hitscan Logic</strong>: On server, perform line trace, then populate and dispatch <CodeBlock inline>FDamageContext</CodeBlock> as above.</ListItem>
            <ListItem ordered><strong>Build Dependencies</strong>: In <strong><CodeBlock inline>ProjectileSystem.Build.cs</CodeBlock></strong>, include:
                <CodeBlock language="csharp">{`PublicDependencyModuleNames.AddRange(new string[]{
    "Core", "CoreUObject", "Engine",
    "GameplayTags", "GameplayAbilities",
    "DamageSystem"
});`}</CodeBlock>
            </ListItem>
            <ListItem ordered><strong>Include Paths</strong>: In your PDS headers:
                <CodeBlock language="cpp">{`#include "DamageSystemTypes.h"     // for FDamageContext, ERoundType, EProjectileType
#include "ItemSystemTypes.h"       // for ammo quality mappings`}</CodeBlock>
            </ListItem>
            <ListItem ordered><strong>Define Direct Damage GE</strong>: Ensure each archetype sets <CodeBlock inline>DirectDamageEffectClassToApply</CodeBlock> to a valid <CodeBlock inline>UGameplayEffect</CodeBlock> that reads <CodeBlock inline>{`"Data.Damage"`}</CodeBlock> from the context.</ListItem>
        </ol>
      </CollapsibleSection>

    </article>
  );
};

export default ProjectileSystemDocContent;
