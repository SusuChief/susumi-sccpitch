import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import samIgweImg from "@/assets/team/sam-igwe.jpg";
import johnOtiImg from "@/assets/team/john-oti.jpg";
import okeyIgweImg from "@/assets/team/okey-emmanuel-igwe.jpg";
import keithBensonImg from "@/assets/team/keith-benson.jpg";
import johnOndomaImg from "@/assets/team/john-ondoma.jpg";
import ucheAnyanwuImg from "@/assets/team/uche-anyanwu.jpg";
import felixAchibiriImg from "@/assets/team/felix-achibiri.jpg";

const team = [
  {
    name: "Sam Igwe",
    role: "Founder & CEO",
    bio: "Experienced Tech Consultant with a passion for social finance.",
    image: samIgweImg,
    linkedin: "https://www.linkedin.com/in/samigwe-susumi/"
  },
  {
    name: "Dr John Oti",
    role: "Founder & CTO",
    bio: "DSc in Electrophysics, Computer Science & System Science",
    image: johnOtiImg,
    linkedin: "https://www.linkedin.com/in/john-oti-3117621"
  },
  {
    name: "Emmanuel Igwe",
    role: "Founder & CMO",
    bio: "Founded and exited multiple digital media businesses",
    image: okeyIgweImg,
    linkedin: "https://www.linkedin.com/in/emmanuel-igwe/"
  },
  {
    name: "Keith Benson",
    role: "Advisor",
    bio: "Holds International Patent and IP NFC to IoT blockchain protocols",
    image: keithBensonImg,
    linkedin: "https://www.linkedin.com/in/keith-benson-a61aaa12/"
  },
  {
    name: "John Ondoma",
    role: "CFO - Nigeria",
    bio: "Pioneer of the Mobile Money industry in Nigeria",
    image: johnOndomaImg,
    linkedin: "https://www.linkedin.com/in/john-o-ondoma/"
  },
  {
    name: "Uche Anyanwu",
    role: "Head of Legal - Nigeria",
    bio: "Experienced Nigerian Attorney with over 30yrs expertise in corporate law",
    image: ucheAnyanwuImg,
    linkedin: "https://www.linkedin.com/in/uchenna-anyanwu-cmc-fimc-94b24937/"
  },
  {
    name: "Felix Achibiri",
    role: "Advisor",
    bio: "Harvard Alum and ex-Chairman Fortis Microfinance Bank",
    image: felixAchibiriImg,
    linkedin: "https://www.linkedin.com/in/felixachibiri/"
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
          Meet the <span className="gradient-text font-goldman">SUSUMI</span> Team
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
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <div className="text-primary text-sm font-medium mb-3">{member.role}</div>
              <p className="text-sm text-muted-foreground mb-3">{member.bio}</p>
              {member.linkedin && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => window.open(member.linkedin, '_blank')}
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
