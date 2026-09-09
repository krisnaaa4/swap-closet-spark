import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClothesRequests } from "@/components/ClothesRequests";

export const Route = createFileRoute("/permintaan")({
  head: () => ({
    meta: [
      { title: "Clothes Request — Papan Permintaan Pakaian | Tukar Baju" },
      { name: "description", content: "Lihat permintaan pakaian dari pengguna lain: donasi untuk yang membutuhkan atau pembelian langsung. Ajukan koleksimu dan bantu kurangi pakaian mubazir." },
      { property: "og:title", content: "Clothes Request — Papan Permintaan Pakaian" },
      { property: "og:description", content: "Papan permintaan gaya ala lowongan kerja: lihat ukuran, style, dan kebutuhan pengguna, lalu ajukan koleksimu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RequestBoard,
});

function RequestBoard() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Shirt className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight">Tukar Baju</span>
          </Link>
          <Button asChild variant="ghost" className="gap-2">
            <Link to="/"><ArrowLeft className="h-4 w-4" /> Kembali ke Beranda</Link>
          </Button>
        </div>
      </header>
      <main>
        <ClothesRequests variant="full" />
      </main>
    </div>
  );
}
