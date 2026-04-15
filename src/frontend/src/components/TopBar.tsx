import { useSearch } from "@/hooks/useSearch";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const KIND_LABELS: Record<string, string> = {
  product: "PRD",
  vertical: "VRT",
  material: "MAT",
};

const KIND_COLORS: Record<string, string> = {
  product: "text-primary",
  vertical: "text-accent",
  material: "text-muted-foreground",
};

interface TopBarProps {
  title?: string;
}

export function TopBar({ title }: TopBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data: results, isFetching } = useSearch(query);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleResultClick(kind: string, id: string) {
    setOpen(false);
    setQuery("");
    if (kind === "product") navigate({ to: "/products/$id", params: { id } });
    else if (kind === "vertical")
      navigate({ to: "/verticals/$id", params: { id } });
    else navigate({ to: "/generate" });
  }

  return (
    <header
      className="flex items-center gap-3 px-4 h-12 bg-card border-b border-border flex-shrink-0"
      data-ocid="topbar"
    >
      {title && (
        <span className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-widest mr-2 whitespace-nowrap">
          {title}
        </span>
      )}

      {/* Search */}
      <div
        ref={containerRef}
        className="relative flex-1 max-w-2xl"
        data-ocid="topbar.search_container"
      >
        <div className="relative flex items-center">
          <Search className="absolute left-2.5 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search Moku products, specifications, case studies..."
            className={cn(
              "w-full h-8 pl-8 pr-8 bg-muted/30 border border-input rounded",
              "text-sm text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring",
              "font-body transition-smooth",
            )}
            data-ocid="topbar.search_input"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setOpen(false);
              }}
              className="absolute right-2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
              data-ocid="topbar.search_clear"
            >
              <X className="w-3 h-3" />
            </button>
          )}
          {isFetching && !query && (
            <Loader2 className="absolute right-2 w-3 h-3 text-muted-foreground animate-spin" />
          )}
        </div>

        {/* Dropdown results */}
        {open && query.trim().length > 1 && (
          <div
            className="absolute top-full mt-1 left-0 right-0 z-50 bg-popover border border-border rounded shadow-lg max-h-72 overflow-y-auto"
            data-ocid="topbar.search_results"
          >
            {isFetching && (
              <div className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Searching...</span>
              </div>
            )}
            {!isFetching && (!results || results.length === 0) && (
              <div
                className="px-3 py-2 text-xs text-muted-foreground"
                data-ocid="topbar.search_empty_state"
              >
                No results for "{query}"
              </div>
            )}
            {!isFetching &&
              results &&
              results.length > 0 &&
              results.map((r, i) => (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => handleResultClick(r.kind, r.id)}
                  className="w-full flex items-start gap-2.5 px-3 py-2 text-left hover:bg-muted/40 transition-smooth border-b border-border/40 last:border-0"
                  data-ocid={`topbar.search_result.${i + 1}`}
                >
                  <span
                    className={cn(
                      "font-mono text-[10px] font-bold mt-0.5 w-7 flex-shrink-0",
                      KIND_COLORS[r.kind] ?? "text-muted-foreground",
                    )}
                  >
                    {KIND_LABELS[r.kind] ?? r.kind.toUpperCase().slice(0, 3)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {r.title}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {r.snippet}
                    </div>
                  </div>
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Start Query shortcut */}
      <button
        type="button"
        onClick={() => {
          navigate({ to: "/chat" });
        }}
        className="flex-shrink-0 h-8 px-3 bg-primary text-primary-foreground font-mono text-xs font-semibold rounded hover:bg-primary/80 transition-smooth"
        data-ocid="topbar.start_query_button"
      >
        Start Query
      </button>
    </header>
  );
}
