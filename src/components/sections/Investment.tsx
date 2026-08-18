import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

const benefits = [
  "13.58% equity ownership in Susumi Capital Corp (pre-money valuation $7M)",
  "200 Million SUSU+ Tokens issued under an agreed vesting schedule",
  "Participation in the growth of a regulated blockchain financial institution",
  "Exposure to Nigerian and international revenue streams in USDT",
  "Potential Board representation on Susumi Capital Corp",
  "Participation in future expansion across Africa and global diaspora markets",
  "Early positioning within one of Africa's most significant emerging digital finance opportunities"
];

const objectives = [
  "Satisfy the Nigerian VASP minimum share capital requirement",
  "Complete all remaining regulatory licensing, audit and compliance obligations",
  "Complete commercial launch of the Susumi Platform",
  "Expand operations across Nigeria before international rollout",
  "Establish one of Africa's leading regulated blockchain crowdfunding ecosystems"
];

const differentiators = [
  "Proprietary intellectual property",
  "A real revenue-generating business model",
  "Full regulatory compliance under the SEC/VASP framework",
  "A proven cultural financial model (Esusu/Susu cooperative finance)",
  "Significant first-mover advantage",
  "Substantially reduced future competition due to higher capital requirements"
];

const useOfFunds = [
  { label: "Regulatory Share Capital (VASP Requirement)", amount: "$750,000" },
  { label: "Technology Completion & Security Audits", amount: "$100,000" },
  { label: "Regulatory, Legal & Financial Audits", amount: "$75,000" },
  { label: "Marketing & Customer Acquisition", amount: "$85,000" },
  { label: "Operations & Key Personnel", amount: "$60,000" },
  { label: "Working Capital & Administrative Costs", amount: "$30,000" }
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
              <div className="text-6xl font-bold gradient-text mb-2">$250K</div>
              <div className="text-2xl font-semibold mb-4">Capital Raise</div>
              <div className="text-muted-foreground">
                Bridging capital for the global commercial launch starting in Nigeria by April 2026
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">6.25%</div>
                <div className="text-sm text-muted-foreground">Equity Stake</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">200M</div>
                <div className="text-sm text-muted-foreground">SUSU+ Tokens</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold mb-2">20x</div>
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
                <span>Smart Contract Audit</span>
                <span className="font-semibold">$30,000</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span>Technical Development</span>
                <span className="font-semibold">$30,000</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span>Marketing and User Acquisition</span>
                <span className="font-semibold">$30,000</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span>Legal, Compliance, Staffing &amp; Administration</span>
                <span className="font-semibold">$80,000</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span>Token Listing</span>
                <span className="font-semibold">$30,000</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span>Mainnet Migration</span>
                <span className="font-semibold">$50,000</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-semibold">Total</span>
                <span className="font-bold gradient-text">$250,000</span>
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
