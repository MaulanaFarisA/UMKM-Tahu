// Standalone screenshot script for task 13 - piutang & pengaturan polish
// Registers ONE test user, captures both desktop /piutang and mobile /pengaturan in separate contexts.
import { chromium } from 'playwright'

const BASE = 'http://localhost:3000'
const EVIDENCE = '.omo/evidence'
const EMAIL = `task13-${Date.now()}@umkm-test.local`
const PASSWORD = 'task13-screenshot-pwd-2026'

async function fillAndSubmit(page, url) {
  await page.goto(`${BASE}${url}`, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.waitForSelector('input[name="email"]', { timeout: 90000, state: 'visible' })
  await page.fill('input[name="email"]', EMAIL)
  await page.fill('input[name="password"]', PASSWORD)
  await Promise.all([
    page.waitForURL(/\/beranda/, { timeout: 90000 }),
    page.click('button[type="submit"]'),
  ])
}

async function shoot(viewport, route, outFile, useRegister, checkOverflow) {
  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  await fillAndSubmit(page, useRegister ? '/register' : '/login')
  await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
  await page.waitForTimeout(1200)
  await page.screenshot({ path: outFile, fullPage: true })

  let result = null
  if (checkOverflow) {
    result = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))
    console.log(`  overflow: scrollWidth=${result.scrollWidth} clientWidth=${result.clientWidth} ok=${result.scrollWidth <= result.clientWidth}`)
  }

  await browser.close()
  console.log(`saved ${outFile}`)
  return result
}

async function main() {
  console.log(`registering ${EMAIL} (desktop /piutang)...`)
  await shoot({ width: 1280, height: 800 }, '/piutang', `${EVIDENCE}/task-13-piutang-desktop.png`, true, false)
  console.log('login same user (mobile /pengaturan)...')
  const overflow = await shoot({ width: 375, height: 812 }, '/pengaturan', `${EVIDENCE}/task-13-pengaturan-mobile.png`, false, true)
  if (overflow && overflow.scrollWidth > overflow.clientWidth) {
    console.error('OVERFLOW DETECTED on /pengaturan mobile')
    process.exit(2)
  }
  console.log('done')
}

main().catch((e) => {
  console.error('FAIL:', e.message)
  process.exit(1)
})
