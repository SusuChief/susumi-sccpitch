import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

const team = [
  {
    name: "Sam Igwe",
    role: "Founder & CEO",
    bio: "Experienced Tech Consultant with a passion for social finance."
  },
  {
    name: "Dr John Oti",
    role: "Founder & CTO",
    bio: "DSc in Electrophysics, Computer Science & System Science"
  },
  {
    name: "Emmanuel Igwe",
    role: "Founder & CMO",
    bio: "Founded and exited multiple digital media businesses"
  },
  {
    name: "Keith Benson",
    role: "Advisor",
    bio: "Holds International Patent and IP NFC to IoT blockchain protocols"
  },
  {
    name: "John Ondoma",
    role: "CFO - Nigeria",
    bio: "Pioneer of the Mobile Money industry in Nigeria"
  },
  {
    name: "Uche Anyanwu",
    role: "Head of Legal - Nigeria",
    bio: "Experienced Nigerian Attorney with over 30yrs expertise in corporate law"
  },
  {
    name: "Felix Achibiri",
    role: "Advisor",
    bio: "Harvard Alum and ex-Chairman Fortis Microfinance Bank"
  }
];

interface TeamProps {
  onView: () => void;
}

export const Team = ({ onView }: TeamProps) => {
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
      id="team" 
      className="section-anchor py-20 px-4"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Meet the <span className="gradient-text">Susumi</span> Team
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Experienced leaders in technology, finance, and blockchain innovation
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <Card 
              key={index}
              className="p-6 bg-card hover-glow text-center"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-white">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <div className="text-primary text-sm font-medium mb-3">{member.role}</div>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
