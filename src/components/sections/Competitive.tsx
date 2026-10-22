import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Shield, Target, Zap, TrendingUp } from "lucide-react";

const advantages = [
  { icon: Shield, title: "First-Mover Advantage", points: [
    "First SEC-licensed blockchain crowdfunding platform in Nigeria",
    "SEC licensing is a slow, demanding barrier for later entrants",
    "About 18,000 followers and 1,400 registered testnet users"] },
  { icon: Target, title: "Market Fit", points: [
    "Community fundraising and group giving are familiar across Africa, Latin America and Asia",
    "47% of Nigerian adults have used cryptocurrency",
    "Reward-driven, community-based growth keeps acquisition costs low"] },
  { icon: Zap, title: "Unique Product", points: [
    "Users raise money that is neither a loan nor an investment",
    "Decentralised: no human or third-party intervention needed",
    "Rewards give every Subscriber a reason to take part"] },
  { icon: TrendingUp, title: "Technology", points: [
    "Smart contracts on NEAR: automated, transparent, low cost",
    "Integrated NFTs and Validator Panel revenue sharing",
    "P2P transfers by NFC for local payments (planned)"] }
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
              <div className="text-4xl font-bold gradient-text mb-2">£68.72B+</div>
              <div className="text-sm text-muted-foreground">Nigeria on-chain value received (2024–25)</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">£373.1B</div>
              <div className="text-sm text-muted-foreground">Cooperative finance (management estimate)</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">£687.25M</div>
              <div className="text-sm text-muted-foreground">Illustrative 1% of Nigeria volume (not revenue)</div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
