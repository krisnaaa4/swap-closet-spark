import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Package, Upload, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuthUser } from "@/hooks/use-auth-user";
import { SmartListing } from "@/components/SmartListing";

export const Route = createFileRoute("/koleksiku")({
  head: () => ({ meta: [
    { title: "Koleksiku — Pakaian yang Kamu Unggah | Tukar Baju" },
    { name: "description", content: "Lihat semua pakaian yang sudah kamu unggah ke Tukar Baju beserta status QC dan harganya." },
    { property: "og:title", content: "Koleksiku — Tukar Baju" },
    { property: "og:description", content: "Semua pakaian yang kamu unggah dalam satu tempat." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: KoleksikuPage,
});

type ListingRow = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  gender: string | null;
  brand: string | null;
  size: string | null;
  condition: string | null;
  price: number | null;
  photo_urls: string[] | null;
  ai_confidence: number | null;
  status: string;
  created_at: string;
};

function KoleksikuPage() {
  const { user, loading: authLoading } = useAuthUser();
  const [listings, setListings] = useState<ListingRow[] | null>(null);
  const [fetchError, setFetchError] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  const loadListings = useCallback(async () => {
    const { data, error } = await supabase
      .from("listings")
      .select("id, title, description, category, gender, brand, size, condition, price, photo_urls, ai_confidence, status, created_at")
      .order("created_at", { ascending: false });
    if (error) setFetchError(true);
    else setListings(data as ListingRow[]);
  }, []);

  useEffect(() => {
    if (user) void loadListings();
  }, [user, loadListings]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">Memuat…</div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
        <Package className="h-12 w-12 text-tertiary" />
        <h1 className="font-display text-2xl font-bold text-primary">Masuk untuk melihat koleksimu</h1>
        <p className="max-w-md text-sm text-muted-foreground">Koleksiku menampilkan semua pakaian yang sudah kamu unggah. Masuk dulu ya.</p>
        <div className="flex gap-3">
          <Button asChild className="rounded-full"><Link to="/auth" search={{ tab: "masuk" }}>Masuk</Link></Button>
          <Button asChild variant="outline" className="rounded-full"><Link to="/">Beranda</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
          <Link to="/" className="font-display text-xl font-bold text-primary">Tukar Baju</Link>
          <div className="flex items-center gap-2">
            <Button onClick={() => setUploadOpen(true)} className="gap-2 rounded-full bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
              <Upload className="h-4 w-4" /> Upload Pakaian
            </Button>
            <Button asChild variant="ghost"><Link to="/"><ArrowLeft className="h-4 w-4" /> Beranda</Link></Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="font-display text-3xl font-bold text-primary">Koleksiku</h1>
        <p className="mt-2 text-sm text-muted-foreground">Semua pakaian yang kamu unggah, lengkap dengan status pemeriksaan dan harga.</p>

        {fetchError ? (
          <p className="mt-8 text-sm text-destructive">Koleksi tidak dapat dimuat. Coba muat ulang halaman.</p>
        ) : listings === null ? (
          <p className="mt-8 text-sm text-muted-foreground">Memuat koleksi…</p>
        ) : listings.length === 0 ? (
          <div className="py-16 text-center">
            <Package className="mx-auto h-10 w-10 text-tertiary" />
            <h2 className="mt-4 font-display text-xl font-semibold">Belum ada koleksi</h2>
            <p className="mt-1 text-sm text-muted-foreground">Unggah pakaian pertamamu dan biarkan AI menyusun listnya.</p>
            <Button onClick={() => setUploadOpen(true)} className="mt-6 gap-2 rounded-full">
              <Upload className="h-4 w-4" /> Upload Pakaian
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((item) => {
              const approved = item.status === "Listed";
              return (
                <article key={item.id} className="overflow-hidden rounded-xl border border-border bg-card">
                  {item.photo_urls?.[0] ? (
                    <img src={item.photo_urls[0]} alt={item.title} className="aspect-[4/3] w-full object-cover" />
                  ) : (
                    <div className="grid aspect-[4/3] w-full place-items-center bg-secondary text-muted-foreground">
                      <Package className="h-8 w-8" />
                    </div>
                  )}
                  <div className="space-y-3 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold text-primary">{item.title}</h3>
                      {approved ? (
                        <Badge className="gap-1 bg-eco text-white"><ShieldCheck className="h-3 w-3" /> Listed</Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" /> {item.status}</Badge>
                      )}
                    </div>
                    <p className="line-clamp-2 text-xs text-muted-foreground">{item.description || item.brand || "Tanpa deskripsi"}</p>
                    <div className="flex flex-wrap gap-1.5 text-xs text-muted-foreground">
                      {item.category && <span className="rounded-full bg-secondary px-2 py-0.5">{item.category}</span>}
                      {item.size && <span className="rounded-full bg-secondary px-2 py-0.5">Size {item.size}</span>}
                      {item.condition && <span className="rounded-full bg-secondary px-2 py-0.5">{item.condition}</span>}
                    </div>
                    <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
                      <span className="font-semibold text-primary">{item.price != null ? `Rp${item.price.toLocaleString("id-ID")}` : "Harga menyusul"}</span>
                      {item.ai_confidence != null && (
                        <span className="text-xs text-muted-foreground">Keyakinan AI {Math.round(item.ai_confidence * 100)}%</span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <SmartListing open={uploadOpen} onOpenChange={(next) => { setUploadOpen(next); if (!next) void loadListings(); }} />
    </div>
  );
}
