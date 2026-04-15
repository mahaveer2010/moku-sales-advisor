import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct } from "@/hooks/useProducts";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Code2,
  Cpu,
  ExternalLink,
  FileOutput,
  MessageSquare,
  Search,
} from "lucide-react";

const SPEC_FIELDS = [
  { key: "bandwidth", label: "Bandwidth" },
  {
    key: "adcBits",
    label: "ADC Resolution",
    format: (v: string | number) => `${v}-bit`,
  },
  {
    key: "channels",
    label: "Channels",
    format: (v: string | number) => `${v} ch`,
  },
  { key: "sampleRate", label: "Sample Rate" },
  { key: "formFactor", label: "Form Factor" },
  { key: "connectivity", label: "Connectivity" },
  { key: "voltage", label: "Supply Voltage" },
] as const;

type SpecKey =
  | "bandwidth"
  | "adcBits"
  | "channels"
  | "sampleRate"
  | "formFactor"
  | "connectivity"
  | "voltage";

function formatSpecValue(key: SpecKey, raw: string | bigint): string {
  const v = typeof raw === "bigint" ? Number(raw) : raw;
  const field = SPEC_FIELDS.find((f) => f.key === key);
  if (field && "format" in field && field.format) return field.format(v);
  return String(v);
}

export function ProductDetailPage() {
  const { id } = useParams({ from: "/products/$id" });
  const { data: product, isLoading } = useProduct(id);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4" data-ocid="product_detail.loading_state">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-3 w-72" />
        <div className="mt-4 grid grid-cols-3 md:grid-cols-4 gap-px">
          {(["bw", "adc", "ch", "sr", "ff", "conn", "v"] as const).map((k) => (
            <Skeleton key={k} className="h-14" />
          ))}
        </div>
        <Skeleton className="h-4 w-full max-w-md" />
        <Skeleton className="h-4 w-full max-w-sm" />
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="p-4 flex flex-col items-center justify-center h-48 gap-3"
        data-ocid="product_detail.error_state"
      >
        <Cpu className="w-8 h-8 text-muted-foreground opacity-40" />
        <p className="font-mono text-sm text-muted-foreground">
          Product not found
        </p>
        <Link
          to="/products"
          className="font-mono text-xs text-primary hover:underline"
        >
          ← Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-5 max-w-4xl" data-ocid="product_detail.page">
      {/* Breadcrumb */}
      <button
        type="button"
        onClick={() => navigate({ to: "/products" })}
        className="font-mono text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-smooth"
        data-ocid="product_detail.back_button"
      >
        <ArrowLeft className="w-3 h-3" /> Products
      </button>

      {/* Title + actions */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="font-mono text-lg font-bold text-foreground leading-tight">
            {product.name}
          </h1>
          <p className="font-mono text-[11px] text-primary mt-0.5">
            {product.tagline}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="font-mono text-xs h-7 gap-1"
            onClick={() => navigate({ to: "/chat" })}
            data-ocid="product_detail.ask_advisor_button"
          >
            <MessageSquare className="w-3 h-3" /> Ask Advisor
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="font-mono text-xs h-7 gap-1"
            onClick={() => navigate({ to: "/generate" })}
            data-ocid="product_detail.generate_button"
          >
            <FileOutput className="w-3 h-3" /> Generate
          </Button>
          <Link
            to="/chat"
            className="inline-flex items-center gap-1 font-mono text-xs h-7 px-3 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
            data-ocid="product_detail.find_usecases_button"
          >
            <Search className="w-3 h-3" /> Find Use Cases
          </Link>
        </div>
      </div>

      {/* Specs table */}
      <section
        className="bg-card border border-border rounded overflow-hidden"
        data-ocid="product_detail.specs_section"
      >
        <div className="px-3 py-2 border-b border-border bg-muted/30 flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Technical Specifications
          </span>
          <span className="font-mono text-[9px] text-muted-foreground opacity-60">
            {product.spec.formFactor}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {SPEC_FIELDS.map(({ key, label }) => {
            const raw = product.spec[key as SpecKey];
            return (
              <div
                key={key}
                className="px-3 py-2.5 border-r border-b border-border/40 last:border-r-0"
              >
                <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest mb-0.5">
                  {label}
                </div>
                <div className="font-mono text-sm font-semibold text-foreground">
                  {formatSpecValue(key as SpecKey, raw)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Instruments */}
      <section data-ocid="product_detail.instruments_section">
        <div className="font-mono text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <Code2 className="w-3 h-3" />
          Available Instruments
          <span className="text-muted-foreground/50 normal-case font-normal">
            ({product.instruments.length})
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {product.instruments.map((inst) => (
            <Badge
              key={inst}
              variant="secondary"
              className="font-mono text-[10px] py-0.5 px-2 h-5 bg-muted/50 hover:bg-muted transition-smooth cursor-default"
            >
              {inst}
            </Badge>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section
        className="bg-card border border-border rounded overflow-hidden"
        data-ocid="product_detail.usecases_section"
      >
        <div className="px-3 py-2 border-b border-border bg-muted/30 flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Key Use Cases
          </span>
          <span className="font-mono text-[9px] text-muted-foreground opacity-60">
            {product.useCases.length} scenarios
          </span>
        </div>
        <ul className="divide-y divide-border/30">
          {product.useCases.map((uc, i) => (
            <li
              key={uc}
              className="flex items-start gap-3 px-3 py-2.5 hover:bg-muted/10 transition-smooth"
              data-ocid={`product_detail.usecase.${i + 1}`}
            >
              <span className="font-mono text-[9px] text-primary mt-0.5 font-bold w-4 flex-shrink-0 text-right">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs text-foreground leading-relaxed">
                {uc}
              </span>
            </li>
          ))}
        </ul>
        {/* Footer CTA */}
        <div className="px-3 py-2.5 border-t border-border bg-muted/10 flex items-center justify-between">
          <span className="font-mono text-[10px] text-muted-foreground">
            Get domain-specific solution guidance
          </span>
          <Link
            to="/chat"
            className="font-mono text-[10px] text-primary hover:underline flex items-center gap-1"
            data-ocid="product_detail.find_usecases_link"
          >
            <ExternalLink className="w-3 h-3" />
            Find Use Cases in Chat →
          </Link>
        </div>
      </section>
    </div>
  );
}
