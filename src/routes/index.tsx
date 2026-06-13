import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Heart, Sparkles, Upload, Phone, ArrowRight, Check, Leaf,
  Recycle, HandHeart, Shirt, MapPin, Star, ShieldCheck, Truck,
  QrCode, Calculator, Search, ClipboardList, Clock, ThumbsUp,
  Receipt, Package, WashingMachine, Ban, Tag, Calendar,
  TreePine, TrendingUp, Award, ChevronRight,
  TreePine, TrendingUp, Award, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import heroImg from "@/assets/hero-match.jpg";
import c1 from "@/assets/c1.jpg";
import c2 from "@/assets/c2.jpg";
import c3 from "@/assets/c3.jpg";
import c4 from "@/assets/c4.jpg";
import c5 from "@/assets/c5.jpg";
import c6 from "@/assets/c6.jpg";
import c7 from "@/assets/c7.jpg";
import c8 from "@/assets/c8.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tukar Baju — Tukar, Donasi, Daur Ulang Pakaian di Indonesia" },
      { name: "description", content: "Platform sirkular tekstil Indonesia. Tukar outfit, kumpulkan Token Swap, dan kurangi 2,3 juta ton sampah tekstil per tahun." },
      { property: "og:title", content: "Tukar Baju — Swap, Donasi, Daur Ulang" },
      { property: "og:description", content: "Tukar pakaian dengan orang sekitarmu. Bukan landfill, tapi sistemnya yang kami benahi." },
    ],
  }),
  component: Home,
});

type Item = {
  id: string; img: string; name: string; owner: string; loc: string;
  size: string; rating: number; outfit: string; co2: number; gender: "Pria" | "Wanita";
};

