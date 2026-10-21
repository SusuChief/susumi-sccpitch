import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  value: string;
  label: string;
  description: string;
}

const MetricCard = ({ value, label, description }: MetricCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Card 
      ref={ref}
      className={`p-6 bg-card hover-glow transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
        {value}
      </div>
      <div className="text-lg font-semibold mb-2">{label}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </Card>
  );
};

interface MarketMetricsProps {
  onView: () => void;
}

export const MarketMetrics = ({ onView }: MarketMetricsProps) => {
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
      id="market" 
      className="section-anchor py-20 px-4"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Market in <span className="gradient-text">Numbers</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Massive global opportunity at the intersection of crypto adoption and digital crowdfunding
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            value="£152.97B+"
            label="Sub-Saharan Africa Crypto Value"
            description="On-chain value received, July 2024–June 2025 (Chainalysis 2025 report)"
          />
          <MetricCard
            value="£68.72B+"
            label="Nigerian Crypto Value"
            description="Over £68.72B in on-chain value received, July 2024–June 2025 (Chainalysis 2025 report)"
          />
          <MetricCard
            value="£1.60B"
            label="Global Crowdfunding"
            description="2024 market-size estimate; £4.13B forecast for 2030 (Grand View Research). Not total campaign funding."
          />
          <MetricCard
            value="2B"
            label="Underbanked Population"
            description="People globally lacking institutional credit access"
          />
          <MetricCard
            value="400M"
            label="Cooperative Finance Users"
            description="People practicing cooperative finance in Africa, LatAm, and Asia"
          />
          <MetricCard
            value="47%"
            label="Nigerian Crypto Adoption Rate"
            description="Of Nigerians aged 18-64 have used cryptocurrency"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-8 text-center">Sources: <a className="text-primary underline" href="https://www.chainalysis.com/blog/subsaharan-africa-crypto-adoption-2025/" target="_blank" rel="noopener noreferrer">Chainalysis 2025</a> • <a className="text-primary underline" href="https://www.grandviewresearch.com/industry-analysis/crowdfunding-market" target="_blank" rel="noopener noreferrer">Grand View Research</a>. GBP at £0.7462 per US$1, 21 October 2026. Non-monetary audience figures remain management references.</p>
      </div>
    </section>
  );
};
