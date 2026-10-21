import { currencyNote } from "@/lib/financial-reference";
import { useEffect } from "react";
import { ArrowLeft, TrendingUp, Shield, Users, Coins, Calendar, CheckCircle, DollarSign, BarChart3, Zap, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const Financials = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("susumi_access") !== "granted") {
      navigate("/", { replace: true });
    }
  }, [navigate]);
  const revenueData = [
    { metric: "Monthly Active Susu Funds", y2025: "0 (Beta)", y2026: "4,000", y2027: "12,000", y2028: "20,000+" },
    { metric: "Average Value per Fund", y2025: "—", y2026: "£1,380.47", y2027: "£1,380.47", y2028: "£1,380.47–£1,567.02" },
    { metric: "Annual Fund Volume (TVL)", y2025: "—", y2026: "£66.26256M", y2027: "£198.78768M", y2028: "£335.79M–£388.024M" },
    { metric: "Platform Fee Revenue", y2025: "—", y2026: "£5.49203M", y2027: "£16.49102M", y2028: "£27.6094M–£32.8328M" },
    { metric: "NFT Revenue", y2025: "—", y2026: "£1.1193M", y2027: "£124.6154M", y2028: "£179.088M" },
    { metric: "Total Revenue", y2025: "—", y2026: "£6.64118M", y2027: "£141.10642M", y2028: "£208.936M–£238.784M", highlight: true },
  ];

  const costData = [
    { category: "Technical Development & Maintenance", y2026: "£0.89544M", y2027: "£1.1193M", y2028: "£1.34316M" },
    { category: "Licensing & Regulatory Compliance", y2026: "£0.26117M", y2027: "£0.29848M", y2028: "£0.33579M" },
    { category: "Marketing & User Acquisition", y2026: "£1.79088M", y2027: "£3.731M", y2028: "£5.2234M" },
    { category: "Operations & Staffing", y2026: "£1.1193M", y2027: "£1.64164M", y2028: "£2.2386M" },
    { category: "Total Operating Costs", y2026: "£4.06679M", y2027: "£6.79042M", y2028: "£9.17826M", highlight: true },
  ];

  const ebitdaData = [
    { year: "2026", ebitda: "+£2.57439M" },
    { year: "2027", ebitda: "+£134.316M" },
    { year: "2028", ebitda: "+£201.474M+" },
  ];

  const tokenDrivers = [
    { driver: "SUSU+ required to open new Susu Funds", effect: "Drives continuous token demand" },
    { driver: "Token minted only after real donations", effect: "Minimizes inflation, aligns value with platform usage" },
    { driver: "Investor Panel locks tokens for yield", effect: "Supports stable price growth" },
    { driver: "Projected open-circulation supply < 2.5%", effect: "Strong scarcity and long-term value appreciation" },
  ];

  const financialDrivers = [
    {
      icon: Users,
      title: "User Adoption & Network Effects",
      points: [
        "Susu finance already used by >1 billion people globally",
        "Susumi digitizes a known behaviour—no education barrier; instant uptake"
      ]
    },
    {
      icon: Shield,
      title: "First-Mover Regulatory Position",
      points: [
        "First blockchain-based crowdfunding operator registered by SEC Nigeria",
        "Regulatory barrier protects early investors and supports valuation growth"
      ]
    },
    {
      icon: BarChart3,
      title: "Multi-Revenue Model",
      points: [
        "Platform fees (8.3%, 5%, 3.1%)",
        "NFT-based revenue (fastest growing segment)",
        "Token revenue-sharing engine that increases lock-in and demand"
      ]
    },
    {
      icon: Zap,
      title: "High Margins",
      points: [
        "Smart contracts automate operations",
        "Over 90% of platform fees become net income or token-holder distributions"
      ]
    },
  ];

  const milestones = [
    { milestone: "Mainnet Migration", timeline: "Dec 2025", activities: "Smart contract deployment & integration" },
    { milestone: "Security Audits", timeline: "Dec–Jan 2026", activities: "Third-party contract validation" },
    { milestone: "Nationwide Pre-Launch Campaign", timeline: "Dec 2025–Feb 2026", activities: "PR, influencers, diaspora activation" },
    { milestone: "Commercial Launch", timeline: "October 2026", activities: "Full platform go-live in Nigeria" },
    { milestone: "International Expansion", timeline: "December 2026", activities: "Global deployment" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Pitch Deck
          </Link>
          <h1 className="text-lg font-semibold gradient-text">Financial Forecasts</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">High-Growth, Fee-Driven, Regulated Crowdfunding Platform</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="gradient-text">Financial Forecasts</span>
            <br />
            <span className="text-foreground">2025–2028</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A regulated platform, a proven cultural financial model, and a scalable blockchain architecture—positioning Susumi as one of Africa's most valuable Web3 financial infrastructure companies.
          </p>
        </section>

        <p className="text-xs text-muted-foreground text-center">{currencyNote}</p>
        {/* Revenue Forecast */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Revenue Forecast Summary</h2>
          </div>
          <Card className="overflow-hidden border-primary/20">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Metric</TableHead>
                      <TableHead className="text-center font-semibold">2025 (Pre-Launch)</TableHead>
                      <TableHead className="text-center font-semibold">2026 (Year 1)</TableHead>
                      <TableHead className="text-center font-semibold">2027 (Year 2)</TableHead>
                      <TableHead className="text-center font-semibold">2028 (Year 3)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenueData.map((row, idx) => (
                      <TableRow key={idx} className={row.highlight ? "bg-primary/10 font-semibold" : ""}>
                        <TableCell className="font-medium">{row.metric}</TableCell>
                        <TableCell className="text-center text-muted-foreground">{row.y2025}</TableCell>
                        <TableCell className="text-center">{row.y2026}</TableCell>
                        <TableCell className="text-center">{row.y2027}</TableCell>
                        <TableCell className={`text-center ${row.highlight ? "gradient-text" : ""}`}>{row.y2028}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <p className="text-sm text-muted-foreground">
            Sources: Business Plan Synopsis (3-year revenue: £2.34307B); Pitch Deck Revenue Model & NFT economics.
          </p>
        </section>

        {/* Cost Structure & EBITDA */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Cost Structure & Profitability</h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cost Table */}
            <Card className="lg:col-span-2 overflow-hidden border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Operating Costs</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold">Cost Category</TableHead>
                        <TableHead className="text-center font-semibold">2026</TableHead>
                        <TableHead className="text-center font-semibold">2027</TableHead>
                        <TableHead className="text-center font-semibold">2028</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {costData.map((row, idx) => (
                        <TableRow key={idx} className={row.highlight ? "bg-primary/10 font-semibold" : ""}>
                          <TableCell className="font-medium">{row.category}</TableCell>
                          <TableCell className="text-center">{row.y2026}</TableCell>
                          <TableCell className="text-center">{row.y2027}</TableCell>
                          <TableCell className="text-center">{row.y2028}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* EBITDA Card */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="text-lg">EBITDA Projections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ebitdaData.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                    <span className="font-medium">{item.year}</span>
                    <span className="text-xl font-bold gradient-text">{item.ebitda}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Capital Deployment & Break-Even</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Capital raised", value: "£186,550" },
                { label: "Pre-launch monthly burn", value: "~£20,893.6" },
                { label: "Runway to launch", value: "~8.9 months at stated burn (deployment estimate)" },
                { label: "Break-even month", value: "Month 4 after launch (management assumption)" },
                { label: "Total capital required to reach break-even", value: "£186,550 (management funding assumption)" },
                { label: "Year 1 EBITDA (2026)", value: "+£2.57439M EBITDA", highlight: true },
              ].map((row, idx) => (
                <div
                  key={idx}
                  className={`flex flex-wrap justify-between items-center gap-2 p-3 rounded-lg ${row.highlight ? "bg-primary/10 font-semibold" : "bg-muted/30"}`}
                >
                  <span className="text-sm">{row.label}</span>
                  <span className={row.highlight ? "gradient-text font-bold" : "font-medium"}>{row.value}</span>
                </div>
              ))}
              <p className="text-xs text-muted-foreground pt-2">
                Management assumptions: approximately 8.9 months at the stated monthly burn; this is a deployment-period estimate, not remaining runway from today. Month 4 break-even and the seed sufficiency require a monthly cash-flow plan and are not proven by annual revenue and cost totals. EBITDA is not net profit. Growth scenarios elsewhere use different assumptions.
              </p>
            </CardContent>
          </Card>

          <div className="bg-muted/30 rounded-lg p-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Notes:</strong> Susumi's model is low-CAPEX and low-cost to scale because funds are handled by smart contracts, not by the company. Regulatory status in Nigeria dramatically increases valuation and revenue capture potential.
            </p>
          </div>

        </section>

        {/* Token Economics */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Coins className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Token Economics Impact (SUSU+ Token)</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Token Drivers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tokenDrivers.map((item, idx) => (
                  <div key={idx} className="space-y-1 p-3 rounded-lg bg-muted/30">
                    <p className="font-medium text-sm">{item.driver}</p>
                    <p className="text-sm text-primary">{item.effect}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="text-lg">Projected Market Value (Post-Launch)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold">
                    <span className="text-muted-foreground">£0.001119</span>
                    <span className="mx-3">→</span>
                    <span className="gradient-text">£0.007462+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">within 12–18 months</p>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Based on in-app utility and adoption curve (Pitch Deck Token Simulation)
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Financial Drivers */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Key Financial Drivers</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {financialDrivers.map((driver, idx) => (
              <Card key={idx} className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <driver.icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{driver.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {driver.points.map((point, pidx) => (
                      <li key={pidx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Investment Return Outlook */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Investment Return Outlook</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Equity Return (£186.55K Seed @ 12.5%)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Forecast enterprise value by 2028:</p>
                  <p className="text-2xl font-bold">£261.17M–£373.1M</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">12.5% equity value potential:</p>
                  <p className="text-3xl font-bold gradient-text">£32.64625M–£46.6375M+</p>

                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Token Allocation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Seed investor receives:</p>
                  <p className="text-2xl font-bold">200,000,000 SUSU+ Tokens</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Issued under an agreed vesting schedule:</p>
                  <p className="text-base text-muted-foreground">Progressive release over the vesting period, with Validator Panel revenue participation while locked.</p>
                </div>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* Funding Milestones */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Funding Requirements & Milestones</h2>
          </div>

          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="relative">
                {milestones.map((item, idx) => (
                  <div key={idx} className="flex gap-4 pb-8 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      {idx < milestones.length - 1 && (
                        <div className="w-0.5 flex-1 bg-primary/20 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-semibold">{item.milestone}</h3>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium">
                          {item.timeline}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.activities}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center space-y-6 py-12">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to be part of Africa's Web3 financial revolution?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/meeting">Schedule Investor Meeting</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/request-access">Request Data Room Access</Link>
            </Button>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 border-t border-border/50">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Have Questions About Our <span className="gradient-text">Financial Projections</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team is ready to discuss the investment opportunity in detail. Reach out directly via WhatsApp for a quick response.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white text-lg px-8 py-6"
            >
              <a 
                href="https://wa.me/447501785599?text=Hi%2C%20I%27m%20interested%20in%20learning%20more%20about%20Susumi%27s%20investment%20opportunity." 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Us on WhatsApp
              </a>
            </Button>
            <p className="text-sm text-muted-foreground">
              +44 7501 785599 • Typically replies within hours
            </p>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Financials;
