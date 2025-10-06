import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

const comparisonData = [
  { country: "India", rank: 1, height: 10, region: "Central & Southern Asia and Oceania" },
  { country: "Nigeria", rank: 2, height: 9, region: "Sub-Saharan Africa" },
  { country: "Indonesia", rank: 3, height: 8, region: "Central & Southern Asia and Oceania" },
  { country: "United States", rank: 4, height: 7, region: "North America" },
  { country: "Vietnam", rank: 5, height: 6, region: "Central & Southern Asia and Oceania" },
  { country: "Ukraine", rank: 6, height: 5, region: "Eastern Europe" },
  { country: "Russia", rank: 7, height: 4, region: "Eastern Europe" },
  { country: "Philippines", rank: 8, height: 3, region: "Central & Southern Asia and Oceania" },
  { country: "", rank: 9, height: 2, region: "" },
  { country: "", rank: 10, height: 1, region: "" },
];

const countryColors = [
  "hsl(221, 83%, 53%)",  // India - Blue
  "hsl(142, 76%, 36%)",  // Nigeria - Green (primary)
  "hsl(280, 81%, 60%)",  // Indonesia - Violet
  "hsl(346, 77%, 50%)",  // USA - Red
  "hsl(262, 83%, 58%)",  // Vietnam - Purple
  "hsl(48, 96%, 53%)",   // Ukraine - Yellow
  "hsl(173, 58%, 39%)",  // Russia - Teal
  "hsl(142, 71%, 45%)",  // Philippines - Emerald
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
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={comparisonData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis type="number" domain={[0, 10]} />
                <YAxis type="category" dataKey="country" width={100} />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))' 
                  }}
                  formatter={(value: any, name: any, props: any) => [`Rank #${props.payload.rank}`, 'Global Rank']}
                />
                <Bar dataKey="height" radius={[0, 4, 4, 0]}>
                  {comparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={countryColors[index]} />
                  ))}
                </Bar>
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
                  <p className="text-sm text-muted-foreground">Nigeria dominates crypto adoption across the entire African continent, and is number two globally.</p>
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
