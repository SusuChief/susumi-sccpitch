import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { BadgeCheck, Boxes, PlayCircle, Users } from "lucide-react";

const items = [
  { icon: BadgeCheck, title: "Licensed", text: "SEC Nigeria crowdfunding licence (LLG1), effective 18 August 2025, held by our partner Susumi Capital Index." },
  { icon: Boxes, title: "Rebuilt on NEAR", text: "Platform migrated from Polygon to NEAR Protocol, with NEAR Auth onboarding: no seed phrase, no gas, no custody of keys." },
  { icon: PlayCircle, title: "Product demoed", text: "Basic Susu Fund working end to end on NEAR testnet, through to NFTs." },
  { icon: Users, title: "Community", text: "About 18,000 followers; 1,400 users registered on the 2025 testnet." },
];

export const WhereWeAre = ({ onView }: { onView: () => void }) => {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) onView(); }, { threshold: 0.5 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [onView]);

  return (
    <section ref={sectionRef} id="where-we-are" className="section-anchor py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Where We Are <span className="gradient-text">Today</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          The product is built. This round funds the audit, regulatory sign-off and launch.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((i) => (
            <Card key={i.title} className="p-6 bg-primary/5 border-primary/20 hover-glow">
              <div className="text-xs font-semibold tracking-widest text-primary mb-3">✓ DONE</div>
              <i.icon className="h-10 w-10 text-primary mb-3" />
              <h3 className="text-xl font-semibold mb-2">{i.title}</h3>
              <p className="text-sm text-muted-foreground">{i.text}</p>
            </Card>
          ))}
        </div>
        <Card className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 max-w-4xl mx-auto">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">What has changed since 2025.</span> The roadmap is now one product first, the Basic Susu Fund. The platform rewrite is complete, so this capital goes to launching rather than building.
          </p>
        </Card>
      </div>
    </section>
  );
};
