import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calculator, BookOpen, Database, FileText, Download, Scale, Mail, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Methodology', href: '#methodology', icon: BookOpen },
  { label: 'Calculator', href: '#calculator', icon: Calculator },
  { label: 'Data Sources', href: '#data', icon: Database },
  { label: 'Historical Depth', href: '#historical-depth', icon: Scale },
  { label: 'Analysis', href: '#analysis', icon: BarChart3 },
  { label: 'Download', href: '#download', icon: Download },
  { label: 'Paper', href: '#paper', icon: FileText },
  { label: 'Contact', href: 'mailto:ppi@research.edu', icon: Mail }
];

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ctaRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const links = linksRef.current?.querySelectorAll('.footer-link');
      links?.forEach((link, index) => {
        gsap.fromTo(link,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: linksRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href.startsWith('mailto:')) {
      window.location.href = href;
    }
  };

  return (
    <footer 
      ref={sectionRef}
      className="relative bg-[var(--charcoal)] py-[10vh]"
    >
      <div className="px-[7vw]">
        {/* CTA */}
        <div ref={ctaRef} className="text-center mb-12">
          <h2 className="text-h2 font-display font-bold text-[var(--cream)] mb-4">
            Start measuring
          </h2>
          <p className="text-body text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
            Use the calculator. Explore the data. Read the analysis. Download the desktop app. Cite the paper.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => scrollToSection('#calculator')}
              className="btn-primary flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Open Calculator
            </button>
            <button 
              onClick={() => scrollToSection('#analysis')}
              className="btn-outline flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              View Analysis
            </button>
            <button 
              onClick={() => scrollToSection('#download')}
              className="btn-outline flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download App
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(244,241,234,0.14)] my-10" />

        {/* Navigation */}
        <div ref={linksRef} className="flex flex-wrap items-center justify-center gap-6 mb-8">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="footer-link flex items-center gap-2 font-mono text-sm text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors"
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-mono text-xs text-[var(--text-secondary)]">
            © 2026 PPI Calculator. Released for academic and educational use.
          </p>
        </div>
      </div>
    </footer>
  );
}
