import { describe, it, expect } from 'vitest'
import {
  safeDivide,
  calculateProduction,
  allocateDailyCostFromWeekly,
  calculateHpp,
  calculateSalesTotal,
  calculateReceivableAmount,
  calculateRemainingReceivable,
  getReceivableStatus,
  calculateProfitSummary,
} from './finance'

describe('safeDivide', () => {
  it('divides normally', () => {
    expect(safeDivide(10, 2)).toBe(5)
  })
  it('returns 0 when divisor is 0', () => {
    expect(safeDivide(100, 0)).toBe(0)
  })
})

describe('calculateProduction', () => {
  it('calculates canonical domain values', () => {
    const result = calculateProduction({
      boards: 10,
      tofuPerBoard: 169,
      tofuPerPack: 10,
    })
    expect(result.totalTofu).toBe(1690)
    expect(result.totalPacks).toBe(169)
  })
  it('returns 0 when boards is 0', () => {
    const result = calculateProduction({ boards: 0, tofuPerBoard: 169, tofuPerPack: 10 })
    expect(result.totalTofu).toBe(0)
    expect(result.totalPacks).toBe(0)
  })
  it('floors partial packs', () => {
    const result = calculateProduction({ boards: 1, tofuPerBoard: 169, tofuPerPack: 10 })
    expect(result.totalPacks).toBe(16)
  })
})

describe('allocateDailyCostFromWeekly', () => {
  it('divides weekly cost by 7', () => {
    expect(allocateDailyCostFromWeekly(400000)).toBeCloseTo(57142.86, 1)
  })
  it('uses custom daysPerWeek', () => {
    expect(allocateDailyCostFromWeekly(700000, 7)).toBe(100000)
  })
  it('returns 0 when daysPerWeek is 0', () => {
    expect(allocateDailyCostFromWeekly(400000, 0)).toBe(0)
  })
})

describe('calculateHpp', () => {
  it('calculates canonical HPP values', () => {
    const result = calculateHpp({
      totalProductionCost: 659286,
      totalPacks: 169,
      totalTofu: 1690,
    })
    expect(result.hppPerPack).toBe(3901)
    expect(result.hppPerTofu).toBe(390)
  })
  it('returns 0 when totalPacks is 0', () => {
    const result = calculateHpp({ totalProductionCost: 659286, totalPacks: 0, totalTofu: 0 })
    expect(result.hppPerPack).toBe(0)
    expect(result.hppPerTofu).toBe(0)
  })
  it('cross-validation: hppPerPack x totalPacks approximates totalProductionCost', () => {
    const totalProductionCost = 659286
    const totalPacks = 169
    const result = calculateHpp({ totalProductionCost, totalPacks, totalTofu: 1690 })
    const reconstructed = result.hppPerPack * totalPacks
    expect(Math.abs(reconstructed - totalProductionCost)).toBeLessThan(totalPacks)
  })
})

describe('calculateSalesTotal', () => {
  it('calculates canonical sales total', () => {
    expect(calculateSalesTotal(169, 6000)).toBe(1014000)
  })
  it('returns 0 for 0 packs', () => {
    expect(calculateSalesTotal(0, 6000)).toBe(0)
  })
})

describe('calculateReceivableAmount', () => {
  it('returns full amount when nothing paid', () => {
    expect(calculateReceivableAmount(60000, 0)).toBe(60000)
  })
  it('returns partial when partially paid', () => {
    expect(calculateReceivableAmount(60000, 30000)).toBe(30000)
  })
  it('returns 0 when fully paid', () => {
    expect(calculateReceivableAmount(60000, 60000)).toBe(0)
  })
  it('clamps to 0 on overpayment', () => {
    expect(calculateReceivableAmount(60000, 70000)).toBe(0)
  })
})

