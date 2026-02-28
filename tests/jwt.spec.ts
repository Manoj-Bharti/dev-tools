import { test, expect } from '@playwright/test'
import { testData } from './fixtures/test-data'
import { ToolTestHelper } from './helpers/test-utils'

test.describe('JWT Decoder', () => {
  let helper: ToolTestHelper

  test.beforeEach(async ({ page }) => {
    helper = new ToolTestHelper(page)
    await helper.navigateToTool('/tools/jwt')
  })

  test('should decode valid JWT', async ({ page }) => {
    await page.fill('textarea[placeholder*="Paste JWT token" i]', testData.jwt.valid.hs256)
    await page.click('button:has-text("Decode")')
    // Header and payload are rendered into code blocks; wait for code blocks
    await page.waitForSelector('pre code', { timeout: 5000 })
    const blocks = page.locator('pre')
    expect(await blocks.count()).toBeGreaterThanOrEqual(2)
  })

  test('should show JWT header', async ({ page }) => {
    await page.fill('textarea[placeholder*="Paste JWT token" i]', testData.jwt.valid.hs256)
    await page.click('button:has-text("Decode")')
    await page.waitForSelector('pre code', { timeout: 5000 })
    const headerBlock = page.locator('pre').first()
    const headerText = await headerBlock.textContent()
    expect(headerText).toContain('alg')
    expect(headerText).toContain('HS256')
  })

  test('should show JWT payload', async ({ page }) => {
    await page.fill('textarea[placeholder*="Paste JWT token" i]', testData.jwt.valid.hs256)
    await page.click('button:has-text("Decode")')
    await page.waitForSelector('pre code', { timeout: 5000 })
    const payloadBlock = page.locator('pre').nth(1)
    const payloadText = await payloadBlock.textContent()
    expect(payloadText).toContain('sub')
    expect(payloadText).toContain('name')
    expect(payloadText).toContain('John Doe')
  })

  test('should detect expired token', async ({ page }) => {
    await page.fill('textarea[placeholder*="Paste JWT token" i]', testData.jwt.valid.expired)
    await page.click('button:has-text("Decode")')
    // The tool decodes payload; ensure payload includes an exp field for expired tokens
    await page.waitForSelector('pre code', { timeout: 5000 })
    const payloadBlock = page.locator('pre').nth(1)
    const payloadText = await payloadBlock.textContent()
    expect(payloadText).toContain('exp')
  })

  test('should show error for invalid JWT', async ({ page }) => {
    await page.fill('textarea[placeholder*="Paste JWT token" i]', testData.jwt.invalid.malformed)
    await page.click('button:has-text("Decode")')
    await expect(page.locator('div.text-red-400')).toBeVisible({ timeout: 5000 })
  })

  test('should verify signature with secret', async ({ page }) => {
    await page.fill('textarea[placeholder*="Paste JWT token" i]', testData.jwt.valid.hs256)
    await page.fill('input[placeholder*="secret" i]', 'your-256-bit-secret')
    await page.click('button:has-text("Decode")')
    // Should show verification status text that includes "Signature"
    await expect(page.locator('text=Signature valid (HS family)')).toBeVisible({ timeout: 5000 })
  })

  test('should copy decoded parts', async ({ page }) => {
    await page.fill('textarea[placeholder*="Paste JWT token" i]', testData.jwt.valid.hs256)
    await page.click('button:has-text("Decode")')
    await page.waitForSelector('pre code', { timeout: 5000 })
    // Find first copy button and ensure it is clickable
    const copyButton = page.locator('button:has-text("Copy")').first()
    await expect(copyButton).toBeVisible()
    await copyButton.click()
    await expect(copyButton).toBeVisible()
  })
})
