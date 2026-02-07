import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhatIsPPISection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
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
            gsap.set(contentRef.current?.querySelectorAll('.animate-item') || [], { y: 0, opacity: 1 });
            gsap.set(bgRef.current, { scale: 1, y: 0, x: 0 });
          }
        }
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(contentRef.current?.querySelectorAll('.animate-item') || [],
          { y: '60vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0
        )
        .fromTo(bgRef.current,
          { scale: 1.08, y: '4vh' },
          { scale: 1, y: 0, ease: 'none' },
          0
        );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(contentRef.current?.querySelectorAll('.animate-item') || [],
          { y: 0, opacity: 1 },
          { y: '-22vh', opacity: 0, ease: 'power2.in' },
          0.70
        )
        .fromTo(bgRef.current,
          { scale: 1, x: 0 },
          { scale: 1.05, x: '-3vw' },
          0.70
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-20">
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="/PPI_Calculator/interior_architecture.jpg" 
          alt="Classical Interior" 
          className="w-full h-full object-cover"
        />
        <div className="dark-overlay" style={{ background: 'rgba(14,15,18,0.55)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div 
          ref={contentRef}
          className="text-center px-[7vw] max-w-[980px]"
        >
          <h2 className="animate-item text-h2 font-display font-bold text-[var(--cream)] text-shadow mb-8">
            PPI is a composite index.
          </h2>
          <p className="animate-item text-lg lg:text-xl text-[var(--text-secondary)] leading-relaxed mb-8 max-w-3xl mx-auto">
            It combines military, economic, territorial, demographic, and institutional indicators into a single score—normalized within each era so you compare peers, not millennia.
          </p>
          <span className="animate-item inline-block font-mono text-micro uppercase text-[var(--gold)] tracking-[0.08em]">
            Built for historians, strategists, and developers.
          </span>
        </div>
      </div>
    </section>
  );
}
