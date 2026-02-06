import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sword, Landmark, Globe, Users, Cog, Lightbulb, Crown, Shield, Scale } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// In-depth domain explanations for history enthusiasts
const domainDeepDives = [
  {
    key: "Military Power",
    icon: Sword,
    weight: "25%",
    title: "The Sword of State",
    rationale: "Military power receives the highest weight (25%) consistent with the realist tradition in international relations theory. As Morgenthau (1948) and Waltz (1979) argued, in an anarchic international system, military force remains the ultimate arbiter of disputes.",
    historicalContext: [
      {
        era: "Ancient (500 BC - 500 AD)",
        examples: "Roman legions professionalized warfare; Assyrian siegecraft dominated the Near East; Qin state's military reforms unified China."
      },
      {
        era: "Medieval (500 - 1500)",
        examples: "Feudal knight cavalry dominated European battlefields; Mongol composite bows and mobility created the largest land empire."
      },
      {
        era: "Early Modern (1500 - 1800)",
        examples: "Gunpowder revolutionized warfare; standing armies replaced feudal levies; naval power became decisive for global reach."
      },
      {
        era: "Modern (1800 - present)",
        examples: "Industrial warfare mechanized conflict; nuclear weapons created deterrence; precision weapons changed targeting."
      }
    ],
    scholarlyNote: "The 25% weight reflects that while military power is decisive, it is not the only form of power. Economic and institutional factors (45% combined) acknowledge that sustainable power requires more than force alone.",
    subIndicators: [
      { name: "Manpower (25%)", note: "Standing armies vs. levies mattered enormously. Rome's professional legions could campaign year-round unlike seasonal militias." },
      { name: "Battlefield Success (20%)", note: "Win/loss ratios reveal tactical and strategic effectiveness. Alexander's 100% major battle success rate was unprecedented." },
      { name: "Navy Strength (15%)", note: "Thalassocracy (sea power) enabled Athens, Venice, and Britain to punch above their weight." },
      { name: "Military Technology (20%)", note: "Composite bows, steel weapons, gunpowder, and eventually nuclear weapons each revolutionized warfare." },
      { name: "Logistics & Projection (10%)", note: "Rome's roads, Britain's coaling stations, and modern airlift each extended military reach." },
      { name: "Force Range (10%)", note: "Distance from capital to frontier determined how far power could be projected." }
    ]
  },
  {
    key: "Economic Power",
    icon: Landmark,
    weight: "20%",
    title: "The Wealth of Nations",
    rationale: "Economic power (20%) reflects both material resource base and the capacity for conversion into other power forms, following Knorr (1956) and Gilpin (1981). Wealth funds armies, builds infrastructure, and attracts allies.",
    historicalContext: [
      {
        era: "Ancient",
        examples: "Athenian silver mines funded the Delian League; Roman tax extraction from provinces sustained the legions."
      },
      {
        era: "Medieval",
        examples: "Italian city-states' banking dominance; Hanseatic League's trade network; Song Dynasty's paper money economy."
      },
      {
        era: "Early Modern",
        examples: "Dutch commercial supremacy; British East India Company's resource extraction; Spanish silver flows from the Americas."
      },
      {
        era: "Modern",
        examples: "Industrial Revolution concentrated productive capacity; Bretton Woods established financial hegemony; post-industrial knowledge economies."
      }
    ],
    scholarlyNote: "The 20% weight acknowledges that while economics is foundational, economic power alone cannot guarantee security. The Soviet Union had enormous GDP but collapsed due to institutional failures.",
    subIndicators: [
      { name: "GDP/Production (40%)", note: "Maddison Project data enables cross-temporal comparison in 1990 international dollars." },
      { name: "GDP Share (20%)", note: "Share of world GDP reveals relative economic dominance. Britain peaked at ~25% in 1870." },
      { name: "Trade Volume (15%)", note: "Trade dominance creates dependencies. The Silk Road made intermediaries rich." },
      { name: "Industrial Capacity (10%)", note: "Steel production became the metric of industrial age power (COW dataset)." },
      { name: "Natural Resources (10%)", note: "Coal and oil became strategic resources in the industrial age." },
      { name: "Currency/Finance (5%)", note: "Reserve currency status (pound, then dollar) created structural advantages." }
    ]
  },
  {
    key: "Territorial Control",
    icon: Globe,
    weight: "15%",
    title: "The Geography of Power",
    rationale: "Territorial control (15%) captures both geographic reach and the administrative challenge of governing dispersed populations, following Tilly (1990). Size brings resources but also governance challenges.",
    historicalContext: [
      {
        era: "Ancient",
        examples: "Persian Empire's satrapy system managed diverse territories; Alexander's empire fragmented immediately after his death."
      },
      {
        era: "Medieval",
        examples: "Mongol Empire's unprecedented size required innovative governance; Holy Roman Empire's fragmented territories."
      },
      {
        era: "Early Modern",
        examples: "European colonial expansion; Russian expansion across Siberia; Qing Dynasty's territorial consolidation."
      },
      {
        era: "Modern",
        examples: "British Empire at its zenith covered 35.5 million km²; decolonization reduced European territorial control."
      }
    ],
    scholarlyNote: "The 15% weight reflects that while territory provides resources, it also creates governance burdens. The Mongol Empire's vast size contributed to its rapid fragmentation.",
    subIndicators: [
      { name: "Territory Size (50%)", note: "Land area under effective control. British Empire: 35.5M km²; Mongol Empire: 24M km²." },
      { name: "Population Coverage (30%)", note: "Share of world population. Roman Empire held ~21% of world population at peak." },
      { name: "Border Contiguity (10%)", note: "Cohesive territories are easier to defend than scattered possessions." },
      { name: "Number of Provinces (10%)", note: "Administrative subdivisions reveal governance sophistication." }
    ]
  },
  {
    key: "Demographics",
    icon: Users,
    weight: "10%",
    title: "The Human Foundation",
    rationale: "Demographics (10%) provides the human resource foundation for all other capabilities, following Organski & Kugler (1980). Population is both a resource and a burden.",
    historicalContext: [
      {
        era: "Ancient",
        examples: "Roman citizenship expanded to integrate conquered peoples; Han Dynasty's population recovery after wars."
      },
      {
        era: "Medieval",
        examples: "Black Death devastated European populations; Chinese population cycles under dynastic transitions."
      },
      {
        era: "Early Modern",
        examples: "Columbian Exchange transformed global demographics; European population growth enabled colonization."
      },
      {
        era: "Modern",
        examples: "Demographic transition theory; aging populations in developed nations; youth bulges in developing regions."
      }
    ],
    scholarlyNote: "The 10% weight reflects that while population is necessary, it is not sufficient. India and China had massive populations but were subjugated by smaller European powers during the colonial era.",
    subIndicators: [
      { name: "Total Population (50%)", note: "HYDE database provides gridded estimates from 10,000 BCE." },
      { name: "Population Density (15%)", note: "Dense populations enable specialization but create resource pressures." },
      { name: "Growth Rate (15%)", note: "Growing populations indicate vitality; decline signals crisis." },
      { name: "Urbanization (20%)", note: "Urban populations correlate with economic development and state capacity." }
    ]
  },
  {
    key: "Administrative Capacity",
    icon: Cog,
    weight: "10%",
    title: "The Machinery of State",
    rationale: "Administrative capacity (10%) reflects state effectiveness in penetrating society and implementing policy, following Mann (1984) and Fukuyama (2011). Bureaucracy turns resources into power.",
    historicalContext: [
      {
        era: "Ancient",
        examples: "Roman census and tax rolls; Qin Dynasty's standardized weights, measures, and writing."
      },
      {
        era: "Medieval",
        examples: "Byzantine Theme system; Islamic caliphates' diwan bureaucracy; Chinese imperial examination system."
      },
      {
        era: "Early Modern",
        examples: "French intendants; Prussian civil service reforms; British East India Company's administrative innovations."
      },
      {
        era: "Modern",
        examples: "Weberian bureaucracy; development of statistics and social science; digital governance."
      }
    ],
    scholarlyNote: "The 10% weight acknowledges that while institutions matter, they are often invisible until they fail. The Qing Dynasty's administrative decay preceded its collapse.",
    subIndicators: [
      { name: "Tax Revenue/GDP (25%)", note: "Tax extraction reveals state penetration. Rome extracted ~5-10% of GDP; modern states extract 30-50%." },
      { name: "Bureaucracy Size (25%)", note: "Officials per capita. More bureaucrats generally mean better governance, up to a point." },
      { name: "Internal Security (20%)", note: "Capacity to maintain order without excessive force." },
      { name: "Infrastructure Network (15%)", note: "Roads, communications, and logistics networks. Roman roads were legendary." },
      { name: "Legal/Institutional Reach (15%)", note: "Uniform law coverage. Roman law spread with the empire." }
    ]
  },
  {
    key: "Technology & Science",
    icon: Lightbulb,
    weight: "10%",
    title: "The Edge of Innovation",
    rationale: "Technology & Science (10%) captures innovation capacity and technical advancement, following Kennedy (1987). Technological advantage compounds over time.",
    historicalContext: [
      {
        era: "Ancient",
        examples: "Greek scientific revolution; Roman engineering (aqueducts, roads); Chinese四大发明 (four great inventions)."
      },
      {
        era: "Medieval",
        examples: "Islamic Golden Age preserved and extended Greek knowledge; European agricultural revolution."
      },
      {
        era: "Early Modern",
        examples: "Scientific Revolution; Industrial Revolution began in Britain; printing press spread knowledge."
      },
      {
        era: "Modern",
        examples: "Second and Third Industrial Revolutions; information technology; biotechnology and AI."
      }
    ],
    scholarlyNote: "The 10% weight reflects that while technology matters, adoption and diffusion often matter more than invention. China invented gunpowder but Europe weaponized it more effectively.",
    subIndicators: [
      { name: "Innovation Output (25%)", note: "Major inventions and discoveries per period." },
      { name: "Education/Literacy (25%)", note: "Literate populations enable complex administration and innovation." },
      { name: "Science Funding (20%)", note: "Investment in knowledge production." },
      { name: "Industrial Technology (15%)", note: "Adoption of productive technologies." },
      { name: "Arms Technology (15%)", note: "Military applications of technology." }
    ]
  },
  {
    key: "Diplomacy & Hegemony",
    icon: Crown,
    weight: "5%",
    title: "The Art of Alliances",
    rationale: "Diplomatic influence (5%) reflects soft power and alliance networks, following Nye (1990). Alliances multiply power without multiplying costs.",
    historicalContext: [
      {
        era: "Ancient",
        examples: "Peloponnesian League vs. Delian League; Roman client kingdom system."
      },
      {
        era: "Medieval",
        examples: "Papal alliances; Crusader states' dependence on European support; Mongol tributary system."
      },
      {
        era: "Early Modern",
        examples: "Balance of power diplomacy; alliance systems before WWI; colonial protectorates."
      },
      {
        era: "Modern",
        examples: "NATO and Warsaw Pact; United Nations; regional organizations (EU, ASEAN)."
      }
    ],
    scholarlyNote: "The 5% weight reflects that while alliances matter, they are secondary to intrinsic capabilities. Alliances can dissolve quickly—intrinsic power endures.",
    subIndicators: [
      { name: "Alliances/Client States (40%)", note: "Formal allies multiply effective power." },
      { name: "Coalition Leadership (25%)", note: "Leading coalitions demonstrates hegemonic status." },
      { name: "Diplomatic Missions (25%)", note: "Embassy networks enable information and influence." },
      { name: "Colonial Diplomacy (10%)", note: "Leverage in imperial systems." }
    ]
  },
  {
    key: "Internal Stability",
    icon: Shield,
    weight: "5%",
    title: "The Foundation of Endurance",
    rationale: "Internal stability (5%) reflects regime durability and social cohesion, following Bueno de Mesquita et al. (2003). Unstable states cannot project power externally.",
    historicalContext: [
      {
        era: "Ancient",
        examples: "Roman civil wars weakened the Republic; succession crises in empires."
      },
      {
        era: "Medieval",
        examples: "Feudal fragmentation; peasant revolts; religious wars."
      },
      {
        era: "Early Modern",
        examples: "English Civil War; French Revolution; Napoleonic wars."
      },
      {
        era: "Modern",
        examples: "World Wars as systemic shocks; Cold War proxy conflicts; modern civil wars."
      }
    ],
    scholarlyNote: "The 5% weight reflects that while stability is necessary for sustained power, it is often invisible until lost. Most empires collapsed from internal decay, not external conquest.",
    subIndicators: [
      { name: "Civil Unrest Frequency (30%)", note: "Rebellions per decade. Inverted: fewer is better." },
      { name: "Duration of Peace (30%)", note: "Years since last major civil conflict." },
      { name: "Famine/Pandemic Impact (20%)", note: "Disaster deaths per million. Inverted: fewer is better." },
      { name: "Regime Durability (20%)", note: "Years of continuous rule indicates stability." }
    ]
  }
];

