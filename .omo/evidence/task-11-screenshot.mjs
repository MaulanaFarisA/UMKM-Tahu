// Standalone screenshot script for task 11 — expense form & receipt preview polish
// Captures desktop preview-with-data and mobile invalid (validation) state.
import { chromium } from 'playwright'

const BASE = 'http://localhost:3000'
const EVIDENCE = '.omo/evidence'
const EMAIL = `task11-${Date.now()}@umkm-test.local`
const PASSWORD = 'task11-screenshot-pwd-2026'

async function register(page) {
  await page.goto(`${BASE}/register`, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.waitForSelector('input[name="email"]', { timeout: 90000, state: 'visible' })
  await page.fill('input[name="email"]', EMAIL)
  await page.fill('input[name="password"]', PASSWORD)
  await Promise.all([
    page.waitForURL(/\/beranda/, { timeout: 90000 }),
    page.click('button[type="submit"]'),
  ])
}

async function login(page) {
  await page.goto(`${BASE}/login`, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.waitForSelector('input[name="email"]', { timeout: 90000, state: 'visible' })
  await page.fill('input[name="email"]', EMAIL)
  await page.fill('input[name="password"]', PASSWORD)
  await Promise.all([
    page.waitForURL(/\/beranda/, { timeout: 90000 }),
    page.click('button[type="submit"]'),
  ])
}

async function shootPreview() {
  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  await register(page)
  await page.goto(`${BASE}/catat/pengeluaran`, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
  await page.waitForSelector('input[name="item_name"]', { timeout: 30000 })

  // Fill the form per task QA scenario
  await page.fill('input[name="item_name"]', 'Kedelai 25kg')
  await page.fill('input[name="quantity"]', '1')
  await page.fill('input[name="unit_price"]', '350000')
  // Trigger blur/input events
  await page.locator('input[name="unit_price"]').blur()
  await page.waitForTimeout(800)

  const previewText = await page.locator('aside').innerText().catch(() => '')
  const hasName = previewText.includes('Kedelai 25kg')
  const hasRupiah = /Rp\s?350\.?000/.test(previewText)
  console.log(`  preview contains name: ${hasName}`)
  console.log(`  preview contains formatted Rp 350.000: ${hasRupiah}`)
  if (!hasName || !hasRupiah) {
    console.error('PREVIEW ASSERTION FAILED')
    console.error('preview text:', previewText)
  }

  await page.screenshot({ path: `${EVIDENCE}/task-11-expense-preview.png`, fullPage: true })
  await browser.close()
  console.log(`saved ${EVIDENCE}/task-11-expense-preview.png`)
  return hasName && hasRupiah
}

async function shootInvalidMobile() {
  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  await login(page)
  await page.goto(`${BASE}/catat/pengeluaran`, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
  await page.waitForSelector('input[name="item_name"]', { timeout: 30000 })

  // Clear name and price to make form invalid (required), then submit
  await page.fill('input[name="item_name"]', '')
  await page.fill('input[name="unit_price"]', '')
  // Click the mobile submit button (visible at this width)
  await page.locator('button[type="submit"]').first().click().catch(() => {})
  await page.waitForTimeout(800)

  // Inspect first invalid input
  const invalidInfo = await page.evaluate(() => {
    const form = document.querySelector('form')
    if (!form) return null
    const invalid = Array.from(form.querySelectorAll('input,select,textarea'))
      .find((el) => 'validity' in el && !el.validity.valid)
    if (!invalid) return null
    const r = invalid.getBoundingClientRect()
    return {
      name: invalid.name,
      message: invalid.validationMessage,
      visible: r.width > 0 && r.height > 0 && r.top >= 0 && r.bottom <= window.innerHeight,
      rect: { top: r.top, bottom: r.bottom, height: r.height, width: r.width },
      vw: window.innerWidth,
      vh: window.innerHeight,
    }
  })
  console.log('  invalid info:', JSON.stringify(invalidInfo))

  // Check no horizontal overflow
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }))
  console.log(`  overflow scrollWidth=${overflow.scrollWidth} clientWidth=${overflow.clientWidth} ok=${overflow.scrollWidth <= overflow.clientWidth}`)

  await page.screenshot({ path: `${EVIDENCE}/task-11-expense-invalid-mobile.png`, fullPage: true })
  await browser.close()
  console.log(`saved ${EVIDENCE}/task-11-expense-invalid-mobile.png`)
  return overflow.scrollWidth <= overflow.clientWidth && invalidInfo !== null
}

async function main() {
  console.log(`registering ${EMAIL} → desktop preview...`)
  const previewOk = await shootPreview()
  console.log('login same user → mobile invalid...')
  const invalidOk = await shootInvalidMobile()
  if (!previewOk) {
    console.error('PREVIEW FAILED')
    process.exit(2)
  }
  if (!invalidOk) {
    console.error('INVALID-STATE FAILED')
    process.exit(3)
  }
  console.log('done')
}

main().catch((e) => {
  console.error('FAIL:', e.message)
  process.exit(1)
})
