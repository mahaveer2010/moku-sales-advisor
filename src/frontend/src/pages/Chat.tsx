import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  useAppendMessage,
  useChatSession,
  useDeleteSession,
  useGetAdvisorAdvice,
} from "@/hooks/useChatSession";
import { useProducts } from "@/hooks/useProducts";
import { useVerticals } from "@/hooks/useVerticals";
import { cn } from "@/lib/utils";
import type { AdvisorResponse, ChatMessage } from "@/types";
import {
  Bot,
  ChevronRight,
  Cpu,
  Download,
  Layers,
  Loader2,
  Mic,
  MicOff,
  RotateCcw,
  Send,
  Sliders,
  User,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const SESSION_ID = "default-session";

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

// ── Code block helpers ────────────────────────────────────────────────────────

interface CodeBlock {
  language: string;
  code: string;
}

const LANG_EXT: Record<string, string> = {
  verilog: ".v",
  vhdl: ".vhd",
  python: ".py",
  matlab: ".m",
  javascript: ".js",
  typescript: ".ts",
  js: ".js",
  ts: ".ts",
  bash: ".sh",
  shell: ".sh",
  c: ".c",
  cpp: ".cpp",
  "c++": ".cpp",
};

function parseCodeBlocks(text: string): CodeBlock[] {
  const regex = /```(\w*)\n([\s\S]*?)```/g;
  const blocks: CodeBlock[] = [];
  let match: RegExpExecArray | null;
  // biome-ignore lint/suspicious/noAssignInExpressions: standard regex pattern
  while ((match = regex.exec(text)) !== null) {
    blocks.push({ language: match[1] ?? "", code: match[2] ?? "" });
  }
  return blocks;
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
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
        "h-9 w-9 p-0 flex-shrink-0 transition-all duration-200",
        listening
          ? "text-primary border border-primary/60 bg-primary/10 animate-pulse"
          : "text-muted-foreground hover:text-primary hover:bg-primary/10",
      )}
      aria-label={listening ? "Stop listening" : "Start voice input"}
      data-ocid="chat.mic_button"
      title={listening ? "Click to stop voice input" : "Click to speak"}
    >
      {listening ? (
        <MicOff className="w-3.5 h-3.5" />
      ) : (
        <Mic className="w-3.5 h-3.5" />
      )}
    </Button>
  );
}

// ── Code block with download ──────────────────────────────────────────────────

function CodeBlockDisplay({
  block,
  queryContext,
}: {
  block: CodeBlock;
  queryContext: string;
}) {
  const ext = LANG_EXT[block.language.toLowerCase()] ?? ".txt";
  const filename = `${slugify(queryContext) || "code"}${ext}`;

  return (
    <div className="my-2 rounded border border-border overflow-hidden">
      <div className="flex items-center justify-between px-2 py-1 bg-muted/40 border-b border-border">
        <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
          {block.language || "code"}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-5 px-1.5 font-mono text-[9px] text-muted-foreground hover:text-primary hover:bg-primary/10 gap-1"
          onClick={() => downloadText(block.code, filename)}
          data-ocid="chat.code_download_button"
          aria-label={`Download ${block.language} code`}
        >
          <Download className="w-2.5 h-2.5" />
          Download {ext}
        </Button>
      </div>
      <pre className="font-mono text-[10px] text-foreground/90 bg-background p-3 whitespace-pre-wrap overflow-x-auto leading-relaxed">
        <code>{block.code}</code>
      </pre>
    </div>
  );
}

// ── Raw response with code block detection ────────────────────────────────────

