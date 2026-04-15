// Re-export backend types for frontend use
export type {
  Product,
  ProductSpec,
  IndustryVertical,
  SolutionMapping,
  ChatMessage,
  ChatSession,
  GeneratedMaterial,
  SearchResult,
  AdvisorResponse,
  CourseOutline,
  CourseModule,
  Schematic,
  Presentation,
  Slide,
  SessionMessage,
  AdvisorContext,
} from "./backend.d.ts";

// UI-only types
export type NavItem = {
  label: string;
  path: string;
  icon: string;
};

export type SearchResultKind = "product" | "vertical" | "material";
