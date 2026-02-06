import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DOMAINS, DOMAIN_DESCRIPTIONS } from '@/types/ppi';

gsap.registerPlugin(ScrollTrigger);

export default function DomainsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  const [selectedDomain, setSelectedDomain] = useState<string>("Military Power");

  const domainNames = Object.keys(DOMAINS);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set(headlineRef.current, { x: 0, opacity: 1 });
            gsap.set(widgetRef.current, { x: 0, opacity: 1 });
            gsap.set(bgRef.current, { scale: 1, y: 0 });
          }
        }
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(headlineRef.current,
          { x: '-50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(widgetRef.current,
          { x: '50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(bgRef.current,
          { scale: 1.06, y: '-3vh' },
          { scale: 1, y: 0, ease: 'none' },
          0
        );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(headlineRef.current,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(widgetRef.current,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(bgRef.current,
          { scale: 1 },
          { scale: 1.06 },
          0.70
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const selectedDomainData = DOMAINS[selectedDomain];

  return (
    <section ref={sectionRef} className="section-pinned z-30">
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="/city_fortress.jpg" 
          alt="Historic Fortress" 
          className="w-full h-full object-cover"
        />
        <div className="dark-overlay" style={{ background: 'rgba(14,15,18,0.65)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-[7vw] flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-0">
          
          {/* Headline Block */}
          <div ref={headlineRef} className="w-full lg:w-[40vw] pt-[10vh] lg:pt-0">
            <h2 className="text-h2 font-display font-bold text-[var(--cream)] text-shadow mb-4">
              Eight domains of power
            </h2>
            <p className="text-body text-[var(--text-secondary)]">
              Each domain contributes a weighted share. Click a domain to see its role.
            </p>
          </div>

          {/* Domain Selector Widget */}
          <div 
            ref={widgetRef}
            className="glass-card p-6 lg:p-8 w-full lg:w-[38vw] lg:max-w-[560px]"
          >
            {/* Domain List */}
            <div className="space-y-2 mb-6">
              {domainNames.map((domain) => {
                const domainData = DOMAINS[domain];
                const isSelected = domain === selectedDomain;
                return (
                  <button
                    key={domain}
                    onClick={() => setSelectedDomain(domain)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                      isSelected 
                        ? 'bg-[rgba(201,168,106,0.15)] border border-[var(--gold)]' 
                        : 'hover:bg-[rgba(244,241,234,0.05)] border border-transparent'
                    }`}
                  >
                    <span className={`font-mono text-sm ${isSelected ? 'text-[var(--gold)]' : 'text-[var(--cream)]'}`}>
                      {domain}
                    </span>
                    <div className="flex items-center gap-3">
                      <div 
                        className="mini-bar w-16"
                        style={{ 
                          width: `${domainData.weight * 200}px`,
                          opacity: isSelected ? 1 : 0.5
                        }}
                      />
                      <span className="font-mono text-xs text-[var(--text-secondary)] w-10 text-right">
                        {Math.round(domainData.weight * 100)}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detail Panel */}
            <div className="pt-6 border-t border-[rgba(244,241,234,0.14)]">
              <h4 className="font-display font-semibold text-lg text-[var(--gold)] mb-2">
                {selectedDomain}
              </h4>
              <p className="text-sm text-[var(--text-secondary)] mb-3">
                {DOMAIN_DESCRIPTIONS[selectedDomain]}
              </p>
              <div className="flex items-center gap-2">
                <span className="font-mono text-micro uppercase text-[var(--text-secondary)]">
                  Default weight:
                </span>
                <span className="font-mono text-sm text-[var(--gold)]">
                  {Math.round(selectedDomainData.weight * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
