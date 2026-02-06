import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  Calculator, 
  TrendingUp, 
  Database,
  ChevronDown,
  FileText,
  BarChart3,
  AlertCircle
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const edgeCases = [
  {
    scenario: "All Indicators = 0 (Minimum)",
    input: "Every single indicator set to 0",
    result: "PPI = 0.000000",
    status: "correct",
    analysis: "The formula correctly handles the absolute minimum. All normalized values are 0, all domain scores are 0, total PPI is 0. No division-by-zero errors or undefined behavior."
  },
  {
    scenario: "All Indicators = Maximum (Same Value)",
    input: "Every indicator set to 1000 (same value, treated as maximum)",
    result: "PPI = 1.000000",
    status: "correct",
    analysis: "When all indicators are at the maximum, each normalized value = 1.0. Since sub-indicator weights sum to 1.0 within each domain, each domain score = 1.0. Since domain weights sum to 1.0, total PPI = 1.0. This is the theoretical maximum."
  },
  {
    scenario: "Proportional Scaling (Multiple States)",
    input: "Three states with values in ratio 1:10:100 (Weak=10, Medium=100, Strong=1000)",
    result: "Weak: 0.010, Medium: 0.100, Strong: 1.000",
    status: "correct",
    analysis: "The formula maintains perfect proportionality. A state with 10× the indicators has exactly 10× the PPI. This is expected behavior for a linear aggregation formula."
  }
];

const strengths = [
  {
    title: "Transparent and Interpretable",
    description: "Linear weighted sum is easy to understand and explain. Users can see exactly how each indicator contributes to the final score."
  },
  {
    title: "Era-Relative Normalization",
    description: "Allows fair comparison across different time periods. A Roman legion is scored against other ancient militaries, not modern armies."
  },
  {
    title: "Mathematically Sound",
    description: "Weights properly sum to 1.0 at both levels. No undefined behavior, no division-by-zero errors at edge cases."
  },
  {
    title: "Multi-Dimensional",
    description: "Captures diverse aspects of state power beyond just military or economic metrics. Eight domains provide comprehensive coverage."
  },
  {
    title: "Handles Outliers",
    description: "Optional percentile capping (97.5th) prevents single extreme values from dominating the entire calculation."
  },
  {
    title: "Log Scaling Option",
    description: "Can apply logarithmic transformation for highly skewed indicators (population, GDP) to prevent compression of smaller values."
  }
];

const limitations = [
  {
    title: "Perfect Substitutability Problem",
    description: "Formula assumes weak military can be fully offset by strong economy. Reality: Some capabilities are non-substitutable (can't buy your way out of invasion with GDP alone).",
    impact: "May overrate economically strong but militarily weak states in conflict scenarios."
  },
  {
    title: "Linear Aggregation Assumption",
    description: "Assumes doubling GDP exactly doubles economic power contribution. Reality: Diminishing returns or increasing returns may apply.",
    impact: "May mis-scale very large or very small states."
  },
  {
    title: "Fixed Weights Across Contexts",
    description: "Same 25% military weight whether it's peacetime or total war. Same 5% cultural weight whether analyzing ancient Rome or modern soft power.",
    impact: "Context-blind scoring may not reflect actual influence in specific scenarios."
  },
  {
    title: "Normalization by Maximum (Outlier Sensitivity)",
    description: "If one state has 10× everyone else's GDP, all others score very low on that indicator. A single outlier sets the scale for the entire era.",
    impact: "Scores are dataset-dependent; adding/removing one state changes everyone's scores."
  },
  {
    title: "No Interaction Effects",
    description: "Military technology and manpower treated independently. Reality: Tech enables force multiplication (tanks × trained crews ≫ either alone).",
    impact: "Misses synergies between indicators."
  },
  {
    title: "Data Quality Dependency",
    description: "Historical estimates are often uncertain or unavailable. Formula assumes perfect data; garbage in = garbage out.",
    impact: "Results only as good as inputs (especially for ancient/medieval periods)."
  }
];

