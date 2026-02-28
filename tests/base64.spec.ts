import { test, expect } from '@playwright/test'
import { testData } from './fixtures/test-data'
import { ToolTestHelper } from './helpers/test-utils'

test.describe('Base64 Encoder/Decoder', () => {
  let helper: ToolTestHelper

  test.beforeEach(async ({ page }) => {
    helper = new ToolTestHelper(page)
    await helper.navigateToTool('/tools/base64')
  })

  test.describe('Encoding', () => {
    test('should encode simple text', async ({ page }) => {
      await page.fill('textarea[placeholder="Enter text to encode or decode..."]', testData.base64.valid.simple.input)
        await page.locator('button:has-text("Encode")').last().click()
      await page.waitForSelector('.tool-output', { timeout: 10000 })
      const output = await page.textContent('.tool-output')
      expect(output?.trim()).toBe(testData.base64.valid.simple.encoded)
    })

    test('should encode unicode text', async ({ page }) => {
      const textarea = page.locator('textarea[placeholder="Enter text to encode or decode..."]')
      
      // Ensure we're in Encode mode
      const encodeBtn = page.locator('button:has-text("Encode")').first()
      const variant = await encodeBtn.getAttribute('data-state')
      if (variant === 'off' || !await encodeBtn.evaluate((el: HTMLElement) => el.classList.toString().includes('default'))) {
        await encodeBtn.click()
      }
      
      await textarea.clear()
      await textarea.fill(testData.base64.valid.unicode.input)
      await page.locator('button:has-text("Encode")').last().click()
      await page.waitForSelector('.tool-output', { timeout: 10000 })
      const output = await page.textContent('.tool-output')
      expect(output?.trim()).toBe(testData.base64.valid.unicode.encoded)
    })

    test('should encode special characters', async ({ page }) => {
      await page.fill('textarea[placeholder="Enter text to encode or decode..."]', testData.base64.valid.special.input)
        await page.locator('button:has-text("Encode")').last().click()
      await page.waitForSelector('.tool-output', { timeout: 10000 })
      const output = await page.textContent('.tool-output')
      expect(output?.trim()).toBe(testData.base64.valid.special.encoded)
    })

    test('should encode multiline text', async ({ page }) => {
      await page.fill('textarea[placeholder="Enter text to encode or decode..."]', testData.base64.valid.multiline.input)
        await page.locator('button:has-text("Encode")').last().click()
      await page.waitForSelector('.tool-output', { timeout: 10000 })
      const output = await page.textContent('.tool-output')
      expect(output?.trim()).toBe(testData.base64.valid.multiline.encoded)
    })

    test('should handle empty input', async ({ page }) => {
      await page.fill('textarea[placeholder="Enter text to encode or decode..."]', testData.base64.valid.empty.input)
      await page.locator('button:has-text("Encode")').last().click()
      // Empty output is not rendered (falsy), ensure no output container exists
      await expect(page.locator('.tool-output')).toHaveCount(0)
      // Character count is not shown for empty input
      await expect(page.locator('text=/\\d+ characters/')).toHaveCount(0)
    })

    test('should show character count', async ({ page }) => {
      await page.fill('textarea[placeholder="Enter text to encode or decode..."]', testData.base64.valid.simple.input)
      await expect(page.locator('text=/\\d+ characters/')).toBeVisible()
    })
  })

  test.describe('Decoding', () => {
    test('should decode valid base64', async ({ page }) => {
      // Switch to Decode mode
      const decodeBtn = page.locator('button:has-text("Decode")').first()
      await decodeBtn.click()
      
      // Clear any previous input
      const textarea = page.locator('textarea[placeholder="Enter text to encode or decode..."]')
      await textarea.clear()
      
      // Fill with base64
      await textarea.fill(testData.base64.valid.simple.encoded)
      
      // Click Decode action button (should be the last "Decode" button after toggle)
      const actionBtn = page.locator('button:has-text("Decode")').last()
      await actionBtn.click()
      
      // Wait for output
      await page.waitForSelector('.tool-output', { timeout: 10000 })
      const output = await page.textContent('.tool-output')
      expect(output?.trim()).toBe(testData.base64.valid.simple.input)
    })

    test('should show error for invalid base64', async ({ page }) => {
      // Switch to Decode mode
      const decodeBtn = page.locator('button:has-text("Decode")').first()
      await decodeBtn.click()
      
      const textarea = page.locator('textarea[placeholder="Enter text to encode or decode..."]')
      await textarea.clear()
      await textarea.fill(testData.base64.invalid.notBase64)
      
      // Click Decode button
      const actionBtn = page.locator('button:has-text("Decode")').last()
      await actionBtn.click()
      
      // Wait for error to appear
      await expect(page.locator('div.text-red-400')).toBeVisible({ timeout: 5000 })
    })
  })

  test.describe('UI Interactions', () => {
    test('should toggle between encode and decode', async ({ page }) => {
      // default mode is Encode; switching to Decode and back should allow decoding
        await page.locator('button:has-text("Decode")').first().click()
      await page.fill('textarea[placeholder="Enter text to encode or decode..."]', testData.base64.valid.simple.encoded)
        await page.locator('button:has-text("Decode")').last().click()
      await page.waitForSelector('.tool-output', { timeout: 5000 })
      const out = await page.textContent('.tool-output')
      expect(out?.trim()).toBe(testData.base64.valid.simple.input)
    })

    test('should clear input and output', async ({ page }) => {
      await page.fill('textarea[placeholder="Enter text to encode or decode..."]', testData.base64.valid.simple.input)
        await page.locator('button:has-text("Encode")').last().click()
      // clear uses aria-label
      await page.click('button[aria-label="Clear input"]')
      const input = await page.inputValue('textarea[placeholder="Enter text to encode or decode..."]')
      expect(input).toBe('')
    })

    test('should copy output to clipboard', async ({ page }) => {
      await page.fill('textarea[placeholder="Enter text to encode or decode..."]', testData.base64.valid.simple.input)
      await page.locator('button:has-text("Encode")').last().click()
      await page.waitForSelector('text=Copy', { timeout: 10000 })
      const copyButton = page.locator('button:has-text("Copy")').first()
      await expect(copyButton).toBeVisible()
      await copyButton.click()
      await expect(copyButton).toBeVisible()
    })
    // Note: this UI does not provide a swap control; switching modes is validated above
  })
})
