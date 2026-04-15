import { createActor } from "@/backend";
import type { IndustryVertical } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useVerticals() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<IndustryVertical[]>({
    queryKey: ["verticals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listVerticals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVertical(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<IndustryVertical | null>({
    queryKey: ["vertical", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getVertical(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}
