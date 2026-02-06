import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RotateCcw, Info, BarChart3 } from 'lucide-react';
import { DOMAINS } from '@/types/ppi';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

gsap.registerPlugin(ScrollTrigger);

// Default domain scores for a sample empire (Roman Empire at peak)
// These are normalized 0-1 scores representing performance within era
const DEFAULT_DOMAIN_SCORES: Record<string, number> = {
  "Military Power": 0.88,      // Strong military
  "Economic Power": 0.82,      // Robust economy
  "Territorial Control": 0.92, // Vast territories
  "Demographics": 0.75,        // Large population
  "Administrative Capacity": 0.90, // Excellent bureaucracy
  "Technology & Science": 0.70, // Good for era
  "Cultural Influence": 0.85,  // Latin, law, culture
  "Diplomacy & Hegemony": 0.78, // Client states
  "Internal Stability": 0.72   // Generally stable
};

const DEFAULT_WEIGHTS: Record<string, number> = {
  "Military Power": 25,
  "Economic Power": 20,
  "Territorial Control": 15,
  "Demographics": 10,
  "Administrative Capacity": 10,
  "Technology & Science": 10,
  "Cultural Influence": 5,
  "Diplomacy & Hegemony": 5,
  "Internal Stability": 5
};

export default function CalculatorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  const [weights, setWeights] = useState<Record<string, number>>(DEFAULT_WEIGHTS);
  const [domainScores] = useState<Record<string, number>>(DEFAULT_DOMAIN_SCORES);
  
  const domainNames = Object.keys(DOMAINS);

  // Calculate PPI - FIXED FORMULA
  // PPI = Σ(domain_score × weight) where weights sum to 100
  // This means if all weights are low, the score will be low
  const calculatePPI = () => {
    let totalWeight = 0;
    let weightedSum = 0;
    
    domainNames.forEach(domain => {
      const weight = weights[domain];
      totalWeight += weight;
      weightedSum += weight * domainScores[domain];
    });
    
    // The PPI is the weighted average, scaled by total weight/100
    // This means if total weight is 50, max possible score is 50
    // This correctly shows that lower weights = lower importance = lower potential score
    return totalWeight > 0 ? weightedSum : 0;
  };

  const ppiScore = calculatePPI();
  const totalWeight = domainNames.reduce((sum, d) => sum + weights[d], 0);
  const maxPossibleScore = totalWeight; // When all domain scores are 1.0

  // Calculate contribution breakdown for visualization
  const getContributionBreakdown = () => {
    return domainNames.map(domain => ({
      domain,
      contribution: weights[domain] * domainScores[domain],
      percentage: totalWeight > 0 ? ((weights[domain] * domainScores[domain]) / ppiScore) * 100 : 0
    })).sort((a, b) => b.contribution - a.contribution);
  };

  const handleWeightChange = (domain: string, value: number) => {
    setWeights(prev => ({ ...prev, [domain]: value }));
  };

  const handleReset = () => {
    setWeights(DEFAULT_WEIGHTS);
  };

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
            gsap.set(headlineRef.current, { y: 0, opacity: 1 });
            gsap.set(calculatorRef.current, { y: 0, opacity: 1, scale: 1 });
            gsap.set(bgRef.current, { scale: 1, y: 0 });
          }
        }
      });

      scrollTl
        .fromTo(headlineRef.current,
          { y: '40vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(calculatorRef.current,
          { x: '55vw', opacity: 0, scale: 0.96 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0
        )
        .fromTo(bgRef.current,
          { scale: 1.05, y: '2vh' },
          { scale: 1, y: 0, ease: 'none' },
          0
        );

      scrollTl
        .fromTo(headlineRef.current,
          { y: 0, opacity: 1 },
          { y: '-18vh', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(calculatorRef.current,
          { y: 0, opacity: 1 },
          { y: '18vh', opacity: 0, ease: 'power2.in' },
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

  const breakdown = getContributionBreakdown();

  return (
    <section ref={sectionRef} id="calculator" className="section-pinned z-40">
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="/architecture_facade.jpg" 
          alt="Classical Architecture" 
          className="w-full h-full object-cover"
        />
        <div className="dark-overlay" style={{ background: 'rgba(14,15,18,0.60)' }} />
      </div>

      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-[7vw] flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-0">
          
          {/* Headline Block - ENHANCED with explanation */}
          <div ref={headlineRef} className="w-full lg:w-[36vw] pt-[10vh] lg:pt-0">
            <h2 className="text-h2 font-display font-bold text-[var(--cream)] text-shadow mb-4">
              Build a score
            </h2>
            <p className="text-body text-[var(--text-secondary)] mb-6">
              Adjust domain weights to see how different priorities affect the composite score.
            </p>
            
            {/* Formula Explanation */}
            <div className="glass-card p-4 mb-4">
              <h4 className="font-mono text-micro uppercase text-[var(--gold)] tracking-[0.08em] mb-2">
                How it works
              </h4>
              <p className="text-sm text-[var(--text-secondary)] mb-2">
                <span className="text-[var(--cream)] font-semibold">PPI = Σ(Domain Score × Weight)</span>
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                Each domain has a performance score (0-1). Multiply by its weight and sum all contributions. 
                <span className="text-[var(--gold)]"> Lower weights mean less contribution to the total.</span>
              </p>
            </div>

            {/* Current Stats */}
            <div className="flex gap-4">
              <div className="glass-card px-4 py-2">
                <span className="font-mono text-micro uppercase text-[var(--text-secondary)]">Total Weight</span>
                <div className="text-xl font-display font-bold text-[var(--gold)]">{totalWeight}%</div>
              </div>
              <div className="glass-card px-4 py-2">
                <span className="font-mono text-micro uppercase text-[var(--text-secondary)]">Max Possible</span>
                <div className="text-xl font-display font-bold text-[var(--cream)]">{maxPossibleScore.toFixed(1)}</div>
              </div>
            </div>
          </div>

          {/* Calculator Card - ENHANCED */}
          <div 
            ref={calculatorRef}
            className="glass-card p-6 lg:p-8 w-full lg:w-[46vw] lg:max-w-[700px] max-h-[85vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-micro uppercase text-[var(--gold)] tracking-[0.08em]">
                Calculator
              </span>
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--cream)] transition-colors text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            {/* Sliders */}
            <TooltipProvider>
              <div className="space-y-3 mb-6">
                {domainNames.map((domain) => {
                  const domainData = DOMAINS[domain];
                  const contribution = weights[domain] * domainScores[domain];
                  return (
                    <div key={domain} className="group">
                      <div className="flex items-center gap-4">
                        <div className="w-28 lg:w-32 flex items-center gap-1">
                          <span className="font-mono text-xs text-[var(--cream)] truncate">
                            {domainData.short}
                          </span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="text-[var(--text-secondary)] hover:text-[var(--cream)]">
                                <Info className="w-3 h-3" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent 
                              side="left" 
                              className="max-w-xs bg-[var(--charcoal)] border-[rgba(244,241,234,0.14)]"
                            >
                              <p className="text-xs text-[var(--cream)] font-semibold">{domain}</p>
                              <p className="text-xs text-[var(--text-secondary)] mt-1">
                                Score: {(domainScores[domain] * 100).toFixed(0)}% performance
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="50"
                          value={weights[domain]}
                          onChange={(e) => handleWeightChange(domain, Number(e.target.value))}
                          className="custom-slider flex-1"
                        />
                        <div className="w-20 text-right">
                          <span className="font-mono text-xs text-[var(--gold)]">{weights[domain]}%</span>
                          <span className="font-mono text-[10px] text-[var(--text-secondary)] block">
                            +{contribution.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      {/* Mini contribution bar */}
                      <div className="ml-28 lg:ml-32 mt-1 h-1 bg-[rgba(244,241,234,0.1)] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[var(--gold)] transition-all duration-200"
                          style={{ width: `${(contribution / 25) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </TooltipProvider>

            {/* Result Section - ENHANCED */}
            <div className="pt-6 border-t border-[rgba(244,241,234,0.14)]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-micro uppercase text-[var(--text-secondary)] tracking-[0.08em]">
                  Composite Score
                </span>
                <span className="font-mono text-xs text-[var(--text-secondary)]">
                  of {maxPossibleScore.toFixed(1)} possible
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-6xl lg:text-7xl font-display font-bold text-[var(--gold)]">
                  {ppiScore.toFixed(1)}
                </span>
                <span className="text-2xl font-display text-[var(--text-secondary)]">
                  / 100
                </span>
              </div>
              
              {/* Efficiency indicator */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--text-secondary)]">Efficiency</span>
                  <span className="text-[var(--gold)]">
                    {totalWeight > 0 ? ((ppiScore / totalWeight) * 100).toFixed(0) : 0}% of potential
                  </span>
                </div>
                <div className="h-2 bg-[rgba(244,241,234,0.1)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] transition-all duration-300"
                    style={{ width: `${totalWeight > 0 ? (ppiScore / totalWeight) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Contribution Breakdown */}
              <div className="mt-4 pt-4 border-t border-[rgba(244,241,234,0.1)]">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-4 h-4 text-[var(--gold)]" />
                  <span className="font-mono text-micro uppercase text-[var(--text-secondary)]">
                    Top Contributors
                  </span>
                </div>
                <div className="space-y-1">
                  {breakdown.slice(0, 3).map((item, i) => (
                    <div key={item.domain} className="flex items-center justify-between text-xs">
                      <span className="text-[var(--text-secondary)]">
                        {i + 1}. {DOMAINS[item.domain].short}
                      </span>
                      <span className="text-[var(--cream)]">
                        +{item.contribution.toFixed(1)} ({item.percentage.toFixed(0)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
