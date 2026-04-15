import { b as useParams, u as useNavigate, r as reactExports, j as jsxRuntimeExports, S as Skeleton, B as Building2, L as Link, M as MessageSquare, a as ChevronRight } from "./index-BwN-QH05.js";
import { B as Badge } from "./badge-4bTBFb1U.js";
import { B as Button } from "./button-CUItn4aA.js";
import { a as useVertical } from "./useVerticals-D1jk_J-0.js";
import { A as ArrowLeft, E as ExternalLink } from "./external-link-DEUlk3rs.js";
import { T as TriangleAlert } from "./triangle-alert-1W55PKwr.js";
import { C as ChevronDown } from "./chevron-down-DM72P6Yc.js";
const MOKU_MODEL_COLORS = {
  "Moku:Go": "border-primary/60 text-primary bg-primary/10",
  "Moku:Pro": "border-[hsl(var(--chart-2))]/60 text-[hsl(var(--chart-2))] bg-[hsl(var(--chart-2))]/10",
  "Moku:Delta": "border-[hsl(var(--chart-3))]/60 text-[hsl(var(--chart-3))] bg-[hsl(var(--chart-3))]/10"
};
function getMokuColor(model) {
  for (const key of Object.keys(MOKU_MODEL_COLORS)) {
    if (model.toLowerCase().includes(key.toLowerCase().replace("moku:", "moku:"))) {
      return MOKU_MODEL_COLORS[key];
    }
  }
  return "border-border text-foreground bg-muted/40";
}
function PainAreaRow({ index, painArea, relatedSolutions }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setExpanded((p) => !p),
        className: "w-full flex items-center gap-3 px-3 py-2.5 bg-card hover:bg-muted/30 transition-smooth text-left",
        "data-ocid": `vertical_detail.pain_area.${index}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground w-5 text-right flex-shrink-0", children: String(index).padStart(2, "0") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-destructive/70 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground flex-1 min-w-0 truncate", children: painArea }),
          relatedSolutions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "secondary",
              className: "font-mono text-[9px] h-4 px-1.5 flex-shrink-0",
              children: [
                relatedSolutions.length,
                " soln"
              ]
            }
          ),
          expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" })
        ]
      }
    ),
    expanded && relatedSolutions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background border-t border-border divide-y divide-border/50", children: relatedSolutions.map((sm) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `font-mono text-[9px] border rounded px-1.5 py-0.5 ${getMokuColor(sm.mokModel)}`,
            children: sm.mokModel
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: sm.instruments.map((inst) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "font-mono text-[9px] h-4 px-1.5",
            children: inst
          },
          inst
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground leading-relaxed pl-0.5", children: sm.description })
    ] }, sm.painArea + sm.mokModel)) }),
    expanded && relatedSolutions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background border-t border-border px-3 py-2 font-mono text-[10px] text-muted-foreground", children: "No direct solution mapping for this pain area." })
  ] });
}
function SolutionsTable({ solutions }) {
  if (solutions.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-xs text-muted-foreground font-mono py-3 text-center border border-border rounded bg-card",
        "data-ocid": "vertical_detail.solutions_empty_state",
        children: "No solution mappings defined."
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-[2fr_1fr_2fr_3fr] gap-0 bg-muted/40 border-b border-border", children: ["Pain Area", "Model", "Instruments", "Description"].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "font-mono text-[9px] font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2",
        children: col
      },
      col
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/60", children: solutions.map((sm, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-[2fr_1fr_2fr_3fr] gap-0 bg-card hover:bg-muted/20 transition-smooth",
        "data-ocid": `vertical_detail.solution.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2.5 flex items-start gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-destructive/70 flex-shrink-0 mt-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-foreground leading-relaxed", children: sm.painArea })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2.5 flex items-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `font-mono text-[9px] border rounded px-1.5 py-0.5 self-start ${getMokuColor(sm.mokModel)}`,
              children: sm.mokModel
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2.5 flex flex-wrap gap-1 items-start content-start", children: sm.instruments.map((inst) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "font-mono text-[9px] h-4 px-1.5 leading-none",
              children: inst
            },
            inst
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-[11px] text-muted-foreground leading-relaxed", children: sm.description }) })
        ]
      },
      `${sm.painArea}__${sm.mokModel}`
    )) })
  ] });
}
function VerticalDetailPage() {
  const { id } = useParams({ from: "/verticals/$id" });
  const { data: vertical, isLoading } = useVertical(id);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = reactExports.useState("solutions");
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", "data-ocid": "vertical_detail.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-56" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-96" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-28" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-32" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded" })
    ] });
  }
  if (!vertical) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-4 flex flex-col items-center justify-center h-48 gap-3",
        "data-ocid": "vertical_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-8 h-8 text-muted-foreground opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-muted-foreground", children: "Vertical not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/verticals",
              className: "font-mono text-xs text-primary hover:underline",
              children: "← Back to verticals"
            }
          )
        ]
      }
    );
  }
  const painAreaSolutionMap = /* @__PURE__ */ new Map();
  for (const pa of vertical.painAreas) {
    const related = vertical.solutionMappings.filter(
      (sm) => sm.painArea.toLowerCase().includes(pa.toLowerCase().slice(0, 12)) || pa.toLowerCase().includes(sm.painArea.toLowerCase().slice(0, 12))
    );
    painAreaSolutionMap.set(pa, related);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4 max-w-6xl", "data-ocid": "vertical_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: "/verticals" }),
        className: "font-mono text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-smooth",
        "data-ocid": "vertical_detail.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3 h-3" }),
          " Verticals"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5", children: "Industry Vertical" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-mono text-lg font-bold text-foreground uppercase tracking-wide", children: vertical.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed", children: vertical.overview })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "outline",
            className: "font-mono text-xs h-7",
            onClick: () => navigate({
              to: "/chat",
              search: { vertical: vertical.id }
            }),
            "data-ocid": "vertical_detail.plan_session_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3 mr-1.5" }),
              "Plan Sales Session"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "secondary",
            className: "font-mono text-xs h-7",
            onClick: () => navigate({
              to: "/generate",
              search: { vertical: vertical.id }
            }),
            "data-ocid": "vertical_detail.generate_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 mr-1.5" }),
              "Generate Material"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xl font-bold text-destructive/80", children: vertical.painAreas.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground uppercase tracking-wider", children: "Pain Areas" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xl font-bold text-primary", children: vertical.solutionMappings.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground uppercase tracking-wider", children: "Solution Maps" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded p-3 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xl font-bold text-foreground", children: [...new Set(vertical.solutionMappings.map((s) => s.mokModel))].length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground uppercase tracking-wider", children: "Moku Models" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex gap-0 border border-border rounded overflow-hidden w-fit",
        "data-ocid": "vertical_detail.tab",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab("solutions"),
              className: `font-mono text-[10px] uppercase tracking-wider px-4 py-1.5 transition-smooth ${activeTab === "solutions" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted/40"}`,
              "data-ocid": "vertical_detail.solutions_tab",
              children: "Solution Mappings"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab("pain"),
              className: `font-mono text-[10px] uppercase tracking-wider px-4 py-1.5 transition-smooth border-l border-border ${activeTab === "pain" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted/40"}`,
              "data-ocid": "vertical_detail.pain_areas_tab",
              children: [
                "Pain Areas",
                vertical.painAreas.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 font-mono text-[9px] opacity-70", children: [
                  "(",
                  vertical.painAreas.length,
                  ")"
                ] })
              ]
            }
          )
        ]
      }
    ),
    activeTab === "solutions" && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "vertical_detail.solutions_section", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SolutionsTable, { solutions: vertical.solutionMappings }) }),
    activeTab === "pain" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "space-y-1.5",
        "data-ocid": "vertical_detail.pain_areas_section",
        children: [
          vertical.painAreas.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 font-mono text-xs text-muted-foreground py-4 justify-center",
              "data-ocid": "vertical_detail.pain_areas_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 opacity-40" }),
                "No pain areas defined for this vertical."
              ]
            }
          ),
          vertical.painAreas.map((pa, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            PainAreaRow,
            {
              index: i + 1,
              painArea: pa,
              relatedSolutions: painAreaSolutionMap.get(pa) ?? []
            },
            pa
          ))
        ]
      }
    )
  ] });
}
export {
  VerticalDetailPage
};
