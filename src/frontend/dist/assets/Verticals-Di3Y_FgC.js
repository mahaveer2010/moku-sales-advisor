import { c as createLucideIcon, j as jsxRuntimeExports, B as Building2, L as Link, a as ChevronRight, S as Skeleton, C as Cpu } from "./index-BwN-QH05.js";
import { B as Badge } from "./badge-4bTBFb1U.js";
import { u as useVerticals } from "./useVerticals-D1jk_J-0.js";
import { T as TriangleAlert } from "./triangle-alert-1W55PKwr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode);
const VERTICAL_ICONS = {
  "aerospace-defense": /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-4 h-4" }),
  isro: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
  "tejas-networks": /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4" }),
  "lekha-wireless": /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4" }),
  "telecom-5g": /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-4 h-4" }),
  "defense-electronics": /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
  "quantum-computing": /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-4 h-4" })
};
const VERTICAL_ACCENT = {
  "aerospace-defense": "border-l-[3px] border-l-[hsl(var(--chart-1))]",
  isro: "border-l-[3px] border-l-[hsl(var(--chart-2))]",
  "tejas-networks": "border-l-[3px] border-l-[hsl(var(--chart-3))]",
  "lekha-wireless": "border-l-[3px] border-l-[hsl(var(--chart-4))]",
  "telecom-5g": "border-l-[3px] border-l-[hsl(var(--chart-5))]",
  "defense-electronics": "border-l-[3px] border-l-[hsl(var(--accent))]",
  "quantum-computing": "border-l-[3px] border-l-[hsl(var(--primary))]"
};
function VerticalCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded p-4 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-4/5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
    ] })
  ] });
}
function VerticalsPage() {
  const { data: verticals, isLoading } = useVerticals();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", "data-ocid": "verticals.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-0.5", children: "Knowledge Base" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-mono text-base font-bold text-foreground uppercase tracking-wide", children: "Industry Verticals" })
      ] }),
      verticals && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[10px] text-muted-foreground bg-muted/40 border border-border rounded px-2 py-1", children: [
        verticals.length,
        " verticals"
      ] })
    ] }),
    !isLoading && verticals && verticals.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 bg-card border border-border rounded p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-lg font-bold text-primary", children: verticals.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground uppercase", children: "Verticals" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center border-x border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-lg font-bold text-foreground", children: verticals.reduce((sum, v) => sum + v.painAreas.length, 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground uppercase", children: "Pain Areas" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-lg font-bold text-foreground", children: verticals.reduce((sum, v) => sum + v.solutionMappings.length, 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground uppercase", children: "Solutions" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5",
        "data-ocid": "verticals.list",
        children: [
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(VerticalCardSkeleton, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(VerticalCardSkeleton, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(VerticalCardSkeleton, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(VerticalCardSkeleton, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(VerticalCardSkeleton, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(VerticalCardSkeleton, {})
          ] }),
          !isLoading && (!verticals || verticals.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "col-span-3 flex flex-col items-center justify-center h-32 bg-card border border-border rounded text-muted-foreground text-sm gap-2",
              "data-ocid": "verticals.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-6 h-6 opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: "No verticals configured" })
              ]
            }
          ),
          !isLoading && (verticals == null ? void 0 : verticals.map((v, i) => {
            const accentClass = VERTICAL_ACCENT[v.id] ?? "border-l-[3px] border-l-primary";
            const icon = VERTICAL_ICONS[v.id] ?? /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4" });
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/verticals/$id",
                params: { id: v.id },
                className: `group flex flex-col bg-card border border-border ${accentClass} rounded hover:border-primary/60 hover:shadow-sm transition-smooth`,
                "data-ocid": `verticals.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pt-3 pb-2 border-b border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary flex-shrink-0", children: icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] font-bold text-foreground uppercase tracking-wide truncate", children: v.name })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-smooth" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2.5 flex flex-col gap-2.5 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: v.overview }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-destructive/70 flex-shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: v.painAreas.length }),
                          " ",
                          "pain areas"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-primary/70 flex-shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: v.solutionMappings.length }),
                          " ",
                          "solutions"
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
                      v.painAreas.slice(0, 3).map((pa) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: "font-mono text-[9px] h-4 px-1.5 leading-none",
                          children: pa
                        },
                        pa
                      )),
                      v.painAreas.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Badge,
                        {
                          variant: "outline",
                          className: "font-mono text-[9px] h-4 px-1.5 leading-none",
                          children: [
                            "+",
                            v.painAreas.length - 3
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2 border-t border-border/60 bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-primary group-hover:underline", children: "View solutions →" }) })
                ]
              },
              v.id
            );
          }))
        ]
      }
    )
  ] });
}
export {
  VerticalsPage
};
