// Standalone screenshot script for task 10 - catat menu + sales form preview
// Uses the app's own /register form to create a test user, then captures screenshots.
import { chromium } from 'playwright'

const BASE = process.env.BASE_URL || 'http://localhost:3001'
const EVIDENCE = '.omo/evidence'
const EMAIL = `task10-${Date.now()}@umkm-test.local`
const PASSWORD = 'task10-screenshot-pwd-2026'

async function register(page) {
  await page.goto(`${BASE}/register`, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.locator('input[name="email"]').waitFor({ state: 'visible', timeout: 90000 })
  await page.fill('input[name="email"]', EMAIL)
  await page.fill('input[name="password"]', PASSWORD)
  await page.click('button[type="submit"]')
  // Server action redirects to /beranda; poll URL with generous deadline
  const deadline = Date.now() + 180000
  while (Date.now() < deadline) {
    if (/\/beranda/.test(page.url())) return
    await page.waitForTimeout(500)
  }
  throw new Error(`register did not reach /beranda; current url=${page.url()}`)
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  })
  const page = await ctx.newPage()

  console.log(`registering ${EMAIL}...`)
  await register(page)

  // ============================================================
  // Scenario 1: /catat menu — assert action choice is obvious
  // ============================================================
  console.log('navigating to /catat...')
  await page.goto(`${BASE}/catat`, { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
  await page.waitForTimeout(700)

  const penjualanLink = await page.locator('a[href="/catat/penjualan"]').first()
  const pengeluaranLink = await page.locator('a[href="/catat/pengeluaran"]').first()
  const penjualanVisible = await penjualanLink.isVisible()
  const pengeluaranVisible = await pengeluaranLink.isVisible()
  if (!penjualanVisible || !pengeluaranVisible) {
    throw new Error(
      `Catat menu links missing: penjualan=${penjualanVisible} pengeluaran=${pengeluaranVisible}`
    )
  }
  console.log('  ✓ both action links visible')

  await page.screenshot({
    path: `${EVIDENCE}/task-10-catat-menu.png`,
    fullPage: true,
  })
  console.log(`  ✓ saved ${EVIDENCE}/task-10-catat-menu.png`)

  // ============================================================
  // Scenario 2: /catat/penjualan — preview updates from form input
  // ============================================================
  console.log('navigating to /catat/penjualan...')
  await page.goto(`${BASE}/catat/penjualan`, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.locator('input[name="packs"]').waitFor({ state: 'visible', timeout: 90000 })
  await page.locator('input[name="customer_name"]').waitFor({ state: 'visible', timeout: 90000 })
  await page.waitForTimeout(700)

  // Fill the form via direct value-set + native input dispatch so the live
  // preview's addEventListener('input') handlers fire reliably.
  const debug = await page.evaluate(() => {
    const set = (selector, value) => {
      const el = document.querySelector(selector)
      if (!el) throw new Error(`missing ${selector}`)
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
      setter.call(el, value)
      el.dispatchEvent(new Event('input', { bubbles: true }))
      el.dispatchEvent(new Event('change', { bubbles: true }))
    }
    set('input[name="customer_name"]', 'Warung Bu Sari')
    set('input[name="packs"]', '20')
    set('input[name="price_per_pack"]', '15000')
    return {
      customer: document.querySelector('input[name="customer_name"]')?.value,
      packs: document.querySelector('input[name="packs"]')?.value,
      price: document.querySelector('input[name="price_per_pack"]')?.value,
    }
  })
  console.log('  field values after set:', JSON.stringify(debug))
  await page.waitForTimeout(1500)

  // DEBUG: enumerate all forms and check listener attachment
  const formInfo = await page.evaluate(() => {
    const forms = Array.from(document.querySelectorAll('form'))
    return forms.map((f, i) => ({
      idx: i,
      action: f.action,
      hasPacks: !!f.querySelector('[name="packs"]'),
      hasCustomer: !!f.querySelector('[name="customer_name"]'),
      classes: f.className,
    }))
  })
  console.log('  forms on page:', JSON.stringify(formInfo, null, 2))

  // DEBUG: dump aside HTML to confirm what the React preview renders
  const asideHtml = await page.evaluate(() => {
    const aside = document.querySelector('aside')
    return aside ? aside.innerText : '(no aside)'
  })
  console.log('  aside text after fill:\n----\n' + asideHtml + '\n----')

  // Find the preview container — it's an aside that contains "Pratinjau"
  const previewBody = await page.locator('aside').first().innerText()
  if (!previewBody.includes('Warung Bu Sari')) {
    throw new Error(
      `Preview missing customer name. Preview text:\n${previewBody}`
    )
  }
  // 20 × 15000 = 300.000
  if (
    !previewBody.includes('300.000') &&
    !previewBody.includes('Rp\u00a0300.000') &&
    !previewBody.includes('Rp 300.000')
  ) {
    throw new Error(
      `Preview missing total Rp 300.000. Preview text:\n${previewBody}`
    )
  }
  console.log('  ✓ preview shows Warung Bu Sari and Rp 300.000')

  await page.screenshot({
    path: `${EVIDENCE}/task-10-sales-preview.png`,
    fullPage: true,
  })
  console.log(`  ✓ saved ${EVIDENCE}/task-10-sales-preview.png`)

  await browser.close()
  console.log('done')
}

main().catch((e) => {
  console.error('FAIL:', e.message)
  process.exit(1)
})
