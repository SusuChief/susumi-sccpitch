import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

const tokenData = [
  { name: "Circulating Supply", value: 1, color: "hsl(168 76% 42%)" },
  { name: "Time-Locked (24mo)", value: 4, color: "hsl(92 90% 55%)" },
  { name: "Unminted Reserve", value: 95, color: "hsl(220 15% 20%)" }
];

interface TokenomicsProps {
  onView: () => void;
}

export const Tokenomics = ({ onView }: TokenomicsProps) => {
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
      id="tokenomics" 
      className="section-anchor py-20 px-4 bg-secondary/30"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          SUSU+ <span className="gradient-text">Tokenomics</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Maximum supply: 100 Billion SUSU+ tokens • Utility-based scarcity model
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Card className="p-8 bg-card">
            <div className="flex flex-col items-center justify-center h-[400px]">
              {/* CSS Donut Chart */}
              <div className="relative w-64 h-64 md:w-72 md:h-72">
                <div 
                  className="w-full h-full rounded-full"
                  style={{
                    background: `conic-gradient(
                      ${tokenData[0].color} 0% ${tokenData[0].value}%,
                      ${tokenData[1].color} ${tokenData[0].value}% ${tokenData[0].value + tokenData[1].value}%,
                      ${tokenData[2].color} ${tokenData[0].value + tokenData[1].value}% 100%
                    )`,
                  }}
                >
                  {/* Inner circle to create donut effect */}
                  <div className="absolute inset-0 m-auto w-32 h-32 md:w-36 md:h-36 rounded-full bg-card" />
                </div>
              </div>
              
              {/* HTML Legend */}
              <div className="mt-8 space-y-3 w-full max-w-sm">
                {tokenData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-foreground font-medium">
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 bg-card hover-glow">
              <h3 className="text-xl font-semibold mb-2 gradient-text">1 Billion (1%)</h3>
              <p className="text-sm text-muted-foreground">
                Initial circulating supply available on crypto exchanges. Provides liquidity and market access.
              </p>
            </Card>

            <Card className="p-6 bg-card hover-glow">
              <h3 className="text-xl font-semibold mb-2 gradient-text">4 Billion (4%)</h3>
              <p className="text-sm text-muted-foreground">
                Pre-minted and time-locked for 24 months. Allocated to founders, investors, and team. Locked tokens earn revenue share from Validator Panel.
              </p>
            </Card>

            <Card className="p-6 bg-card hover-glow">
              <h3 className="text-xl font-semibold mb-2 gradient-text">95 Billion (95%)</h3>
              <p className="text-sm text-muted-foreground">
                Perpetual unminted reserve. Tokens minted ONLY when Susu Funds mature. Ensures supply growth aligns with real platform activity and adoption.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <h3 className="text-lg font-semibold mb-2">Utility & Monetization</h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• <strong>Activate Funds:</strong> SUSU+ required to raise funds on platform</li>
                <li>• <strong>Donor Rewards:</strong> Earn tokens for contributing to funds. Each Donor earns the right to become a Fund beneficiary too.</li>
                <li>• <strong>Purchase NFTs:</strong> Buy revenue-generating ecosystem NFTs</li>
                <li>• <strong>Stake & Earn:</strong> Lock in Validator Panel for 40% revenue share</li>
              </ul>
            </Card>
          </div>
        </div>

        <Card className="mt-12 p-8 bg-card">
          <h3 className="text-2xl font-bold mb-4">Investor Token Benefits</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-primary">500M SUSU+ Tokens</h4>
              <p className="text-sm text-muted-foreground">
                0.5% of total supply locked for 24 months in Validator Panel. Current internal valuation: $0.0015/token = $750k value
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-primary">Projected Unlock Value</h4>
              <p className="text-sm text-muted-foreground">
                If marketing targets met: $0.015-$0.02/token = $7.5M-$10M (10-13x in 2 years)
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-primary">Revenue While Locked</h4>
              <p className="text-sm text-muted-foreground">
                Earn share of 40% platform fees monthly during 24-month vesting. Estimated earnings: $4M+ over 2 years
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-primary">Exit Options</h4>
              <p className="text-sm text-muted-foreground">
                Sell on secondary exchanges post lock-up, hold for passive income, or exchange within ecosystem
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
