import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Heart, Leaf, MapPin, Star, ArrowLeft, QrCode, ShieldCheck,
  Truck, Sparkles, Shirt, ChevronRight, Zap, Award, Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ITEMS, co2ToAcHours, type Item } from "@/lib/items";

export const Route = createFileRoute("/item/$id")({
  head: ({ params }) => {
    const item = ITEMS.find(i => i.id === params.id);
    const title = item ? `${item.name} — Tukar Baju` : "Detail Pakaian — Tukar Baju";
    const desc = item
      ? `${item.name} dari ${item.owner} di ${item.loc}. Hemat ${item.co2} kg CO₂ dengan tukar, beli, atau sewa.`
      : "Detail pakaian di katalog Tukar Baju.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(item ? [{ property: "og:image", content: item.img }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const item = ITEMS.find(i => i.id === params.id);
    if (!item) throw notFound();
    return { item };
  },
  component: ItemDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl font-bold text-primary">Pakaian tidak ditemukan</h1>
        <p className="mt-2 text-muted-foreground">Item yang kamu cari mungkin sudah ditukar atau dihapus.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <ArrowLeft className="h-4 w-4" /> Kembali ke katalog
        </Link>
      </div>
    </div>
  ),
});

function ItemDetail() {
  const { id } = Route.useParams();
  const item = ITEMS.find(i => i.id === id)!;
  const [mode, setMode] = useState<"Swap" | "Beli" | "Sewa" | null>(null);
  const recommendations = ITEMS.filter(i => i.id !== item.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Shirt className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight">Tukar Baju</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Kembali ke katalog
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <nav className="mb-6 flex items-center gap-1 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Beranda</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="hover:text-foreground">Katalog</span>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-primary">{item.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border bg-muted shadow-xl">
              <div className="relative aspect-[4/5]">
                <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
                <div className="absolute left-4 top-4 rounded-full bg-eco/95 px-3 py-1.5 text-xs font-semibold text-eco-foreground backdrop-blur">
                  <span className="flex items-center gap-1"><Leaf className="h-3.5 w-3.5" /> Saves {item.co2} kg CO₂</span>
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-card/90 px-3 py-1.5 text-xs font-mono font-medium backdrop-blur">{item.id}</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[item.img, item.img, item.img, item.img].map((src, i) => (
                <button key={i} className={cn(
                  "aspect-square overflow-hidden rounded-xl border-2 transition-all",
                  i === 0 ? "border-tertiary" : "border-border opacity-60 hover:opacity-100"
                )}>
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <Badge className="w-fit bg-tertiary/15 text-tertiary hover:bg-tertiary/15">{item.outfit}</Badge>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-primary lg:text-5xl">
              {item.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {item.owner} · {item.loc}</span>
              <span className="flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 font-semibold text-primary">
                <Star className="h-3.5 w-3.5 fill-tertiary text-tertiary" /> {item.rating}/10
              </span>
              <span className="rounded bg-muted px-2 py-0.5 font-mono text-primary">Size {item.size}</span>
              <span className="rounded bg-muted px-2 py-0.5 text-primary">{item.gender}</span>
            </div>

            <p className="mt-6 leading-relaxed text-muted-foreground">
              {item.name} dari koleksi pribadi {item.owner}. Pakaian preloved kondisi prima,
              sudah dicuci bersih dan siap menemani gaya barumu. Dengan memilih sirkular, kamu menghemat
              <strong className="text-foreground"> {item.co2} kg CO₂</strong> dibanding membeli baru.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Stat icon={Zap} label="Hemat energi" value={co2ToAcHours(item.co2)} />
              <Stat icon={ShieldCheck} label="Diverifikasi" value="Tim Tukar Baju" />
              <Stat icon={Truck} label="Logistik" value="Same-day kurir" />
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Pilih cara transaksi</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <Price label="Swap" value="50 TKN" sub="Token Swap" />
                <Price label="Beli" value="Rp 165K" sub="Preloved" />
                <Price label="Sewa" value="Rp 75K" sub="3 hari" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="lg" onClick={() => setMode("Swap")} className="flex-1 rounded-full bg-coral text-coral-foreground hover:bg-coral/90">
                  <Heart className="mr-1 h-4 w-4 fill-current" /> Ajukan Swap
                </Button>
                <Button size="lg" onClick={() => setMode("Beli")} variant="secondary" className="flex-1 rounded-full">
                  <Tag className="mr-1 h-4 w-4" /> Beli
                </Button>
                <Button size="lg" onClick={() => setMode("Sewa")} variant="outline" className="flex-1 rounded-full">
                  Sewa
                </Button>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-eco/10 p-3 text-xs text-eco">
              <Sparkles className="h-4 w-4" />
              Dapatkan <strong>+50 Token Swap</strong> setiap kali kamu berhasil swap pakaian.
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="border-t border-border bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Badge className="mb-3 bg-tertiary/15 text-tertiary hover:bg-tertiary/15">Rekomendasi</Badge>
              <h2 className="font-display text-3xl font-bold tracking-tight text-primary">
                Pakaian Lain di Katalog
              </h2>
              <p className="mt-2 text-muted-foreground">Outfit lain yang mungkin cocok dengan gayamu.</p>
            </div>
            <Link to="/" className="inline-flex items-center gap-1 text-sm font-medium text-tertiary hover:underline">
              Lihat semua <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recommendations.map(rec => (
              <Link
                key={rec.id}
                to="/item/$id"
                params={{ id: rec.id }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <img src={rec.img} alt={rec.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute left-3 top-3 rounded-full bg-eco/95 px-2.5 py-1 text-[11px] font-semibold text-eco-foreground backdrop-blur">
                    <span className="flex items-center gap-1"><Leaf className="h-3 w-3" /> {rec.co2} kg CO₂</span>
                  </div>
                  <div className="absolute right-3 top-3 rounded-full bg-card/90 px-2 py-1 text-[11px] font-medium backdrop-blur">{rec.id}</div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-base font-semibold text-primary">{rec.name}</h3>
                    <div className="flex items-center gap-0.5 rounded-md bg-secondary px-1.5 py-0.5 text-xs font-semibold text-primary">
                      <Star className="h-3 w-3 fill-tertiary text-tertiary" /> {rec.rating}
                    </div>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{rec.outfit}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {rec.loc}</span>
                    <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-primary">Size {rec.size}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!mode} onOpenChange={(o) => !o && setMode(null)}>
        <DialogContent className="max-w-md">
          {mode && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">
                  {mode === "Swap" && "Ajukan Swap"}
                  {mode === "Beli" && "Beli Preloved"}
                  {mode === "Sewa" && "Sewa Outfit"}
                </DialogTitle>
                <DialogDescription>Konfirmasi transaksi {item.name}</DialogDescription>
              </DialogHeader>
              <div className="flex gap-4 rounded-xl border border-border bg-secondary/40 p-3">
                <img src={item.img} alt="" className="h-20 w-16 rounded-lg object-cover" />
                <div className="text-sm">
                  <p className="font-semibold text-primary">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.owner} · {item.loc}</p>
                  <p className="mt-1 text-xs">Size {item.size} · {item.rating}/10</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                {mode === "Swap" && <Row label="Token Swap" value="50 TKN" />}
                {mode === "Beli" && <Row label="Harga Preloved" value="Rp 165.000" />}
                {mode === "Sewa" && <Row label="Sewa 3 hari" value="Rp 75.000" />}
                <Row label="Biaya logistik" value="Rp 18.000" />
                <Row label="Carbon dihemat vs beli baru" value={`${item.co2} kg CO₂`} accent />
              </div>
              <div className="rounded-xl bg-eco/10 p-3 text-xs text-eco">
                <Leaf className="mr-1 inline h-3.5 w-3.5" /> Setara dengan {co2ToAcHours(item.co2)}.
              </div>
              <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                Lanjutkan ke QRIS <QrCode className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-tertiary" /> {label}
      </div>
      <div className="mt-1 text-xs font-semibold text-primary line-clamp-2">{value}</div>
    </div>
  );
}

function Price({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3 text-center">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="font-display text-lg font-bold text-primary">{value}</p>
      <p className="text-[11px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between border-b border-dashed border-border py-1.5 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-semibold", accent ? "text-eco" : "text-primary")}>{value}</span>
    </div>
  );
}
