import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Slide {
    slideTitle: string;
    bulletPoints: Array<string>;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<HttpHeader>;
}
export interface SolutionMapping {
    painArea: string;
    description: string;
    instruments: Array<string>;
    mokModel: string;
}
export interface SearchResult {
    id: string;
    title: string;
    kind: string;
    snippet: string;
    score: bigint;
}
export interface Schematic {
    title: string;
    asciiDiagram: string;
    notes: string;
    componentList: Array<string>;
}
export interface IndustryVertical {
    id: string;
    solutionMappings: Array<SolutionMapping>;
    name: string;
    overview: string;
    painAreas: Array<string>;
}
export interface HttpRequestResult {
    status: bigint;
    body: Uint8Array;
    headers: Array<HttpHeader>;
}
export interface GeneratedMaterial {
    id: string;
    title: string;
    content: string;
    kind: string;
    createdAt: Timestamp;
}
export interface Presentation {
    title: string;
    talkingPointsSummary: string;
    slides: Array<Slide>;
}
export interface AdvisorContext {
    vertical?: string;
    sessionHistory?: Array<SessionMessage>;
    product?: string;
}
export interface HttpHeader {
    value: string;
    name: string;
}
export interface ProductSpec {
    voltage: string;
    bandwidth: string;
    formFactor: string;
    connectivity: string;
    sampleRate: string;
    channels: bigint;
    adcBits: bigint;
}
export interface SessionMessage {
    content: string;
    role: string;
}
export interface CourseModule {
    labExercises: Array<string>;
    moduleName: string;
    objectives: Array<string>;
}
export interface ChatSession {
    id: string;
    messages: Array<ChatMessage>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
export interface AdvisorResponse {
    nextSteps: Array<string>;
    useCaseSummary: string;
    recommendedInstruments: Array<string>;
    rawResponse: string;
    recommendedProduct: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: HttpRequestResult;
}
export interface CourseOutline {
    title: string;
    fullMarkdown: string;
    modules: Array<CourseModule>;
}
export interface ChatMessage {
    content: string;
    role: string;
    timestamp: Timestamp;
}
export interface Product {
    id: string;
    useCases: Array<string>;
    tagline: string;
    name: string;
    spec: ProductSpec;
    instruments: Array<string>;
}
export interface backendInterface {
    appendMessage(sessionId: string, role: string, content: string): Promise<ChatSession>;
    deleteSession(sessionId: string): Promise<void>;
    generateCourse(vertical: string, product: string | null): Promise<CourseOutline>;
    generatePresentation(vertical: string, product: string): Promise<Presentation>;
    generateSchematic(useCaseDescription: string): Promise<Schematic>;
    getAdvisorAdvice(userQuery: string, context: AdvisorContext): Promise<AdvisorResponse>;
    getExtendedThinking(): Promise<boolean>;
    getMaterial(id: string): Promise<GeneratedMaterial | null>;
    getModel(): Promise<string>;
    getProduct(id: string): Promise<Product | null>;
    getSession(sessionId: string): Promise<ChatSession | null>;
    getVertical(id: string): Promise<IndustryVertical | null>;
    listMaterials(): Promise<Array<GeneratedMaterial>>;
    listProducts(): Promise<Array<Product>>;
    listVerticals(): Promise<Array<IndustryVertical>>;
    saveMaterial(kind: string, title: string, content: string): Promise<GeneratedMaterial>;
    search(term: string): Promise<Array<SearchResult>>;
    setApiKey(key: string): Promise<void>;
    setExtendedThinking(enabled: boolean): Promise<void>;
    setModel(model: string): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
