import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useProducts";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Cpu, Zap } from "lucide-react";

function ProductCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded p-4 space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-3 w-40" />
      <div className="grid grid-cols-3 gap-2 mt-3">
        <Skeleton className="h-10 rounded" />
        <Skeleton className="h-10 rounded" />
        <Skeleton className="h-10 rounded" />
      </div>
      <div className="flex gap-1 mt-2">
        <Skeleton className="h-4 w-16 rounded" />
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-4 w-14 rounded" />
      </div>
    </div>
  );
}

export function ProductsPage() {
  const { data: products, isLoading } = useProducts();

  return (
    <div className="p-4 space-y-4" data-ocid="products.page">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Moku Product Portfolio
          </h1>
          <p className="font-mono text-[10px] text-muted-foreground/60 mt-0.5">
            Liquid Instruments — Multi-Instrument Platform Family
          </p>
        </div>
        {!isLoading && products && (
          <span className="font-mono text-[10px] text-muted-foreground bg-muted/40 border border-border px-2 py-0.5 rounded">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"
        data-ocid="products.list"
      >
        {isLoading && (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        )}

        {!isLoading && (!products || products.length === 0) && (
          <div
            className="col-span-3 flex flex-col items-center justify-center h-32 bg-card border border-border rounded text-muted-foreground text-sm"
            data-ocid="products.empty_state"
          >
            <Cpu className="w-6 h-6 mb-1 opacity-40" />
            <span className="font-mono text-xs">No products found</span>
          </div>
        )}

        {!isLoading &&
          products?.map((p, i) => (
            <Link
              key={p.id}
              to="/products/$id"
              params={{ id: p.id }}
              className="group flex flex-col bg-card border border-border rounded hover:border-primary/60 transition-smooth"
              data-ocid={`products.item.${i + 1}`}
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-2 px-4 pt-4 pb-3 border-b border-border/50">
                <div className="min-w-0">
                  <div className="font-mono text-sm font-bold text-foreground leading-tight truncate">
                    {p.name}
                  </div>
                  <div className="font-mono text-[10px] text-primary mt-0.5 line-clamp-1">
                    {p.tagline}
                  </div>
                </div>
                <Zap className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5 opacity-70" />
              </div>

              {/* Key specs — bandwidth / ADC bits / channels */}
              <div className="grid grid-cols-3 divide-x divide-border/40 bg-muted/15 border-b border-border/50">
                <div className="px-3 py-2">
                  <div className="font-mono text-xs font-bold text-foreground">
                    {p.spec.bandwidth}
                  </div>
                  <div className="font-mono text-[9px] text-muted-foreground uppercase">
                    Bandwidth
                  </div>
                </div>
                <div className="px-3 py-2">
                  <div className="font-mono text-xs font-bold text-foreground">
                    {Number(p.spec.adcBits)}-bit
                  </div>
                  <div className="font-mono text-[9px] text-muted-foreground uppercase">
                    ADC
                  </div>
                </div>
                <div className="px-3 py-2">
                  <div className="font-mono text-xs font-bold text-foreground">
                    {Number(p.spec.channels)}ch
                  </div>
                  <div className="font-mono text-[9px] text-muted-foreground uppercase">
                    Channels
                  </div>
                </div>
              </div>

              {/* Top 3 instruments */}
              <div className="px-4 py-3 flex-1">
                <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest mb-1.5">
                  Instruments
                </div>
                <div className="flex flex-wrap gap-1">
                  {p.instruments.slice(0, 3).map((inst) => (
                    <Badge
                      key={inst}
                      variant="secondary"
                      className="font-mono text-[9px] h-4 px-1.5 bg-muted/60"
                    >
                      {inst}
                    </Badge>
                  ))}
                  {p.instruments.length > 3 && (
                    <Badge
                      variant="outline"
                      className="font-mono text-[9px] h-4 px-1.5 text-muted-foreground"
                    >
                      +{p.instruments.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="px-4 pb-3 mt-auto flex items-center justify-end">
                <span className="font-mono text-[10px] text-primary flex items-center gap-0.5 group-hover:gap-1.5 transition-smooth">
                  View full specs <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