const formulaStructure = `
Total PPI = Σ(Domain_Score × Domain_Weight)

Where each Domain Score is:
Domain_Score = Σ(Normalized_Sub_Indicator × Sub_Indicator_Weight)

Normalization:
Normalized_Value = min(raw_value, percentile_cap) / percentile_cap

With optional log scaling:
Normalized_Value = log(1 + min(raw_value, cap)) / log(1 + cap)
`;

export default function AnalysisSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>("formula");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <section 
      ref={sectionRef}
      id="analysis"
      className="relative bg-[var(--charcoal)] py-[10vh]"
    >
      <div className="px-[7vw]">
        {/* Header */}
        <div ref={headerRef} className="max-w-4xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-[var(--gold)]" />
            <span className="font-mono text-micro uppercase text-[var(--gold)] tracking-[0.08em]">
              Technical Analysis
            </span>
          </div>
          <h2 className="text-h2 font-display font-bold text-[var(--cream)] mb-4">
            Formula Analysis & Validation
          </h2>
          <p className="text-body text-[var(--text-secondary)]">
            A comprehensive technical assessment of the PPI calculation methodology, 
            edge case testing, and realism evaluation for academic rigor.
          </p>
        </div>

        {/* Executive Summary */}
        <div className="glass-card p-8 mb-10 max-w-5xl">
          <h3 className="text-h3 font-display font-semibold text-[var(--cream)] mb-6">
            Executive Summary
          </h3>
          <p className="text-body text-[var(--text-secondary)] mb-6">
            The PPI calculator is a <span className="text-[var(--cream)] font-semibold">multi-domain state power assessment tool</span> that computes 
            a weighted composite index across 8 domains and 38 sub-indicators. The code is mathematically 
            sound and produces consistent results at edge cases.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(34,197,94,0.15)]">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-400">Formula is realistic for historical comparison</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(34,197,94,0.15)]">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-400">Code produces good results at extremes</span>
            </div>
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="space-y-4 max-w-5xl">
          
          {/* Formula Structure */}
          <div className="glass-card overflow-hidden">
            <button
              onClick={() => toggleSection("formula")}
              className="w-full p-6 flex items-center justify-between hover:bg-[rgba(244,241,234,0.02)] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-[rgba(201,168,106,0.15)]">
                  <Calculator className="w-5 h-5 text-[var(--gold)]" />
                </div>
                <div className="text-left">
                  <h4 className="font-display font-semibold text-[var(--cream)]">
                    Formula Structure
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    How the calculation works step-by-step
                  </p>
                </div>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-300 ${
                  expandedSection === "formula" ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedSection === "formula" && (
              <div className="px-6 pb-6 border-t border-[rgba(244,241,234,0.1)]">
                <div className="pt-6">
                  <div className="p-4 rounded-lg bg-[rgba(0,0,0,0.3)] font-mono text-sm text-[var(--cream)] overflow-x-auto">
                    <pre>{formulaStructure}</pre>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-[rgba(0,0,0,0.2)]">
                      <h5 className="font-mono text-micro uppercase text-[var(--gold)] mb-2">
                        Key Properties
                      </h5>
                      <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                        <li>• PPI range: [0, 1.0]</li>
                        <li>• Linear aggregation at both levels</li>
                        <li>• Era-relative normalization</li>
                        <li>• Optional log scaling</li>
                        <li>• Percentile capping (97.5th)</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-[rgba(0,0,0,0.2)]">
                      <h5 className="font-mono text-micro uppercase text-[var(--gold)] mb-2">
                        Weight Structure
                      </h5>
                      <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
                        <li>• Military: 25%</li>
                        <li>• Economic: 20%</li>
                        <li>• Territorial: 15%</li>
                        <li>• Demographics: 10%</li>
                        <li>• Administrative: 10%</li>
                        <li>• Technology: 10%</li>
                        <li>• Diplomatic: 5%</li>
                        <li>• Stability: 5%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Edge Case Testing */}
          <div className="glass-card overflow-hidden">
            <button
              onClick={() => toggleSection("edgecases")}
              className="w-full p-6 flex items-center justify-between hover:bg-[rgba(244,241,234,0.02)] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-[rgba(34,197,94,0.15)]">
                  <Scale className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-left">
                  <h4 className="font-display font-semibold text-[var(--cream)]">
                    Edge Case Testing Results
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Verified behavior at minimum, maximum, and proportional extremes
                  </p>
                </div>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-300 ${
                  expandedSection === "edgecases" ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedSection === "edgecases" && (
              <div className="px-6 pb-6 border-t border-[rgba(244,241,234,0.1)]">
                <div className="pt-6 space-y-4">
                  {edgeCases.map((test, index) => (
                    <div key={index} className="p-4 rounded-lg bg-[rgba(0,0,0,0.2)]">
                      <div className="flex items-start gap-3 mb-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-display font-semibold text-[var(--cream)] mb-1">
                            {test.scenario}
                          </h5>
                          <p className="text-sm text-[var(--text-secondary)] mb-2">
                            <span className="text-[var(--gold)]">Input:</span> {test.input}
                          </p>
                          <p className="text-sm text-[var(--gold)] mb-2">
                            Result: {test.result}
                          </p>
                          <p className="text-sm text-[var(--text-secondary)]">
                            {test.analysis}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Strengths */}
          <div className="glass-card overflow-hidden">
            <button
              onClick={() => toggleSection("strengths")}
              className="w-full p-6 flex items-center justify-between hover:bg-[rgba(244,241,234,0.02)] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-[rgba(34,197,94,0.15)]">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-left">
                  <h4 className="font-display font-semibold text-[var(--cream)]">
                    Strengths
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    What the formula does well
                  </p>
                </div>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-300 ${
                  expandedSection === "strengths" ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedSection === "strengths" && (
              <div className="px-6 pb-6 border-t border-[rgba(244,241,234,0.1)]">
                <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {strengths.map((strength, index) => (
                    <div key={index} className="p-4 rounded-lg bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)]">
                      <h5 className="font-display font-semibold text-green-400 mb-2">
                        {strength.title}
                      </h5>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {strength.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Limitations */}
          <div className="glass-card overflow-hidden">
            <button
              onClick={() => toggleSection("limitations")}
              className="w-full p-6 flex items-center justify-between hover:bg-[rgba(244,241,234,0.02)] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-[rgba(234,179,8,0.15)]">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="text-left">
                  <h4 className="font-display font-semibold text-[var(--cream)]">
                    Limitations
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Important caveats and constraints
                  </p>
                </div>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-300 ${
                  expandedSection === "limitations" ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedSection === "limitations" && (
              <div className="px-6 pb-6 border-t border-[rgba(244,241,234,0.1)]">
                <div className="pt-6 space-y-4">
                  {limitations.map((limitation, index) => (
                    <div key={index} className="p-4 rounded-lg bg-[rgba(234,179,8,0.1)] border border-[rgba(234,179,8,0.2)]">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-display font-semibold text-yellow-400 mb-2">
                            {limitation.title}
                          </h5>
                          <p className="text-sm text-[var(--text-secondary)] mb-2">
                            {limitation.description}
                          </p>
                          <p className="text-sm text-yellow-500/80">
                            <span className="font-semibold">Impact:</span> {limitation.impact}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* When to Use / When to Be Cautious */}
          <div className="glass-card overflow-hidden">
            <button
              onClick={() => toggleSection("usage")}
              className="w-full p-6 flex items-center justify-between hover:bg-[rgba(244,241,234,0.02)] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-[rgba(59,130,246,0.15)]">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-left">
                  <h4 className="font-display font-semibold text-[var(--cream)]">
                    When to Use / When to Be Cautious
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Appropriate use cases and important caveats
                  </p>
                </div>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-300 ${
                  expandedSection === "usage" ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedSection === "usage" && (
              <div className="px-6 pb-6 border-t border-[rgba(244,241,234,0.1)]">
                <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-mono text-micro uppercase text-green-400 tracking-[0.08em] mb-4">
                      ✅ Works Well For
                    </h5>
                    <ul className="space-y-3">
                      {[
                        "Comparative historical analysis within same era",
                        "Multi-dimensional profiling of strengths/weaknesses",
                        "Trend analysis tracking single state over time",
                        "Data-rich contexts with reliable indicators",
                        "Relative rankings (who was more powerful?)"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-mono text-micro uppercase text-yellow-400 tracking-[0.08em] mb-4">
                      ⚠️ Be Cautious With
                    </h5>
                    <ul className="space-y-3">
                      {[
                        "Absolute power claims (PPI = 75% of what?)",
                        "Cross-era comparison (500 BCE vs 1900 CE)",
                        "Sparse data (ancient/medieval periods)",
                        "Extreme outliers (one superpower dominates)",
                        "Predicting specific outcomes (who wins war?)"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                          <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Data Sources */}
          <div className="glass-card overflow-hidden">
            <button
              onClick={() => toggleSection("sources")}
              className="w-full p-6 flex items-center justify-between hover:bg-[rgba(244,241,234,0.02)] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-[rgba(201,168,106,0.15)]">
                  <Database className="w-5 h-5 text-[var(--gold)]" />
                </div>
                <div className="text-left">
                  <h4 className="font-display font-semibold text-[var(--cream)]">
                    Data Source Integration
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Academic datasets that power the calculations
                  </p>
                </div>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-300 ${
                  expandedSection === "sources" ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedSection === "sources" && (
              <div className="px-6 pb-6 border-t border-[rgba(244,241,234,0.1)]">
                <div className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-[rgba(0,0,0,0.2)]">
                      <h5 className="font-display font-semibold text-[var(--gold)] mb-2">
                        Correlates of War
                      </h5>
                      <p className="text-sm text-[var(--text-secondary)] mb-2">
                        National Material Capabilities dataset (1816+)
                      </p>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Military personnel, expenditure, iron/steel production, energy consumption
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-[rgba(0,0,0,0.2)]">
                      <h5 className="font-display font-semibold text-[var(--gold)] mb-2">
                        Maddison Project
                      </h5>
                      <p className="text-sm text-[var(--text-secondary)] mb-2">
                        Historical GDP estimates (1 CE+)
                      </p>
                      <p className="text-xs text-[var(--text-secondary)]">
                        GDP in 1990 international dollars, population, per capita estimates
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-[rgba(0,0,0,0.2)]">
                      <h5 className="font-display font-semibold text-[var(--gold)] mb-2">
                        HYDE Database
                      </h5>
                      <p className="text-sm text-[var(--text-secondary)] mb-2">
                        Historical population and land use (10,000 BCE+)
                      </p>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Gridded population, urbanization, agricultural land at 5 arc-minute resolution
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Final Verdict */}
        <div className="mt-10 glass-card p-8 max-w-5xl">
          <h3 className="text-h3 font-display font-semibold text-[var(--cream)] mb-6">
            Final Verdict
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)]">
              <h4 className="font-display font-semibold text-green-400 mb-3">
                Is the formula realistic?
              </h4>
              <p className="text-sm text-[var(--text-secondary)] mb-3">
                <span className="text-green-400 font-semibold">YES, WITH CAVEATS.</span> The formula is a 
                <span className="text-[var(--cream)]"> solid foundation for comparative historical analysis</span> of state power.
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                It's mathematically sound, theoretically grounded, and practically usable with historical datasets. 
                However, it's a simplified linear model that makes trade-offs around substitutability and context-sensitivity.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)]">
              <h4 className="font-display font-semibold text-green-400 mb-3">
                Will it give good results at extremes?
              </h4>
              <p className="text-sm text-[var(--text-secondary)] mb-3">
                <span className="text-green-400 font-semibold">YES.</span> The code handles edge cases correctly:
              </p>
              <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
                <li>• <span className="text-[var(--cream)]">Minimum (all zeros):</span> Returns PPI = 0 without errors</li>
                <li>• <span className="text-[var(--cream)]">Maximum (all same):</span> Returns PPI = 1.0 as expected</li>
                <li>• <span className="text-[var(--cream)]">Proportional scaling:</span> Maintains linear relationships</li>
              </ul>
              <p className="text-sm text-[var(--text-secondary)] mt-3">
                No division-by-zero errors, no undefined behavior, no numerical instabilities detected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
