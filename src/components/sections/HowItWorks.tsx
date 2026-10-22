import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Users, Coins, Gift, TrendingUp } from "lucide-react";

const steps = [
  { icon: Users, title: "Create a Susu Fund", description: "Fund Creators deposit SUSU+ to open a fund and raise money in stablecoins (USDT, USDC or cNGN)." },
  { icon: Gift, title: "Subscribers contribute", description: "Anyone can donate to a fund. Unlike traditional crowdfunding, Subscribers are rewarded with SUSU+." },
  { icon: Coins, title: "Rewards vest", description: "SUSU+ rewards are minted only when a fund matures, and vest before release. No donations, no tokens." },
  { icon: TrendingUp, title: "Everyone benefits", description: "Funds receive stablecoins, Subscribers receive SUSU+, the platform earns a fee and Validators share in it." }
];

interface HowItWorksProps {
  onView: () => void;
}

export const HowItWorks = ({ onView }: HowItWorksProps) => {
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
      id="how-it-works" 
      className="section-anchor py-20 px-4 bg-secondary/30"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          How <span className="gradient-text font-goldman">Susumi</span> Works
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Susumi is decentralised crowdfunding on NEAR Protocol. It runs on the Susumi Crowdfunding Framework: a reciprocal, give-to-receive model in which people who back a fund earn the right to raise one themselves.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="p-6 bg-card hover-glow relative"
            >
              <div className="absolute top-4 right-4 text-4xl font-bold text-primary/20">
                {index + 1}
              </div>
              <step.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <h3 className="text-2xl font-bold mb-4">Why This Model Works</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-semibold mb-2">No intermediaries</p>
              <p className="text-muted-foreground">Smart contracts move funds directly, cutting cost and delay.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Incentivised giving</p>
              <p className="text-muted-foreground">Rewards give Subscribers a reason to back funds beyond their own circle.</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
