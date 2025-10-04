import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

const benefits = [
  "15% equity in Susumi Capital Corp (pre-money valuation $7.5M)",
  "500 Million SUSU+ Tokens with 2-year vesting",
  "Board membership on Susumi Capital Corp",
  "Early entry into high-growth Crypto Finance Market",
  "Access to Nigerian and international revenue streams in USDT",
  "SEC-licensed platform ready for market launch",
  "Ongoing revenue generation during 24-month lock-up period"
];

interface InvestmentProps {
  onView: () => void;
  onCTAClick: (label: string) => void;
}

export const Investment = ({ onView, onCTAClick }: InvestmentProps) => {
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
      id="investment" 
      className="section-anchor py-20 px-4"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Investment <span className="gradient-text">Proposition</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Dual value proposition: Equity growth + Token appreciation + Revenue sharing
        </p>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <div className="text-center mb-8">
              <div className="text-6xl font-bold gradient-text mb-2">$1.2M</div>
              <div className="text-2xl font-semibold mb-4">Capital Raise</div>
              <div className="text-muted-foreground">
                For global commercial launch starting in Nigeria by December 2025
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">15%</div>
                <div className="text-sm text-muted-foreground">Equity Stake</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">500M</div>
                <div className="text-sm text-muted-foreground">SUSU+ Tokens</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold mb-2">10-13x</div>
                <div className="text-sm text-muted-foreground">Token ROI (2yr)</div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card">
            <h3 className="text-2xl font-semibold mb-6">Investor Benefits</h3>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 bg-card">
            <h3 className="text-2xl font-semibold mb-4">Use of Funds</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span>Tech Development & Security Audits</span>
                <span className="font-semibold">$180,000</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span>Local & International Marketing</span>
                <span className="font-semibold">$400,000</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span>Exchange Listing Operations</span>
                <span className="font-semibold">$120,000</span>
              </div>
              <div className="flex justify-between items-center pb-3">
                <span>Operations & Administration</span>
                <span className="font-semibold">$500,000</span>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
            <h3 className="text-xl font-semibold mb-4">Projected ROI</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">$16.8M</div>
                <div className="text-sm text-muted-foreground">Year 2 Revenue Projection</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">$3.1B</div>
                <div className="text-sm text-muted-foreground">Year 3 Gross Transaction Volume</div>
              </div>
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 hover-glow group"
              onClick={() => onCTAClick("Book Meeting - Investment")}
            >
              Schedule Investor Meeting
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6"
              onClick={() => onCTAClick("Request DDR - Investment")}
            >
              Request Data Room Access
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
