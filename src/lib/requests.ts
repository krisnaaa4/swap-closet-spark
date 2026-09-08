import r1 from "@/assets/r1.jpg";
import r2 from "@/assets/r2.jpg";
import r3 from "@/assets/r3.jpg";
import r4 from "@/assets/r4.jpg";
import r5 from "@/assets/r5.jpg";
import r6 from "@/assets/r6.jpg";

export type RequestScope = "Atasan" | "Bawahan" | "Atas & Bawah";
export type RequestMode = "Donasi" | "Beli";

export type ClothesRequest = {
  id: string;
  photo: string;
  shot: "Full body" | "Setengah badan";
  name: string;
  age: number;
  city: string;
  gender: "Pria" | "Wanita";
  height: number;
  weight: number;
  sizeTop: string;
  sizeBottom: string;
  shoe?: string;
  scope: RequestScope;
  mode: RequestMode;
  budget?: string;
  needed: number;
  offers: number;
  accepted: number;
  deadline: string;
  posted: string;
  title: string;
  story: string;
  styles: string[];
  urgent?: boolean;
};

export const REQUESTS: ClothesRequest[] = [
  {
    id: "RQ-101", photo: r1, shot: "Full body", name: "Fajar A.", age: 24, city: "Bekasi", gender: "Pria",
    height: 172, weight: 65, sizeTop: "L", sizeBottom: "32", shoe: "42",
    scope: "Atas & Bawah", mode: "Beli", budget: "Rp75.000 – Rp150.000 / item",
    needed: 3, offers: 12, accepted: 1, deadline: "20 Sep 2026", posted: "2 hari lalu",
    title: "Cari set kerja smart casual untuk kantor baru",
    story: "Baru diterima kerja di kantor yang dresscode-nya smart casual. Butuh kemeja netral dan celana bahan yang rapi. Aku siap beli, bukan minta gratis.",
    styles: ["Smart Casual", "Kemeja Netral", "Celana Bahan"],
  },
  {
    id: "RQ-102", photo: r2, shot: "Setengah badan", name: "Nadia R.", age: 27, city: "Jakarta Timur", gender: "Wanita",
    height: 158, weight: 52, sizeTop: "M", sizeBottom: "28",
    scope: "Atasan", mode: "Donasi",
    needed: 2, offers: 9, accepted: 0, deadline: "15 Sep 2026", posted: "5 jam lalu",
    title: "Butuh atasan lengan panjang untuk wawancara kerja",
    story: "Sedang mencari kerja setelah di-PHK. Butuh 2 atasan lengan panjang warna netral yang sopan untuk wawancara. Kalau ada yang berkenan menghibahkan, sangat membantu.",
    styles: ["Lengan Panjang", "Warna Netral", "Modest"],
    urgent: true,
  },
  {
    id: "RQ-103", photo: r3, shot: "Full body", name: "Prilly S.", age: 22, city: "Bandung", gender: "Wanita",
    height: 163, weight: 50, sizeTop: "S", sizeBottom: "27",
    scope: "Atas & Bawah", mode: "Beli", budget: "Rp50.000 – Rp120.000 / item",
    needed: 4, offers: 18, accepted: 2, deadline: "28 Sep 2026", posted: "1 hari lalu",
    title: "Bangun capsule wardrobe warna earth tone",
    story: "Lagi decluttering lemari dan mau ganti ke capsule wardrobe earth tone. Prefer bahan katun/linen, kondisi minimal 8/10.",
    styles: ["Earth Tone", "Linen", "Minimalis"],
  },
  {
    id: "RQ-104", photo: r4, shot: "Setengah badan", name: "Rendi P.", age: 16, city: "Semarang", gender: "Pria",
    height: 165, weight: 54, sizeTop: "M", sizeBottom: "29",
    scope: "Atasan", mode: "Donasi",
    needed: 3, offers: 7, accepted: 1, deadline: "18 Sep 2026", posted: "3 hari lalu",
    title: "Kaos harian untuk sekolah sore & kegiatan sehari-hari",
    story: "Saya siswa SMK, kaos harian sudah banyak yang sobek. Butuh 3 kaos polos ukuran M. Terima kasih sebelumnya untuk yang berkenan berbagi.",
    styles: ["Kaos Polos", "Basics", "Daily"],
    urgent: true,
  },
  {
    id: "RQ-105", photo: r5, shot: "Full body", name: "Gilang W.", age: 31, city: "Surabaya", gender: "Pria",
    height: 176, weight: 72, sizeTop: "XL", sizeBottom: "34",
    scope: "Bawahan", mode: "Beli", budget: "Rp100.000 – Rp200.000 / item",
    needed: 2, offers: 5, accepted: 0, deadline: "30 Sep 2026", posted: "6 jam lalu",
    title: "Celana chino & jeans ukuran 34 yang jarang ada",
    story: "Susah cari celana ukuran 34 dengan potongan regular. Kalau ada koleksi yang jarang dipakai, aku beli dengan harga wajar.",
    styles: ["Chino", "Denim", "Regular Fit"],
  },
  {
    id: "RQ-106", photo: r6, shot: "Full body", name: "Mega L.", age: 25, city: "Depok", gender: "Wanita",
    height: 160, weight: 55, sizeTop: "M", sizeBottom: "29",
    scope: "Atas & Bawah", mode: "Donasi",
    needed: 2, offers: 11, accepted: 2, deadline: "12 Sep 2026", posted: "4 hari lalu",
    title: "Set kerja pertama setelah pindah kota",
    story: "Baru pindah ke Depok dan koper hilang di perjalanan. Butuh satu set atasan + bawahan kerja untuk sementara sampai gajian pertama.",
    styles: ["Office", "Netral", "Nyaman"],
  },
];

