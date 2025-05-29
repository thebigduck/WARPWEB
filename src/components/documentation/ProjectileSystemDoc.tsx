// --- File: src/components/documentation/ProjectileSystemDoc.tsx ---
import React from 'react';
import { 
    CodeBlock, 
    ListItem, 
    SubListItem, 
    DocSubTitle, 
    DocSubSubTitle,
} from '@/components/ui';
import { DocumentationArticleProps } from '@/types';

const ProjectileSystemDoc: React.FC<DocumentationArticleProps> = ({ parentId, expandedSections, toggleExpansion, getSectionId }) => {
  const sectionId = (baseId: string) => getSectionId ? getSectionId(parentId, baseId) : `${parentId}-${baseId}`; 
  const q = String.fromCharCode(34); // Double quote character

  return (
    <article className="space-y-10 doc-article">
       <hr className="border-shadow-slate/50 my-6"/>
      
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
                <p>The <strong>Projectile System (PDS)</strong> plugin manages the creation, simulation, and impact processing of all projectile types in your FPS game. It handles:</p>
                <ul className="list-none space-y-1 pl-0">
                    <ListItem><strong>Projectile Movement & Collision:</strong> Instantaneous hitscan traces or physically simulated projectiles via <CodeBlock inline>UProjectileMovementComponent</CodeBlock>.</ListItem>
                    <ListItem><strong>Damage Calculation & Effects:</strong> Populates <CodeBlock inline>FDamageContext</CodeBlock> (from DS) and invokes the central damage pipeline.</ListItem>
                    <ListItem><strong>Advanced Ballistics:</strong> Ricochet, spall generation, environmental penetration, and configurable fragmentation.</ListItem>
                    <ListItem><strong>Object Pooling (Recommended):</strong> Designed for reuse of <CodeBlock inline>ABaseProjectile</CodeBlock> instances to minimize runtime allocation.</ListItem>
                    <ListItem><strong>Server-Authoritative Replication:</strong> All spawn, movement, and hit logic runs on the server; clients receive cosmetic updates.</ListItem>
                </ul>
                <p>This plugin is standalone but depends on the <strong>Damage System (DS)</strong> for core types and orchestration, and integrates upstream with the Armor System (AS) and Limb Health System (LHS).</p>
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
                 <ol className="list-none space-y-2 my-2 pl-0 doc-ordered-list">
                    <ListItem ordered><strong>Diverse Projectile Types:</strong>
                        <ul className="list-none mt-1 space-y-0.5 pl-4">
                            <SubListItem><CodeBlock inline>Hitscan</CodeBlock></SubListItem>
                            <SubListItem><CodeBlock inline>PhysicalBullet</CodeBlock> (mass, drag, gravity)</SubListItem>
                            <SubListItem>Grenade, Rocket, etc., via <CodeBlock inline>EProjectileType</CodeBlock> (from DS).</SubListItem>
                        </ul>
                    </ListItem>
                    <ListItem ordered><strong>Varied Round Types:</strong> <CodeBlock inline>FMJ</CodeBlock>, <CodeBlock inline>AP</CodeBlock>, <CodeBlock inline>HP</CodeBlock>, <CodeBlock inline>Incendiary</CodeBlock>, etc., via <CodeBlock inline>ERoundType</CodeBlock> (from DS). Round type governs penetration, damage, and special effects.</ListItem>
                    <ListItem ordered><strong>Data-Driven Archetypes:</strong> <CodeBlock inline>UProjectileArchetypeDataAsset</CodeBlock> defines all behavior: velocity, mass, caliber, round type, damage, and VFX/SFX.</ListItem>
                    <ListItem ordered><strong>Advanced Ballistics:</strong> Ricochet, Spall, Penetration, Fragmentation. Configured via <CodeBlock inline>FProjectileRicochetConfig</CodeBlock> and <CodeBlock inline>FProjectileSpallConfig</CodeBlock>.</ListItem>
                    <ListItem ordered><strong>Damage & GameplayEffects:</strong> On impact, fills <CodeBlock inline>FDamageContext</CodeBlock> (from DS) and calls <CodeBlock inline>{`${q}UDamageRouterComponent::ProcessDamageEvent()${q}`}</CodeBlock>. Uses <CodeBlock inline>DirectDamageEffectClassToApply</CodeBlock> from the archetype.</ListItem>
                    <ListItem ordered><strong>Object Pooling:</strong> Supports reuse of <CodeBlock inline>ABaseProjectile</CodeBlock> actors to reduce GC and improve performance.</ListItem>
                </ol>
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
                            <tr><td className="px-4 py-3 align-top"><CodeBlock inline>ABaseProjectile</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>AActor</CodeBlock></td><td className="px-4 py-3 align-top">Base class for all physical projectiles: lifecycle, movement, collision, and impact processing.</td></tr>
                            <tr><td className="px-4 py-3 align-top"><CodeBlock inline>UProjectileArchetypeDataAsset</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>UPrimaryDataAsset</CodeBlock></td><td className="px-4 py-3 align-top">Defines stats and behaviors: Mass, Caliber, Velocity, <CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock>, BaseDamageAmount, <CodeBlock inline>DamageTypeClass</CodeBlock>, RicochetConfig, SpallConfig, <CodeBlock inline>DirectDamageGameplayEffectClass</CodeBlock>.</td></tr>
                            <tr><td className="px-4 py-3 align-top"><CodeBlock inline>ProjectileSystemTypes.h</CodeBlock></td><td className="px-4 py-3 align-top">Header</td><td className="px-4 py-3 align-top">PDS-specific structs: <CodeBlock inline>FProjectileRicochetConfig</CodeBlock>, <CodeBlock inline>FProjectileSpallConfig</CodeBlock>, <CodeBlock inline>FProjectileImpactPayload</CodeBlock> (initial impact data for <CodeBlock inline>FDamageContext</CodeBlock>).</td></tr>
                            <tr><td className="px-4 py-3 align-top"><CodeBlock inline>ItemSystemTypes.h</CodeBlock> (DS)</td><td className="px-4 py-3 align-top">Header</td><td className="px-4 py-3 align-top">Shared types for ammo quality: <CodeBlock inline>EItemInstanceQuality</CodeBlock>, <CodeBlock inline>FStatModifier</CodeBlock>, <CodeBlock inline>FQualityModifierSet</CodeBlock>.</td></tr>
                            <tr><td className="px-4 py-3 align-top"><CodeBlock inline>DamageSystemTypes.h</CodeBlock> (DS)</td><td className="px-4 py-3 align-top">Header</td><td className="px-4 py-3 align-top">Shared enums: <CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock>, plus the <CodeBlock inline>FDamageContext</CodeBlock> struct.</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-sm italic">Module Files: <CodeBlock inline>IProjectileSystemModule.h</CodeBlock> — public interface, <CodeBlock inline>ProjectileSystemModule.cpp</CodeBlock> — module startup/shutdown, <CodeBlock inline>ProjectileSystem.Build.cs</CodeBlock> — declares dependency on {q}DamageSystem{q}</p>
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
                <p className="text-sm italic text-starlight-blue/70 mt-2">Note: <CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock>, <CodeBlock inline>FDamageContext</CodeBlock>, and <CodeBlock inline>ItemSystemTypes.h</CodeBlock> are now defined in the <strong>DamageSystem</strong> plugin.</p>
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
                <DocSubSubTitle id={sectionId('integration-ds')}>5.1 Damage System (DS)</DocSubSubTitle>
                <ul className="list-none space-y-1 pl-0">
                    <ListItem><strong>Dependencies</strong>:
                        <ul className="list-none mt-1 space-y-0.5 pl-4">
                             <SubListItem><CodeBlock inline>DamageSystemTypes.h</CodeBlock> for <CodeBlock inline>FDamageContext</CodeBlock>, <CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock>.</SubListItem>
                             <SubListItem><CodeBlock inline>ItemSystemTypes.h</CodeBlock> for ammo quality.</SubListItem>
                        </ul>
                    </ListItem>
                    <ListItem><strong>Workflow</strong>:
                        <CodeBlock>{`// In ABaseProjectile::ProcessImpact or hitscan handler
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
TargetActor->FindComponentByClass<UDamageRouterComponent>()->ProcessDamageEvent(Ctx);`}</CodeBlock>
                    </ListItem>
                </ul>
                
                <DocSubSubTitle id={sectionId('integration-as')}>5.2 Armor System (AS)</DocSubSubTitle>
                <p>Receives the same <CodeBlock inline>FDamageContext</CodeBlock> for mitigation in <CodeBlock inline>ProcessDamageInteraction()</CodeBlock>.</p>
                
                <DocSubSubTitle id={sectionId('integration-lhs')}>5.3 Limb Health System (LHS)</DocSubSubTitle>
                <p>Final damage and status effects are applied to limb attributes via GAS using the populated context.</p>
                
                <DocSubSubTitle id={sectionId('integration-weapon')}>5.4 External Weapon System</DocSubSubTitle>
                <p>Selects the appropriate <CodeBlock inline>UProjectileArchetypeDataAsset</CodeBlock> and spawns or traces with the configured parameters.</p>
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
                    <ListItem ordered><strong>Create Archetypes</strong>: Define <CodeBlock inline>UProjectileArchetypeDataAsset</CodeBlock> instances for each ammo/projectile type. Use DS enums (<CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock>) and quality types.</ListItem>
                    <ListItem ordered><strong>Object Pooling</strong>: Implement a pool for <CodeBlock inline>ABaseProjectile</CodeBlock> to <CodeBlock inline>Spawn</CodeBlock>/<CodeBlock inline>Despawn</CodeBlock> rather than <CodeBlock inline>New</CodeBlock>/<CodeBlock inline>Destroy</CodeBlock>.</ListItem>
                    <ListItem ordered><strong>Hitscan Logic</strong>: On server, perform line trace, then populate and dispatch <CodeBlock inline>FDamageContext</CodeBlock> as above.</ListItem>
                    <ListItem ordered><strong>Build Dependencies</strong>: In <strong><CodeBlock inline>ProjectileSystem.Build.cs</CodeBlock></strong>, include:
                        <CodeBlock>{`PublicDependencyModuleNames.AddRange(new string[]{
    ${q}Core${q}, ${q}CoreUObject${q}, ${q}Engine${q},
    ${q}GameplayTags${q}, ${q}GameplayAbilities${q},
    ${q}DamageSystem${q}
});`}</CodeBlock>
                    </ListItem>
                    <ListItem ordered><strong>Include Paths</strong>: In your PDS headers:
                        <CodeBlock>{`#include ${q}DamageSystemTypes.h${q}     // for FDamageContext, ERoundType, EProjectileType
#include ${q}ItemSystemTypes.h${q}       // for ammo quality mappings`}</CodeBlock>
                    </ListItem>
                    <ListItem ordered><strong>Define Direct Damage GE</strong>: Ensure each archetype sets <CodeBlock inline>DirectDamageGameplayEffectClass</CodeBlock> to a valid <CodeBlock inline>UGameplayEffect</CodeBlock> that reads <CodeBlock inline>{`${q}Data.Damage${q}`}</CodeBlock> from the context.</ListItem>
                </ol>
            </div>
        )}
      </section>
    </article>
  );
};
export default ProjectileSystemDoc;
