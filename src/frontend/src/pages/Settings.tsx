import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MODELS,
  type ModelValue,
  useGetExtendedThinking,
  useGetModel,
  useSetApiKey,
  useSetExtendedThinking,
  useSetModel,
} from "@/hooks/useSettings";
import {
  Brain,
  CheckCircle2,
  Key,
  Settings2,
  XCircle,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="mt-0.5 w-8 h-8 flex items-center justify-center bg-primary/10 border border-primary/30 flex-shrink-0">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <h2 className="font-mono text-sm font-bold text-foreground uppercase tracking-wider">
          {title}
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  );
}

function FeedbackBadge({
  status,
}: {
  status: "idle" | "success" | "error";
}) {
  if (status === "idle") return null;
  return (
    <span
      className={`flex items-center gap-1 text-xs font-mono ${
        status === "success" ? "text-accent" : "text-destructive"
      }`}
      data-ocid={`settings.${status}_state`}
    >
      {status === "success" ? (
        <>
          <CheckCircle2 className="w-3 h-3" /> Saved
        </>
      ) : (
        <>
          <XCircle className="w-3 h-3" /> Failed — check key
        </>
      )}
    </span>
  );
}

export function SettingsPage() {
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [apiKeyStatus, setApiKeyStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const { data: currentModel } = useGetModel();
  const { data: extendedThinking } = useGetExtendedThinking();

  const setApiKey = useSetApiKey();
  const setModel = useSetModel();
  const setExtendedThinking = useSetExtendedThinking();

  const isThinkingEligible = currentModel === "claude-3-7-sonnet-20250219";

  // Reset feedback after 4s
  useEffect(() => {
    if (apiKeyStatus !== "idle") {
      const t = setTimeout(() => setApiKeyStatus("idle"), 4000);
      return () => clearTimeout(t);
    }
  }, [apiKeyStatus]);

  async function handleSaveApiKey() {
    if (!apiKeyInput.trim()) return;
    try {
      await setApiKey.mutateAsync(apiKeyInput.trim());
      setApiKeyStatus("success");
      setApiKeyInput("");
    } catch {
      setApiKeyStatus("error");
    }
  }

  async function handleModelSelect(model: ModelValue) {
    await setModel.mutateAsync(model);
  }

  async function handleThinkingToggle() {
    if (!isThinkingEligible) return;
    await setExtendedThinking.mutateAsync(!extendedThinking);
  }

  return (
    <div
      className="flex flex-col min-h-full bg-background"
      data-ocid="settings.page"
    >
      {/* Page header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-primary" />
          <h1 className="font-mono text-base font-bold text-foreground uppercase tracking-widest">
            Settings
          </h1>
        </div>
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          Configure AI backend, model selection, and reasoning capabilities
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 max-w-2xl space-y-10">
        {/* ─── API KEY ─── */}
        <section data-ocid="settings.api_key_section">
          <SectionHeader
            icon={Key}
            title="Anthropic API Key"
            description="Your personal Anthropic API key. Stored securely in the backend canister."
          />
          <div className="space-y-3 pl-11">
            <div className="space-y-1.5">
              <Label
                htmlFor="api-key-input"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                Anthropic API Key
              </Label>
              <div className="flex gap-2">
                <Input
                  id="api-key-input"
                  type="password"
                  placeholder="sk-ant-api03-…"
                  value={apiKeyInput}
                  onChange={(e) => {
                    setApiKeyInput(e.target.value);
                    setApiKeyStatus("idle");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveApiKey()}
                  className="font-mono text-sm bg-card border-border focus:border-primary rounded-none flex-1"
                  autoComplete="off"
                  data-ocid="settings.api_key_input"
                />
                <Button
                  onClick={handleSaveApiKey}
                  disabled={!apiKeyInput.trim() || setApiKey.isPending}
                  className="font-mono text-xs uppercase tracking-wider rounded-none px-4"
                  data-ocid="settings.api_key_save_button"
                >
                  {setApiKey.isPending ? "Saving…" : "Save Key"}
                </Button>
              </div>
            </div>
            <div className="h-4">
              <FeedbackBadge status={apiKeyStatus} />
            </div>
            <p className="text-xs text-muted-foreground font-mono leading-relaxed">
              Get your key at{" "}
              <a
                href="https://console.anthropic.com/settings/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2 hover:text-primary transition-colors"
              >
                console.anthropic.com
              </a>
              . The key is never exposed to the browser after saving.
            </p>
          </div>
        </section>

        {/* ─── MODEL SELECTION ─── */}
        <section data-ocid="settings.model_section">
          <SectionHeader
            icon={Zap}
            title="Model Selection"
            description="Choose which Claude model powers the AI Advisor and code generation."
          />
          <div className="space-y-2 pl-11">
            {MODELS.map((model) => {
              const isActive = currentModel === model.value;
              return (
                <button
                  key={model.value}
                  type="button"
                  onClick={() => handleModelSelect(model.value)}
                  className={`w-full text-left flex items-center justify-between px-4 py-3 border transition-smooth
                    ${
                      isActive
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                    }`}
                  data-ocid={`settings.model_option_${model.value.replace(/-/g, "_")}`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-sm font-semibold">
                      {model.label.split(" — ")[0]}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {model.label.split(" — ")[1]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    <span className="font-mono text-xs text-muted-foreground hidden sm:block">
                      {model.value}
                    </span>
                    {isActive && (
                      <Badge
                        className="font-mono text-xs rounded-none bg-primary text-primary-foreground border-0 px-2 py-0.5"
                        data-ocid="settings.model_active_badge"
                      >
                        ACTIVE
                      </Badge>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ─── EXTENDED THINKING ─── */}
        <section data-ocid="settings.extended_thinking_section">
          <SectionHeader
            icon={Brain}
            title="Extended Thinking"
            description="Enables Claude 3.7 Sonnet's chain-of-thought reasoning for deeper analysis."
          />
          <div className="pl-11">
            <div
              className={`flex items-center justify-between px-4 py-4 border transition-smooth
                ${
                  isThinkingEligible
                    ? "border-border bg-card"
                    : "border-border/40 bg-card/40 opacity-50 cursor-not-allowed"
                }`}
              data-ocid="settings.extended_thinking_panel"
            >
              <div className="flex flex-col gap-1">
                <span
                  className={`font-mono text-sm font-semibold ${
                    isThinkingEligible
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  Extended Thinking Mode
                </span>
                <span className="font-mono text-xs text-muted-foreground leading-relaxed">
                  {isThinkingEligible
                    ? "Claude 3.7 Sonnet will reason step-by-step before answering. Slower but more accurate for complex problems."
                    : "Requires Claude 3.7 Sonnet — select it above to enable."}
                </span>
              </div>

              {/* Toggle */}
              <button
                type="button"
                role="switch"
                aria-checked={!!extendedThinking}
                aria-disabled={!isThinkingEligible}
                disabled={!isThinkingEligible}
                onClick={handleThinkingToggle}
                className={`relative flex-shrink-0 ml-6 w-11 h-6 border transition-smooth
                  ${
                    !isThinkingEligible
                      ? "border-border/40 cursor-not-allowed"
                      : extendedThinking
                        ? "border-accent bg-accent/20 cursor-pointer"
                        : "border-border bg-muted/30 cursor-pointer hover:border-muted-foreground"
                  }`}
                data-ocid="settings.extended_thinking_toggle"
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 transition-smooth
                    ${
                      extendedThinking
                        ? "left-5 bg-accent"
                        : "left-1 bg-muted-foreground"
                    }
                    ${!isThinkingEligible ? "opacity-40" : ""}`}
                />
              </button>
            </div>

            {extendedThinking && isThinkingEligible && (
              <p
                className="mt-2 px-1 font-mono text-xs text-accent flex items-center gap-1.5"
                data-ocid="settings.extended_thinking_success_state"
              >
                <Brain className="w-3 h-3" />
                Extended thinking active — responses will include step-by-step
                reasoning
              </p>
            )}
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <div className="border-t border-border pt-6">
          <p className="font-mono text-xs text-muted-foreground leading-relaxed">
            Settings are applied globally to all AI Advisor sessions, code
            generation, and material generation. Extended Thinking requires
            Claude 3.7 Sonnet and consumes more tokens per request.
          </p>
        </div>
      </div>
    </div>
  );
}
