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
          Competitors can build an app. They cannot easily copy a licence, a community and an incentive-driven network.
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
      </div>
    </section>
  );
};