export type IncomingOffer = {
  id: string;
  itemId: string;
  from: string;
  fromCity: string;
  size: string;
  condition: string;
  note: string;
  mode: RequestMode;
  price?: string;
  matchScore: number;
};

export const MY_REQUEST: ClothesRequest = {
  id: "RQ-ME", photo: r3, shot: "Full body", name: "Kamu", age: 23, city: "Jakarta Selatan", gender: "Wanita",
  height: 162, weight: 51, sizeTop: "M", sizeBottom: "28",
  scope: "Atas & Bawah", mode: "Beli", budget: "Rp60.000 – Rp150.000 / item",
  needed: 2, offers: 5, accepted: 0, deadline: "25 Sep 2026", posted: "1 hari lalu",
  title: "Cari 2 outfit kerja earth tone (atas + bawah)",
  story: "Hanya butuh 2 item saja supaya tidak mubazir. Prefer warna earth tone, bahan adem.",
  styles: ["Earth Tone", "Office", "Katun"],
};

export const INCOMING_OFFERS: IncomingOffer[] = [
  { id: "OF-1", itemId: "TB-002", from: "Anya S.", fromCity: "Jakarta", size: "M", condition: "9/10", note: "Cuma dipakai 2 kali, masih wangi dan rapi.", mode: "Beli", price: "Rp95.000", matchScore: 94 },
  { id: "OF-2", itemId: "TB-008", from: "Kayla H.", fromCity: "Depok", size: "L", condition: "8.5/10", note: "Sedikit longgar, cocok untuk gaya oversize.", mode: "Beli", price: "Rp120.000", matchScore: 81 },
  { id: "OF-3", itemId: "TB-007", from: "Tasya W.", fromCity: "Tangerang", size: "M", condition: "9/10", note: "Rok midi kerja, warnanya netral banget.", mode: "Beli", price: "Rp110.000", matchScore: 90 },
  { id: "OF-4", itemId: "TB-005", from: "Bayu N.", fromCity: "Surabaya", size: "M", condition: "8/10", note: "Kaos putih basic, ada sedikit noda kecil di lengan.", mode: "Donasi", matchScore: 62 },
  { id: "OF-5", itemId: "TB-003", from: "Dimas R.", fromCity: "Yogyakarta", size: "L", condition: "9/10", note: "Batik modern, cocok untuk kantor semi formal.", mode: "Beli", price: "Rp135.000", matchScore: 74 },
];
