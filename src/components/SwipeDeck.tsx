import { useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, X, RotateCcw, Sparkles, MapPin, Leaf, Info, Undo2, PackagePlus } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ITEMS, co2ToAcHours, type Item } from "@/lib/items";

const donationSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(100, "Nama terlalu panjang"),
  email: z.string().trim().email("Email tidak valid").max(255),
  phone: z
    .string()
    .trim()
    .min(8, "Nomor WhatsApp tidak valid")
    .max(20, "Nomor WhatsApp terlalu panjang"),
  city: z.string().trim().min(2, "Kota wajib diisi").max(100),
  quantity: z.coerce.number().int().min(1, "Minimal 1 pakaian").max(500, "Maksimal 500 pakaian"),
  category: z.string().min(1, "Pilih jenis pakaian"),
  method: z.string().min(1, "Pilih cara pengiriman"),
  sendDate: z.string().min(1, "Pilih perkiraan tanggal kirim"),
  notes: z.string().trim().max(500, "Catatan maksimal 500 karakter").optional(),
});

type Decision = { item: Item; liked: boolean };

export function SwipeDeck() {
  const deck = useMemo(() => ITEMS, []);
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState<Decision[]>([]);
  const [fly, setFly] = useState<"left" | "right" | null>(null);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const start = useRef({ x: 0, y: 0 });

  const current = deck[index];
  const matches = history.filter(h => h.liked);
  const done = index >= deck.length;

  const decide = (liked: boolean) => {
    if (!current || fly) return;
    setFly(liked ? "right" : "left");
    setDrag({ x: 0, y: 0, active: false });
    window.setTimeout(() => {
      setHistory(h => [...h, { item: current, liked }]);
      setIndex(i => i + 1);
      setFly(null);
    }, 280);
  };

  const undo = () => {
    if (!history.length) return;
    setHistory(h => h.slice(0, -1));
    setIndex(i => Math.max(0, i - 1));
  };

  const reset = () => {
    setHistory([]);
    setIndex(0);
    setFly(null);
  };

  const onDown = (e: React.PointerEvent) => {
    if (fly) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY };
    setDrag({ x: 0, y: 0, active: true });
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.active) return;
    setDrag({ x: e.clientX - start.current.x, y: e.clientY - start.current.y, active: true });
  };
  const onUp = () => {
    if (!drag.active) return;
    if (drag.x > 110) decide(true);
    else if (drag.x < -110) decide(false);
    else setDrag({ x: 0, y: 0, active: false });
  };

  const dx = fly === "right" ? 600 : fly === "left" ? -600 : drag.x;
  const rot = dx / 22;
  const likeOpacity = Math.min(Math.max(dx / 110, 0), 1);
  const nopeOpacity = Math.min(Math.max(-dx / 110, 0), 1);

  return (
    <section id="swipe" className="relative overflow-hidden border-y border-border bg-primary py-24 text-primary-foreground">
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-tertiary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-coral/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <Badge className="mb-4 gap-1.5 rounded-full bg-tertiary text-tertiary-foreground hover:bg-tertiary">
            <Sparkles className="h-3.5 w-3.5" /> Mode Matchmaking
          </Badge>
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Geser Kanan untuk <span className="text-tertiary">Ajukan Swap</span>, Kiri untuk Lewati
          </h2>
          <div className="mt-4 max-w-lg space-y-3 text-base text-primary-foreground/75">
            <p>
              Punya tumpukan pakaian yang tidak ingin dijual atau didonasikan, dan hanya ingin dititipkan
              kepada kami? Kirimkan saja tumpukan itu ke tim Tukar Baju.
            </p>
            <p>
              Pakaian yang sudah dihibahkan akan kami rawat, verifikasi, dan tampilkan di sini — sehingga
              siapa pun yang tertarik bisa langsung swap tanpa menunggu persetujuan pemilik. Prosesnya jauh
              lebih cepat.
            </p>
          </div>

          <Button
            onClick={() => setFormOpen(true)}
            className="mt-6 gap-2 rounded-full bg-tertiary px-6 text-tertiary-foreground hover:bg-tertiary/90"
          >
            <PackagePlus className="h-4 w-4" /> Kirim Pakaian
          </Button>


          <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
            {[
              { label: "Dilihat", value: `${Math.min(index, deck.length)}/${deck.length}` },
              { label: "Diajukan Swap", value: `${matches.length}` },
              { label: "CO₂ Potensial", value: `${matches.reduce((s, m) => s + m.item.co2, 0).toFixed(1)} kg` },
            ].map(s => (
              <div key={s.label} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-4">
                <p className="font-display text-2xl font-bold text-tertiary">{s.value}</p>
                <p className="mt-1 text-xs text-primary-foreground/70">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-primary-foreground/60">
            <Info className="h-4 w-4 shrink-0" /> Tarik kartunya, atau pakai tombol di bawah kartu.
          </div>

          {matches.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {matches.slice(-4).map(m => (
                <Link
                  key={m.item.id}
                  to="/item/$id"
                  params={{ id: m.item.id }}
                  className="flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 py-1 pl-1 pr-3 text-xs font-medium transition hover:bg-primary-foreground/20"
                >
                  <img src={m.item.img} alt={m.item.name} className="h-6 w-6 rounded-full object-cover" />
                  {m.item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* DECK */}
        <div className="mx-auto w-full max-w-sm select-none">
          <div className="relative h-[520px]">
            {done ? (
              <div className="absolute inset-0 grid place-items-center rounded-[2rem] border border-primary-foreground/15 bg-primary-foreground/5 p-8 text-center">
                <div>
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-tertiary text-tertiary-foreground heart-pop">
                    <Heart className="h-8 w-8 fill-current" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold">Kartu habis!</h3>
                  <p className="mt-2 text-sm text-primary-foreground/70">
                    Kamu mengajukan swap untuk {matches.length} pakaian. Cek katalog lengkap untuk lebih banyak pilihan.
                  </p>
                  <div className="mt-6 flex justify-center gap-3">
                    <Button onClick={reset} variant="outline" className="gap-2 rounded-full border-primary-foreground/30 bg-transparent hover:bg-primary-foreground/10">
                      <RotateCcw className="h-4 w-4" /> Ulangi
                    </Button>
                    <a href="#katalog">
                      <Button className="rounded-full bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">Lihat Katalog</Button>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              deck.slice(index, index + 3).map((item, i) => {
                const isTop = i === 0;
                return (
                  <article
                    key={item.id}
                    onPointerDown={isTop ? onDown : undefined}
                    onPointerMove={isTop ? onMove : undefined}
                    onPointerUp={isTop ? onUp : undefined}
                    onPointerCancel={isTop ? onUp : undefined}
                    className={cn(
                      "absolute inset-0 overflow-hidden rounded-[2rem] border border-border bg-card text-card-foreground shadow-2xl",
                      isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none",
                      !drag.active && "transition-transform duration-300 ease-out",
                    )}
                    style={{
                      zIndex: 10 - i,
                      transform: isTop
                        ? `translate(${dx}px, ${drag.y * 0.15}px) rotate(${rot}deg)`
                        : `translateY(${i * 16}px) scale(${1 - i * 0.05})`,
                      opacity: fly && isTop ? 0.4 : 1,
                    }}
                  >
                    <div className="relative h-[340px]">
                      <img src={item.img} alt={item.name} draggable={false} className="h-full w-full object-cover" />
                      <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-eco px-3 py-1.5 text-xs font-semibold text-eco-foreground shadow">
                        <Leaf className="h-3.5 w-3.5" /> Hemat {item.co2} kg CO₂
                      </span>
                      {isTop && (
                        <>
                          <span
                            style={{ opacity: likeOpacity }}
                            className="absolute right-5 top-5 rotate-12 rounded-xl border-4 border-eco px-3 py-1 font-display text-xl font-bold uppercase text-eco"
                          >
                            Swap
                          </span>
                          <span
                            style={{ opacity: nopeOpacity }}
                            className="absolute left-5 top-5 -rotate-12 rounded-xl border-4 border-coral px-3 py-1 font-display text-xl font-bold uppercase text-coral"
                          >
                            Skip
                          </span>
                        </>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-xl font-bold text-primary">{item.name}</h3>
                          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" /> {item.owner} · {item.loc} · Size {item.size}
                          </p>
                        </div>
                        <span className="rounded-full bg-tertiary/15 px-2.5 py-1 text-sm font-bold text-tertiary-foreground">
                          {item.rating}
                        </span>
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground">
                        {item.outfit} · setara {co2ToAcHours(item.co2)}
                      </p>
                      <Link
                        to="/item/$id"
                        params={{ id: item.id }}
                        className="mt-3 inline-block text-xs font-semibold text-primary underline underline-offset-4"
                      >
                        Lihat detail pakaian
                      </Link>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {!done && (
            <div className="mt-8 flex items-center justify-center gap-5">
              <Button
                onClick={() => decide(false)}
                size="icon"
                variant="outline"
                aria-label="Lewati"
                className="h-16 w-16 rounded-full border-2 border-coral bg-card text-coral hover:bg-coral hover:text-coral-foreground"
              >
                <X className="h-7 w-7" />
              </Button>
              <Button
                onClick={undo}
                size="icon"
                variant="outline"
                aria-label="Kembalikan kartu"
                disabled={!history.length}
                className="h-12 w-12 rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Undo2 className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => decide(true)}
                size="icon"
                aria-label="Ajukan swap"
                className="h-16 w-16 rounded-full bg-eco text-eco-foreground shadow-lg hover:bg-eco/90"
              >
                <Heart className="h-7 w-7 fill-current" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
