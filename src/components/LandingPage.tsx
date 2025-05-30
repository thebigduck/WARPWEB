import React from 'react'; // Removed useState
import {
  Container, 
  Box, 
  Grid, 
  Typography, 
  Button,
  Card, 
  CardContent,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper
} from '@mui/material';

// MUI Icons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StarRateIcon from '@mui/icons-material/StarRate';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface LandingPageProps {
  showModal: (title: string, message: string) => void;
  scrollToInternalSection: (id: string) => void;
  setCurrentPage: (page: string) => void;
}

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}
const SectionTitle: React.FC<SectionTitleProps> = ({ children, className = "" }) => (
  <Typography 
    variant="h2" 
    component="h2" 
    className={`text-3xl sm:text-[2.5rem] font-bold mb-12 text-[#74C69D] border-b-2 border-[#74C69D]/30 pb-4 text-center ${className}`}
  >
    {children}
  </Typography>
);

interface BenefitCardProps {
  icon: React.ReactElement;
  title: string;
  children: React.ReactNode;
}
const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, children }) => {
  const iconProps: Record<string, unknown> = {};
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'ReactElement<any, string | JSXElementConstructor<any>>'.
  if (icon && icon.type && typeof icon.type !== 'string' && icon.type.muiName) {
    iconProps.sx = { fontSize: 32, color: '#74C69D', mb: 1.5 };
  }

  return (
  <Card 
    className="bg-[#2D6A4F] p-6 shadow-xl hover:shadow-[#74C69D]/20 transition-all duration-300 transform hover:-translate-y-1 border border-[#1B4332]/50 flex flex-col items-center text-center h-full"
    sx={{boxShadow: 'none'}}
  >
    <CardContent className="flex flex-col items-center text-center flex-grow">
      {React.cloneElement(icon, iconProps)} {/* Adjusted icon styling */}
      <Typography variant="h6" component="h3" className="text-xl font-medium text-[#D8F3DC] mb-2 mt-1">
        {title}
      </Typography>
      <Typography variant="body2" className="text-[#D8F3DC]/80 leading-relaxed text-sm flex-grow">
        {children}
      </Typography>
    </CardContent>
  </Card>
  );
};

interface TestimonialCardProps {
  name: string;
  role: string;
  stars: number;
  text: string;
  avatar?: string;
}
const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, stars, text, avatar }) => (
  <Card 
    className="bg-[#2D6A4F] p-6 shadow-xl backdrop-blur-sm border border-[#1B4332]/50 h-full flex flex-col"
    sx={{boxShadow: 'none'}}
  >
    <CardContent className="flex flex-col flex-grow">
      <Box className="flex items-center mb-4">
        <Avatar 
          src={avatar || `https://placehold.co/60x60/081C15/D8F3DC?text=${name.charAt(0)}`} 
          alt={name} 
          sx={{ 
            width: 56, 
            height: 56, 
            mr: 2, 
            border: '2px solid #74C69D'
          }}
        />
        <Box>
          <Typography variant="subtitle1" component="h4" className="font-medium text-[#D8F3DC]">{name}</Typography>
          <Typography variant="caption" className="text-xs text-[#74C69D]">{role}</Typography>
        </Box>
      </Box>
      <Box className="flex mb-3">
        {[...Array(5)].map((_, i) => <StarRateIcon key={i} className={`${i < stars ? 'text-yellow-400' : 'text-[#528265]'}`} />)} {/* Adjusted un-filled star color */}
      </Box>
      <Typography variant="body2" className="text-[#D8F3DC]/90 leading-relaxed italic text-sm flex-grow">
        &ldquo;{text}&rdquo;
      </Typography>
    </CardContent>
  </Card>
);

