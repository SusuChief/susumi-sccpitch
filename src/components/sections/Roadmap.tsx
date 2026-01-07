import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";

const milestones = [
  {
    title: "Testnet Complete",
    period: "Apr-Jul 2025",
    status: "completed",
    description: "Susumi App Testnet successfully completed with 1,400 registered users. Technical adjustments made before mainnet migration."
  },
  {
    title: "SEC License Secured",
    period: "Aug 2025",
    status: "completed",
    description: "First blockchain crowdfunding platform licensed by Nigerian SEC. LLG1 Crowdfunding License effective from August 18, 2025."
  },
  {
    title: "Token Launch",
    period: "Feb 2026",
    status: "upcoming",
    description: "SUSU+ Token listed on 2 leading crypto exchanges. Initial circulating supply: 1 Billion tokens (1% of total). Planned 2 weeks before app launch."
  },
  {
    title: "Nigeria Launch",
    period: "March 2026",
    status: "upcoming",
    description: "Commercial launch in Nigeria with existing 20,000+ community followers and 1,400 registered users as first adopters."
  },
  {
    title: "Global Expansion",
    period: "Jun 2026",
    status: "upcoming",
    description: "Launch in Kenya, Ghana, Venezuela, Brazil, and Mexico. Introduce Susumi P2P App for off-chain crypto transfers via NFC."
  }
];

interface RoadmapProps {
  onView: () => void;
}

export const Roadmap = ({ onView }: RoadmapProps) => {
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
      id="roadmap" 
      className="section-anchor py-20 px-4 bg-secondary/30"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Product <span className="gradient-text">Roadmap</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Phased rollout from Nigeria first, then expansion into Africa, LatAm, and diaspora markets
        </p>

        <div className="max-w-4xl mx-auto space-y-6">
          {milestones.map((milestone, index) => (
            <Card 
              key={index}
              className={`p-6 hover-glow ${
                milestone.status === 'completed' 
                  ? 'bg-primary/5 border-primary/20' 
                  : 'bg-card'
              }`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  {milestone.status === 'completed' ? (
                    <CheckCircle className="h-8 w-8 text-primary" />
                  ) : (
                    <Circle className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold">{milestone.title}</h3>
                    <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                      {milestone.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{milestone.description}</p>
                  {milestone.status === 'completed' && (
                    <div className="mt-2 text-sm text-primary font-semibold">
                      ✓ Completed
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
