import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Database, Scale, Calculator } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Collect',
    description: 'Gather indicators across eight domains: military, economic, territorial, demographic, administrative, technological, diplomatic, and stability.',
    icon: Database
  },
  {
    number: '02',
    title: 'Normalize',
    description: 'Convert each indicator to a 0–1 scale using the era\'s maximum. Optional log scaling for skewed distributions.',
    icon: Scale
  },
  {
    number: '03',
    title: 'Weight',
    description: 'Apply domain weights (e.g., Military 25%, Economic 20%) and sum into a final 0–100 score.',
    icon: Calculator
  }
];

export default function MethodologySection() {
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
      const cards = cardsRef.current?.querySelectorAll('.step-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0, rotate: -1 },
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
      id="methodology"
      className="relative bg-parchment py-[10vh]"
    >
      <div className="px-[7vw]">
        {/* Heading */}
        <div ref={headingRef} className="max-w-[46vw] mb-[6vh]">
          <h2 className="text-h2 font-display font-bold text-[var(--text-dark)] mb-4">
            From raw data to score
          </h2>
          <p className="text-body text-[var(--text-dark-secondary)]">
            We start with documented indicators, normalize them against the best performer in the same era, then apply domain weights to produce a comparable score.
          </p>
        </div>

        {/* Steps */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-[3vw]">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number}
                className="step-card glass-card-light p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-micro uppercase text-[var(--gold)] tracking-[0.08em]">
                    {step.number}
                  </span>
                  <Icon className="w-6 h-6 text-[var(--text-dark-secondary)]" />
                </div>
                <h3 className="text-h3 font-display font-semibold text-[var(--text-dark)] mb-4">
                  {step.title}
                </h3>
                <p className="text-body text-[var(--text-dark-secondary)]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Formula Visualization */}
        <div className="mt-[8vh] p-8 glass-card-light">
          <h4 className="font-mono text-micro uppercase text-[var(--gold)] tracking-[0.08em] mb-6">
            The Formula
          </h4>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 text-[var(--text-dark)]">
            <div className="text-center">
              <div className="text-2xl font-display font-bold mb-2">PPI</div>
              <div className="text-sm text-[var(--text-dark-secondary)]">Composite Score</div>
            </div>
            <div className="text-3xl text-[var(--gold)]">=</div>
            <div className="text-center">
              <div className="text-2xl font-display font-bold mb-2">Σ</div>
              <div className="text-sm text-[var(--text-dark-secondary)]">Sum of</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-display font-bold mb-2">Domain<sub>i</sub></div>
              <div className="text-sm text-[var(--text-dark-secondary)]">Domain Score</div>
            </div>
            <div className="text-3xl text-[var(--gold)]">×</div>
            <div className="text-center">
              <div className="text-2xl font-display font-bold mb-2">Weight<sub>i</sub></div>
              <div className="text-sm text-[var(--text-dark-secondary)]">Domain Weight</div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-[rgba(26,27,31,0.18)] text-center">
            <p className="text-sm text-[var(--text-dark-secondary)]">
              Each domain score is normalized against the contemporary maximum, ensuring fair comparison across eras.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
