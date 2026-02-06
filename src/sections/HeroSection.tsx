import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calculator, BookOpen, RotateCcw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_WEIGHTS = {
  military: 25,
  economic: 20,
  territorial: 15
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
  const [ppiScore, setPpiScore] = useState(72.5);

  // Calculate PPI based on weights
  useEffect(() => {
    const total = weights.military + weights.economic + weights.territorial;
    const normalized = {
      military: (weights.military / total) * 60,
      economic: (weights.economic / total) * 60,
      territorial: (weights.territorial / total) * 60
    };
    // Simulate a base score with some variation
    const baseScore = 45;
    const variation = Math.random() * 10 - 5;
    setPpiScore(Number((baseScore + normalized.military * 0.4 + normalized.economic * 0.35 + normalized.territorial * 0.25 + variation).toFixed(2)));
  }, [weights]);

  // Auto-play entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      
      tl.fromTo(bgRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.8 }
      )
      .fromTo(headlineRef.current?.querySelectorAll('.animate-item') || [],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
        '-=0.4'
      )
      .fromTo(widgetRef.current,
        { x: '10vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, duration: 0.8 },
        '-=0.5'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
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
            // Reset elements when scrolling back to top
            gsap.set(headlineRef.current?.querySelectorAll('.animate-item') || [], { x: 0, opacity: 1 });
            gsap.set(widgetRef.current, { x: 0, opacity: 1 });
            gsap.set(bgRef.current, { scale: 1, y: 0 });
          }
        }
      });

      // ENTRANCE (0-30%): Hold at visible state
      // SETTLE (30-70%): Static
      // EXIT (70-100%): Animate out
      scrollTl
        .fromTo(headlineRef.current?.querySelectorAll('.animate-item') || [],
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(widgetRef.current,
          { x: 0, opacity: 1 },
          { x: '12vw', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(bgRef.current,
          { scale: 1, y: 0 },
          { scale: 1.06, y: '-3vh' },
          0.70
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleReset = () => {
    setWeights(DEFAULT_WEIGHTS);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="section-pinned z-10">
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img 
          src="/hero_map.jpg" 
          alt="Historical Map" 
          className="w-full h-full object-cover"
        />
        <div className="dark-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-[7vw] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-0">
          
          {/* Headline Block */}
          <div ref={headlineRef} className="w-full lg:w-[46vw] pt-[10vh] lg:pt-0">
            <h1 className="animate-item text-h1 font-display font-bold text-[var(--cream)] text-shadow mb-6">
              Measure power across centuries.
            </h1>
            <p className="animate-item text-body text-[var(--text-secondary)] mb-8 max-w-xl">
              An open index to compare military, economic, and territorial strength—normalized for every era.
            </p>
            <div className="animate-item flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('calculator')}
                className="btn-primary flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Open the Calculator
              </button>
              <button 
                onClick={() => scrollToSection('methodology')}
                className="btn-outline-light flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Read the methodology
              </button>
            </div>
          </div>

          {/* Widget Card */}
          <div 
            ref={widgetRef}
            className="glass-card p-6 lg:p-8 w-full lg:w-[34vw] lg:min-w-[320px] lg:max-w-[520px]"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-micro uppercase text-[var(--gold)] tracking-[0.08em]">
                PPI Score Explorer
              </span>
              <button 
                onClick={handleReset}
                className="text-[var(--text-secondary)] hover:text-[var(--cream)] transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-center mb-6">
              <span className="text-6xl lg:text-7xl font-display font-bold text-[var(--gold)]">
                {ppiScore.toFixed(2)}
              </span>
            </div>
            
            <p className="text-sm text-[var(--text-secondary)] mb-6 text-center">
              Adjust the sliders to see how domain weights change a composite score.
            </p>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-mono text-xs uppercase text-[var(--cream)]">Military</span>
                  <span className="font-mono text-xs text-[var(--gold)]">{weights.military}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={weights.military}
                  onChange={(e) => setWeights({ ...weights, military: Number(e.target.value) })}
                  className="custom-slider"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-mono text-xs uppercase text-[var(--cream)]">Economic</span>
                  <span className="font-mono text-xs text-[var(--gold)]">{weights.economic}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={weights.economic}
                  onChange={(e) => setWeights({ ...weights, economic: Number(e.target.value) })}
                  className="custom-slider"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-mono text-xs uppercase text-[var(--cream)]">Territorial</span>
                  <span className="font-mono text-xs text-[var(--gold)]">{weights.territorial}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={weights.territorial}
                  onChange={(e) => setWeights({ ...weights, territorial: Number(e.target.value) })}
                  className="custom-slider"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
