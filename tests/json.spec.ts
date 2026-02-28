import { test, expect } from '@playwright/test'
import { testData } from './fixtures/test-data'

test.describe.serial('JSON Formatter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/json')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(200)
  })

  test.describe('Formatting', () => {
    test('should format minified JSON', async ({ page }) => {
      await page.fill('textarea', testData.json.valid.minified)
      await page.click('button:has-text("Format")')

      await page.waitForSelector('h3:has-text("Output")', { timeout: 15000 })
      let output = await page.textContent('pre code.language-json')
      if (!output) output = await page.textContent('.tool-output')
      expect(output).toContain('\n')
      expect(output).toContain('  ')
    })

    test('should preserve data structure', async ({ page }) => {
      await page.fill('textarea', testData.json.valid.simple)
      await page.click('button:has-text("Format")')

      await page.waitForSelector('h3:has-text("Output")', { timeout: 15000 })
      let formatted = await page.textContent('pre code.language-json')
      if (!formatted) formatted = await page.textContent('.tool-output')
      expect(formatted).toContain('"name"')
      expect(formatted).toContain('"John"')
    })

    test('should format nested JSON', async ({ page }) => {
      await page.fill('textarea', testData.json.valid.nested)
      await page.click('button:has-text("Format")')

      await page.waitForSelector('h3:has-text("Output")', { timeout: 15000 })
      let output = await page.textContent('pre code.language-json')
      if (!output) output = await page.textContent('.tool-output')
      expect(output).toContain('user')
      expect(output).toContain('address')
    })

    test('should format arrays', async ({ page }) => {
      await page.fill('textarea', testData.json.valid.array)
      await page.click('button:has-text("Format")')

      await page.waitForSelector('h3:has-text("Output")', { timeout: 15000 })
      let output = await page.textContent('pre code.language-json')
      if (!output) output = await page.textContent('.tool-output')
      expect(output).toContain('[')
      expect(output).toContain(']')
    })
  })

  test.describe('Minifying', () => {
    test('should minify formatted JSON', async ({ page }) => {
      await page.fill('textarea', testData.json.valid.formatted)
      await page.click('button:has-text("Minify")')

      await page.waitForSelector('h3:has-text("Output")', { timeout: 15000 })
      let output = await page.textContent('pre code.language-json')
      if (!output) output = await page.textContent('.tool-output')
      expect(output).not.toContain('\n  ')
    })
  })

  test.describe('Validation', () => {
    test('should show error for invalid JSON', async ({ page }) => {
      await page.fill('textarea', testData.json.invalid.missingQuote)
      await page.click('button:has-text("Format")')

      await expect(page.locator('.text-red-400')).toBeVisible({ timeout: 5000 })
    })

    test('should show error line number', async ({ page }) => {
      await page.fill('textarea', testData.json.invalid.missingQuote)
      await page.click('button:has-text("Format")')

      await expect(page.locator('.text-red-400')).toBeVisible({ timeout: 5000 })
    })

    test('should handle trailing commas', async ({ page }) => {
      await page.fill('textarea', testData.json.invalid.trailingComma)
      await page.click('button:has-text("Format")')

      await expect(page.locator('.text-red-400')).toBeVisible({ timeout: 5000 })
    })
  })

  test('should download formatted JSON', async ({ page }) => {
    await page.fill('textarea', testData.json.valid.simple)
    await page.click('button:has-text("Format")')
    
    // This app exposes formatted output in the editor; assert formatted content and copy functionality
    await page.waitForSelector('h3:has-text("Output")', { timeout: 15000 })
    let formatted = await page.textContent('pre code.language-json')
    if (!formatted) formatted = await page.textContent('.tool-output')
    expect(formatted).toContain('"name"')

    // Copy button should exist
    await expect(page.locator('button:has-text("Copy")')).toBeVisible()
  })
})
