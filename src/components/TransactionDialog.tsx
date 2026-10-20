import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Clock, QrCode, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SwapOfferPicker, OfferSummary, type SwapOffer } from "@/components/SwapOfferPicker";
import { ExchangeTag } from "@/components/ExchangeTag";
import { co2ToAcHours, type Item } from "@/lib/items";
import { canPayForSwap, isValidSwapSelection } from "@/lib/swap-rules";
import { submitDemoSwap } from "@/lib/submitted-swaps";

export type Transaction = { item: Item; mode: "Swap" | "Beli" | "Sewa" };

export function TransactionDialog({ transaction, onClose }: { transaction: Transaction | null; onClose: () => void }) {
  if (!transaction) return null;
  return <TransactionContent key={`${transaction.item.id}-${transaction.mode}`} transaction={transaction} onClose={onClose} />;
}

function TransactionContent({ transaction: { item, mode }, onClose }: { transaction: Transaction; onClose: () => void }) {
  const [offer, setOffer] = useState<SwapOffer | null>(null);
  const [qrisOpen, setQrisOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const isSwap = mode === "Swap";
  const needsApproval = isSwap && !item.directExchange;
  const pickedIds = offer?.map(o => o.item.id) ?? [];
  const paymentAllowed = !isSwap || canPayForSwap(!!item.directExchange, pickedIds);
  const picking = isSwap && !offer;

  async function submit() {
    if (!needsApproval || !isValidSwapSelection(pickedIds, false)) return;
    setSubmitting(true);
    try {
      submitDemoSwap(item.id, pickedIds);
      toast.success("Pengajuan swap tersimpan di riwayat contoh.");
      onClose();
      await navigate({ to: "/swap-diajukan" });
    } catch {
      toast.error("Pengajuan belum tersimpan. Silakan coba lagi.");
    } finally { setSubmitting(false); }
  }

  return (
    <Dialog open onOpenChange={open => { if (!open && !submitting) onClose(); }}>
      <DialogContent className="max-h-[90dvh] max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{qrisOpen ? "Pembayaran QRIS" : picking ? "Pilih Kartu Koleksimu" : needsApproval ? "Tinjau Pengajuan Swap" : "Pilih Pembayaran"}</DialogTitle>
          <DialogDescription>{qrisOpen ? "Pratinjau pembayaran · tidak ada transaksi yang ditagihkan." : `${item.name} · ${needsApproval ? "Persetujuan pemilik diperlukan" : isSwap ? "Tukar langsung tanpa persetujuan" : mode}`}</DialogDescription>
        </DialogHeader>
        {qrisOpen ? (
          <div className="space-y-5 text-center">
            <div className="mx-auto grid h-48 w-48 place-items-center rounded-lg border-2 border-dashed border-border bg-muted"><QrCode className="h-28 w-28 text-muted-foreground" /></div>
            <p className="text-sm font-semibold text-primary">QRIS belum tersedia untuk pembayaran nyata</p>
            <p className="text-sm text-muted-foreground">Kode pembayaran akan tersedia setelah layanan pembayaran terhubung. Ini bukan kode QR yang dapat dibayar.</p>
            <div className="flex justify-between border-y border-border py-3 text-sm"><span>Total pembayaran</span><strong>{mode === "Beli" ? "Rp 183.000" : mode === "Sewa" ? "Rp 93.000" : "Rp 18.000 + 50 TKN"}</strong></div>
            <Button variant="outline" className="w-full" onClick={() => setQrisOpen(false)}>Kembali</Button>
          </div>
        ) : picking ? <SwapOfferPicker target={item} onConfirm={setOffer} /> : (
          <>
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <img src={item.img} alt={item.name} className="h-20 w-16 rounded-lg object-cover" />
              <div className="min-w-0 space-y-1 text-sm"><p className="font-semibold text-primary">{item.name}</p><p className="text-xs text-muted-foreground">{item.owner} · {item.loc} · Size {item.size}</p><ExchangeTag item={item} /></div>
            </div>
            {offer && <OfferSummary offer={offer} onEdit={() => setOffer(null)} />}
            {needsApproval ? (
              <>
                <div className="flex items-start gap-2 bg-secondary p-3 text-sm text-primary"><Clock className="mt-0.5 h-4 w-4 shrink-0" /><p>Menunggu persetujuan {item.owner}. Pembayaran belum tersedia sebelum tawaran disetujui.</p></div>
                <Button disabled={submitting} className="w-full" onClick={submit}><Send className="h-4 w-4" />{submitting ? "Mengirim…" : "Kirim Pengajuan Swap"}</Button>
              </>
            ) : (
              <>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>{isSwap ? "Token Swap" : mode === "Beli" ? "Harga Preloved" : "Sewa 3 hari"}</span><strong>{isSwap ? "50 TKN" : mode === "Beli" ? "Rp 165.000" : "Rp 75.000"}</strong></div>
                  <div className="flex justify-between"><span>Biaya logistik</span><strong>Rp 18.000</strong></div>
                </div>
                <p className="text-xs text-eco">Hemat {item.co2} kg CO₂ · setara {co2ToAcHours(item.co2)}.</p>
                <Button variant="outline" className="h-14 w-full justify-between" disabled={!paymentAllowed} onClick={() => { if (paymentAllowed) setQrisOpen(true); }}><span className="flex items-center gap-2"><QrCode className="h-5 w-5" /> QRIS</span><span className="text-xs text-muted-foreground">Pratinjau pembayaran</span></Button>
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}