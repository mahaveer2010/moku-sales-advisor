import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useVertical } from "@/hooks/useVerticals";
import type { SolutionMapping } from "@/types";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";

const MOKU_MODEL_COLORS: Record<string, string> = {
  "Moku:Go": "border-primary/60 text-primary bg-primary/10",
  "Moku:Pro":
    "border-[hsl(var(--chart-2))]/60 text-[hsl(var(--chart-2))] bg-[hsl(var(--chart-2))]/10",
  "Moku:Delta":
    "border-[hsl(var(--chart-3))]/60 text-[hsl(var(--chart-3))] bg-[hsl(var(--chart-3))]/10",
};

function getMokuColor(model: string) {
  for (const key of Object.keys(MOKU_MODEL_COLORS)) {
    if (
      model.toLowerCase().includes(key.toLowerCase().replace("moku:", "moku:"))
    ) {
      return MOKU_MODEL_COLORS[key];
    }
  }
  return "border-border text-foreground bg-muted/40";
}

interface PainAreaRowProps {
  index: number;
  painArea: string;
  relatedSolutions: SolutionMapping[];
}

function PainAreaRow({ index, painArea, relatedSolutions }: PainAreaRowProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-border rounded overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center gap-3 px-3 py-2.5 bg-card hover:bg-muted/30 transition-smooth text-left"
        data-ocid={`vertical_detail.pain_area.${index}`}
      >
        <span className="font-mono text-[10px] text-muted-foreground w-5 text-right flex-shrink-0">
          {String(index).padStart(2, "0")}
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-destructive/70 flex-shrink-0" />
        <span className="font-mono text-xs text-foreground flex-1 min-w-0 truncate">
          {painArea}
        </span>
        {relatedSolutions.length > 0 && (
          <Badge
            variant="secondary"
            className="font-mono text-[9px] h-4 px-1.5 flex-shrink-0"
          >
            {relatedSolutions.length} soln
          </Badge>
        )}
        {expanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
        )}
      </button>

      {expanded && relatedSolutions.length > 0 && (
        <div className="bg-background border-t border-border divide-y divide-border/50">
          {relatedSolutions.map((sm) => (
            <div key={sm.painArea + sm.mokModel} className="px-3 py-2.5">
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`font-mono text-[9px] border rounded px-1.5 py-0.5 ${getMokuColor(sm.mokModel)}`}
                >
                  {sm.mokModel}
                </span>
                <div className="flex flex-wrap gap-1">
                  {sm.instruments.map((inst) => (
                    <Badge
                      key={inst}
                      variant="outline"
                      className="font-mono text-[9px] h-4 px-1.5"
                    >
                      {inst}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="font-body text-xs text-muted-foreground leading-relaxed pl-0.5">
                {sm.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {expanded && relatedSolutions.length === 0 && (
        <div className="bg-background border-t border-border px-3 py-2 font-mono text-[10px] text-muted-foreground">
          No direct solution mapping for this pain area.
        </div>
      )}
    </div>
  );
}

interface SolutionsTableProps {
  solutions: SolutionMapping[];
}

function SolutionsTable({ solutions }: SolutionsTableProps) {
  if (solutions.length === 0) {
    return (
      <div
        className="text-xs text-muted-foreground font-mono py-3 text-center border border-border rounded bg-card"
        data-ocid="vertical_detail.solutions_empty_state"
      >
        No solution mappings defined.
      </div>
    );
  }

  return (
    <div className="border border-border rounded overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[2fr_1fr_2fr_3fr] gap-0 bg-muted/40 border-b border-border">
        {["Pain Area", "Model", "Instruments", "Description"].map((col) => (
          <div
            key={col}
            className="font-mono text-[9px] font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2"
          >
            {col}
          </div>
        ))}
      </div>
      {/* Rows */}
      <div className="divide-y divide-border/60">
        {solutions.map((sm, i) => (
          <div
            key={`${sm.painArea}__${sm.mokModel}`}
            className="grid grid-cols-[2fr_1fr_2fr_3fr] gap-0 bg-card hover:bg-muted/20 transition-smooth"
            data-ocid={`vertical_detail.solution.${i + 1}`}
          >
            <div className="px-3 py-2.5 flex items-start gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive/70 flex-shrink-0 mt-1" />
              <span className="font-mono text-[10px] text-foreground leading-relaxed">
                {sm.painArea}
              </span>
            </div>
            <div className="px-3 py-2.5 flex items-start">
              <span
                className={`font-mono text-[9px] border rounded px-1.5 py-0.5 self-start ${getMokuColor(sm.mokModel)}`}
              >
                {sm.mokModel}
              </span>
            </div>
            <div className="px-3 py-2.5 flex flex-wrap gap-1 items-start content-start">
              {sm.instruments.map((inst) => (
                <Badge
                  key={inst}
                  variant="secondary"
                  className="font-mono text-[9px] h-4 px-1.5 leading-none"
                >
                  {inst}
                </Badge>
              ))}
            </div>
            <div className="px-3 py-2.5">
              <p className="font-body text-[11px] text-muted-foreground leading-relaxed">
                {sm.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VerticalDetailPage() {
  const { id } = useParams({ from: "/verticals/$id" });
  const { data: vertical, isLoading } = useVertical(id);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"pain" | "solutions">("solutions");

  if (isLoading) {
    return (
      <div className="p-4 space-y-4" data-ocid="vertical_detail.loading_state">
        <Skeleton className="h-4 w-20" />
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-6 w-56" />
            <Skeleton className="h-3 w-96" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-7 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Skeleton className="h-14 rounded" />
          <Skeleton className="h-14 rounded" />
          <Skeleton className="h-14 rounded" />
        </div>
        <Skeleton className="h-64 w-full rounded" />
      </div>
    );
  }

  if (!vertical) {
    return (
      <div
        className="p-4 flex flex-col items-center justify-center h-48 gap-3"
        data-ocid="vertical_detail.error_state"
      >
        <Building2 className="w-8 h-8 text-muted-foreground opacity-30" />
        <p className="font-mono text-sm text-muted-foreground">
          Vertical not found
        </p>
        <Link
          to="/verticals"
          className="font-mono text-xs text-primary hover:underline"
        >
          ← Back to verticals
        </Link>
      </div>
    );
  }

  // Map pain areas to related solutions
  const painAreaSolutionMap = new Map<string, SolutionMapping[]>();
  for (const pa of vertical.painAreas) {
    const related = vertical.solutionMappings.filter(
      (sm) =>
        sm.painArea.toLowerCase().includes(pa.toLowerCase().slice(0, 12)) ||
        pa.toLowerCase().includes(sm.painArea.toLowerCase().slice(0, 12)),
    );
    painAreaSolutionMap.set(pa, related);
  }

  return (
    <div className="p-4 space-y-4 max-w-6xl" data-ocid="vertical_detail.page">
      {/* Breadcrumb */}
      <button
        type="button"
        onClick={() => navigate({ to: "/verticals" })}
        className="font-mono text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-smooth"
        data-ocid="vertical_detail.back_button"
      >
        <ArrowLeft className="w-3 h-3" /> Verticals
      </button>

      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">
            Industry Vertical
          </div>
          <h1 className="font-mono text-lg font-bold text-foreground uppercase tracking-wide">
            {vertical.name}
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
            {vertical.overview}
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="font-mono text-xs h-7"
            onClick={() =>
              navigate({
                to: "/chat",
                search: { vertical: vertical.id } as Record<string, string>,
              })
            }
            data-ocid="vertical_detail.plan_session_button"
          >
            <MessageSquare className="w-3 h-3 mr-1.5" />
            Plan Sales Session
          </Button>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="font-mono text-xs h-7"
            onClick={() =>
              navigate({
                to: "/generate",
                search: { vertical: vertical.id } as Record<string, string>,
              })
            }
            data-ocid="vertical_detail.generate_button"
          >
            <ExternalLink className="w-3 h-3 mr-1.5" />
            Generate Material
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-card border border-border rounded p-3 text-center">
          <div className="font-mono text-xl font-bold text-destructive/80">
            {vertical.painAreas.length}
          </div>
          <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
            Pain Areas
          </div>
        </div>
        <div className="bg-card border border-border rounded p-3 text-center">
          <div className="font-mono text-xl font-bold text-primary">
            {vertical.solutionMappings.length}
          </div>
          <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
            Solution Maps
          </div>
        </div>
        <div className="bg-card border border-border rounded p-3 text-center">
          <div className="font-mono text-xl font-bold text-foreground">
            {
              [...new Set(vertical.solutionMappings.map((s) => s.mokModel))]
                .length
            }
          </div>
          <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
            Moku Models
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div
        className="flex gap-0 border border-border rounded overflow-hidden w-fit"
        data-ocid="vertical_detail.tab"
      >
        <button
          type="button"
          onClick={() => setActiveTab("solutions")}
          className={`font-mono text-[10px] uppercase tracking-wider px-4 py-1.5 transition-smooth ${
            activeTab === "solutions"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted/40"
          }`}
          data-ocid="vertical_detail.solutions_tab"
        >
          Solution Mappings
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("pain")}
          className={`font-mono text-[10px] uppercase tracking-wider px-4 py-1.5 transition-smooth border-l border-border ${
            activeTab === "pain"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted/40"
          }`}
          data-ocid="vertical_detail.pain_areas_tab"
        >
          Pain Areas
          {vertical.painAreas.length > 0 && (
            <span className="ml-1.5 font-mono text-[9px] opacity-70">
              ({vertical.painAreas.length})
            </span>
          )}
        </button>
      </div>

      {/* Solutions table */}
      {activeTab === "solutions" && (
        <section data-ocid="vertical_detail.solutions_section">
          <SolutionsTable solutions={vertical.solutionMappings} />
        </section>
      )}

      {/* Pain areas list */}
      {activeTab === "pain" && (
        <section
          className="space-y-1.5"
          data-ocid="vertical_detail.pain_areas_section"
        >
          {vertical.painAreas.length === 0 && (
            <div
              className="flex items-center gap-2 font-mono text-xs text-muted-foreground py-4 justify-center"
              data-ocid="vertical_detail.pain_areas_empty_state"
            >
              <AlertTriangle className="w-4 h-4 opacity-40" />
              No pain areas defined for this vertical.
            </div>
          )}
          {vertical.painAreas.map((pa, i) => (
            <PainAreaRow
              key={pa}
              index={i + 1}
              painArea={pa}
              relatedSolutions={painAreaSolutionMap.get(pa) ?? []}
            />
          ))}
        </section>
      )}
    </div>
  );
}
