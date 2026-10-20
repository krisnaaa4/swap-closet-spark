import { useState } from "react";
import { Minus, Plus, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ITEMS, type Item } from "@/lib/items";

export type SwapOffer = { item: Item; qty: number }[];

/** Mock wardrobe of the signed-in user: catalog items other than the target. */
export function myCollection(excludeId: string): Item[] {
  return ITEMS.filter(i => i.id !== excludeId);
}

export function SwapOfferPicker({
  target,
  onConfirm,
}: {
  target: Item;
  onConfirm: (offer: SwapOffer) => void;
}) {
  const collection = myCollection(target.id);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const total = Object.values(counts).reduce((s, n) => s + n, 0);

  const change = (id: string, d: number) =>
    setCounts(c => {
      const n = Math.max(0, Math.min(9, (c[id] ?? 0) + d));
      return { ...c, [id]: n };
    });

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Pilih kartu dari koleksimu untuk ditawarkan sebagai ganti <strong className="text-primary">{target.name}</strong>.
        Kamu boleh memilih lebih dari satu, termasuk kartu yang sama.
      </p>
      <div className="grid max-h-[50vh] grid-cols-3 gap-3 overflow-y-auto pr-1">
        {collection.map(it => {
          const n = counts[it.id] ?? 0;
          return (
            <div
              key={it.id}
              className={cn(
                "relative overflow-hidden rounded-xl border-2 bg-card transition",
                n > 0 ? "-translate-y-1 border-tertiary shadow-lg" : "border-border",
              )}
            >
              <button type="button" onClick={() => change(it.id, 1)} className="block w-full text-left">
                <img src={it.img} alt={it.name} className="h-24 w-full object-cover" />
                <div className="p-2">
                  <p className="line-clamp-1 text-xs font-semibold text-primary">{it.name}</p>
                  <p className="text-[10px] text-muted-foreground">Size {it.size}</p>
                </div>
              </button>
              {n > 0 && (
                <span className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-tertiary text-xs font-bold text-tertiary-foreground">
                  ×{n}
                </span>
              )}
              <div className="flex items-center justify-between border-t border-border px-1.5 py-1">
                <button type="button" aria-label={`Kurangi ${it.name}`} onClick={() => change(it.id, -1)} disabled={!n} className="rounded p-1 disabled:opacity-30">
                  <Minus className="h-3 w-3" />
                </button>
                <span className="text-xs font-semibold">{n}</span>
                <button type="button" aria-label={`Tambah ${it.name}`} onClick={() => change(it.id, 1)} className="rounded p-1">
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Button
        disabled={!total}
        onClick={() =>
          onConfirm(collection.filter(i => counts[i.id]).map(i => ({ item: i, qty: counts[i.id] })))
        }
        className="w-full rounded-full bg-coral text-coral-foreground hover:bg-coral/90"
      >
        <Layers className="mr-2 h-4 w-4" />
        {total ? `Tawarkan ${total} kartu` : "Pilih minimal 1 kartu"}
      </Button>
    </div>
  );
}

export function OfferSummary({ offer, onEdit }: { offer: SwapOffer; onEdit: () => void }) {
  return (
    <div className="rounded-xl border border-border p-3">
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-semibold text-primary">Kartu yang kamu tawarkan</span>
        <button type="button" onClick={onEdit} className="font-semibold text-tertiary underline underline-offset-2">Ubah</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {offer.map(o => (
          <span key={o.item.id} className="flex items-center gap-1.5 rounded-full bg-secondary py-1 pl-1 pr-2.5 text-xs">
            <img src={o.item.img} alt="" className="h-5 w-5 rounded-full object-cover" />
            {o.item.name} ×{o.qty}
          </span>
        ))}
      </div>
    </div>
  );
}
