import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ClipboardList, HandHeart, ShoppingBag, MapPin, Ruler, Clock, Users,
  ArrowRight, Check, X, Sparkles, ShieldCheck, Filter, Inbox, AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ITEMS } from "@/lib/items";
import {
  REQUESTS, MY_REQUEST, INCOMING_OFFERS,
  type ClothesRequest, type RequestMode,
} from "@/lib/requests";

/* ---------------- helpers ---------------- */

function ModeBadge({ mode }: { mode: RequestMode }) {
  return mode === "Donasi" ? (
    <Badge className="gap-1 rounded-full bg-eco text-eco-foreground hover:bg-eco/90">
      <HandHeart className="h-3.5 w-3.5" /> Minta Donasi
    </Badge>
  ) : (
    <Badge className="gap-1 rounded-full bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
      <ShoppingBag className="h-3.5 w-3.5" /> Siap Membeli
    </Badge>
  );
}

function QuotaBar({ accepted, needed }: { accepted: number; needed: number }) {
  const pct = Math.min(100, (accepted / needed) * 100);
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
        <span>Kuota diterima</span>
        <span className="font-semibold text-foreground">{accepted}/{needed} item</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-eco transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ---------------- request card ---------------- */

function RequestCard({ req, onOpen }: { req: ClothesRequest; onOpen: (r: ClothesRequest) => void }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={req.photo} alt={`Foto ${req.shot.toLowerCase()} ${req.name} untuk permintaan pakaian`}
          loading="lazy" width={768} height={1024}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <ModeBadge mode={req.mode} />
          {req.urgent && (
            <Badge className="gap-1 rounded-full bg-coral text-coral-foreground hover:bg-coral/90">
              <AlertCircle className="h-3.5 w-3.5" /> Mendesak
            </Badge>
          )}
        </div>
        <div className="absolute right-3 top-3">
          <Badge variant="secondary" className="rounded-full bg-background/90 text-foreground">{req.scope}</Badge>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 text-white">
          <p className="text-sm font-semibold">{req.name}, {req.age}</p>
          <p className="flex items-center gap-1 text-xs text-white/80">
            <MapPin className="h-3 w-3" /> {req.city} • {req.shot}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-bold leading-snug">{req.title}</h3>
        <div className="flex flex-wrap gap-1.5">
          {req.styles.map((s) => (
            <span key={s} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">{s}</span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-muted/70 p-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Ruler className="h-3.5 w-3.5" /> {req.height} cm • {req.weight} kg</span>
          <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> Atas {req.sizeTop} • Bawah {req.sizeBottom}</span>
          <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {req.offers} pengajuan</span>
          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> s/d {req.deadline}</span>
        </div>
        <QuotaBar accepted={req.accepted} needed={req.needed} />
        <Button
          onClick={() => onOpen(req)}
          className="mt-auto w-full gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Ajukan Koleksiku <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
}

/* ---------------- offer dialog ---------------- */

function OfferDialog({
  req, open, onOpenChange,
}: { req: ClothesRequest | null; open: boolean; onOpenChange: (v: boolean) => void }) {
  const [picked, setPicked] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);

  const limit = req?.needed ?? 1;
  const toggle = (id: string) =>
    setPicked((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : p.length >= limit ? p : [...p, id],
    );

  const submit = () => {
    if (!req) return;
    if (picked.length === 0) {
      toast.error("Pilih minimal satu koleksi untuk diajukan.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      onOpenChange(false);
      setPicked([]); setPrice(""); setNote("");
      toast.success(`Pengajuan terkirim ke ${req.name}`, {
        description: `${picked.length} koleksi masuk daftar seleksi. Kamu akan diberi tahu kalau dipilih.`,
      });
    }, 900);
  };

  if (!req) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Ajukan koleksimu ke {req.name}</DialogTitle>
          <DialogDescription>
            {req.mode === "Donasi"
              ? "Permintaan ini berupa donasi — koleksi yang kamu ajukan diberikan cuma-cuma bila dipilih."
              : "Permintaan ini bersifat pembelian — cantumkan harga wajar untuk koleksimu."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 md:grid-cols-[220px_1fr]">
          <div className="space-y-3">
            <div className="overflow-hidden rounded-2xl border border-border">
              <img src={req.photo} alt={`Foto ${req.name}`} loading="lazy" width={768} height={1024} className="aspect-[3/4] w-full object-cover" />
            </div>
            <div className="space-y-1.5 rounded-2xl bg-muted/70 p-3 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">{req.title}</p>
              <p>{req.height} cm • {req.weight} kg</p>
              <p>Ukuran atasan {req.sizeTop} • bawahan {req.sizeBottom}{req.shoe ? ` • sepatu ${req.shoe}` : ""}</p>
              <p>Kebutuhan: {req.scope} — maks. {req.needed} item</p>
              {req.budget && <p>Budget: {req.budget}</p>}
            </div>
            <p className="rounded-2xl bg-secondary p-3 text-xs leading-relaxed text-secondary-foreground">"{req.story}"</p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-semibold">
                Pilih koleksimu <span className="text-muted-foreground">({picked.length}/{limit} maks.)</span>
              </p>
              <div className="grid max-h-72 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3">
                {ITEMS.map((it) => {
                  const on = picked.includes(it.id);
                  const fits = it.size === req.sizeTop;
                  return (
                    <button
                      key={it.id} type="button" onClick={() => toggle(it.id)}
                      className={cn(
                        "relative overflow-hidden rounded-2xl border-2 text-left transition-all",
                        on ? "border-tertiary shadow-md" : "border-border hover:border-tertiary/50",
                      )}
                    >
                      <img src={it.img} alt={it.name} loading="lazy" className="aspect-square w-full object-cover" />
                      {on && (
                        <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-tertiary text-tertiary-foreground">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      )}
                      <span className="block p-2">
                        <span className="block truncate text-xs font-semibold">{it.name}</span>
                        <span className={cn("text-[11px]", fits ? "text-eco" : "text-muted-foreground")}>
                          Size {it.size}{fits ? " • cocok" : ""}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {req.mode === "Beli" && (
              <div>
                <label className="mb-1.5 block text-sm font-semibold">Harga penawaran per item</label>
                <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Contoh: Rp95.000" />
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-semibold">Catatan untuk pemilik permintaan</label>
              <Textarea
                value={note} onChange={(e) => setNote(e.target.value)} rows={3}
                placeholder="Ceritakan kondisi pakaian, bahan, dan alasan kenapa cocok untuk dia."
              />
            </div>

            <p className="flex items-start gap-2 rounded-2xl bg-eco/10 p-3 text-xs text-eco">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              Pengajuanmu masuk daftar seleksi. Pemilik permintaan hanya bisa menerima sebanyak kebutuhannya agar tidak ada pakaian mubazir.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Batal</Button>
          <Button
            onClick={submit} disabled={sending}
            className="gap-2 rounded-full bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
          >
            {sending ? "Mengirim…" : "Kirim Pengajuan"} <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- selection panel (permintaan saya) ---------------- */

function SelectionPanel() {
  const [status, setStatus] = useState<Record<string, "accepted" | "rejected" | undefined>>({});
  const accepted = Object.values(status).filter((s) => s === "accepted").length;
  const full = accepted >= MY_REQUEST.needed;

  const decide = (id: string, next: "accepted" | "rejected") => {
    if (next === "accepted" && full && status[id] !== "accepted") {
      toast.error("Kuota kebutuhanmu sudah penuh", {
        description: "Lepas salah satu pilihan dulu supaya tidak ada pakaian yang mubazir.",
      });
      return;
    }
    setStatus((s) => ({ ...s, [id]: s[id] === next ? undefined : next }));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="h-fit space-y-4 rounded-3xl border border-border bg-card p-5 shadow-sm">
        <Badge variant="secondary" className="rounded-full">Permintaanku</Badge>
        <h3 className="font-display text-xl font-bold">{MY_REQUEST.title}</h3>
        <p className="text-sm text-muted-foreground">{MY_REQUEST.story}</p>
        <div className="space-y-1 rounded-2xl bg-muted/70 p-3 text-xs text-muted-foreground">
          <p>Ukuran atasan {MY_REQUEST.sizeTop} • bawahan {MY_REQUEST.sizeBottom}</p>
          <p>{MY_REQUEST.height} cm • {MY_REQUEST.weight} kg</p>
          <p>Tipe: {MY_REQUEST.mode === "Beli" ? "Siap membeli" : "Minta donasi"}</p>
          {MY_REQUEST.budget && <p>Budget: {MY_REQUEST.budget}</p>}
        </div>
        <QuotaBar accepted={accepted} needed={MY_REQUEST.needed} />
        <p className="text-xs text-muted-foreground">
          Kamu hanya bisa menerima {MY_REQUEST.needed} item. Sisanya otomatis dikembalikan ke pemiliknya agar tidak mubazir.
        </p>
      </aside>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Inbox className="h-4 w-4" /> {INCOMING_OFFERS.length} koleksi diajukan ke kamu
        </div>
        {INCOMING_OFFERS.map((of) => {
          const item = ITEMS.find((i) => i.id === of.itemId)!;
          const st = status[of.id];
          return (
            <div
              key={of.id}
              className={cn(
                "flex flex-col gap-4 rounded-3xl border bg-card p-4 shadow-sm transition-all sm:flex-row sm:items-center",
                st === "accepted" ? "border-eco" : st === "rejected" ? "border-border opacity-60" : "border-border",
              )}
            >
              <img src={item.img} alt={item.name} loading="lazy" className="h-24 w-24 shrink-0 rounded-2xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-semibold">{item.name}</h4>
                  <Badge variant="secondary" className="rounded-full text-[11px]">Size {of.size}</Badge>
                  <Badge className="rounded-full bg-eco/15 text-eco text-[11px] hover:bg-eco/15">Match {of.matchScore}%</Badge>
                  {st === "accepted" && <Badge className="rounded-full bg-eco text-eco-foreground text-[11px]">Diterima</Badge>}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {of.from} • {of.fromCity} • Kondisi {of.condition} • {of.mode === "Beli" ? of.price : "Donasi"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">"{of.note}"</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button
                  size="sm" variant="ghost"
                  onClick={() => decide(of.id, "rejected")}
                  className="gap-1 rounded-full text-muted-foreground"
                >
                  <X className="h-4 w-4" /> Lewati
                </Button>
                <Button
                  size="sm" onClick={() => decide(of.id, "accepted")}
                  className={cn(
                    "gap-1 rounded-full",
                    st === "accepted"
                      ? "bg-eco text-eco-foreground hover:bg-eco/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90",
                  )}
                >
                  <Check className="h-4 w-4" /> {st === "accepted" ? "Dipilih" : "Pilih"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- section ---------------- */

export function ClothesRequests({ variant = "section" }: { variant?: "section" | "full" }) {
  const [active, setActive] = useState<ClothesRequest | null>(null);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"Semua" | "Donasi" | "Beli">("Semua");

  const list = useMemo(() => {
    const base = filter === "Semua" ? REQUESTS : REQUESTS.filter((r) => r.mode === filter);
    return variant === "section" ? base.slice(0, 3) : base;
  }, [filter, variant]);

  const openOffer = (r: ClothesRequest) => { setActive(r); setOpen(true); };

  const grid = (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><Filter className="h-4 w-4" /> Tipe permintaan:</span>
        {(["Semua", "Donasi", "Beli"] as const).map((f) => (
          <button
            key={f} onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              filter === f ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary",
            )}
          >
            {f === "Semua" ? "Semua" : f === "Donasi" ? "Minta Donasi" : "Siap Membeli"}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => <RequestCard key={r.id} req={r} onOpen={openOffer} />)}
      </div>
    </>
  );

  return (
    <section id="permintaan" className={cn(variant === "section" && "border-t border-border/60 bg-muted/40", "py-20")}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 max-w-3xl">
          <Badge variant="secondary" className="mb-4 gap-1.5 rounded-full px-3 py-1">
            <ClipboardList className="h-3.5 w-3.5" /> Clothes Request
          </Badge>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Papan permintaan pakaian
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Seperti papan lowongan, tapi isinya kebutuhan gaya. Setiap kartu menampilkan foto pengguna
            (full body atau setengah badan sesuai bagian yang diminta), ukuran badan, dan style yang dicari —
            supaya kamu bisa menakar koleksi mana yang paling pas untuknya.
            Ada yang membuka permintaan <strong className="text-eco">donasi</strong> karena sedang butuh mendesak,
            ada juga yang <strong className="text-foreground">siap membeli</strong> koleksimu.
          </p>
        </div>

        {variant === "full" ? (
          <Tabs defaultValue="jelajah" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="jelajah">Jelajah Permintaan</TabsTrigger>
              <TabsTrigger value="saya">Permintaanku & Seleksi</TabsTrigger>
            </TabsList>
            <TabsContent value="jelajah">{grid}</TabsContent>
            <TabsContent value="saya"><SelectionPanel /></TabsContent>
          </Tabs>
        ) : (
          <>
            {grid}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button asChild className="gap-2 rounded-full bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
                <Link to="/permintaan">Lihat semua permintaan <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/permintaan">Kelola permintaanku</Link>
              </Button>
            </div>
          </>
        )}
      </div>

      <OfferDialog req={active} open={open} onOpenChange={setOpen} />
    </section>
  );
}
