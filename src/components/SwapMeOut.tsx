import { useEffect, useState } from "react";
import { Heart, Sparkles, ArrowRight, ExternalLink, HandHeart, GraduationCap, Recycle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ITEMS } from "@/lib/items";

const STAGE = ITEMS.slice(0, 5);

export function SwapMeOut() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive(a => (a + 1) % STAGE.length), 3200);
    return () => clearInterval(t);
  }, [paused]);

  const go = (dir: number) => setActive(a => (a + dir + STAGE.length) % STAGE.length);

  return (
    <section id="swap-me-out" className="relative overflow-hidden border-y border-border bg-eco/5 py-24">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-eco/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-tertiary/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* LEFT: content */}
          <div>
            <Badge className="mb-4 gap-1.5 rounded-full bg-eco text-eco-foreground hover:bg-eco">
              <Sparkles className="h-3.5 w-3.5" /> Barter x Kitabisa Campaign 💚
            </Badge>
            <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-primary md:text-5xl">
              Swap Me Out: Tukar Pakaianmu,{" "}
              <span className="text-eco">Beri Dampak Nyata!</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Ubah gaya hidup fast fashion jadi siklus bernilai. Setiap 1 transaksi ={" "}
              <strong className="text-foreground">Rp1.000 terdonasi ke Kitabisa</strong>.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Inspirasi dari “Take Me Out” tapi versi pakaian! Jelajahi katalog interaktif kami di mana setiap
              pakaian “dijodohkan” dengan pemilik barunya. Tak sekadar bergaya, kamu juga ikut mendukung{" "}
              <strong className="text-foreground">Program Kewirausahaan Daur Ulang Seragam Sekolah</strong> untuk
              anak-anak SD &amp; SMP.
            </p>

            {/* Impact card */}
            <div className="mt-8 rounded-3xl border border-eco/25 bg-card p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-eco text-eco-foreground">
                  <HandHeart className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-display text-xl font-bold text-primary">🤝 Donasi Rp1.000 / Transaksi</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Didonasikan untuk melatih anak-anak SD/SMP mengolah seragam sekolah tak terpakai menjadi produk
                    bernilai jual &amp; menumbuhkan jiwa wirausaha sejak dini.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {[
                  { icon: GraduationCap, label: "Anak SD & SMP" },
                  { icon: Recycle, label: "Seragam Didaur Ulang" },
                  { icon: Sparkles, label: "Jiwa Wirausaha" },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-2 text-xs font-medium">
                    <Icon className="h-3.5 w-3.5 text-eco" /> {label}
                  </span>
                ))}
              </div>
            </div>

            <a href="#katalog">
              <Button size="lg" className="mt-8 gap-2 rounded-full bg-eco text-eco-foreground hover:bg-eco/90">
                Tukar &amp; Donasi Sekarang <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>

          {/* RIGHT: interactive stage */}
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative mx-auto h-[460px] w-full max-w-sm">
              {STAGE.map((item, i) => {
                const offset = (i - active + STAGE.length) % STAGE.length;
                const visible = offset <= 2;
                return (
                  <article
                    key={item.id}
                    className={cn(
                      "absolute inset-0 overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl transition-all duration-500 ease-out",
                      !visible && "pointer-events-none opacity-0",
                    )}
                    style={{
                      transform: `translateY(${offset * 18}px) scale(${1 - offset * 0.05}) rotate(${offset === 0 ? 0 : offset % 2 === 0 ? 2 : -2}deg)`,
                      zIndex: STAGE.length - offset,
                      opacity: visible ? 1 - offset * 0.25 : 0,
                    }}
                  >
                    <div className="relative h-[300px] overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-eco px-3 py-1.5 text-xs font-semibold text-eco-foreground shadow-lg">
                        ✨ Rp1.000 Terdonasi saat dibeli
                      </span>
                      <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-coral text-coral-foreground shadow-lg heart-pop">
                        <Heart className="h-5 w-5 fill-current" />
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">{item.outfit}</p>
                      <h3 className="mt-1 font-display text-xl font-bold text-primary">{item.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.owner} · {item.loc} · Size {item.size}
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <Button className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                          Match Sekarang
                        </Button>
                        <Button variant="outline" className="rounded-full" onClick={() => go(1)}>
                          Lewati
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => go(-1)} aria-label="Sebelumnya">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1.5">
                {STAGE.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActive(i)}
                    aria-label={`Tampilkan ${s.name}`}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === active ? "w-6 bg-eco" : "w-2 bg-border hover:bg-tertiary",
                    )}
                  />
                ))}
              </div>
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => go(1)} aria-label="Berikutnya">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Kitabisa shortcut banner */}
        <div className="mt-16 overflow-hidden rounded-3xl border-2 border-eco/40 bg-gradient-to-r from-eco to-eco/80 p-8 text-eco-foreground shadow-lg md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Kitabisa · Swap Me Out</p>
              <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">
                Mau dukung program ini lebih jauh secara langsung?
              </h3>
              <p className="mt-2 text-sm opacity-90">
                Lihat transparansi program &amp; salurkan donasi ekstra kamu langsung di halaman resmi Kitabisa.
              </p>
            </div>
            <a
              href="https://kitabisa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <Button size="lg" className="gap-2 rounded-full bg-eco-foreground text-eco hover:bg-eco-foreground/90">
                Kunjungi Kampanye di Kitabisa <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
