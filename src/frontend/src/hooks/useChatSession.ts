import { createActor } from "@/backend";
import type { ChatSession } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useChatSession(sessionId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ChatSession | null>({
    queryKey: ["session", sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return null;
      return actor.getSession(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId,
    refetchInterval: false,
  });
}

export function useAppendMessage(sessionId: string) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      role,
      content,
    }: { role: string; content: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.appendMessage(sessionId, role, content);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["session", sessionId], data);
    },
  });
}

export function useDeleteSession() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteSession(id);
    },
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: ["session", id] });
    },
  });
}

export function useGetAdvisorAdvice() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      query,
      context,
    }: {
      query: string;
      context: {
        vertical?: string;
        product?: string;
        sessionHistory?: Array<{ content: string; role: string }>;
      };
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getAdvisorAdvice(query, context);
    },
  });
}
