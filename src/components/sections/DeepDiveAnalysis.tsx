import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Mic, Play } from "lucide-react";

interface DeepDiveAnalysisProps {
  onView: () => void;
}

const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/U_MVw-JFgCA?autoplay=1";

export const DeepDiveAnalysis = ({ onView }: DeepDiveAnalysisProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
      id="deep-dive"
      className="section-anchor py-20 px-4"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Deep Dive <span className="gradient-text">Analysis</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          An AI-generated podcast analyzing the financial viability of the Susumi business model
        </p>

        <Card className="relative overflow-hidden bg-card hover-glow">
          {!isPlaying ? (
            <button
              onClick={() => setIsPlaying(true)}
              className="relative w-full aspect-video cursor-pointer group"
              aria-label="Click to play deep dive analysis audio"
            >
              {/* Podcast studio background */}
              <img
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&q=80"
                alt="Podcast studio microphone"
                className="w-full h-full object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-background/60 group-hover:bg-background/40 transition-colors" />
              {/* Center play content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="rounded-full bg-primary/90 p-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Play className="h-10 w-10 text-primary-foreground fill-primary-foreground" />
                </div>
                <div className="flex items-center gap-2">
                  <Mic className="h-5 w-5 text-primary" />
                  <span className="text-lg font-semibold text-foreground">
                    Click To Play
                  </span>
                </div>
              </div>
            </button>
          ) : (
            <div className="aspect-video">
              <iframe
                src={YOUTUBE_EMBED_URL}
                title="Susumi Deep Dive Analysis"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};
