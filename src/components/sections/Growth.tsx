import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const scenarios = [
  {
    name: "Conservative",
    users: "50k",
    fundsPerMonth: "4,000",
    avgFundSize: "$1,500",
    annualRevenue: "$5M",
    roi: "3-4x"
  },
  {
    name: "Base Case",
    users: "150k",
    fundsPerMonth: "12,000",
    avgFundSize: "$1,850",
    annualRevenue: "$16.8M",
    roi: "12-15x"
  },
  {
    name: "Aggressive",
    users: "300k+",
    fundsPerMonth: "20,000+",
    avgFundSize: "$2,500+",
    annualRevenue: "$50M+",
    roi: "20x+"
  }
];

interface GrowthProps {
  onView: () => void;
}

export const Growth = ({ onView }: GrowthProps) => {
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
      id="growth" 
      className="section-anchor py-20 px-4"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Growth Models & <span className="gradient-text">Projections</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Multiple growth scenarios based on user adoption and transaction volume
        </p>

        <div className="max-w-5xl mx-auto">
          <Card className="p-8 bg-card mb-8">
            <h3 className="text-2xl font-semibold mb-6">Revenue Drivers</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="font-semibold mb-1">User Growth</div>
                <div className="text-muted-foreground">Active users creating/joining funds</div>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="font-semibold mb-1">Fund Creation</div>
                <div className="text-muted-foreground">Average size & frequency of Susu Funds</div>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="font-semibold mb-1">Platform Fees</div>
                <div className="text-muted-foreground">8.3% personal, 5% enterprise, 3.1% community</div>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="font-semibold mb-1">NFT Sales</div>
                <div className="text-muted-foreground">16 characters × 10 series × 10,000 NFTs</div>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="font-semibold mb-1">Token Utility</div>
                <div className="text-muted-foreground">SUSU+ locked, traded, revenue share</div>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="font-semibold mb-1">Adoption Funnel</div>
                <div className="text-muted-foreground">Y1: 20k users → Y3: 1M+ users</div>
              </div>
            </div>
          </Card>

          <Tabs defaultValue="base" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="conservative">Conservative</TabsTrigger>
              <TabsTrigger value="base">Base Case</TabsTrigger>
              <TabsTrigger value="aggressive">Aggressive</TabsTrigger>
            </TabsList>
            
            {scenarios.map((scenario) => (
              <TabsContent 
                key={scenario.name} 
                value={scenario.name.toLowerCase().replace(' ', '')}
              >
                <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
                  <h3 className="text-2xl font-bold mb-6 gradient-text">
                    {scenario.name} Scenario (Year 2)
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <div className="text-3xl font-bold mb-1">{scenario.users}</div>
                      <div className="text-sm text-muted-foreground">Active Users</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-1">{scenario.fundsPerMonth}</div>
                      <div className="text-sm text-muted-foreground">Funds per Month</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-1">{scenario.avgFundSize}</div>
                      <div className="text-sm text-muted-foreground">Avg Fund Size</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">{scenario.annualRevenue}</div>
                      <div className="text-sm text-muted-foreground">Annual Revenue</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-accent mb-1">{scenario.roi}</div>
                      <div className="text-sm text-muted-foreground">Investor ROI</div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <Card className="mt-8 p-8 bg-card">
            <h3 className="text-xl font-semibold mb-4">Financial Projections</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-secondary/30 rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">Short-Term (Year 1)</div>
                <div className="text-3xl font-bold gradient-text mb-1">$1.64M</div>
                <div className="text-sm text-muted-foreground">
                  20,000 active users • 2,000 funds/month • $1,850 avg size
                </div>
              </div>
              <div className="p-6 bg-secondary/30 rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">Long-Term (Year 3)</div>
                <div className="text-3xl font-bold gradient-text mb-1">$3.1B</div>
                <div className="text-sm text-muted-foreground">
                  Gross transaction volume • 1M+ users • 80,000 funds/month
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
