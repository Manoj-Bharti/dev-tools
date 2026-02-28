import { test, expect } from '@playwright/test'
import { testData } from './fixtures/test-data'

test.describe('Timestamp Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/timestamp')
    await page.waitForLoadState('networkidle')
  })

  test('should parse unix seconds', async ({ page }) => {
    // Uncheck milliseconds if checked
    const msCheckbox = page.locator('input[type="checkbox"]').first()
    const isChecked = await msCheckbox.isChecked()
    if (isChecked) await msCheckbox.uncheck()
    
    // Fill input field
    const input = page.locator('input[placeholder*="Unix timestamp"]').first()
    await input.fill(testData.timestamp.valid.unixSeconds)
    
    // Click Convert button
    await page.click('button:has-text("Convert")')

    // Wait for output section to appear
    await page.waitForSelector('.tool-output', { timeout: 10000 })
    const output = await page.textContent('.tool-output')
    expect(output).toContain('2009')
  })

  test('should parse unix milliseconds', async ({ page }) => {
    // Check the milliseconds checkbox
    const msCheckbox = page.locator('input[type="checkbox"]').first()
    const isUnchecked = await msCheckbox.isChecked() === false
    if (isUnchecked) await msCheckbox.check()
    
    // Fill input
    const input = page.locator('input[placeholder*="Unix timestamp"]').first()
    await input.fill(testData.timestamp.valid.unixMilliseconds)
    
    // Click Convert
    await page.click('button:has-text("Convert")')

    // Wait for output
    await page.waitForSelector('.tool-output', { timeout: 10000 })
    const output = await page.textContent('.tool-output')
    expect(output).toContain('2009')
  })

  test('should parse ISO 8601', async ({ page }) => {
    // Uncheck milliseconds checkbox if it's checked
    const msCheckbox = page.locator('input[type="checkbox"]').first()
    const isChecked = await msCheckbox.isChecked()
    if (isChecked) await msCheckbox.uncheck()
    
    const input = page.locator('input[placeholder*="Unix timestamp"]').first()
    await input.fill(testData.timestamp.valid.iso8601)
    
    await page.click('button:has-text("Convert")')

    await page.waitForSelector('.tool-output', { timeout: 10000 })
    const output = await page.textContent('.tool-output')
    // ISO date converts to unix timestamp 1234567890
    expect(output).toContain('1234567890')
  })
})
