import { test, expect } from '@playwright/test'
import { testData } from './fixtures/test-data'

test.describe('URL Encoder/Decoder', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/url')
    await page.waitForLoadState('networkidle')
  })

  test('should encode simple text', async ({ page }) => {
    const textarea = page.locator('textarea').first()
    await textarea.fill(testData.url.valid.simple)
    
    // Click Encode button (first action button in the pair)
    const buttons = page.locator('button:has-text("Encode")')
    await buttons.first().click()

    // Wait for output section
    await page.waitForSelector('.tool-output', { timeout: 10000 })
    const outputs = page.locator('.tool-output')
    expect(await outputs.count()).toBeGreaterThan(0)
  })

  test('should decode encoded text', async ({ page }) => {
    const textarea = page.locator('textarea').first()
    await textarea.fill(testData.url.valid.encoded)
    
    // Click Decode button
    const buttons = page.locator('button:has-text("Decode")')
    await buttons.first().click()

    // Wait a moment for the decode to update the input field (decoded text goes back into input)
    await page.waitForTimeout(500)
    
    // Check that the textarea now contains decoded text
    const newInput = await textarea.inputValue()
    expect(newInput).toContain('hello')
  })

  test('should handle unicode', async ({ page }) => {
    const textarea = page.locator('textarea').first()
    await textarea.fill(testData.url.valid.unicode)
    
    const buttons = page.locator('button:has-text("Encode")')
    await buttons.first().click()

    await page.waitForSelector('.tool-output', { timeout: 10000 })
    const outputs = page.locator('.tool-output')
    expect(await outputs.count()).toBeGreaterThan(0)
  })
})
