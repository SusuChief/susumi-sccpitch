import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import susumiLogo from "@/assets/susumi-corporate-logo.png";

interface HeroProps {
  onCTAClick: (label: string) => void;
}

export const Hero = ({ onCTAClick }: HeroProps) => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(13, 17, 23, 0.85), rgba(13, 17, 23, 0.9)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <img 
            src={susumiLogo} 
            alt="Susumi"
            className="h-20 mx-auto mb-8"
          />
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            A Groundbreaking Opportunity in the
            <br />
            African <span className="gradient-text">Cryptocurrency Market</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Blockchain-powered crowdfunding revolutionizing access to capital. 
            Launching in Nigeria's $56.7B crypto market with SEC approval.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 hover-glow group"
              onClick={() => onCTAClick("Book a Meeting")}
            >
              Book a Meeting
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 bg-secondary/50 backdrop-blur-sm"
              onClick={() => onCTAClick("Request Data Room Access")}
            >
              Request Data Room Access
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
            <div className="space-y-2">
              <div className="text-4xl font-bold gradient-text">$1.2M</div>
              <div className="text-sm text-muted-foreground">Capital Raise</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold gradient-text">15%</div>
              <div className="text-sm text-muted-foreground">Equity Offered</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold gradient-text">500M</div>
              <div className="text-sm text-muted-foreground">SUSU+ Tokens</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold gradient-text">$3.1B</div>
              <div className="text-sm text-muted-foreground">Y3 Gross Volume</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
