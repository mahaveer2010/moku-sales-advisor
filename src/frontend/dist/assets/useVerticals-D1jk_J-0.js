import { g as useActor, h as useQuery, k as createActor } from "./index-BwN-QH05.js";
function useVerticals() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["verticals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listVerticals();
    },
    enabled: !!actor && !isFetching
  });
}
function useVertical(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["vertical", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getVertical(id);
    },
    enabled: !!actor && !isFetching && !!id
  });
}
export {
  useVertical as a,
  useVerticals as u
};
