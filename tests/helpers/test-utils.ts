import { Page, expect } from '@playwright/test'

export class ToolTestHelper {
  constructor(private page: Page) {}

  async navigateToTool(toolPath: string) {
    await this.page.goto(toolPath)
    await this.page.waitForLoadState('networkidle')
  }

  async fillInput(selector: string, value: string) {
    await this.page.fill(selector, value)
  }

  async clickButton(text: string) {
    await this.page.click(`button:has-text("${text}")`)
  }

  async getOutput(selector: string) {
    return await this.page.textContent(selector)
  }

  async expectOutput(selector: string, expected: string) {
    const output = await this.getOutput(selector)
    expect(output?.trim()).toBe(expected)
  }

  async expectOutputContains(selector: string, substring: string) {
    const output = await this.getOutput(selector)
    expect(output).toContain(substring)
  }

  async expectError(errorText: string) {
    await expect(this.page.locator('text=' + errorText)).toBeVisible()
  }

  async clickCopyButton() {
    await this.page.click('button:has-text("Copy")')
  }

  async expectCopied() {
    await expect(this.page.locator('text=Copied')).toBeVisible()
  }

  async clearInput() {
    await this.page.click('button:has-text("Clear")')
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `tests/screenshots/${name}.png`, fullPage: true })
  }
}
