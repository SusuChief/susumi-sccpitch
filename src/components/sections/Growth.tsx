import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const scenarios = {
  conservative: {
    year1: {
      users: "74,327",
      fundsPerMonth: "4,751",
      avgFundSize: "$1,850",
      annualRevenue: "$2.1M",
      roi: "1.8x"
    },
    year2: {
      users: "1.7M",
      fundsPerMonth: "83,300",
      avgFundSize: "$1,850",
      annualRevenue: "$298M",
      roi: "248x"
    },
    year3: {
      users: "12.8M",
      fundsPerMonth: "993,978",
      avgFundSize: "$1,850",
      annualRevenue: "$3.03B",
      roi: "2,526x"
    }
  },
  base: {
    year1: {
      users: "74,327",
      fundsPerMonth: "4,751",
      avgFundSize: "$1,850",
      annualRevenue: "$2.1M",
      roi: "1.8x"
    },
    year2: {
      users: "1.7M",
      fundsPerMonth: "83,300",
      avgFundSize: "$1,850",
      annualRevenue: "$298M",
      roi: "248x"
    },
    year3: {
      users: "12.8M",
      fundsPerMonth: "993,978",
      avgFundSize: "$1,850",
      annualRevenue: "$3.03B",
      roi: "2,526x"
    }
  },
  aggressive: {
    year1: {
      users: "100,000",
      fundsPerMonth: "7,000",
      avgFundSize: "$2,500",
      annualRevenue: "$5.2M",
      roi: "4.3x"
    },
    year2: {
      users: "3M",
      fundsPerMonth: "150,000",
      avgFundSize: "$2,200",
      annualRevenue: "$580M",
      roi: "483x"
    },
    year3: {
      users: "20M",
      fundsPerMonth: "1.5M",
      avgFundSize: "$2,500",
      annualRevenue: "$5.6B",
      roi: "4,667x"
    }
  }
};

const monthlyRevenueData = [
  { month: "M1", revenue: 2.76, expenses: 46.85 },
  { month: "M2", revenue: 9.21, expenses: 38.35 },
  { month: "M3", revenue: 27.64, expenses: 48.92 },
  { month: "M4", revenue: 33.17, expenses: 63.52 },
  { month: "M5", revenue: 39.80, expenses: 55.00 },
  { month: "M6", revenue: 47.76, expenses: 83.00 },
  { month: "M7", revenue: 57.31, expenses: 84.41 },
  { month: "M8", revenue: 68.77, expenses: 79.94 },
  { month: "M9", revenue: 188.96, expenses: 48.00 },
  { month: "M10", revenue: 301.75, expenses: 35.50 },
  { month: "M11", revenue: 497.10, expenses: 35.00 },
  { month: "M12", revenue: 839.52, expenses: 34.50 }
];

const cumulativeData = [
  { month: "M1", cumRevenue: 2.76, cumExpenses: 46.85, cumProfit: -44.09 },
  { month: "M2", cumRevenue: 11.97, cumExpenses: 85.20, cumProfit: -73.23 },
  { month: "M3", cumRevenue: 39.61, cumExpenses: 134.12, cumProfit: -94.51 },
  { month: "M4", cumRevenue: 72.78, cumExpenses: 197.64, cumProfit: -124.86 },
  { month: "M5", cumRevenue: 112.58, cumExpenses: 252.64, cumProfit: -140.06 },
  { month: "M6", cumRevenue: 160.34, cumExpenses: 335.64, cumProfit: -175.30 },
  { month: "M7", cumRevenue: 217.65, cumExpenses: 420.05, cumProfit: -202.40 },
  { month: "M8", cumRevenue: 286.42, cumExpenses: 499.99, cumProfit: -213.57 },
  { month: "M9", cumRevenue: 475.38, cumExpenses: 547.99, cumProfit: -72.61 },
  { month: "M10", cumRevenue: 777.13, cumExpenses: 583.49, cumProfit: 193.64 },
  { month: "M11", cumRevenue: 1274.23, cumExpenses: 618.49, cumProfit: 655.74 },
  { month: "M12", cumRevenue: 2113.75, cumExpenses: 652.99, cumProfit: 1460.76 }
];

const yearlyProjections = [
  { year: "Year 1", revenue: 2.1, expenses: 0.65, profit: 1.45 },
  { year: "Year 2", revenue: 298, expenses: 11, profit: 287 },
  { year: "Year 3", revenue: 3031, expenses: 20, profit: 3011 }
];

