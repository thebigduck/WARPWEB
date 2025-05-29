// --- File: src/components/LandingPage.tsx ---
import React from 'react';
import { 
    SectionTitle, 
    BenefitCard, 
    TestimonialCard, 
    FAQItem 
} from '@/components/ui';
import { 
    ArrowRightIcon, 
    CheckCircleIcon, 
    BookOpenIcon, 
    StarIcon,
} from '@/components/icons';

// Helper function for same-page scrolling, can be moved to a utils file
const scrollToInternalSection = (id: string) => {
    const headerOffset = 80; // Should match your header height
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

const LandingPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section 
        id="hero" 
        className="min-h-[calc(90vh-80px)] flex flex-col justify-center items-center text-center py-16 sm:py-24 scroll-mt-20 relative bg-deep-space-blue"
        style={{ 
          backgroundImage: `url('/Warp.jpg')`, // Ensure Warp.jpg is in /public
          backgroundSize: 'cover', 
          backgroundPosition: 'center center' 
        }}
      >
        <div className="absolute inset-0 bg-deep-space-blue/80 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-starlight-blue mb-6 leading-tight">
            Engineer <span className="text-cyber-teal">Deeply Immersive</span> FPS Combat
          </h1>
          <p className="text-lg sm:text-xl text-starlight-blue/90 max-w-3xl mx-auto mb-10">
            Unlock unparalleled gameplay depth with our suite of Unreal Engine plugins. Forge intense, dynamic battles with sophisticated damage, armor, ballistics, and health systems designed for maximum player engagement.
          </p>
          <button 
            onClick={() => scrollToInternalSection('cta')}
            className="bg-cyber-teal hover:bg-nebula-aqua text-deep-space-blue font-bold py-3 px-8 rounded-md text-lg shadow-lg hover:shadow-cyber-teal/40 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
          >
            Explore Plugins <ArrowRightIcon />
          </button>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section id="key-benefits" className="py-20 sm:py-28 scroll-mt-20 bg-deep-space-blue">
        <SectionTitle>Why Our FPS Systems?</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <BenefitCard icon={<CheckCircleIcon />} title="Deep Immersion">
            Advanced ballistics, limb-specific trauma, and material-based armor create visceral, believable combat that captivates players.
          </BenefitCard>
          <BenefitCard icon={<CheckCircleIcon />} title="Seamless Modularity">
            Integrate and customize with ease. Our flexible architecture adapts to your unique vision and scales with your project.
          </BenefitCard>
          <BenefitCard icon={<CheckCircleIcon />} title="Accelerated Creation">
            Save hundreds of development hours. Leverage our professionally engineered plugins to bypass common hurdles and focus on your game's unique features.
          </BenefitCard>
          <BenefitCard icon={<BookOpenIcon />} title="Professional Documentation">
            Navigate development with ease using our robust, professionally created documentation, complete with examples and best practices.
          </BenefitCard>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28 scroll-mt-20 bg-shadow-slate">
        <SectionTitle>Core System Capabilities</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Modular Design", text: "Each subsystem is its own plugin, enabling isolated development and reuse." },
            { title: "Data-Driven", text: "Extensive use of UDataAsset classes for items, armor, projectiles, materials, and effects." },
            { title: "GAS Integration", text: "Attributes, status effects, and item abilities leverage Unreal’s Gameplay Ability System." },
            { title: "Server-Authoritative", text: "All critical logic executes server-side; clients receive authoritative updates and cosmetic predictions." },
            { title: "Interconnected Damage Pipeline", text: "Projectile impact → Armor mitigation → Health & status effects → GameplayCues." },
            { title: "Advanced Ballistics", text: "Limb-specific damage, penetration, ricochet, spall, fragmentation, and environment interaction." },
            { title: "Item Quality & Variants", text: "Support for quality tiers on items and configurable ammunition variants." },
            { title: "Centralized Core Types", text: "Shared enums/structs in the Damage System plugin simplify dependencies." }
          ].map(feature => (
            <div key={feature.title} className="bg-comet-grey p-6 rounded-lg shadow-lg hover:shadow-nebula-aqua/20 transition-all duration-300 transform hover:-translate-y-1 border border-shadow-slate/70">
              <h3 className="text-xl font-medium text-cyber-teal mb-3">{feature.title}</h3>
              <p className="text-starlight-blue/90 leading-relaxed text-sm">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 sm:py-28 scroll-mt-20 bg-deep-space-blue">
        <SectionTitle>Developer Acclaim</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard name="Rina K." role="Lead Systems Designer, AAA Studio" stars={5} text="The depth of the damage and armor simulation is astounding. These plugins formed the backbone of our combat and saved us countless hours." avatar="https://placehold.co/100x100/64FFDA/0A192F?text=RK"/>
          <TestimonialCard name="Devon 'Spark' Lee" role="Indie FPS Creator" stars={5} text="As a solo dev, this toolkit is a lifesaver. Robust, well-documented, and the modularity lets me use exactly what I need. My game feels incredible!" avatar="https://placehold.co/100x100/7DF9FF/0A192F?text=DL"/>
          <TestimonialCard name="Dr. Anya Sharma" role="Simulation Specialist, R&D" stars={4} text="Impressive realism in projectile physics and material interaction. Required some adaptation for our specific research needs, but the foundation is exceptionally strong." avatar="https://placehold.co/100x100/F97316/0A192F?text=AS"/>
        </div>
      </section>

      {/* Synergistic Systems Section */}
      <section id="synergistic-systems" className="py-20 sm:py-28 scroll-mt-20 bg-shadow-slate">
        <SectionTitle>Synergistic Systems: A Cohesive Combat Core</SectionTitle>
        <p className="text-center text-starlight-blue/80 max-w-3xl mx-auto mb-12 leading-relaxed">
          Our plugins are not just individual tools; they form a deeply interconnected ecosystem. This synergy ensures realistic and consistent gameplay mechanics across all aspects of combat, from the moment a projectile is fired to its ultimate impact and effect.
        </p>
        <div className="overflow-x-auto bg-comet-grey p-6 rounded-lg shadow-2xl border border-shadow-slate/70">
          <table className="min-w-full divide-y divide-comet-grey/30">
            <thead className="bg-deep-space-blue/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cyber-teal uppercase tracking-wider">System Component</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cyber-teal uppercase tracking-wider">Key Features & Software Design Patterns</th>
              </tr>
            </thead>
            <tbody className="bg-comet-grey divide-y divide-shadow-slate/50">
              <tr className="hover:bg-deep-space-blue/30 transition-colors duration-150">
                <td className="px-6 py-4 align-top whitespace-nowrap text-sm font-medium text-starlight-blue">
                  Damage System (DS) <br /> <span className="text-xs text-starlight-blue/70">The Orchestrator</span>
                </td>
                <td className="px-6 py-4 text-sm text-starlight-blue/90 leading-relaxed">
                  Centralizes damage processing through a <strong className="text-nebula-aqua">core routing component</strong>, ensuring a consistent event pipeline. Defines a <strong className="text-nebula-aqua">standardized damage information packet</strong> and <strong className="text-nebula-aqua">shared definitions for item properties</strong>, crucial for inter-plugin communication and data-driven design.
                </td>
              </tr>
              <tr className="hover:bg-deep-space-blue/30 transition-colors duration-150">
                <td className="px-6 py-4 align-top whitespace-nowrap text-sm font-medium text-starlight-blue">Limb Health System (LHS)</td>
                <td className="px-6 py-4 text-sm text-starlight-blue/90 leading-relaxed">
                  Enables granular, per-limb health and status effects. Reacts to <strong className="text-nebula-aqua">standardized damage information</strong> from the DS to apply localized injuries, seamlessly working with the Gameplay Ability System for complex medical interactions and stamina modeling.
                </td>
              </tr>
              <tr className="hover:bg-deep-space-blue/30 transition-colors duration-150">
                <td className="px-6 py-4 align-top whitespace-nowrap text-sm font-medium text-starlight-blue">Armor System (AS)</td>
                <td className="px-6 py-4 text-sm text-starlight-blue/90 leading-relaxed">
                  Provides realistic protection with durability, quality tiers, and material-based mitigation (penetration, ricochet). Intercepts damage via the DS pipeline, modifying the <strong className="text-nebula-aqua">standardized damage information packet</strong> before it reaches the health system.
                </td>
              </tr>
              <tr className="hover:bg-deep-space-blue/30 transition-colors duration-150">
                <td className="px-6 py-4 align-top whitespace-nowrap text-sm font-medium text-starlight-blue">Projectile System (PDS)</td>
                <td className="px-6 py-4 text-sm text-starlight-blue/90 leading-relaxed">
                  Manages hitscan and simulated projectiles with advanced ballistics (fragmentation, spall). Initiates the damage event by populating the <strong className="text-nebula-aqua">standardized damage information packet</strong> with <strong className="text-nebula-aqua">projectile-specific data attributes</strong> and <strong className="text-nebula-aqua">definitions for projectile characteristics</strong> for the DS to process.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 sm:py-28 scroll-mt-20 bg-deep-space-blue">
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <div className="max-w-3xl mx-auto">
          <FAQItem
            question="What version of Unreal Engine are these plugins compatible with?"
            answer="Our plugins are designed for Unreal Engine 5.5 and are actively maintained for compatibility with the latest stable releases. We also strive to support recent prior versions where feasible."
          />
          <FAQItem
            question="Are the plugins difficult to integrate into an existing project?"
            answer="We'vedesigned them with modularity in mind. Each system can be integrated independently, and the core Damage System provides clear pathways for connecting them. Comprehensive documentation and examples are provided."
          />
          <FAQItem
            question="Can I customize the behavior of the systems?"
            answer="Absolutely. The systems are highly data-driven using Data Assets, and core logic is exposed through well-commented C++ and Blueprints, allowing for deep customization to fit your game's specific needs."
          />
          <FAQItem
            question="Is networking and replication handled?"
            answer="Yes, all systems are built with multiplayer in mind, featuring server-authoritative logic and efficient replication strategies for smooth online experiences."
          />
          <FAQItem
            question="What kind of support is offered?"
            answer="We offer dedicated support through our community forums and direct channels for licensed users. Plus, our extensive documentation covers common integration patterns and troubleshooting."
          />
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="py-24 sm:py-32 text-center bg-gradient-to-br from-comet-grey via-deep-space-blue to-comet-grey rounded-lg my-16 shadow-2xl scroll-mt-20 border border-shadow-slate/50">
        <h2 className="text-3xl sm:text-4xl font-bold text-starlight-blue mb-6">Ready to Craft Your Ultimate FPS?</h2>
        <p className="text-lg text-starlight-blue/80 max-w-xl mx-auto mb-10">
          Access the complete suite of FPS gameplay systems. Start building more dynamic, immersive, and engaging combat scenarios today.
        </p>
        <button 
          onClick={() => alert('CTA Button Clicked! This would lead to a purchase/download page.')}
          className="bg-cyber-teal hover:bg-nebula-aqua text-deep-space-blue font-bold py-3.5 px-10 rounded-md text-xl shadow-lg hover:shadow-cyber-teal/40 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
        >
          Get The Plugins Now <ArrowRightIcon />
        </button>
        <p className="text-sm text-starlight-blue/60 mt-8">
          Questions? <a href="#" onClick={(e) => {e.preventDefault(); alert('Contact/Support link would go here!');}} className="text-nebula-aqua hover:text-cyber-teal hover:underline">Contact Us</a>
          &nbsp;|&nbsp;
          <a href="/documentation" className="text-nebula-aqua hover:text-cyber-teal hover:underline">View Documentation</a>
        </p>
      </section>
    </>
  );
};
export default LandingPage;
