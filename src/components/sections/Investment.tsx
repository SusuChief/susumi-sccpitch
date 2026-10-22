import { currencyNote, seedRound, formatGbp } from "@/lib/financial-reference";
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Cpu, ShieldCheck, Repeat } from "lucide-react";

const objectives = [
  "Complete the independent smart contract audit",
  "Complete regulatory filings for commercial launch",
  "Launch the Basic Susu Fund on NEAR mainnet in Nigeria",
  "Grow across Nigeria before adding fund types and markets",
];

const benefits = [
  "12.5% of the ordinary shares in Susumi Capital Corp",
  "A share in the company that owns the Susumi IP and licenses it to local operators",
  "Exposure to platform revenue earned in stablecoins",
  "Board observer seat and quarterly milestone reporting for the lead investor",
];

const pillars = [
  { icon: Cpu, title: "Proprietary IP", text: "A purpose-built crowdfunding protocol and app stack." },
  { icon: ShieldCheck, title: "Regulated from day one", text: "Launching under an existing SEC Nigeria licence, a barrier later entrants must still clear." },
  { icon: Repeat, title: "Real revenue model", text: "Platform fees on every successful fund, not token speculation." },
];

interface InvestmentProps {
  onView: () => void;
  onCTAClick: (label: string) => void;
}

export const Investment = ({ onView, onCTAClick }: InvestmentProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) onView(); }, { threshold: 0.5 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [onView]);

  return (
    <section ref={sectionRef} id="investment" className="section-anchor py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Investment <span className="gradient-text">Proposition</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          £200,000 for 12.5% of Susumi Capital Corp, to take the Basic Susu Fund live in Nigeria and build the base for expansion.
        </p>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <div className="text-center mb-8">
              <div className="text-6xl font-bold gradient-text mb-2">£200,000</div>
              <div className="text-2xl font-semibold mb-4">Seed Round · Ordinary Shares</div>
              <div className="text-muted-foreground">Equity only: no SUSU+ tokens are offered in this round.</div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">12.5%</div>
                <div className="text-sm text-muted-foreground">Equity</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">£1.4M</div>
                <div className="text-sm text-muted-foreground">Pre-Money</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold mb-2">£1.6M</div>
                <div className="text-sm text-muted-foreground">Post-Money</div>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 bg-card">
              <h3 className="text-2xl font-semibold mb-6">Investment Objectives</h3>
              <div className="space-y-3">
                {objectives.map((o) => (
                  <div key={o} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{o}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-8 bg-card">
              <h3 className="text-2xl font-semibold mb-6">What Investors Receive</h3>
              <div className="space-y-3">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-8 bg-card">
            <h3 className="text-2xl font-semibold mb-2">Use of Funds</h3>
            <p className="text-sm text-muted-foreground mb-6">
              About nine months of operating spend at £20,894 a month, plus one-off legal and raise costs.
            </p>
            <div className="space-y-4">
              {seedRound.funds.map((f) => (
                <div key={f.label} className="flex justify-between items-start gap-4 pb-3 border-b border-border">
                  <div>
                    <div>{f.label}</div>
                    <div className="text-xs text-muted-foreground">{f.buys}</div>
                  </div>
                  <div className="text-right whitespace-nowrap">
                    <div className="font-semibold">{formatGbp(f.amount)}</div>
                    <div className="text-xs text-muted-foreground">{Math.round((f.amount / seedRound.raise) * 100)}%</div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2">
                <span className="font-semibold">Total</span>
                <span className="font-bold gradient-text">{formatGbp(seedRound.raise)}</span>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <Card key={p.title} className="p-6 bg-card">
                <p.icon className="h-8 w-8 text-primary mb-3" />
                <div className="font-semibold mb-1">{p.title}</div>
                <div className="text-sm text-muted-foreground">{p.text}</div>
              </Card>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center">{currencyNote}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" className="text-lg px-8 py-6 hover-glow group" onClick={() => onCTAClick("Book Meeting - Investment")}>
              Schedule Investor Meeting
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={() => onCTAClick("Request DDR - Investment")}>
              Request Data Room Access
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