interface GrowthProps {
  onView: () => void;
}

export const Growth = ({ onView }: GrowthProps) => {
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
      id="growth" 
      className="section-anchor py-20 px-4"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Growth Models & <span className="gradient-text">Projections</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Conservative financial projections showing clear path to profitability
        </p>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Revenue Drivers */}
          <Card className="p-8 bg-card">
            <h3 className="text-2xl font-semibold mb-6">Revenue Drivers</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="font-semibold mb-1">Platform Fees</div>
                <div className="text-muted-foreground">8.3% basic, 5.3% enterprise, 6.5% community</div>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="font-semibold mb-1">NFT Sales</div>
                <div className="text-muted-foreground">$250 avg • 16 characters × 10,000 units</div>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="font-semibold mb-1">Token Utility</div>
                <div className="text-muted-foreground">Revenue share, staking, governance</div>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="font-semibold mb-1">User Growth</div>
                <div className="text-muted-foreground">30% monthly growth rate</div>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="font-semibold mb-1">Fund Volume</div>
                <div className="text-muted-foreground">$1,850 avg basic fund size</div>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="font-semibold mb-1">Market Expansion</div>
                <div className="text-muted-foreground">Nigeria → Africa → Global</div>
              </div>
            </div>
          </Card>

          {/* Year-by-Year Scenarios */}
          <Card className="p-8 bg-card">
            <h3 className="text-2xl font-semibold mb-6">Multi-Year Growth Scenarios</h3>
            
            <Tabs defaultValue="year1" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="year1">Year 1</TabsTrigger>
                <TabsTrigger value="year2">Year 2</TabsTrigger>
                <TabsTrigger value="year3">Year 3</TabsTrigger>
              </TabsList>
              
              {/* Year 1 */}
              <TabsContent value="year1" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {Object.entries(scenarios).map(([key, data]) => (
                    <Card key={key} className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                      <h4 className="text-lg font-bold mb-4 capitalize gradient-text">{key}</h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <div className="text-2xl font-bold">{data.year1.users}</div>
                          <div className="text-muted-foreground">Users</div>
                        </div>
                        <div>
                          <div className="text-xl font-semibold">{data.year1.fundsPerMonth}</div>
                          <div className="text-muted-foreground">Funds/Year</div>
                        </div>
                        <div>
                          <div className="text-xl font-semibold text-primary">{data.year1.annualRevenue}</div>
                          <div className="text-muted-foreground">Revenue</div>
                        </div>
                        <div>
                          <div className="text-xl font-semibold text-accent">{data.year1.roi}</div>
                          <div className="text-muted-foreground">ROI</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Year 2 */}
              <TabsContent value="year2" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {Object.entries(scenarios).map(([key, data]) => (
                    <Card key={key} className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                      <h4 className="text-lg font-bold mb-4 capitalize gradient-text">{key}</h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <div className="text-2xl font-bold">{data.year2.users}</div>
                          <div className="text-muted-foreground">Users</div>
                        </div>
                        <div>
                          <div className="text-xl font-semibold">{data.year2.fundsPerMonth}</div>
                          <div className="text-muted-foreground">Funds/Year</div>
                        </div>
                        <div>
                          <div className="text-xl font-semibold text-primary">{data.year2.annualRevenue}</div>
                          <div className="text-muted-foreground">Revenue</div>
                        </div>
                        <div>
                          <div className="text-xl font-semibold text-accent">{data.year2.roi}</div>
                          <div className="text-muted-foreground">ROI</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Year 3 */}
              <TabsContent value="year3" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {Object.entries(scenarios).map(([key, data]) => (
                    <Card key={key} className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                      <h4 className="text-lg font-bold mb-4 capitalize gradient-text">{key}</h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <div className="text-2xl font-bold">{data.year3.users}</div>
                          <div className="text-muted-foreground">Users</div>
                        </div>
                        <div>
                          <div className="text-xl font-semibold">{data.year3.fundsPerMonth}</div>
                          <div className="text-muted-foreground">Funds/Year</div>
                        </div>
                        <div>
                          <div className="text-xl font-semibold text-primary">{data.year3.annualRevenue}</div>
                          <div className="text-muted-foreground">Revenue</div>
                        </div>
                        <div>
                          <div className="text-xl font-semibold text-accent">{data.year3.roi}</div>
                          <div className="text-muted-foreground">ROI</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Break-Even Analysis */}
          <Card className="p-8 bg-card">
            <h3 className="text-2xl font-semibold mb-6">Year 1 Break-Even Analysis</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Cumulative Cash Flow</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={cumulativeData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => `$${value.toFixed(1)}K`}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="cumRevenue" stroke="hsl(var(--primary))" strokeWidth={2} name="Revenue" />
                    <Line type="monotone" dataKey="cumExpenses" stroke="hsl(var(--destructive))" strokeWidth={2} name="Expenses" />
                    <Line type="monotone" dataKey="cumProfit" stroke="hsl(var(--accent))" strokeWidth={3} name="Net" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg border border-accent/30">
                  <div className="text-sm text-muted-foreground mb-1">Break-Even Month</div>
                  <div className="text-4xl font-bold text-accent mb-2">Month 9</div>
                  <div className="text-sm">Positive cash flow achieved</div>
                </div>
                
                <div className="p-6 bg-secondary/30 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Total Capital Required</div>
                  <div className="text-3xl font-bold mb-2">$548K</div>
                  <div className="text-sm">Peak cash requirement through break-even</div>
                </div>
                
                <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-sm text-muted-foreground mb-1">Year 1 Net Profit</div>
                  <div className="text-3xl font-bold text-primary mb-2">$1.46M</div>
                  <div className="text-sm">After all expenses</div>
                </div>
              </div>
            </div>
          </Card>

          {/* 3-Year Financial Overview */}
          <Card className="p-8 bg-card">
            <h3 className="text-2xl font-semibold mb-6">3-Year Financial Overview</h3>
            <div className="mb-8">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={yearlyProjections}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => `$${value}M`}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Revenue" />
                  <Bar dataKey="expenses" fill="hsl(var(--destructive))" radius={[8, 8, 0, 0]} name="Expenses" />
                  <Bar dataKey="profit" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} name="Net Profit" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-secondary/30 rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">Year 1</div>
                <div className="text-3xl font-bold mb-1">$2.1M</div>
                <div className="text-sm text-accent font-semibold">+$1.46M profit</div>
                <div className="text-xs text-muted-foreground mt-2">74K users • Break-even M9</div>
              </div>
              
              <div className="p-6 bg-secondary/30 rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">Year 2</div>
                <div className="text-3xl font-bold mb-1">$298M</div>
                <div className="text-sm text-accent font-semibold">+$287M profit</div>
                <div className="text-xs text-muted-foreground mt-2">1.7M users • 96% margin</div>
              </div>
              
              <div className="p-6 bg-secondary/30 rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">Year 3</div>
                <div className="text-3xl font-bold mb-1">$3.03B</div>
                <div className="text-sm text-accent font-semibold">+$3.01B profit</div>
                <div className="text-xs text-muted-foreground mt-2">12.8M users • 99% margin</div>
              </div>
            </div>
          </Card>

          {/* Funding Runway */}
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <h3 className="text-2xl font-semibold mb-6">Funding Runway & Milestones</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">$1.2M Raise Allocation</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-background/50 rounded">
                    <span className="text-sm">Product Development</span>
                    <span className="font-semibold">$400K (33%)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background/50 rounded">
                    <span className="text-sm">Marketing & User Acquisition</span>
                    <span className="font-semibold">$300K (25%)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background/50 rounded">
                    <span className="text-sm">Legal & Compliance</span>
                    <span className="font-semibold">$250K (21%)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background/50 rounded">
                    <span className="text-sm">Operations & Infrastructure</span>
                    <span className="font-semibold">$150K (12%)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background/50 rounded">
                    <span className="text-sm">Reserve/Contingency</span>
                    <span className="font-semibold">$100K (8%)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Key Milestones</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Q1 2025: Platform Launch</div>
                      <div className="text-muted-foreground">MVP release in Nigeria with SEC approval</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Q2 2025: User Growth</div>
                      <div className="text-muted-foreground">Reach 20K active users, $1M+ in funds</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Q3 2025: Break-Even</div>
                      <div className="text-muted-foreground">Achieve positive cash flow (Month 9)</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Q4 2025: NFT Launch</div>
                      <div className="text-muted-foreground">Release Phase 2 NFTs, scale to 74K users</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">2026: Regional Expansion</div>
                      <div className="text-muted-foreground">Scale to 1.7M users, $298M revenue</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
