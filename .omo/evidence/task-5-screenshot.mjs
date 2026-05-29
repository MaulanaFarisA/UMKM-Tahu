import { chromium } from 'playwright'

const url = 'http://127.0.0.1:3000'
const outDir = '.omo/evidence'

async function shot(viewport, file) {
  const browser = await chromium.launch()
  const context = await browser.newContext({ viewport })
  const page = await context.newPage()
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForSelector('h1', { timeout: 10000 })

  const data = await page.evaluate(() => {
    const h1 = document.querySelector('h1')
    const regs = Array.from(document.querySelectorAll('a[href="/register"]'))
    const heroSec = h1?.closest('section')
    const heroReg = heroSec?.querySelector('a[href="/register"]')
    const heroRect = heroReg?.getBoundingClientRect()
    return {
      viewport: { w: window.innerWidth, h: window.innerHeight },
      h1: h1?.textContent?.trim(),
      heroPrimaryText: heroReg?.textContent?.trim(),
      heroPrimaryBottom: heroRect?.bottom,
      heroPrimaryInFold: heroRect ? heroRect.bottom <= window.innerHeight : false,
      registerLinkCount: regs.length,
      docScrollWidth: document.documentElement.scrollWidth,
      docClientWidth: document.documentElement.clientWidth,
      overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    }
  })

  await page.screenshot({ path: `${outDir}/${file}`, fullPage: false })
  console.log(JSON.stringify({ file, ...data }, null, 2))
  await browser.close()
}

await shot({ width: 1280, height: 800 }, 'task-5-landing-desktop.png')
await shot({ width: 375, height: 812 }, 'task-5-landing-mobile.png')