function RawResponseView({
  text,
  queryContext,
}: {
  text: string;
  queryContext: string;
}) {
  const codeBlocks = parseCodeBlocks(text);
  if (codeBlocks.length === 0) {
    return (
      <pre className="font-mono text-[10px] text-muted-foreground whitespace-pre-wrap leading-relaxed bg-background border border-border rounded p-2 max-h-48 overflow-y-auto">
        {text}
      </pre>
    );
  }

  // Split text into prose and code segments
  const segments: Array<{
    kind: "text" | "code";
    content: string;
    lang?: string;
  }> = [];
  const fenceRegex = /```(\w*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  // biome-ignore lint/suspicious/noAssignInExpressions: standard regex pattern
  while ((m = fenceRegex.exec(text)) !== null) {
    if (m.index > lastIndex) {
      segments.push({ kind: "text", content: text.slice(lastIndex, m.index) });
    }
    segments.push({ kind: "code", content: m[2] ?? "", lang: m[1] ?? "" });
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < text.length) {
    segments.push({ kind: "text", content: text.slice(lastIndex) });
  }

  return (
    <div className="space-y-2">
      {segments.map((seg, idx) => {
        if (seg.kind === "text" && seg.content.trim()) {
          return (
            <pre
              // biome-ignore lint/suspicious/noArrayIndexKey: positional segments have no stable id
              key={idx}
              className="font-mono text-[10px] text-muted-foreground whitespace-pre-wrap leading-relaxed"
            >
              {seg.content}
            </pre>
          );
        }
        if (seg.kind === "code") {
          return (
            <CodeBlockDisplay
              // biome-ignore lint/suspicious/noArrayIndexKey: positional segments have no stable id
              key={idx}
              block={{ language: seg.lang ?? "", code: seg.content }}
              queryContext={queryContext}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

// ── Message types ─────────────────────────────────────────────────────────────

interface AdvisorMessageCard {
  type: "advisor";
  response: AdvisorResponse;
  timestamp: bigint;
  query: string;
}
interface PlainMessage {
  type: "plain";
  msg: ChatMessage;
}
type DisplayMessage = AdvisorMessageCard | PlainMessage;

// ── Main Chat page ────────────────────────────────────────────────────────────

export function ChatPage() {
  const [displayMessages, setDisplayMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState("");
  const [interimText, setInterimText] = useState("");
  const [selectedVertical, setSelectedVertical] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const endRef = useRef<HTMLDivElement>(null);

  const { data: verticals = [] } = useVerticals();
  const { data: products = [] } = useProducts();
  const { data: session } = useChatSession(SESSION_ID);
  const appendMsg = useAppendMessage(SESSION_ID);
  const deleteSession = useDeleteSession();
  const advisorMutation = useGetAdvisorAdvice();

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally run only when session loads
  useEffect(() => {
    if (
      session &&
      session.messages.length > 0 &&
      displayMessages.length === 0
    ) {
      const synced: DisplayMessage[] = session.messages.map((m) => ({
        type: "plain",
        msg: m,
      }));
      setDisplayMessages(synced);
    }
  }, [session]);

  // Escape key stops mic (handled by MicButton's onend), also clears interim
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setInterimText("");
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function scrollToEnd() {
    setTimeout(
      () => endRef.current?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
  }

  const handleTranscript = useCallback((text: string, isFinal: boolean) => {
    if (isFinal) {
      setInput((prev) => (prev ? `${prev} ${text}` : text));
      setInterimText("");
    } else {
      setInterimText(text);
    }
  }, []);

  async function handleSend() {
    const text = (input + (interimText ? ` ${interimText}` : "")).trim();
    if (!text) return;
    setInput("");
    setInterimText("");

    const userMsg: ChatMessage = {
      content: text,
      role: "user",
      timestamp: BigInt(Date.now()),
    };
    setDisplayMessages((prev) => [...prev, { type: "plain", msg: userMsg }]);
    scrollToEnd();

    try {
      const sessionHistory = displayMessages
        .filter((d) => d.type === "plain")
        .map((d) => {
          const plain = d as PlainMessage;
          return { content: plain.msg.content, role: plain.msg.role };
        });

      const advice = await advisorMutation.mutateAsync({
        query: text,
        context: {
          vertical: selectedVertical || undefined,
          product: selectedProduct || undefined,
          sessionHistory,
        },
      });

      setDisplayMessages((prev) => [
        ...prev,
        {
          type: "advisor",
          response: advice,
          timestamp: BigInt(Date.now()),
          query: text,
        },
      ]);
      scrollToEnd();

      appendMsg.mutate({ role: "user", content: text });
      appendMsg.mutate({ role: "assistant", content: advice.rawResponse });
    } catch {
      toast.error("Advisor unavailable. Check API key in settings.");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleClearSession() {
    setDisplayMessages([]);
    deleteSession.mutate(SESSION_ID, {
      onError: () => toast.error("Failed to clear session"),
    });
  }

  function handleDownloadResponse(response: AdvisorResponse, query: string) {
    const lines = [
      "# Moku Advisor Response\n",
      `**Query:** ${query}\n`,
      `**Recommended Product:** ${response.recommendedProduct}\n`,
      `**Use Case Summary:** ${response.useCaseSummary}\n`,
      `**Instruments:** ${response.recommendedInstruments.join(", ")}\n`,
      "\n## Next Steps\n",
      response.nextSteps.map((s, i) => `${i + 1}. ${s}`).join("\n"),
      response.rawResponse
        ? `\n\n## Full Response\n\n${response.rawResponse}`
        : "",
    ];
    const content = lines.join("\n");
    const filename = `${slugify(query) || "moku-response"}.md`;
    downloadText(content, filename);
  }

  const isLoading = advisorMutation.isPending;
  const hasVertical = !!selectedVertical?.trim();
  const hasProduct = !!selectedProduct?.trim();
  const displayInput = input + (interimText ? ` ${interimText}` : "");

  return (
    <div className="flex h-full overflow-hidden" data-ocid="chat.page">
      {/* ── Left context panel ───────────────────────────────────── */}
      <aside
        className="w-56 flex-shrink-0 border-r border-border bg-card flex flex-col gap-0 overflow-y-auto"
        data-ocid="chat.context_panel"
      >
        <div className="px-3 pt-3 pb-2">
          <div className="flex items-center gap-1.5 mb-3">
            <Sliders className="w-3 h-3 text-primary" />
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              Context
            </span>
          </div>

          {/* Vertical selector */}
          <div className="space-y-1 mb-3">
            {/* biome-ignore lint/a11y/noLabelWithoutControl: shadcn Select is not a native input */}
            <label className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Layers className="w-2.5 h-2.5" /> Vertical
            </label>
            <Select
              value={selectedVertical}
              onValueChange={setSelectedVertical}
            >
              <SelectTrigger
                className="h-7 text-xs font-body bg-background"
                data-ocid="chat.vertical_select"
              >
                <SelectValue placeholder="All verticals" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" " className="text-xs font-body">
                  All verticals
                </SelectItem>
                {verticals.map((v) => (
                  <SelectItem
                    key={v.id}
                    value={v.id}
                    className="text-xs font-body"
                  >
                    {v.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Product selector */}
          <div className="space-y-1 mb-3">
            {/* biome-ignore lint/a11y/noLabelWithoutControl: shadcn Select is not a native input */}
            <label className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Cpu className="w-2.5 h-2.5" /> Product
            </label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger
                className="h-7 text-xs font-body bg-background"
                data-ocid="chat.product_select"
              >
                <SelectValue placeholder="All products" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" " className="text-xs font-body">
                  All products
                </SelectItem>
                {products.map((p) => (
                  <SelectItem
                    key={p.id}
                    value={p.id}
                    className="text-xs font-body"
                  >
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator className="mb-3" />

          {/* Session info */}
          <div className="space-y-1 mb-3">
            <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
              Session
            </span>
            <div className="font-mono text-[10px] text-muted-foreground bg-background border border-border rounded px-2 py-1">
              {SESSION_ID}
            </div>
          </div>

          {/* Context chips */}
          {hasVertical || hasProduct ? (
            <div className="space-y-1 mb-3">
              <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
                Active
              </span>
              <div className="flex flex-wrap gap-1">
                {hasVertical && (
                  <Badge
                    variant="secondary"
                    className="font-mono text-[9px] h-4 px-1.5"
                  >
                    {verticals.find((v) => v.id === selectedVertical)?.name ??
                      selectedVertical}
                  </Badge>
                )}
                {hasProduct && (
                  <Badge
                    variant="outline"
                    className="font-mono text-[9px] h-4 px-1.5"
                  >
                    {products.find((p) => p.id === selectedProduct)?.name ??
                      selectedProduct}
                  </Badge>
                )}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-auto px-3 pb-3">
          <Separator className="mb-3" />
          <Button
            variant="ghost"
            size="sm"
            className="w-full h-7 text-xs font-body text-muted-foreground justify-start gap-1.5 hover:text-destructive hover:bg-destructive/10"
            onClick={handleClearSession}
            disabled={displayMessages.length === 0}
            data-ocid="chat.clear_session_button"
          >
            <RotateCcw className="w-3 h-3" />
            Clear session
          </Button>
        </div>
      </aside>

      {/* ── Main chat area ───────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
          data-ocid="chat.messages_list"
        >
          {displayMessages.length === 0 && !isLoading && (
            <div
              className="flex flex-col items-center justify-center h-full text-center py-16"
              data-ocid="chat.empty_state"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="font-mono text-sm font-semibold text-foreground mb-1">
                Moku AI Advisor
              </div>
              <p className="font-body text-xs text-muted-foreground max-w-xs mb-5">
                Describe a customer use case, domain challenge, or requirement.
                Get tailored Moku product, instrument, and solution
                recommendations.
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-md">
                {[
                  "Radar pulse compression for DRDO using Moku Pro",
                  "ISRO satellite telemetry signal acquisition",
                  "Tejas Networks RF test automation workflow",
                  "Python API script to automate spectrum analysis",
                ].map((prompt) => (
                  <button
                    type="button"
                    key={prompt}
                    onClick={() => setInput(prompt)}
                    className="font-mono text-[10px] border border-border rounded px-2.5 py-1.5 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-smooth text-left"
                    data-ocid="chat.example_prompt"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {displayMessages.map((item, i) => {
            if (item.type === "plain") {
              const { msg } = item;
              return (
                <div
                  key={`plain-${Number(msg.timestamp)}-${i}`}
                  className={cn(
                    "flex gap-2.5",
                    msg.role === "user" ? "justify-end" : "justify-start",
                  )}
                  data-ocid={`chat.message.${i + 1}`}
                >
                  {msg.role !== "user" && (
                    <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[70%] rounded px-3 py-2 text-sm font-body",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border text-foreground",
                    )}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed text-xs">
                      {msg.content}
                    </p>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-6 h-6 rounded bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              );
            }

            // Advisor response card
            const { response, query } = item;
            const codeBlocks = parseCodeBlocks(response.rawResponse ?? "");
            return (
              <div
                key={`advisor-${Number(item.timestamp)}-${i}`}
                className="flex gap-2.5 justify-start"
                data-ocid={`chat.message.${i + 1}`}
              >
                <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                </div>
                <div
                  className="flex-1 max-w-[85%] rounded border border-primary/20 bg-card overflow-hidden"
                  data-ocid={`chat.advisor_card.${i + 1}`}
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-border bg-primary/5">
                    <div className="flex items-center gap-2 min-w-0">
                      <Badge
                        variant="default"
                        className="font-mono text-[10px] h-5 px-2 flex-shrink-0"
                        data-ocid={`chat.recommended_product.${i + 1}`}
                      >
                        {response.recommendedProduct}
                      </Badge>
                      <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest truncate">
                        Advisor Recommendation
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 px-1.5 font-mono text-[9px] text-muted-foreground hover:text-primary hover:bg-primary/10 gap-1 flex-shrink-0"
                      onClick={() => handleDownloadResponse(response, query)}
                      aria-label="Download advisor response"
                      data-ocid={`chat.download_response_button.${i + 1}`}
                    >
                      <Download className="w-2.5 h-2.5" />
                      .md
                    </Button>
                  </div>

                  <div className="p-3 grid grid-cols-[1fr_auto] gap-x-4 gap-y-3">
                    {/* Use case summary */}
                    <div className="col-span-2 space-y-1">
                      <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
                        Use Case Summary
                      </div>
                      <p className="font-body text-xs text-foreground leading-relaxed">
                        {response.useCaseSummary}
                      </p>
                    </div>

                    {/* Instruments */}
                    <div className="space-y-1">
                      <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
                        Instruments
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {response.recommendedInstruments.map((inst) => (
                          <Badge
                            key={inst}
                            variant="secondary"
                            className="font-mono text-[9px] h-4 px-1.5"
                            data-ocid={`chat.instrument_badge.${i + 1}`}
                          >
                            {inst}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Next steps */}
                    <div className="col-span-2 space-y-1">
                      <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
                        Next Steps
                      </div>
                      <ol className="space-y-1">
                        {response.nextSteps.map((ns) => (
                          <li
                            key={ns}
                            className="flex items-start gap-2 text-xs text-foreground font-body"
                          >
                            <span className="font-mono text-primary font-bold text-[10px] mt-0.5 w-3 flex-shrink-0">
                              ›
                            </span>
                            <span className="leading-relaxed">{ns}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Raw response expandable toggle */}
                  {response.rawResponse && (
                    <details className="border-t border-border">
                      <summary className="flex items-center gap-1.5 px-3 py-2 cursor-pointer font-mono text-[9px] text-muted-foreground uppercase tracking-wider hover:text-foreground transition-smooth select-none">
                        <ChevronRight className="w-2.5 h-2.5 transition-transform [details[open]_&]:rotate-90" />
                        Full response
                        {codeBlocks.length > 0 && (
                          <Badge
                            variant="secondary"
                            className="font-mono text-[8px] h-4 px-1 ml-1"
                          >
                            {codeBlocks.length} code block
                            {codeBlocks.length !== 1 ? "s" : ""}
                          </Badge>
                        )}
                      </summary>
                      <div className="px-3 pb-3">
                        <RawResponseView
                          text={response.rawResponse}
                          queryContext={query}
                        />
                      </div>
                    </details>
                  )}
                </div>
              </div>
            );
          })}

          {/* Thinking indicator */}
          {isLoading && (
            <div className="flex gap-2.5" data-ocid="chat.loading_state">
              <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
              </div>
              <div className="bg-card border border-border rounded px-3 py-2 flex items-center gap-2">
                <span className="font-mono text-[10px] text-muted-foreground animate-pulse">
                  Thinking...
                </span>
                <div className="flex gap-0.5">
                  {[0, 0.15, 0.3].map((delay) => (
                    <span
                      key={delay}
                      className="w-1 h-1 rounded-full bg-primary/50 animate-bounce"
                      style={{ animationDelay: `${delay}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* ── Input bar ─────────────────────────────────────────── */}
        <div
          className="px-4 pb-4 pt-2 border-t border-border bg-card"
          data-ocid="chat.input_area"
        >
          {/* Context indicator strip */}
          {(hasVertical || hasProduct) && (
            <div className="flex items-center gap-1.5 mb-2 font-mono text-[9px] text-muted-foreground">
              <span className="text-primary">▸</span>
              Context:
              {hasVertical && (
                <span className="text-foreground">
                  {verticals.find((v) => v.id === selectedVertical)?.name}
                </span>
              )}
              {hasVertical && hasProduct && (
                <span className="text-border">·</span>
              )}
              {hasProduct && (
                <span className="text-foreground">
                  {products.find((p) => p.id === selectedProduct)?.name}
                </span>
              )}
            </div>
          )}

          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <Textarea
                value={displayInput}
                onChange={(e) => {
                  setInput(e.target.value);
                  setInterimText("");
                }}
                onKeyDown={handleKeyDown}
                placeholder="Describe a use case, domain challenge, or customer requirement... (Enter to send, or use mic)"
                className={cn(
                  "resize-none font-body text-xs min-h-[60px] max-h-32 bg-background w-full",
                  interimText && "text-muted-foreground",
                )}
                rows={2}
                data-ocid="chat.input"
              />
              {interimText && (
                <div className="absolute bottom-1.5 right-2 font-mono text-[8px] text-primary/60 pointer-events-none">
                  listening…
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1.5 flex-shrink-0">
              <Button
                type="button"
                onClick={handleSend}
                disabled={!displayInput.trim() || isLoading}
                size="sm"
                className="h-9 w-9 p-0"
                data-ocid="chat.send_button"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
              <MicButton onTranscript={handleTranscript} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