export default function HistoricalDepthSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [expandedDomain, setExpandedDomain] = useState<string | null>("Military Power");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="historical-depth"
      className="relative bg-[var(--charcoal)] py-[10vh]"
    >
      <div className="px-[7vw]">
        {/* Header */}
        <div ref={headerRef} className="max-w-4xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-6 h-6 text-[var(--gold)]" />
            <span className="font-mono text-micro uppercase text-[var(--gold)] tracking-[0.08em]">
              For History Enthusiasts
            </span>
          </div>
          <h2 className="text-h2 font-display font-bold text-[var(--cream)] mb-4">
            The Scholarship Behind the Scores
          </h2>
          <p className="text-body text-[var(--text-secondary)]">
            The PPI framework is grounded in decades of international relations theory and historical scholarship. 
            Each domain weight reflects theoretical debates about the nature of state power across three millennia.
          </p>
        </div>

        {/* Era-Relative Normalization Explanation */}
        <div className="glass-card p-8 mb-10 max-w-4xl">
          <h3 className="text-h3 font-display font-semibold text-[var(--cream)] mb-4">
            Why Era-Relative Normalization?
          </h3>
          <p className="text-body text-[var(--text-secondary)] mb-4">
            A fundamental methodological choice concerns the normalization baseline: should indicators be scaled against 
            all-time maximums (absolute comparison) or contemporary maximums (relative comparison)?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <h4 className="font-display font-semibold text-[var(--gold)] mb-2">Technological Discontinuity</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                Comparing Roman legions to modern armies obscures rather than illuminates relative power. 
                Era-relative scaling preserves the meaningful question: "How dominant was this state among its actual competitors?"
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-[var(--gold)] mb-2">Conceptual Validity</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                A state's power is inherently relational—meaningful only in reference to what opponents could marshal. 
                Roman superiority over Germanic tribes constituted genuine historical power.
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-[var(--gold)] mb-2">Empirical Tractability</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                Missing data for ancient states can be estimated through available contemporaneous benchmarks 
                rather than requiring speculative projection across millennia.
              </p>
            </div>
          </div>
        </div>

        {/* Domain Deep Dives */}
        <div className="space-y-4">
          <h3 className="text-h3 font-display font-semibold text-[var(--cream)] mb-6">
            Domain-by-Domain Deep Dive
          </h3>
          
          {domainDeepDives.map((domain) => {
            const Icon = domain.icon;
            const isExpanded = expandedDomain === domain.key;
            
            return (
              <div 
                key={domain.key}
                className="glass-card overflow-hidden"
              >
                {/* Header - Always visible */}
                <button
                  onClick={() => setExpandedDomain(isExpanded ? null : domain.key)}
                  className="w-full p-6 flex items-center justify-between hover:bg-[rgba(244,241,234,0.02)] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-[rgba(201,168,106,0.15)]">
                      <Icon className="w-5 h-5 text-[var(--gold)]" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-display font-semibold text-[var(--cream)]">
                        {domain.key}
                      </h4>
                      <p className="font-mono text-micro uppercase text-[var(--gold)] tracking-[0.08em]">
                        Weight: {domain.weight}
                      </p>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-[rgba(244,241,234,0.1)]">
                    <div className="pt-6">
                      <h5 className="text-xl font-display font-semibold text-[var(--gold)] mb-4">
                        {domain.title}
                      </h5>
                      
                      <p className="text-body text-[var(--text-secondary)] mb-6">
                        {domain.rationale}
                      </p>

                      {/* Historical Context */}
                      <div className="mb-6">
                        <h6 className="font-mono text-micro uppercase text-[var(--cream)] tracking-[0.08em] mb-4">
                          Historical Evolution
                        </h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {domain.historicalContext.map((ctx) => (
                            <div key={ctx.era} className="p-4 rounded-lg bg-[rgba(0,0,0,0.2)]">
                              <span className="font-mono text-xs text-[var(--gold)]">{ctx.era}</span>
                              <p className="text-sm text-[var(--text-secondary)] mt-2">{ctx.examples}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sub-indicators */}
                      <div className="mb-6">
                        <h6 className="font-mono text-micro uppercase text-[var(--cream)] tracking-[0.08em] mb-4">
                          Sub-Indicators & Historical Notes
                        </h6>
                        <div className="space-y-2">
                          {domain.subIndicators.map((sub) => (
                            <div key={sub.name} className="flex items-start gap-3 p-3 rounded-lg bg-[rgba(0,0,0,0.2)]">
                              <span className="font-mono text-xs text-[var(--gold)] whitespace-nowrap">{sub.name}</span>
                              <span className="text-sm text-[var(--text-secondary)]">{sub.note}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Scholarly Note */}
                      <div className="p-4 rounded-lg bg-[rgba(201,168,106,0.1)] border border-[rgba(201,168,106,0.2)]">
                        <span className="font-mono text-micro uppercase text-[var(--gold)] tracking-[0.08em]">
                          Scholarly Rationale
                        </span>
                        <p className="text-sm text-[var(--text-secondary)] mt-2">
                          {domain.scholarlyNote}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Key References */}
        <div className="mt-10 glass-card p-8">
          <h3 className="text-h3 font-display font-semibold text-[var(--cream)] mb-6">
            Key Scholarly References
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Morgenthau, H.J. (1948). Politics Among Nations.",
              "Waltz, K.N. (1979). Theory of International Politics.",
              "Kennedy, P. (1987). The Rise and Fall of the Great Powers.",
              "Mann, M. (1984). The autonomous power of the state.",
              "Tilly, C. (1990). Coercion, Capital, and European States.",
              "Nye, J.S. (1990). Soft Power.",
              "Fukuyama, F. (2011). The Origins of Political Order.",
              "Scheidel, W. (2009). Rome and China: Comparative Perspectives."
            ].map((ref) => (
              <div key={ref} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] mt-2 flex-shrink-0" />
                <span className="text-sm text-[var(--text-secondary)]">{ref}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
