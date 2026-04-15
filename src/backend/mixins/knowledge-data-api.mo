import Types "../types/knowledge-data";
import CommonTypes "../types/common";
import KnowledgeLib "../lib/knowledge-data";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  products : Map.Map<Text, Types.Product>,
  verticals : Map.Map<Text, Types.IndustryVertical>,
  sessions : Map.Map<Text, CommonTypes.ChatSession>,
  materials : List.List<CommonTypes.GeneratedMaterial>,
) {

  // ── Products ─────────────────────────────────────────────────────────────

  public query func getProduct(id : Text) : async ?Types.Product {
    KnowledgeLib.getProduct(products, id);
  };

  public query func listProducts() : async [Types.Product] {
    KnowledgeLib.listProducts(products);
  };

  // ── Verticals ─────────────────────────────────────────────────────────────

  public query func getVertical(id : Text) : async ?Types.IndustryVertical {
    KnowledgeLib.getVertical(verticals, id);
  };

  public query func listVerticals() : async [Types.IndustryVertical] {
    KnowledgeLib.listVerticals(verticals);
  };

  // ── Search ────────────────────────────────────────────────────────────────

  public query func search(term : Text) : async [CommonTypes.SearchResult] {
    KnowledgeLib.search(products, verticals, term);
  };

  // ── Chat Sessions ──────────────────────────────────────────────────────────

  public query func getSession(sessionId : Text) : async ?CommonTypes.ChatSession {
    KnowledgeLib.getSession(sessions, sessionId);
  };

  public func appendMessage(sessionId : Text, role : Text, content : Text) : async CommonTypes.ChatSession {
    let msg : CommonTypes.ChatMessage = {
      role = role;
      content = content;
      timestamp = Time.now();
    };
    KnowledgeLib.appendMessage(sessions, sessionId, msg);
  };

  public func deleteSession(sessionId : Text) : async () {
    KnowledgeLib.deleteSession(sessions, sessionId);
  };

  // ── Generated Materials ────────────────────────────────────────────────────

  public func saveMaterial(kind : Text, title : Text, content : Text) : async CommonTypes.GeneratedMaterial {
    let now = Time.now();
    let id = now.toText() # "-" # kind;
    let material : CommonTypes.GeneratedMaterial = {
      id = id;
      kind = kind;
      title = title;
      content = content;
      createdAt = now;
    };
    KnowledgeLib.saveMaterial(materials, material);
    material;
  };

  public query func listMaterials() : async [CommonTypes.GeneratedMaterial] {
    KnowledgeLib.listMaterials(materials);
  };

  public query func getMaterial(id : Text) : async ?CommonTypes.GeneratedMaterial {
    KnowledgeLib.getMaterial(materials, id);
  };
};
