import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const flow = [
  { n: "01", title: "Funds raised", text: "Fund Creators raise in USDT, USDC or cNGN" },
  { n: "02", title: "Platform fee", text: "8.3% / 5% / 3.1% of each successful fund, by fund type" },
  { n: "03", title: "Franchise split", text: "Susumi Nigeria receives 10% of gross platform earnings; the balance goes to Susumi Capital Corp" },
  { n: "04", title: "Shareholder value", text: "The company grows with each new country licensee" },
];

export const Structure = ({ onView }: { onView: () => void }) => {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) onView(); }, { threshold: 0.5 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [onView]);

  return (
    <section ref={sectionRef} id="structure" className="section-anchor py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Structure & <span className="gradient-text">Shareholder Value</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Investors hold shares in the company that owns the technology. Users and operations are in Africa, through locally licensed partners.
        </p>

        <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-4 mb-10">
          <Card className="p-6 bg-card">
            <div className="font-semibold mb-1">Shareholders</div>
            <div className="text-sm text-muted-foreground">Existing shareholders (87.5%) and new seed investors (12.5%)</div>
          </Card>
          <ArrowRight className="hidden md:block h-6 w-6 text-primary mx-auto" />
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
            <div className="text-xs font-semibold tracking-widest text-primary mb-1">ISSUER</div>
            <div className="font-semibold mb-1">Susumi Capital Corp</div>
            <div className="text-sm text-muted-foreground">Owns the Susumi IP and technology. Franchisor to every country licensee.</div>
          </Card>
          <ArrowRight className="hidden md:block h-6 w-6 text-primary mx-auto" />
          <Card className="p-6 bg-card">
            <div className="font-semibold mb-1">Susumi Capital Index</div>
            <div className="text-sm text-muted-foreground">Nigeria. Holds the SEC licence and operates under franchise. Future markets follow the same model.</div>
          </Card>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flow.map((f) => (
            <Card key={f.n} className="p-6 bg-card relative">
              <div className="text-3xl font-bold text-primary/30 mb-2">{f.n}</div>
              <div className="font-semibold mb-1">{f.title}</div>
              <div className="text-sm text-muted-foreground">{f.text}</div>
            </Card>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center mt-8 max-w-3xl mx-auto">
          40% of platform fees are shared with locked SUSU+ in the Validator Panel. Exit routes include acquisition by a fintech, bank or exchange seeking a licensed African crowdfunding rail, or a later priced round.
        </p>
      </div>
    </section>
  );
};
