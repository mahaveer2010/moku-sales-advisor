import { createActor } from "@/backend";
import type { SearchResult } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useSearch(query: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SearchResult[]>({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!actor || !query.trim()) return [];
      return actor.search(query.trim());
    },
    enabled: !!actor && !isFetching && query.trim().length > 1,
    staleTime: 30_000,
  });
}