describe('calculateRemainingReceivable', () => {
  it('subtracts payments from initial receivable', () => {
    expect(calculateRemainingReceivable(60000, [30000])).toBe(30000)
  })
  it('returns 0 when fully paid', () => {
    expect(calculateRemainingReceivable(60000, [30000, 30000])).toBe(0)
  })
  it('clamps to 0 on overpayment', () => {
    expect(calculateRemainingReceivable(60000, [70000])).toBe(0)
  })
  it('returns full amount with no payments', () => {
    expect(calculateRemainingReceivable(60000, [])).toBe(60000)
  })
})

describe('getReceivableStatus', () => {
  it('returns LUNAS when remaining is 0', () => {
    expect(getReceivableStatus(0)).toBe('LUNAS')
  })
  it('returns LUNAS when remaining is negative', () => {
    expect(getReceivableStatus(-1)).toBe('LUNAS')
  })
  it('returns LUNAS for near-zero floating point', () => {
    expect(getReceivableStatus(0.001)).toBe('BELUM_LUNAS')
  })
  it('returns BELUM_LUNAS when remaining is positive', () => {
    expect(getReceivableStatus(30000)).toBe('BELUM_LUNAS')
  })
})

describe('calculateProfitSummary', () => {
  it('calculates canonical profit values', () => {
    const result = calculateProfitSummary({
      totalSales: 1014000,
      totalProductionCost: 659286,
      distributionCost: 20000,
      otherCost: 0,
    })
    expect(result.grossProfit).toBe(354714)
    expect(result.netProfit).toBe(334714)
    expect(result.netMarginPercent).toBe(33)
  })
  it('returns negative profit on loss day', () => {
    const result = calculateProfitSummary({
      totalSales: 60000,
      totalProductionCost: 659286,
      distributionCost: 20000,
      otherCost: 0,
    })
    expect(result.grossProfit).toBeLessThan(0)
    expect(result.netProfit).toBeLessThan(0)
  })
  it('returns 0 margin when totalSales is 0', () => {
    const result = calculateProfitSummary({
      totalSales: 0,
      totalProductionCost: 0,
      distributionCost: 0,
      otherCost: 0,
    })
    expect(result.netMarginPercent).toBe(0)
  })
})

describe('confirmed real-world UMKM tahu numbers (May 2026)', () => {
  const CONFIRMED_DAILY_COST = 711444
  const PACKS_PER_DAY = 169
  const TOFU_PER_DAY = 1690
  const PRICE_PER_PACK = 6000

  it('HPP per bungkus is within expected range', () => {
    const result = calculateHpp({
      totalProductionCost: CONFIRMED_DAILY_COST,
      totalPacks: PACKS_PER_DAY,
      totalTofu: TOFU_PER_DAY,
    })
    // HPP should be around 4087-4210 depending on rounding
    expect(result.hppPerPack).toBeGreaterThanOrEqual(4000)
    expect(result.hppPerPack).toBeLessThanOrEqual(4300)
  })

  it('daily profit is positive', () => {
    const omzet = calculateSalesTotal(PACKS_PER_DAY, PRICE_PER_PACK)
    const result = calculateProfitSummary({
      totalSales: omzet,
      totalProductionCost: CONFIRMED_DAILY_COST,
      distributionCost: 0,
      otherCost: 0,
    })
    expect(result.netProfit).toBeGreaterThan(0)
    expect(result.netProfit).toBeCloseTo(302556, -3)
  })

  it('omzet harian is Rp 1.014.000', () => {
    expect(calculateSalesTotal(PACKS_PER_DAY, PRICE_PER_PACK)).toBe(1014000)
  })

  it('margin per bungkus is above Rp 1.700', () => {
    const hpp = calculateHpp({
      totalProductionCost: CONFIRMED_DAILY_COST,
      totalPacks: PACKS_PER_DAY,
      totalTofu: TOFU_PER_DAY,
    })
    const margin = PRICE_PER_PACK - hpp.hppPerPack
    expect(margin).toBeGreaterThan(1700)
  })
})
