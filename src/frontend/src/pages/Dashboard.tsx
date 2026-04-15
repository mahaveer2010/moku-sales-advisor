import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMaterials } from "@/hooks/useMaterials";
import { useProducts } from "@/hooks/useProducts";
import { useVerticals } from "@/hooks/useVerticals";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Cpu,
  FileText,
  Layers,
  MessageSquarePlus,
  Satellite,
  Shield,
  Signal,
  Zap,
} from "lucide-react";

const REQUIRED_VERTICALS = [
  {
    id: "aerospace-defense",
    label: "Aerospace & Defense",
    icon: Shield,
    color: "text-chart-1",
    desc: "Radar, EW, signal analysis, DRDO/HAL engagements",
  },
  {
    id: "isro",
    label: "ISRO",
    icon: Satellite,
    color: "text-chart-2",
    desc: "Space telemetry, launch vehicle instrumentation, ground test",
  },
  {
    id: "tejas-networks",
    label: "Tejas Networks",
    icon: Signal,
    color: "text-chart-3",
    desc: "Optical transport, DWDM test, protocol validation",
  },
  {
    id: "lekha-wireless",
    label: "Lekha Wireless",
    icon: Signal,
    color: "text-chart-4",
    desc: "5G NR baseband, O-RAN RU characterization, RF test",
  },
  {
    id: "telecom-5g",
    label: "Telecom 5G",
    icon: Layers,
    color: "text-chart-5",
    desc: "mmWave/sub-6GHz characterization, channel sounding",
  },
  {
    id: "defense-electronics",
    label: "Defense Electronics",
    icon: Cpu,
    color: "text-accent",
    desc: "FPGA prototyping, secure comms, ruggedized instrumentation",
  },
];

