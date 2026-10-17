import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, Upload, X, Loader2, Check, ShieldCheck, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { analyzeListing, type ListingDraft } from "@/lib/api/ai.functions";

const CATEGORIES = ["Atasan", "Bawahan", "Dress", "Outerwear", "Aksesoris", "Sepatu", "Lainnya"];
const CONDITIONS = ["Baru", "Seperti Baru", "Baik", "Cukup", "Perlu Diketahui"];
const GENDERS = ["Pria", "Wanita", "Unisex"];

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function SmartListing({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState<ListingDraft | null>(null);
  const [saved, setSaved] = useState(false);

  const reset = () => {
    setPhotos([]); setDraft(null); setSaved(false); setAnalyzing(false); setSaving(false);
  };

  const addPhotos = async (files: FileList | null) => {
    if (!files) return;
    const next = [...photos];
    for (const f of Array.from(files)) {
      if (next.length >= 5) break;
      if (!f.type.startsWith("image/")) continue;
      next.push(await fileToDataUrl(f));
    }
    setPhotos(next);
  };

  const runAnalysis = async () => {
    setAnalyzing(true);
    try {
      const result = await analyzeListing({ data: { images: photos } });
      setDraft(result);
      toast.success("Draft listing berhasil dibuat AI!");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Analisis AI gagal, coba lagi");
    } finally {
      setAnalyzing(false);
    }
  };

  const saveListing = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Masuk dulu untuk menyimpan listing");
        return;
      }
      const { error } = await supabase.from("listings").insert({
        user_id: user.id,
        title: draft.title,
        description: draft.description,
        category: draft.category,
        gender: draft.gender,
        brand: draft.brand || null,
        size: draft.size || null,
        condition: draft.condition,
        price: draft.price,
        photo_urls: photos,
        ai_confidence: draft.confidence,
        status: draft.confidence >= 0.85 ? "Listed" : "Menunggu QC",
      });
      if (error) throw error;
      setSaved(true);
      toast.success("Listing tersimpan!");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Gagal menyimpan listing");
    } finally {
      setSaving(false);
    }
  };

  const update = (patch: Partial<ListingDraft>) => setDraft((d) => (d ? { ...d, ...patch } : d));

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) reset(); }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-2xl">
            <Sparkles className="h-5 w-5 text-tertiary" /> Smart Listing AI
          </DialogTitle>
          <DialogDescription>
            Upload 1–5 foto pakaianmu — AI akan menganalisis dan membuat draft listing dalam hitungan detik.
          </DialogDescription>
        </DialogHeader>

        {saved ? (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-eco/10 text-eco">
              <Check className="h-8 w-8" />
            </span>
            <h3 className="font-display text-xl font-bold">Listing berhasil disimpan!</h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              {draft && draft.confidence >= 0.85
                ? "Confidence AI tinggi — listing langsung tayang di katalog."
                : "Listingmu masuk antrian QC. Tim kami akan meninjau sebelum tayang."}
            </p>
            <Button onClick={() => { onOpenChange(false); reset(); }} className="rounded-full bg-primary text-primary-foreground">Selesai</Button>
          </div>
        ) : !draft ? (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-muted/50 px-6 py-10 text-center transition-colors hover:border-tertiary hover:bg-muted"
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm font-medium">Klik untuk upload foto pakaian</span>
              <span className="text-xs text-muted-foreground">JPG/PNG, maksimal 5 foto</span>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => { void addPhotos(e.target.files); e.target.value = ""; }}
            />
            {photos.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {photos.map((p, i) => (
                  <div key={i} className="relative h-20 w-20 overflow-hidden rounded-xl border border-border">
                    <img src={p} alt={`Foto ${i + 1}`} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotos(photos.filter((_, j) => j !== i))}
                      className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-foreground/70 text-background"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <Button
              disabled={photos.length === 0 || analyzing}
              onClick={() => void runAnalysis()}
              className="w-full gap-2 rounded-full bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
            >
              {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {analyzing ? "AI sedang menganalisis foto..." : "Analisis dengan AI"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-border bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-4 w-4 text-eco" />
                <span>AI confidence: <strong>{Math.round(draft.confidence * 100)}%</strong></span>
              </div>
              <Badge variant={draft.confidence >= 0.85 ? "default" : "secondary"}>
                {draft.confidence >= 0.85 ? "Auto-approve" : "Perlu QC manual"}
              </Badge>
            </div>

            <div className="grid gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Judul</label>
                <Input value={draft.title} onChange={(e) => update({ title: e.target.value })} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Deskripsi</label>
                <Textarea rows={3} value={draft.description} onChange={(e) => update({ description: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Kategori</label>
                  <Select value={draft.category} onValueChange={(v) => update({ category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Gender</label>
                  <Select value={draft.gender} onValueChange={(v) => update({ gender: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{GENDERS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Kondisi</label>
                  <Select value={draft.condition} onValueChange={(v) => update({ condition: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{CONDITIONS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Ukuran</label>
                  <Input value={draft.size} onChange={(e) => update({ size: e.target.value })} placeholder="cth. M, L, 42" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Brand</label>
                  <Input value={draft.brand} onChange={(e) => update({ brand: e.target.value })} placeholder="Opsional" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Harga rekomendasi (Rp)</label>
                  <Input type="number" value={draft.price} onChange={(e) => update({ price: Number(e.target.value) })} />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setDraft(null)} className="rounded-full">Ulangi Analisis</Button>
              <Button
                onClick={() => void saveListing()}
                disabled={saving}
                className="flex-1 gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                Simpan Listing
              </Button>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <LogIn className="h-3 w-3" /> Belum punya akun? <Link to="/auth" search={{ tab: "daftar" }} className="font-medium text-tertiary underline">Daftar dulu</Link> untuk menyimpan.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
