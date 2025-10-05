import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Shield, Target, Zap, TrendingUp } from "lucide-react";

const advantages = [
  {
    icon: Shield,
    title: "First-Mover Advantage",
    points: [
      "First SEC-licensed blockchain crowdfunding platform in Nigeria",
      "Regulatory barriers to entry for new players",
      "Over 20,000 followers and 1,400 registered users pre-launch",
      "Global community footprint established"
    ]
  },
  {
    icon: Target,
    title: "Deep Cultural Market Fit",
    points: [
      "Esusu/Susu cooperative finance trusted by millions across Africa, LatAm, Asia",
      "47% of Nigerian adults already use cryptocurrency",
      "Modernizes traditional model with blockchain rewards",
      "Viral, community-based adoption ensures low-cost, organic growth"
    ]
  },
  {
    icon: Zap,
    title: "Unique Product Offering",
    points: [
      "DeFi product differentiated from any other market solution",
      "Decentralized: no human or third-party intervention required",
      "Users raise money that's not a loan or investment",
      "Heavily incentivized and viral participation model"
    ]
  },
  {
    icon: TrendingUp,
    title: "Technology & Ecosystem",
    points: [
      "Smart contracts: automated, transparent, low-cost",
      "Integration with NFTs and DeFi revenue panels",
      "Flexible architecture for investments and financial services",
      "Revolutionary P2P via RFC technology for local fund transfers"
    ]
  }
];

interface CompetitiveProps {
  onView: () => void;
}

export const Competitive = ({ onView }: CompetitiveProps) => {
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
      id="competitive" 
      className="section-anchor py-20 px-4"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Why <span className="gradient-text font-goldman">Susumi</span> Wins
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Competitors may build apps, but cannot easily replicate our license, network effects, and incentive-driven ecosystem
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {advantages.map((advantage, index) => (
            <Card 
              key={index}
              className="p-8 bg-card hover-glow"
            >
              <advantage.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-4">{advantage.title}</h3>
              <ul className="space-y-2">
                {advantage.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <Card className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-center">Market Positioning</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">$4.4T+</div>
              <div className="text-sm text-muted-foreground">Total Addressable Market (crypto)</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">$500B</div>
              <div className="text-sm text-muted-foreground">Serviceable Market (cooperative finance)</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">$560M</div>
              <div className="text-sm text-muted-foreground">Target (1% of Nigeria in 2 years)</div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
