import { test, expect } from '@playwright/test'
import { testData } from './fixtures/test-data'

test.describe('Diff Tool', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/diff')
  })

  test('should show no changes', async ({ page }) => {
    await page.fill('textarea[placeholder*="original" i]', testData.diff.scenarios.noChanges.text1)
    await page.fill('textarea[placeholder*="modified" i]', testData.diff.scenarios.noChanges.text2)
    await page.click('button:has-text("Compare")')
    // When texts are identical the diff shows only unchanged lines (no adds/removes)
    const results = page.locator('.tool-section:has(h3:has-text("Diff Results"))')
    await expect(results).toBeVisible()
    await expect(results.locator('.text-green-400')).toHaveCount(0)
    await expect(results.locator('.text-red-400')).toHaveCount(0)
  })

  test('should detect additions', async ({ page }) => {
    await page.fill('textarea[placeholder*="original" i]', testData.diff.scenarios.additions.text1)
    await page.fill('textarea[placeholder*="modified" i]', testData.diff.scenarios.additions.text2)
    await page.click('button:has-text("Compare")')
    const results = page.locator('.tool-section:has(h3:has-text("Diff Results"))')
    await expect(results.locator('text=+')).toBeVisible()
  })

  test('should detect deletions and modifications', async ({ page }) => {
    await page.fill('textarea[placeholder*="original" i]', testData.diff.scenarios.modifications.text1)
    await page.fill('textarea[placeholder*="modified" i]', testData.diff.scenarios.modifications.text2)
    await page.click('button:has-text("Compare")')
    const results2 = page.locator('.tool-section:has(h3:has-text("Diff Results"))')
    await expect(results2.locator('text=−')).toBeVisible()
    await expect(results2.locator('text=+')).toBeVisible()
  })
})
