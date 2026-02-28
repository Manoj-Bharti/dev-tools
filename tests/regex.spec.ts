import { test, expect } from '@playwright/test'
import { testData } from './fixtures/test-data'

test.describe('Regex Tester', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/regex')
    await page.waitForLoadState('networkidle')
  })

  test('should match valid email', async ({ page }) => {
    // Fill pattern field (first text input or textarea)
    const inputs = page.locator('input, textarea')
    
    // Find the pattern input by looking for it
    const patternArea = page.locator('input[placeholder*="pattern"], textarea[placeholder*="pattern"]').first()
    if (await patternArea.isVisible()) {
      await patternArea.fill(testData.regex.patterns.email.pattern)
    }
    
    // Fill flags input
    const flagsInput = page.locator('input[placeholder*="g, i, m"]').first()
    if (await flagsInput.isVisible()) {
      await flagsInput.fill(testData.regex.patterns.email.flags)
    }
    
    // Fill test string
    const testInput = page.locator('textarea[placeholder*="Enter text to test"]').first()
    await testInput.fill(testData.regex.patterns.email.validMatch)
    
    // Click Test button
    await page.click('button:has-text("Test")')
    
    // Wait for matches to appear
    await page.waitForSelector('.tool-output', { timeout: 5000 })
    const matches = page.locator('.tool-output')
    await expect(matches.first()).toBeVisible()
  })

  test('should not match invalid email', async ({ page }) => {
    const patternArea = page.locator('input[placeholder*="pattern"], textarea[placeholder*="pattern"]').first()
    if (await patternArea.isVisible()) {
      await patternArea.fill(testData.regex.patterns.email.pattern)
    }
    
    const flagsInput = page.locator('input[placeholder*="g, i, m"]').first()
    if (await flagsInput.isVisible()) {
      await flagsInput.fill(testData.regex.patterns.email.flags)
    }
    
    const testInput = page.locator('textarea[placeholder*="Enter text to test"]').first()
    await testInput.fill(testData.regex.patterns.email.invalidMatch)
    
    await page.click('button:has-text("Test")')
    
    // For invalid matches, the output section may not appear at all
    // or shows an empty matches list - just verify the click succeeded
    await page.waitForTimeout(500)
    const matches = page.locator('.tool-output')
    const count = await matches.count()
    // No matches found is the expected behavior
    expect(count).toBeLessThanOrEqual(0)
  })
})
