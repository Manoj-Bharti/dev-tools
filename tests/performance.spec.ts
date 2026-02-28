import { test, expect } from '@playwright/test'

test.describe('Performance', () => {
  test('should load homepage quickly', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    const loadTime = Date.now() - startTime
    
    expect(loadTime).toBeLessThan(3000)
  })

  test('should handle large input efficiently', async ({ page }) => {
    await page.goto('/tools/base64')
    await page.waitForLoadState('networkidle')
    
    const largeInput = 'a'.repeat(100000)
    
    const startTime = Date.now()
    const textarea = page.locator('textarea[placeholder*="encode or decode"]')
    await textarea.fill(largeInput)
    
    // Click Encode button (should be the action button, not toggle)
    await page.click('button:has-text("Encode")' + ':not(:first-child)')
    
    // Wait for output to appear
    await page.waitForSelector('.tool-output', { timeout: 15000 })
    const processTime = Date.now() - startTime
    
    // Should process in reasonable time
    expect(processTime).toBeLessThan(15000)
  })

  test('should not freeze UI during processing', async ({ page }) => {
    await page.goto('/tools/hash')
    await page.waitForLoadState('networkidle')
    
    // Fill input
    const textarea = page.locator('textarea[placeholder*="Enter text to hash"]')
    await textarea.fill('test'.repeat(10000))
    
    // Click Generate button
    await page.click('button:has-text("Generate Hashes")')
    
    // UI should still be responsive - buttons should be enabled
    const clearButton = page.locator('button[aria-label="Clear input"]')
    await expect(clearButton).toBeEnabled({ timeout: 5000 })
  })
})
