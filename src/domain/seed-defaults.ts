/**
 * Seed defaults from confirmed interview data (Ibu Pak Riyanto, May 2026).
 * These are editable starting values, not permanent constants.
 * Used only for first-time business profile creation.
 *
 * Confirmed cost structure (per day):
 *   Kedelai:       50 kg × Rp 10.900 = Rp 545.000
 *   Kain saring:   Rp 120.000/tahun  ≈ Rp 329/hari
 *   Kayu bakar:    Rp 400.000/minggu ≈ Rp 57.143/hari
 *   Listrik:       Rp 400.000/bulan  ≈ Rp 13.151/hari
 *   Tenaga kerja:  5 masak × Rp 15.000 = Rp 75.000/hari
 *   Bensin:        Rp 15.000/hari
 *   Plastik:       Rp 5.000/hari
 *   Penyusutan:    Rp 1.500.000 ÷ 5 tahun ≈ Rp 822/hari
 *   TOTAL:         ≈ Rp 711.444/hari
 *
 *   HPP per bungkus: Rp 711.444 ÷ 169 ≈ Rp 4.087
 *   Margin per bungkus: Rp 6.000 − Rp 4.087 = Rp 1.913
 *   Laba/hari: ≈ Rp 302.556
 */
export const SEED_DEFAULTS = {
  businessName: 'Usaha Tahu Ibu Pak Riyanto',
  productName: 'Tahu',
  tofuPerBoard: 169,
  tofuPerPack: 10,
  defaultBoardsPerDay: 10,
  defaultPricePerTofu: 600,
  defaultPricePerPack: 6000,
  defaultProductionDaysPerMonth: 25,
} as const

/**
 * Confirmed daily expense defaults for seeding initial expense records.
 * All values from wawancara keuangan May 2026.
 */
export const SEED_EXPENSE_DEFAULTS = {
  // Bahan baku
  kedelaiPricePerKg: 10900,
  kedelaiKgPerDay: 50,
  // Operasional
  kayuBakarPerWeek: 400000,
  listrikPerMonth: 400000,
  tenagaKerjaPerMasak: 15000,
  masakPerDay: 5,
  // Distribusi
  bensinPerDay: 15000,
  plastikPerDay: 5000,
  // Lain-lain (amortisasi)
  kainSaringPerYear: 120000,
  cetakanCost: 1500000,
  cetakanLifeYears: 5,
} as const
