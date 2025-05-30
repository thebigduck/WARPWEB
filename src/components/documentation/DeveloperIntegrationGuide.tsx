import React from 'react';
import {
    DocSubTitle,
    DocSubSubTitle,
    ListItem,
    CodeBlock,
    SubListItem 
} from '@/components/ui/DocComponents';
import { DocumentationArticleProps } from '@/types';

interface CollapsibleSectionProps {
  id: string; 
  title: string;
  level: 2; 
  isExpanded: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ id, title, isExpanded, onClick, children }) => {
  return (
    <section id={id} className="mb-8 scroll-mt-24">
      <DocSubTitle id={`${id}-header`} onClick={onClick} onToggle={onClick} isExpanded={isExpanded}>{title}</DocSubTitle>
      {isExpanded && <div className={`pt-3 pl-6`}>{children}</div>}
    </section>
  );
};

const DeveloperIntegrationGuideContent: React.FC<DocumentationArticleProps> = ({ parentId, expandedSections, toggleExpansion, getSectionId }) => {
  const sectionId = (baseId: string) => getSectionId(parentId, baseId);
  // const q = String.fromCharCode(34); // Removed q

  return (
    <article className="doc-article space-y-6">
      <CollapsibleSection
        id={sectionId('intro-link')}
        title="1. Introduction"
        level={2}
        isExpanded={!!expandedSections[sectionId('intro-link')]}
        onClick={() => toggleExpansion(sectionId('intro-link'))}
      >
        <DocSubSubTitle id={sectionId('intro-purpose')}>1.1 Purpose of This Guide</DocSubSubTitle>
        <p>This document provides in-depth instructions for integrating the <strong className="text-[#95D5B2]">Limb Health System (LHS)</strong>, <strong className="text-[#95D5B2]">Armor System (AS)</strong>, <strong className="text-[#95D5B2]">Projectile System (PDS)</strong>, and the <strong className="text-[#95D5B2]">Damage System (DS)</strong> into your Unreal Engine 5.5 project. DS now also hosts all core shared data types—ensuring a single source of truth for your combat framework.</p>
        
        <DocSubSubTitle id={sectionId('intro-ecosystem')}>1.2 Plugin Ecosystem Overview</DocSubSubTitle>
        <div className="overflow-x-auto bg-[#081C15]/50 p-3 my-4 rounded-md shadow-inner border border-[#1B4332]/60">
            <table className="min-w-full divide-y divide-[#1B4332]/40 text-sm">
                <thead className="bg-[#2D6A4F]/50">
                    <tr>
                        <th className="px-4 py-2 text-left font-medium text-[#74C69D]">Plugin</th>
                        <th className="px-4 py-2 text-left font-medium text-[#74C69D]">Responsibility & Dependencies</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#1B4332]/40">
                    <tr><td className="px-4 py-3 align-top font-medium text-[#D8F3DC]">DS (Damage System – Core Utilities & Types)</td><td className="px-4 py-3 align-top"><strong className="block text-[#D8F3DC]/90">Provides:</strong><ul className="list-none mt-1 space-y-0.5 pl-0"><ListItem className="!items-baseline"><CodeBlock inline>FDamageContext</CodeBlock> & <CodeBlock inline>UDamageRouterComponent</CodeBlock></ListItem><ListItem className="!items-baseline"><strong className="text-[#D8F3DC]/90">Shared Types</strong>:<ul className="list-none mt-1 space-y-0.5 pl-4"><SubListItem><CodeBlock inline>ItemSystemTypes.h</CodeBlock></SubListItem><SubListItem><CodeBlock inline>DamageSystemTypes.h</CodeBlock></SubListItem><SubListItem><CodeBlock inline>MyGameGameplayEffectContext.h</CodeBlock></SubListItem></ul></ListItem></ul><p className="mt-2 text-xs italic text-[#D8F3DC]/70">Note: Other plugins depend on DS for all core types.</p></td></tr>
                    <tr><td className="px-4 py-3 align-top font-medium text-[#D8F3DC]">LHS (Limb Health System)</td><td className="px-4 py-3 align-top">Per-limb & global health, stamina, status effects, medical consumables (GAS).<br/><strong className="text-[#D8F3DC]/70">Depends on DS</strong></td></tr>
                    <tr><td className="px-4 py-3 align-top font-medium text-[#D8F3DC]">AS (Armor System)</td><td className="px-4 py-3 align-top">Equippable armor, durability, quality tiers, material-based mitigation.<br/><strong className="text-[#D8F3DC]/70">Depends on DS</strong></td></tr>
                    <tr><td className="px-4 py-3 align-top font-medium text-[#D8F3DC]">PDS (Projectile System)</td><td className="px-4 py-3 align-top">Hitscan & simulated projectiles, advanced ballistics.<br/><strong className="text-[#D8F3DC]/70">Depends on DS</strong></td></tr>
                </tbody>
            </table>
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        id={sectionId('prerequisites-link')}
        title="2. Prerequisites"
        level={2}
        isExpanded={!!expandedSections[sectionId('prerequisites-link')]}
        onClick={() => toggleExpansion(sectionId('prerequisites-link'))}
      >
        <ul className="list-none space-y-1 pl-0">
            <ListItem>Unreal Engine 5.5 (or newer compatible version).</ListItem>
            <ListItem>C++ & GAS Experience: You must understand <CodeBlock inline>UAbilitySystemComponent</CodeBlock>, <CodeBlock inline>UAttributeSet</CodeBlock>, <CodeBlock inline>UGameplayEffect</CodeBlock>, <CodeBlock inline>UGameplayAbility</CodeBlock>, and <CodeBlock inline>FGameplayTag</CodeBlock>.</ListItem>
            <ListItem>Plugin Management: Familiarity with adding/removing plugins, editing <CodeBlock inline>*.uplugin</CodeBlock> and <CodeBlock inline>*.Build.cs</CodeBlock> files.</ListItem>
        </ul>
      </CollapsibleSection>

      <CollapsibleSection
        id={sectionId('plugin-setup-link')}
        title="3. Plugin Setup"
        level={2}
        isExpanded={!!expandedSections[sectionId('plugin-setup-link')]}
        onClick={() => toggleExpansion(sectionId('plugin-setup-link'))}
      >
        <DocSubSubTitle id={sectionId('plugin-setup-adding')}>3.1 Adding Plugins to Your Project</DocSubSubTitle>
        <p>Copy the plugin folders (e.g., `DamageSystem`, `LimbHealthSystem`, `ArmorSystem`, `ProjectileSystem`) into your project&apos;s `Plugins/` directory. If the `Plugins` directory doesn&apos;t exist at the root of your Unreal Engine project, create it. After copying, Unreal Engine should detect the new plugins and may prompt you to rebuild your project. If not, right-click your `.uproject` file and select &quot;Generate Visual Studio project files&quot;, then build from your IDE.</p>
        <DocSubSubTitle id={sectionId('plugin-setup-enabling')}>3.2 Enabling Plugins in the Editor</DocSubSubTitle>
        <p>Open your project in the Unreal Editor. Navigate to Edit &gt; Plugins. Search for each system plugin by name (e.g., &quot;Limb Health System&quot;, &quot;Armor System&quot;, &quot;Projectile System&quot;, &quot;Damage System&quot;). Ensure the &quot;Enabled&quot; checkbox is ticked for each. You will likely need to restart the editor for these changes to take full effect.</p>
      </CollapsibleSection>

      <CollapsibleSection
        id={sectionId('core-concepts-link')}
        title="4. Core Concepts & Dependencies" 
        level={2}
        isExpanded={!!expandedSections[sectionId('core-concepts-link')]}
        onClick={() => toggleExpansion(sectionId('core-concepts-link'))}
      >
        <DocSubSubTitle id={sectionId('core-concepts-api')}>4.1 API Macros</DocSubSubTitle>
        <p>Each plugin uses an API macro (e.g., <CodeBlock inline>DAMAGESYSTEM_API</CodeBlock>, <CodeBlock inline>LIMBHEALTHSYSTEM_API</CodeBlock>, etc.) to control the visibility of its classes and functions to other modules. If you intend to call plugin functions or derive from plugin classes in your game code or other plugins, ensure the relevant members are marked with their respective API macros (e.g., <CodeBlock inline>DAMAGESYSTEM_API UMyDamageType : public UObject</CodeBlock>).</p>
        <DocSubSubTitle id={sectionId('core-concepts-shared-types')}>4.2 Shared Data Types (Centralized in DamageSystem)</DocSubSubTitle>
        <p>The <strong>Damage System (DS)</strong> plugin serves as the central hub for many core data types. This minimizes direct dependencies between other gameplay systems (LHS, AS, PDS) and promotes modularity. Key shared headers within the DS plugin that other systems will include are:</p>
        <ul className="list-none space-y-1 pl-4">
            <ListItem><CodeBlock inline>DamageSystemTypes.h</CodeBlock>: Defines the crucial <CodeBlock inline>FDamageContext</CodeBlock> struct, which carries all information about a damage event. Also includes enums like <CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock>.</ListItem>
            <ListItem><CodeBlock inline>ItemSystemTypes.h</CodeBlock>: Defines types related to item quality and stats, such as <CodeBlock inline>EItemInstanceQuality</CodeBlock>, <CodeBlock inline>FStatModifier</CodeBlock>, and various quality modifier structs. This is used by AS for armor quality, LHS for medical item efficacy, and PDS for ammunition variants.</ListItem>
            <ListItem><CodeBlock inline>MyGameGameplayEffectContext.h</CodeBlock> (Example Name): This header defines a custom <CodeBlock inline>FGameplayEffectContext</CodeBlock> subclass (e.g., `FMyGameGameplayEffectContext`). This custom context is vital as it typically includes a pointer to the active <CodeBlock inline>FDamageContext</CodeBlock> and often the specific <CodeBlock inline>HitLimbTag</CodeBlock>. This allows Gameplay Effect executions (especially damage calculations) to access detailed information about the damage event.</ListItem>
        </ul>
        <DocSubSubTitle id={sectionId('core-concepts-dependencies')}>4.3 Plugin Dependency Configuration</DocSubSubTitle>
        <p>For one plugin to use code or types from another (e.g., LHS using types from DS), you must declare this dependency in two places:</p>
        <ol className="list-decimal list-inside ml-4 mt-2 space-y-1">
            <li><strong><CodeBlock inline>*.uplugin</CodeBlock> file:</strong> Add the depended-upon plugin to the <CodeBlock inline>{`"Plugins"`}</CodeBlock> array.</li>
            <li><strong><CodeBlock inline>*.Build.cs</CodeBlock> file:</strong> Add the depended-upon plugin&apos;s module name to the <CodeBlock inline>PublicDependencyModuleNames</CodeBlock> or <CodeBlock inline>PrivateDependencyModuleNames</CodeBlock> list.</li>
        </ol>
        <p>Example: For LHS to depend on DamageSystem:</p>
        <p>In <CodeBlock inline>LimbHealthSystem.uplugin</CodeBlock>:</p>
        <CodeBlock>{`{
  "Plugins": [
    {
      "Name": "DamageSystem",
      "Enabled": true
    }
  ]
}`}</CodeBlock>
        <p>In <CodeBlock inline>LimbHealthSystem/Source/LimbHealthSystem/LimbHealthSystem.Build.cs</CodeBlock>:</p>
        <CodeBlock>{`PublicDependencyModuleNames.AddRange(new string[] {
    // ... other core modules ...
    "DamageSystem"
});`}</CodeBlock>
        <p>Ensure these dependencies are correctly set for LHS, AS, and PDS, all typically depending on DamageSystem.</p>
      </CollapsibleSection>

      <CollapsibleSection
        id={sectionId('lhs-integration-link')}
        title="5. Limb Health System (LHS) Integration"
        level={2}
        isExpanded={!!expandedSections[sectionId('lhs-integration-link')]}
        onClick={() => toggleExpansion(sectionId('lhs-integration-link'))}
      >
        <DocSubSubTitle id={sectionId('lhs-character-setup')}>5.1 Character Setup</DocSubSubTitle>
        <p>Your character class needs an <CodeBlock inline>UAbilitySystemComponent</CodeBlock>, the <CodeBlock inline>ULimbSystemComponent</CodeBlock>, and an instance of your <CodeBlock inline>UCharacterAttributeSet</CodeBlock> (which contains limb health attributes).</p>
        <CodeBlock>{`// MyCharacter.h
UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Abilities")
TObjectPtr<UMyGameAbilitySystemComponent> AbilitySystemComponent;

UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Health")
TObjectPtr<ULimbSystemComponent> LimbSystemComponent;

UPROPERTY()
TObjectPtr<UCharacterAttributeSet> AttributeSet; // Initialize this in constructor`}</CodeBlock>
        <p>In your character&apos;s <CodeBlock inline>BeginPlay</CodeBlock> or <CodeBlock inline>PossessedBy</CodeBlock>:</p>
        <CodeBlock>{`AbilitySystemComponent->InitAbilityActorInfo(this, this);
// Apply default attributes and abilities
if (LimbSystemComponent && LimbDefinitionsDataAsset) {
    LimbSystemComponent->InitializeLimbSystem(LimbDefinitionsDataAsset->DefinitionsArray, AbilitySystemComponent);
}`}</CodeBlock>
        <DocSubSubTitle id={sectionId('lhs-data-asset')}>5.2 Data Asset Creation (LHS)</DocSubSubTitle>
        <p>Create a Data Asset (e.g., `DA_HumanoidLimbs`) derived from <CodeBlock inline>ULimbDefinitionDataAsset</CodeBlock>. Populate its `LimbDefinitions` array. Each entry maps a bone name (from your character&apos;s skeleton) to a Gameplay Tag (e.g., <CodeBlock inline>Limb.Head</CodeBlock>) and sets initial health values for that limb in the `AttributeSet`.</p>
        <p>For medical items, create Data Assets derived from <CodeBlock inline>UMedicalItemDataAsset</CodeBlock>. Configure the Gameplay Effects to apply (e.g., healing over time), status effects to remove, application duration, and any quality-based modifiers.</p>
        <DocSubSubTitle id={sectionId('lhs-damage-feedback')}>5.3 Damage Feedback (LHS) via MyGameGameplayEffectContext</DocSubSubTitle>
        <p>The actual health modification occurs within a <CodeBlock inline>UGameplayEffect</CodeBlock> execution (typically in your `AttributeSet`&apos;s `PostGameplayEffectExecute`). This execution needs to:</p>
        <ol className="list-decimal list-inside ml-4 space-y-1">
            <li>Get the <CodeBlock inline>FGameplayEffectContextHandle</CodeBlock> and cast it to your `FMyGameGameplayEffectContext*`.</li>
            <li>From the custom context, retrieve the `FDamageContext*` and the `HitLimbTag`.</li>
            <li>Use the `HitLimbTag` to identify which limb attribute to modify (e.g., `Health_Head`, `Health_Arm_L`).</li>
            <li>Apply the captured damage (from `Data.Damage` SetByCaller magnitude) to that specific limb attribute.</li>
            <li>Update any relevant flags in the `FDamageContext` (e.g., `bTargetKilled`, `ResultingAppliedStatusEffectTags`).</li>
        </ol>
      </CollapsibleSection>

      <CollapsibleSection
        id={sectionId('as-integration-link')}
        title="6. Armor System (AS) Integration"
        level={2}
        isExpanded={!!expandedSections[sectionId('as-integration-link')]}
        onClick={() => toggleExpansion(sectionId('as-integration-link'))}
      >
        <DocSubSubTitle id={sectionId('as-character-setup')}>6.1 Character Setup (AS)</DocSubSubTitle>
        <p>Add the <CodeBlock inline>UArmorSystemComponent</CodeBlock> to your character Blueprint or C++ class.</p>
        <CodeBlock>{`// MyCharacter.h
UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Combat|Armor")
TObjectPtr<UArmorSystemComponent> ArmorComponent;`}</CodeBlock>
        <DocSubSubTitle id={sectionId('as-data-asset')}>6.2 Data Asset Creation (AS)</DocSubSubTitle>
        <p>Define armor pieces using <CodeBlock inline>UArmorArchetypeDataAsset</CodeBlock>. Key properties include material (reference to a `UMaterialTypeDataAsset`), base durability, thickness, weight, coverage tags (LHS limb tags), and quality tier modifiers.</p>
        <p><CodeBlock inline>UMaterialTypeDataAsset</CodeBlock> defines physical properties like penetration resistance, ricochet chance, and spall characteristics.</p>
        <DocSubSubTitle id={sectionId('as-equipping')}>6.3 Equipping Armor (AS)</DocSubSubTitle>
        <p>Your inventory or equipment system should call the server-RPCs on `UArmorSystemComponent`:</p>
        <ul className="list-none space-y-1 pl-4">
            <ListItem><CodeBlock inline>Server_EquipArmor(UArmorArchetypeDataAsset* Archetype, EItemInstanceQuality Quality, FGameplayTag SlotTag)</CodeBlock></ListItem>
            <ListItem><CodeBlock inline>Server_UnequipArmor(FGameplayTag SlotTag)</CodeBlock></ListItem>
        </ul>
        <DocSubSubTitle id={sectionId('as-damage-interaction')}>6.4 Damage Interaction (AS)</DocSubSubTitle>
        <p>The `UDamageRouterComponent` (from DS) calls <CodeBlock inline>UArmorSystemComponent::ProcessDamageInteraction(FDamageContext& Context, FGameplayTag HitLimbTag, FName HitBoneName)</CodeBlock>. This function calculates damage mitigation based on the hit armor piece, its material, and the incoming projectile&apos;s properties (from `FDamageContext`). It updates `Context.CurrentDamageToApply` and armor durability.</p>
      </CollapsibleSection>
      
      <CollapsibleSection
        id={sectionId('pds-integration-link')}
        title="7. Projectile System (PDS) Integration"
        level={2}
        isExpanded={!!expandedSections[sectionId('pds-integration-link')]}
        onClick={() => toggleExpansion(sectionId('pds-integration-link'))}
      >
        <DocSubSubTitle id={sectionId('pds-archetype-data')}>7.1 Archetype Data Assets (PDS)</DocSubSubTitle>
        <p>Create <CodeBlock inline>UProjectileArchetypeDataAsset</CodeBlock> instances for each distinct projectile type. These define properties like initial velocity, damage potential, `ERoundType` (from DS), `EProjectileType` (from DS), and the `DirectDamageEffectClassToApply` (a `UGameplayEffect` class from DS).</p>
        <DocSubSubTitle id={sectionId('pds-firing-logic')}>7.2 Firing Logic (PDS) & Hitscan</DocSubSubTitle>
        <p>Your weapon logic (e.g., a `UWeaponFireComponent`) will use a <CodeBlock inline>UProjectileDispatchComponent</CodeBlock> or similar to spawn `ABaseProjectile` actors (for simulated projectiles) or perform line traces (for hitscan). The chosen `UProjectileArchetypeDataAsset` dictates behavior.</p>
        <DocSubSubTitle id={sectionId('pds-dispatching-context')}>7.3 Populating & Dispatching FDamageContext (PDS)</DocSubSubTitle>
        <p>Upon a projectile impact or hitscan hit, the PDS logic is responsible for:</p>
        <ol className="list-decimal list-inside ml-4 space-y-1">
            <li>Populating an <CodeBlock inline>FDamageContext</CodeBlock> structure with all relevant data: instigator, target, hit location, projectile properties from its archetype (mass, caliber, damage potential, etc.), and the `DirectDamageEffectClassToApply`.</li>
            <li>Finding the <CodeBlock inline>UDamageRouterComponent</CodeBlock> on the target actor.</li>
            <li>Calling <CodeBlock inline>UDamageRouterComponent::ProcessDamageEvent(Context)</CodeBlock>.</li>
        </ol>
      </CollapsibleSection>

      <CollapsibleSection
        id={sectionId('ds-integration-link')}
        title="8. DS Integration (Damage Router & Context)"
        level={2}
        isExpanded={!!expandedSections[sectionId('ds-integration-link')]}
        onClick={() => toggleExpansion(sectionId('ds-integration-link'))}
      >
        <DocSubSubTitle id={sectionId('ds-actor-setup')}>8.1 Actor Setup (DS)</DocSubSubTitle>
        <p>Any actor intended to receive damage (characters, destructible environment pieces) must have the <CodeBlock inline>UDamageRouterComponent</CodeBlock> attached. This component is central to the damage pipeline.</p>
        <DocSubSubTitle id={sectionId('ds-direct-damage-ge')}>8.2 Direct Damage GameplayEffect (DS)</DocSubSubTitle>
        <p>A core GameplayEffect (e.g., `GE_DirectDamage`) is needed. This GE should have an ExecutionCalculation that:</p>
        <ul className="list-none space-y-1 pl-4">
            <ListItem>Casts the source <CodeBlock inline>FGameplayEffectContextHandle</CodeBlock> to your custom `FMyGameGameplayEffectContext` (defined in DS) to access the `FDamageContext*` and `HitLimbTag`.</ListItem>
            <ListItem>Reads a SetByCaller magnitude named <CodeBlock inline>{`"Data.Damage"`}</CodeBlock>. The `UDamageRouterComponent` will set this magnitude to the final calculated damage value after armor mitigation.</ListItem>
            <ListItem>Applies this damage to the appropriate health attribute (e.g., a specific limb attribute from LHS) based on the `HitLimbTag`.</ListItem>
        </ul>
        <p>The `UDamageRouterComponent` uses the <CodeBlock inline>DirectDamageEffectClassToApply</CodeBlock> specified in the `FDamageContext` (typically set by PDS from the projectile archetype) to apply this GE.</p>
        <DocSubSubTitle id={sectionId('ds-gameplaycue-setup')}>8.3 GameplayCue Setup (DS)</DocSubSubTitle>
        <p>The `UDamageRouterComponent` broadcasts Gameplay Tags as GameplayCues after damage processing (e.g., <CodeBlock inline>GameplayCue.Damage.Hit</CodeBlock>, <CodeBlock inline>GameplayCue.Armor.Ricochet</CodeBlock>, <CodeBlock inline>GameplayCue.Target.Killed</CodeBlock>). Create GameplayCue Notify Blueprints or C++ classes that respond to these tags to trigger visual effects (VFX), sound effects (SFX), and other feedback.</p>
      </CollapsibleSection>

      <CollapsibleSection
        id={sectionId('damage-flow-link')}
        title="9. Damage Flow Example"
        level={2}
        isExpanded={!!expandedSections[sectionId('damage-flow-link')]}
        onClick={() => toggleExpansion(sectionId('damage-flow-link'))}
      >
        <p>A typical damage event sequence:</p>
        <ol className="list-decimal list-inside ml-4 mt-2 space-y-1">
            <li>**PDS**: Weapon fires. Projectile is spawned or hitscan trace performed. PDS populates initial `FDamageContext` (source, damage type, projectile data).</li>
            <li>**PDS**: On impact/hit, PDS calls <CodeBlock inline>{`TargetActor->FindComponentByClass<UDamageRouterComponent>()->ProcessDamageEvent(Context)`}</CodeBlock>.</li>
            <li>**DS (Router)**: `ProcessDamageEvent` begins. It calls `UArmorSystemComponent::ProcessDamageInteraction(Context, HitLimbTag, HitBoneName)` on the target, if present.</li>
            <li>**AS**: Armor component calculates mitigation based on hit armor piece, its material properties, and projectile data from `Context`. Updates `Context.CurrentDamageToApply`, armor durability, and flags like `bArmorPenetrated`, `bRicocheted`.</li>
            <li>**DS (Router)**: After AS, the router calls its internal `ProcessHealthAndEffects(Context)`. This prepares and applies a GameplayEffect (specified by `Context.DirectDamageEffectClassToApply`) to the target&apos;s Ability System Component. The GE&apos;s magnitude for `Data.Damage` is set to `Context.CurrentDamageToApply`.</li>
            <li>**LHS (via GAS)**: The GameplayEffect execution (in `UCharacterAttributeSet::PostGameplayEffectExecute`) retrieves the `FMyGameGameplayEffectContext`, gets the `HitLimbTag` and `FDamageContext*`. It applies the `Data.Damage` magnitude to the correct limb health attribute. Status effects might also be triggered here based on `Context` or GE tags. The execution updates flags in `Context` like `bTargetKilled`.</li>
            <li>**DS (Router)**: Finally, the router calls `BroadcastPostDamageOutcomes(Context)`. This iterates through outcome flags in `Context` and executes relevant GameplayCues (e.g., impact VFX, sound, kill notification).</li>
        </ol>
      </CollapsibleSection>

      <CollapsibleSection
        id={sectionId('best-practices-link')}
        title="10. Best Practices & Troubleshooting"
        level={2}
        isExpanded={!!expandedSections[sectionId('best-practices-link')]}
        onClick={() => toggleExpansion(sectionId('best-practices-link'))}
      >
        <ul className="list-none space-y-1 pl-0">
          <ListItem><strong>Dependency Clarity</strong>: Strictly manage plugin dependencies. Most systems (LHS, AS, PDS) should only depend on DamageSystem for shared types and the router API. Avoid circular dependencies.</ListItem>
          <ListItem><strong>Data Validation</strong>: Implement `UDataAsset::Validate()` in your Data Assets to check for common configuration errors (e.g., missing references, invalid values) and log warnings.</ListItem>
          <ListItem><strong>Comprehensive Logging</strong>: Use `UE_LOG` with appropriate categories and verbosity for critical events in each system. This is invaluable for debugging.</ListItem>
          <ListItem><strong>GAS Debugging</strong>: Leverage GAS-specific console commands like <CodeBlock inline>showdebug abilitysystem</CodeBlock>, <CodeBlock inline>AbilitySystem.Debug.NextTarget</CodeBlock>, <CodeBlock inline>AbilitySystem.Debug.PrintAttribute</CodeBlock>, etc.</ListItem>
          <ListItem><strong>Server-Client Distinction</strong>: Clearly delineate server-only logic (damage calculations, state changes) from client-side cosmetic prediction and feedback. Use RPCs appropriately.</ListItem>
          <ListItem><strong>Modular Testing</strong>: Test each system in isolation as much as possible before testing full integrations.</ListItem>
          <ListItem><strong>Common Issues to Check</strong>:
            <ul className="list-none space-y-0.5 pl-4 mt-1">
                <SubListItem>Null pointers due to uninitialized components or incorrect Data Asset references.</SubListItem>
                <SubListItem>GameplayEffects not applying: Incorrect tags, magnitudes, context, or attribute setup.</SubListItem>
                <SubListItem>Replication problems: Ensure properties are replicated correctly and RPCs are reliable if needed.</SubListItem>
                <SubListItem>Incorrect `HitLimbTag` being passed or used, leading to damage applied to the wrong limb.</SubListItem>
                <SubListItem>Plugin load order or missing module dependencies in `Build.cs` or `.uplugin` files.</SubListItem>
            </ul>
          </ListItem>
        </ul>
      </CollapsibleSection>

    </article>
  );
};

export default DeveloperIntegrationGuideContent;
