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
            value="$5.4T"
            label="Global Crypto Transactions"
            description="Global cryptocurrency transaction volume in 2023"
          />
          <MetricCard
            value="$56.7B"
            label="Nigerian Crypto Value"
            description="Cryptocurrency transactions in Nigeria in 2023"
          />
          <MetricCard
            value="$43B"
            label="Global Crowdfunding"
            description="Expected crowdfunding market size by 2028"
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
            label="Nigerian Adoption Rate"
            description="Of Nigerians aged 18-64 have used cryptocurrency"
          />
        </div>
      </div>
    </section>
  );
};
