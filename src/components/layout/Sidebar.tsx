import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Sparkles,
  Megaphone,
  Users,
  BarChart3,
  FileText,
  Database,
  X,
  LogOut,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants";

const nav = [
  { to: ROUTES.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
  { to: ROUTES.CHAT, label: "AI Assistant", icon: Sparkles },
  { to: ROUTES.CAMPAIGNS, label: "Campaigns", icon: Megaphone },
  { to: ROUTES.CUSTOMERS, label: "Customers", icon: Users },
  { to: ROUTES.SEGMENTS, label: "Segments", icon: Target },
  { to: ROUTES.TEMPLATES, label: "Templates", icon: FileText },
  { to: ROUTES.ANALYTICS, label: "Analytics", icon: BarChart3 },
  { to: ROUTES.SYSTEM, label: "System", icon: Database },
];

export function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const { pathname } = useLocation();
  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden animate-fade-in"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "w-60 shrink-0 border-r bg-sidebar text-sidebar-foreground flex flex-col transition-transform duration-300",
          "md:translate-x-0 md:static md:h-auto md:flex",
          "fixed inset-y-0 left-0 z-50 h-full",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="px-5 py-5 border-b flex items-center justify-between">
          <Link to="/" onClick={onClose} className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-sm shrink-0 font-serif font-bold text-lg">
              X
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-foreground text-base tracking-tight">Xeno AI</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                Mini CRM
              </span>
            </div>
          </Link>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          )}
        </div>
        <nav className="flex-1 px-3 py-2 space-y-1 font-sans">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  active
                    ? "bg-primary text-primary-foreground font-medium"
                    : "hover:bg-accent text-foreground/80 hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-2 border-t">
          <button
            onClick={() => {
              sessionStorage.removeItem("xeno_auth");
              window.location.href = ROUTES.LOGIN;
            }}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm text-destructive hover:bg-destructive/10 transition-colors font-medium font-sans cursor-pointer"
          >
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>
        <div className="p-4 text-xs text-muted-foreground border-t bg-secondary/10">
          <div className="font-semibold text-foreground mb-0.5">AI-Native CRM</div>
          <div>Powered by Xeno AI for smart segments & campaigns.</div>
        </div>
      </aside>
    </>
  );
}
