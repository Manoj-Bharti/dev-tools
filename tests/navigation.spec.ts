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

  test('header search button should be visible and clickable', async ({ page }) => {
    await page.goto('/')
    // Search is triggered via header button; ensure it exists
    await expect(page.locator('button:has-text("Search")')).toBeVisible()
    await page.click('button:has-text("Search")')
    // No search modal implemented; at minimum ensure button is interactive
    await expect(page.locator('button:has-text("Search")')).toBeEnabled()
  })

  test('should navigate via tool card link', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="/tools/base64"]')
    await expect(page).toHaveURL('/tools/base64')
  })
})
