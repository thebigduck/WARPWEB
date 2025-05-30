import React, { useState, useEffect, useRef } from 'react';

// --- Icon Components ---
const ArrowRightIcon = () => (
  <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
  </svg>
);

const CheckCircleIcon = () => (
 <svg className="w-8 h-8 text-[#74C69D] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> {/* cyber-teal -> #74C69D */}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const BookOpenIcon = () => (
  <svg className="w-8 h-8 text-[#74C69D] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> {/* cyber-teal -> #74C69D */}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.25278C12 6.25278 5.65396 3 3 3C3 3 3 14.7472 3 18C3 21.3137 5.68629 21 5.68629 21C5.68629 21 12 18.7472 12 18.7472M12 6.25278C12 6.25278 18.346 3 21 3C21 3 21 14.7472 21 18C21 21.3137 18.3137 21 18.3137 21C18.3137 21 12 18.7472 12 18.7472M12 6.25278V18.7472"></path>
  </svg>
);

const StarIcon = ({ filled = true }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-[#2D6A4F]'}`} fill="currentColor" viewBox="0 0 20 20"> {/* comet-grey -> #2D6A4F */}
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  </svg>
);

// Corrected comment placement for ChevronDownIcon
const ChevronDownIcon = ({ className = "w-5 h-5 text-[#D8F3DC]/70" }) => ( // starlight-blue -> #D8F3DC
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
);

// Corrected comment placement for ChevronUpIcon
const ChevronUpIcon = ({ className = "w-5 h-5 text-[#D8F3DC]/70" }) => ( // starlight-blue -> #D8F3DC
 <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
);

// --- Modal Component ---
const Modal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4">
      <div className="bg-[#2D6A4F] p-6 sm:p-8 rounded-lg shadow-2xl max-w-md w-full border border-[#1B4332] text-[#D8F3DC]"> {/* comet-grey, shadow-slate, starlight-blue */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#74C69D]">{title || "Notification"}</h3> {/* cyber-teal */}
          <button onClick={onClose} className="text-[#D8F3DC] hover:text-[#95D5B2] transition-colors"> {/* starlight-blue, nebula-aqua */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <p className="text-[#D8F3DC]/90 leading-relaxed mb-6">{message}</p> {/* starlight-blue */}
        <button
          onClick={onClose}
          className="w-full bg-[#74C69D] hover:bg-[#95D5B2] text-[#081C15] font-bold py-2.5 px-4 rounded-md shadow-md hover:shadow-[#74C69D]/40 transition-all duration-300" /* cyber-teal, nebula-aqua, deep-space-blue */
        >
          Close
        </button>
      </div>
    </div>
  );
};


// --- Main App Component ---
const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const sectionRefs = useRef({});
  const headerOffset = 80; // Height of the sticky header

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const showModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const landingPageInternalSections = [
    'hero', 'key-benefits', 'features', 'testimonials', 'synergistic-systems', 'faq', 'cta'
  ];

  const navigationLinks = [
    { id: 'documentation', title: 'Documentation', isPageLink: true },
    { id: 'cta-header', title: 'Get Plugins', isPrimaryCta: true, scrollToId: 'cta' }
  ];

  useEffect(() => {
    // Populate refs for landing page sections when it's the current page
    if (currentPage === 'landing') {
      landingPageInternalSections.forEach(id => {
        sectionRefs.current[id] = document.getElementById(id);
      });
    }
  }, [currentPage]); // Re-run if currentPage changes

  const handleNavClick = (navItem) => {
    if (navItem.isPageLink && navItem.id === 'documentation') {
      setCurrentPage('documentation');
      window.scrollTo(0, 0); // Scroll to top when navigating to a new page
    } else if (navItem.scrollToId) {
        if (currentPage !== 'landing') {
            // If on documentation page, switch to landing first, then scroll
            setCurrentPage('landing');
            // Use setTimeout to allow the landing page to render before scrolling
            setTimeout(() => {
                scrollToInternalSection(navItem.scrollToId);
            }, 100); // Small delay for DOM update
        } else {
            // Already on landing page, just scroll
            scrollToInternalSection(navItem.scrollToId);
        }
    }
  };

  const scrollToInternalSection = (id) => {
    const element = sectionRefs.current[id];
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // --- Reusable Components ---
  const CodeBlock = ({ children, inline = false }) => {
    const langClass = inline ? "" : "language-cpp"; 
    let textContent = typeof children === 'string' ? children : String(children);

    if (inline) {
        textContent = textContent.replace(/&/g, '&amp;')
                                 .replace(/</g, '&lt;')
                                 .replace(/>/g, '&gt;')
                                 .replace(/"/g, '&quot;')
                                 .replace(/'/g, '&#039;');
    }


    if (!inline) {
        // Keywords
        textContent = textContent.replace(/\b(class|struct|enum|void|int|float|double|char|bool|auto|const|static|virtual|override|nullptr|this|if|else|for|while|return|new|delete|try|catch|throw|public|private|protected|namespace|using|template|typename|friend|inline|explicit|mutable|operator|sizeof|typedef|union|volatile|wchar_t|asm|break|case|continue|default|do|extern|goto|long|register|short|signed|switch|unsigned|true|false)\b/g, '<span class="text-pink-400">$1</span>');
        // Comments
        textContent = textContent.replace(/(\/\/.*)/g, '<span class="text-green-400">$1</span>'); // Original green, might need adjustment if it clashes
        textContent = textContent.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-green-400">$1</span>'); // Original green
        // Strings
        textContent = textContent.replace(/(\".*?\")/g, '<span class="text-yellow-400">$1</span>'); // Original yellow
        // Preprocessor
        textContent = textContent.replace(/(#include|#define|#ifdef|#ifndef|#endif|#pragma)\s*([<\w\.\/"]+)?/g, '<span class="text-purple-400">$1 $2</span>'); // Original purple
        // Types (common Unreal types)
        textContent = textContent.replace(/\b(UCLASS|UPROPERTY|UFUNCTION|GENERATED_BODY|FString|FName|FText|AActor|UActorComponent|UObject|TArray|TMap|TSet|TSubclassOf|UMyGame...)\b/g, '<span class="text-sky-400">$1</span>'); // Original sky blue
    }
    
    return (
      <pre className={`${inline ? '' : 'bg-[#2D6A4F]/50 p-4 rounded-md overflow-x-auto text-sm my-3 shadow-inner border border-[#1B4332]/50'} ${langClass}`}> {/* comet-grey, shadow-slate */}
        {inline ? (
            <code className='bg-[#2D6A4F] text-[#95D5B2] px-1.5 py-0.5 rounded text-sm font-mono' dangerouslySetInnerHTML={{ __html: textContent }}></code> /* comet-grey, nebula-aqua */
        ) : (
            <code className='text-[#D8F3DC] font-mono' dangerouslySetInnerHTML={{ __html: textContent }}></code> /* starlight-blue */
        )}
      </pre>
    );
  };

  const ListItem = ({ children, ordered = false, className = "" }) => (
    <li className={`mb-2 flex items-start ${className}`}>
      {!ordered && (
        <svg className="w-5 h-5 text-[#74C69D] mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"> {/* cyber-teal */}
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
        </svg>
      )}
      <span className="text-[#D8F3DC]">{children}</span> {/* starlight-blue */}
    </li>
  );

  const SubListItem = ({ children, ordered = false, className = "" }) => ( 
    <li className={`ml-5 mb-1 flex items-start ${className}`}> 
        {!ordered && (
        <svg className="w-4 h-4 text-[#95D5B2] mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"> {/* nebula-aqua */}
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
        </svg>
      )}
      <span className="text-[#D8F3DC]/90 text-sm">{children}</span>  {/* starlight-blue */}
    </li>
  );
 
  const SectionTitle = ({ children, className = "" }) => ( 
    <h2 className={`text-3xl sm:text-[2.5rem] font-bold mb-12 text-[#74C69D] border-b-2 border-[#74C69D]/30 pb-4 text-center ${className}`}> {/* cyber-teal */}
      {children}
    </h2>
  );
 
  const DocMainTitle = ({id, children, onClick, isExpanded, className=""}) => ( 
    <button onClick={onClick} className={`w-full flex justify-between items-center text-left text-2xl sm:text-3xl font-bold mb-6 text-[#74C69D] scroll-mt-24 py-2 hover:text-[#95D5B2] transition-colors ${className}`}> {/* cyber-teal, nebula-aqua */}
        <h1 id={id} className="flex-grow font-['Chypre',_Inter,_sans-serif] font-bold">{children}</h1>
        {isExpanded ? <ChevronUpIcon className="w-6 h-6 text-[#74C69D] ml-2"/> : <ChevronDownIcon className="w-6 h-6 text-[#74C69D] ml-2"/>} {/* cyber-teal */}
    </button>
  );

  const DocSubTitle = ({id, children, onClick, isExpanded, className=""}) => ( 
    <button onClick={onClick} className={`w-full flex justify-between items-center text-left text-xl sm:text-2xl font-bold mb-4 text-[#74C69D] border-l-4 border-[#74C69D]/50 pl-4 scroll-mt-24 py-1 hover:text-[#95D5B2] transition-colors ${className}`}> {/* cyber-teal, nebula-aqua */}
        <h2 id={id} className="flex-grow font-['Chypre',_Inter,_sans-serif] font-bold">{children}</h2>
        {isExpanded ? <ChevronUpIcon className="w-5 h-5 text-[#74C69D] ml-2"/> : <ChevronDownIcon className="w-5 h-5 text-[#74C69D] ml-2"/>} {/* cyber-teal */}
    </button>
  );

  const DocSubSubTitle = ({id, children, className=""}) => ( 
    <h3 id={id} className={`text-lg sm:text-xl font-medium mb-4 mt-8 text-[#95D5B2] scroll-mt-24 ${className} font-['Chypre',_Inter,_sans-serif]`}> {/* nebula-aqua */}
        {children}
    </h3>
  );
 
  const DocSubSubSubTitle = ({id, children, className=""}) => ( 
    <h4 id={id} className={`text-base sm:text-lg font-medium mb-3 mt-6 text-[#D8F3DC] scroll-mt-24 ${className} font-['Chypre',_Inter,_sans-serif]`}> {/* starlight-blue */}
        {children}
    </h4>
  );


  const BenefitCard = ({ icon, title, children }) => (
    <div className="bg-[#2D6A4F] p-6 rounded-lg shadow-xl hover:shadow-[#74C69D]/20 transition-all duration-300 transform hover:-translate-y-1 border border-[#1B4332]/50 flex flex-col items-center text-center h-full"> {/* comet-grey, cyber-teal, shadow-slate */}
      {icon}
      <h3 className="text-xl font-medium text-[#D8F3DC] mb-2 mt-1">{title}</h3> {/* starlight-blue */}
      <p className="text-[#D8F3DC]/80 leading-relaxed text-sm flex-grow">{children}</p> {/* starlight-blue */}
    </div>
  );

  const TestimonialCard = ({ name, role, stars, text, avatar }) => (
    <div className="bg-[#2D6A4F] p-6 rounded-lg shadow-xl backdrop-blur-sm border border-[#1B4332]/50 h-full flex flex-col"> {/* comet-grey, shadow-slate */}
      <div className="flex items-center mb-4">
        <img src={avatar || `https://placehold.co/60x60/081C15/D8F3DC?text=${name.charAt(0)}`} alt={name} className="w-14 h-14 rounded-full mr-4 border-2 border-[#74C69D]" onError={(e) => e.target.src = `https://placehold.co/60x60/081C15/D8F3DC?text=${name.charAt(0)}`} /> {/* deep-space-blue, starlight-blue, cyber-teal */}
        <div>
          <h4 className="font-medium text-[#D8F3DC]">{name}</h4> {/* starlight-blue */}
          <p className="text-xs text-[#74C69D]">{role}</p> {/* cyber-teal */}
        </div>
      </div>
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < stars} />)}
      </div>
      <p className="text-[#D8F3DC]/90 leading-relaxed italic text-sm flex-grow">"{text}"</p> {/* starlight-blue */}
    </div>
  );

  const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border-b border-[#2D6A4F]/50 py-5"> {/* comet-grey */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center w-full text-left"
        >
          <h3 className="text-lg font-medium text-[#D8F3DC]">{question}</h3> {/* starlight-blue */}
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
        {isOpen && <p className="mt-3 text-[#D8F3DC]/80 leading-relaxed pr-6">{answer}</p>} {/* starlight-blue */}
      </div>
    );
  };

  // --- Page Content Components ---
  const LandingPage = () => (
    <>
      {/* Hero Section */}
      <section 
        id="hero" 
        className="min-h-[calc(90vh-80px)] flex flex-col justify-center items-center text-center py-16 sm:py-24 scroll-mt-20 relative bg-[#081C15]" /* deep-space-blue */
        style={{ 
          backgroundImage: `url('https://placehold.co/1920x1080/081C15/1B4332?text=Abstract+Green+Grid')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center center' 
        }}
      >
        <div className="absolute inset-0 bg-[#081C15]/80 backdrop-blur-sm"></div> {/* deep-space-blue */}
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#D8F3DC] mb-6 leading-tight"> {/* starlight-blue */}
            Engineer <span className="text-[#74C69D]">Deeply Immersive</span> FPS Combat {/* cyber-teal */}
          </h1>
          <p className="text-lg sm:text-xl text-[#D8F3DC]/90 max-w-3xl mx-auto mb-10"> {/* starlight-blue */}
            Unlock unparalleled gameplay depth with our suite of Unreal Engine plugins. Forge intense, dynamic battles with sophisticated damage, armor, ballistics, and health systems designed for maximum player engagement.
          </p>
          <button 
            onClick={() => scrollToInternalSection('cta')}
            className="bg-[#74C69D] hover:bg-[#95D5B2] text-[#081C15] font-bold py-3 px-8 rounded-md text-lg shadow-lg hover:shadow-[#74C69D]/40 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto" /* cyber-teal, nebula-aqua, deep-space-blue */
          >
            Explore Plugins <ArrowRightIcon />
          </button>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section id="key-benefits" className="py-20 sm:py-28 scroll-mt-20 bg-[#081C15]"> {/* deep-space-blue */}
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
      <section id="features" className="py-20 sm:py-28 scroll-mt-20 bg-[#1B4332]"> {/* shadow-slate */}
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
            <div key={feature.title} className="bg-[#2D6A4F] p-6 rounded-lg shadow-lg hover:shadow-[#95D5B2]/20 transition-all duration-300 transform hover:-translate-y-1 border border-[#1B4332]/70"> {/* comet-grey, nebula-aqua, shadow-slate */}
              <h3 className="text-xl font-medium text-[#74C69D] mb-3">{feature.title}</h3> {/* cyber-teal */}
              <p className="text-[#D8F3DC]/90 leading-relaxed text-sm">{feature.text}</p> {/* starlight-blue */}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 sm:py-28 scroll-mt-20 bg-[#081C15]"> {/* deep-space-blue */}
        <SectionTitle>Developer Acclaim</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard name="Rina K." role="Lead Systems Designer, AAA Studio" stars={5} text="The depth of the damage and armor simulation is astounding. These plugins formed the backbone of our combat and saved us countless hours." avatar="https://placehold.co/100x100/74C69D/081C15?text=RK"/> {/* cyber-teal, deep-space-blue */}
          <TestimonialCard name="Devon 'Spark' Lee" role="Indie FPS Creator" stars={5} text="As a solo dev, this toolkit is a lifesaver. Robust, well-documented, and the modularity lets me use exactly what I need. My game feels incredible!" avatar="https://placehold.co/100x100/95D5B2/081C15?text=DL"/> {/* nebula-aqua, deep-space-blue */}
          <TestimonialCard name="Dr. Anya Sharma" role="Simulation Specialist, R&D" stars={4} text="Impressive realism in projectile physics and material interaction. Required some adaptation for our specific research needs, but the foundation is exceptionally strong." avatar="https://placehold.co/100x100/B7E4C7/081C15?text=AS"/> {/* A lighter green from palette, deep-space-blue */}
        </div>
      </section>

      {/* Synergistic Systems Section */}
      <section id="synergistic-systems" className="py-20 sm:py-28 scroll-mt-20 bg-[#1B4332]"> {/* shadow-slate */}
        <SectionTitle>Synergistic Systems: A Cohesive Combat Core</SectionTitle>
        <p className="text-center text-[#D8F3DC]/80 max-w-3xl mx-auto mb-12 leading-relaxed"> {/* starlight-blue */}
          Our plugins are not just individual tools; they form a deeply interconnected ecosystem. This synergy ensures realistic and consistent gameplay mechanics across all aspects of combat, from the moment a projectile is fired to its ultimate impact and effect.
        </p>
        <div className="overflow-x-auto bg-[#2D6A4F] p-6 rounded-lg shadow-2xl border border-[#1B4332]/70"> {/* comet-grey, shadow-slate */}
          <table className="min-w-full divide-y divide-[#2D6A4F]/30"> {/* comet-grey */}
            <thead className="bg-[#081C15]/50"> {/* deep-space-blue */}
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#74C69D] uppercase tracking-wider">System Component</th> {/* cyber-teal */}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#74C69D] uppercase tracking-wider">Key Features & Software Design Patterns</th> {/* cyber-teal */}
              </tr>
            </thead>
            <tbody className="bg-[#2D6A4F] divide-y divide-[#1B4332]/50"> {/* comet-grey, shadow-slate */}
              <tr className="hover:bg-[#081C15]/30 transition-colors duration-150"> {/* deep-space-blue */}
                <td className="px-6 py-4 align-top whitespace-nowrap text-sm font-medium text-[#D8F3DC]"> {/* starlight-blue */}
                  Damage System (DS) <br /> <span className="text-xs text-[#D8F3DC]/70">The Orchestrator</span> {/* starlight-blue */}
                </td>
                <td className="px-6 py-4 text-sm text-[#D8F3DC]/90 leading-relaxed"> {/* starlight-blue */}
                  Centralizes damage processing through a <strong className="text-[#95D5B2]">core routing component</strong>, ensuring a consistent event pipeline. Defines a <strong className="text-[#95D5B2]">standardized damage information packet</strong> and <strong className="text-[#95D5B2]">shared definitions for item properties</strong>, crucial for inter-plugin communication and data-driven design. {/* nebula-aqua */}
                </td>
              </tr>
              <tr className="hover:bg-[#081C15]/30 transition-colors duration-150"> {/* deep-space-blue */}
                <td className="px-6 py-4 align-top whitespace-nowrap text-sm font-medium text-[#D8F3DC]">Limb Health System (LHS)</td> {/* starlight-blue */}
                <td className="px-6 py-4 text-sm text-[#D8F3DC]/90 leading-relaxed"> {/* starlight-blue */}
                  Enables granular, per-limb health and status effects. Reacts to <strong className="text-[#95D5B2]">standardized damage information</strong> from the DS to apply localized injuries, seamlessly working with the Gameplay Ability System for complex medical interactions and stamina modeling. {/* nebula-aqua */}
                </td>
              </tr>
              <tr className="hover:bg-[#081C15]/30 transition-colors duration-150"> {/* deep-space-blue */}
                <td className="px-6 py-4 align-top whitespace-nowrap text-sm font-medium text-[#D8F3DC]">Armor System (AS)</td> {/* starlight-blue */}
                <td className="px-6 py-4 text-sm text-[#D8F3DC]/90 leading-relaxed"> {/* starlight-blue */}
                  Provides realistic protection with durability, quality tiers, and material-based mitigation (penetration, ricochet). Intercepts damage via the DS pipeline, modifying the <strong className="text-[#95D5B2]">standardized damage information packet</strong> before it reaches the health system. {/* nebula-aqua */}
                </td>
              </tr>
              <tr className="hover:bg-[#081C15]/30 transition-colors duration-150"> {/* deep-space-blue */}
                <td className="px-6 py-4 align-top whitespace-nowrap text-sm font-medium text-[#D8F3DC]">Projectile System (PDS)</td> {/* starlight-blue */}
                <td className="px-6 py-4 text-sm text-[#D8F3DC]/90 leading-relaxed"> {/* starlight-blue */}
                  Manages hitscan and simulated projectiles with advanced ballistics (fragmentation, spall). Initiates the damage event by populating the <strong className="text-[#95D5B2]">standardized damage information packet</strong> with <strong className="text-[#95D5B2]">projectile-specific data attributes</strong> and <strong className="text-[#95D5B2]">definitions for projectile characteristics</strong> for the DS to process. {/* nebula-aqua */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 sm:py-28 scroll-mt-20 bg-[#081C15]"> {/* deep-space-blue */}
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
      <section id="cta" className="py-24 sm:py-32 text-center bg-gradient-to-br from-[#2D6A4F] via-[#081C15] to-[#2D6A4F] rounded-lg my-16 shadow-2xl scroll-mt-20 border border-[#1B4332]/50"> {/* comet-grey, deep-space-blue, shadow-slate */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#D8F3DC] mb-6">Ready to Craft Your Ultimate FPS?</h2> {/* starlight-blue */}
        <p className="text-lg text-[#D8F3DC]/80 max-w-xl mx-auto mb-10"> {/* starlight-blue */}
          Access the complete suite of FPS gameplay systems. Start building more dynamic, immersive, and engaging combat scenarios today.
        </p>
        <button 
          onClick={() => showModal('Get Plugins', 'This action would typically lead to a purchase or download page for the plugins.')}
          className="bg-[#74C69D] hover:bg-[#95D5B2] text-[#081C15] font-bold py-3.5 px-10 rounded-md text-xl shadow-lg hover:shadow-[#74C69D]/40 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto" /* cyber-teal, nebula-aqua, deep-space-blue */
        >
          Get The Plugins Now <ArrowRightIcon />
        </button>
        <p className="text-sm text-[#D8F3DC]/60 mt-8"> {/* starlight-blue */}
          Questions? <a href="#" onClick={(e) => {e.preventDefault(); showModal('Contact Us', 'This link would typically lead to a contact form or support page.');}} className="text-[#95D5B2] hover:text-[#74C69D] hover:underline">Contact Us</a> {/* nebula-aqua, cyber-teal */}
          &nbsp;|&nbsp;
          <a href="#" onClick={(e) => {e.preventDefault(); setCurrentPage('documentation'); window.scrollTo(0,0);}} className="text-[#95D5B2] hover:text-[#74C69D] hover:underline">View Documentation</a> {/* nebula-aqua, cyber-teal */}
        </p>
      </section>
    </>
  );

  // --- Documentation Page Data ---
  const docSections = [
    // Developer Integration Guide
    { id: 'dev-guide-main', title: 'Developer Integration Guide (v2)', parent: 'dev-guide', level: 1 },
    { id: 'dev-guide-intro-link', title: '1. Introduction', parent: 'dev-guide', level: 2 }, 
    { id: 'dev-guide-intro-purpose', title: '1.1 Purpose of This Guide', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-intro-link' },
    { id: 'dev-guide-intro-ecosystem', title: '1.2 Plugin Ecosystem Overview', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-intro-link' },
    { id: 'dev-guide-prerequisites-link', title: '2. Prerequisites', parent: 'dev-guide', level: 2 },
    { id: 'dev-guide-plugin-setup-link', title: '3. Plugin Setup', parent: 'dev-guide', level: 2 },
    { id: 'dev-guide-plugin-setup-adding', title: '3.1 Adding Plugins', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-plugin-setup-link' },
    { id: 'dev-guide-plugin-setup-enabling', title: '3.2 Enabling Plugins', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-plugin-setup-link' },
    { id: 'dev-guide-core-concepts-link', title: '4. Core Concepts & Dependencies', parent: 'dev-guide', level: 2 },
    { id: 'dev-guide-core-concepts-api', title: '4.1 API Macros', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-core-concepts-link' },
    { id: 'dev-guide-core-concepts-shared-types', title: '4.2 Shared Data Types', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-core-concepts-link' },
    { id: 'dev-guide-core-concepts-dependencies', title: '4.3 Plugin Dependency Config', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-core-concepts-link' },
    { id: 'dev-guide-lhs-integration-link', title: '5. LHS Integration', parent: 'dev-guide', level: 2 },
    { id: 'dev-guide-lhs-character-setup', title: '5.1 Character Setup (LHS)', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-lhs-integration-link' },
    { id: 'dev-guide-lhs-data-asset', title: '5.2 Data Asset Creation (LHS)', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-lhs-integration-link' },
    { id: 'dev-guide-lhs-damage-feedback', title: '5.3 Damage Feedback (LHS)', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-lhs-integration-link' },
    { id: 'dev-guide-as-integration-link', title: '6. AS Integration', parent: 'dev-guide', level: 2 },
    { id: 'dev-guide-as-character-setup', title: '6.1 Character Setup (AS)', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-as-integration-link' },
    { id: 'dev-guide-as-data-asset', title: '6.2 Data Asset Creation (AS)', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-as-integration-link' },
    { id: 'dev-guide-as-equipping', title: '6.3 Equipping Armor (AS)', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-as-integration-link' },
    { id: 'dev-guide-as-damage-interaction', title: '6.4 Damage Interaction (AS)', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-as-integration-link' },
    { id: 'dev-guide-pds-integration-link', title: '7. PDS Integration', parent: 'dev-guide', level: 2 },
    { id: 'dev-guide-pds-archetype-data', title: '7.1 Archetype Data Assets (PDS)', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-pds-integration-link' },
    { id: 'dev-guide-pds-firing-logic', title: '7.2 Firing Logic (PDS)', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-pds-integration-link' },
    { id: 'dev-guide-pds-dispatching-context', title: '7.3 Populating Context (PDS)', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-pds-integration-link' },
    { id: 'dev-guide-ds-integration-link', title: '8. DS Integration', parent: 'dev-guide', level: 2 },
    { id: 'dev-guide-ds-actor-setup', title: '8.1 Actor Setup (DS)', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-ds-integration-link' },
    { id: 'dev-guide-ds-direct-damage-ge', title: '8.2 Direct Damage GE (DS)', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-ds-integration-link' },
    { id: 'dev-guide-ds-gameplaycue-setup', title: '8.3 GameplayCue Setup (DS)', parent: 'dev-guide', level: 3, subSectionOf: 'dev-guide-ds-integration-link' },
    { id: 'dev-guide-damage-flow-link', title: '9. Damage Flow Example', parent: 'dev-guide', level: 2 },
    { id: 'dev-guide-best-practices-link', title: '10. Best Practices & Troubleshooting', parent: 'dev-guide', level: 2 },
   
    // Projectile System (PDS) Plugin
    { id: 'pds-plugin-main', title: 'Projectile System (PDS) Plugin', parent: 'pds-plugin', level: 1 },
    { id: 'pds-plugin-overview-link', title: '1. Overview', parent: 'pds-plugin', level: 2 },
    { id: 'pds-plugin-core-features-link', title: '2. Core Features', parent: 'pds-plugin', level: 2 },
    { id: 'pds-plugin-key-classes-link', title: '3. Key C++ Classes & Data Assets', parent: 'pds-plugin', level: 2 },
    { id: 'pds-plugin-directory-structure-link', title: '4. Directory Structure', parent: 'pds-plugin', level: 2 },
    { id: 'pds-plugin-integration-points-link', title: '5. Integration Points', parent: 'pds-plugin', level: 2 },
    { id: 'pds-plugin-integration-ds', title: '5.1 Damage System (DS)', parent: 'pds-plugin', level: 3, subSectionOf: 'pds-plugin-integration-points-link'},
    { id: 'pds-plugin-integration-as', title: '5.2 Armor System (AS)', parent: 'pds-plugin', level: 3, subSectionOf: 'pds-plugin-integration-points-link'},
    { id: 'pds-plugin-integration-lhs', title: '5.3 Limb Health System (LHS)', parent: 'pds-plugin', level: 3, subSectionOf: 'pds-plugin-integration-points-link'},
    { id: 'pds-plugin-integration-weapon', title: '5.4 External Weapon System', parent: 'pds-plugin', level: 3, subSectionOf: 'pds-plugin-integration-points-link'},
    { id: 'pds-plugin-setup-usage-link', title: '6. Setup & Usage Notes', parent: 'pds-plugin', level: 2 },

    // Limb Health System (LHS) Plugin
    { id: 'lhs-plugin-main', title: 'Limb Health System (LHS) Plugin', parent: 'lhs-plugin', level: 1 },
    { id: 'lhs-plugin-overview-link', title: '1. Overview', parent: 'lhs-plugin', level: 2 },
    { id: 'lhs-plugin-core-features-link', title: '2. Core Features', parent: 'lhs-plugin', level: 2 },
    { id: 'lhs-plugin-key-classes-link', title: '3. Key C++ Classes & Data Assets', parent: 'lhs-plugin', level: 2 },
    { id: 'lhs-plugin-directory-structure-link', title: '4. Directory Structure', parent: 'lhs-plugin', level: 2 },
    { id: 'lhs-plugin-integration-points-link', title: '5. Integration Points', parent: 'lhs-plugin', level: 2 },
    { id: 'lhs-plugin-integration-ds', title: '5.1 Damage System (DS) Dependency', parent: 'lhs-plugin', level: 3, subSectionOf: 'lhs-plugin-integration-points-link'},
    { id: 'lhs-plugin-integration-gas', title: '5.2 Gameplay Ability System (GAS)', parent: 'lhs-plugin', level: 3, subSectionOf: 'lhs-plugin-integration-points-link'},
    { id: 'lhs-plugin-setup-usage-link', title: '6. Setup & Usage Notes', parent: 'lhs-plugin', level: 2 },

    // Armor System (AS) Plugin
    { id: 'as-plugin-main', title: 'Armor System (AS) Plugin', parent: 'as-plugin', level: 1 },
    { id: 'as-plugin-overview-link', title: '1. Overview', parent: 'as-plugin', level: 2 },
    { id: 'as-plugin-core-features-link', title: '2. Core Features', parent: 'as-plugin', level: 2 },
    { id: 'as-plugin-key-classes-link', title: '3. Key C++ Classes & Data Assets', parent: 'as-plugin', level: 2 },
    { id: 'as-plugin-directory-structure-link', title: '4. Directory Structure', parent: 'as-plugin', level: 2 },
    { id: 'as-plugin-integration-points-link', title: '5. Integration Points', parent: 'as-plugin', level: 2 },
    { id: 'as-plugin-integration-ds', title: '5.1 Damage System (DS)', parent: 'as-plugin', level: 3, subSectionOf: 'as-plugin-integration-points-link'},
    { id: 'as-plugin-integration-lhs', title: '5.2 Limb Health System (LHS)', parent: 'as-plugin', level: 3, subSectionOf: 'as-plugin-integration-points-link'},
    { id: 'as-plugin-integration-pds', title: '5.3 Projectile System (PDS)', parent: 'as-plugin', level: 3, subSectionOf: 'as-plugin-integration-points-link'},
    { id: 'as-plugin-setup-usage-link', title: '6. Setup & Usage Notes', parent: 'as-plugin', level: 2 },

    // Damage System (DS) Plugin
    { id: 'ds-plugin-main', title: 'Damage System (DS) Plugin', parent: 'ds-plugin', level: 1 },
    { id: 'ds-plugin-overview-link', title: '1. Overview', parent: 'ds-plugin', level: 2 },
    { id: 'ds-plugin-core-features-link', title: '2. Core Features', parent: 'ds-plugin', level: 2 },
    { id: 'ds-plugin-key-classes-link', title: '3. Key C++ Classes & Data Structures', parent: 'ds-plugin', level: 2 },
    { id: 'ds-plugin-directory-structure-link', title: '4. Directory Structure', parent: 'ds-plugin', level: 2 },
    { id: 'ds-plugin-integration-points-link', title: '5. Integration Points', parent: 'ds-plugin', level: 2 },
    { id: 'ds-plugin-integration-provider', title: '5.1 Provider of Core Types', parent: 'ds-plugin', level: 3, subSectionOf: 'ds-plugin-integration-points-link'},
    { id: 'ds-plugin-integration-orchestrator', title: '5.2 Orchestrator of Damage Flow', parent: 'ds-plugin', level: 3, subSectionOf: 'ds-plugin-integration-points-link'},
    { id: 'ds-plugin-integration-gameplaycue', title: '5.3 GameplayCue System', parent: 'ds-plugin', level: 3, subSectionOf: 'ds-plugin-integration-points-link'},
    { id: 'ds-plugin-setup-usage-link', title: '6. Setup & Usage Notes', parent: 'ds-plugin', level: 2 },
  ];


  const DocumentationPage = () => {
    const [activeDocSection, setActiveDocSection] = useState(docSections.find(s => s.level === 1)?.id || '');
    const [expandedDocSections, setExpandedDocSections] = useState({}); 
    const docSectionRefs = useRef({});
    const docContentRef = useRef(null); 

    // Initialize refs for all document sections
    useEffect(() => {
        docSections.forEach(section => {
            docSectionRefs.current[section.id] = document.getElementById(section.id);
        });
    }, []);
   
    // Auto-expand parent sections of the activeDocSection
    useEffect(() => {
        if (activeDocSection) {
            const newExpanded = { ...expandedDocSections }; 
            let current = docSections.find(s => s.id === activeDocSection);
            const parentsToExpand = [];

            // Traverse up to find all parent H1 and H2 sections
            while(current) {
                if(current.level === 1) { // H1
                    parentsToExpand.push(current.id);
                } else if (current.level === 2) { // H2
                     parentsToExpand.push(current.id);
                     // Also ensure its H1 parent is marked for expansion
                     const h1Parent = docSections.find(s => s.parent === current.parent && s.level === 1);
                     if (h1Parent) parentsToExpand.push(h1Parent.id);
                }
                // Determine next parent: either subSectionOf or the main H1/H2 of its group
                current = docSections.find(s => s.id === current.subSectionOf || (current.level > 1 && s.id === docSections.find(ds => ds.parent === current.parent && ds.level ===1)?.id ));
            }
           
            parentsToExpand.forEach(id => newExpanded[id] = true);
            setExpandedDocSections(newExpanded);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeDocSection]); // Only run when activeDocSection changes


    // Scroll spy for main content area
    useEffect(() => {
        const contentArea = docContentRef.current;
        if (!contentArea) return;

        const handleScroll = () => {
            const scrollPosition = contentArea.scrollTop + headerOffset + 40; 
            let currentSectionId = "";
           
            for (const section of docSections) {
                const element = docSectionRefs.current[section.id];
                if (element) {
                    const elementTopInContainer = element.offsetTop; 
                    if (elementTopInContainer <= scrollPosition) {
                        currentSectionId = section.id;
                    } else {
                        break; 
                    }
                }
            }
            if (!currentSectionId && docSections.length > 0) {
                 currentSectionId = docSections.find(s => s.level === 1)?.id || docSections[0].id;
            }

            if (activeDocSection !== currentSectionId && currentSectionId) {
                setActiveDocSection(currentSectionId);
            }
        };
       
        contentArea.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); 
        return () => contentArea.removeEventListener('scroll', handleScroll);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 


    const scrollToDocSection = (id) => {
        const element = docSectionRefs.current[id];
        const contentArea = docContentRef.current;
        if (element && contentArea) {
            const elementTopInContainer = element.offsetTop;
            contentArea.scrollTo({
                top: elementTopInContainer - headerOffset, 
                behavior: 'smooth'
            });
        }
    };

    const toggleDocSectionExpansion = (sectionId) => {
        setExpandedDocSections(prev => {
            const isCurrentlyExpanded = !!prev[sectionId];
            const newExpandedState = { ...prev, [sectionId]: !isCurrentlyExpanded };

            const sectionMeta = docSections.find(s => s.id === sectionId);

            if (sectionMeta?.level === 1) { 
                docSections.forEach(s => {
                    if (s.parent === sectionMeta.parent && s.level === 2) {
                        newExpandedState[s.id] = !isCurrentlyExpanded;
                    }
                });
            }
            return newExpandedState;
        });
    };
   
    const renderDocNavRecursive = (parentId = null, currentLevel = 1) => {
        const children = docSections.filter(s => (s.parent === parentId && s.level === currentLevel) || (s.subSectionOf === parentId && s.level === currentLevel));
        if (children.length === 0) return null;

        return (
            <ul className={`${currentLevel > 1 ? 'pl-3' : ''} space-y-1`}>
                {children.map(section => (
                    <li key={section.id}>
                        <button
                            onClick={() => {
                                scrollToDocSection(section.id);
                                if (section.level === 2) {
                                    const h1Parent = docSections.find(s => s.parent === section.parent && s.level === 1);
                                    if (h1Parent) {
                                      setExpandedDocSections(prev => ({...prev, [h1Parent.id]: true, [section.id]: true }));
                                    }
                                }
                            }}
                            className={`block w-full text-left py-1 px-2 rounded transition-colors duration-150
                                ${activeDocSection === section.id ? 'bg-[#74C69D] text-[#081C15] font-semibold' : 'text-[#D8F3DC] hover:bg-[#2D6A4F] hover:text-[#95D5B2]'}
                                ${section.level === 1 ? 'font-bold text-[#74C69D] text-lg mt-3' : section.level === 2 ? 'text-sm font-medium' : 'text-xs pl-3'}`}
                        >
                            {section.title.replace(/\((?:v2|DS|LHS|AS|PDS)\)/g, '').replace(/^\d+\.\s*/, '').trim()}
                        </button>
                        { section.level === 2 && expandedDocSections[section.id] && docSections.some(s => s.subSectionOf === section.id && s.level === 3) && 
                            renderDocNavRecursive(section.id, 3) 
                        }
                    </li>
                ))}
            </ul>
        );
    };


    return (
    <div className="flex flex-col lg:flex-row py-12 sm:py-16 gap-x-8 gap-y-6">
        {/* Sticky Side Navigation */}
        <aside className="w-full lg:w-72 xl:w-80 lg:sticky lg:top-24 self-start bg-[#2D6A4F] p-5 rounded-lg shadow-lg max-h-[calc(100vh-12rem)] overflow-y-auto border border-[#1B4332]"> {/* comet-grey, shadow-slate */}
            <h2 className="text-xl font-bold text-[#74C69D] mb-4 border-b border-[#1B4332] pb-2">Documentation Menu</h2> {/* cyber-teal, shadow-slate */}
            <nav>
                {docSections.filter(s => s.level === 1).map(topLevelSection => ( 
                    <div key={topLevelSection.id} className="mb-3">
                        <button
                            onClick={() => {
                                scrollToDocSection(topLevelSection.id);
                                toggleDocSectionExpansion(topLevelSection.id); 
                            }}
                            className={`flex justify-between items-center w-full text-left py-1.5 px-2 rounded transition-colors duration-150 font-bold text-lg
                                ${expandedDocSections[topLevelSection.id] || docSections.find(s => s.id === activeDocSection)?.parent === topLevelSection.parent 
                                    ? 'text-[#74C69D] bg-[#081C15]/30'  /* cyber-teal, deep-space-blue */
                                    : 'text-[#74C69D] hover:bg-[#2D6A4F]/70'}`} /* cyber-teal, comet-grey */
                        >
                            <span>{topLevelSection.title.replace(/\s*\((?:v2|DS|LHS|AS|PDS)\)/g, '').trim()}</span>
                            {expandedDocSections[topLevelSection.id] ? <ChevronUpIcon className="w-5 h-5 text-[#74C69D]/80"/> : <ChevronDownIcon className="w-5 h-5 text-[#74C69D]/80"/>} {/* cyber-teal */}
                        </button>
                        {expandedDocSections[topLevelSection.id] && renderDocNavRecursive(topLevelSection.parent, 2)}
                    </div>
                ))}
            </nav>
        </aside>

        {/* Main Documentation Content */}
        <div ref={docContentRef} className="w-full lg:flex-1 bg-[#2D6A4F] p-6 sm:p-10 rounded-lg shadow-2xl border border-[#1B4332] text-[#D8F3DC] leading-relaxed max-h-[calc(100vh-8rem)] lg:max-h-[calc(100vh-12rem)] overflow-y-auto scroll-pt-24 documentation-page-content" > {/* comet-grey, shadow-slate, starlight-blue */}
            <button 
                onClick={() => { setCurrentPage('landing'); window.scrollTo(0,0);}}
                className="mb-10 bg-[#74C69D] hover:bg-[#95D5B2] text-[#081C15] font-bold py-2 px-6 rounded-md shadow-md hover:shadow-[#74C69D]/40 transition-all duration-300 flex items-center" /* cyber-teal, nebula-aqua, deep-space-blue */
            >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                Back to Home
            </button>
            <SectionTitle className="mb-16 text-left !pb-6 !text-3xl sm:!text-4xl">Unreal Engine FPS Gameplay Systems</SectionTitle>
           
            {/* Developer Integration Guide Content */}
            <article className="space-y-10 doc-article">
                <DocMainTitle 
                    id="dev-guide-main" 
                    onClick={() => toggleDocSectionExpansion('dev-guide-main')}
                    isExpanded={!!expandedDocSections['dev-guide-main']}
                >
                    Developer Integration Guide (v2)
                </DocMainTitle>
                {expandedDocSections['dev-guide-main'] && (
                    <>
                        <hr className="border-[#1B4332]/50 my-6"/> {/* shadow-slate */}
                        <section id="dev-guide-intro-link"> 
                            <DocSubTitle 
                                id="dev-guide-intro-sublink" 
                                onClick={() => toggleDocSectionExpansion('dev-guide-intro-link')} 
                                isExpanded={!!expandedDocSections['dev-guide-intro-link']}
                            >1. Introduction</DocSubTitle> 
                             {expandedDocSections['dev-guide-intro-link'] && (
                                <div className="pl-4 pt-3">
                                    <DocSubSubTitle id="dev-guide-intro-purpose">1.1 Purpose of This Guide</DocSubSubTitle>
                                    <p>This document provides in-depth instructions for integrating the <strong className="text-[#95D5B2]">Limb Health System (LHS)</strong>, <strong className="text-[#95D5B2]">Armor System (AS)</strong>, <strong className="text-[#95D5B2]">Projectile System (PDS)</strong>, and the <strong className="text-[#95D5B2]">Damage System (DS)</strong> into your Unreal Engine 5.5 project. DS now also hosts all core shared data types—ensuring a single source of truth for your combat framework.</p> {/* nebula-aqua */}
                                    <DocSubSubTitle id="dev-guide-intro-ecosystem">1.2 Plugin Ecosystem Overview</DocSubSubTitle>
                                     <div className="overflow-x-auto bg-[#081C15]/50 p-3 my-4 rounded-md shadow-inner border border-[#1B4332]/60"> {/* deep-space-blue, shadow-slate */}
                                        <table className="min-w-full divide-y divide-[#1B4332]/40 text-sm"> {/* shadow-slate */}
                                            <thead className="bg-[#2D6A4F]/50"> {/* comet-grey */}
                                                <tr>
                                                    <th className="px-4 py-2 text-left font-medium text-[#74C69D]">Plugin</th> {/* cyber-teal */}
                                                    <th className="px-4 py-2 text-left font-medium text-[#74C69D]">Responsibility & Dependencies</th> {/* cyber-teal */}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#1B4332]/40"> {/* shadow-slate */}
                                                <tr>
                                                    <td className="px-4 py-3 align-top font-medium text-[#D8F3DC]">DS (Damage System – Core Utilities & Types)</td> {/* starlight-blue */}
                                                    <td className="px-4 py-3 align-top">
                                                        <strong className="block text-[#D8F3DC]/90">Provides:</strong> {/* starlight-blue */}
                                                        <ul className="list-none mt-1 space-y-0.5 pl-0"> 
                                                            <ListItem className="!items-baseline"><CodeBlock inline>FDamageContext</CodeBlock> & <CodeBlock inline>UDamageRouterComponent</CodeBlock></ListItem>
                                                            <ListItem className="!items-baseline"><strong className="text-[#D8F3DC]/90">Shared Types</strong>: {/* starlight-blue */}
                                                                <ul className="list-none mt-1 space-y-0.5 pl-4"> 
                                                                    <SubListItem><CodeBlock inline>ItemSystemTypes.h</CodeBlock> (e.g., <CodeBlock inline>EItemInstanceQuality</CodeBlock>, <CodeBlock inline>FStatModifier</CodeBlock>)</SubListItem>
                                                                    <SubListItem><CodeBlock inline>DamageSystemTypes.h</CodeBlock> (e.g., <CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock>)</SubListItem>
                                                                    <SubListItem><CodeBlock inline>MyGameGameplayEffectContext.h</CodeBlock> (custom GE context)</SubListItem>
                                                                </ul>
                                                            </ListItem>
                                                        </ul>
                                                        <p className="mt-2 text-xs italic text-[#D8F3DC]/70">Note: Other plugins depend on DS for all core types.</p> {/* starlight-blue */}
                                                    </td>
                                                </tr>
                                                 <tr>
                                                    <td className="px-4 py-3 align-top font-medium text-[#D8F3DC]">LHS (Limb Health System)</td> {/* starlight-blue */}
                                                    <td className="px-4 py-3 align-top">Per-limb & global health, stamina, status effects, medical consumables (GAS).<br/><strong className="text-[#D8F3DC]/70">Depends on DS</strong> for <CodeBlock inline>ItemSystemTypes.h</CodeBlock> & <CodeBlock inline>MyGameGameplayEffectContext.h</CodeBlock>.</td> {/* starlight-blue */}
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-3 align-top font-medium text-[#D8F3DC]">AS (Armor System)</td> {/* starlight-blue */}
                                                    <td className="px-4 py-3 align-top">Equippable armor, durability, quality tiers, material-based mitigation.<br/><strong className="text-[#D8F3DC]/70">Depends on DS</strong> for <CodeBlock inline>ItemSystemTypes.h</CodeBlock> & <CodeBlock inline>FDamageContext</CodeBlock>.</td> {/* starlight-blue */}
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-3 align-top font-medium text-[#D8F3DC]">PDS (Projectile System)</td> {/* starlight-blue */}
                                                    <td className="px-4 py-3 align-top">Hitscan & simulated projectiles, advanced ballistics.<br/><strong className="text-[#D8F3DC]/70">Depends on DS</strong> for <CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock>, <CodeBlock inline>ItemSystemTypes.h</CodeBlock>, <CodeBlock inline>FDamageContext</CodeBlock>.</td> {/* starlight-blue */}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </section>
                         <section id="dev-guide-prerequisites-link">
                            <DocSubTitle 
                                id="dev-guide-prerequisites-sublink"
                                onClick={() => toggleDocSectionExpansion('dev-guide-prerequisites-link')}
                                isExpanded={!!expandedDocSections['dev-guide-prerequisites-link']}
                            >2. Prerequisites</DocSubTitle>
                            {expandedDocSections['dev-guide-prerequisites-link'] && (
                                <div className="pl-4 pt-3">
                                    <ul className="list-none space-y-1 pl-0">
                                        <ListItem>Unreal Engine 5.5 (or newer compatible version).</ListItem>
                                        <ListItem>C++ & GAS Experience: You must understand <CodeBlock inline>UAbilitySystemComponent</CodeBlock>, <CodeBlock inline>UAttributeSet</CodeBlock>, <CodeBlock inline>UGameplayEffect</CodeBlock>, <CodeBlock inline>UGameplayAbility</CodeBlock>, and <CodeBlock inline>FGameplayTag</CodeBlock>.</ListItem>
                                        <ListItem>Plugin Management: Familiarity with adding/removing plugins, editing <CodeBlock inline>*.uplugin</CodeBlock> and <CodeBlock inline>*.Build.cs</CodeBlock> files.</ListItem>
                                    </ul>
                                </div>
                            )}
                        </section>
                         <section id="dev-guide-plugin-setup-link">
                            <DocSubTitle id="dev-guide-plugin-setup-sublink" onClick={() => toggleDocSectionExpansion('dev-guide-plugin-setup-link')} isExpanded={!!expandedDocSections['dev-guide-plugin-setup-link']}>3. Plugin Setup</DocSubTitle>
                            {expandedDocSections['dev-guide-plugin-setup-link'] && <div className="pl-4 pt-3">
                                <DocSubSubTitle id="dev-guide-plugin-setup-adding">3.1 Adding Plugins to Your Project</DocSubSubTitle>
                                <p>Detailed steps on copying plugin folders to your project's <CodeBlock inline>Plugins/</CodeBlock> directory.</p>
                                <DocSubSubTitle id="dev-guide-plugin-setup-enabling">3.2 Enabling Plugins in the Editor</DocSubSubTitle>
                                <p>Guide to enabling via Edit &gt; Plugins, searching for "LHS", "AS", "PDS", "DS", and restarting.</p>
                            </div>}
                        </section>
                        <section id="dev-guide-core-concepts-link">
                            <DocSubTitle id="dev-guide-core-concepts-sublink" onClick={() => toggleDocSectionExpansion('dev-guide-core-concepts-link')} isExpanded={!!expandedDocSections['dev-guide-core-concepts-link']}>4. Core Concepts & Dependencies</DocSubTitle>
                            {expandedDocSections['dev-guide-core-concepts-link'] && <div className="pl-4 pt-3">
                               <DocSubSubTitle id="dev-guide-core-concepts-api">4.1 API Macros</DocSubSubTitle>
                               <p>Explanation of <CodeBlock inline>LHSSYSTEM_API</CodeBlock>, <CodeBlock inline>ARMORSYSTEM_API</CodeBlock>, etc., for exposing classes.</p>
                               <DocSubSubTitle id="dev-guide-core-concepts-shared-types">4.2 Shared Data Types (Now in DS)</DocSubSubTitle>
                               <p>DS now centralizes types like <CodeBlock inline>EItemInstanceQuality</CodeBlock>, <CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>FDamageContext</CodeBlock>, etc., in <CodeBlock inline>DamageSystemTypes.h</CodeBlock> and <CodeBlock inline>ItemSystemTypes.h</CodeBlock>.</p>
                               <DocSubSubTitle id="dev-guide-core-concepts-dependencies">4.3 Plugin Dependency Configuration</DocSubSubTitle>
                               <p>How to edit <CodeBlock inline>*.uplugin</CodeBlock> and <CodeBlock inline>*.Build.cs</CodeBlock> files to declare dependencies (e.g., LHS depends on DS).</p>
                                <CodeBlock>{`// Example: LHS.Build.cs\nPublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "GameplayAbilities", "GameplayTags", "GameplayTasks", "DamageSystem" });`}</CodeBlock>
                            </div>}
                        </section>
                         <section id="dev-guide-lhs-integration-link">
                            <DocSubTitle id="dev-guide-lhs-integration-sublink" onClick={() => toggleDocSectionExpansion('dev-guide-lhs-integration-link')} isExpanded={!!expandedDocSections['dev-guide-lhs-integration-link']}>5. Limb Health System (LHS) Integration</DocSubTitle>
                            {expandedDocSections['dev-guide-lhs-integration-link'] && <div className="pl-4 pt-3">
                                <DocSubSubTitle id="dev-guide-lhs-character-setup">5.1 Character Setup</DocSubSubTitle>
                                <p>Adding <CodeBlock inline>ULimbHealthComponent</CodeBlock> and <CodeBlock inline>UMyGameAbilitySystemComponent</CodeBlock> to your character.</p>
                                <DocSubSubTitle id="dev-guide-lhs-data-asset">5.2 Data Asset Creation (LHS)</DocSubSubTitle>
                                <p>Creating <CodeBlock inline>UDA_CharacterLimbsAndVitals</CodeBlock> to define limbs, health pools, and status effect mappings.</p>
                                <DocSubSubTitle id="dev-guide-lhs-damage-feedback">5.3 Damage Feedback (LHS) via <CodeBlock inline>MyGameGameplayEffectContext</CodeBlock></DocSubSubTitle>
                                <p>Using the custom GE context to pass <CodeBlock inline>HitLimbTag</CodeBlock> for targeted damage application.</p>
                            </div>}
                        </section>
                        <section id="dev-guide-as-integration-link">
                             <DocSubTitle id="dev-guide-as-integration-sublink" onClick={() => toggleDocSectionExpansion('dev-guide-as-integration-link')} isExpanded={!!expandedDocSections['dev-guide-as-integration-link']}>6. Armor System (AS) Integration</DocSubTitle>
                            {expandedDocSections['dev-guide-as-integration-link'] && <div className="pl-4 pt-3">
                                <DocSubSubTitle id="dev-guide-as-character-setup">6.1 Character Setup (AS)</DocSubSubTitle>
                                <p>Adding <CodeBlock inline>UArmorComponent</CodeBlock> to your character.</p>
                                <DocSubSubTitle id="dev-guide-as-data-asset">6.2 Data Asset Creation (AS)</DocSubSubTitle>
                                <p>Creating <CodeBlock inline>UDA_ArmorItem</CodeBlock> and <CodeBlock inline>UDA_ArmorMaterial</CodeBlock> for armor properties and mitigation.</p>
                                <DocSubSubTitle id="dev-guide-as-equipping">6.3 Equipping Armor (AS)</DocSubSubTitle>
                                <p>Logic for attaching armor meshes and registering armor instances with the <CodeBlock inline>UArmorComponent</CodeBlock>.</p>
                                <DocSubSubTitle id="dev-guide-as-damage-interaction">6.4 Damage Interaction (AS)</DocSubSubTitle>
                                <p>How <CodeBlock inline>UArmorComponent::ProcessDamageInteraction</CodeBlock> is called by the DS router.</p>
                            </div>}
                        </section>
                        <section id="dev-guide-pds-integration-link">
                            <DocSubTitle id="dev-guide-pds-integration-sublink" onClick={() => toggleDocSectionExpansion('dev-guide-pds-integration-link')} isExpanded={!!expandedDocSections['dev-guide-pds-integration-link']}>7. Projectile System (PDS) Integration</DocSubTitle>
                            {expandedDocSections['dev-guide-pds-integration-link'] && <div className="pl-4 pt-3">
                                <DocSubSubTitle id="dev-guide-pds-archetype-data">7.1 Archetype Data Assets (PDS)</DocSubSubTitle>
                                <p>Creating <CodeBlock inline>UDA_Projectile</CodeBlock> for projectile definitions (hitscan, simulated, ballistics).</p>
                                <DocSubSubTitle id="dev-guide-pds-firing-logic">7.2 Firing Logic (PDS) & Hitscan</DocSubSubTitle>
                                <p>Using <CodeBlock inline>UProjectileDispatchComponent</CodeBlock> to fire projectiles.</p>
                                <DocSubSubTitle id="dev-guide-pds-dispatching-context">7.3 Populating & Dispatching <CodeBlock inline>FDamageContext</CodeBlock> (PDS)</DocSubSubTitle>
                                <p>How PDS populates the <CodeBlock inline>FDamageContext</CodeBlock> and sends it to the DS router on impact.</p>
                            </div>}
                        </section>
                        <section id="dev-guide-ds-integration-link">
                            <DocSubTitle id="dev-guide-ds-integration-sublink" onClick={() => toggleDocSectionExpansion('dev-guide-ds-integration-link')} isExpanded={!!expandedDocSections['dev-guide-ds-integration-link']}>8. Damage System (DS) Integration</DocSubTitle>
                            {expandedDocSections['dev-guide-ds-integration-link'] && <div className="pl-4 pt-3">
                                <DocSubSubTitle id="dev-guide-ds-actor-setup">8.1 Actor Setup (DS)</DocSubSubTitle>
                                <p>Adding <CodeBlock inline>UDamageRouterComponent</CodeBlock> to damageable actors.</p>
                                <DocSubSubTitle id="dev-guide-ds-direct-damage-ge">8.2 Direct Damage GameplayEffect (DS)</DocSubSubTitle>
                                <p>Creating a <CodeBlock inline>UGameplayEffect</CodeBlock> with an ExecutionCalculation that uses <CodeBlock inline>FMyGameGameplayEffectContext</CodeBlock> and <CodeBlock inline>"Data.Damage"</CodeBlock> SetByCaller.</p>
                                <DocSubSubTitle id="dev-guide-ds-gameplaycue-setup">8.3 GameplayCue Setup (DS)</DocSubSubTitle>
                                <p>Setting up GameplayCues to respond to tags broadcast by the DS after damage processing.</p>
                            </div>}
                        </section>
                        <section id="dev-guide-damage-flow-link">
                             <DocSubTitle id="dev-guide-damage-flow-sublink" onClick={() => toggleDocSectionExpansion('dev-guide-damage-flow-link')} isExpanded={!!expandedDocSections['dev-guide-damage-flow-link']}>9. Damage Flow Example</DocSubTitle>
                            {expandedDocSections['dev-guide-damage-flow-link'] && <div className="pl-4 pt-3">
                                <p>A step-by-step walkthrough of a damage event:</p>
                                <ol className="list-decimal list-inside ml-4 mt-2 space-y-1">
                                    <li>PDS: Projectile fired, populates <CodeBlock inline>FDamageContext</CodeBlock>.</li>
                                    <li>PDS: On impact, calls <CodeBlock inline>Target-&gt;DamageRouterComponent-&gt;ProcessDamageEvent(Context)</CodeBlock>.</li>
                                    <li>DS: Router calls <CodeBlock inline>ArmorComponent-&gt;ProcessDamageInteraction(Context)</CodeBlock>.</li>
                                    <li>AS: Armor mitigates damage, updates <CodeBlock inline>Context</CodeBlock>.</li>
                                    <li>DS: Router calls <CodeBlock inline>ProcessHealthAndEffects(Context)</CodeBlock>.</li>
                                    <li>LHS: Applies health changes and status effects via GAS, using <CodeBlock inline>Context</CodeBlock>.</li>
                                    <li>DS: Router calls <CodeBlock inline>BroadcastPostDamageOutcomes(Context)</CodeBlock> (GameplayCues).</li>
                                </ol>
                            </div>}
                        </section>
                        <section id="dev-guide-best-practices-link">
                            <DocSubTitle id="dev-guide-best-practices-sublink" onClick={() => toggleDocSectionExpansion('dev-guide-best-practices-link')} isExpanded={!!expandedDocSections['dev-guide-best-practices-link']}>10. Best Practices & Troubleshooting</DocSubTitle>
                            {expandedDocSections['dev-guide-best-practices-link'] && <div className="pl-4 pt-3">
                                <ul className="list-none space-y-1 pl-0">
                                  <ListItem>Ensure correct plugin dependencies.</ListItem>
                                  <ListItem>Verify Data Assets are correctly referenced.</ListItem>
                                  <ListItem>Use Gameplay Debugger and logs for troubleshooting.</ListItem>
                                  <ListItem>Server-authoritative logic is key for multiplayer.</ListItem>
                                </ul>
                            </div>}
                        </section>
                        <hr className="border-[#1B4332]/50 my-6"/> {/* shadow-slate */}
                    </>
                )}
            </article>

            {/* PDS Plugin */}
            <article className="space-y-10 doc-article mt-16">
                <DocMainTitle id="pds-plugin-main" onClick={() => toggleDocSectionExpansion('pds-plugin-main')} isExpanded={!!expandedDocSections['pds-plugin-main']}>Projectile System (PDS) Plugin</DocMainTitle>
                {expandedDocSections['pds-plugin-main'] && (<>
                    <hr className="border-[#1B4332]/50 my-6"/> {/* shadow-slate */}
                    <section id="pds-plugin-overview-link">
                        <DocSubTitle id="pds-plugin-overview-sublink" onClick={() => toggleDocSectionExpansion('pds-plugin-overview-link')} isExpanded={!!expandedDocSections['pds-plugin-overview-link']}>1. Overview</DocSubTitle>
                        {expandedDocSections['pds-plugin-overview-link'] && <div className="pl-4 pt-3">
                            <p>The Projectile System (PDS) handles the creation, simulation, and impact effects of projectiles, including hitscan and physically simulated rounds. It supports advanced ballistics like penetration, ricochet, fragmentation, and spalling.</p>
                        </div>}
                    </section>
                     <section id="pds-plugin-core-features-link">
                        <DocSubTitle id="pds-plugin-core-features-sublink" onClick={() => toggleDocSectionExpansion('pds-plugin-core-features-link')} isExpanded={!!expandedDocSections['pds-plugin-core-features-link']}>2. Core Features</DocSubTitle>
                        {expandedDocSections['pds-plugin-core-features-link'] && <div className="pl-4 pt-3">
                           <ul className="list-none space-y-1 pl-0">
                                <ListItem>Hitscan & Simulated Projectiles</ListItem>
                                <ListItem>Data-Driven via <CodeBlock inline>UDA_Projectile</CodeBlock></ListItem>
                                <ListItem>Advanced Ballistics (Penetration, Ricochet, Fragmentation, Spall)</ListItem>
                                <ListItem>Environmental Interaction</ListItem>
                                <ListItem>Integration with Damage System (DS) for damage calculation</ListItem>
                           </ul>
                        </div>}
                    </section>
                    <section id="pds-plugin-key-classes-link">
                        <DocSubTitle id="pds-plugin-key-classes-sublink" onClick={() => toggleDocSectionExpansion('pds-plugin-key-classes-link')} isExpanded={!!expandedDocSections['pds-plugin-key-classes-link']}>3. Key C++ Classes & Data Assets</DocSubTitle>
                         {expandedDocSections['pds-plugin-key-classes-link'] && <div className="pl-4 pt-3">
                            <ul className="list-none space-y-1 pl-0">
                                <ListItem><CodeBlock inline>UProjectileDispatchComponent</CodeBlock>: Manages firing logic.</ListItem>
                                <ListItem><CodeBlock inline>ABaseProjectile</CodeBlock>: Base class for simulated projectiles.</ListItem>
                                <ListItem><CodeBlock inline>UDA_Projectile</CodeBlock>: Data Asset for defining projectile properties.</ListItem>
                                <ListItem><CodeBlock inline>FProjectileContext</CodeBlock>: Struct holding runtime projectile data.</ListItem>
                            </ul>
                        </div>}
                    </section>
                    {/* ... other PDS H2 sections ... */}
                </>)}
            </article>

            {/* LHS Plugin */}
             <article className="space-y-10 doc-article mt-16">
                <DocMainTitle id="lhs-plugin-main" onClick={() => toggleDocSectionExpansion('lhs-plugin-main')} isExpanded={!!expandedDocSections['lhs-plugin-main']}>Limb Health System (LHS) Plugin</DocMainTitle>
                {expandedDocSections['lhs-plugin-main'] && (<>
                    <hr className="border-[#1B4332]/50 my-6"/> {/* shadow-slate */}
                    <section id="lhs-plugin-overview-link">
                        <DocSubTitle id="lhs-plugin-overview-sublink" onClick={() => toggleDocSectionExpansion('lhs-plugin-overview-link')} isExpanded={!!expandedDocSections['lhs-plugin-overview-link']}>1. Overview</DocSubTitle>
                        {expandedDocSections['lhs-plugin-overview-link'] && <div className="pl-4 pt-3">
                            <p>The Limb Health System (LHS) provides granular health management for characters, including individual limb health, overall vitals (blood, stamina), and status effects. It integrates deeply with the Gameplay Ability System (GAS).</p>
                        </div>}
                    </section>
                    {/* ... other LHS H2 sections ... */}
                </>)}
            </article>

            {/* AS Plugin */}
            <article className="space-y-10 doc-article mt-16">
                <DocMainTitle id="as-plugin-main" onClick={() => toggleDocSectionExpansion('as-plugin-main')} isExpanded={!!expandedDocSections['as-plugin-main']}>Armor System (AS) Plugin</DocMainTitle>
                 {expandedDocSections['as-plugin-main'] && (<>
                    <hr className="border-[#1B4332]/50 my-6"/> {/* shadow-slate */}
                    <section id="as-plugin-overview-link">
                        <DocSubTitle id="as-plugin-overview-sublink" onClick={() => toggleDocSectionExpansion('as-plugin-overview-link')} isExpanded={!!expandedDocSections['as-plugin-overview-link']}>1. Overview</DocSubTitle>
                        {expandedDocSections['as-plugin-overview-link'] && <div className="pl-4 pt-3">
                            <p>The Armor System (AS) manages equippable armor, its durability, quality tiers, and material-based damage mitigation. It intercepts damage events to apply protection before health is affected.</p>
                        </div>}
                    </section>
                    {/* ... other AS H2 sections ... */}
                </>)}
            </article>

            {/* DS Plugin */}
            <article className="space-y-10 doc-article mt-16">
                <DocMainTitle id="ds-plugin-main" onClick={() => toggleDocSectionExpansion('ds-plugin-main')} isExpanded={!!expandedDocSections['ds-plugin-main']}>Damage System (DS) Plugin</DocMainTitle>
                {expandedDocSections['ds-plugin-main'] && (<>
                    <hr className="border-[#1B4332]/50 my-6"/> {/* shadow-slate */}
                    <section id="ds-plugin-overview-link">
                        <DocSubTitle id="ds-plugin-overview-sublink" onClick={() => toggleDocSectionExpansion('ds-plugin-overview-link')} isExpanded={!!expandedDocSections['ds-plugin-overview-link']}>1. Overview</DocSubTitle>
                        {expandedDocSections['ds-plugin-overview-link'] && <div className="pl-4 pt-3">
                            <p>The <strong>Damage System (DS)</strong> plugin is the foundational utility layer for orchestrating all damage events and exposing shared core types to the gameplay ecosystem. It provides:</p>
                            <ul className="list-none space-y-1 pl-0">
                                <ListItem><CodeBlock inline>FDamageContext</CodeBlock>: A mutable struct carrying every piece of data for a damage event.</ListItem>
                                <ListItem><CodeBlock inline>UDamageRouterComponent</CodeBlock>: An actor component that drives the ordered pipeline:
                                    <ol className="list-decimal list-inside ml-4 mt-1 text-sm">
                                        <li>Projectile Impact</li>
                                        <li>Armor Mitigation</li>
                                        <li>Health Application & Status Effects</li>
                                        <li>Outcome Broadcasting (GameplayCues)</li>
                                    </ol>
                                </ListItem>
                                <ListItem><strong>Shared Core Types</strong>: Centralized enums and structs previously scattered across PDS, AS, and LHS.</ListItem>
                            </ul>
                            <p>All processing is <strong>server-authoritative</strong>, and the module is designed for <strong>extensibility</strong>, allowing insertion of global modifiers or custom routing steps.</p>
                        </div>}
                    </section>
                    <section id="ds-plugin-core-features-link">
                        <DocSubTitle id="ds-plugin-core-features-sublink" onClick={() => toggleDocSectionExpansion('ds-plugin-core-features-link')} isExpanded={!!expandedDocSections['ds-plugin-core-features-link']}>2. Core Features</DocSubTitle>
                        {expandedDocSections['ds-plugin-core-features-link'] && <div className="pl-4 pt-3">
                             <ul className="list-none space-y-1 pl-0">
                                <ListItem><strong>Centralized Damage Data</strong>: <CodeBlock inline>FDamageContext</CodeBlock> encapsulates source, target, projectile data, armor results, health results, and outcome flags.</ListItem>
                                <ListItem><strong>Ordered Processing</strong>: <CodeBlock inline>{"UDamageRouterComponent::ProcessDamageEvent()"}</CodeBlock> enforces a consistent flow across all subsystems.</ListItem>
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
                        </div>}
                    </section>
                     <section id="ds-plugin-key-classes-link">
                        <DocSubTitle id="ds-plugin-key-classes-sublink" onClick={() => toggleDocSectionExpansion('ds-plugin-key-classes-link')} isExpanded={!!expandedDocSections['ds-plugin-key-classes-link']}>3. Key C++ Classes & Data Structures</DocSubTitle>
                        {expandedDocSections['ds-plugin-key-classes-link'] && <div className="pl-4 pt-3">
                            <div className="overflow-x-auto bg-[#081C15]/50 p-3 my-4 rounded-md shadow-inner border border-[#1B4332]/60"> {/* deep-space-blue, shadow-slate */}
                                <table className="min-w-full divide-y divide-[#1B4332]/40 text-sm"> {/* shadow-slate */}
                                     <thead className="bg-[#2D6A4F]/50"> {/* comet-grey */}
                                        <tr>
                                            <th className="px-4 py-2 text-left font-medium text-[#74C69D]">Type</th> {/* cyber-teal */}
                                            <th className="px-4 py-2 text-left font-medium text-[#74C69D]">Location</th> {/* cyber-teal */}
                                            <th className="px-4 py-2 text-left font-medium text-[#74C69D]">Purpose</th> {/* cyber-teal */}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1B4332]/40"> {/* shadow-slate */}
                                        <tr><td className="px-4 py-3 align-top"><CodeBlock inline>FDamageContext</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>DamageSystemTypes.h</CodeBlock></td><td className="px-4 py-3 align-top">Carries all data for a damage event.</td></tr>
                                        <tr><td className="px-4 py-3 align-top"><CodeBlock inline>ERoundType</CodeBlock>, <CodeBlock inline>EProjectileType</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>DamageSystemTypes.h</CodeBlock></td><td className="px-4 py-3 align-top">Enumerations for round and projectile behavior.</td></tr>
                                        <tr><td className="px-4 py-3 align-top"><CodeBlock inline>EItemInstanceQuality</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>ItemSystemTypes.h</CodeBlock></td><td className="px-4 py-3 align-top">Item/armor quality enums.</td></tr>
                                        <tr><td className="px-4 py-3 align-top"><CodeBlock inline>FStatModifier</CodeBlock>, etc.</td><td className="px-4 py-3 align-top"><CodeBlock inline>ItemSystemTypes.h</CodeBlock></td><td className="px-4 py-3 align-top">Structures for quality-based stat adjustments.</td></tr>
                                        <tr><td className="px-4 py-3 align-top"><CodeBlock inline>FMyGameGameplayEffectContext</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>MyGameGameplayEffectContext.h</CodeBlock></td><td className="px-4 py-3 align-top">Custom GE context.</td></tr>
                                        <tr><td className="px-4 py-3 align-top"><CodeBlock inline>UDamageRouterComponent</CodeBlock></td><td className="px-4 py-3 align-top"><CodeBlock inline>DamageRouterComponent.h/.cpp</CodeBlock></td><td className="px-4 py-3 align-top">Drives the damage pipeline.</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm italic">Module Files: <CodeBlock inline>IDamageSystemModule.h</CodeBlock>, <CodeBlock inline>DamageSystemModule.cpp</CodeBlock>, <CodeBlock inline>DamageSystem.Build.cs</CodeBlock></p>
                        </div>}
                    </section>
                    <section id="ds-plugin-directory-structure-link">
                        <DocSubTitle id="ds-plugin-directory-structure-sublink" onClick={() => toggleDocSectionExpansion('ds-plugin-directory-structure-link')} isExpanded={!!expandedDocSections['ds-plugin-directory-structure-link']}>4. Directory Structure</DocSubTitle>
                        {expandedDocSections['ds-plugin-directory-structure-link'] && <div className="pl-4 pt-3">
                             <CodeBlock>{`DamageSystem/\n└── Source/\n    └── DamageSystem/\n        ├── DamageSystem.Build.cs\n        ├── Public/\n        │   ├── IDamageSystemModule.h\n        │   ├── DamageSystemTypes.h\n        │   ├── ItemSystemTypes.h\n        │   ├── MyGameGameplayEffectContext.h\n        │   └── DamageRouterComponent.h\n        └── Private/\n            ├── DamageSystemModule.cpp\n            ├── MyGameGameplayEffectContext.cpp\n            └── DamageRouterComponent.cpp`}</CodeBlock>
                        </div>}
                    </section>
                    <section id="ds-plugin-integration-points-link">
                        <DocSubTitle id="ds-plugin-integration-points-sublink" onClick={() => toggleDocSectionExpansion('ds-plugin-integration-points-link')} isExpanded={!!expandedDocSections['ds-plugin-integration-points-link']}>5. Integration Points</DocSubTitle>
                        {expandedDocSections['ds-plugin-integration-points-link'] && <div className="pl-4 pt-3">
                            <DocSubSubTitle id="ds-plugin-integration-provider">5.1 Provider of Core Types</DocSubSubTitle>
                            <p>LHS, AS, and PDS add DS’s plugin as a dependency to consume its types.</p>
                            <DocSubSubTitle id="ds-plugin-integration-orchestrator">5.2 Orchestrator of Damage Flow</DocSubSubTitle>
                            <p>Damage Sources populate <CodeBlock inline>FDamageContext</CodeBlock> and call <CodeBlock inline>{"Target-&gt;DamageRouterComponent-&gt;ProcessDamageEvent(Context);"}</CodeBlock></p>
                            <p>Armor Mitigation: <CodeBlock inline>{"ArmorComponent-&gt;ProcessDamageInteraction(Context, HitLimbTag, HitBoneName);"}</CodeBlock></p>
                            <p>Health & Effects: <CodeBlock inline>{"UDamageRouterComponent::ProcessHealthAndEffects(Context);"}</CodeBlock></p>
                            <p>Outcome Broadcasting: <CodeBlock inline>{"UDamageRouterComponent::BroadcastPostDamageOutcomes(Context);"}</CodeBlock></p>
                            <DocSubSubTitle id="ds-plugin-integration-gameplaycue">5.3 GameplayCue System</DocSubSubTitle>
                            <p>Uses final state in <CodeBlock inline>FDamageContext</CodeBlock> to emit cues.</p>
                        </div>}
                    </section>
                    <section id="ds-plugin-setup-usage-link">
                        <DocSubTitle id="ds-plugin-setup-usage-sublink" onClick={() => toggleDocSectionExpansion('ds-plugin-setup-usage-link')} isExpanded={!!expandedDocSections['ds-plugin-setup-usage-link']}>6. Setup & Usage Notes</DocSubTitle>
                        {expandedDocSections['ds-plugin-setup-usage-link'] && <div className="pl-4 pt-3">
                            <ul className="list-none space-y-1 pl-0">
                                <ListItem><strong>Module Dependencies</strong>: Other plugins add "DamageSystem" to their Build.cs and .uplugin files.</ListItem>
                                <ListItem><strong>Attach Router</strong>: Add <CodeBlock inline>UDamageRouterComponent</CodeBlock> to damageable actors.</ListItem>
                                <ListItem><strong>Populate & Dispatch</strong>: Damage sources must populate <CodeBlock inline>FDamageContext</CodeBlock> and call <CodeBlock inline>ProcessDamageEvent()</CodeBlock>.</ListItem>
                                <ListItem><strong>GameplayEffect Requirements</strong>: Effects must use an ExecutionCalculation that reads <CodeBlock inline>FMyGameGameplayEffectContext</CodeBlock> and <CodeBlock inline>"Data.Damage"</CodeBlock> SetByCaller.</ListItem>
                                <ListItem><strong>Extending the Router</strong>: Subclass <CodeBlock inline>UDamageRouterComponent</CodeBlock> or bind to its events for custom stages.</ListItem>
                            </ul>
                        </div>}
                    </section>
                </>)}
            </article>


        </div>
    </div>
    );
  };


  // --- Main Render ---
  return (
    <div className="bg-[#081C15] text-[#D8F3DC] min-h-screen font-chypre antialiased selection:bg-[#74C69D] selection:text-[#081C15]"> {/* deep-space-blue, starlight-blue, cyber-teal, deep-space-blue */}
      {/* Header */}
      <header className="bg-[#081C15]/90 backdrop-blur-md sticky top-0 z-50 shadow-2xl border-b border-[#1B4332]/50"> {/* deep-space-blue, shadow-slate */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button 
              onClick={() => { 
                if (currentPage === 'documentation') {
                  setCurrentPage('landing'); 
                  window.scrollTo(0,0); 
                } else {
                  scrollToInternalSection('hero');
                }
              }} 
              className="flex items-center group"
            >
              <img src="https://placehold.co/40x40/74C69D/081C15?text=W" alt="Site Logo" className="h-10 w-auto group-hover:opacity-90 transition-opacity duration-200 mr-3 rounded-sm shadow-md" onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}/> {/* cyber-teal, deep-space-blue */}
              <span style={{display: 'none'}} className="h-10 w-10 bg-[#74C69D] text-[#081C15] rounded-sm mr-3 flex items-center justify-center font-bold text-xl">W</span> {/* cyber-teal, deep-space-blue */}
             
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#D8F3DC] group-hover:text-[#74C69D] tracking-tight transition-colors duration-200"> {/* starlight-blue, cyber-teal */}
                UE <span className="text-[#74C69D] group-hover:text-[#95D5B2] transition-colors duration-200">FPS Systems</span> {/* cyber-teal, nebula-aqua */}
              </h1>
            </button>
            <nav className="hidden md:flex items-center space-x-2 lg:space-x-3">
              {navigationLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`px-3 py-2 lg:px-4 rounded-md text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105
                    ${item.isPrimaryCta 
                      ? 'bg-[#74C69D] hover:bg-[#95D5B2] text-[#081C15] shadow-md hover:shadow-[#74C69D]/40'  /* cyber-teal, nebula-aqua, deep-space-blue */
                      : (currentPage === 'documentation' && item.id === 'documentation') 
                        ? 'bg-[#74C69D] text-[#081C15] shadow-md' /* cyber-teal, deep-space-blue */
                        : 'text-[#D8F3DC] hover:bg-[#2D6A4F] hover:text-[#95D5B2]' /* starlight-blue, comet-grey, nebula-aqua */
                    }`}
                >
                  {item.title}
                </button>
              ))}
            </nav>
            <div className="md:hidden"> 
              <select
                onChange={(e) => {
                    const selectedId = e.target.value;
                    if (selectedId === 'home-landing') {
                        setCurrentPage('landing');
                        setTimeout(() => scrollToInternalSection('hero'), 100); 
                    } else {
                        const section = navigationLinks.find(s => s.id === selectedId || s.scrollToId === selectedId);
                        if (section) handleNavClick(section);
                    }
                }}
                value={currentPage === 'documentation' ? 'documentation' : 'home-landing'}
                className="bg-[#2D6A4F] text-[#D8F3DC] p-2 rounded-md text-sm w-full max-w-[180px] border border-[#1B4332] focus:ring-[#74C69D] focus:border-[#74C69D]" /* comet-grey, starlight-blue, shadow-slate, cyber-teal */
              >
                <option value="home-landing">Home</option>
                <option value="documentation">Documentation</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        {currentPage === 'landing' ? <LandingPage /> : <DocumentationPage />}
      </main>

      {/* Footer */}
      <footer className="bg-[#1B4332] border-t border-[#2D6A4F]/50 mt-16"> {/* shadow-slate, comet-grey */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center text-[#D8F3DC]/70"> {/* starlight-blue */}
          <p>&copy; {new Date().getFullYear()} Unreal FPS Systems. All rights reserved.</p>
          <p className="text-sm mt-1">Advanced Gameplay Solutions for Unreal Engine.</p>
        </div>
      </footer>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle} message={modalMessage} />

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Chypre', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          background-color: #081C15; /* New: deep-space-blue */
          color: #D8F3DC; /* New: starlight-blue */
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { background: #1B4332; /* New: shadow-slate */ }
        ::-webkit-scrollbar-thumb { background: #74C69D; /* New: cyber-teal */ border-radius: 10px; border: 2px solid #1B4332; /* New: shadow-slate for border */ }
        ::-webkit-scrollbar-thumb:hover { background: #95D5B2; /* New: nebula-aqua */ }
       
        section[id] { scroll-margin-top: ${headerOffset}px; } 
        .documentation-page-content section[id], 
        .documentation-page-content h1[id], 
        .documentation-page-content h2[id], 
        .documentation-page-content h3[id], 
        .documentation-page-content h4[id] { 
            scroll-margin-top: ${headerOffset + 20}px; 
        }

        .doc-article ol {
            list-style-type: decimal;
            padding-left: 1.5rem; 
        }
        .doc-article ul { 
            list-style-type: disc;
            padding-left: 1.5rem;
        }
        .doc-article ul.list-none, .doc-article ol.list-none { 
            list-style-type: none;
            padding-left: 0;
        }
        .doc-article ol > li::marker { 
            color: #74C69D; /* New: cyber-teal */
            font-weight: 500;
        }
        .doc-article ul > li, .doc-article ol > li {
            margin-bottom: 0.65rem;
        }
        .doc-article ul ul > li, .doc-article ol ol > li {
            margin-bottom: 0.4rem;
        }

        .doc-article table ul {
            list-style-type: none; 
            padding-left: 0;
        }
         .doc-article table ul li {
            padding-left: 0; 
        }
        .doc-article table ul ul {
             padding-left: 1rem; 
        }
        .doc-article table .ListItem > svg, .doc-article table .SubListItem > svg {
            margin-top: 0.125rem; 
        }
        .doc-article table .ListItem > span, .doc-article table .SubListItem > span {
            display: inline; 
        }
         .doc-article table code { 
            white-space: normal; 
        }
      `}</style>
    </div>
  );
};

export default App;
