import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Database, Globe, Scale } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const dataSources = [
  {
    name: 'Maddison Project',
    description: 'Historical GDP and population estimates from 1 CE onward. Provides consistent cross-temporal economic comparisons in 1990 international dollars.',
    icon: Database,
    link: 'https://www.rug.nl/ggdc/historicaldevelopment/maddison/',
    coverage: '1 CE – present'
  },
  {
    name: 'HYDE Database',
    description: 'Gridded population and land use across 12,000 years. High-resolution spatial data on population density, urbanization, and agricultural land.',
    icon: Globe,
    link: 'https://pbl.nl/en/hyde',
    coverage: '10,000 BCE – present'
  },
  {
    name: 'Correlates of War',
    description: 'National material capabilities, alliances, and conflicts from 1816. The gold standard for quantitative international relations research.',
    icon: Scale,
    link: 'https://correlatesofwar.org/',
    coverage: '1816 – present'
  }
];

export default function DataSourcesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.source-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 70, opacity: 0, rotate: -0.5 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.7,
            delay: index * 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="data"
      className="relative bg-[var(--charcoal)] py-[10vh]"
    >
      <div className="px-[7vw]">
        {/* Heading */}
        <div ref={headingRef} className="max-w-[46vw] mb-[6vh]">
          <h2 className="text-h2 font-display font-bold text-[var(--cream)] mb-4">
            Credible inputs
          </h2>
          <p className="text-body text-[var(--text-secondary)]">
            We prioritize documented datasets and transparent estimation.
          </p>
        </div>

        {/* Source Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-[3vw]">
          {dataSources.map((source) => {
            const Icon = source.icon;
            return (
              <div 
                key={source.name}
                className="source-card glass-card p-8 hover:-translate-y-1.5 transition-transform duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <Icon className="w-8 h-8 text-[var(--gold)]" />
                  <span className="font-mono text-micro uppercase text-[var(--text-secondary)] tracking-[0.08em]">
                    {source.coverage}
                  </span>
                </div>
                <h3 className="text-h3 font-display font-semibold text-[var(--cream)] mb-4">
                  {source.name}
                </h3>
                <p className="text-body text-[var(--text-secondary)] mb-6">
                  {source.description}
                </p>
                <a 
                  href={source.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-sm text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
                >
                  Visit source
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Additional Sources */}
        <div className="mt-[8vh] p-8 glass-card">
          <h4 className="font-mono text-micro uppercase text-[var(--gold)] tracking-[0.08em] mb-6">
            Additional References
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-display font-semibold text-[var(--cream)] mb-2">
                Historical Atlases
              </h5>
              <p className="text-sm text-[var(--text-secondary)]">
                Times Atlas of World History, Penguin Historical Atlas, and academic territorial extent studies for pre-1816 boundaries.
              </p>
            </div>
            <div>
              <h5 className="font-display font-semibold text-[var(--cream)] mb-2">
                Scholarly Consensus
              </h5>
              <p className="text-sm text-[var(--text-secondary)]">
                Peer-reviewed estimates from historical journals, archaeological reports, and expert consensus for ancient and medieval periods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
