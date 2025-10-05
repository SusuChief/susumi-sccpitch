import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, Phone } from "lucide-react";
import dashboardImg from "@/assets/dashboard-screenshot.png";

interface ClosingProps {
  onView: () => void;
  onCTAClick: (label: string) => void;
}

export const Closing = ({ onView, onCTAClick }: ClosingProps) => {
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
      id="closing" 
      className="section-anchor py-20 px-4 bg-secondary/30"
    >
      <div className="container mx-auto max-w-4xl">
        <Card className="p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Seize This <span className="gradient-text">Unique Moment</span>
          </h2>
          
          <blockquote className="text-lg text-center italic text-muted-foreground mb-8 leading-relaxed">
            "Investing in Susumi is a chance to pioneer the future of cryptocurrency in one of the world's most dynamic economies. 
            By launching a regulated DeFi App in Nigeria, we establish ourselves as a trusted player in a market ready for innovation 
            and inclusive growth, but Nigeria is only the beginning. Your investment today not only fuels our immediate launch but also 
            supports our mission to democratize access to capital, empowering individuals, strengthening communities, and stimulating 
            local economies in Nigeria and beyond. Together, we can seize this unique moment, maintain momentum, and replicate this model 
            globally to unlock opportunities for millions who have been excluded from traditional finance."
          </blockquote>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 hover-glow group"
              onClick={() => onCTAClick("Book Meeting - Final CTA")}
            >
              Schedule Your Meeting
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6"
              onClick={() => onCTAClick("Request DDR - Final CTA")}
            >
              Request Data Room
            </Button>
          </div>

          <div className="border-t border-border pt-8 space-y-4 text-center">
            <h3 className="text-xl font-semibold mb-6">Live Platform Preview</h3>
            <a 
              href="https://stage.susumi.io/dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block mb-8 rounded-lg overflow-hidden border border-border hover:border-primary transition-colors"
            >
              <img 
                src={dashboardImg} 
                alt="Susumi Platform Dashboard" 
                className="w-full h-auto"
              />
            </a>
            
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm">
              <a 
                href="mailto:info@susumicapital.com"
                className="flex items-center gap-2 text-primary hover:text-primary-glow transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@susumicapital.com
              </a>
              <a 
                href="tel:+447501785599"
                className="flex items-center gap-2 text-primary hover:text-primary-glow transition-colors"
              >
                <Phone className="h-4 w-4" />
                +44 7501 785599
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              www.susumicapital.com • App Testnet: www.stage.susumi.io
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
