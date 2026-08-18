import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Cpu, ShieldCheck, Flag, TrendingUp, Repeat, BarChart3, Hammer } from "lucide-react";

const supports = [
  { icon: Cpu, title: "Proprietary Blockchain IP", description: "Purpose-built crowdfunding protocol and app stack owned outright." },
  { icon: ShieldCheck, title: "Regulatory Positioning", description: "SEC-licensed and structured for the new VASP regime." },
  { icon: Flag, title: "First-Mover Advantage", description: "First blockchain-powered crowdfunding platform licensed in Nigeria." },
  { icon: TrendingUp, title: "High-Growth Market", description: "Operating in Nigeria's $96B crypto transaction market." },
  { icon: Repeat, title: "Scalable Recurring Revenue", description: "Platform fees compound with every fund cycle created." },
  { icon: BarChart3, title: "Comparable Fintech Valuations", description: "In line with regional fintech and digital asset benchmarks." },
  { icon: Hammer, title: "Founder Investment & Build", description: "Significant founder capital and completed development to date." },
];

interface ValuationProps {
  onView: () => void;
}

export const Valuation = ({ onView }: ValuationProps) => {
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
    <section ref={sectionRef} id="valuation" className="section-anchor py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="gradient-text">Valuation</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Pre-Money Valuation: US$7 Million
        </p>

        <div className="max-w-6xl mx-auto">
          <Card className="p-8 bg-card mb-8 text-center bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
            <div className="text-sm text-muted-foreground mb-2">Pre-Money Valuation</div>
            <div className="text-5xl md:text-6xl font-bold gradient-text">US$7M</div>
          </Card>

          <h3 className="text-xl font-semibold mb-6 text-center">Supported by</h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supports.map((item) => (
              <Card key={item.title} className="p-6 bg-card hover:border-primary/40 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="font-semibold mb-1">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.description}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
