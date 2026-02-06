import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EMPIRE_DATA } from '@/types/ppi';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Radar Chart Component
function RadarChart({ 
  empireA, 
  empireB 
}: { 
  empireA: typeof EMPIRE_DATA[0]; 
  empireB: typeof EMPIRE_DATA[0];
}) {
  const size = 280;
  const center = size / 2;
  const radius = 90;
  const domains = Object.keys(empireA.domainScores);
  const angleStep = (2 * Math.PI) / domains.length;

  const getPoint = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 25) * radius; // Scale to radius (max domain contribution ~25)
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const pathA = domains.map((domain, i) => {
    const point = getPoint(empireA.domainScores[domain], i);
    return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
  }).join(' ') + ' Z';

  const pathB = domains.map((domain, i) => {
    const point = getPoint(empireB.domainScores[domain], i);
    return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
  }).join(' ') + ' Z';

  return (
    <svg width={size} height={size} className="mx-auto">
      {/* Grid circles */}
      {[0.25, 0.5, 0.75, 1].map((scale, i) => (
        <circle
          key={i}
          cx={center}
          cy={center}
          r={radius * scale}
          fill="none"
          stroke="rgba(244, 241, 234, 0.1)"
          strokeWidth={1}
        />
      ))}
      
      {/* Axis lines */}
      {domains.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="rgba(244, 241, 234, 0.1)"
            strokeWidth={1}
          />
        );
      })}
      
      {/* Empire B (dashed) */}
      <path
        d={pathB}
        fill="rgba(184, 178, 166, 0.15)"
        stroke="rgba(184, 178, 166, 0.8)"
        strokeWidth={2}
        strokeDasharray="6,4"
      />
      
      {/* Empire A (solid) */}
      <path
        d={pathA}
        fill="rgba(201, 168, 106, 0.2)"
        stroke="var(--gold)"
        strokeWidth={2}
      />
      
      {/* Labels */}
      {domains.map((domain, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = center + (radius + 20) * Math.cos(angle);
        const y = center + (radius + 20) * Math.sin(angle);
        const shortName = domain.split(' ')[0];
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-mono text-[8px] fill-[var(--text-secondary)]"
          >
            {shortName}
          </text>
        );
      })}
    </svg>
  );
}

export default function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  const [empireA, setEmpireA] = useState<typeof EMPIRE_DATA[0]>(EMPIRE_DATA[0]); // Roman
  const [empireB, setEmpireB] = useState<typeof EMPIRE_DATA[0]>(EMPIRE_DATA[2]); // Mongol

  // Find leading domains
  const getInsight = () => {
    const domains = Object.keys(empireA.domainScores);
    let aLead = '';
    let bLead = '';
    let aMax = 0;
    let bMax = 0;
    
    domains.forEach(domain => {
      const diff = empireA.domainScores[domain] - empireB.domainScores[domain];
      if (diff > aMax) {
        aMax = diff;
        aLead = domain;
      }
      if (-diff > bMax) {
        bMax = -diff;
        bLead = domain;
      }
    });
    
    return { aLead, bLead };
  };

  const insight = getInsight();

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
            gsap.set(cardRef.current, { x: 0, opacity: 1, scale: 1 });
            gsap.set(bgRef.current, { scale: 1 });
          }
        }
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(headlineRef.current,
          { x: '-45vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(cardRef.current,
          { x: '45vw', opacity: 0, scale: 0.97 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0
        )
        .fromTo(bgRef.current,
          { scale: 1.06 },
          { scale: 1, ease: 'none' },
          0
        );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(headlineRef.current,
          { x: 0, opacity: 1 },
          { x: '-16vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(cardRef.current,
          { x: 0, opacity: 1 },
          { x: '16vw', opacity: 0, ease: 'power2.in' },
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

  return (
    <section ref={sectionRef} className="section-pinned z-50">
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="/ships_warfare.jpg" 
          alt="Naval Warfare" 
          className="w-full h-full object-cover"
        />
        <div className="dark-overlay" style={{ background: 'rgba(14,15,18,0.62)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-[7vw] flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-0">
          
          {/* Headline Block */}
          <div ref={headlineRef} className="w-full lg:w-[34vw] pt-[10vh] lg:pt-0">
            <h2 className="text-h2 font-display font-bold text-[var(--cream)] text-shadow mb-4">
              Compare empires
            </h2>
            <p className="text-body text-[var(--text-secondary)]">
              Select two powers. See how domains stack across eras.
            </p>
          </div>

          {/* Comparison Card */}
          <div 
            ref={cardRef}
            className="glass-card p-6 lg:p-8 w-full lg:w-[44vw] lg:max-w-[680px]"
          >
            {/* Dropdowns */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <div className="relative w-full sm:w-auto">
                <select
                  value={empireA.name}
                  onChange={(e) => {
                    const selected = EMPIRE_DATA.find(emp => emp.name === e.target.value);
                    if (selected) setEmpireA(selected);
                  }}
                  className="w-full sm:w-48 appearance-none bg-[rgba(14,15,18,0.8)] border border-[rgba(244,241,234,0.14)] rounded-lg px-4 py-2 pr-10 font-mono text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--gold)]"
                >
                  {EMPIRE_DATA.map(empire => (
                    <option key={empire.name} value={empire.name}>
                      {empire.name} ({empire.year} {empire.era})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)] pointer-events-none" />
              </div>
              
              <span className="font-mono text-sm text-[var(--gold)]">VS</span>
              
              <div className="relative w-full sm:w-auto">
                <select
                  value={empireB.name}
                  onChange={(e) => {
                    const selected = EMPIRE_DATA.find(emp => emp.name === e.target.value);
                    if (selected) setEmpireB(selected);
                  }}
                  className="w-full sm:w-48 appearance-none bg-[rgba(14,15,18,0.8)] border border-[rgba(244,241,234,0.14)] rounded-lg px-4 py-2 pr-10 font-mono text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--gold)]"
                >
                  {EMPIRE_DATA.map(empire => (
                    <option key={empire.name} value={empire.name}>
                      {empire.name} ({empire.year} {empire.era})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)] pointer-events-none" />
              </div>
            </div>

            {/* Radar Chart */}
            <div className="mb-6">
              <RadarChart empireA={empireA} empireB={empireB} />
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 bg-[var(--gold)]" />
                <span className="font-mono text-xs text-[var(--cream)]">{empireA.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 border-t border-dashed border-[var(--text-secondary)]" />
                <span className="font-mono text-xs text-[var(--text-secondary)]">{empireB.name}</span>
              </div>
            </div>

            {/* Insight */}
            <div className="pt-4 border-t border-[rgba(244,241,234,0.14)] text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                <span className="text-[var(--gold)]">{empireA.name}</span> leads in {insight.aLead};{' '}
                <span className="text-[var(--text-secondary)]">{empireB.name}</span> leads in {insight.bLead}.
              </p>
            </div>

            {/* PPI Scores */}
            <div className="flex items-center justify-center gap-8 mt-4">
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-[var(--gold)]">
                  {empireA.ppi}
                </div>
                <div className="font-mono text-micro uppercase text-[var(--text-secondary)]">
                  {empireA.name} PPI
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-[var(--text-secondary)]">
                  {empireB.ppi}
                </div>
                <div className="font-mono text-micro uppercase text-[var(--text-secondary)]">
                  {empireB.name} PPI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
