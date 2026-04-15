import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, F as FileOutput, f as cn, S as Skeleton } from "./index-BwN-QH05.js";
import { B as Badge } from "./badge-4bTBFb1U.js";
import { B as Button } from "./button-CUItn4aA.js";
import { T as Textarea, D as Download, M as MicOff, a as Mic, u as ue, C as ChevronUp } from "./index--Kq8QW-Z.js";
import { u as useMaterials, a as useGenerateCourse, b as useGenerateSchematic, c as useGeneratePresentation, d as useSaveMaterial } from "./useMaterials-X7lrtxc7.js";
import { u as useProducts } from "./useProducts-C7bkIZJ5.js";
import { u as useVerticals } from "./useVerticals-D1jk_J-0.js";
import { C as ChevronDown } from "./chevron-down-DM72P6Yc.js";
import "./useMutation-D1ejh1Dt.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M11 9h4a2 2 0 0 0 2-2V3", key: "1ve2rv" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "M7 21v-4a2 2 0 0 1 2-2h4", key: "1fwkro" }],
  ["circle", { cx: "15", cy: "15", r: "2", key: "3i40o0" }]
];
const CircuitBoard = createLucideIcon("circuit-board", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M2 3h20", key: "91anmk" }],
  ["path", { d: "M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3", key: "2k9sn8" }],
  ["path", { d: "m7 21 5-5 5 5", key: "bip4we" }]
];
const Presentation = createLucideIcon("presentation", __iconNode$1);
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
const TABS = [
  { id: "course", label: "Course", icon: BookOpen },
  { id: "schematic", label: "Schematic", icon: CircuitBoard },
  { id: "presentation", label: "Presentation", icon: Presentation }
];
const TYPE_COLORS = {
  course: "border-chart-1 text-chart-1",
  schematic: "border-chart-2 text-chart-2",
  presentation: "border-chart-3 text-chart-3"
};
function getSpeechRecognition() {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
}
function downloadText(content, filename) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function MicButton({ onTranscript }) {
  const [listening, setListening] = reactExports.useState(false);
  const recognitionRef = reactExports.useRef(null);
  const SpeechAPI = getSpeechRecognition();
  if (!SpeechAPI) return null;
  const SpeechAPINonNull = SpeechAPI;
  function toggle() {
    var _a;
    if (listening) {
      (_a = recognitionRef.current) == null ? void 0 : _a.stop();
      setListening(false);
      return;
    }
    const r = new SpeechAPINonNull();
    r.continuous = true;
    r.interimResults = true;
    r.lang = "en-US";
    r.onresult = (e) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          final += t;
        } else {
          interim += t;
        }
      }
      if (final) onTranscript(final, true);
      else if (interim) onTranscript(interim, false);
    };
    r.onerror = () => {
      setListening(false);
      ue.error("Speech recognition error. Check microphone permissions.");
    };
    r.onend = () => setListening(false);
    r.start();
    recognitionRef.current = r;
    setListening(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "sm",
      onClick: toggle,
      className: cn(
        "h-7 w-7 p-0 flex-shrink-0 transition-all duration-200",
        listening ? "text-primary border border-primary/60 bg-primary/10 animate-pulse" : "text-muted-foreground hover:text-primary hover:bg-primary/10"
      ),
      "aria-label": listening ? "Stop listening" : "Start voice input",
      "data-ocid": "generate.mic_button",
      title: listening ? "Click to stop voice input" : "Click to speak",
      children: listening ? /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-3 h-3" })
    }
  );
}
function CourseResult({ data }) {
  const [showMarkdown, setShowMarkdown] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-mono text-sm font-semibold text-foreground leading-snug", children: data.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: data.modules.map((mod, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "border border-border rounded bg-card/60 overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2 border-b border-border/60 bg-muted/20 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground uppercase tracking-widest w-5 text-center", children: String(i + 1).padStart(2, "0") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-semibold text-foreground", children: mod.moduleName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 grid grid-cols-2 gap-3 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground uppercase mb-1.5", children: "Objectives" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: mod.objectives.map((obj) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex gap-1.5 items-start font-body text-foreground/85",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5 flex-shrink-0", children: "›" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: obj })
                  ]
                },
                obj
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground uppercase mb-1.5", children: "Lab Exercises" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: mod.labExercises.map((lab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex gap-1.5 items-start font-body text-foreground/85",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent mt-0.5 flex-shrink-0", children: "⌘" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lab })
                  ]
                },
                lab
              )) })
            ] })
          ] })
        ]
      },
      mod.moduleName
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setShowMarkdown(!showMarkdown),
          className: "flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground uppercase hover:text-foreground transition-smooth mb-2",
          children: [
            showMarkdown ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" }),
            "Full Markdown"
          ]
        }
      ),
      showMarkdown && /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "bg-background border border-border rounded p-3 font-mono text-[10px] text-muted-foreground whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-72 overflow-y-auto", children: data.fullMarkdown })
    ] })
  ] });
}
function SchematicResult({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-mono text-sm font-semibold text-foreground", children: data.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground uppercase mb-2", children: "ASCII Diagram" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "bg-background border border-border rounded p-4 font-mono text-[11px] text-foreground/90 whitespace-pre leading-relaxed overflow-x-auto", children: data.asciiDiagram })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground uppercase mb-2", children: "Components" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: data.componentList.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: "outline",
          className: "font-mono text-[10px] h-5 px-2 border-primary/40 text-primary/80",
          children: c
        },
        c
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground uppercase mb-1.5", children: "Notes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/80 leading-relaxed border-l-2 border-primary/30 pl-3", children: data.notes })
    ] })
  ] });
}
function PresentationResult({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-mono text-sm font-semibold text-foreground", children: data.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground uppercase mb-2", children: "Talking Points" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "border-l-2 border-accent/50 pl-3 bg-accent/5 py-2 pr-3 rounded-r font-body text-sm text-foreground/85 italic leading-relaxed", children: data.talkingPointsSummary })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground uppercase mb-2", children: "Slides" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: data.slides.map((slide, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "border border-border rounded overflow-hidden bg-card/60",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2 border-b border-border/60 bg-muted/20 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-primary font-bold w-5 text-center", children: i + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-semibold text-foreground", children: slide.slideTitle })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "px-3 py-2 space-y-1", children: slide.bulletPoints.map((bp) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex gap-1.5 items-start font-body text-xs text-foreground/80",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/60 mt-0.5 flex-shrink-0", children: "•" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: bp })
                ]
              },
              bp
            )) })
          ]
        },
        slide.slideTitle
      )) })
    ] })
  ] });
}
function MaterialRow({ m, index }) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border-b border-border/50 last:border-0",
      "data-ocid": `generate.material_item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen(!open),
            className: "w-full flex items-center justify-between gap-2 px-3 py-2 hover:bg-muted/20 transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: cn(
                      "font-mono text-[8px] h-4 px-1.5 flex-shrink-0",
                      TYPE_COLORS[m.kind] ?? "border-muted-foreground text-muted-foreground"
                    ),
                    children: m.kind.toUpperCase()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-foreground truncate", children: m.title })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground hidden sm:inline", children: formatDate(m.createdAt) }),
                open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3 text-muted-foreground" })
              ] })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3 bg-background/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "font-mono text-[10px] text-muted-foreground whitespace-pre-wrap leading-relaxed border border-border/40 rounded p-2 max-h-40 overflow-y-auto bg-background", children: m.content }) })
      ]
    }
  );
}
function buildDownloadContent(result, vertical, product) {
  const vertSlug = slugify(vertical);
  const prodSlug = slugify(product);
  const prefix = [vertSlug, prodSlug].filter(Boolean).join("-") || "moku";
  if (result.type === "course") {
    return {
      content: result.data.fullMarkdown,
      filename: `${prefix}-course.md`
    };
  }
  if (result.type === "schematic") {
    const lines2 = [
      `# ${result.data.title}`,
      "",
      "## ASCII Diagram",
      "",
      result.data.asciiDiagram,
      "",
      "## Components",
      "",
      result.data.componentList.join(", "),
      "",
      "## Notes",
      "",
      result.data.notes
    ];
    return {
      content: lines2.join("\n"),
      filename: `${prefix}-schematic.txt`
    };
  }
  const slideLines = result.data.slides.map(
    (s, i) => `### Slide ${i + 1}: ${s.slideTitle}
${s.bulletPoints.map((b) => `- ${b}`).join("\n")}`
  );
  const lines = [
    `# ${result.data.title}`,
    "",
    "## Talking Points",
    "",
    result.data.talkingPointsSummary,
    "",
    "## Slides",
    "",
    slideLines.join("\n\n")
  ];
  return {
    content: lines.join("\n"),
    filename: `${prefix}-presentation.md`
  };
}
function GeneratePage() {
  const [activeTab, setActiveTab] = reactExports.useState("course");
  const [vertical, setVertical] = reactExports.useState("");
  const [product, setProduct] = reactExports.useState("");
  const [useCase, setUseCase] = reactExports.useState("");
  const [useCaseInterim, setUseCaseInterim] = reactExports.useState("");
  const [result, setResult] = reactExports.useState(null);
  const [savedResult, setSavedResult] = reactExports.useState(false);
  const { data: verticals } = useVerticals();
  const { data: products } = useProducts();
  const { data: materials, isLoading: loadingMaterials } = useMaterials();
  const generateCourse = useGenerateCourse();
  const generateSchematic = useGenerateSchematic();
  const generatePresentation = useGeneratePresentation();
  const saveMaterial = useSaveMaterial();
  const isGenerating = generateCourse.isPending || generateSchematic.isPending || generatePresentation.isPending;
  const handleUseCaseTranscript = reactExports.useCallback(
    (text, isFinal) => {
      if (isFinal) {
        setUseCase((prev) => prev ? `${prev} ${text}` : text);
        setUseCaseInterim("");
      } else {
        setUseCaseInterim(text);
      }
    },
    []
  );
  function switchTab(tab) {
    setActiveTab(tab);
    setResult(null);
    setSavedResult(false);
  }
  async function handleGenerate() {
    setResult(null);
    setSavedResult(false);
    try {
      if (activeTab === "course") {
        if (!vertical) {
          ue.error("Select a vertical");
          return;
        }
        const data = await generateCourse.mutateAsync({
          vertical,
          product: product || void 0
        });
        setResult({ type: "course", data });
      } else if (activeTab === "schematic") {
        const combinedUseCase = (useCase + (useCaseInterim ? ` ${useCaseInterim}` : "")).trim();
        if (!combinedUseCase) {
          ue.error("Enter a use case description");
          return;
        }
        const data = await generateSchematic.mutateAsync({
          useCaseDescription: combinedUseCase
        });
        setResult({ type: "schematic", data });
      } else {
        if (!vertical || !product) {
          ue.error("Select both a vertical and product");
          return;
        }
        const data = await generatePresentation.mutateAsync({
          vertical,
          product
        });
        setResult({ type: "presentation", data });
      }
    } catch {
      ue.error("Generation failed. Ensure the API key is configured.");
    }
  }
  async function handleSave() {
    if (!result) return;
    const title = result.data.title;
    const content = result.type === "course" ? result.data.fullMarkdown : result.type === "schematic" ? `${result.data.asciiDiagram}

Components: ${result.data.componentList.join(", ")}

Notes: ${result.data.notes}` : `${result.data.talkingPointsSummary}

${result.data.slides.map((s, i) => `Slide ${i + 1}: ${s.slideTitle}
${s.bulletPoints.join("\n")}`).join("\n\n")}`;
    try {
      await saveMaterial.mutateAsync({ kind: result.type, title, content });
      setSavedResult(true);
      ue.success("Material saved");
    } catch {
      ue.error("Save failed");
    }
  }
  function handleDownload() {
    if (!result) return;
    const { content, filename } = buildDownloadContent(
      result,
      vertical,
      product
    );
    downloadText(content, filename);
  }
  const canGenerate = activeTab === "schematic" ? useCase.trim().length > 0 || useCaseInterim.trim().length > 0 : activeTab === "presentation" ? !!vertical && !!product : !!vertical;
  const displayUseCase = useCase + (useCaseInterim ? ` ${useCaseInterim}` : "");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex h-full min-h-0 overflow-hidden",
      "data-ocid": "generate.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-72 flex-shrink-0 flex flex-col border-r border-border overflow-y-auto bg-card/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pt-3 pb-2.5 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-mono text-[9px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileOutput, { className: "w-3 h-3 text-primary" }),
            "Material Generator"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex border-b border-border", "data-ocid": "generate.tabs", children: TABS.map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => switchTab(id),
              className: cn(
                "flex-1 flex flex-col items-center gap-0.5 px-1 py-2 font-mono text-[8px] uppercase tracking-wide transition-smooth",
                activeTab === id ? "text-primary border-b-2 border-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
              ),
              "data-ocid": `generate.tab.${id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3" }),
                label
              ]
            },
            id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2.5 border-b border-border", children: [
            (activeTab === "course" || activeTab === "presentation") && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "gen-vertical",
                    className: "font-mono text-[8px] text-muted-foreground uppercase",
                    children: "Vertical"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "gen-vertical",
                    value: vertical,
                    onChange: (e) => setVertical(e.target.value),
                    className: "w-full h-7 bg-background border border-input rounded px-2 text-xs text-foreground font-body focus:outline-none focus:ring-1 focus:ring-ring",
                    "data-ocid": "generate.vertical_select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select vertical..." }),
                      verticals == null ? void 0 : verticals.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: v.id, children: v.name }, v.id))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "gen-product",
                    className: "font-mono text-[8px] text-muted-foreground uppercase",
                    children: [
                      "Product",
                      activeTab === "course" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60 ml-1", children: "(optional)" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "gen-product",
                    value: product,
                    onChange: (e) => setProduct(e.target.value),
                    className: "w-full h-7 bg-background border border-input rounded px-2 text-xs text-foreground font-body focus:outline-none focus:ring-1 focus:ring-ring",
                    "data-ocid": "generate.product_select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select product..." }),
                      products == null ? void 0 : products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id, children: p.name }, p.id))
                    ]
                  }
                )
              ] })
            ] }),
            activeTab === "schematic" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "gen-usecase",
                    className: "font-mono text-[8px] text-muted-foreground uppercase",
                    children: "Use Case Description"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(MicButton, { onTranscript: handleUseCaseTranscript })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "gen-usecase",
                    value: displayUseCase,
                    onChange: (e) => {
                      setUseCase(e.target.value);
                      setUseCaseInterim("");
                    },
                    placeholder: "e.g., Radar pulse compression for DRDO using Moku Pro with custom FPGA instrument... (or click mic to speak)",
                    className: cn(
                      "resize-none font-body text-xs bg-background min-h-[72px]",
                      useCaseInterim && "text-muted-foreground"
                    ),
                    rows: 4,
                    "data-ocid": "generate.usecase_input"
                  }
                ),
                useCaseInterim && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1.5 right-2 font-mono text-[8px] text-primary/60 pointer-events-none", children: "listening…" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: handleGenerate,
                disabled: isGenerating || !canGenerate,
                className: "w-full font-mono text-[10px] h-7",
                "data-ocid": "generate.generate_button",
                children: isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" }),
                  "Generating..."
                ] }) : `Generate ${activeTab === "course" ? "Course" : activeTab === "schematic" ? "Schematic" : "Outline"}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2 font-mono text-[8px] text-muted-foreground uppercase tracking-widest border-b border-border/50 flex items-center justify-between", children: [
              "Saved Materials",
              materials && materials.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "font-mono text-[8px] h-4 px-1",
                  children: materials.length
                }
              )
            ] }),
            loadingMaterials && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "p-3 space-y-2",
                "data-ocid": "generate.materials_loading_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-4/5" })
                ]
              }
            ),
            !loadingMaterials && (!materials || materials.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "px-3 py-4 text-center",
                "data-ocid": "generate.materials_empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground", children: "No saved materials yet." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[9px] text-muted-foreground/50 mt-1", children: "Generate and save to see them here." })
                ]
              }
            ),
            materials == null ? void 0 : materials.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(MaterialRow, { m, index: i + 1 }, m.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "main",
          {
            className: "flex-1 flex flex-col min-w-0 overflow-hidden bg-background",
            "data-ocid": "generate.output_panel",
            children: [
              !result && !isGenerating && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center justify-center h-full gap-3 text-center p-8",
                  "data-ocid": "generate.output_empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileOutput, { className: "w-10 h-10 text-primary/20" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm text-muted-foreground", children: "Nothing generated yet" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground/60 max-w-xs", children: "Select a tab, configure the inputs, and click Generate. Results appear here as structured, readable output." })
                    ] })
                  ]
                }
              ),
              isGenerating && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center justify-center h-full gap-4",
                  "data-ocid": "generate.output_loading_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 border-2 border-primary/20 rounded-full" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 w-10 h-10 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-foreground", children: "Generating content…" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[9px] text-muted-foreground", children: [
                        "AI is crafting your ",
                        activeTab,
                        " material"
                      ] })
                    ] })
                  ]
                }
              ),
              result && !isGenerating && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2 border-b border-border bg-card flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: cn(
                          "font-mono text-[8px] h-5 px-1.5 flex-shrink-0",
                          TYPE_COLORS[result.type] ?? ""
                        ),
                        children: result.type.toUpperCase()
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-semibold text-foreground truncate", children: result.data.title })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0 ml-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        variant: "ghost",
                        className: "font-mono text-[10px] h-7 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10 gap-1",
                        onClick: handleDownload,
                        "data-ocid": "generate.download_button",
                        "aria-label": "Download generated content",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3" }),
                          "Download"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        variant: "outline",
                        className: "font-mono text-[10px] h-7",
                        onClick: handleSave,
                        disabled: saveMaterial.isPending || savedResult,
                        "data-ocid": "generate.save_button",
                        children: saveMaterial.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 border border-muted-foreground/40 border-t-foreground rounded-full animate-spin" }),
                          "Saving…"
                        ] }) : savedResult ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-chart-1", children: "✓ Saved" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3 h-3 mr-1" }),
                          "Save"
                        ] })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4", children: [
                  result.type === "course" && /* @__PURE__ */ jsxRuntimeExports.jsx(CourseResult, { data: result.data }),
                  result.type === "schematic" && /* @__PURE__ */ jsxRuntimeExports.jsx(SchematicResult, { data: result.data }),
                  result.type === "presentation" && /* @__PURE__ */ jsxRuntimeExports.jsx(PresentationResult, { data: result.data })
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  GeneratePage
};
