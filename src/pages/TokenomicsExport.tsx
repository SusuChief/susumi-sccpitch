import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const componentCode = `import { useEffect, useRef } from "react";
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
            <div className="space-y-6">
              {/* Stacked Bar Visualization (100% width) */}
              <div className="space-y-3">
                <div className="relative flex h-8 w-full overflow-hidden rounded-md ring-1 ring-border">
                  <div
                    className="h-full bg-primary"
                    style={{ width: \\\`\\\${tokenData[0].value}%\\\` }}
                    aria-label={\\\`\\\${tokenData[0].name} \\\${tokenData[0].value}%\\\`}
                  />
                  <div
                    className="h-full bg-accent"
                    style={{ width: \\\`\\\${tokenData[1].value}%\\\` }}
                    aria-label={\\\`\\\${tokenData[1].name} \\\${tokenData[1].value}%\\\`}
                  />
                  <div
                    className="h-full bg-foreground/10"
                    style={{ width: \\\`\\\${tokenData[2].value}%\\\` }}
                    aria-label={\\\`\\\${tokenData[2].name} \\\${tokenData[2].value}%\\\`}
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
                        className={\\\`w-4 h-4 rounded-sm \\\${
                          index === 0
                            ? 'bg-primary'
                            : index === 1
                            ? 'bg-accent'
                            : 'bg-foreground/10 ring-1 ring-border'
                        }\\\`}
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
};`;

const cssStyles = `.gradient-text {
  @apply bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent;
}

.hover-glow {
  @apply transition-all duration-300 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:border-primary/50;
}

.section-anchor {
  @apply scroll-mt-20;
}`;

const TokenomicsExport = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Tokenomics Section Export</h1>
          <p className="text-muted-foreground">
            Copy the component code and styles to replicate the Tokenomics section
          </p>
        </div>

        {/* Component Code */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Tokenomics Component Code</h2>
            <Button
              onClick={() => copyToClipboard(componentCode, "component")}
              variant="outline"
            >
              {copied === "component" ? "Copied!" : "Copy Code"}
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{componentCode}</code>
          </pre>
        </Card>

        {/* CSS Styles */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Required CSS Styles</h2>
            <Button
              onClick={() => copyToClipboard(cssStyles, "css")}
              variant="outline"
            >
              {copied === "css" ? "Copied!" : "Copy Styles"}
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{cssStyles}</code>
          </pre>
        </Card>

        {/* Design Tokens */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Design Tokens Used</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Colors:</strong></p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li><code className="bg-muted px-2 py-1 rounded">bg-primary</code> - Main brand color (Circulating Supply bar)</li>
              <li><code className="bg-muted px-2 py-1 rounded">bg-accent</code> - Accent color (Time-Locked bar)</li>
              <li><code className="bg-muted px-2 py-1 rounded">bg-foreground/10</code> - Muted foreground (Unminted Reserve bar)</li>
              <li><code className="bg-muted px-2 py-1 rounded">bg-secondary/30</code> - Section background</li>
              <li><code className="bg-muted px-2 py-1 rounded">bg-card</code> - Card backgrounds</li>
              <li><code className="bg-muted px-2 py-1 rounded">text-muted-foreground</code> - Secondary text</li>
            </ul>
          </div>
        </Card>

        {/* Dependencies */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Required Dependencies</h2>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge

# or with yarn
yarn add @radix-ui/react-slot class-variance-authority clsx tailwind-merge`}</code>
          </pre>
        </Card>

        {/* Usage Instructions */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Usage Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Copy the component code into a new file: <code className="bg-muted px-2 py-1 rounded">src/components/sections/Tokenomics.tsx</code></li>
            <li>Add the CSS styles to your <code className="bg-muted px-2 py-1 rounded">src/index.css</code> file</li>
            <li>Ensure you have the Card component from shadcn/ui installed</li>
            <li>Configure your design tokens (colors) in <code className="bg-muted px-2 py-1 rounded">tailwind.config.ts</code> and <code className="bg-muted px-2 py-1 rounded">index.css</code></li>
            <li>Import and use the Tokenomics component with the onView callback prop</li>
          </ol>
        </Card>

        {/* Features */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Section Features</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Responsive stacked bar chart visualization showing token distribution</li>
            <li>Color-coded legend with percentage breakdown</li>
            <li>Detailed cards explaining each allocation segment</li>
            <li>Utility & Monetization highlights</li>
            <li>Investor benefits grid with projected values</li>
            <li>Intersection Observer for scroll tracking</li>
            <li>Fully responsive design (mobile to desktop)</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default TokenomicsExport;
