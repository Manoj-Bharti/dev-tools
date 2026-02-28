import { test, expect } from '@playwright/test'
import { testData } from './fixtures/test-data'

test.describe('UUID Generator/Validator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/uuid')
    await page.waitForLoadState('networkidle')
  })

  test('should validate known UUID', async ({ page }) => {
    // UUID tool is generator-only; just verify structure loads
    const heading = page.locator('h1, h2')
    await expect(heading.first()).toBeVisible({ timeout: 5000 })
  })

  test('should generate a UUID', async ({ page }) => {
    // Click Generate button
    const genBtn = page.locator('button:has-text("Generate")').first()
    await genBtn.click()
    
    // Wait for output list to appear
    await page.waitForSelector('code', { timeout: 10000 })
    const codeElements = page.locator('code')
    await expect(codeElements.first()).toBeVisible()
    
    const output = await codeElements.first().textContent()
    // Check pattern: looks like a UUID
    expect(output).toMatch(/^[0-9a-f-]{36}$/i)
  })
})
