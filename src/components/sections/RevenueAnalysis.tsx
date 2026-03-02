import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

interface RevenueAnalysisProps {
  onView: () => void;
}

export const RevenueAnalysis = ({ onView }: RevenueAnalysisProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onView();
          // Autoplay muted when in viewport
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
            setHasInteracted(true);
          }
        } else {
          // Pause when out of viewport
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onView]);

  const handleMouseEnter = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setHasInteracted(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="revenue-analysis"
      className="section-anchor py-20 px-4"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Revenue <span className="gradient-text">Analysis</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          An AI-generated video presentation validating the Susumi revenue projections
        </p>

        <Card
          className="relative overflow-hidden bg-card hover-glow"
          onMouseEnter={handleMouseEnter}
        >
          <div className="relative aspect-video">
            <video
              ref={videoRef}
              src="/videos/The_Susumi_Real-Yield_Engine_2.mp4"
              muted
              playsInline
              controls={hasInteracted}
              preload="metadata"
              className="w-full h-full object-contain bg-black"
            />
            {/* Play overlay when not yet interacted */}
            {!hasInteracted && (
              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.play().catch(() => {});
                    setHasInteracted(true);
                  }
                }}
                className="absolute inset-0 flex items-center justify-center bg-background/40 group cursor-pointer"
                aria-label="Play revenue analysis video"
              >
                <div className="rounded-full bg-primary/90 p-6 hover:scale-110 transition-transform shadow-lg">
                  <Play className="h-10 w-10 text-primary-foreground fill-primary-foreground" />
                </div>
              </button>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};
