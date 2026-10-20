import { useState } from "react";
import { Check, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ITEMS, type Item } from "@/lib/items";
import { isValidSwapSelection, toggleSwapSelection } from "@/lib/swap-rules";

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
  const [selected, setSelected] = useState<string[]>([]);
  const total = selected.length;
  const direct = !!target.directExchange;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Pilih kartu dari koleksimu untuk ditawarkan sebagai ganti <strong className="text-primary">{target.name}</strong>.
        {direct ? " Pilih tepat satu pakaian. Tidak perlu persetujuan pemilik." : " Pilih satu atau lebih pakaian berbeda. Maksimal satu untuk setiap pakaian; pemilik perlu menyetujui tawaranmu."}
      </p>
      <p className="text-xs text-muted-foreground">Koleksi contoh · belum terhubung ke lemari akunmu.</p>
      <div className="grid max-h-[50vh] grid-cols-3 gap-3 overflow-y-auto pr-1">
        {collection.map(it => {
          const picked = selected.includes(it.id);
          return (
            <div
              key={it.id}
              className={cn(
                "relative overflow-hidden rounded-lg border-2 bg-card transition",
                picked ? "border-tertiary shadow-lg" : "border-border",
              )}
            >
              <Button type="button" variant="ghost" aria-label={`Pilih ${it.name}`} aria-pressed={picked} onClick={() => setSelected(s => toggleSwapSelection(s, it.id, direct))} className="block h-auto w-full whitespace-normal p-0 text-left hover:bg-secondary">
                <img src={it.img} alt={it.name} className="h-24 w-full object-cover" />
                <div className="p-2">
                  <p className="line-clamp-1 text-xs font-semibold text-primary">{it.name}</p>
                  <p className="text-[10px] text-muted-foreground">Size {it.size}</p>
                </div>
              </Button>
              {picked && (
                <span className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-tertiary text-xs font-bold text-tertiary-foreground">
                  <Check className="h-4 w-4" />
                </span>
              )}
            </div>
          );
        })}
      </div>
      <Button
        disabled={!isValidSwapSelection(selected, direct)}
        onClick={() =>
          onConfirm(collection.filter(i => selected.includes(i.id)).map(i => ({ item: i, qty: 1 })))
        }
        className="w-full rounded-full bg-coral text-coral-foreground hover:bg-coral/90"
      >
        <Layers className="mr-2 h-4 w-4" />
        {total ? (direct ? "Lanjutkan ke pembayaran" : `Tinjau ${total} pakaian`) : "Pilih pakaian"}
      </Button>
    </div>
  );
}

export function OfferSummary({ offer, onEdit }: { offer: SwapOffer; onEdit: () => void }) {
  return (
    <div className="rounded-xl border border-border p-3">
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-semibold text-primary">Kartu yang kamu tawarkan</span>
        <Button type="button" variant="link" size="sm" onClick={onEdit}>Ubah</Button>
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
