import { g as useActor, h as useQuery, i as useQueryClient, k as createActor } from "./index-BwN-QH05.js";
import { u as useMutation } from "./useMutation-D1ejh1Dt.js";
function useMaterials() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMaterials();
    },
    enabled: !!actor && !isFetching
  });
}
function useSaveMaterial() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      kind,
      title,
      content
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.saveMaterial(kind, title, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    }
  });
}
function useGenerateCourse() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ vertical, product }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.generateCourse(vertical, product ?? null);
    }
  });
}
function useGenerateSchematic() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ useCaseDescription }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.generateSchematic(useCaseDescription);
    }
  });
}
function useGeneratePresentation() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ vertical, product }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.generatePresentation(vertical, product);
    }
  });
}
export {
  useGenerateCourse as a,
  useGenerateSchematic as b,
  useGeneratePresentation as c,
  useSaveMaterial as d,
  useMaterials as u
};
