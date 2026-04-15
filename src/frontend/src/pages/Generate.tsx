import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useGenerateCourse,
  useGeneratePresentation,
  useGenerateSchematic,
  useMaterials,
  useSaveMaterial,
} from "@/hooks/useMaterials";
import { useProducts } from "@/hooks/useProducts";
import { useVerticals } from "@/hooks/useVerticals";
import { cn } from "@/lib/utils";
import type {
  CourseOutline,
  GeneratedMaterial,
  Presentation,
  Schematic,
} from "@/types";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  CircuitBoard,
  Download,
  FileOutput,
  Mic,
  MicOff,
  Presentation as PresentationIcon,
  Save,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

type GenTab = "course" | "schematic" | "presentation";

type GeneratedResult =
  | { type: "course"; data: CourseOutline }
  | { type: "schematic"; data: Schematic }
  | { type: "presentation"; data: Presentation };

const TABS: { id: GenTab; label: string; icon: React.ElementType }[] = [
  { id: "course", label: "Course", icon: BookOpen },
  { id: "schematic", label: "Schematic", icon: CircuitBoard },
  { id: "presentation", label: "Presentation", icon: PresentationIcon },
];

const TYPE_COLORS: Record<string, string> = {
  course: "border-chart-1 text-chart-1",
  schematic: "border-chart-2 text-chart-2",
  presentation: "border-chart-3 text-chart-3",
};

// ── Web Speech API types ──────────────────────────────────────────────────────

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function downloadText(content: string, filename: string) {
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

// ── Mic button ────────────────────────────────────────────────────────────────

interface MicButtonProps {
  onTranscript: (text: string, isFinal: boolean) => void;
}

function MicButton({ onTranscript }: MicButtonProps) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const SpeechAPI = getSpeechRecognition();

  if (!SpeechAPI) return null;

  // SpeechAPI is guaranteed non-null here; capture for use in closure below
  const SpeechAPINonNull = SpeechAPI;

  function toggle() {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const r = new SpeechAPINonNull();
    r.continuous = true;
    r.interimResults = true;
    r.lang = "en-US";
    r.onresult = (e: SpeechRecognitionEvent) => {
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
      toast.error("Speech recognition error. Check microphone permissions.");
    };
    r.onend = () => setListening(false);
    r.start();
    recognitionRef.current = r;
    setListening(true);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggle}
      className={cn(
        "h-7 w-7 p-0 flex-shrink-0 transition-all duration-200",
        listening
          ? "text-primary border border-primary/60 bg-primary/10 animate-pulse"
          : "text-muted-foreground hover:text-primary hover:bg-primary/10",
      )}
      aria-label={listening ? "Stop listening" : "Start voice input"}
      data-ocid="generate.mic_button"
      title={listening ? "Click to stop voice input" : "Click to speak"}
    >
      {listening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
    </Button>
  );
}

// ── Structured output renderers ──────────────────────────────────────────────