const KIND_COLORS: Record<string, string> = {
  course: "text-chart-2",
  schematic: "text-chart-3",
  presentation: "text-chart-4",
  code: "text-chart-5",
};

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: products, isLoading: loadingProducts } = useProducts();
  const { data: verticals } = useVerticals();
  const { data: materials, isLoading: loadingMaterials } = useMaterials();

  const verticalCount = verticals?.length ?? REQUIRED_VERTICALS.length;
  const productCount = products?.length ?? 3;
  const materialCount = materials?.length ?? 0;

  return (
    <div className="p-4 space-y-5 max-w-7xl" data-ocid="dashboard.page">
      {/* Stats + CTA row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div
          className="flex items-center gap-4"
          data-ocid="dashboard.stats_row"
        >
          <div className="flex items-center gap-1.5 border-r border-border pr-4">
            <span className="font-mono text-lg font-bold text-foreground">
              {productCount}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              Products
            </span>
          </div>
          <div className="flex items-center gap-1.5 border-r border-border pr-4">
            <span className="font-mono text-lg font-bold text-foreground">
              {verticalCount}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              Verticals
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-lg font-bold text-foreground">
              {materialCount}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              Materials
            </span>
          </div>
        </div>
        <Button
          onClick={() => navigate({ to: "/chat" })}
          className="flex items-center gap-2 font-mono text-xs font-semibold"
          data-ocid="dashboard.start_query_button"
        >
          <MessageSquarePlus className="w-4 h-4" />
          Start New Query
        </Button>
      </div>

      {/* Verticals Grid — 6 required tiles */}
      <section data-ocid="dashboard.verticals_section">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-mono text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Industry Verticals
          </h2>
          <Link
            to="/verticals"
            className="font-mono text-[10px] text-primary hover:underline flex items-center gap-1"
            data-ocid="dashboard.view_all_verticals_link"
          >
            All verticals <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2"
          data-ocid="dashboard.verticals_grid"
        >
          {REQUIRED_VERTICALS.map((v, i) => {
            const Icon = v.icon;
            return (
              <Link
                key={v.id}
                to="/verticals/$id"
                params={{ id: v.id }}
                className="group flex flex-col gap-2 bg-card border border-border rounded p-3 hover:border-primary/50 transition-smooth"
                data-ocid={`dashboard.vertical_card.${i + 1}`}
              >
                <Icon className={`w-4 h-4 ${v.color} flex-shrink-0`} />
                <div>
                  <div className="font-mono text-[10px] font-bold text-foreground uppercase tracking-wide leading-tight">
                    {v.label}
                  </div>
                  <p className="font-body text-[10px] text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                    {v.desc}
                  </p>
                </div>
                <span className="font-mono text-[9px] text-primary group-hover:underline mt-auto">
                  Explore →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Products Grid */}
      <section data-ocid="dashboard.products_section">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-mono text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Moku Products
          </h2>
          <Link
            to="/products"
            className="font-mono text-[10px] text-primary hover:underline flex items-center gap-1"
            data-ocid="dashboard.view_all_products_link"
          >
            All products <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-2"
          data-ocid="dashboard.products_grid"
        >
          {loadingProducts && (
            <>
              <Skeleton className="h-32 rounded" />
              <Skeleton className="h-32 rounded" />
              <Skeleton className="h-32 rounded" />
            </>
          )}
          {!loadingProducts && (!products || products.length === 0) && (
            <div
              className="col-span-3 flex flex-col items-center justify-center h-20 bg-card border border-border rounded text-muted-foreground text-xs"
              data-ocid="dashboard.products_empty_state"
            >
              <Cpu className="w-4 h-4 mb-1 opacity-50" />
              No products found
            </div>
          )}
          {!loadingProducts &&
            products?.slice(0, 3).map((p, i) => (
              <Link
                key={p.id}
                to="/products/$id"
                params={{ id: p.id }}
                className="group bg-card border border-border rounded p-3 hover:border-primary/50 transition-smooth"
                data-ocid={`dashboard.product_card.${i + 1}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <div className="font-mono text-sm font-semibold text-foreground">
                      {p.name}
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground mt-0.5 truncate">
                      {p.tagline}
                    </div>
                  </div>
                  <Zap className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                </div>
                <div className="grid grid-cols-3 gap-1 mb-2 border-t border-border/50 pt-2">
                  <div className="text-center">
                    <div className="font-mono text-xs font-bold text-foreground">
                      {Number(p.spec.channels)}
                    </div>
                    <div className="font-mono text-[9px] text-muted-foreground">
                      CH
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-xs font-bold text-foreground">
                      {p.spec.sampleRate}
                    </div>
                    <div className="font-mono text-[9px] text-muted-foreground">
                      SMPL
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-xs font-bold text-primary">
                      {p.spec.bandwidth}
                    </div>
                    <div className="font-mono text-[9px] text-muted-foreground">
                      BW
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {p.instruments.slice(0, 3).map((inst) => (
                    <Badge
                      key={inst}
                      variant="secondary"
                      className="font-mono text-[9px] py-0 px-1.5 h-4"
                    >
                      {inst}
                    </Badge>
                  ))}
                  {p.instruments.length > 3 && (
                    <Badge
                      variant="outline"
                      className="font-mono text-[9px] py-0 px-1.5 h-4"
                    >
                      +{p.instruments.length - 3}
                    </Badge>
                  )}
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Recent Materials — last 3 */}
      <section data-ocid="dashboard.materials_section">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-mono text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Recent Materials
          </h2>
          <Link
            to="/generate"
            className="font-mono text-[10px] text-primary hover:underline flex items-center gap-1"
            data-ocid="dashboard.generate_material_link"
          >
            Generate new <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div
          className="bg-card border border-border rounded overflow-hidden"
          data-ocid="dashboard.materials_table"
        >
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left font-mono text-[9px] text-muted-foreground uppercase px-3 py-1.5 tracking-widest">
                  Title
                </th>
                <th className="text-left font-mono text-[9px] text-muted-foreground uppercase px-3 py-1.5 tracking-widest w-24 hidden sm:table-cell">
                  Type
                </th>
                <th className="text-left font-mono text-[9px] text-muted-foreground uppercase px-3 py-1.5 tracking-widest w-28 hidden md:table-cell">
                  Date
                </th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody>
              {loadingMaterials && (
                <tr data-ocid="dashboard.materials_loading_state">
                  <td colSpan={4} className="px-3 py-3">
                    <Skeleton className="h-4 w-48" />
                  </td>
                </tr>
              )}
              {!loadingMaterials && (!materials || materials.length === 0) && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-3 py-5 text-center text-muted-foreground text-xs"
                    data-ocid="dashboard.materials_empty_state"
                  >
                    <FileText className="w-4 h-4 mx-auto mb-1 opacity-40" />
                    No materials yet.{" "}
                    <Link
                      to="/generate"
                      className="text-primary hover:underline"
                      data-ocid="dashboard.materials_empty_cta"
                    >
                      Generate one →
                    </Link>
                  </td>
                </tr>
              )}
              {!loadingMaterials &&
                materials?.slice(0, 3).map((m, i) => (
                  <tr
                    key={m.id}
                    className="border-b border-border/40 last:border-0 hover:bg-muted/20 transition-smooth"
                    data-ocid={`dashboard.material_row.${i + 1}`}
                  >
                    <td className="px-3 py-2 font-body text-xs text-foreground truncate max-w-0 w-full">
                      <span className="block truncate">{m.title}</span>
                    </td>
                    <td className="px-3 py-2 hidden sm:table-cell w-24">
                      <span
                        className={`font-mono text-[9px] uppercase tracking-wide font-semibold ${KIND_COLORS[m.kind] ?? "text-muted-foreground"}`}
                      >
                        {m.kind}
                      </span>
                    </td>
                    <td className="px-3 py-2 font-mono text-[10px] text-muted-foreground hidden md:table-cell w-28">
                      {new Date(
                        Number(m.createdAt) / 1_000_000,
                      ).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2 w-8">
                      <Link
                        to="/generate"
                        className="text-muted-foreground hover:text-primary transition-smooth"
                        data-ocid={`dashboard.material_open_link.${i + 1}`}
                        aria-label="Open material"
                      >
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