const ITEMS: Item[] = [
  { id: "TB-001", img: c1, name: "Vintage Denim Jacket", owner: "Raka P.", loc: "Bandung", size: "L", rating: 9.2, outfit: "Streetwear", co2: 16.2, gender: "Pria" },
  { id: "TB-002", img: c2, name: "Cream Knit Sweater", owner: "Anya S.", loc: "Jakarta", size: "M", rating: 9.5, outfit: "Cozy Daily", co2: 8.4, gender: "Wanita" },
  { id: "TB-003", img: c3, name: "Batik Modern Shirt", owner: "Dimas R.", loc: "Yogyakarta", size: "L", rating: 8.8, outfit: "Smart Casual", co2: 6.1, gender: "Pria" },
  { id: "TB-004", img: c4, name: "Floral Summer Dress", owner: "Sari M.", loc: "Bali", size: "S", rating: 9.0, outfit: "Vacation", co2: 5.7, gender: "Wanita" },
  { id: "TB-005", img: c5, name: "Essential White Tee", owner: "Bayu N.", loc: "Surabaya", size: "M", rating: 8.5, outfit: "Basics", co2: 4.2, gender: "Pria" },
  { id: "TB-006", img: c6, name: "Leather Bomber Jacket", owner: "Iqbal F.", loc: "Jakarta", size: "L", rating: 9.4, outfit: "Edgy Layer", co2: 18.6, gender: "Pria" },
  { id: "TB-007", img: c7, name: "Pleated Midi Skirt", owner: "Tasya W.", loc: "Tangerang", size: "M", rating: 9.1, outfit: "Office Chic", co2: 7.3, gender: "Wanita" },
  { id: "TB-008", img: c8, name: "Linen Oversize Shirt", owner: "Kayla H.", loc: "Depok", size: "L", rating: 9.0, outfit: "Resort Wear", co2: 9.5, gender: "Wanita" },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <Hero />
      <HowItWorks />
      <Catalog />
      <TrendSection />
      <Pricing />
      <Impact />
      <TrustFooter />
    </div>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Shirt className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">Tukar Baju</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {["Koleksi Outfit", "Donasi", "Daur Ulang"].map((l) => (
            <a key={l} href="#" className="relative text-foreground/80 transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-tertiary after:transition-all hover:after:w-full">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="gap-2 text-foreground/80 hover:text-foreground">
            <Phone className="h-4 w-4" /> Hubungi Kami
          </Button>
          <Button className="gap-2 rounded-full bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 pulse-cta">
            <Upload className="h-4 w-4" /> Upload Pakaian
          </Button>
        </div>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-tertiary/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-eco/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-eco" />
            A platform that allows locals to swap clothes
          </div>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-primary lg:text-[64px]">
            Swapping unused outfits,{" "}
            <span className="italic text-tertiary">because reducing textile waste</span>{" "}
            is the real fit.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">
            Indonesia menghasilkan <strong className="text-foreground">2,3 juta ton</strong> sampah tekstil setiap tahun. Tukar Baju mengubah perilaku konsumsi dengan membenahi sistemnya, bukan sekadar tempat pembuangannya.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" className="gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              Mulai Swap Sekarang <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-primary/20 bg-transparent">
              Pelajari Misi Kami
            </Button>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { k: "12,4K+", v: "Outfit Ditukar" },
              { k: "186 ton", v: "Tekstil Diselamatkan" },
              { k: "48 kota", v: "Jaringan Aktif" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-2xl font-bold text-primary">{s.k}</dt>
                <dd className="text-xs text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-secondary to-muted" />
          <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-border shadow-2xl">
            <img src={heroImg} alt="Two clothes matching" className="h-full w-full object-cover" width={1024} height={1024} />
            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-card/95 px-3 py-1.5 text-xs font-semibold shadow-md backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-tertiary" /> Match Found
            </div>
            <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-eco px-3 py-1.5 text-xs font-semibold text-eco-foreground shadow-md">
              <Leaf className="h-3.5 w-3.5" /> Saves 24.6 kg CO₂
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="heart-pop grid h-20 w-20 place-items-center rounded-full bg-coral text-coral-foreground shadow-[0_20px_60px_-10px_rgba(255,111,97,0.6)]">
                <Heart className="h-9 w-9 fill-current" />
              </div>
            </div>
          </div>
          <div className="float-slow absolute -left-6 top-12 rounded-2xl border border-border bg-card p-3 shadow-xl">
            <div className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-eco" /> Anya wants to swap your jacket
            </div>
          </div>
          <div className="float-slower absolute -right-4 bottom-12 rounded-2xl border border-border bg-card p-3 shadow-xl">
            <div className="flex items-center gap-2 text-xs"><Award className="h-3.5 w-3.5 text-tertiary" /> +50 Token Swap</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS ---------- */
function HowItWorks() {
  const missions = [
    { icon: Shirt, title: "Tukar Pakaian", desc: "Lemarimu penuh, tapi kamu bosan? Tukar dengan orang di sekitarmu menggunakan Token Swap." },
    { icon: HandHeart, title: "Donasi Pakaian", desc: "Pakaianmu sampai ke tangan yang benar-benar membutuhkan, bukan kotak donasi biasa." },
    { icon: Recycle, title: "Daur Ulang Pakaian", desc: "Pakaian rusak bukan akhir segalanya. Kami ubah jadi material baru dan kamu dapat Token Swap." },
  ];
  const steps = [
    { icon: Search, title: "Cari Pakaian Favorit", desc: "Jelajahi list pakaian di bawah, catat kode pakaian." },
    { icon: ClipboardList, title: "Ajukan Pertukaran", desc: "Pilih pakaian dari katalogmu. Belum punya? Upload dulu." },
    { icon: Clock, title: "Tunggu Konfirmasi", desc: "Pengajuan masuk list swaps pemilik. Tunggu konfirmasi." },
    { icon: ThumbsUp, title: "Pemilik Menyetujui?", desc: "Jika pemilik setuju, transaksi dilanjutkan." },
    { icon: Receipt, title: "Konfirmasi & Pembayaran", desc: "Kamu menerima receipt order. Bayar via QRIS." },
    { icon: Truck, title: "Pakaian Diantar", desc: "Driver ambil dari alamatmu, antarkan ke pemilik baru. Selesai." },
  ];
  const rules = [
    { icon: WashingMachine, label: "Cuci sebelum tukar" },
    { icon: Check, label: "Bersih & layak pakai" },
    { icon: Tag, label: "Semua kategori" },
    { icon: Sparkles, label: "Branded & non-branded" },
    { icon: Ban, label: "Tidak pakaian dalam" },
  ];

  return (
    <section className="border-y border-border bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <Badge className="mb-4 bg-eco/10 text-eco hover:bg-eco/10">Mission</Badge>
            <h2 className="font-display text-4xl font-bold tracking-tight text-primary">
              0 Textile to Landfill
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Tiga jalur sirkular untuk memperpanjang umur setiap helai pakaian di lemari Indonesia.
            </p>
            <div className="mt-8 space-y-4">
              {missions.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="group flex gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-tertiary/40 hover:shadow-lg">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-primary">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Badge className="mb-4 bg-coral/15 text-coral hover:bg-coral/15">Step by Step</Badge>
            <h2 className="font-display text-4xl font-bold tracking-tight text-primary">How Swap Works</h2>
            <p className="mt-3 text-muted-foreground">Dari swipe sampai paket sampai pintu, semua dalam 6 langkah.</p>
            <ol className="mt-8 relative space-y-5 border-l-2 border-dashed border-tertiary/40 pl-8">
              {steps.map((s, i) => (
                <li key={s.title} className="relative">
                  <span className="absolute -left-[42px] grid h-8 w-8 place-items-center rounded-full bg-tertiary text-xs font-bold text-tertiary-foreground ring-4 ring-background">
                    {String.fromCharCode(97 + i)}
                  </span>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center gap-2">
                      <s.icon className="h-4 w-4 text-eco" />
                      <h4 className="font-semibold text-primary">{s.title}</h4>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-tertiary/30 bg-gradient-to-r from-primary to-primary/90 p-8 text-primary-foreground">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <p className="text-xs uppercase tracking-widest text-tertiary">Upload Guidelines</p>
              <h3 className="mt-1 font-display text-2xl font-bold">Aturan Upload Pakaian</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
              {rules.map((r) => (
                <div key={r.label} className="flex flex-col items-center gap-2 text-center">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-primary-foreground/10 ring-1 ring-primary-foreground/20">
                    <r.icon className="h-5 w-5 text-tertiary" />
                  </div>
                  <span className="text-xs leading-tight">{r.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CATALOG ---------- */
function Catalog() {
  const [tab, setTab] = useState<"Semua" | "Pria" | "Wanita">("Semua");
  const [open, setOpen] = useState<{ item: Item; mode: "Swap" | "Beli" | "Sewa" } | null>(null);
  const items = useMemo(() => tab === "Semua" ? ITEMS : ITEMS.filter(i => i.gender === tab), [tab]);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Badge className="mb-3 bg-tertiary/15 text-tertiary hover:bg-tertiary/15">Catalog</Badge>
            <h2 className="font-display text-4xl font-bold tracking-tight text-primary">Koleksi Outfit Komunitas</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">Swipe, match, dan swap. Tiap kartu menampilkan estimasi CO₂ yang kamu hemat dengan memilih fashion sirkular.</p>
          </div>
          <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
            <TabsList className="rounded-full bg-secondary p-1">
              {(["Semua", "Pria", "Wanita"] as const).map(t => (
                <TabsTrigger key={t} value={t} className="rounded-full px-5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(item => (
            <article key={item.id} className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <img src={item.img} alt={item.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" width={640} height={768} />
                <div className="absolute left-3 top-3 rounded-full bg-eco/95 px-2.5 py-1 text-[11px] font-semibold text-eco-foreground backdrop-blur">
                  <span className="flex items-center gap-1"><Leaf className="h-3 w-3" /> Saves {item.co2} kg CO₂</span>
                </div>
                <div className="absolute right-3 top-3 rounded-full bg-card/90 px-2 py-1 text-[11px] font-medium backdrop-blur">{item.id}</div>
                <div className="absolute inset-x-3 bottom-3 flex translate-y-3 gap-1.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <Button size="sm" onClick={() => setOpen({ item, mode: "Swap" })} className="flex-1 rounded-full bg-coral text-coral-foreground hover:bg-coral/90">
                    <Heart className="mr-1 h-3.5 w-3.5 fill-current" /> Swap
                  </Button>
                  <Button size="sm" onClick={() => setOpen({ item, mode: "Beli" })} variant="secondary" className="rounded-full">Beli</Button>
                  <Button size="sm" onClick={() => setOpen({ item, mode: "Sewa" })} variant="outline" className="rounded-full bg-card">Sewa</Button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-base font-semibold text-primary">{item.name}</h3>
                  <div className="flex items-center gap-0.5 rounded-md bg-secondary px-1.5 py-0.5 text-xs font-semibold text-primary">
                    <Star className="h-3 w-3 fill-tertiary text-tertiary" /> {item.rating}
                  </div>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.outfit}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {item.owner} · {item.loc}</span>
                  <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-primary">Size {item.size}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-md">
          {open && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">
                  {open.mode === "Swap" && "Ajukan Swap"}
                  {open.mode === "Beli" && "Beli Preloved"}
                  {open.mode === "Sewa" && "Sewa Outfit"}
                </DialogTitle>
                <DialogDescription>Konfirmasi transaksi {open.item.name}</DialogDescription>
              </DialogHeader>
              <div className="flex gap-4 rounded-xl border border-border bg-secondary/40 p-3">
                <img src={open.item.img} alt="" className="h-20 w-16 rounded-lg object-cover" />
                <div className="text-sm">
                  <p className="font-semibold text-primary">{open.item.name}</p>
                  <p className="text-xs text-muted-foreground">{open.item.owner} · {open.item.loc}</p>
                  <p className="mt-1 text-xs">Size {open.item.size} · {open.item.rating}/10</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                {open.mode === "Swap" && <Row label="Token Swap" value="50 TKN" />}
                {open.mode === "Beli" && <Row label="Harga Preloved" value="Rp 165.000" />}
                {open.mode === "Sewa" && <Row label="Sewa 3 hari" value="Rp 75.000" />}
                <Row label="Biaya logistik" value="Rp 18.000" />
                <Row label="Carbon dihemat vs beli baru" value={`${open.item.co2} kg CO₂`} accent />
              </div>
              <div className="rounded-xl bg-eco/10 p-3 text-xs text-eco">
                <Leaf className="mr-1 inline h-3.5 w-3.5" /> Setara dengan menanam {(open.item.co2 / 21).toFixed(2)} pohon.
              </div>
              <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                Lanjutkan ke QRIS <QrCode className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
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

/* ---------- TREND ---------- */
function TrendSection() {
  const tags = ["Konser Musik", "Agustusan", "Halloween", "Lebaran", "Kondangan", "Camping", "Imlek", "Prom Night"];
  const [active, setActive] = useState(tags[0]);
  return (
    <section className="border-y border-border bg-primary py-20 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Badge className="mb-3 bg-tertiary text-tertiary-foreground hover:bg-tertiary">Trend</Badge>
            <h2 className="font-display text-4xl font-bold">Rekomendasi Berdasarkan Trend</h2>
            <p className="mt-2 max-w-2xl text-primary-foreground/70">
              Kamu cari pakaian unik untuk acara tertentu? Lihat pilihan yang bisa kamu tukar di bawah ini.
            </p>
          </div>
          <Button variant="outline" className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
            Lihat semua trend <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map(t => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-all",
                active === t
                  ? "border-tertiary bg-tertiary text-tertiary-foreground"
                  : "border-primary-foreground/20 text-primary-foreground/80 hover:border-primary-foreground/50"
              )}
            >
              <Calendar className="h-3.5 w-3.5" /> {t}
            </button>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {ITEMS.slice(0, 4).map(i => (
            <div key={i.id} className="group overflow-hidden rounded-2xl bg-primary-foreground/5 ring-1 ring-primary-foreground/10">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={i.img} alt={i.name} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold">{i.name}</p>
                <p className="text-xs text-primary-foreground/60">Cocok untuk {active}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PRICING ---------- */
function Pricing() {
  const plans = [
    {
      name: "Starter Pack", price: "29K", period: "/bulan",
      desc: "Cobain dulu pengalaman swap.",
      features: ["50 Token Swap", "3x swap aktif", "Logistik standar", "Komunitas access"],
      cta: "Pilih Paket",
    },
    {
      name: "Casual Swapper", price: "79K", period: "/bulan", featured: true,
      desc: "Untuk yang rutin refresh lemari.",
      features: ["180 Token Swap", "Unlimited swap aktif", "Logistik prioritas", "Early drop access", "Badge Eco Curator"],
      cta: "Pilih Paket",
    },
    {
      name: "Eco Warrior Pro", price: "199K", period: "/bulan",
      desc: "Buat para sustainability champion.",
      features: ["500 Token Swap", "Bebas biaya logistik", "Personal stylist swap", "Carbon report bulanan", "Akses event eksklusif"],
      cta: "Pilih Paket",
    },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mb-3 bg-tertiary/15 text-tertiary hover:bg-tertiary/15">Token Swap Plans</Badge>
          <h2 className="font-display text-4xl font-bold tracking-tight text-primary">Pilih paket yang sesuai ritmemu</h2>
          <p className="mt-3 text-muted-foreground">Token Swap adalah bahan bakar untuk menukar pakaian. Semakin sering swap, semakin banyak landfill yang kamu hindari.</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map(p => (
            <div key={p.name} className={cn(
              "relative flex flex-col rounded-3xl border p-8 transition-all",
              p.featured ? "border-tertiary bg-primary text-primary-foreground shadow-2xl lg:-translate-y-3" : "border-border bg-card"
            )}>
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-tertiary px-3 py-1 text-xs font-semibold text-tertiary-foreground">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <p className={cn("mt-1 text-sm", p.featured ? "text-primary-foreground/70" : "text-muted-foreground")}>{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-sm">Rp</span>
                <span className="font-display text-5xl font-bold">{p.price}</span>
                <span className={cn("text-sm", p.featured ? "text-primary-foreground/60" : "text-muted-foreground")}>{p.period}</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <span className={cn("grid h-5 w-5 place-items-center rounded-full", p.featured ? "bg-tertiary text-tertiary-foreground" : "bg-eco/15 text-eco")}>
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button className={cn(
                "mt-8 w-full rounded-full",
                p.featured ? "bg-tertiary text-tertiary-foreground hover:bg-tertiary/90" : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}>
                {p.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- IMPACT ---------- */
function Impact() {
  const today = new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
  return (
    <section className="border-y border-border bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mb-3 bg-eco/10 text-eco hover:bg-eco/10">Live Impact</Badge>
          <h2 className="font-display text-4xl font-bold tracking-tight text-primary">Kontribusi nyata, terukur, hidup.</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <ImpactCard
            title="Donasi Pakaian"
            icon={HandHeart}
            stats={[
              { label: "Mitra NGO Terverifikasi", value: "24" },
              { label: "Jumlah Donatur", value: "8,412" },
              { label: "Total Pcs Diterima", value: "32,109" },
              { label: "Pcs Siap Didonasikan", value: "1,840" },
            ]}
            badge={{ title: "Total Carbon Saved", value: "184,520 kg CO₂", sub: "Setara dengan menanam 8,786 pohon" }}
            cta="Donasi Sekarang"
          />
          <ImpactCard
            title="IJOL Fiber — Daur Ulang"
            icon={Recycle}
            stats={[
              { label: "Total Pengirim", value: "3,219" },
              { label: "Total Kg Tekstil", value: "12,640 kg" },
              { label: "Kg Siap Daur Ulang", value: "2,180 kg" },
              { label: "Material Baru Dihasilkan", value: "1,902 kg" },
            ]}
            badge={{ title: "Landfill Emissions Avoided", value: "41,712 kg CO₂", sub: "Berdasarkan standar LCA tekstil" }}
            cta="Kirim Bahan Daur Ulang"
          />
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Tanggal terakhir diperbarui: {today}. Konversi data dihitung berdasarkan standar LCA (Lifecycle Assessment) tekstil global.
        </p>
      </div>
    </section>
  );
}

function ImpactCard({
  title, icon: Icon, stats, badge, cta,
}: {
  title: string; icon: any;
  stats: { label: string; value: string }[];
  badge: { title: string; value: string; sub: string };
  cta: string;
}) {
  return (
    <div className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-display text-2xl font-bold text-primary">{title}</h3>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-secondary/40 p-4">
            <p className="font-display text-2xl font-bold text-primary">{s.value}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-eco p-4 text-eco-foreground">
        <TreePine className="h-8 w-8 shrink-0" />
        <div className="flex-1">
          <p className="text-xs uppercase tracking-widest opacity-80">{badge.title}</p>
          <p className="font-display text-xl font-bold">{badge.value}</p>
          <p className="text-xs opacity-80">{badge.sub}</p>
        </div>
        <TrendingUp className="h-5 w-5 opacity-70" />
      </div>
      <Button className="mt-6 w-full rounded-full bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
        {cta} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

/* ---------- FOOTER + CALCULATOR ---------- */
function TrustFooter() {
  const [clothes, setClothes] = useState(15);
  const co2 = (clothes * 8.4).toFixed(1);
  const trees = (clothes * 8.4 / 21).toFixed(1);
  const partners = ["QRIS Verified", "JNE Logistics", "SiCepat", "WWF Indonesia", "YPBB Bandung", "Setali ID"];

  return (
    <footer className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 rounded-3xl border border-border bg-card p-10 lg:grid-cols-2">
          <div>
            <Badge className="mb-3 bg-coral/15 text-coral hover:bg-coral/15">Carbon Calculator</Badge>
            <h3 className="font-display text-3xl font-bold text-primary">Berapa carbon yang bisa kamu hemat?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Hitung emisi yang bisa kamu cegah dengan men-swap pakaian yang menumpuk di lemari.
            </p>
            <div className="mt-6 space-y-4">
              <label className="text-sm font-medium">Jumlah pakaian tidak terpakai di lemarimu</label>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  value={clothes}
                  onChange={(e) => setClothes(Math.max(0, Number(e.target.value) || 0))}
                  className="h-12 rounded-full bg-secondary text-lg font-semibold"
                />
                <span className="text-sm text-muted-foreground">pcs</span>
              </div>
              <input
                type="range" min={1} max={100} value={clothes}
                onChange={(e) => setClothes(Number(e.target.value))}
                className="w-full accent-tertiary"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4 rounded-2xl bg-gradient-to-br from-eco to-eco/80 p-8 text-eco-foreground">
            <Calculator className="h-7 w-7 opacity-80" />
            <p className="text-xs uppercase tracking-widest opacity-80">Potensi Carbon Unlock</p>
            <p className="font-display text-5xl font-bold">{co2} kg CO₂</p>
            <p className="text-sm opacity-90">Setara dengan menanam <strong>{trees} pohon</strong> dewasa.</p>
            <Button className="mt-2 w-fit rounded-full bg-eco-foreground text-eco hover:bg-eco-foreground/90">
              Mulai Swap & Klaim Impact <Heart className="ml-2 h-4 w-4 fill-current" />
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Shirt className="h-5 w-5" />
              </span>
              <span className="font-display text-xl font-bold text-primary">Tukar Baju</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Platform sirkular tekstil Indonesia. Memperbaiki sistem konsumsi, bukan hanya membersihkan landfill.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {partners.map(p => (
                <span key={p} className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-eco" /> {p}
                </span>
              ))}
            </div>
          </div>
          <FooterCol title="Layanan" links={["Koleksi Outfit", "Donasi", "Daur Ulang", "Token Swap"]} />
          <FooterCol title="Perusahaan" links={["Tentang Kami", "Mitra NGO", "Karir", "Press Kit"]} />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground lg:flex-row">
          <p>© {new Date().getFullYear()} Tukar Baju. Made with <Heart className="inline h-3 w-3 fill-coral text-coral" /> in Indonesia.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><QrCode className="h-3.5 w-3.5" /> Secure QRIS Escrow</span>
            <span className="flex items-center gap-1"><Package className="h-3.5 w-3.5" /> Insured Logistics</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-bold text-primary">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map(l => <li key={l}><a href="#" className="hover:text-primary">{l}</a></li>)}
      </ul>
    </div>
  );
}
