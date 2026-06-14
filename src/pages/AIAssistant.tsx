import React, { useState } from "react";
import { useSearch } from "@tanstack/react-router";
import { ChatWindow } from "@/components/ai-assistant/ChatWindow";
import { AIHub } from "@/components/ai-assistant/AIHub";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Moon, MessageSquare, LayoutDashboard } from "lucide-react";

export default function ChatPage() {
  const search = useSearch({ from: "/chat" }) as { msg?: string };
  const [view, setView] = useState<"hub" | "chat">("hub");

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

  if (view === "chat") {
    return (
      <div className="flex flex-col h-full w-full relative">
        <div className="absolute top-2 right-4 z-10 flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setView("hub")} className="gap-2 bg-background shadow-sm border-border">
            <LayoutDashboard className="size-4" /> AI Hub Dashboard
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <Moon className="size-4" />
          </Button>
        </div>
        <ChatWindow initialMsg={search.msg} />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto h-full">
      <PageWrapper className="bg-slate-50/50 dark:bg-transparent">
        <Header title="AI Assistant">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setView("chat")} className="gap-2 font-medium">
              <MessageSquare className="size-4" /> Switch to Chat
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              <Moon className="size-5" />
            </Button>
          </div>
        </Header>
        
        <div className="mt-[-1rem]">
          <AIHub />
        </div>
      </PageWrapper>
    </div>
  );
}
