import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2, Scissors, Tag, HandHeart, ArrowLeft, Loader2, Check,
  Upload, BarChart3, Truck, FileText, Sparkles, Recycle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { registerB2bPartner } from "@/lib/api/ai.functions";

export const Route = createFileRoute("/b2b")({
  head: () => ({
    meta: [
      { title: "B2B Portal — Barteran untuk Bisnis & Komunitas" },
      { name: "description", content: "Corporate Take-Back, UMKM Upcycling Network, dan Brand Partnership. Alihkan limbah tekstil perusahaanmu menjadi dampak terukur dengan ESG report siap audit." },
      { property: "og:title", content: "B2B Portal — Barteran" },
      { property: "og:description", content: "Program take-back korporat dan jaringan upcycling UMKM berbasis AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: B2BPage,
});

const PROGRAMS = [
  {
    id: "corporate",
    icon: Building2,
    title: "Corporate Wardrobe Program",
    tagline: "Take-back seragam & merchandise perusahaan",
    points: [
      { icon: Upload, text: "Bulk upload 100+ item — AI grading otomatis per item" },
      { icon: Truck, text: "Logistik pickup dikoordinasikan tim Barteran" },
      { icon: Recycle, text: "Pilih jalur: katalog swap, donasi need-based, atau upcycling UMKM" },
      { icon: FileText, text: "ESG Report PDF siap audit: CO₂ dihemat, komunitas terbantu, limbah dialihkan" },
    ],
  },
  {
    id: "umkm",
    icon: Scissors,
    title: "UMKM Upcycling Network",
    tagline: "Untuk penjahit, konveksi kecil, dan pengrajin",
    points: [
      { icon: Sparkles, text: "AI Material Matchmaking: item rusak → rekomendasi produk upcycling" },
      { icon: Upload, text: "Terima bahan baku tekstil dari aliran declutter Barteran" },
      { icon: BarChart3, text: "Dashboard produksi & tracking order" },
      { icon: Tag, text: "Jual produk upcycling di katalog dengan revenue share" },
    ],
  },
  {
    id: "brand",
    icon: Tag,
    title: "Brand Take-Back Partnership",
    tagline: "Program sirkular white-label untuk brand fashion",
    points: [
      { icon: Upload, text: "Portal take-back white-label untuk pelanggan brandmu" },
      { icon: Sparkles, text: "AI grading: layak swap → katalog, tidak layak → UMKM" },
      { icon: HandHeart, text: "Circular Credits: pelanggan dapat kredit Barteran atau diskon brand" },
      { icon: FileText, text: "Brand Impact Report untuk laporan keberlanjutan" },
    ],
  },
  {
    id: "community",
    icon: HandHeart,
    title: "Community Impact Partner",
    tagline: "Untuk NGO, CSR, dan kampus",
    points: [
      { icon: Upload, text: "Bulk Declutter Campaign: kumpulkan pakaian massal, kami proses" },
      { icon: Sparkles, text: "Need-Based Distribution: AI mencocokkan ke komunitas prasejahtera" },
      { icon: BarChart3, text: "Impact Attribution: laporan dampak spesifik per campaign" },
    ],
  },
];

function B2BPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
          </Link>
          <span className="font-display text-lg font-bold">Barteran for Business</span>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-eco" /> B2B Portal — v2.0
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Ubah limbah tekstil bisnismu jadi <span className="text-eco">dampak terukur</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Program take-back korporat, jaringan upcycling UMKM, dan kemitraan brand — semuanya dengan AI grading dan ESG report siap audit.
          </p>
        </div>

        <Tabs defaultValue="corporate" className="mt-12">
          <TabsList className="mx-auto flex w-fit flex-wrap">
            {PROGRAMS.map((p) => (
              <TabsTrigger key={p.id} value={p.id} className="gap-2">
                <p.icon className="h-4 w-4" /> {p.title.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          {PROGRAMS.map((p) => (
            <TabsContent key={p.id} value={p.id}>
              <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-border bg-card p-8">
                <div className="flex items-start gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
                    <p.icon className="h-7 w-7" />
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-bold">{p.title}</h2>
                    <p className="text-muted-foreground">{p.tagline}</p>
                  </div>
                </div>
                <ul className="mt-6 grid gap-4 md:grid-cols-2">
                  {p.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-xl bg-muted/60 p-4">
                      <pt.icon className="mt-0.5 h-5 w-5 shrink-0 text-tertiary" />
                      <span className="text-sm">{pt.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <PartnerForm />
      </section>
    </div>
  );
}

function PartnerForm() {
  const [orgType, setOrgType] = useState("corporate");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Masuk dulu untuk mendaftar sebagai partner", {
        action: { label: "Masuk", onClick: () => { window.location.href = "/auth?tab=masuk"; } },
      });
      return;
    }
    setSubmitting(true);
    try {
      await registerB2bPartner({
        data: {
          orgName: String(fd.get("orgName") ?? ""),
          orgType,
          contactName: String(fd.get("contactName") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          city: String(fd.get("city") ?? ""),
          volumeEstimate: String(fd.get("volume") ?? ""),
          message: String(fd.get("message") ?? ""),
        },
      });
      setDone(true);
      toast.success("Pendaftaran terkirim! Tim kami akan menghubungimu.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal mengirim pendaftaran");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-16 max-w-2xl rounded-3xl border border-border bg-card p-8">
      {done ? (
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-eco/10 text-eco">
            <Check className="h-8 w-8" />
          </span>
          <h3 className="font-display text-2xl font-bold">Pendaftaran diterima!</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Tim partnership Barteran akan menghubungimu dalam 2 hari kerja untuk verifikasi dan onboarding.
          </p>
          <Link to="/">
            <Button variant="outline" className="rounded-full">Kembali ke Beranda</Button>
          </Link>
        </div>
      ) : (
        <>
          <h2 className="font-display text-2xl font-bold">Daftar sebagai Partner</h2>
          <p className="mt-1 text-sm text-muted-foreground">Isi formulir ini — tim kami akan follow-up untuk verifikasi.</p>
          <form onSubmit={(e) => void submit(e)} className="mt-6 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Nama Organisasi *</label>
                <Input name="orgName" required placeholder="PT / CV / Komunitas" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Tipe Partner *</label>
                <Select value={orgType} onValueChange={setOrgType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate">Korporasi</SelectItem>
                    <SelectItem value="umkm">UMKM Upcycling</SelectItem>
                    <SelectItem value="brand">Brand Fashion</SelectItem>
                    <SelectItem value="community">Komunitas / CSR / NGO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Nama Kontak *</label>
                <Input name="contactName" required placeholder="Nama lengkap" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Email *</label>
                <Input name="email" type="email" required placeholder="nama@perusahaan.id" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">WhatsApp</label>
                <Input name="phone" placeholder="08xx-xxxx-xxxx" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Kota</label>
                <Input name="city" placeholder="Jakarta, Bandung, ..." />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Estimasi Volume (per kuartal)</label>
              <Input name="volume" placeholder="cth. 500 kg seragam / 200 item" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Ceritakan kebutuhanmu</label>
              <Textarea name="message" rows={3} placeholder="Program take-back, kapasitas produksi, campaign donasi, ..." />
            </div>
            <Button type="submit" disabled={submitting} className="gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              Kirim Pendaftaran
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
