import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Users, Megaphone, Send, Eye, EyeOff, Zap } from "lucide-react";
import { toast } from "sonner";
import { ROUTES } from "@/constants";
import { useServerFn } from "@tanstack/react-start";
import { seedDatabase } from "@/lib/seed.functions";

export default function LoginPage() {
  const navigate = useNavigate();
  const seedFn = useServerFn(seedDatabase);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);

    sessionStorage.setItem("xeno_auth", "true");
    toast.success("Successfully logged in!");
    navigate({ to: ROUTES.DASHBOARD });
  };

  const handleContinueDemo = async () => {
    setDemoLoading(true);
    setEmail("demo@minicrm.in");
    setPassword("demo123");

    try {
      toast.info("Preparing your workspace...", { duration: 3000 });
      await seedFn({ data: { force: false } });
    } catch (e) {
      console.error(e);
      toast.error("Failed to load demo data.");
    }
    
    setDemoLoading(false);

    sessionStorage.setItem("xeno_auth", "true");
    toast.success("Welcome! Signed in with demo account.");
    navigate({ to: ROUTES.DASHBOARD });
  };

  return (
    <div className="h-screen w-full flex flex-row bg-[#FAFAF7] overflow-hidden font-sans">
      {/* LEFT HALF - Brand Showcase (Hidden on Mobile/Tablet) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1C4B3A] p-16 flex-col justify-between text-white relative overflow-hidden h-full">
        {/* Background Dot/Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-80" />

        {/* Xeno AI Logo at top left */}
        <div className="flex items-center gap-3 relative z-10 select-none">
          <div className="size-10 rounded-xl bg-[#14392c] border border-white/10 flex items-center justify-center text-white font-serif font-bold text-xl relative shadow-inner">
            X
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-[#C9A84C]" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-base tracking-tight text-white">Xeno AI</span>
            <span className="text-[10px] uppercase tracking-wider text-[#C9A84C] font-semibold">
              Mini CRM
            </span>
          </div>
        </div>

        {/* Hero Copy (Georgia Serif) */}
        <div className="max-w-md relative z-10 my-auto py-12">
          <h1 className="font-serif text-4xl lg:text-5xl font-normal leading-[1.15] text-white">
            Reach your shoppers. Intelligently.
          </h1>
          <p className="mt-4 text-sm text-white/65 leading-relaxed font-sans">
            AI-native campaign management — segment, message, and track, all from one conversation.
          </p>
        </div>

        {/* Bottom Stat Pills */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/95 bg-white/10 border border-white/5 rounded-full backdrop-blur-sm">
            <Users className="size-3.5 text-[#C9A84C]" />
            <span>300 customers</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/95 bg-white/10 border border-white/5 rounded-full backdrop-blur-sm">
            <Megaphone className="size-3.5 text-[#C9A84C]" />
            <span>7 campaigns</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/95 bg-white/10 border border-white/5 rounded-full backdrop-blur-sm">
            <Send className="size-3.5 text-[#C9A84C]" />
            <span>90 messages sent</span>
          </div>
        </div>
      </div>

      {/* RIGHT HALF - Login Forms Panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between px-8 py-6 sm:px-12 sm:py-8 lg:px-16 lg:py-10 bg-[#FAFAF7] h-full relative z-10 overflow-hidden">
        {/* Top Spacer to balance the bottom label on desktop */}
        <div className="hidden lg:block h-6 shrink-0" />

        {/* Logo for mobile viewports (visible below lg) */}
        <div className="flex lg:hidden items-center gap-3 select-none">
          <div className="size-9 rounded-lg bg-[#1C4B3A] flex items-center justify-center text-white font-serif font-bold text-lg relative shadow-md">
            X
            <span className="absolute top-1 right-1 size-1 rounded-full bg-[#C9A84C]" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-sm tracking-tight text-[#1C4B3A]">Xeno AI</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
              Mini CRM
            </span>
          </div>
        </div>

        {/* Center Panel Content */}
        <div className="max-w-sm w-full mx-auto my-auto py-0 flex flex-col justify-center">
          <span className="text-[10px] tracking-[0.2em] font-bold text-slate-400 uppercase font-sans block mb-2">
            AI-native Mini CRM
          </span>
          <h2 className="font-serif text-3xl font-normal text-[#1C4B3A] mb-1">Welcome back</h2>
          <p className="text-sm text-slate-500 font-sans mb-8">Sign in to your dashboard</p>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-[10px] font-bold uppercase tracking-wider text-slate-600 font-sans"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 border-slate-200 bg-white/70 focus:bg-white text-sm rounded transition-all focus:border-[#1C4B3A]"
                disabled={loading || demoLoading}
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-[10px] font-bold uppercase tracking-wider text-slate-600 font-sans"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 pr-10 border-slate-200 bg-white/70 focus:bg-white text-sm rounded transition-all focus:border-[#1C4B3A]"
                  disabled={loading || demoLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors"
                  disabled={loading || demoLoading}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-10 mt-2 bg-[#1C4B3A] hover:bg-[#153a2d] text-white font-semibold rounded text-sm transition-colors shadow-sm cursor-pointer"
              disabled={loading || demoLoading}
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" /> Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6 flex items-center">
            <div className="flex-1 border-t border-slate-200" />
            <span className="px-3 text-[10px] text-slate-400 uppercase font-bold tracking-widest font-sans">
              or
            </span>
            <div className="flex-1 border-t border-slate-200" />
          </div>

          {/* Demo Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 border border-[#C9A84C] hover:bg-[#C9A84C]/5 text-[#C9A84C] font-bold rounded text-sm transition-all flex items-center justify-center gap-2 bg-transparent cursor-pointer"
            onClick={handleContinueDemo}
            disabled={loading || demoLoading}
          >
            {demoLoading ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" /> Loading Demo...
              </>
            ) : (
              <>
                <Zap className="size-3.5 fill-[#C9A84C]/20" />
                Continue with Demo Account
              </>
            )}
          </Button>

          {/* Credentials Info Box */}
          <div className="mt-3 py-2 px-3 border border-slate-200/50 bg-slate-50 rounded text-center text-xs text-slate-500 font-mono tracking-wide">
            demo@minicrm.in &nbsp;·&nbsp; demo123
          </div>
        </div>

        {/* Powered By Bottom Label */}
        <div className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-[0.2em] pt-4 font-sans">
          Powered by Xeno AI &nbsp;·&nbsp; AI-Native CRM
        </div>
      </div>
    </div>
  );
}
