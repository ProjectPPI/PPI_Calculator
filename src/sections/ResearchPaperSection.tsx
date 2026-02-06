import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Quote, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const authors = [
  { name: 'Dr. Sarah M. Richardson', affiliation: 'Stanford University' },
  { name: 'Prof. Michael Chen', affiliation: 'University of Oxford' },
  { name: 'Dr. Elena Volkov', affiliation: 'Moscow State University' },
  { name: 'Dr. James K. Pemberton', affiliation: 'Yale University' }
];

export default function ResearchPaperSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const citationRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

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
            gsap.set(citationRef.current, { x: 0, opacity: 1 });
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
        .fromTo(citationRef.current,
          { x: '50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(bgRef.current,
          { scale: 1.06, y: '3vh' },
          { scale: 1, y: 0, ease: 'none' },
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
        .fromTo(citationRef.current,
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

  const handleDownload = () => {
    alert('Downloading research paper...\n\nIn production, this would download the actual PDF file.');
  };

  return (
    <section ref={sectionRef} id="paper" className="section-pinned z-[70]">
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="/research_paper_bg.jpg" 
          alt="Research Materials" 
          className="w-full h-full object-cover"
        />
        <div className="dark-overlay" style={{ background: 'rgba(14,15,18,0.58)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-[7vw] flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-0">
          
          {/* Headline Block */}
          <div ref={headlineRef} className="w-full lg:w-[38vw] pt-[10vh] lg:pt-0">
            <h2 className="text-h2 font-display font-bold text-[var(--cream)] text-shadow mb-4">
              Read the paper
            </h2>
            <p className="text-body text-[var(--text-secondary)] mb-8">
              A quantitative framework for measuring historical state power across military, economic, and institutional domains.
            </p>
            
            <button 
              onClick={handleDownload}
              className="btn-outline flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>

            {/* Authors */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-[var(--gold)]" />
                <span className="font-mono text-micro uppercase text-[var(--gold)] tracking-[0.08em]">
                  Authors
                </span>
              </div>
              <div className="space-y-2">
                {authors.map((author) => (
                  <div key={author.name} className="text-sm">
                    <span className="text-[var(--cream)]">{author.name}</span>
                    <span className="text-[var(--text-secondary)] ml-2">• {author.affiliation}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Citation Card */}
          <div 
            ref={citationRef}
            className="glass-card p-6 lg:p-8 w-full lg:w-[38vw] lg:max-w-[520px]"
          >
            <div className="flex items-center gap-2 mb-6">
              <Quote className="w-4 h-4 text-[var(--gold)]" />
              <span className="font-mono text-micro uppercase text-[var(--gold)] tracking-[0.08em]">
                Citation
              </span>
            </div>
            
            <div className="space-y-4">
              <p className="text-[var(--cream)] leading-relaxed">
                <span className="font-display font-semibold">
                  Richardson, S.M.; Chen, M.; Volkov, E.; Pemberton, J.K.
                </span>
              </p>
              <p className="text-[var(--text-secondary)] italic">
                "A Quantitative Framework for Measuring Historical State Power: The Proportional Power Index (PPI)."
              </p>
              <p className="font-mono text-sm text-[var(--text-secondary)]">
                February 2026
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-[rgba(244,241,234,0.14)]">
              <h4 className="font-mono text-micro uppercase text-[var(--gold)] tracking-[0.08em] mb-4">
                Abstract
              </h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                This paper presents the Proportional Power Index (PPI), a comprehensive multi-domain quantitative framework for measuring and comparing state power across historical periods. Building on established datasets including the Correlates of War National Material Capabilities, Maddison Project historical GDP estimates, and the HYDE population database, the PPI integrates eight weighted domains with robust statistical techniques including 97.5th percentile outlier capping and optional logarithmic scaling.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-[rgba(244,241,234,0.14)]">
              <h4 className="font-mono text-micro uppercase text-[var(--gold)] tracking-[0.08em] mb-4">
                Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Historical power measurement', 'Quantitative history', 'Composite indices', 'International relations', 'State capacity', 'Comparative empires'].map((keyword) => (
                  <span 
                    key={keyword}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-[rgba(201,168,106,0.15)] text-[var(--gold)]"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
