import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { FileText, LineChart, Timer, Scale } from "lucide-react";

const notes = [
  { icon: FileText, title: "The offer", text: "Shares are issued by Susumi Capital Corp, incorporated in St Kitts and Nevis. The company owns the Susumi IP and is franchisor to local licence holders. This round is equity only: no SUSU+ tokens are offered." },
  { icon: LineChart, title: "Forecasts", text: "The growth scenarios and the financial forecast are separate management models with different assumptions. Both are measured from commercial launch. They are not audited, independently verified, or combined into one forecast." },
  { icon: Timer, title: "Break-even and runway", text: "Month 4 post-launch break-even is a management assumption; the growth model shows Month 9. Annual totals do not establish monthly cash break-even. Runway is stated at the planned monthly burn." },
  { icon: Scale, title: "Your own advice", text: "Investors should take their own legal, tax and financial advice, including on the rules that apply where they live." },
];

export const ReadingNotes = ({ onView }: { onView: () => void }) => {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) onView(); }, { threshold: 0.5 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [onView]);

  return (
    <section ref={sectionRef} id="reading-notes" className="section-anchor py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Investor <span className="gradient-text">Reading Notes</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          This presentation replaces the 2025 edition. Please read these notes before the figures that follow.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {notes.map((n) => (
            <Card key={n.title} className="p-6 bg-card">
              <n.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-lg font-semibold mb-2">{n.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{n.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
