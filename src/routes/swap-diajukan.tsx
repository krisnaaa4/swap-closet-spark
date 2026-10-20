import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ITEMS } from "@/lib/items";
import { readSubmittedSwaps, type SubmittedSwap } from "@/lib/submitted-swaps";

export const Route = createFileRoute("/swap-diajukan")({
  head: () => ({ meta: [
    { title: "Swap Diajukan — Riwayat Pengajuan | Tukar Baju" },
    { name: "description", content: "Lihat pakaian yang ditawarkan dan status pengajuan swap yang menunggu persetujuan pemilik." },
    { property: "og:title", content: "Swap Diajukan — Tukar Baju" },
    { property: "og:description", content: "Riwayat tawaran pakaian dan pengajuan swap." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: SubmittedSwapsPage,
});

function SubmittedSwapsPage() {
  const [swaps, setSwaps] = useState<SubmittedSwap[] | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => { try { setSwaps(readSubmittedSwaps()); } catch { setError(true); } }, []);
  return <div className="min-h-screen bg-background text-foreground">
    <header className="border-b border-border"><div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-5"><Link to="/" className="font-display text-xl font-bold text-primary">Tukar Baju</Link><Button asChild variant="ghost"><Link to="/"><ArrowLeft className="h-4 w-4" />Katalog</Link></Button></div></header>
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="font-display text-3xl font-bold text-primary">Swap Diajukan</h1>
      <p className="mt-2 text-sm text-muted-foreground">Riwayat contoh tersimpan di perangkat ini; belum dikirim ke pemilik atau terhubung ke akun.</p>
      {error ? <p className="mt-8 text-destructive">Riwayat tidak dapat dibuka. Izinkan penyimpanan di browser lalu muat ulang.</p> : swaps === null ? <p className="mt-8 text-muted-foreground">Memuat riwayat…</p> : !swaps.length ? <div className="py-16 text-center"><Send className="mx-auto h-10 w-10 text-tertiary" /><h2 className="mt-4 font-display text-xl font-semibold">Belum ada pengajuan swap</h2><Button asChild className="mt-6"><Link to="/">Lihat koleksi pakaian</Link></Button></div> : <div className="mt-8 space-y-4">
        {swaps.map(swap => {
          const target = ITEMS.find(item => item.id === swap.targetId);
          if (!target) return null;
          return <article key={swap.id} className="rounded-lg border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xs text-muted-foreground">{new Date(swap.createdAt).toLocaleString("id-ID")}</span><Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />{swap.status}</Badge></div>
            <div className="mt-4 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
              <div><p className="mb-2 text-xs text-muted-foreground">Kamu menawarkan</p><div className="space-y-2">{swap.offeredIds.map(id => { const item = ITEMS.find(i => i.id === id); return item ? <div key={id} className="flex items-center gap-3"><img src={item.img} alt={item.name} className="h-16 w-12 rounded object-cover" /><div className="min-w-0"><p className="text-sm font-semibold text-primary">{item.name}</p><p className="text-xs text-muted-foreground">Size {item.size} · 1 pakaian</p></div></div> : null; })}</div></div>
              <ArrowRight className="h-5 w-5 text-tertiary" />
              <div><p className="mb-2 text-xs text-muted-foreground">Pakaian yang diminta</p><Link to="/item/$id" params={{ id: target.id }} className="flex items-center gap-3"><img src={target.img} alt={target.name} className="h-20 w-16 rounded object-cover" /><div className="min-w-0"><p className="text-sm font-semibold text-primary">{target.name}</p><p className="mt-1 text-xs text-muted-foreground">{target.owner} · Size {target.size}</p></div></Link></div>
            </div>
            <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">Pembayaran menunggu persetujuan pemilik.</p>
          </article>;
        })}
      </div>}
    </main>
  </div>;
}