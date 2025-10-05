import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Users, Coins, Gift, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Create a Susu Fund",
    description: "Individuals, communities, or enterprises deposit SUSU+ Tokens to enable them create a fund to raise money for their needs through the Susumi platform using USDT stablecoin."
  },
  {
    icon: Gift,
    title: "Donors Contribute",
    description: "Community members/Public donate USDT to Susu Funds. Unlike traditional crowdfunding, donors are incentivized with SUSU+ token rewards."
  },
  {
    icon: Coins,
    title: "Earn Susu Tokens",
    description: "Donors receive SUSU+ tokens as rewards. These tokens are dynamically minted and have strong utility within the ecosystem, but they have a vesting period before being released."
  },
  {
    icon: TrendingUp,
    title: "Everyone Benefits",
    description: "Campaigns receive USDT, Donors receive SUSU+ tokens which can be used to create new campaigns, Platform earns a fee on successful funds, Validators earn a share of this revenue for reviewing campaigns and keeping the Platform clean. As transactions increase the value of the SUSU+ Token increases."
  }
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
          Susumi is a unique decentralised crowdfunding method using Web3 technology, smart contracts, and cryptocurrency rewards. It is based on reciprocal fundraising principles from the ancient Susu cooperative finance models.
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
              <p className="font-semibold mb-2">No Intermediaries</p>
              <p className="text-muted-foreground">Smart contracts enable direct transfers without human intervention, reducing costs and delays.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Incentivized Donations</p>
              <p className="text-muted-foreground">Donors earn SUSU+ tokens, exponentially increasing crowdfunding success rates.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Fast & Secure</p>
              <p className="text-muted-foreground">Blockchain technology ensures transparency, speed, and security for all transactions.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Scalable Model</p>
              <p className="text-muted-foreground">Campaigns can now raise funds globally from donors outside their immediate local networks. Crowdfunding campaigns can be easily replicated across communities.</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
