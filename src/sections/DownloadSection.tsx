import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Monitor, FileText, BookOpen, Cpu, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Multi-state comparison with unlimited entries',
  'Real-time radar and bar chart visualizations',
  'JSON save/load for data persistence',
  'CSV export for publication-ready tables',
  'Sensitivity analysis tools',
  '97.5th percentile outlier capping',
  'Optional log-scaling for skewed distributions'
];

export default function DownloadSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.download-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: index * 0.15,
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

  const handleExeDownload = () => {
    // ============================================
    // PLACE YOUR EXE FILE HERE:
    // 1. Copy your PPI-calc.exe file to the /public folder
    // 2. Update the path below to match your filename
    // 3. The file will be available for download
    // ============================================
    const exeFilePath = '/PPI-calc.exe'; // <-- CHANGE THIS TO YOUR EXE FILENAME
    
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = exeFilePath;
    link.download = 'PPI-Calculator.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Note: If the file doesn't exist, this will show a 404 error
    // Make sure to place your EXE in the public folder before deployment
  };

  const handlePdfDownload = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      ref={sectionRef}
      id="download"
      className="relative bg-[var(--charcoal)] py-[10vh]"
    >
      <div className="px-[7vw]">
        {/* Header */}
        <div ref={contentRef} className="text-center mb-[8vh]">
          <h2 className="text-h2 font-display font-bold text-[var(--cream)] mb-4">
            Download the Tools
          </h2>
          <p className="text-body text-[var(--text-secondary)] max-w-2xl mx-auto">
            Get the full desktop application with advanced features, or access the documentation for detailed methodology and data entry instructions.
          </p>
        </div>

        {/* Download Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* EXE Download Card - MAIN FEATURE */}
          <div className="download-card lg:col-span-2 glass-card p-8 relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold)] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-[var(--gold)]">
                  <Monitor className="w-6 h-6 text-[var(--charcoal)]" />
                </div>
                <div>
                  <h3 className="text-h3 font-display font-semibold text-[var(--cream)]">
                    PPI Calculator Desktop
                  </h3>
                  <p className="font-mono text-micro uppercase text-[var(--gold)] tracking-[0.08em]">
                    Windows Application
                  </p>
                </div>
              </div>

              <p className="text-body text-[var(--text-secondary)] mb-6">
                The full-featured desktop application with advanced visualization, data persistence, and export capabilities. No installation required—just download and run.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--gold)] flex-shrink-0" />
                    <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Download Button */}
              <button 
                onClick={handleExeDownload}
                className="btn-primary flex items-center gap-3 text-base"
              >
                <Download className="w-5 h-5" />
                Download for Windows
              </button>

              {/* Instructions for developer */}
              <div className="mt-6 p-4 rounded-lg bg-[rgba(201,168,106,0.1)] border border-[rgba(201,168,106,0.2)]">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-[var(--gold)]" />
                  <span className="font-mono text-micro uppercase text-[var(--gold)]">
                    Developer Note
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  To enable downloads, place your <code className="text-[var(--cream)] bg-[rgba(0,0,0,0.3)] px-1 rounded">PPI-calc.exe</code> file in the <code className="text-[var(--cream)] bg-[rgba(0,0,0,0.3)] px-1 rounded">/public</code> folder and update the filename in the component code.
                </p>
              </div>
            </div>
          </div>

          {/* PDF Downloads Column */}
          <div className="space-y-6">
            {/* Data Entry Guide */}
            <div className="download-card glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[rgba(201,168,106,0.15)]">
                  <FileText className="w-5 h-5 text-[var(--gold)]" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-[var(--cream)]">
                    Data Entry Guide
                  </h4>
                  <p className="font-mono text-[10px] uppercase text-[var(--text-secondary)]">
                    PDF • 16 pages
                  </p>
                </div>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Complete field definitions, unit specifications, and best practices for each domain.
              </p>
              <button 
                onClick={() => handlePdfDownload('PPI_Data_Entry_Guide.pdf')}
                className="btn-outline w-full flex items-center justify-center gap-2 text-sm py-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>

            {/* User Guide */}
            <div className="download-card glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[rgba(201,168,106,0.15)]">
                  <BookOpen className="w-5 h-5 text-[var(--gold)]" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-[var(--cream)]">
                    User Guide
                  </h4>
                  <p className="font-mono text-[10px] uppercase text-[var(--text-secondary)]">
                    PDF • 12 pages
                  </p>
                </div>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Step-by-step tutorial covering workflow, visualizations, and troubleshooting.
              </p>
              <button 
                onClick={() => handlePdfDownload('README_PPI-Calculator.pdf')}
                className="btn-outline w-full flex items-center justify-center gap-2 text-sm py-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>

            {/* Research Paper */}
            <div className="download-card glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[rgba(201,168,106,0.15)]">
                  <FileText className="w-5 h-5 text-[var(--gold)]" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-[var(--cream)]">
                    Research Paper
                  </h4>
                  <p className="font-mono text-[10px] uppercase text-[var(--text-secondary)]">
                    PDF • Academic
                  </p>
                </div>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Full academic methodology with validation, sensitivity analysis, and citations.
              </p>
              <button 
                onClick={() => handlePdfDownload('A Quantitative Framework for Measuring Historical State.pdf')}
                className="btn-outline w-full flex items-center justify-center gap-2 text-sm py-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* System Requirements */}
        <div className="mt-10 max-w-6xl mx-auto">
          <div className="glass-card p-6">
            <h4 className="font-mono text-micro uppercase text-[var(--gold)] tracking-[0.08em] mb-4">
              System Requirements
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <h5 className="font-display font-semibold text-[var(--cream)] mb-2">Windows</h5>
                <p className="text-sm text-[var(--text-secondary)]">Windows 10 or higher</p>
              </div>
              <div>
                <h5 className="font-display font-semibold text-[var(--cream)] mb-2">macOS</h5>
                <p className="text-sm text-[var(--text-secondary)]">macOS 10.14 or higher</p>
              </div>
              <div>
                <h5 className="font-display font-semibold text-[var(--cream)] mb-2">Linux</h5>
                <p className="text-sm text-[var(--text-secondary)]">Ubuntu 20.04 or equivalent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
