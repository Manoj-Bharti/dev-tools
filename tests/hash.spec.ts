import { test, expect } from '@playwright/test'
import { testData } from './fixtures/test-data'

test.describe('Hash Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/hash')
  })

  test('should generate MD5 for simple text', async ({ page }) => {
    await page.fill('textarea[placeholder="Enter text to hash..."]', testData.hash.inputs.simple)
    await page.click('button:has-text("Generate Hashes")')

    await page.waitForSelector('h3:has-text("Results")', { timeout: 5000 })
    const resultsSection = page.locator('h3:has-text("Results")').first().locator('xpath=..')
    const blocks = resultsSection.locator('div.space-y-2')
    // Find the MD5 block by scanning labels
    let found = false
    const count = await blocks.count()
    for (let i = 0; i < count; i++) {
      const label = (await blocks.nth(i).locator('label').textContent())?.trim() ?? ''
      if (/md5/i.test(label)) {
        const md5 = (await blocks.nth(i).locator('.tool-output').textContent())?.trim() ?? ''
        expect(md5).toMatch(/^[0-9a-f]{32}$/i)
        found = true
        break
      }
    }
    expect(found).toBeTruthy()
  })

  test('should generate SHA-256 for simple text', async ({ page }) => {
    // Clear textarea first
    const textarea = page.locator('textarea[placeholder="Enter text to hash..."]')
    await textarea.clear()
    
    // Fill with test input
    await textarea.fill(testData.hash.inputs.simple)
    
    // Verify the input was set
    const inputValue = await textarea.inputValue()
    expect(inputValue).toBe(testData.hash.inputs.simple)
    
    // Click Generate button
    await page.click('button:has-text("Generate Hashes")')
    
    // Wait for results section to appear
    await page.waitForSelector('h3:has-text("Results")', { timeout: 5000 })
    
    // Wait for hash outputs to render
    await page.waitForSelector('.tool-output', { timeout: 10000 })
    
    // Get all tool-output elements and check each for SHA-256
    const outputs = page.locator('.tool-output')
    const outputCount = await outputs.count()
    
    // Should have at least 3 outputs (MD5, SHA-1, SHA-256, SHA-512)
    expect(outputCount).toBeGreaterThanOrEqual(3)
    
    // Collect all output texts
    const allOutputs: string[] = []
    for (let i = 0; i < outputCount; i++) {
      const output = await outputs.nth(i).textContent()
      if (output) allOutputs.push(output.trim())
    }
    
    // At least one output should match SHA-256
    const foundSHA256 = allOutputs.some(out => out === testData.hash.expected.sha256Simple)
    expect(foundSHA256).toBeTruthy()
  })

  test('should handle very long input', async ({ page }) => {
    await page.fill('textarea[placeholder="Enter text to hash..."]', testData.hash.inputs.long)
    await page.click('button:has-text("Generate Hashes")')
    await page.waitForSelector('h3:has-text("Results")', { timeout: 10000 })
    const output = await page.locator('h3:has-text("Results")').first().locator('xpath=..').locator('.tool-output').first().textContent()
    expect(output).toBeTruthy()
  })
})
