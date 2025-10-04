import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Hero } from "@/components/sections/Hero";
import { MarketMetrics } from "@/components/sections/MarketMetrics";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Products } from "@/components/sections/Products";
import { Tokenomics } from "@/components/sections/Tokenomics";
import { Investment } from "@/components/sections/Investment";
import { Growth } from "@/components/sections/Growth";
import { Competitive } from "@/components/sections/Competitive";
import { Roadmap } from "@/components/sections/Roadmap";
import { Team } from "@/components/sections/Team";
import { Risks } from "@/components/sections/Risks";
import { Closing } from "@/components/sections/Closing";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const initSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from("viewer_sessions").insert({
          user_id: user.id,
          email: user.email || ""
        }).select().single();
        
        if (data) {
          setSessionId(data.id);
        }
      }
    };
    initSession();
  }, []);

  const handleSectionView = async (slug: string) => {
    if (sessionId) {
      await supabase.from("section_views").insert({
        session_id: sessionId,
        section_slug: slug
      });
    }
  };

  const handleCTAClick = async (label: string) => {
    if (sessionId) {
      await supabase.from("cta_clicks").insert({
        session_id: sessionId,
        cta_label: label
      });
    }
    
    if (label.includes("Meeting")) {
      navigate("/meeting");
    } else if (label.includes("Data Room") || label.includes("DDR")) {
      navigate("/request-access");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 right-4 z-50"
        onClick={handleSignOut}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>

      <Hero onCTAClick={handleCTAClick} />
      <MarketMetrics onView={() => handleSectionView("market")} />
      <HowItWorks onView={() => handleSectionView("how-it-works")} />
      <Products onView={() => handleSectionView("products")} />
      <Tokenomics onView={() => handleSectionView("tokenomics")} />
      <Investment onView={() => handleSectionView("investment")} onCTAClick={handleCTAClick} />
      <Growth onView={() => handleSectionView("growth")} />
      <Competitive onView={() => handleSectionView("competitive")} />
      <Roadmap onView={() => handleSectionView("roadmap")} />
      <Team onView={() => handleSectionView("team")} />
      <Risks onView={() => handleSectionView("risks")} />
      <Closing onView={() => handleSectionView("closing")} onCTAClick={handleCTAClick} />
    </div>
  );
};

export default Home;
