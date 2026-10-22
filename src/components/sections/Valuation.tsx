import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Cpu, ShieldCheck, Flag, TrendingUp, Repeat, Hammer } from "lucide-react";

const supports = [
  { icon: Cpu, title: "Proprietary IP", description: "Crowdfunding protocol and app stack, rebuilt on NEAR." },
  { icon: ShieldCheck, title: "Licensed Partner", description: "SEC Nigeria licence held by our franchise partner." },
  { icon: Flag, title: "First Mover", description: "First blockchain crowdfunding platform licensed in Nigeria." },
  { icon: TrendingUp, title: "Nigeria's Scale", description: "Over £68.72bn of on-chain value received in 2024–25." },
  { icon: Repeat, title: "Recurring Fees", description: "Platform fees that recur with every fund cycle." },
  { icon: Hammer, title: "Founder Capital", description: "Significant founder capital and completed development." },
];

const terms = [
  ["Issuer", "Susumi Capital Corp, St Kitts and Nevis"],
  ["Round size", "£200,000; minimum close to be confirmed"],
  ["Instrument", "Ordinary shares only, no token allocation"],
  ["Valuation", "£1,400,000 pre-money; £1,600,000 post-money"],
  ["Equity offered", "12.5%"],
  ["Lead investor rights", "Board observer seat; quarterly reporting against milestones"],
  ["Minimum ticket and close", "To be confirmed"],
];

interface ValuationProps {
  onView: () => void;
}

export const Valuation = ({ onView }: ValuationProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) onView(); }, { threshold: 0.5 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [onView]);

  return (
    <section ref={sectionRef} id="valuation" className="section-anchor py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Valuation & <span className="gradient-text">Indicative Terms</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A pre-money valuation of £1,400,000, supported by completed technology, a licensed launch market and first-mover position.
        </p>

        <div className="max-w-6xl mx-auto">
          <Card className="p-8 mb-8 text-center bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
            <div className="text-sm text-muted-foreground mb-2">Pre-Money Valuation</div>
            <div className="text-4xl md:text-6xl font-bold gradient-text">£1,400,000</div>
            <div className="text-sm text-muted-foreground mt-3">£1,600,000 post-money following the £200,000 seed round (12.5% equity)</div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6 bg-card">
              <h3 className="text-xl font-semibold mb-4">Indicative Terms</h3>
              <div className="divide-y divide-border">
                {terms.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-5 gap-4 py-3 text-sm">
                    <div className="col-span-2 text-muted-foreground">{k}</div>
                    <div className="col-span-3 font-medium">{v}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">Indicative only and subject to contract.</p>
            </Card>

            <div>
              <h3 className="text-xl font-semibold mb-4">What supports the valuation</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {supports.map((item) => (
                  <Card key={item.title} className="p-5 bg-card hover:border-primary/40 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="font-semibold mb-1">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
