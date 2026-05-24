/**
 * Pure financial calculation functions for UMKM Tahu.
 * No React, no Supabase. All functions are testable in isolation.
 * All Excel-derived numbers are passed as parameters, never hardcoded.
 */

// ─── Safe Math ───────────────────────────────────────────────────────────────

export function safeDivide(a: number, b: number): number {
  if (b === 0) return 0
  return a / b
}

// ─── Production ──────────────────────────────────────────────────────────────

export interface ProductionInput {
  boards: number
  tofuPerBoard: number
  tofuPerPack: number
}

export interface ProductionResult {
  totalTofu: number
  totalPacks: number
}

export function calculateProduction(input: ProductionInput): ProductionResult {
  const totalTofu = input.boards * input.tofuPerBoard
  const totalPacks = Math.floor(safeDivide(totalTofu, input.tofuPerPack))
  return { totalTofu, totalPacks }
}

// ─── Cost Allocation ─────────────────────────────────────────────────────────

/**
 * Allocates a weekly cost to a daily cost.
 * Used for wood fuel and electricity which are billed weekly.
 */
export function allocateDailyCostFromWeekly(
  weeklyCost: number,
  daysPerWeek: number = 7
): number {
  return safeDivide(weeklyCost, daysPerWeek)
}

// ─── HPP ─────────────────────────────────────────────────────────────────────

export interface HppInput {
  totalProductionCost: number
  totalPacks: number
  totalTofu: number
}

export interface HppResult {
  hppPerPack: number
  hppPerTofu: number
}

export function calculateHpp(input: HppInput): HppResult {
  return {
    hppPerPack: Math.round(safeDivide(input.totalProductionCost, input.totalPacks)),
    hppPerTofu: Math.round(safeDivide(input.totalProductionCost, input.totalTofu)),
  }
}

// ─── Sales ───────────────────────────────────────────────────────────────────

export function calculateSalesTotal(packs: number, pricePerPack: number): number {
  return packs * pricePerPack
}

// ─── Receivables ─────────────────────────────────────────────────────────────

export function calculateReceivableAmount(
  totalSales: number,
  amountPaid: number
): number {
  const receivable = totalSales - amountPaid
  return Math.max(0, receivable)
}

export function calculateRemainingReceivable(
  initialReceivable: number,
  payments: number[]
): number {
  const totalPaid = payments.reduce((sum, p) => sum + p, 0)
  return Math.max(0, initialReceivable - totalPaid)
}

export type ReceivableStatus = 'LUNAS' | 'BELUM_LUNAS'

export function getReceivableStatus(remaining: number): ReceivableStatus {
  return remaining <= 0 ? 'LUNAS' : 'BELUM_LUNAS'
}

// ─── Profit ──────────────────────────────────────────────────────────────────

export interface ProfitInput {
  totalSales: number
  totalProductionCost: number
  distributionCost: number
  otherCost: number
}

export interface ProfitResult {
  grossProfit: number
  netProfit: number
  netMarginPercent: number
}

export function calculateProfitSummary(input: ProfitInput): ProfitResult {
  const grossProfit = input.totalSales - input.totalProductionCost
  const netProfit = grossProfit - input.distributionCost - input.otherCost
  const netMarginPercent = Math.round(
    safeDivide(netProfit, input.totalSales) * 100
  )
  return { grossProfit, netProfit, netMarginPercent }
}
