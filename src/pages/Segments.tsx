import { PageWrapper } from "@/components/layout/PageWrapper";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sparkles, Moon, Loader2, Users, Megaphone, Target, CheckCircle2, ChevronRight, BarChart, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

const SUGGESTIONS = [
  "Customers who spent more than ₹5000 and have not purchased in 60 days",
  "Loyal customers in Mumbai with at least 5 orders",
  "Inactive high-value shoppers we should win back",
  "Customers in Bengaluru who spent over ₹20000",
];

export default function Segments() {
  const [query, setQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const handleGenerate = () => {
    if (!query.trim()) return;
    setIsGenerating(true);
    setResult(null);

    // Simulate API call for AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setResult({
        query,
        size: 1245,
        reach: "98%",
        suggestedChannel: "WhatsApp",
        interpretation: "Targeting high-value customers located in Bengaluru. This segment is highly likely to convert on premium lifestyle offers based on their past spending patterns.",
        demographics: {
          avgAge: 32,
          genderSplit: { male: "55%", female: "45%" },
          topLocation: "Indiranagar, Bengaluru"
        },
        matchingCustomers: [
          { name: "Rahul Sharma", email: "rahul@example.com", phone: "+91 98765 43210", spent: "₹24,500", lastActive: "2 days ago" },
          { name: "Priya Patel", email: "priya@example.com", phone: "+91 98765 43211", spent: "₹31,200", lastActive: "1 week ago" },
          { name: "Amit Kumar", email: "amit@example.com", phone: "+91 98765 43212", spent: "₹21,800", lastActive: "3 weeks ago" },
          { name: "Sneha Reddy", email: "sneha@example.com", phone: "+91 98765 43213", spent: "₹45,100", lastActive: "Yesterday" },
          { name: "Vikram Singh", email: "vikram@example.com", phone: "+91 98765 43214", spent: "₹28,900", lastActive: "5 days ago" },
        ]
      });
    }, 2000);
  };

  return (
    <PageWrapper className="bg-slate-50/50 dark:bg-transparent">
      <Header title="Segments">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          <Moon className="size-5" />
        </Button>
      </Header>

      <div className="mt-8 max-w-5xl space-y-8">
        <Card className="border-none shadow-sm bg-slate-50/80 dark:bg-slate-900/50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <Sparkles className="size-5 text-primary" />
              AI Audience Segmentation
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Describe your target audience in plain language. AI converts it into precise filters.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleGenerate();
              }}
              placeholder="Customers who spent more than ₹5000 and have not purchased in 60 days"
              className="text-base py-6 px-4 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl shadow-sm focus-visible:ring-primary"
            />
            
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(suggestion)}
                  className="px-4 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <Button 
              onClick={handleGenerate}
              disabled={isGenerating || !query.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-6 font-medium gap-2 mt-4"
            >
              {isGenerating ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Sparkles className="size-5" />
              )}
              {isGenerating ? "Analyzing Audience..." : "Generate Segment"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-none shadow-sm">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl">
                    <Users className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Segment Size</p>
                    <h3 className="text-2xl font-bold">{result.size.toLocaleString()}</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
                    <Target className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Est. Reachability</p>
                    <h3 className="text-2xl font-bold">{result.reach}</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl">
                    <Megaphone className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Best Channel</p>
                    <h3 className="text-2xl font-bold">{result.suggestedChannel}</h3>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-sm">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <BarChart className="size-5 text-primary" />
                  Audience Insights & AI Interpretation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-sm text-foreground leading-relaxed">
                  <span className="font-semibold text-primary">AI Interpretation: </span> 
                  {result.interpretation}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Average Age</p>
                    <p className="font-medium text-foreground">{result.demographics.avgAge} years old</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Gender Split</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-normal border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20">
                        {result.demographics.genderSplit.male} Male
                      </Badge>
                      <Badge variant="outline" className="font-normal border-pink-200 text-pink-700 dark:border-pink-800 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20">
                        {result.demographics.genderSplit.female} Female
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Top Location</p>
                    <p className="font-medium text-foreground">{result.demographics.topLocation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
                <CardTitle className="text-lg font-semibold">Matching Customers Preview</CardTitle>
                <Badge variant="secondary" className="font-medium">Top 5 shown</Badge>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead className="text-right">Last Active</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.matchingCustomers.map((customer: any, idx: number) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5"><Mail className="size-3" /> {customer.email}</span>
                            <span className="flex items-center gap-1.5"><Phone className="size-3" /> {customer.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600 dark:text-emerald-400">{customer.spent}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{customer.lastActive}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" className="px-6 rounded-xl border-slate-200">
                Export to CSV
              </Button>
              <Link to="/campaigns">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 rounded-xl shadow-sm gap-2">
                  Create Campaign with this Segment
                  <ChevronRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
