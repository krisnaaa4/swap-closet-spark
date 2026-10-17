import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type ListingDraft = {
  title: string;
  description: string;
  category: string;
  gender: string;
  brand: string;
  size: string;
  condition: string;
  price: number;
  confidence: number;
};

// AI-1 Smart Listing: analyze clothing photos -> draft listing.
// Public (no auth) so visitors can try the demo; saving requires sign-in.
export const analyzeListing = createServerFn({ method: "POST" })
  .inputValidator((input: { images: string[] }) => {
    if (!Array.isArray(input.images) || input.images.length === 0) {
      throw new Error("Minimal 1 foto diperlukan");
    }
    if (input.images.length > 5) throw new Error("Maksimal 5 foto");
    return { images: input.images.slice(0, 5) };
  })
  .handler(async ({ data }): Promise<ListingDraft> => {
    const { createLovableGateway } = await import("./gateway.server");
    const { provider } = createLovableGateway();

    const imageParts = data.images.map((img) => ({ type: "image" as const, image: img }));

    const result = streamText({
      model: provider("google/gemini-3-flash-preview"),
      maxRetries: 0,
      messages: [
        {
          role: "user",
          content: [
            ...imageParts,
            {
              type: "text",
              text: `Kamu adalah AI untuk marketplace fashion sirkular Indonesia "Barteran". Analisis foto pakaian ini dan hasilkan draft listing. Balas HANYA dengan JSON valid (tanpa markdown fence) dengan field persis berikut:
{
  "title": string (judul menarik, maks 60 karakter, Bahasa Indonesia),
  "description": string (deskripsi menarik maks 150 kata, Bahasa Indonesia),
  "category": string (salah satu: Atasan, Bawahan, Dress, Outerwear, Aksesoris, Sepatu, Lainnya),
  "gender": string (salah satu: Pria, Wanita, Unisex),
  "brand": string (nama brand jika terlihat, else ""),
  "size": string (estimasi ukuran jika terlihat label, else ""),
  "condition": string (salah satu: Baru, Seperti Baru, Baik, Cukup, Perlu Diketahui),
  "price": number (rekomendasi harga preloved wajar dalam Rupiah, bilangan bulat),
  "confidence": number (0-1, seberapa yakin analisismu)
}`,
            },
          ],
        },
      ],
    });

    const text = await result.text;
    const cleaned = text.replace(/```json|```/g, "").trim();
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end === -1) throw new Error("AI tidak menghasilkan draft yang valid, coba foto lain");
    const parsed = JSON.parse(cleaned.slice(start, end + 1)) as Partial<ListingDraft>;

    return {
      title: String(parsed.title ?? "").slice(0, 80) || "Item Preloved",
      description: String(parsed.description ?? ""),
      category: String(parsed.category ?? "Lainnya"),
      gender: String(parsed.gender ?? "Unisex"),
      brand: String(parsed.brand ?? ""),
      size: String(parsed.size ?? ""),
      condition: String(parsed.condition ?? "Baik"),
      price: Math.max(0, Math.round(Number(parsed.price ?? 0))),
      confidence: Math.min(1, Math.max(0, Number(parsed.confidence ?? 0.5))),
    };
  });

// B2B partner registration (requires sign-in; RLS scopes to the user).
export const registerB2bPartner = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      orgName: string;
      orgType: string;
      contactName: string;
      email: string;
      phone?: string;
      city?: string;
      volumeEstimate?: string;
      message?: string;
    }) => {
      if (!input.orgName?.trim() || !input.contactName?.trim() || !input.email?.trim()) {
        throw new Error("Nama organisasi, kontak, dan email wajib diisi");
      }
      if (!["corporate", "umkm", "brand", "community"].includes(input.orgType)) {
        throw new Error("Tipe organisasi tidak valid");
      }
      return input;
    },
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("b2b_partners").insert({
      user_id: context.userId,
      org_name: data.orgName.trim(),
      org_type: data.orgType,
      contact_name: data.contactName.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || null,
      city: data.city?.trim() || null,
      volume_estimate: data.volumeEstimate?.trim() || null,
      message: data.message?.trim() || null,
    });
    if (error) throw new Error("Gagal mengirim pendaftaran: " + error.message);
    return { ok: true };
  });
