import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Shirt, Mail, Lock, ArrowRight, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Masuk & Daftar — Tukar Baju" },
    { name: "description", content: "Masuk atau buat akun Tukar Baju untuk bergabung dengan komunitas pakaian sirkular." },
    { property: "og:title", content: "Masuk & Daftar — Tukar Baju" },
    { property: "og:description", content: "Bergabung dengan komunitas Tukar Baju." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: AuthPage,
  validateSearch: (search: Record<string, unknown>) => ({
    tab: search.tab === "daftar" ? "daftar" : "masuk",
  }),
});

function AuthPage() {
  const { tab } = Route.useSearch();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(tab);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirm, setRegisterConfirm] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.navigate({ to: "/" });
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (registerPassword !== registerConfirm) {
      setError("Password dan konfirmasi password tidak cocok");
      return;
    }
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({
      email: registerEmail,
      password: registerPassword,
      options: { emailRedirectTo: window.location.origin },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setError("Berhasil daftar! Silakan cek email untuk verifikasi.");
  }

  async function handleGoogle() {
    setLoading(true);
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    setLoading(false);
    if (result.error) {
      setError(result.error instanceof Error ? result.error.message : String(result.error));
    }
    if (result.redirected) {
      return;
    }
    router.navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Shirt className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight">Tukar Baju</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold tracking-tight text-primary">Selamat Datang</h1>
            <p className="mt-2 text-muted-foreground">Masuk atau daftar untuk mulai menukar pakaian</p>
          </div>

          <Button
            variant="outline"
            className="w-full gap-2 rounded-full mb-6"
            onClick={handleGoogle}
            disabled={loading}
          >
            <Chrome className="h-4 w-4" /> Masuk dengan Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">atau</span>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 rounded-full bg-secondary p-1">
              <TabsTrigger value="masuk" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Masuk
              </TabsTrigger>
              <TabsTrigger value="daftar" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Daftar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="masuk">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="nama@email.com"
                      className="pl-10 rounded-xl"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 rounded-xl"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {error && (
                  <p className="text-sm text-coral">{error}</p>
                )}
                <Button type="submit" className="w-full gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={loading}>
                  {loading ? "Memuat..." : "Masuk"} <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="daftar">
              <form onSubmit={handleRegister} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="nama@email.com"
                      className="pl-10 rounded-xl"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 rounded-xl"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm">Konfirmasi Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 rounded-xl"
                      value={registerConfirm}
                      onChange={(e) => setRegisterConfirm(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {error && (
                  <p className={`text-sm ${error.startsWith("Berhasil") ? "text-eco" : "text-coral"}`}>{error}</p>
                )}
                <Button type="submit" className="w-full gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={loading}>
                  {loading ? "Memuat..." : "Daftar"} <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
