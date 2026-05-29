import { describe, expect, it } from 'vitest'
import { SEED_DEFAULTS, SEED_EXPENSE_DEFAULTS } from './seed-defaults'
import { WORKBOOK_EXPENSE_LINES, WORKBOOK_PRODUCTION_FACTS } from './workbook-facts'

describe('seed defaults from newest workbook', () => {
  it('uses workbook production facts as editable starting values', () => {
    expect(SEED_DEFAULTS.businessName).toBe(WORKBOOK_PRODUCTION_FACTS.businessName)
    expect(SEED_DEFAULTS.productName).toBe(WORKBOOK_PRODUCTION_FACTS.productName)
    expect(SEED_DEFAULTS.tofuPerBoard).toBe(WORKBOOK_PRODUCTION_FACTS.tofuPerBoard)
    expect(SEED_DEFAULTS.tofuPerPack).toBe(WORKBOOK_PRODUCTION_FACTS.tofuPerPack)
    expect(SEED_DEFAULTS.defaultBoardsPerDay).toBe(WORKBOOK_PRODUCTION_FACTS.boardsPerDay)
    expect(SEED_DEFAULTS.defaultPricePerPack).toBe(WORKBOOK_PRODUCTION_FACTS.pricePerPack)
  })

  it('uses workbook expense values for initial expense guidance', () => {
    const findLine = (itemName: string) =>
      WORKBOOK_EXPENSE_LINES.find((line) => line.itemName === itemName)

    expect(SEED_EXPENSE_DEFAULTS.kedelaiPricePerKg).toBe(findLine('Kedelai')?.unitPrice)
    expect(SEED_EXPENSE_DEFAULTS.kedelaiKgPerDay).toBe(findLine('Kedelai')?.quantity)
    expect(SEED_EXPENSE_DEFAULTS.kayuBakarPerWeek).toBe(findLine('Kayu bakar')?.unitPrice)
    expect(SEED_EXPENSE_DEFAULTS.listrikPerMonth).toBe(findLine('Listrik')?.unitPrice)
    expect(SEED_EXPENSE_DEFAULTS.bensinPerDay).toBe(findLine('Bensin distribusi')?.unitPrice)
    expect(SEED_EXPENSE_DEFAULTS.plastikPerDay).toBe(findLine('Plastik kemasan')?.unitPrice)
  })
})
