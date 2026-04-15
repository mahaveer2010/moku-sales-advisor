import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  FileOutput,
  LayoutDashboard,
  MessageSquare,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Products", path: "/products", icon: Cpu },
  { label: "Verticals", path: "/verticals", icon: Building2 },
  { label: "AI Advisor", path: "/chat", icon: MessageSquare },
  { label: "Generate", path: "/generate", icon: FileOutput },
  { label: "Settings", path: "/settings", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-[oklch(var(--sidebar))] border-r border-border transition-smooth flex-shrink-0",
        collapsed ? "w-12" : "w-52",
      )}
      data-ocid="sidebar"
    >
      {/* Brand */}
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-3 border-b border-border min-h-[48px]",
          collapsed && "justify-center px-0",
        )}
      >
        {!collapsed && (
          <Link
            to="/"
            className="flex items-center gap-1.5 group"
            data-ocid="sidebar.logo_link"
          >
            <span className="font-mono text-base font-bold text-primary tracking-tight leading-none">
              Moku
            </span>
            <span className="font-mono text-base font-light text-muted-foreground tracking-tight leading-none">
              sales
            </span>
          </Link>
        )}
        {collapsed && (
          <Link
            to="/"
            className="font-mono text-xs font-bold text-primary"
            data-ocid="sidebar.logo_link_collapsed"
          >
            M
          </Link>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2 overflow-y-auto" data-ocid="sidebar.nav">
        {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground transition-smooth hover:text-foreground hover:bg-muted/40",
              "font-body [&.active]:text-primary [&.active]:bg-primary/10 [&.active]:border-l-2 [&.active]:border-primary [&.active]:pl-[10px]",
              collapsed &&
                "justify-center px-0 [&.active]:pl-0 [&.active]:border-l-0 [&.active]:border-b-2 [&.active]:border-b-primary",
            )}
            data-ocid={`sidebar.nav_${label.toLowerCase().replace(/\s+/g, "_")}`}
            title={collapsed ? label : undefined}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-center w-full h-9 border-t border-border text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        data-ocid="sidebar.toggle"
      >
        {collapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>
    </aside>
  );
}
