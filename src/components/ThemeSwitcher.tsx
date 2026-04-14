"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Monitor, Terminal, Zap } from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex gap-2 p-4 bg-background border-b border-border items-center justify-between">
        <div className="font-bold text-xl tracking-wider text-primary title-text">
            <span>SYS_ADMIN</span>
        </div>
        <div className="flex gap-2">
            <button
                onClick={() => setTheme("terminal")}
                className={`flex items-center gap-2 px-3 py-1 border border-border transition-colors hover:bg-muted ${theme === 'terminal' ? 'bg-primary text-primary-foreground' : 'text-foreground'}`}
                title="Terminal Theme"
            >
                <Terminal size={16} />
                <span className="hidden sm:inline text-xs uppercase tracking-wider">Terminal</span>
            </button>
            <button
                onClick={() => setTheme("cyberpunk")}
                className={`flex items-center gap-2 px-3 py-1 border border-border transition-colors hover:bg-muted ${theme === 'cyberpunk' ? 'bg-primary text-primary-foreground' : 'text-foreground'}`}
                title="Cyberpunk Theme"
            >
                <Zap size={16} />
                <span className="hidden sm:inline text-xs uppercase tracking-wider">Cyberpunk</span>
            </button>
            <button
                onClick={() => setTheme("retro")}
                className={`flex items-center gap-2 px-3 py-1 border border-border transition-colors hover:bg-muted ${theme === 'retro' ? 'bg-primary text-primary-foreground' : 'text-foreground'}`}
                title="Retro Theme"
            >
                <Monitor size={16} />
                <span className="hidden sm:inline text-xs uppercase tracking-wider">Retro</span>
            </button>
        </div>
    </div>
  );
}
