import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

const risks = [
  { title: "Smart Contract & Cybersecurity", likelihood: "Medium", mitigation: "Independent audit before mainnet, funded by this round; ongoing monitoring; fund isolation architecture; non-custodial design." },
  { title: "Regulatory", likelihood: "Low", mitigation: "Already licensed by SEC Nigeria; formal legal opinion on SUSU+; active in CfAN policy work as digital asset rules are finalised." },
  { title: "Adoption", likelihood: "Low", mitigation: "Existing community of about 18,000; targeted digital and community campaigns; partnerships with existing communities." },
  { title: "Liquidity & Token Value", likelihood: "Medium", mitigation: "SUSU+ minted only against real donations; oracle pricing in the contracts; Validator Panel links token value to platform activity." },
  { title: "FX Exposure", likelihood: "Low", mitigation: "Funds settle in stablecoins (USDT, USDC, cNGN)." },
  { title: "Execution", likelihood: "Low", mitigation: "Narrow launch scope, one fund type first; spending released against milestones; local licence partners for each new market." }
];

interface RisksProps {
  onView: () => void;
}

export const Risks = ({ onView }: RisksProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onView();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onView]);

  return (
    <section 
      ref={sectionRef}
      id="risks" 
      className="section-anchor py-20 px-4 bg-secondary/30"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Risks & <span className="gradient-text">Mitigation</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          The main risks, as management assesses them, and how we manage each.
        </p>

        <div className="space-y-4">
          {risks.map((risk, index) => (
            <Card 
              key={index}
              className="bg-card overflow-hidden"
            >
              <button
                className="w-full p-6 text-left flex items-center justify-between hover:bg-secondary/50 transition-colors"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{risk.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    risk.likelihood === 'Low' 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-gold/20 text-gold'
                  }`}>
                    {risk.likelihood} Likelihood
                  </span>
                </div>
                {expandedIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              
              {expandedIndex === index && (
                <div className="px-6 pb-6 pt-2 border-t border-border">
                  <p className="text-sm font-semibold text-primary mb-2">How we manage it:</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {risk.mitigation}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