function CourseResult({ data }: { data: CourseOutline }) {
  const [showMarkdown, setShowMarkdown] = useState(false);
  return (
    <div className="space-y-4">
      <h2 className="font-mono text-sm font-semibold text-foreground leading-snug">
        {data.title}
      </h2>
      <div className="space-y-3">
        {data.modules.map((mod, i) => (
          <div
            key={mod.moduleName}
            className="border border-border rounded bg-card/60 overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-border/60 bg-muted/20 flex items-center gap-2">
              <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest w-5 text-center">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs font-semibold text-foreground">
                {mod.moduleName}
              </span>
            </div>
            <div className="p-3 grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="font-mono text-[9px] text-muted-foreground uppercase mb-1.5">
                  Objectives
                </div>
                <ul className="space-y-1">
                  {mod.objectives.map((obj) => (
                    <li
                      key={obj}
                      className="flex gap-1.5 items-start font-body text-foreground/85"
                    >
                      <span className="text-primary mt-0.5 flex-shrink-0">
                        ›
                      </span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-mono text-[9px] text-muted-foreground uppercase mb-1.5">
                  Lab Exercises
                </div>
                <ul className="space-y-1">
                  {mod.labExercises.map((lab) => (
                    <li
                      key={lab}
                      className="flex gap-1.5 items-start font-body text-foreground/85"
                    >
                      <span className="text-accent mt-0.5 flex-shrink-0">
                        ⌘
                      </span>
                      <span>{lab}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          type="button"
          onClick={() => setShowMarkdown(!showMarkdown)}
          className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground uppercase hover:text-foreground transition-smooth mb-2"
        >
          {showMarkdown ? (
            <ChevronUp className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
          Full Markdown
        </button>
        {showMarkdown && (
          <pre className="bg-background border border-border rounded p-3 font-mono text-[10px] text-muted-foreground whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-72 overflow-y-auto">
            {data.fullMarkdown}
          </pre>
        )}
      </div>
    </div>
  );
}

function SchematicResult({ data }: { data: Schematic }) {
  return (
    <div className="space-y-4">
      <h2 className="font-mono text-sm font-semibold text-foreground">
        {data.title}
      </h2>
      <div>
        <div className="font-mono text-[9px] text-muted-foreground uppercase mb-2">
          ASCII Diagram
        </div>
        <pre className="bg-background border border-border rounded p-4 font-mono text-[11px] text-foreground/90 whitespace-pre leading-relaxed overflow-x-auto">
          {data.asciiDiagram}
        </pre>
      </div>
      <div>
        <div className="font-mono text-[9px] text-muted-foreground uppercase mb-2">
          Components
        </div>
        <div className="flex flex-wrap gap-1.5">
          {data.componentList.map((c) => (
            <Badge
              key={c}
              variant="outline"
              className="font-mono text-[10px] h-5 px-2 border-primary/40 text-primary/80"
            >
              {c}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <div className="font-mono text-[9px] text-muted-foreground uppercase mb-1.5">
          Notes
        </div>
        <p className="font-body text-sm text-foreground/80 leading-relaxed border-l-2 border-primary/30 pl-3">
          {data.notes}
        </p>
      </div>
    </div>
  );
}

function PresentationResult({ data }: { data: Presentation }) {
  return (
    <div className="space-y-4">
      <h2 className="font-mono text-sm font-semibold text-foreground">
        {data.title}
      </h2>
      <div>
        <div className="font-mono text-[9px] text-muted-foreground uppercase mb-2">
          Talking Points
        </div>
        <blockquote className="border-l-2 border-accent/50 pl-3 bg-accent/5 py-2 pr-3 rounded-r font-body text-sm text-foreground/85 italic leading-relaxed">
          {data.talkingPointsSummary}
        </blockquote>
      </div>
      <div>
        <div className="font-mono text-[9px] text-muted-foreground uppercase mb-2">
          Slides
        </div>
        <div className="space-y-2">
          {data.slides.map((slide, i) => (
            <div
              key={slide.slideTitle}
              className="border border-border rounded overflow-hidden bg-card/60"
            >
              <div className="px-3 py-2 border-b border-border/60 bg-muted/20 flex items-center gap-2">
                <span className="font-mono text-[9px] text-primary font-bold w-5 text-center">
                  {i + 1}
                </span>
                <span className="font-mono text-xs font-semibold text-foreground">
                  {slide.slideTitle}
                </span>
              </div>
              <ul className="px-3 py-2 space-y-1">
                {slide.bulletPoints.map((bp) => (
                  <li
                    key={bp}
                    className="flex gap-1.5 items-start font-body text-xs text-foreground/80"
                  >
                    <span className="text-primary/60 mt-0.5 flex-shrink-0">
                      •
                    </span>
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Saved material expandable row ────────────────────────────────────────────

function MaterialRow({ m, index }: { m: GeneratedMaterial; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-border/50 last:border-0"
      data-ocid={`generate.material_item.${index}`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 hover:bg-muted/20 transition-smooth"
      >
        <div className="flex items-center gap-2 min-w-0">
          <Badge
            variant="outline"
            className={cn(
              "font-mono text-[8px] h-4 px-1.5 flex-shrink-0",
              TYPE_COLORS[m.kind] ??
                "border-muted-foreground text-muted-foreground",
            )}
          >
            {m.kind.toUpperCase()}
          </Badge>
          <span className="font-body text-xs text-foreground truncate">
            {m.title}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-mono text-[9px] text-muted-foreground hidden sm:inline">
            {formatDate(m.createdAt)}
          </span>
          {open ? (
            <ChevronUp className="w-3 h-3 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          )}
        </div>
      </button>
      {open && (
        <div className="px-3 pb-3 bg-background/40">
          <pre className="font-mono text-[10px] text-muted-foreground whitespace-pre-wrap leading-relaxed border border-border/40 rounded p-2 max-h-40 overflow-y-auto bg-background">
            {m.content}
          </pre>
        </div>
      )}
    </div>
  );
}

// ── Download helper for generated results ─────────────────────────────────────

function buildDownloadContent(
  result: GeneratedResult,
  vertical: string,
  product: string,
): { content: string; filename: string } {
  const vertSlug = slugify(vertical);
  const prodSlug = slugify(product);
  const prefix = [vertSlug, prodSlug].filter(Boolean).join("-") || "moku";

  if (result.type === "course") {
    return {
      content: result.data.fullMarkdown,
      filename: `${prefix}-course.md`,
    };
  }
  if (result.type === "schematic") {
    const lines = [
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
      result.data.notes,
    ];
    return {
      content: lines.join("\n"),
      filename: `${prefix}-schematic.txt`,
    };
  }
  // presentation
  const slideLines = result.data.slides.map(
    (s, i) =>
      `### Slide ${i + 1}: ${s.slideTitle}\n${s.bulletPoints.map((b) => `- ${b}`).join("\n")}`,
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
    slideLines.join("\n\n"),
  ];
  return {
    content: lines.join("\n"),
    filename: `${prefix}-presentation.md`,
  };
}

// ── Main page ────────────────────────────────────────────────────────────────

export function GeneratePage() {
  const [activeTab, setActiveTab] = useState<GenTab>("course");
  const [vertical, setVertical] = useState("");
  const [product, setProduct] = useState("");
  const [useCase, setUseCase] = useState("");
  const [useCaseInterim, setUseCaseInterim] = useState("");

  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [savedResult, setSavedResult] = useState(false);

  const { data: verticals } = useVerticals();
  const { data: products } = useProducts();
  const { data: materials, isLoading: loadingMaterials } = useMaterials();

  const generateCourse = useGenerateCourse();
  const generateSchematic = useGenerateSchematic();
  const generatePresentation = useGeneratePresentation();
  const saveMaterial = useSaveMaterial();

  const isGenerating =
    generateCourse.isPending ||
    generateSchematic.isPending ||
    generatePresentation.isPending;

  const handleUseCaseTranscript = useCallback(
    (text: string, isFinal: boolean) => {
      if (isFinal) {
        setUseCase((prev) => (prev ? `${prev} ${text}` : text));
        setUseCaseInterim("");
      } else {
        setUseCaseInterim(text);
      }
    },
    [],
  );

  function switchTab(tab: GenTab) {
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
          toast.error("Select a vertical");
          return;
        }
        const data = await generateCourse.mutateAsync({
          vertical,
          product: product || undefined,
        });
        setResult({ type: "course", data });
      } else if (activeTab === "schematic") {
        const combinedUseCase = (
          useCase + (useCaseInterim ? ` ${useCaseInterim}` : "")
        ).trim();
        if (!combinedUseCase) {
          toast.error("Enter a use case description");
          return;
        }
        const data = await generateSchematic.mutateAsync({
          useCaseDescription: combinedUseCase,
        });
        setResult({ type: "schematic", data });
      } else {
        if (!vertical || !product) {
          toast.error("Select both a vertical and product");
          return;
        }
        const data = await generatePresentation.mutateAsync({
          vertical,
          product,
        });
        setResult({ type: "presentation", data });
      }
    } catch {
      toast.error("Generation failed. Ensure the API key is configured.");
    }
  }

  async function handleSave() {
    if (!result) return;
    const title = result.data.title;
    const content =
      result.type === "course"
        ? result.data.fullMarkdown
        : result.type === "schematic"
          ? `${result.data.asciiDiagram}\n\nComponents: ${result.data.componentList.join(", ")}\n\nNotes: ${result.data.notes}`
          : `${result.data.talkingPointsSummary}\n\n${result.data.slides.map((s, i) => `Slide ${i + 1}: ${s.slideTitle}\n${s.bulletPoints.join("\n")}`).join("\n\n")}`;
    try {
      await saveMaterial.mutateAsync({ kind: result.type, title, content });
      setSavedResult(true);
      toast.success("Material saved");
    } catch {
      toast.error("Save failed");
    }
  }

  function handleDownload() {
    if (!result) return;
    const { content, filename } = buildDownloadContent(
      result,
      vertical,
      product,
    );
    downloadText(content, filename);
  }

  const canGenerate =
    activeTab === "schematic"
      ? useCase.trim().length > 0 || useCaseInterim.trim().length > 0
      : activeTab === "presentation"
        ? !!vertical && !!product
        : !!vertical;

  const displayUseCase = useCase + (useCaseInterim ? ` ${useCaseInterim}` : "");

  return (
    <div
      className="flex h-full min-h-0 overflow-hidden"
      data-ocid="generate.page"
    >
      {/* ── Left panel: controls + saved list ────────────────────────────── */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-border overflow-y-auto bg-card/30">
        {/* Header */}
        <div className="px-3 pt-3 pb-2.5 border-b border-border">
          <h1 className="font-mono text-[9px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
            <FileOutput className="w-3 h-3 text-primary" />
            Material Generator
          </h1>
        </div>

        {/* Tab selector */}
        <div className="flex border-b border-border" data-ocid="generate.tabs">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => switchTab(id)}
              className={cn(
                "flex-1 flex flex-col items-center gap-0.5 px-1 py-2 font-mono text-[8px] uppercase tracking-wide transition-smooth",
                activeTab === id
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/10",
              )}
              data-ocid={`generate.tab.${id}`}
            >
              <Icon className="w-3 h-3" />
              {label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="p-3 space-y-2.5 border-b border-border">
          {(activeTab === "course" || activeTab === "presentation") && (
            <>
              <div className="space-y-1">
                <label
                  htmlFor="gen-vertical"
                  className="font-mono text-[8px] text-muted-foreground uppercase"
                >
                  Vertical
                </label>
                <select
                  id="gen-vertical"
                  value={vertical}
                  onChange={(e) => setVertical(e.target.value)}
                  className="w-full h-7 bg-background border border-input rounded px-2 text-xs text-foreground font-body focus:outline-none focus:ring-1 focus:ring-ring"
                  data-ocid="generate.vertical_select"
                >
                  <option value="">Select vertical...</option>
                  {verticals?.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="gen-product"
                  className="font-mono text-[8px] text-muted-foreground uppercase"
                >
                  Product
                  {activeTab === "course" && (
                    <span className="text-muted-foreground/60 ml-1">
                      (optional)
                    </span>
                  )}
                </label>
                <select
                  id="gen-product"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full h-7 bg-background border border-input rounded px-2 text-xs text-foreground font-body focus:outline-none focus:ring-1 focus:ring-ring"
                  data-ocid="generate.product_select"
                >
                  <option value="">Select product...</option>
                  {products?.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {activeTab === "schematic" && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="gen-usecase"
                  className="font-mono text-[8px] text-muted-foreground uppercase"
                >
                  Use Case Description
                </label>
                <MicButton onTranscript={handleUseCaseTranscript} />
              </div>
              <div className="relative">
                <Textarea
                  id="gen-usecase"
                  value={displayUseCase}
                  onChange={(e) => {
                    setUseCase(e.target.value);
                    setUseCaseInterim("");
                  }}
                  placeholder="e.g., Radar pulse compression for DRDO using Moku Pro with custom FPGA instrument... (or click mic to speak)"
                  className={cn(
                    "resize-none font-body text-xs bg-background min-h-[72px]",
                    useCaseInterim && "text-muted-foreground",
                  )}
                  rows={4}
                  data-ocid="generate.usecase_input"
                />
                {useCaseInterim && (
                  <div className="absolute bottom-1.5 right-2 font-mono text-[8px] text-primary/60 pointer-events-none">
                    listening…
                  </div>
                )}
              </div>
            </div>
          )}

          <Button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !canGenerate}
            className="w-full font-mono text-[10px] h-7"
            data-ocid="generate.generate_button"
          >
            {isGenerating ? (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Generating...
              </span>
            ) : (
              `Generate ${activeTab === "course" ? "Course" : activeTab === "schematic" ? "Schematic" : "Outline"}`
            )}
          </Button>
        </div>

        {/* Saved materials list */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-3 py-2 font-mono text-[8px] text-muted-foreground uppercase tracking-widest border-b border-border/50 flex items-center justify-between">
            Saved Materials
            {materials && materials.length > 0 && (
              <Badge
                variant="outline"
                className="font-mono text-[8px] h-4 px-1"
              >
                {materials.length}
              </Badge>
            )}
          </div>

          {loadingMaterials && (
            <div
              className="p-3 space-y-2"
              data-ocid="generate.materials_loading_state"
            >
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-4/5" />
            </div>
          )}

          {!loadingMaterials && (!materials || materials.length === 0) && (
            <div
              className="px-3 py-4 text-center"
              data-ocid="generate.materials_empty_state"
            >
              <div className="font-mono text-[9px] text-muted-foreground">
                No saved materials yet.
              </div>
              <div className="font-mono text-[9px] text-muted-foreground/50 mt-1">
                Generate and save to see them here.
              </div>
            </div>
          )}

          {materials?.map((m, i) => (
            <MaterialRow key={m.id} m={m} index={i + 1} />
          ))}
        </div>
      </aside>

      {/* ── Right panel: output ───────────────────────────────────────────── */}
      <main
        className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background"
        data-ocid="generate.output_panel"
      >
        {/* Empty state */}
        {!result && !isGenerating && (
          <div
            className="flex flex-col items-center justify-center h-full gap-3 text-center p-8"
            data-ocid="generate.output_empty_state"
          >
            <FileOutput className="w-10 h-10 text-primary/20" />
            <div className="space-y-1">
              <div className="font-mono text-sm text-muted-foreground">
                Nothing generated yet
              </div>
              <p className="font-body text-xs text-muted-foreground/60 max-w-xs">
                Select a tab, configure the inputs, and click Generate. Results
                appear here as structured, readable output.
              </p>
            </div>
          </div>
        )}

        {/* Loading state */}
        {isGenerating && (
          <div
            className="flex flex-col items-center justify-center h-full gap-4"
            data-ocid="generate.output_loading_state"
          >
            <div className="relative">
              <div className="w-10 h-10 border-2 border-primary/20 rounded-full" />
              <div className="absolute inset-0 w-10 h-10 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
            </div>
            <div className="space-y-1 text-center">
              <div className="font-mono text-xs text-foreground">
                Generating content…
              </div>
              <div className="font-mono text-[9px] text-muted-foreground">
                AI is crafting your {activeTab} material
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {result && !isGenerating && (
          <div className="flex flex-col h-full">
            {/* Output header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card flex-shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <Badge
                  variant="outline"
                  className={cn(
                    "font-mono text-[8px] h-5 px-1.5 flex-shrink-0",
                    TYPE_COLORS[result.type] ?? "",
                  )}
                >
                  {result.type.toUpperCase()}
                </Badge>
                <span className="font-mono text-xs font-semibold text-foreground truncate">
                  {result.data.title}
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                {/* Download button */}
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="font-mono text-[10px] h-7 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10 gap-1"
                  onClick={handleDownload}
                  data-ocid="generate.download_button"
                  aria-label="Download generated content"
                >
                  <Download className="w-3 h-3" />
                  Download
                </Button>
                {/* Save button */}
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="font-mono text-[10px] h-7"
                  onClick={handleSave}
                  disabled={saveMaterial.isPending || savedResult}
                  data-ocid="generate.save_button"
                >
                  {saveMaterial.isPending ? (
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 border border-muted-foreground/40 border-t-foreground rounded-full animate-spin" />
                      Saving…
                    </span>
                  ) : savedResult ? (
                    <span className="text-chart-1">✓ Saved</span>
                  ) : (
                    <>
                      <Save className="w-3 h-3 mr-1" />
                      Save
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Structured content */}
            <div className="flex-1 overflow-y-auto p-4">
              {result.type === "course" && <CourseResult data={result.data} />}
              {result.type === "schematic" && (
                <SchematicResult data={result.data} />
              )}
              {result.type === "presentation" && (
                <PresentationResult data={result.data} />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
