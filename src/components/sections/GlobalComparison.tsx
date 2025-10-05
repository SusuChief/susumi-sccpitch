import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const comparisonData = [
  { country: "India", rank: 1, region: "CSAO" },
  { country: "Nigeria", rank: 2, region: "Sub-Saharan Africa" },
  { country: "Indonesia", rank: 3, region: "CSAO" },
  { country: "United States", rank: 4, region: "North America" },
  { country: "Vietnam", rank: 5, region: "CSAO" },
  { country: "United Kingdom", rank: 6, region: "Europe" },
  { country: "Philippines", rank: 7, region: "CSAO" },
  { country: "Pakistan", rank: 8, region: "CSAO" },
];

interface GlobalComparisonProps {
  onView: () => void;
}

export const GlobalComparison = ({ onView }: GlobalComparisonProps) => {
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
      id="global-comparison" 
      className="section-anchor py-20 px-4 bg-secondary/30"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Nigeria's <span className="gradient-text">Global Leadership</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Nigeria ranks #2 globally in the 2024 Chainalysis Global Crypto Adoption Index
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-card">
            <h3 className="text-2xl font-semibold mb-6">Top 8 Countries by Crypto Adoption</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis type="number" reversed domain={[0, 8]} />
                <YAxis type="category" dataKey="country" width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))' 
                  }}
                />
                <Bar dataKey="rank" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-8 bg-card">
            <h3 className="text-2xl font-semibold mb-4">Why Nigeria Leads</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="font-semibold">Highest in Sub-Saharan Africa</p>
                  <p className="text-sm text-muted-foreground">Nigeria dominates crypto adoption across the entire African continent</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="font-semibold">Top 5 Globally Across All Metrics</p>
                  <p className="text-sm text-muted-foreground">Ranks highly in centralized services, retail trading, and DeFi adoption</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="font-semibold">200M+ Population</p>
                  <p className="text-sm text-muted-foreground">Africa's largest economy with massive untapped market potential</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="font-semibold">Grassroots Adoption</p>
                  <p className="text-sm text-muted-foreground">Organic growth driven by remittances, savings, and cross-border payments</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Source: Chainalysis 2024 Global Crypto Adoption Index
          </p>
        </div>
      </div>
    </section>
  );
};
