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
          Token supply grows only with real platform activity. Maximum supply: 100 billion SUSU+.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Card className="p-8 bg-card">
            <div className="space-y-6">
              {/* Stacked Bar Visualization (100% width) */}
              <div className="space-y-3">
                <div className="relative flex h-8 w-full overflow-hidden rounded-md ring-1 ring-border">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${tokenData[0].value}%` }}
                    aria-label={`${tokenData[0].name} ${tokenData[0].value}%`}
                  />
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${tokenData[1].value}%` }}
                    aria-label={`${tokenData[1].name} ${tokenData[1].value}%`}
                  />
                  <div
                    className="h-full bg-foreground/10"
                    style={{ width: `${tokenData[2].value}%` }}
                    aria-label={`${tokenData[2].name} ${tokenData[2].value}%`}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* High-contrast Legend */}
              <div className="grid gap-3 w-full max-w-xl">
                {tokenData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 rounded-sm ${
                          index === 0
                            ? 'bg-primary'
                            : index === 1
                            ? 'bg-accent'
                            : 'bg-foreground/10 ring-1 ring-border'
                        }`}
                      />
                      <span className="text-foreground font-medium text-sm md:text-base">{item.name}</span>
                    </div>
                    <span className="font-semibold text-foreground text-sm md:text-base">{item.value}%</span>
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
                Pre-minted and time-locked for 24 months. For founders, early backers and team. Locked tokens earn revenue share from Validator Panel.
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
                <li>• <strong>Activate Funds:</strong> SUSU+ is required to open a fund, driving steady demand</li>
                <li>• <strong>Reward Subscribers:</strong> Every Subscriber earns the right to become a Fund beneficiary too.</li>
                <li>• <strong>Purchase NFTs:</strong> Buy revenue-generating ecosystem NFTs</li>
                <li>• <strong>Stake & Earn:</strong> Locked tokens share 40% of platform fees</li>
              </ul>
            </Card>
          </div>
        </div>

        <Card className="mt-12 p-6 bg-card">
          <p className="text-sm text-muted-foreground">
            Minting tied to matured funds keeps open-circulation supply low (projected under 2.5%) and links token supply to platform usage. <span className="font-semibold text-foreground">No SUSU+ tokens are offered to investors in this equity round.</span> Token value is not projected in this edition.
          </p>
        </Card>
      </div>
    </section>
  );
};
