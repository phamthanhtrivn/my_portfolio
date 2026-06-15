"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./theme-provider";
import { profile, skillGroups, projects } from "@/lib/portfolio-data";
import { PortfolioIcon } from "./icon";

type DevTerminalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type HistoryLine = {
  type: "input" | "output" | "error";
  text: string;
};

export function DevTerminal({ isOpen, onClose }: DevTerminalProps) {
  const { theme, setTheme } = useTheme();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryLine[]>([
    { type: "output", text: `Pham Thanh Tri CLI [Version 1.0.0]` },
    { type: "output", text: `Type 'help' to see list of available commands.` },
    { type: "output", text: `` },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Focus input on mount / toggle
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Scroll to bottom on history change
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Handle outside click & escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const COMMANDS = ["help", "clear", "about", "skills", "projects", "contact", "theme", "exit", "sudo", "neofetch"];

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Add to history
    setHistory((prev) => [...prev, { type: "input", text: trimmed }]);
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case "help":
        setHistory((prev) => [
          ...prev,
          { type: "output", text: "Available commands:" },
          { type: "output", text: "  about          - View professional introduction" },
          { type: "output", text: "  skills         - List specialized tech stack" },
          { type: "output", text: "  projects       - Show public portfolio systems" },
          { type: "output", text: "  contact        - Get contact details" },
          { type: "output", text: "  theme [l|d|t]  - Change theme (light, dark, toggle)" },
          { type: "output", text: "  neofetch       - Display system specifications" },
          { type: "output", text: "  clear          - Clear terminal log screen" },
          { type: "output", text: "  exit           - Close terminal interface" },
        ]);
        break;

      case "clear":
        setHistory([]);
        break;

      case "exit":
        onClose();
        break;

      case "about":
        setHistory((prev) => [
          ...prev,
          { type: "output", text: `Name:         ${profile.displayName}` },
          { type: "output", text: `Role:         ${profile.role}` },
          { type: "output", text: `Location:     ${profile.location}` },
          { type: "output", text: "" },
          { type: "output", text: profile.intro },
          { type: "output", text: "" },
          { type: "output", text: profile.headline },
        ]);
        break;

      case "skills":
        setHistory((prev) => {
          const lines: HistoryLine[] = [{ type: "output", text: "Core Skill Matrix:" }];
          skillGroups.forEach((group) => {
            lines.push({ type: "output", text: `  [${group.title}]` });
            lines.push({ type: "output", text: `    ${group.items.join(", ")}` });
          });
          return [...prev, ...lines];
        });
        break;

      case "projects":
        setHistory((prev) => {
          const lines: HistoryLine[] = [{ type: "output", text: "Featured Systems:" }];
          projects.forEach((proj) => {
            lines.push({ type: "output", text: `  * ${proj.name} (${proj.role})` });
            lines.push({ type: "output", text: `    Summary: ${proj.summary}` });
            lines.push({ type: "output", text: `    Stack:   ${proj.stack.slice(0, 5).join(", ")}...` });
            lines.push({ type: "output", text: "" });
          });
          return [...prev, ...lines];
        });
        break;

      case "contact":
        setHistory((prev) => [
          ...prev,
          { type: "output", text: `Contact note: ${profile.contactNote}` },
          { type: "output", text: `GitHub:       ${profile.github}` },
        ]);
        break;

      case "theme":
        const sub = args[0]?.toLowerCase();
        if (sub === "light" || sub === "l") {
          setTheme("light");
          setHistory((prev) => [...prev, { type: "output", text: "Theme switched to Light mode." }]);
        } else if (sub === "dark" || sub === "d") {
          setTheme("dark");
          setHistory((prev) => [...prev, { type: "output", text: "Theme switched to Dark mode." }]);
        } else if (sub === "toggle" || sub === "t" || !sub) {
          const newTheme = theme === "light" ? "dark" : "light";
          setTheme(newTheme);
          setHistory((prev) => [...prev, { type: "output", text: `Theme toggled to ${newTheme} mode.` }]);
        } else {
          setHistory((prev) => [...prev, { type: "error", text: "Invalid argument. Use: theme [light | dark | toggle]" }]);
        }
        break;

      case "neofetch":
        setHistory((prev) => [
          ...prev,
          { type: "output", text: "    /\\_/\\          tri@portfolio" },
          { type: "output", text: "   ( o.o )         OS: Next.js 16.2 (React 19)" },
          { type: "output", text: "    > ^ <          Host: Localhost:3000" },
          { type: "output", text: "   /     \\         Kernel: Tailwind CSS v4" },
          { type: "output", text: "  (|     |)        Shell: Custom React CLI" },
          { type: "output", text: "  (_||_||_)        Terminal: Hermit-shell" },
        ]);
        break;

      case "sudo":
        if (args.join(" ") === "rm -rf /") {
          setHistory((prev) => [
            ...prev,
            { type: "error", text: "sudo: rm -rf / is extremely dangerous!" },
            { type: "output", text: "rm: cannot remove '/': Permission denied. Just kidding :)" },
          ]);
        } else {
          setHistory((prev) => [...prev, { type: "error", text: "sudo: Permission denied. You are already root in this sandbox." }]);
        }
        break;

      default:
        setHistory((prev) => [
          ...prev,
          { type: "error", text: `Command not found: '${cmd}'. Type 'help' for support.` },
        ]);
        break;
    }

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple autocomplete
      const match = COMMANDS.find((cmd) => cmd.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInput(cmdHistory[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistory.length === 0 || historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Terminal frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 flex h-full max-h-[550px] w-full max-w-3xl flex-col rounded-xl border border-teal-500/30 bg-[#050706] text-emerald-500 shadow-2xl overflow-hidden font-mono"
        >
          {/* Title bar */}
          <div className="flex items-center justify-between border-b border-teal-500/20 bg-[#0a0f0d] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-red-500/60" />
              <span className="size-3 rounded-full bg-yellow-500/60" />
              <span className="size-3 rounded-full bg-emerald-500/60" />
              <span className="ml-2 text-xs text-emerald-500/60">tri@portfolio:~</span>
            </div>
            <button
              onClick={onClose}
              className="rounded p-1 text-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors"
            >
              <PortfolioIcon name="arrow" size={16} className="rotate-45" />
            </button>
          </div>

          {/* Console Area */}
          <div
            className="flex-1 overflow-y-auto px-5 py-4 space-y-2 text-sm selection:bg-teal-500/25 selection:text-white"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.type === "input"
                    ? "text-white"
                    : line.type === "error"
                    ? "text-red-400"
                    : "text-emerald-400/90"
                }
              >
                {line.type === "input" && <span className="text-emerald-500 mr-2">$</span>}
                <span className="whitespace-pre-wrap">{line.text}</span>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex items-center border-t border-teal-500/20 bg-[#070b09] px-5 py-3">
            <span className="text-emerald-500 mr-2 shrink-0">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white focus:outline-none caret-emerald-500 font-mono"
              placeholder="gõ lệnh tại đây... (ví dụ: 'help')"
              autoFocus
            />
            <span className="text-[10px] text-emerald-500/40 select-none hidden sm:inline">
              [Tab] gợi ý | [Esc] thoát
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
