import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";

const milestones = [
  { title: "Round closed", period: "Month 1", status: "upcoming", description: "Funds received, audit scoped, filings started." },
  { title: "Audit complete", period: "Months 2–3", status: "upcoming", description: "Findings fixed and re-checked." },
  { title: "Regulatory sign-off", period: "Month 4", status: "upcoming", description: "SEC launch filings accepted." },
  { title: "Mainnet launch", period: "Months 4–5", status: "upcoming", description: "Basic Susu Fund live in Nigeria." },
  { title: "First traction", period: "Month 6", status: "upcoming", description: "First funds and Subscribers, targets set at close." }
];

const completed = [
  "Testnet with 1,400 registered users (April–July 2025)",
  "SEC Nigeria crowdfunding licence, effective 18 August 2025",
  "Migration to NEAR Protocol with NEAR Auth onboarding",
  "Basic Susu Fund demonstrated end to end, through to NFTs"
];

const afterLaunch = [
  "Enterprise, Community and Advanced fund types on the same contracts",
  "New African markets through local licence holders under franchise",
  "Latin America and diaspora markets, then the P2P NFC payments app"
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
          Roadmap & <span className="gradient-text">Milestones</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Timed from the close of this round. Each milestone is a reporting point for investors, and spending is released against them.
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

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mt-8">
          <Card className="p-6 bg-primary/5 border-primary/20">
            <h3 className="text-lg font-semibold mb-3">Completed</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {completed.map((c) => (<li key={c} className="flex gap-2"><CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />{c}</li>))}
            </ul>
          </Card>
          <Card className="p-6 bg-card">
            <h3 className="text-lg font-semibold mb-3">After launch</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {afterLaunch.map((c) => (<li key={c} className="flex gap-2"><Circle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />{c}</li>))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
};
