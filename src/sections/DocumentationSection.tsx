import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, BookOpen, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const documents = [
  {
    title: 'Data Entry Guide',
    description: 'Complete instructions for entering historical state data. Includes field definitions, unit specifications, and best practices for each of the 8 domains.',
    icon: FileText,
    filename: 'PPI_Data_Entry_Guide.pdf',
    size: 'PDF • 16 pages'
  },
  {
    title: 'User Guide',
    description: 'Step-by-step tutorial for using the PPI Calculator. Covers workflow, visualization features, and troubleshooting common issues.',
    icon: BookOpen,
    filename: 'README_PPI-Calculator.pdf',
    size: 'PDF • 12 pages'
  }
];

export default function DocumentationSection() {
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
            gsap.set(bgRef.current, { scale: 1 });
          }
        }
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(contentRef.current?.querySelectorAll('.animate-item') || [],
          { y: '50vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
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
        .fromTo(contentRef.current?.querySelectorAll('.animate-item') || [],
          { y: 0, opacity: 1 },
          { y: '-18vh', opacity: 0, ease: 'power2.in' },
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

  const handleDownload = (filename: string) => {
    // In a real deployment, these would be actual PDF files
    // For now, we'll show an alert
    alert(`Downloading ${filename}...\n\nIn production, this would download the actual PDF file.`);
  };

  return (
    <section ref={sectionRef} className="section-pinned z-[60]">
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="/PPI_Calculator/architecture_doorway.jpg" 
          alt="Archive Doorway" 
          className="w-full h-full object-cover"
        />
        <div className="dark-overlay" style={{ background: 'rgba(14,15,18,0.60)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div 
          ref={contentRef}
          className="text-center px-[7vw] max-w-[920px]"
        >
          <h2 className="animate-item text-h2 font-display font-bold text-[var(--cream)] text-shadow mb-4">
            Download the guide
          </h2>
          <p className="animate-item text-lg text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
            Get the full methodology, data entry instructions, and citation format.
          </p>
          
          <div className="animate-item flex flex-col sm:flex-row items-center justify-center gap-4">
            {documents.map((doc) => {
              const Icon = doc.icon;
              return (
                <button
                  key={doc.title}
                  onClick={() => handleDownload(doc.filename)}
                  className="btn-outline flex items-center gap-3 w-full sm:w-auto justify-center"
                >
                  <Icon className="w-5 h-5" />
                  <span>{doc.title}</span>
                  <Download className="w-4 h-4" />
                </button>
              );
            })}
          </div>

          {/* Document Preview Cards */}
          <div className="animate-item grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {documents.map((doc) => {
              const Icon = doc.icon;
              return (
                <div 
                  key={doc.title}
                  className="glass-card p-6 text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[rgba(201,168,106,0.15)]">
                      <Icon className="w-6 h-6 text-[var(--gold)]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display font-semibold text-[var(--cream)] mb-1">
                        {doc.title}
                      </h4>
                      <p className="font-mono text-micro uppercase text-[var(--text-secondary)] mb-2">
                        {doc.size}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
