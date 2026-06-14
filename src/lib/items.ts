import c1 from "@/assets/c1.jpg";
import c2 from "@/assets/c2.jpg";
import c3 from "@/assets/c3.jpg";
import c4 from "@/assets/c4.jpg";
import c5 from "@/assets/c5.jpg";
import c6 from "@/assets/c6.jpg";
import c7 from "@/assets/c7.jpg";
import c8 from "@/assets/c8.jpg";

export type Item = {
  id: string;
  img: string;
  name: string;
  owner: string;
  loc: string;
  size: string;
  rating: number;
  outfit: string;
  co2: number;
  gender: "Pria" | "Wanita";
};

export const ITEMS: Item[] = [
  { id: "TB-001", img: c1, name: "Vintage Denim Jacket", owner: "Raka P.", loc: "Bandung", size: "L", rating: 9.2, outfit: "Streetwear", co2: 16.2, gender: "Pria" },
  { id: "TB-002", img: c2, name: "Cream Knit Sweater", owner: "Anya S.", loc: "Jakarta", size: "M", rating: 9.5, outfit: "Cozy Daily", co2: 8.4, gender: "Wanita" },
  { id: "TB-003", img: c3, name: "Batik Modern Shirt", owner: "Dimas R.", loc: "Yogyakarta", size: "L", rating: 8.8, outfit: "Smart Casual", co2: 6.1, gender: "Pria" },
  { id: "TB-004", img: c4, name: "Floral Summer Dress", owner: "Sari M.", loc: "Bali", size: "S", rating: 9.0, outfit: "Vacation", co2: 5.7, gender: "Wanita" },
  { id: "TB-005", img: c5, name: "Essential White Tee", owner: "Bayu N.", loc: "Surabaya", size: "M", rating: 8.5, outfit: "Basics", co2: 4.2, gender: "Pria" },
  { id: "TB-006", img: c6, name: "Leather Bomber Jacket", owner: "Iqbal F.", loc: "Jakarta", size: "L", rating: 9.4, outfit: "Edgy Layer", co2: 18.6, gender: "Pria" },
  { id: "TB-007", img: c7, name: "Pleated Midi Skirt", owner: "Tasya W.", loc: "Tangerang", size: "M", rating: 9.1, outfit: "Office Chic", co2: 7.3, gender: "Wanita" },
  { id: "TB-008", img: c8, name: "Linen Oversize Shirt", owner: "Kayla H.", loc: "Depok", size: "L", rating: 9.0, outfit: "Resort Wear", co2: 9.5, gender: "Wanita" },
];

export function co2ToAcHours(kg: number): string {
  const hours = kg / 0.75;
  if (hours >= 8760) return `${(hours / 8760).toFixed(0)} tahun menyalakan AC 1 PK`;
  if (hours >= 24) return `${(hours / 24).toFixed(0)} hari menyalakan AC 1 PK`;
  return `${hours.toFixed(1)} jam menyalakan AC 1 PK`;
}
