import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

const risks = [
  {
    title: "Regulatory Risk",
    likelihood: "Low",
    mitigation: "Already licensed by Nigerian SEC (first blockchain crowdfunding platform). Changing crypto/crowdfunding regulations could restrict operations, but first-mover licensing provides strong foundation."
  },
  {
    title: "Cybersecurity & Smart Contract Risk",
    likelihood: "Medium",
    mitigation: "Military Grade Hard Disk Firewall at app server level. Independent security audits on Smart Contract code, ongoing monitoring, and Fund isolation architecture to protect assets."
  },
  {
    title: "Adoption Risk",
    likelihood: "Low",
    mitigation: "Leverage existing Esusu/Cooperative Finance culture for fast grassroots adoption. Backed by 20,000+ online community followers, targeted digital + community marketing campaigns, and partnerships with existing communities."
  },
  {
    title: "Liquidity & Token Value Risk",
    likelihood: "Medium",
    mitigation: "Utility-based tokenomics with SUSU+ minted only with donations (Proof of Giving Protocol). Oracle integrated to Smart Contract design. Exchange listings and Validator Panel link token value directly to platform transaction value."
  },
  {
    title: "Execution Risk",
    likelihood: "Low",
    mitigation: "Phased rollout strategy—Nigeria first with SEC license secured, then expansion into Africa, LatAm, and diaspora markets with franchise/local partners. Experienced team with proven track record."
  }
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
          Comprehensive risk management strategy with proven mitigation measures
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
                  <p className="text-sm font-semibold text-primary mb-2">Mitigation Strategy:</p>
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
