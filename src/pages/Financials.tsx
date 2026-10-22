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
    { metric: "Average Value per Fund", y2025: "—", y2026: "£1,380", y2027: "£1,380", y2028: "£1,380–£1,567" },
    { metric: "Annual Fund Volume (TVL)", y2025: "—", y2026: "£66.26m", y2027: "£198.79m", y2028: "£335.79m–£388.02m" },
    { metric: "Platform Fee Revenue", y2025: "—", y2026: "£5.49m", y2027: "£16.49m", y2028: "£27.61m–£32.83m" },
    { metric: "NFT Revenue", y2025: "—", y2026: "£1.12m", y2027: "£124.62m", y2028: "£179.09m" },
    { metric: "Total Revenue", y2025: "—", y2026: "£6.64m", y2027: "£141.11m", y2028: "£208.94m–£238.78m", highlight: true },
  ];

  const costData = [
    { category: "Technical Development & Maintenance", y2026: "£0.90m", y2027: "£1.12m", y2028: "£1.34m" },
    { category: "Licensing & Regulatory Compliance", y2026: "£0.26m", y2027: "£0.30m", y2028: "£0.34m" },
    { category: "Marketing & User Acquisition", y2026: "£1.79m", y2027: "£3.73m", y2028: "£5.22m" },
    { category: "Operations & Staffing", y2026: "£1.12m", y2027: "£1.64m", y2028: "£2.24m" },
    { category: "Total Operating Costs", y2026: "£4.07m", y2027: "£6.79m", y2028: "£9.18m", highlight: true },
  ];

  const ebitdaData = [
    { year: "Year 1", ebitda: "+£2.57m" },
    { year: "Year 2", ebitda: "+£134.32m" },
    { year: "Year 3", ebitda: "+£201.47m+" },
  ];

  const tokenDrivers = [
    { driver: "SUSU+ required to open new Susu Funds", effect: "Drives continuous token demand" },
    { driver: "Token minted only after real donations", effect: "Minimizes inflation, aligns value with platform usage" },
    { driver: "Validator Panel locks tokens for fee share", effect: "Links token demand to platform activity" },
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
    { milestone: "Round closed", timeline: "Month 1", activities: "Funds received, audit scoped, filings started" },
    { milestone: "Security audit", timeline: "Months 2–3", activities: "Independent audit; findings fixed and re-checked" },
    { milestone: "Regulatory sign-off", timeline: "Month 4", activities: "SEC launch filings accepted" },
    { milestone: "Mainnet launch", timeline: "Months 4–5", activities: "Basic Susu Fund live in Nigeria" },
    { milestone: "First traction", timeline: "Month 6", activities: "First funds and Subscribers, targets set at close" },
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
            <span className="text-foreground">Years 1–3 From Launch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The management business-plan forecast, a separate model from the growth scenarios. Years are counted from launch. Forecasts are not audited; totals keep the original model's rounding.
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
                      <TableHead className="text-center font-semibold">Year 1</TableHead>
                      <TableHead className="text-center font-semibold">Year 2</TableHead>
                      <TableHead className="text-center font-semibold">Year 3</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenueData.map((row, idx) => (
                      <TableRow key={idx} className={row.highlight ? "bg-primary/10 font-semibold" : ""}>
                        <TableCell className="font-medium">{row.metric}</TableCell>
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
            Sources: management Business Plan Synopsis; Pitch Deck Revenue Model & NFT economics. Forecasts are not audited results; totals and components retain the original model's rounding differences.
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
                        <TableHead className="text-center font-semibold">Year 1</TableHead>
                        <TableHead className="text-center font-semibold">Year 2</TableHead>
                        <TableHead className="text-center font-semibold">Year 3</TableHead>
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
                { label: "Capital raised", value: "£200,000 (incl. £13,450 one-off legal and raise costs)" },
                { label: "Pre-launch monthly burn", value: "~£20,894" },
                { label: "Runway to launch", value: "~8.9 months of operating spend at the stated burn, from close" },
                { label: "Break-even month", value: "Month 4 after launch (financial forecast); Month 9 in the growth scenario" },
                { label: "Total capital required to reach break-even", value: "£200,000 (management assumption)" },
                { label: "Year 1 EBITDA", value: "+£2.57m EBITDA", highlight: true },
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
                Month 4 break-even and seed sufficiency are management assumptions. They need a monthly cash-flow plan and are not proven by annual totals. The model is low-capex because funds are held by smart contracts, not by the company. EBITDA is not net profit.
              </p>
            </CardContent>
          </Card>

          <div className="bg-muted/30 rounded-lg p-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Notes:</strong> Susumi's model is low-CAPEX and low-cost to scale because funds are handled by smart contracts, not by the company. Susumi is the first blockchain-based crowdfunding operator registered by SEC Nigeria.
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

          <div className="grid gap-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Token Drivers (no tokens are offered in this equity round; token value is not projected)</CardTitle>
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
