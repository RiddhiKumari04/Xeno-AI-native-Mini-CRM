import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useNavigate } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sparkles,
  Users,
  Megaphone,
  Send,
  Wand2,
  AlertTriangle,
  TrendingUp,
  Activity,
  PenTool,
  CheckCircle2,
  Clock,
  MessageSquare,
  Loader2,
  Copy,
  Save,
  Zap,
  FileText,
  Play,
  ArrowDown,
  Filter,
  Tag
} from "lucide-react";

export function AIHub() {
  const navigate = useNavigate();
  const { createCampaign } = useCampaigns();

  const [abTestMode, setAbTestMode] = useState(false);
  const [discount, setDiscount] = useState([15]);
  const [conversion, setConversion] = useState([8]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<number[]>([0]);
  const [editingVariant, setEditingVariant] = useState<number | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);

  // Automation tab states
  const [isAutopilotActive, setIsAutopilotActive] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  const [variants, setVariants] = useState([
    { 
      tone: "Casual & Friendly", 
      text: "Hey {{first_name}}! We've missed you at Xeno AI 💙 It's been a while, so we wanted to treat you to something special.\n\nEnjoy a flat 20% off your next purchase! Just use code {{discount_code}} at checkout.\n\nThis offer vanishes in 48 hours, so tap here to explore what's new: [Link]" 
    },
    { 
      tone: "Urgency / FOMO", 
      text: "Hi {{first_name}} ⏳ Your exclusive VIP 20% discount is about to expire!\n\nWe noticed you've been quiet lately and didn't want you to miss out. Use code {{discount_code}} before midnight tomorrow to secure your savings on all your favorite items!\n\nClaim it here: [Link]" 
    },
    { 
      tone: "Direct & Value-Driven", 
      text: "Hello {{first_name}} . As one of our top-tier customers, your experience is our priority.\n\nWe are offering you an exclusive 20% off your next order to welcome you back. Apply code {{discount_code}} at checkout.\n\nBrowse our latest arrivals tailored to your taste here: [Link]" 
    }
  ]);

  // Handle A/B Test toggle
  useEffect(() => {
    if (!abTestMode && selectedVariants.length > 1) {
      setSelectedVariants([selectedVariants[0]]);
    }
  }, [abTestMode, selectedVariants]);

  const handleGenerateClick = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      toast.success("Creative ideas generated successfully!");
    }, 1500);
  };

  const handleCardClick = (index: number) => {
    if (editingVariant === index) return;

    if (abTestMode) {
      setSelectedVariants(prev => 
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
    } else {
      setSelectedVariants([index]);
    }
  };

  const handleCopy = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleEditClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingVariant(index);
  };

  const handleTextChange = (index: number, newText: string) => {
    setVariants(prev => {
      const updated = [...prev];
      updated[index].text = newText;
      return updated;
    });
  };

  const handleSaveEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingVariant(null);
    toast.success("Changes saved.");
  };

  const handleLaunch = async () => {
    if (selectedVariants.length === 0) {
      toast.error("Please select at least one variant.");
      return;
    }
    
    setIsLaunching(true);
    try {
      const message_template = selectedVariants.map(i => variants[i].text).join("\n\n---\n\n");
      await createCampaign({
        name: abTestMode && selectedVariants.length > 1 ? "AI Win-back (A/B Test)" : "AI Win-back Campaign",
        channel: "whatsapp",
        status: "draft",
        segment_description: "High-value at-risk customers",
        message_template,
        total_recipients: 25
      });
      toast.success("Campaign created successfully!");
      navigate({ to: "/campaigns" });
    } catch (e) {
      toast.error("Failed to create campaign.");
    } finally {
      setIsLaunching(false);
    }
  };

  const handleExecutionLogsClick = () => {
    if (!isAutopilotActive) {
      toast.error("Please activate the automation rule first to view execution logs.");
      return;
    }
    setShowLogs(true);
  };

  const handleSaveRule = () => {
    toast.success("Automation rule saved successfully!");
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <Tabs defaultValue="campaign-studio" className="w-full">
        <TabsList className="w-full justify-start h-12 bg-transparent p-0 border-b rounded-none space-x-6 overflow-x-auto">
          <TabsTrigger 
            value="campaign-studio" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-full text-base font-medium"
          >
            Campaign Studio
          </TabsTrigger>
          <TabsTrigger 
            value="segment-builder"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-full text-base font-medium text-muted-foreground"
          >
            Segment Builder
          </TabsTrigger>
          <TabsTrigger 
            value="predictive-analytics"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-full text-base font-medium text-muted-foreground"
          >
            Predictive Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="automation"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-full text-base font-medium text-muted-foreground"
          >
            Automation
          </TabsTrigger>
        </TabsList>

        <div className="mt-8">
          {/* CAMPAIGN STUDIO TAB */}
          <TabsContent value="campaign-studio" className="space-y-6 m-0">
            {/* Insights Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Users className="size-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Best Audience</p>
                    <h3 className="text-lg font-bold leading-tight">High-value at-risk customers</h3>
                    <p className="text-sm text-muted-foreground mt-2">25 customers spent ₹5k+ but went quiet 60d+.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <MessageSquare className="size-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Best Channel</p>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 font-medium text-sm mb-2 border border-emerald-200 dark:border-emerald-800">
                      <MessageSquare className="size-3.5" /> WhatsApp
                    </div>
                    <p className="text-sm text-muted-foreground">Highest open rate at 74.3%.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="size-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <Megaphone className="size-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Best Strategy</p>
                    <h3 className="text-lg font-bold leading-tight">Personalised win-back</h3>
                    <p className="text-sm text-muted-foreground mt-2">Combine a 20% incentive with urgency.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Inputs Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <Sparkles className="size-4 text-primary" />
                    Generate Campaign
                  </div>
                  <Input 
                    placeholder="Re-engage high-value customers who stopped buying" 
                    className="h-12 bg-slate-50 dark:bg-slate-900 border-transparent shadow-none"
                    defaultValue="Re-engage high-value customers who stopped buying"
                  />
                  <Button 
                    onClick={handleGenerateClick}
                    disabled={isGenerating}
                    className="w-full h-11 gap-2 text-base font-medium"
                  >
                    {isGenerating ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Sparkles className="size-4" />
                    )}
                    {isGenerating ? "Analyzing & Generating..." : "Generate Idea"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <PenTool className="size-4 text-teal-500" />
                    Copy Optimizer
                  </div>
                  <Textarea 
                    placeholder="Paste your rough draft here..." 
                    className="min-h-[88px] bg-slate-50 dark:bg-slate-900 border-transparent shadow-none resize-none"
                  />
                  <Button variant="secondary" className="w-full h-11 gap-2 text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10 hover:bg-teal-100 dark:hover:bg-teal-500/20 text-base font-medium">
                    <Wand2 className="size-4" />
                    Optimize Copy
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* AI Campaign Creator - Shows only after Generate */}
            {hasGenerated && (
              <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden bg-slate-50/50 dark:bg-slate-900/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CardHeader className="p-6 border-b border-slate-200 dark:border-slate-800 bg-card">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-3">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Sparkles className="size-5 text-primary" />
                        AI Campaign Creator
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="bg-background font-normal text-muted-foreground gap-1.5 py-1">
                          <Users className="size-3" /> Segment: High-value at-risk
                        </Badge>
                        <Badge variant="outline" className="bg-background font-normal text-muted-foreground gap-1.5 py-1">
                          <MessageSquare className="size-3" /> Channel: WhatsApp
                        </Badge>
                        <Badge variant="outline" className="bg-background font-normal text-muted-foreground gap-1.5 py-1">
                          <Megaphone className="size-3" /> Strategy: 20% Win-back
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-background px-4 py-2 rounded-full border shadow-sm shrink-0">
                      <span className="text-sm font-medium">A/B Test Mode</span>
                      <Switch 
                        checked={abTestMode}
                        onCheckedChange={setAbTestMode}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {variants.map((variant, index) => {
                      const isSelected = selectedVariants.includes(index);
                      const isEditing = editingVariant === index;

                      return (
                        <Card 
                          key={index}
                          onClick={() => handleCardClick(index)}
                          className={`border-2 shadow-sm relative overflow-hidden transition-all cursor-pointer flex flex-col 
                            ${isSelected ? 'border-primary ring-4 ring-primary/10' : 'border-transparent opacity-80 hover:opacity-100 hover:border-border'}
                          `}
                        >
                          {isSelected && !isEditing && (
                            <div className="absolute top-4 right-4 text-primary z-10">
                              <CheckCircle2 className="size-6 fill-primary/10" />
                            </div>
                          )}
                          <CardContent className="p-5 flex-1 flex flex-col space-y-4">
                            <div className="flex justify-between items-start">
                              <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 font-medium">
                                Tone: {variant.tone}
                              </Badge>
                            </div>
                            
                            {isEditing ? (
                              <Textarea 
                                value={variant.text}
                                onChange={(e) => handleTextChange(index, e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 min-h-[150px] resize-none text-sm text-foreground leading-relaxed"
                                autoFocus
                              />
                            ) : (
                              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap flex-1">
                                {variant.text.split(/({{[^}]+}})/g).map((part, i) => 
                                  part.startsWith("{{") && part.endsWith("}}") ? (
                                    <span key={i} className="text-primary bg-primary/10 px-1 rounded inline-block font-mono text-[11px] mx-0.5">
                                      {part}
                                    </span>
                                  ) : (
                                    <span key={i}>{part}</span>
                                  )
                                )}
                              </p>
                            )}

                            <div className="flex items-center gap-4 pt-4 border-t text-sm font-medium text-muted-foreground mt-auto">
                              {isEditing ? (
                                <Button 
                                  size="sm" 
                                  className="w-full gap-2"
                                  onClick={handleSaveEdit}
                                >
                                  <Save className="size-4" /> Save
                                </Button>
                              ) : (
                                <>
                                  <button 
                                    onClick={(e) => handleEditClick(index, e)}
                                    className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                                  >
                                    <PenTool className="size-4" /> Edit
                                  </button>
                                  <button 
                                    onClick={(e) => handleCopy(variant.text, e)}
                                    className="flex items-center gap-1.5 hover:text-foreground transition-colors ml-auto"
                                  >
                                    <Copy className="size-4" /> Copy
                                  </button>
                                </>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
                <div className="bg-card border-t border-slate-200 dark:border-slate-800 p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground font-medium">
                    {abTestMode 
                      ? `Ready to launch A/B test (${selectedVariants.length} variants selected)` 
                      : "Ready to launch selected variation"}
                  </span>
                  <Button 
                    onClick={handleLaunch}
                    disabled={isLaunching || selectedVariants.length === 0}
                    className="w-full sm:w-auto text-base h-12 px-8 font-semibold gap-2 shadow-sm"
                  >
                    {isLaunching ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Send className="size-4" />
                    )}
                    {isLaunching ? "Launching..." : "Launch Campaign via WhatsApp"}
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>

          {/* SEGMENT BUILDER TAB */}
          <TabsContent value="segment-builder" className="m-0">
            <Card className="border-none shadow-sm">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Users className="size-5 text-primary" />
                    Natural Language Segment Builder
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Describe the exact audience you're looking for, and AI will build the filter logic instantly.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input 
                    placeholder="Find me customers who spent over 5000 but haven't purchased in 30 days"
                    className="h-14 text-base bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    defaultValue="Find me customers who spent over 5000 but haven't purchased in 30 days"
                  />
                  <Button className="h-14 px-8 text-base font-semibold gap-2 shrink-0">
                    <Sparkles className="size-5" />
                    Build Segment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PREDICTIVE ANALYTICS TAB */}
          <TabsContent value="predictive-analytics" className="m-0 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-none shadow-sm">
                <CardContent className="p-6 space-y-2 relative">
                  <div className="absolute top-6 right-6 text-amber-500 bg-amber-50 dark:bg-amber-500/10 p-2 rounded-lg">
                    <AlertTriangle className="size-5" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">Total At-Risk Value</p>
                  <h3 className="text-3xl font-bold tracking-tight">₹4,50,000</h3>
                  <p className="text-sm text-muted-foreground pt-2">Across 142 high-value inactive customers</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-6 space-y-2 relative">
                  <p className="text-sm font-medium text-muted-foreground">Projected Recovery</p>
                  <h3 className="text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">₹27.5k - ₹35.2k</h3>
                  <div className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 font-medium pt-2">
                    <TrendingUp className="size-4" />
                    Based on simulator settings
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-6 space-y-2 relative">
                  <div className="absolute top-6 right-6 text-muted-foreground">
                    <Activity className="size-5" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Churn Risk Score</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold tracking-tight text-destructive">68%</h3>
                    <span className="text-sm font-bold text-destructive uppercase tracking-wider">Critical</span>
                  </div>
                  <div className="pt-3 space-y-2">
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                      <div className="h-full bg-destructive" style={{ width: '68%' }} />
                    </div>
                    <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                      <span>Safe</span>
                      <span>At-Risk</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm">
                <CardContent className="p-6 space-y-8">
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-1">
                      <TrendingUp className="size-5 text-primary" />
                      What-If Simulator
                    </h3>
                    <p className="text-sm text-muted-foreground">Adjust variables to forecast net recovery revenue.</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium flex items-center gap-2">
                          Discount Incentive Offer
                        </label>
                        <Badge variant="secondary" className="bg-primary/10 text-primary font-bold text-sm px-2 py-0.5">
                          {discount}%
                        </Badge>
                      </div>
                      <Slider 
                        defaultValue={[15]} 
                        max={50} 
                        step={1}
                        value={discount}
                        onValueChange={setDiscount}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium flex items-center gap-2">
                          Target Conversion Rate
                        </label>
                        <Badge variant="secondary" className="bg-primary/10 text-primary font-bold text-sm px-2 py-0.5">
                          {conversion}%
                        </Badge>
                      </div>
                      <Slider 
                        defaultValue={[8]} 
                        max={20} 
                        step={1}
                        value={conversion}
                        onValueChange={setConversion}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-1">
                      <AlertTriangle className="size-5 text-muted-foreground" />
                      Primary Churn Drivers
                    </h3>
                    <p className="text-sm text-muted-foreground">AI-identified risk factors for this segment.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground">Replenishment Cycle Gap</h4>
                        <Badge variant="destructive" className="bg-destructive/10 text-destructive border-transparent hover:bg-destructive/10">High Risk</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        85% of this segment has exceeded their historical average order interval by more than 40 days. Immediate trigger required.
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-3 opacity-70">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground">Discount Sensitivity</h4>
                        <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-transparent">Medium Risk</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Historically, this group relies heavily on festival sales. The lack of recent promos has lowered engagement.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AUTOMATION TAB */}
          <TabsContent value="automation" className="m-0 space-y-6">
            <Card className="border-none shadow-sm">
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-xl">
                    <Zap className="size-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-foreground">Autopilot Configuration</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">Rule: High-Value Win-Back Sequence</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <button 
                    onClick={handleExecutionLogsClick}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FileText className="size-4" />
                    Execution Logs
                  </button>
                  
                  <div className="hidden sm:block w-px h-8 bg-border" />
                  
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">{isAutopilotActive ? "Active" : "Paused"}</span>
                    <Switch 
                      checked={isAutopilotActive}
                      onCheckedChange={setIsAutopilotActive}
                      className={isAutopilotActive ? "data-[state=checked]:bg-emerald-500" : ""}
                    />
                  </div>

                  <Button onClick={handleSaveRule} className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-semibold">
                    <Save className="size-4" />
                    Save Rule
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Flowchart Layout */}
            <div className="flex flex-col items-center py-6">
              
              {/* Trigger */}
              <div className="w-full max-w-2xl bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-500/20 rounded-xl overflow-hidden shadow-sm">
                <div className="px-5 py-3 border-b border-indigo-100 dark:border-indigo-500/20 flex items-center gap-3">
                  <div className="size-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Play className="size-4 ml-0.5" />
                  </div>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">TRIGGER</span>
                </div>
                <div className="p-6 flex items-center gap-3">
                  <span className="font-medium text-foreground">When a customer enters segment:</span>
                  <Badge variant="secondary" className="bg-white dark:bg-slate-900 border shadow-sm text-sm py-1 font-medium gap-1.5 hover:bg-white text-foreground">
                    <Users className="size-3.5 text-muted-foreground" /> High-value at-risk
                  </Badge>
                </div>
              </div>

              {/* Arrow */}
              <div className="py-3">
                <div className="w-px h-6 bg-border mx-auto mb-1" />
                <ArrowDown className="size-4 text-muted-foreground/50 mx-auto" />
              </div>

              {/* Filter 1 */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-full text-sm font-medium text-amber-800 dark:text-amber-300 shadow-sm">
                <Filter className="size-3.5 text-amber-600" />
                Days Since Last Purchase {`>=`} 60
              </div>

              {/* Arrow */}
              <div className="py-3">
                <div className="w-px h-6 bg-border mx-auto mb-1" />
                <ArrowDown className="size-4 text-muted-foreground/50 mx-auto" />
              </div>

              {/* Filter 2 */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-full text-sm font-medium text-amber-800 dark:text-amber-300 shadow-sm">
                <Filter className="size-3.5 text-amber-600" />
                Lifetime Spend {`>=`} ₹5000
              </div>

              {/* Arrow */}
              <div className="py-3">
                <div className="w-px h-6 bg-border mx-auto mb-1" />
                <ArrowDown className="size-4 text-muted-foreground/50 mx-auto" />
              </div>

              {/* Action 1 */}
              <div className="w-full max-w-2xl bg-card border rounded-xl shadow-sm">
                <div className="px-5 py-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400">
                      <MessageSquare className="size-4" />
                    </div>
                    <span className="text-xs font-bold text-muted-foreground tracking-wider">ACTION: STEP 1</span>
                  </div>
                  <Badge className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 gap-1 font-medium">
                    <CheckCircle2 className="size-3" /> Active
                  </Badge>
                </div>
                <div className="p-6 flex items-center gap-3">
                  <span className="font-medium text-foreground">Send WhatsApp Template:</span>
                  <Badge variant="secondary" className="bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-800 shadow-sm font-mono text-xs hover:bg-teal-50">
                    winback_20_percent
                  </Badge>
                </div>
              </div>

              {/* Arrow */}
              <div className="py-3">
                <div className="w-px h-6 bg-border mx-auto mb-1" />
                <ArrowDown className="size-4 text-muted-foreground/50 mx-auto" />
              </div>

              {/* Action 2 */}
              <div className="w-full max-w-2xl bg-card border rounded-xl shadow-sm">
                <div className="px-5 py-4 border-b flex items-center gap-3">
                  <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                    <Tag className="size-4" />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground tracking-wider">ACTION: STEP 2</span>
                </div>
                <div className="p-6 flex items-center gap-3">
                  <span className="font-medium text-foreground">Apply Tag:</span>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-foreground border shadow-sm font-mono text-xs hover:bg-slate-100">
                    winback_campaign_active
                  </Badge>
                </div>
              </div>

            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Execution Logs Dialog */}
      <Dialog open={showLogs} onOpenChange={setShowLogs}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="size-5 text-primary" />
              Execution Logs
            </DialogTitle>
            <DialogDescription>
              Recent activity for "High-Value Win-Back Sequence"
            </DialogDescription>
          </DialogHeader>
          <div className="bg-slate-950 rounded-md p-4 mt-2 overflow-x-auto">
            <pre className="text-xs font-mono text-emerald-400 leading-relaxed">
{`[2026-06-14 10:05:22] TRIGGERED: User entered segment 'High-value at-risk'.
[2026-06-14 10:05:22] EVALUATING: Days Since Last Purchase >= 60... PASS (72 days)
[2026-06-14 10:05:22] EVALUATING: Lifetime Spend >= ₹5000... PASS (₹8,450)
[2026-06-14 10:05:23] ACTION: Send WhatsApp Template 'winback_20_percent' to +91 98*** ***12.
[2026-06-14 10:05:24] STATUS: Message DELIVERED.
[2026-06-14 10:05:24] ACTION: Applied tag 'winback_campaign_active'.
---
[2026-06-14 11:30:14] TRIGGERED: User entered segment 'High-value at-risk'.
[2026-06-14 11:30:14] EVALUATING: Days Since Last Purchase >= 60... PASS (61 days)
[2026-06-14 11:30:14] EVALUATING: Lifetime Spend >= ₹5000... FAIL (₹3,200)
[2026-06-14 11:30:14] EXECUTION HALTED: Conditions not met.`}
            </pre>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
