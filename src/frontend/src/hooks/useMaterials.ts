import { createActor } from "@/backend";
import type {
  CourseOutline,
  GeneratedMaterial,
  Presentation,
  Schematic,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useMaterials() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GeneratedMaterial[]>({
    queryKey: ["materials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMaterials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMaterial(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GeneratedMaterial | null>({
    queryKey: ["material", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getMaterial(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useSaveMaterial() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      kind,
      title,
      content,
    }: { kind: string; title: string; content: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.saveMaterial(kind, title, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });
}

export function useGenerateCourse() {
  const { actor } = useActor(createActor);
  return useMutation<
    CourseOutline,
    Error,
    { vertical: string; product?: string }
  >({
    mutationFn: async ({ vertical, product }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.generateCourse(vertical, product ?? null);
    },
  });
}

export function useGenerateSchematic() {
  const { actor } = useActor(createActor);
  return useMutation<Schematic, Error, { useCaseDescription: string }>({
    mutationFn: async ({ useCaseDescription }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.generateSchematic(useCaseDescription);
    },
  });
}

export function useGeneratePresentation() {
  const { actor } = useActor(createActor);
  return useMutation<
    Presentation,
    Error,
    { vertical: string; product: string }
  >({
    mutationFn: async ({ vertical, product }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.generatePresentation(vertical, product);
    },
  });
}
