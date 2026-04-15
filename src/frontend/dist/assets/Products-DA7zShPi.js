import { j as jsxRuntimeExports, C as Cpu, L as Link, a as ChevronRight, S as Skeleton } from "./index-BwN-QH05.js";
import { B as Badge } from "./badge-4bTBFb1U.js";
import { u as useProducts } from "./useProducts-C7bkIZJ5.js";
import { Z as Zap } from "./zap-bDOQLs-O.js";
function ProductCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded p-4 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 mt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 rounded" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-14 rounded" })
    ] })
  ] });
}
function ProductsPage() {
  const { data: products, isLoading } = useProducts();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", "data-ocid": "products.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-mono text-xs font-semibold text-muted-foreground uppercase tracking-widest", children: "Moku Product Portfolio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground/60 mt-0.5", children: "Liquid Instruments — Multi-Instrument Platform Family" })
      ] }),
      !isLoading && products && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground bg-muted/40 border border-border px-2 py-0.5 rounded", children: [
        products.length,
        " product",
        products.length !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3",
        "data-ocid": "products.list",
        children: [
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCardSkeleton, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCardSkeleton, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCardSkeleton, {})
          ] }),
          !isLoading && (!products || products.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "col-span-3 flex flex-col items-center justify-center h-32 bg-card border border-border rounded text-muted-foreground text-sm",
              "data-ocid": "products.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-6 h-6 mb-1 opacity-40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: "No products found" })
              ]
            }
          ),
          !isLoading && (products == null ? void 0 : products.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/products/$id",
              params: { id: p.id },
              className: "group flex flex-col bg-card border border-border rounded hover:border-primary/60 transition-smooth",
              "data-ocid": `products.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 px-4 pt-4 pb-3 border-b border-border/50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm font-bold text-foreground leading-tight truncate", children: p.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] text-primary mt-0.5 line-clamp-1", children: p.tagline })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5 opacity-70" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 divide-x divide-border/40 bg-muted/15 border-b border-border/50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs font-bold text-foreground", children: p.spec.bandwidth }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground uppercase", children: "Bandwidth" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs font-bold text-foreground", children: [
                      Number(p.spec.adcBits),
                      "-bit"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground uppercase", children: "ADC" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs font-bold text-foreground", children: [
                      Number(p.spec.channels),
                      "ch"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground uppercase", children: "Channels" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground uppercase tracking-widest mb-1.5", children: "Instruments" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
                    p.instruments.slice(0, 3).map((inst) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "secondary",
                        className: "font-mono text-[9px] h-4 px-1.5 bg-muted/60",
                        children: inst
                      },
                      inst
                    )),
                    p.instruments.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "outline",
                        className: "font-mono text-[9px] h-4 px-1.5 text-muted-foreground",
                        children: [
                          "+",
                          p.instruments.length - 3,
                          " more"
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3 mt-auto flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-primary flex items-center gap-0.5 group-hover:gap-1.5 transition-smooth", children: [
                  "View full specs ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
                ] }) })
              ]
            },
            p.id
          )))
        ]
      }
    )
  ] });
}
export {
  ProductsPage
};
