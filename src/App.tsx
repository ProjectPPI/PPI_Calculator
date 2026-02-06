import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from '@/components/Navigation';
import HeroSection from '@/sections/HeroSection';
import WhatIsPPISection from '@/sections/WhatIsPPISection';
import MethodologySection from '@/sections/MethodologySection';
import DomainsSection from '@/sections/DomainsSection';
import CalculatorSection from '@/sections/CalculatorSection';
import CaseStudiesSection from '@/sections/CaseStudiesSection';
import DataSourcesSection from '@/sections/DataSourcesSection';
import HistoricalDepthSection from '@/sections/HistoricalDepthSection';
import AnalysisSection from '@/sections/AnalysisSection';
import DownloadSection from '@/sections/DownloadSection';
import DocumentationSection from '@/sections/DocumentationSection';
import ResearchPaperSection from '@/sections/ResearchPaperSection';
import FooterSection from '@/sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Global scroll snap for pinned sections
  useEffect(() => {
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out'
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        <HeroSection />
        <WhatIsPPISection />
        <MethodologySection />
        <DomainsSection />
        <CalculatorSection />
        <CaseStudiesSection />
        <DataSourcesSection />
        <HistoricalDepthSection />
        <AnalysisSection />
        <DownloadSection />
        <DocumentationSection />
        <ResearchPaperSection />
        <FooterSection />
      </main>
    </div>
  );
}

export default App;
