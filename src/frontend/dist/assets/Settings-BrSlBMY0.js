import { c as createLucideIcon, j as jsxRuntimeExports, f as cn, r as reactExports, h as useQuery, g as useActor, i as useQueryClient, k as createActor } from "./index-BwN-QH05.js";
import { B as Badge } from "./badge-4bTBFb1U.js";
import { B as Button } from "./button-CUItn4aA.js";
import { P as Primitive } from "./index-D0f3_yc1.js";
import { u as useMutation } from "./useMutation-D1ejh1Dt.js";
import { Z as Zap } from "./zap-bDOQLs-O.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
      key: "ep3f8r"
    }
  ],
  ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" }],
  ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }]
];
const Brain = createLucideIcon("brain", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
];
const Key = createLucideIcon("key", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
];
const Settings2 = createLucideIcon("settings-2", __iconNode);
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const MODEL_KEY = "moku_advisor_model";
const THINKING_KEY = "moku_advisor_extended_thinking";
const MODELS = [
  {
    value: "claude-3-5-sonnet-20241022",
    label: "Claude 3.5 Sonnet — Fast & Smart"
  },
  {
    value: "claude-3-7-sonnet-20250219",
    label: "Claude 3.7 Sonnet — Deep Reasoning"
  }
];
function useSetApiKey() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (key) => {
      if (!actor) throw new Error("Backend not ready");
      await actor.setApiKey(key);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["apiKey"] });
    }
  });
}
function useGetModel() {
  return useQuery({
    queryKey: ["model"],
    queryFn: () => {
      const stored = localStorage.getItem(MODEL_KEY);
      if (stored === "claude-3-7-sonnet-20250219") return stored;
      return "claude-3-5-sonnet-20241022";
    },
    staleTime: Number.POSITIVE_INFINITY
  });
}
function useSetModel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (model) => {
      localStorage.setItem(MODEL_KEY, model);
      if (model !== "claude-3-7-sonnet-20250219") {
        localStorage.setItem(THINKING_KEY, "false");
        qc.setQueryData(["extendedThinking"], false);
      }
    },
    onSuccess: (_, model) => {
      qc.setQueryData(["model"], model);
    }
  });
}
function useGetExtendedThinking() {
  return useQuery({
    queryKey: ["extendedThinking"],
    queryFn: () => localStorage.getItem(THINKING_KEY) === "true",
    staleTime: Number.POSITIVE_INFINITY
  });
}
function useSetExtendedThinking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (enabled) => {
      localStorage.setItem(THINKING_KEY, String(enabled));
    },
    onSuccess: (_, enabled) => {
      qc.setQueryData(["extendedThinking"], enabled);
    }
  });
}
function SectionHeader({
  icon: Icon,
  title,
  description
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 w-8 h-8 flex items-center justify-center bg-primary/10 border border-primary/30 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-mono text-sm font-bold text-foreground uppercase tracking-wider", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: description })
    ] })
  ] });
}
function FeedbackBadge({
  status
}) {
  if (status === "idle") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `flex items-center gap-1 text-xs font-mono ${status === "success" ? "text-accent" : "text-destructive"}`,
      "data-ocid": `settings.${status}_state`,
      children: status === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
        " Saved"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
        " Failed — check key"
      ] })
    }
  );
}
function SettingsPage() {
  const [apiKeyInput, setApiKeyInput] = reactExports.useState("");
  const [apiKeyStatus, setApiKeyStatus] = reactExports.useState("idle");
  const { data: currentModel } = useGetModel();
  const { data: extendedThinking } = useGetExtendedThinking();
  const setApiKey = useSetApiKey();
  const setModel = useSetModel();
  const setExtendedThinking = useSetExtendedThinking();
  const isThinkingEligible = currentModel === "claude-3-7-sonnet-20250219";
  reactExports.useEffect(() => {
    if (apiKeyStatus !== "idle") {
      const t = setTimeout(() => setApiKeyStatus("idle"), 4e3);
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
  async function handleModelSelect(model) {
    await setModel.mutateAsync(model);
  }
  async function handleThinkingToggle() {
    if (!isThinkingEligible) return;
    await setExtendedThinking.mutateAsync(!extendedThinking);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col min-h-full bg-background",
      "data-ocid": "settings.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border bg-card px-6 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-mono text-base font-bold text-foreground uppercase tracking-widest", children: "Settings" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 font-mono", children: "Configure AI backend, model selection, and reasoning capabilities" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-6 py-8 max-w-2xl space-y-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "settings.api_key_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: Key,
                title: "Anthropic API Key",
                description: "Your personal Anthropic API key. Stored securely in the backend canister."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pl-11", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "api-key-input",
                    className: "font-mono text-xs uppercase tracking-wider text-muted-foreground",
                    children: "Anthropic API Key"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "api-key-input",
                      type: "password",
                      placeholder: "sk-ant-api03-…",
                      value: apiKeyInput,
                      onChange: (e) => {
                        setApiKeyInput(e.target.value);
                        setApiKeyStatus("idle");
                      },
                      onKeyDown: (e) => e.key === "Enter" && handleSaveApiKey(),
                      className: "font-mono text-sm bg-card border-border focus:border-primary rounded-none flex-1",
                      autoComplete: "off",
                      "data-ocid": "settings.api_key_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      onClick: handleSaveApiKey,
                      disabled: !apiKeyInput.trim() || setApiKey.isPending,
                      className: "font-mono text-xs uppercase tracking-wider rounded-none px-4",
                      "data-ocid": "settings.api_key_save_button",
                      children: setApiKey.isPending ? "Saving…" : "Save Key"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeedbackBadge, { status: apiKeyStatus }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono leading-relaxed", children: [
                "Get your key at",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "https://console.anthropic.com/settings/keys",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-accent underline underline-offset-2 hover:text-primary transition-colors",
                    children: "console.anthropic.com"
                  }
                ),
                ". The key is never exposed to the browser after saving."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "settings.model_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: Zap,
                title: "Model Selection",
                description: "Choose which Claude model powers the AI Advisor and code generation."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 pl-11", children: MODELS.map((model) => {
              const isActive = currentModel === model.value;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleModelSelect(model.value),
                  className: `w-full text-left flex items-center justify-between px-4 py-3 border transition-smooth
                    ${isActive ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card text-muted-foreground hover:border-muted-foreground hover:text-foreground"}`,
                  "data-ocid": `settings.model_option_${model.value.replace(/-/g, "_")}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-semibold", children: model.label.split(" — ")[0] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: model.label.split(" — ")[1] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0 ml-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground hidden sm:block", children: model.value }),
                      isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: "font-mono text-xs rounded-none bg-primary text-primary-foreground border-0 px-2 py-0.5",
                          "data-ocid": "settings.model_active_badge",
                          children: "ACTIVE"
                        }
                      )
                    ] })
                  ]
                },
                model.value
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "settings.extended_thinking_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeader,
              {
                icon: Brain,
                title: "Extended Thinking",
                description: "Enables Claude 3.7 Sonnet's chain-of-thought reasoning for deeper analysis."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-11", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `flex items-center justify-between px-4 py-4 border transition-smooth
                ${isThinkingEligible ? "border-border bg-card" : "border-border/40 bg-card/40 opacity-50 cursor-not-allowed"}`,
                  "data-ocid": "settings.extended_thinking_panel",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `font-mono text-sm font-semibold ${isThinkingEligible ? "text-foreground" : "text-muted-foreground"}`,
                          children: "Extended Thinking Mode"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground leading-relaxed", children: isThinkingEligible ? "Claude 3.7 Sonnet will reason step-by-step before answering. Slower but more accurate for complex problems." : "Requires Claude 3.7 Sonnet — select it above to enable." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        role: "switch",
                        "aria-checked": !!extendedThinking,
                        "aria-disabled": !isThinkingEligible,
                        disabled: !isThinkingEligible,
                        onClick: handleThinkingToggle,
                        className: `relative flex-shrink-0 ml-6 w-11 h-6 border transition-smooth
                  ${!isThinkingEligible ? "border-border/40 cursor-not-allowed" : extendedThinking ? "border-accent bg-accent/20 cursor-pointer" : "border-border bg-muted/30 cursor-pointer hover:border-muted-foreground"}`,
                        "data-ocid": "settings.extended_thinking_toggle",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `absolute top-0.5 w-4 h-4 transition-smooth
                    ${extendedThinking ? "left-5 bg-accent" : "left-1 bg-muted-foreground"}
                    ${!isThinkingEligible ? "opacity-40" : ""}`
                          }
                        )
                      }
                    )
                  ]
                }
              ),
              extendedThinking && isThinkingEligible && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "mt-2 px-1 font-mono text-xs text-accent flex items-center gap-1.5",
                  "data-ocid": "settings.extended_thinking_success_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-3 h-3" }),
                    "Extended thinking active — responses will include step-by-step reasoning"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground leading-relaxed", children: "Settings are applied globally to all AI Advisor sessions, code generation, and material generation. Extended Thinking requires Claude 3.7 Sonnet and consumes more tokens per request." }) })
        ] })
      ]
    }
  );
}
export {
  SettingsPage
};
