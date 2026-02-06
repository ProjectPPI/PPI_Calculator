import { useEffect, useState } from 'react';
import { Menu, X, Download, FileText } from 'lucide-react';

const navItems = [
  { label: 'Methodology', href: '#methodology' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Data', href: '#data' },
  { label: 'Depth', href: '#historical-depth' },
  { label: 'Analysis', href: '#analysis' },
  { label: 'Download', href: '#download' },
  { label: 'Paper', href: '#paper' }
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled 
            ? 'bg-[rgba(14,15,18,0.95)] backdrop-blur-md border-b border-[rgba(244,241,234,0.1)]' 
            : 'bg-transparent'
        }`}
      >
        <div className="px-[7vw] py-4 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display font-bold text-base text-[var(--cream)] hover:text-[var(--gold)] transition-colors"
          >
            PPI Calculator
          </button>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="font-mono text-micro uppercase text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors tracking-[0.08em]"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => scrollToSection('#analysis')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--gold)] text-[var(--gold)] hover:bg-[rgba(201,168,106,0.1)] transition-colors text-sm font-mono"
            >
              <FileText className="w-4 h-4" />
              Analysis
            </button>
            <button
              onClick={() => scrollToSection('#download')}
              className="flex items-center gap-2 btn-primary text-sm py-2 px-4"
            >
              <Download className="w-4 h-4" />
              Get App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-[var(--cream)]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-[99] bg-[var(--charcoal)] transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="font-display text-2xl text-[var(--cream)] hover:text-[var(--gold)] transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={() => scrollToSection('#analysis')}
              className="btn-outline flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              View Analysis
            </button>
            <button
              onClick={() => scrollToSection('#download')}
              className="btn-primary flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download App
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
