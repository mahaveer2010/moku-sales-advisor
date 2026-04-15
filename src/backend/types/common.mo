module {
  public type Timestamp = Int;

  public type SearchResult = {
    id : Text;
    kind : Text; // "product" | "vertical"
    title : Text;
    snippet : Text;
    score : Nat;
  };

  public type ChatMessage = {
    role : Text; // "user" | "assistant"
    content : Text;
    timestamp : Timestamp;
  };

  public type ChatSession = {
    id : Text;
    messages : [ChatMessage];
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  public type GeneratedMaterial = {
    id : Text;
    kind : Text; // "course" | "schematic" | "presentation"
    title : Text;
    content : Text;
    createdAt : Timestamp;
  };
};
