import { test, expect } from '@playwright/test'
import { TOOLS } from '../src/lib/constants'

test.describe('Navigation', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/')
    // assert site title is present
    await expect(page).toHaveTitle(/DevToolkit/)
  })

  test('should navigate to all tools from homepage', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    for (const tool of TOOLS) {
      // Click sidebar link
      const link = page.locator(`a[href="${tool.path}"]`).first()
      await link.click()
      await page.waitForURL(tool.path, { timeout: 10000 })
      
      // Wait for tool page to load (any h1, h2, or heading)
      await page.waitForSelector('h1, h2, [role="heading"]', { timeout: 5000 })
      
      const url = page.url()
      expect(url).toContain(tool.path)
      
      // Go back to homepage
      await page.goto('/')
      await page.waitForLoadState('networkidle')
    }
  })

  test('should navigate via tool card link', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="/tools/base64"]')
    await expect(page).toHaveURL('/tools/base64')
  })

  test('footer links to legal and info pages', async ({ page }) => {
    await page.goto('/')
    const links = [
      '/privacy',
      '/terms',
      '/about',
      '/contact',
    ]
    for (const path of links) {
      await page.click(`footer a[href="${path}"]`)
      await page.waitForURL(path)
      await expect(page).toHaveURL(path)
      await page.goto('/')
    }
  })

  test('table of contents anchors work on privacy and terms pages', async ({ page }) => {
    const pages = ['/privacy', '/terms']
    for (const p of pages) {
      await page.goto(p)
      // click first anchor in the toc
      const firstAnchor = await page.locator('.toc a').first()
      const href = await firstAnchor.getAttribute('href')
      if (href) {
        await firstAnchor.click()
        // ensure URL contains hash
        await expect(page).toHaveURL(new RegExp(`${p}#`))
      }
    }
  })
})
