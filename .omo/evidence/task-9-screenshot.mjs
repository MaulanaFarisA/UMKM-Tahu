// Standalone screenshot script for task 9 - beranda dashboard
// Uses the app's own /register form to create a test user, then captures screenshots.
import { chromium } from 'playwright'

const BASE = 'http://localhost:3010'
const EVIDENCE = '.omo/evidence'
const EMAIL = `task9-${Date.now()}@umkm-test.local`
const PASSWORD = 'task9-screenshot-pwd-2026'

async function register(page) {
  await page.goto(`${BASE}/register`, { waitUntil: 'domcontentloaded' })
  await page.fill('input[name="email"]', EMAIL)
  await page.fill('input[name="password"]', PASSWORD)
  await Promise.all([
    page.waitForURL(/\/beranda/, { timeout: 60000 }),
    page.click('button[type="submit"]'),
  ])
}

async function login(page) {
  await page.goto(`${BASE}/login`, { waitUntil: 'domcontentloaded' })
  await page.fill('input[name="email"]', EMAIL)
  await page.fill('input[name="password"]', PASSWORD)
  await Promise.all([
    page.waitForURL(/\/beranda/, { timeout: 60000 }),
    page.click('button[type="submit"]'),
  ])
}

async function shoot(viewport, outFile, useRegister) {
  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  if (useRegister) await register(page)
  else await login(page)
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
  await page.waitForTimeout(900)
  await page.screenshot({ path: outFile, fullPage: true })
  await browser.close()
  console.log(`saved ${outFile}`)
}

async function main() {
  console.log(`registering ${EMAIL}...`)
  await shoot({ width: 1280, height: 800 }, `${EVIDENCE}/task-9-beranda-desktop.png`, true)
  console.log('mobile (logging in fresh context)...')
  await shoot({ width: 375, height: 812 }, `${EVIDENCE}/task-9-beranda-mobile.png`, false)
  console.log('done')
}

main().catch((e) => {
  console.error('FAIL:', e.message)
  process.exit(1)
})
