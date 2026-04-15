import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useVerticals } from "@/hooks/useVerticals";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Building2,
  ChevronRight,
  Cpu,
  MapPin,
} from "lucide-react";

const VERTICAL_ICONS: Record<string, React.ReactNode> = {
  "aerospace-defense": <Cpu className="w-4 h-4" />,
  isro: <MapPin className="w-4 h-4" />,
  "tejas-networks": <Building2 className="w-4 h-4" />,
  "lekha-wireless": <Building2 className="w-4 h-4" />,
  "telecom-5g": <Cpu className="w-4 h-4" />,
  "defense-electronics": <AlertTriangle className="w-4 h-4" />,
  "quantum-computing": <Cpu className="w-4 h-4" />,
};

const VERTICAL_ACCENT: Record<string, string> = {
  "aerospace-defense": "border-l-[3px] border-l-[hsl(var(--chart-1))]",
  isro: "border-l-[3px] border-l-[hsl(var(--chart-2))]",
  "tejas-networks": "border-l-[3px] border-l-[hsl(var(--chart-3))]",
  "lekha-wireless": "border-l-[3px] border-l-[hsl(var(--chart-4))]",
  "telecom-5g": "border-l-[3px] border-l-[hsl(var(--chart-5))]",
  "defense-electronics": "border-l-[3px] border-l-[hsl(var(--accent))]",
  "quantum-computing": "border-l-[3px] border-l-[hsl(var(--primary))]",
};

function VerticalCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded p-4 space-y-3">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <div className="flex gap-1.5">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex gap-4 pt-1">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

export function VerticalsPage() {
  const { data: verticals, isLoading } = useVerticals();

  return (
    <div className="p-4 space-y-4" data-ocid="verticals.page">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-0.5">
            Knowledge Base
          </div>
          <h1 className="font-mono text-base font-bold text-foreground uppercase tracking-wide">
            Industry Verticals
          </h1>
        </div>
        {verticals && (
          <div className="font-mono text-[10px] text-muted-foreground bg-muted/40 border border-border rounded px-2 py-1">
            {verticals.length} verticals
          </div>
        )}
      </div>

      {/* Stats bar */}
      {!isLoading && verticals && verticals.length > 0 && (
        <div className="grid grid-cols-3 gap-2 bg-card border border-border rounded p-3">
          <div className="text-center">
            <div className="font-mono text-lg font-bold text-primary">
              {verticals.length}
            </div>
            <div className="font-mono text-[9px] text-muted-foreground uppercase">
              Verticals
            </div>
          </div>
          <div className="text-center border-x border-border">
            <div className="font-mono text-lg font-bold text-foreground">
              {verticals.reduce((sum, v) => sum + v.painAreas.length, 0)}
            </div>
            <div className="font-mono text-[9px] text-muted-foreground uppercase">
              Pain Areas
            </div>
          </div>
          <div className="text-center">
            <div className="font-mono text-lg font-bold text-foreground">
              {verticals.reduce((sum, v) => sum + v.solutionMappings.length, 0)}
            </div>
            <div className="font-mono text-[9px] text-muted-foreground uppercase">
              Solutions
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5"
        data-ocid="verticals.list"
      >
        {isLoading && (
          <>
            <VerticalCardSkeleton />
            <VerticalCardSkeleton />
            <VerticalCardSkeleton />
            <VerticalCardSkeleton />
            <VerticalCardSkeleton />
            <VerticalCardSkeleton />
          </>
        )}

        {!isLoading && (!verticals || verticals.length === 0) && (
          <div
            className="col-span-3 flex flex-col items-center justify-center h-32 bg-card border border-border rounded text-muted-foreground text-sm gap-2"
            data-ocid="verticals.empty_state"
          >
            <Building2 className="w-6 h-6 opacity-30" />
            <span className="font-mono text-xs">No verticals configured</span>
          </div>
        )}

        {!isLoading &&
          verticals?.map((v, i) => {
            const accentClass =
              VERTICAL_ACCENT[v.id] ?? "border-l-[3px] border-l-primary";
            const icon = VERTICAL_ICONS[v.id] ?? (
              <Building2 className="w-4 h-4" />
            );

            return (
              <Link
                key={v.id}
                to="/verticals/$id"
                params={{ id: v.id }}
                className={`group flex flex-col bg-card border border-border ${accentClass} rounded hover:border-primary/60 hover:shadow-sm transition-smooth`}
                data-ocid={`verticals.item.${i + 1}`}
              >
                {/* Card header */}
                <div className="px-3 pt-3 pb-2 border-b border-border/60">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-primary flex-shrink-0">{icon}</span>
                      <span className="font-mono text-[11px] font-bold text-foreground uppercase tracking-wide truncate">
                        {v.name}
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-smooth" />
                  </div>
                </div>

                {/* Card body */}
                <div className="px-3 py-2.5 flex flex-col gap-2.5 flex-1">
                  <p className="font-body text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {v.overview}
                  </p>

                  {/* Counters */}
                  <div className="flex gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-destructive/70 flex-shrink-0" />
                      <span className="font-mono text-[10px] text-muted-foreground">
                        <span className="text-foreground font-semibold">
                          {v.painAreas.length}
                        </span>{" "}
                        pain areas
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/70 flex-shrink-0" />
                      <span className="font-mono text-[10px] text-muted-foreground">
                        <span className="text-foreground font-semibold">
                          {v.solutionMappings.length}
                        </span>{" "}
                        solutions
                      </span>
                    </div>
                  </div>

                  {/* Pain area tags */}
                  <div className="flex flex-wrap gap-1">
                    {v.painAreas.slice(0, 3).map((pa) => (
                      <Badge
                        key={pa}
                        variant="secondary"
                        className="font-mono text-[9px] h-4 px-1.5 leading-none"
                      >
                        {pa}
                      </Badge>
                    ))}
                    {v.painAreas.length > 3 && (
                      <Badge
                        variant="outline"
                        className="font-mono text-[9px] h-4 px-1.5 leading-none"
                      >
                        +{v.painAreas.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-3 py-2 border-t border-border/60 bg-muted/20">
                  <span className="font-mono text-[10px] text-primary group-hover:underline">
                    View solutions →
                  </span>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
