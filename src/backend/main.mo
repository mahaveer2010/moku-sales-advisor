import Types "types/knowledge-data";
import CommonTypes "types/common";
import KnowledgeDataApi "mixins/knowledge-data-api";
import AiAdvisorApi "mixins/ai-advisor-api";
import KnowledgeLib "lib/knowledge-data";
import Map "mo:core/Map";
import List "mo:core/List";

actor {
  let products = Map.empty<Text, Types.Product>();
  let verticals = Map.empty<Text, Types.IndustryVertical>();
  let sessions = Map.empty<Text, CommonTypes.ChatSession>();
  let materials = List.empty<CommonTypes.GeneratedMaterial>();

  // Seed sample data on first deployment
  KnowledgeLib.seedProducts(products);
  KnowledgeLib.seedVerticals(verticals);

  include KnowledgeDataApi(products, verticals, sessions, materials);
  include AiAdvisorApi();
};
