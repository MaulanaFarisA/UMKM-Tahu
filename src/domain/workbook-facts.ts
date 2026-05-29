import type { ExpenseCategory } from '@/types/database'

export type WorkbookExpenseGroup =
  | 'bahan_baku'
  | 'bahan_tambahan'
  | 'operasional_produksi'
  | 'pemasaran_distribusi'
  | 'lain_lain'

export interface WorkbookExpenseLine {
  readonly group: WorkbookExpenseGroup
  readonly appCategory: ExpenseCategory
  readonly itemName: string
  readonly unitPrice: number
  readonly unit: string
  readonly quantity: number
  readonly notes: string
}

export const WORKBOOK_EXPENSE_GROUP_LABELS: Record<WorkbookExpenseGroup, string> = {
  bahan_baku: 'Bahan Baku',
  bahan_tambahan: 'Bahan Tambahan',
  operasional_produksi: 'Biaya Operasional / Produksi',
  pemasaran_distribusi: 'Biaya Pemasaran / Distribusi',
  lain_lain: 'Biaya Lain-Lain',
}

export const WORKBOOK_EXPENSE_LINES: readonly WorkbookExpenseLine[] = [
  {
    group: 'bahan_baku',
    appCategory: 'raw_material',
    itemName: 'Kedelai',
    unitPrice: 10900,
    unit: 'kg',
    quantity: 50,
    notes: '50 kg/hari → 10 papan tahu',
  },
  {
    group: 'bahan_tambahan',
    appCategory: 'additional_material',
    itemName: 'Air',
    unitPrice: 0,
    unit: 'produksi',
    quantity: 1,
    notes: 'Dari sumur sendiri; pompa masuk biaya listrik',
  },
  {
    group: 'bahan_tambahan',
    appCategory: 'additional_material',
    itemName: 'Kain saring',
    unitPrice: 60000,
    unit: 'tahun',
    quantity: 2 / 365,
    notes: 'Rp 60.000 × 2x/tahun = Rp 120.000/tahun',
  },
  {
    group: 'operasional_produksi',
    appCategory: 'production',
    itemName: 'Kayu bakar',
    unitPrice: 400000,
    unit: 'minggu',
    quantity: 1 / 7,
    notes: 'Rp 400.000/minggu',
  },
  {
    group: 'operasional_produksi',
    appCategory: 'production',
    itemName: 'Listrik',
    unitPrice: 400000,
    unit: 'bulan',
    quantity: 12 / 365,
    notes: 'Termasuk air pompa, lampu, dinamo',
  },
  {
    group: 'operasional_produksi',
    appCategory: 'production',
    itemName: 'Tenaga kerja',
    unitPrice: 75000,
    unit: 'hari',
    quantity: 1,
    notes: '5 masak/hari × Rp 15.000/masak',
  },
  {
    group: 'pemasaran_distribusi',
    appCategory: 'distribution',
    itemName: 'Bensin distribusi',
    unitPrice: 15000,
    unit: 'hari',
    quantity: 1,
    notes: 'Kendaraan milik sendiri, bayar bensin saja',
  },
  {
    group: 'pemasaran_distribusi',
    appCategory: 'distribution',
    itemName: 'Plastik kemasan',
    unitPrice: 5000,
    unit: 'hari',
    quantity: 1,
    notes: 'Plastik ditanggung pemilik usaha',
  },
  {
    group: 'lain_lain',
    appCategory: 'other',
    itemName: 'Penyusutan cetakan',
    unitPrice: 1500000,
    unit: '5 tahun',
    quantity: 1 / (5 * 365),
    notes: '1 set 2 cetakan, umur 5 tahun',
  },
] as const

export const WORKBOOK_PRODUCTION_FACTS = {
  businessName: 'Usaha Tahu Ibu Pak Riyanto',
  productName: 'Tahu',
  boardsPerDay: 10,
  tofuPerBoard: 169,
  tofuPerPack: 10,
  pricePerPack: 6000,
} as const

export const WORKBOOK_EXPECTED_TOTALS = {
  bahanBaku: 545000,
  bahanTambahanRounded: 329,
  operasionalProduksiRounded: 145294,
  pemasaranDistribusi: 20000,
  lainLainRounded: 822,
  biayaProduksiRounded: 690623,
  totalPengeluaranRounded: 711445,
  totalPacksPerDay: 169,
  hppPerPackRounded: 4087,
  marginPerPackRounded: 1913,
} as const
