# Tukar Style

Act as an expert frontend developer and UX designer. Build a modern, premium desktop e-commerce web application for "Tukar Baju", a circular textile waste platform in Indonesia. The design should feel like a premium, clean marketplace combined with a fun "dating app matchmaking" vibe for clothes swapping. 

Use Tailwind CSS, Lucide icons, and Shadcn UI components. Ensure high scannability, interactive states, micro-interactions, and a perfectly aligned responsive grid layout optimized for desktop viewports.

Use an eco-friendly yet modern color palette: vibrant forest/emerald greens as primary colors, combined with playful, high-conversion matchmaking accent colors like soft coral or electric cyan.

Implement the following page structure and sections in order:

1. NAVBAR

- Logo: "Tukar Baju"

- Menu links: Koleksi Outfit, Donasi, Daur Ulang

- Action Buttons: "Hubungi Kami" (ghost style) and "Upload Pakaian" (primary CTA button with pulse animation).

2. HERO SECTION

- Left side: 

  * Mini copy text: "A platform that allows locals to swap clothes"

  * Heading: "Swapping unused outfits, because reducing textile waste is the real fit."

  * Subheading/Background: Contextualize that Indonesia generates 2.3 million tonnes of textile waste per year and that Tukar Baju is changing consumption behavior by fixing the system, not just the landfill.

- Right side: High-fidelity interactive visual showing two clothing items matching/swapping with an active "Match!" or heart overlay, mimicking a dating app success screen.

3. GENERAL INFORMATION & HOW IT WORKS (Split into 2 columns or clean grid)

- Column 1: "Mission 0 Textile to Landfill" containing 3 modern feature cards with icons:

  * Tukar Pakaian (Lemarimu penuh, tapi kamu bosan? Tukar dengan orang di sekitarmu menggunakan Token Swap)

  * Donasi Pakaian (Pakaianmu sampai ke tangan yang benar-benar membutuhkan, bukan kotak donasi biasa.)

  * Daur Ulang Pakaian (Pakaian rusak bukan akhir segalanya. Kami ubah jadi material baru dan kamu dapat Token Swap.)

- Column 2: "How Swap Works" stepper timeline (Steps A to F):

  a. Cari Pakaian Favorit (Jelajahi list pakaian di bawah, Catat kode pakaian.)

  b. Ajukan pertukaran (Pilih pakaian yang telah kamu miliki di katalog, apabila kamu belum punya harus upload terlebih dahulu)

  c. Tunggu konfirmasi (Pengajuan akan masuk di list swaps oleh pemilik pakaian, tunggu pemilik konfirmasi)

  d. Pemilik menyetujui? (Jika pemilik setuju untuk swap, transaksi dilanjutkan.)

  e. Konfirmasi & pembayaran (Kamu akan menerima receipt order untuk pembayaran. lakukan pembayaran dari Qris yang muncul.)

  f. Pakaian diantar (Driver akan mengambil pakaian dari alamatmu dan mengantarkannya ke pemilik baru, Selesai.)

- Bottom Banner of this section: Rules for uploading clothes (Cuci sebelum di Tukar, Bersih & layak pakai, Semua kategori, Branded & non-branded, Tidak pakaian dalam). Use clean minimalist icons for each rule.

4. CLOTHING CATALOG CARDS (Dating App Style with Carbon Tracker)

- Add a Gender Filter tab (Semua, Pria, Wanita).

- Display a 4-column responsive grid of clothing cards. Each card must feature: Large clothing image, Owner's name, Location, Size, Condition rating (e.g., 9/10), Outfit name, and a "Green Eco-Badge" displaying estimated carbon saved by choosing circular fashion (e.g., "Saves 4.2 kg CO2" or "Saves 16.2 kg CO2 for Denim").

- Action triggers on card hover or bottom footer: "Swipe/Match to Swap", "Beli/Preloved", or "Sewa". Clicking these triggers a beautiful modal simulation showing the specific transaction type and calculating the user's specific carbon savings compared to buying new.

5. TREND & EVENT-BASED RECOMMENDATIONS

- Section title: "Rekomendasi Berdasarkan Trend"

- Subtitle: "Kamu cari pakaian unik untuk acara tertentu? Lihat pilihan yang bisa kamu tukar di bawah ini."

- Filter categories by cultural events using a horizontal tag layout: Konser Musik, Agustusan/Hari Kemerdekaan RI, Halloween, and others.

6. PRICING PLANS

- Create a 3-tier pricing table for Token Swap packages/subscriptions (e.g., Starter Pack, Casual Swapper, Eco Warrior Pro) with feature checklists, price tags in IDR (Rupiah), and clean "Pilih Paket" buttons.

7. ENVIRONMENTAL CONTRIBUTIONS & CARBON SAVINGS (2 Split Cards + Live Tracker)

- Card A: "Donasi Pakaian" -> Show stats: Mitra NGO Terverifikasi, Jumlah Donatur, Total Pcs, Total Pcs Siap Didonasikan. Add a green badge: "Total Carbon Saved: X kg CO2 (Equivalent to planting Y trees)". Action button: "Donasi Sekarang".

- Card B: "IJOL Fiber" (Recycling) -> Show stats: Total Pengirim, Total Kg Tekstil, Total Kg Tekstil Siap Daur Ulang. Add a badge: "Landfill Emissions Avoided: Z kg CO2". Action button: "Kirim Bahan Daur Ulang".

- Include a small text footer in this section: "Tanggal terakhir diperbarui: [Current Date]. Konversi data dihitung berdasarkan standar LCA (Lifecycle Assessment) tekstil global."

8. TRUST, SAFETY, & PARTNERSHIP FOOTER

- Badges/Logos showcasing trust, secure escrow payment (QRIS verification), secure logistics partners, and environmental NGO partnership logos. 

- Add a small interactive "Carbon Calculator Widget" where users can input the number of clothes sitting unused in their closet to see how much carbon emissions they could unlock/save by joining the Tukar Baju community.

Populate the app with realistic mock data suited for the Indonesian sustainable fashion market. Make all buttons interactive and ensure modals/tabs toggle seamlessly.

my primary color: 453421
secondary color: EAE1D8
tertiary: C99547

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://swap-closet-spark.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c239a386-6ba7-4de6-85be-1168eb743268).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