interface FAQItemProps {
  question: string;
  answer: string;
}
const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  return (
    <Accordion 
        className="border-b border-[#2D6A4F]/50 bg-transparent shadow-none text-[#D8F3DC]"
        sx={{ 
            backgroundColor: 'transparent',
            boxShadow: 'none',
            '&.MuiAccordion-root:before': { display: 'none' },
            '&.MuiAccordion-root': { borderBottom: '1px solid rgba(45, 106, 79, 0.5)' },
            '&.MuiAccordion-root.Mui-expanded': { margin: 0 }
        }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#D8F3DC' }} />}
        aria-controls={`faq-${question.replace(/\s+/g, '-').toLowerCase()}-content`}
        id={`faq-${question.replace(/\s+/g, '-').toLowerCase()}-header`}
        className="px-0 hover:bg-[#2D6A4F]/10"
        sx={{paddingLeft:0, paddingRight:0, minHeight: 'auto', '& .MuiAccordionSummary-content': { marginY: '12px' }}}
      >
        <Typography component="h3" className="text-lg font-medium text-[#D8F3DC]">{question}</Typography> {/* Adjusted to not be h6 for FAQ */}
      </AccordionSummary>
      <AccordionDetails className="px-0 pb-4" sx={{paddingLeft:0, paddingRight:0}}>
        <Typography variant="body2" className="text-[#D8F3DC]/80 leading-relaxed pr-6">
          {answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const LandingPage: React.FC<LandingPageProps> = ({ showModal, scrollToInternalSection, setCurrentPage }) => {
  return (
    <>
      <Box 
        id="hero" 
        className="min-h-[calc(90vh-80px)] flex flex-col justify-center items-center text-center py-16 sm:py-24 scroll-mt-20 relative bg-[#081C15]"
        sx={{ 
          backgroundImage: `url('https://placehold.co/1920x1080/081C15/1B4332?text=Abstract+Green+Grid')`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center center' 
        }}
      >
        <Box className="absolute inset-0 bg-[#081C15]/80 backdrop-blur-sm" />
        <Container maxWidth="md" className="relative z-10">
          <Typography variant="h1" component="h1" className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#D8F3DC] mb-6 leading-tight">
            Engineer <span className="text-[#74C69D]">Deeply Immersive</span> FPS Combat
          </Typography>
          <Typography variant="h5" component="p" className="text-lg sm:text-xl text-[#D8F3DC]/90 max-w-3xl mx-auto mb-10">
            Unlock unparalleled gameplay depth with our suite of Unreal Engine plugins. Forge intense, dynamic battles with sophisticated damage, armor, ballistics, and health systems designed for maximum player engagement.
          </Typography>
          <Button 
            variant="contained"
            size="large"
            onClick={() => scrollToInternalSection('cta')}
            className="bg-[#74C69D] hover:bg-[#95D5B2] text-[#081C15] font-bold shadow-lg hover:shadow-[#74C69D]/40 transition-all duration-300 transform hover:scale-105"
            sx={{ py: 1.5, px: 4, textTransform: 'none', color: '#081C15 !important', backgroundColor: '#74C69D !important', '&:hover': {backgroundColor: '#95D5B2 !important'} }}
            endIcon={<ArrowForwardIcon />}
          >
            Explore Plugins
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" component="section" id="key-benefits" className="py-20 sm:py-28 scroll-mt-20 bg-[#081C15]">
        <SectionTitle>Why Our FPS Systems?</SectionTitle>
        <Grid container spacing={4}>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
            <BenefitCard icon={<CheckCircleOutlineIcon />} title="Deep Immersion">
              Advanced ballistics, limb-specific trauma, and material-based armor create visceral, believable combat that captivates players.
            </BenefitCard>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
            <BenefitCard icon={<CheckCircleOutlineIcon />} title="Seamless Modularity">
              Integrate and customize with ease. Our flexible architecture adapts to your unique vision and scales with your project.
            </BenefitCard>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
            <BenefitCard icon={<CheckCircleOutlineIcon />} title="Accelerated Creation">
              Save hundreds of development hours. Leverage our professionally engineered plugins to bypass common hurdles and focus on your game&apos;s unique features.
            </BenefitCard>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
            <BenefitCard icon={<MenuBookIcon />} title="Professional Documentation">
              Navigate development with ease using our robust, professionally created documentation, complete with examples and best practices.
            </BenefitCard>
          </Grid>
        </Grid>
      </Container>

      <Box component="section" id="features" className="py-20 sm:py-28 scroll-mt-20 bg-[#1B4332]">
        <Container maxWidth="lg">
            <SectionTitle>Core System Capabilities</SectionTitle>
            <Grid container spacing={3}>
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
                <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }} key={feature.title}>
                    <Paper elevation={0} className="bg-[#2D6A4F] p-6 rounded-lg shadow-lg hover:shadow-[#95D5B2]/20 transition-all duration-300 transform hover:-translate-y-1 border border-[#1B4332]/70 h-full">
                        <Typography variant="h6" component="h3" className="text-xl font-medium text-[#74C69D] mb-3">{feature.title}</Typography>
                        <Typography variant="body2" className="text-[#D8F3DC]/90 leading-relaxed text-sm">{feature.text}</Typography>
                    </Paper>
                </Grid>
            ))}
            </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" component="section" id="testimonials" className="py-20 sm:py-28 scroll-mt-20 bg-[#081C15]">
        <SectionTitle>Developer Acclaim</SectionTitle>
        <Grid container spacing={4}>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
            <TestimonialCard name="Rina K." role="Lead Systems Designer, AAA Studio" stars={5} text="The depth of the damage and armor simulation is astounding. These plugins formed the backbone of our combat and saved us countless hours." avatar="https://placehold.co/100x100/74C69D/081C15?text=RK"/>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
            <TestimonialCard name="Devon 'Spark' Lee" role="Indie FPS Creator" stars={5} text="As a solo dev, this toolkit is a lifesaver. Robust, well-documented, and the modularity lets me use exactly what I need. My game feels incredible!" avatar="https://placehold.co/100x100/95D5B2/081C15?text=DL"/>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
            <TestimonialCard name="Dr. Anya Sharma" role="Simulation Specialist, R&D" stars={4} text="Impressive realism in projectile physics and material interaction. Required some adaptation for our specific research needs, but the foundation is exceptionally strong." avatar="https://placehold.co/100x100/B7E4C7/081C15?text=AS"/>
          </Grid>
        </Grid>
      </Container>

      <Box component="section" id="synergistic-systems" className="py-20 sm:py-28 scroll-mt-20 bg-[#1B4332]">
        <Container maxWidth="lg">
            <SectionTitle>Synergistic Systems: A Cohesive Combat Core</SectionTitle>
            <Typography variant="body1" className="text-center text-[#D8F3DC]/80 max-w-3xl mx-auto mb-12 leading-relaxed">
            Our plugins are not just individual tools; they form a deeply interconnected ecosystem. This synergy ensures realistic and consistent gameplay mechanics across all aspects of combat, from the moment a projectile is fired to its ultimate impact and effect.
            </Typography>
            <Paper elevation={0} className="overflow-x-auto bg-[#2D6A4F] p-6 rounded-lg shadow-2xl border border-[#1B4332]/70">
            <table className="min-w-full divide-y divide-[#2D6A4F]/30">
                <thead className="bg-[#081C15]/50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#74C69D] uppercase tracking-wider">System Component</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#74C69D] uppercase tracking-wider">Key Features & Software Design Patterns</th>
                </tr>
                </thead>
                <tbody className="bg-[#2D6A4F] divide-y divide-[#1B4332]/50">
                <tr className="hover:bg-[#081C15]/30 transition-colors duration-150">
                    <td className="px-6 py-4 align-top whitespace-nowrap text-sm font-medium text-[#D8F3DC]">
                    Damage System (DS) <br /> <span className="text-xs text-[#D8F3DC]/70">The Orchestrator</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#D8F3DC]/90 leading-relaxed">
                    Centralizes damage processing through a <strong className="text-[#95D5B2]">core routing component</strong>, ensuring a consistent event pipeline. Defines a <strong className="text-[#95D5B2]">standardized damage information packet</strong> and <strong className="text-[#95D5B2]">shared definitions for item properties</strong>, crucial for inter-plugin communication and data-driven design.
                    </td>
                </tr>
                <tr className="hover:bg-[#081C15]/30 transition-colors duration-150">
                    <td className="px-6 py-4 align-top whitespace-nowrap text-sm font-medium text-[#D8F3DC]">Limb Health System (LHS)</td>
                    <td className="px-6 py-4 text-sm text-[#D8F3DC]/90 leading-relaxed">
                    Enables granular, per-limb health and status effects. Reacts to <strong className="text-[#95D5B2]">standardized damage information</strong> from the DS to apply localized injuries, seamlessly working with the Gameplay Ability System for complex medical interactions and stamina modeling.
                    </td>
                </tr>
                <tr className="hover:bg-[#081C15]/30 transition-colors duration-150">
                    <td className="px-6 py-4 align-top whitespace-nowrap text-sm font-medium text-[#D8F3DC]">Armor System (AS)</td>
                    <td className="px-6 py-4 text-sm text-[#D8F3DC]/90 leading-relaxed">
                    Provides realistic protection with durability, quality tiers, and material-based mitigation (penetration, ricochet). Intercepts damage via the DS pipeline, modifying the <strong className="text-[#95D5B2]">standardized damage information packet</strong> before it reaches the health system.
                    </td>
                </tr>
                <tr className="hover:bg-[#081C15]/30 transition-colors duration-150">
                    <td className="px-6 py-4 align-top whitespace-nowrap text-sm font-medium text-[#D8F3DC]">Projectile System (PDS)</td>
                    <td className="px-6 py-4 text-sm text-[#D8F3DC]/90 leading-relaxed">
                    Manages hitscan and simulated projectiles with advanced ballistics (fragmentation, spall). Initiates the damage event by populating the <strong className="text-[#95D5B2]">standardized damage information packet</strong> with <strong className="text-[#95D5B2]">projectile-specific data attributes</strong> and <strong className="text-[#95D5B2]">definitions for projectile characteristics</strong> for the DS to process.
                    </td>
                </tr>
                </tbody>
            </table>
            </Paper>
        </Container>
      </Box>

      <Container maxWidth="md" component="section" id="faq" className="py-20 sm:py-28 scroll-mt-20 bg-[#081C15]">
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <Box>
          <FAQItem
            question="What version of Unreal Engine are these plugins compatible with?"
            answer="Our plugins are designed for Unreal Engine 5.5 and are actively maintained for compatibility with the latest stable releases. We also strive to support recent prior versions where feasible."
          />
          <FAQItem
            question="Are the plugins difficult to integrate into an existing project?"
            answer="We&apos;vedesigned them with modularity in mind. Each system can be integrated independently, and the core Damage System provides clear pathways for connecting them. Comprehensive documentation and examples are provided."
          />
          <FAQItem
            question="Can I customize the behavior of the systems?"
            answer="Absolutely. The systems are highly data-driven using Data Assets, and core logic is exposed through well-commented C++ and Blueprints, allowing for deep customization to fit your game&apos;s specific needs."
          />
          <FAQItem
            question="Is networking and replication handled?"
            answer="Yes, all systems are built with multiplayer in mind, featuring server-authoritative logic and efficient replication strategies for smooth online experiences."
          />
          <FAQItem
            question="What kind of support is offered?"
            answer="We offer dedicated support through our community forums and direct channels for licensed users. Plus, our extensive documentation covers common integration patterns and troubleshooting."
          />
        </Box>
      </Container>

      <Container maxWidth="lg" component="section" id="cta" 
        className="py-24 sm:py-32 text-center bg-gradient-to-br from-[#2D6A4F] via-[#081C15] to-[#2D6A4F] rounded-lg my-16 shadow-2xl scroll-mt-20 border border-[#1B4332]/50"
      >
        <Typography variant="h4" component="h2" className="text-3xl sm:text-4xl font-bold text-[#D8F3DC] mb-6">
          Ready to Craft Your Ultimate FPS?
        </Typography>
        <Typography variant="h6" component="p" className="text-lg text-[#D8F3DC]/80 max-w-xl mx-auto mb-10">
          Access the complete suite of FPS gameplay systems. Start building more dynamic, immersive, and engaging combat scenarios today.
        </Typography>
        <Button 
          variant="contained"
          size="large"
          onClick={() => showModal('Get Plugins', 'This action would typically lead to a purchase or download page for the plugins.')}
          className="bg-[#74C69D] hover:bg-[#95D5B2] text-[#081C15] font-bold shadow-lg hover:shadow-[#74C69D]/40 transition-all duration-300 transform hover:scale-105"
          sx={{ py: 1.75, px: 5, textTransform: 'none', fontSize: '1.125rem', color: '#081C15 !important', backgroundColor: '#74C69D !important', '&:hover': {backgroundColor: '#95D5B2 !important'} }}
          endIcon={<ArrowForwardIcon />}
        >
          Get The Plugins Now
        </Button>
        <Typography variant="body2" className="text-sm text-[#D8F3DC]/60 mt-8">
          Questions? <Button component="a" href="#" onClick={(e) => {e.preventDefault(); showModal('Contact Us', 'This link would typically lead to a contact form or support page.');}} sx={{color: '#95D5B2', textTransform: 'none', fontWeight: 'normal', padding:0, minWidth:0, '&:hover': {color: '#74C69D', textDecoration: 'underline'}}}>Contact Us</Button>
          &nbsp;|&nbsp;
          <Button component="a" href="#" onClick={(e) => {e.preventDefault(); setCurrentPage('documentation'); if(typeof window !== 'undefined') window.scrollTo(0,0);}} sx={{color: '#95D5B2', textTransform: 'none', fontWeight: 'normal', padding:0, minWidth:0, '&:hover': {color: '#74C69D', textDecoration: 'underline'}}}>View Documentation</Button>
        </Typography>
      </Container>
    </>
  );
};

export default LandingPage;
