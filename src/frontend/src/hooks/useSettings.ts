import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const MODEL_KEY = "moku_advisor_model";
const THINKING_KEY = "moku_advisor_extended_thinking";

export const MODELS = [
  {
    value: "claude-3-5-sonnet-20241022",
    label: "Claude 3.5 Sonnet — Fast & Smart",
  },
  {
    value: "claude-3-7-sonnet-20250219",
    label: "Claude 3.7 Sonnet — Deep Reasoning",
  },
] as const;

export type ModelValue = (typeof MODELS)[number]["value"];

// API Key — stored in backend
export function useSetApiKey() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (key: string) => {
      if (!actor) throw new Error("Backend not ready");
      await actor.setApiKey(key);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["apiKey"] });
    },
  });
}

// Model — persisted in localStorage (not in backend schema)
export function useGetModel() {
  return useQuery<ModelValue>({
    queryKey: ["model"],
    queryFn: () => {
      const stored = localStorage.getItem(MODEL_KEY);
      if (stored === "claude-3-7-sonnet-20250219") return stored;
      return "claude-3-5-sonnet-20241022";
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useSetModel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (model: ModelValue) => {
      localStorage.setItem(MODEL_KEY, model);
      // Reset extended thinking when switching away from 3.7
      if (model !== "claude-3-7-sonnet-20250219") {
        localStorage.setItem(THINKING_KEY, "false");
        qc.setQueryData(["extendedThinking"], false);
      }
    },
    onSuccess: (_, model) => {
      qc.setQueryData(["model"], model);
    },
  });
}

// Extended Thinking — persisted in localStorage
export function useGetExtendedThinking() {
  return useQuery<boolean>({
    queryKey: ["extendedThinking"],
    queryFn: () => localStorage.getItem(THINKING_KEY) === "true",
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useSetExtendedThinking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (enabled: boolean) => {
      localStorage.setItem(THINKING_KEY, String(enabled));
    },
    onSuccess: (_, enabled) => {
      qc.setQueryData(["extendedThinking"], enabled);
    },
  });
}
