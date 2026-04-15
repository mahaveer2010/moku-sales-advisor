import { c as createLucideIcon, b as useParams, u as useNavigate, j as jsxRuntimeExports, S as Skeleton, C as Cpu, L as Link, M as MessageSquare, F as FileOutput, d as Search } from "./index-BwN-QH05.js";
import { B as Badge } from "./badge-4bTBFb1U.js";
import { B as Button } from "./button-CUItn4aA.js";
import { a as useProduct } from "./useProducts-C7bkIZJ5.js";
import { A as ArrowLeft, E as ExternalLink } from "./external-link-DEUlk3rs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
  ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
  ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]
];
const CodeXml = createLucideIcon("code-xml", __iconNode);
const SPEC_FIELDS = [
  { key: "bandwidth", label: "Bandwidth" },
  {
    key: "adcBits",
    label: "ADC Resolution",
    format: (v) => `${v}-bit`
  },
  {
    key: "channels",
    label: "Channels",
    format: (v) => `${v} ch`
  },
  { key: "sampleRate", label: "Sample Rate" },
  { key: "formFactor", label: "Form Factor" },
  { key: "connectivity", label: "Connectivity" },
  { key: "voltage", label: "Supply Voltage" }
];
function formatSpecValue(key, raw) {
  const v = typeof raw === "bigint" ? Number(raw) : raw;
  const field = SPEC_FIELDS.find((f) => f.key === key);
  if (field && "format" in field && field.format) return field.format(v);
  return String(v);
}
function ProductDetailPage() {
  const { id } = useParams({ from: "/products/$id" });
  const { data: product, isLoading } = useProduct(id);
  const navigate = useNavigate();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", "data-ocid": "product_detail.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-72" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-3 md:grid-cols-4 gap-px", children: ["bw", "adc", "ch", "sr", "ff", "conn", "v"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14" }, k)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full max-w-md" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full max-w-sm" })
    ] });
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-4 flex flex-col items-center justify-center h-48 gap-3",
        "data-ocid": "product_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-8 h-8 text-muted-foreground opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-muted-foreground", children: "Product not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/products",
              className: "font-mono text-xs text-primary hover:underline",
              children: "← Back to products"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-5 max-w-4xl", "data-ocid": "product_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: "/products" }),
        className: "font-mono text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-smooth",
        "data-ocid": "product_detail.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3 h-3" }),
          " Products"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-mono text-lg font-bold text-foreground leading-tight", children: product.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] text-primary mt-0.5", children: product.tagline })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "outline",
            className: "font-mono text-xs h-7 gap-1",
            onClick: () => navigate({ to: "/chat" }),
            "data-ocid": "product_detail.ask_advisor_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3" }),
              " Ask Advisor"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "outline",
            className: "font-mono text-xs h-7 gap-1",
            onClick: () => navigate({ to: "/generate" }),
            "data-ocid": "product_detail.generate_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileOutput, { className: "w-3 h-3" }),
              " Generate"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/chat",
            className: "inline-flex items-center gap-1 font-mono text-xs h-7 px-3 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth",
            "data-ocid": "product_detail.find_usecases_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-3 h-3" }),
              " Find Use Cases"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "bg-card border border-border rounded overflow-hidden",
        "data-ocid": "product_detail.specs_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2 border-b border-border bg-muted/30 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] font-semibold text-muted-foreground uppercase tracking-widest", children: "Technical Specifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground opacity-60", children: product.spec.formFactor })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4", children: SPEC_FIELDS.map(({ key, label }) => {
            const raw = product.spec[key];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "px-3 py-2.5 border-r border-b border-border/40 last:border-r-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground uppercase tracking-widest mb-0.5", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm font-semibold text-foreground", children: formatSpecValue(key, raw) })
                ]
              },
              key
            );
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "product_detail.instruments_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "w-3 h-3" }),
        "Available Instruments",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/50 normal-case font-normal", children: [
          "(",
          product.instruments.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: product.instruments.map((inst) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: "secondary",
          className: "font-mono text-[10px] py-0.5 px-2 h-5 bg-muted/50 hover:bg-muted transition-smooth cursor-default",
          children: inst
        },
        inst
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "bg-card border border-border rounded overflow-hidden",
        "data-ocid": "product_detail.usecases_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2 border-b border-border bg-muted/30 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] font-semibold text-muted-foreground uppercase tracking-widest", children: "Key Use Cases" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[9px] text-muted-foreground opacity-60", children: [
              product.useCases.length,
              " scenarios"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border/30", children: product.useCases.map((uc, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-start gap-3 px-3 py-2.5 hover:bg-muted/10 transition-smooth",
              "data-ocid": `product_detail.usecase.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-primary mt-0.5 font-bold w-4 flex-shrink-0 text-right", children: String(i + 1).padStart(2, "0") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground leading-relaxed", children: uc })
              ]
            },
            uc
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2.5 border-t border-border bg-muted/10 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground", children: "Get domain-specific solution guidance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/chat",
                className: "font-mono text-[10px] text-primary hover:underline flex items-center gap-1",
                "data-ocid": "product_detail.find_usecases_link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
                  "Find Use Cases in Chat →"
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  ProductDetailPage
};
