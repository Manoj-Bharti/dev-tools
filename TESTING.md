# Testing Guide - DevToolkit

Complete guide to running, writing, and debugging end-to-end tests with Playwright.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Installation](#installation)
3. [Running Tests](#running-tests)
4. [Test Structure](#test-structure)
5. [Writing Tests](#writing-tests)
6. [Debugging](#debugging)
7. [CI/CD Integration](#cicd-integration)
8. [Test Coverage](#test-coverage)
9. [Troubleshooting](#troubleshooting)

---

## Quick Start

Get tests running in 3 commands:

```bash
npm install --legacy-peer-deps
npx playwright install
npx playwright test
```

Done! You'll see 72 tests run across Chromium, Firefox, and WebKit.

---

## Installation

### Prerequisites

- Node.js 16+ (check with `node --version`)
- npm or pnpm

### Step 1: Install Dependencies

```bash
# Using npm
npm install --legacy-peer-deps

# Or using pnpm
pnpm install --legacy-peer-deps
```

The `--legacy-peer-deps` flag is required due to React version compatibility.

**Verify installation:**
```bash
npm ls @playwright/test
```

Should show `@playwright/test@latest`.

### Step 2: Install Browsers

```bash
npx playwright install
```

This downloads:
- **Chromium** (~150 MB)
- **Firefox** (~200 MB)
- **WebKit** (~180 MB)

You can install specific browsers only:

```bash
# Chromium only
npx playwright install chromium

# Firefox only
npx playwright install firefox

# WebKit only
npx playwright install webkit
```

### Step 3: Verify Setup

```bash
npx playwright test --version
```

Should show Playwright version (e.g., `1.40.0` or newer).

---

## Running Tests

### All Tests

```bash
npx playwright test
```

- Runs **72 tests** across all 3 browsers
- Total time: ~60 seconds
- Exit code 0 = all passed, 1 = failures

### By Test File

Run tests for a specific tool:

```bash
# Individual tools
npx playwright test tests/base64.spec.ts
npx playwright test tests/jwt.spec.ts
npx playwright test tests/hash.spec.ts
npx playwright test tests/diff.spec.ts
npx playwright test tests/json.spec.ts
npx playwright test tests/url.spec.ts
npx playwright test tests/timestamp.spec.ts
npx playwright test tests/uuid.spec.ts
npx playwright test tests/password.spec.ts
npx playwright test tests/regex.spec.ts

# Integration tests
npx playwright test tests/navigation.spec.ts
npx playwright test tests/accessibility.spec.ts
npx playwright test tests/performance.spec.ts
```

### By Browser

Test a specific browser only:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Single browser = 1/3 the time.

### By Test Pattern

Run tests matching a keyword:

```bash
# All tests with "encode" in the name
npx playwright test --grep "encode"

# All Base64 tests
npx playwright test --grep "Base64"

# All encode tests in Base64
npx playwright test --grep "Base64.*encode"
```

### Advanced Modes

#### UI Mode (Recommended for Development)

```bash
npx playwright test --ui
```

Opens interactive test runner:
- ▶️ Click to run individual tests
- ⏸️ Pause/step through tests
- 🔍 Inspect DOM elements
- 📹 Watch test recording
- 🐛 Full debugging tools

Perfect for:
- Debugging failing tests
- Understanding test flow
- Visual test verification
- Learning Playwright

#### Debug Mode

```bash
npx playwright test --debug
```

Opens Playwright Inspector:
- ⏩ Step into, over, out
- 🔤 Evaluate JavaScript
- 📦 View page state
- 💾 Take screenshots

#### Watch Mode

```bash
npx playwright test --watch
```

Auto-reruns tests on file changes. Useful during development.

#### With Workers Control

```bash
# Run serially (slower, useful for debugging)
npx playwright test --workers=1

# Run with 2 workers
npx playwright test --workers=2

# Default: workers = number of CPU cores
npx playwright test --workers=4
```

### Reporters

Different output formats:

```bash
# List reporter (default, clean)
npx playwright test --reporter=list

# Verbose (detailed output)
npx playwright test --reporter=verbose

# HTML report (interactive)
npx playwright test --reporter=html

# JSON report (programmatic)
npx playwright test --reporter=json > results.json

# Multiple reporters
npx playwright test --reporter=list --reporter=html
```

View HTML report:

```bash
npx playwright show-report
```

---

## Test Structure

### Directory Layout

```
tests/
├── fixtures/
│   └── test-data.ts          # All test data
├── helpers/
│   └── test-utils.ts         # Test utilities (ToolTestHelper)
├── base64.spec.ts            # Base64 tests (11 tests)
├── diff.spec.ts              # Diff tests (3 tests)
├── hash.spec.ts              # Hash tests (3 tests)
├── jwt.spec.ts               # JWT tests (8 tests)
├── json.spec.ts              # JSON tests (9 tests)
├── password.spec.ts          # Password tests (5 tests)
├── regex.spec.ts             # Regex tests (3 tests)
├── timestamp.spec.ts         # Timestamp tests (3 tests)
├── url.spec.ts               # URL tests (3 tests)
├── uuid.spec.ts              # UUID tests (5 tests)
├── navigation.spec.ts        # Navigation tests (3 tests)
├── accessibility.spec.ts     # A11y tests (6 tests)
└── performance.spec.ts       # Performance tests (3 tests)
```

### Test File Structure

Example from `base64.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'
import { testData } from './fixtures/test-data'
import { ToolTestHelper } from './helpers/test-utils'

test.describe('Base64 Encoder/Decoder', () => {
  let helper: ToolTestHelper

  // Runs before each test
  test.beforeEach(async ({ page }) => {
    helper = new ToolTestHelper(page)
    await helper.navigateToTool('/tools/base64')
  })

  test.describe('Encoding', () => {
    test('should encode simple text', async ({ page }) => {
      // Arrange
      await page.fill('textarea[placeholder="..."]', testData.base64.valid.simple.input)
      
      // Act
      await page.locator('button:has-text("Encode")').last().click()
      
      // Assert
      await page.waitForSelector('.tool-output', { timeout: 10000 })
      const output = await page.textContent('.tool-output')
      expect(output?.trim()).toBe(testData.base64.valid.simple.encoded)
    })
  })
})
```

### Test Hooks

Available hooks:

```typescript
test.describe('Suite', () => {
  // Runs once before all tests in suite
  test.beforeAll(async () => {
    // Setup
  })

  // Runs before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/base64')
  })

  // Runs after each test
  test.afterEach(async ({ page }) => {
    // Cleanup
  })

  // Runs once after all tests in suite
  test.afterAll(async () => {
    // Teardown
  })

  test('example', async ({ page }) => {
    // Test logic
  })
})
```

---

## Writing Tests

### Basic Test Template

```typescript
import { test, expect } from '@playwright/test'

test('my test', async ({ page }) => {
  // Navigate to page
  await page.goto('/tools/my-tool')
  
  // Interact with page
  await page.fill('textarea', 'input text')
  await page.click('button:has-text("Process")')
  
  // Wait for async operations
  await page.waitForSelector('.output', { timeout: 5000 })
  
  // Assert results
  const result = await page.textContent('.output')
  expect(result).toContain('expected')
})
```

### Finding Elements

```typescript
// By CSS selector
page.locator('.tool-output')

// By text content
page.locator('button:has-text("Encode")')

// By placeholder
page.locator('textarea[placeholder="Enter text..."]')

// By aria-label
page.locator('button[aria-label="Clear"]')

// By role
page.locator('button[role="button"]')

// Multiple matches - select specific
page.locator('button:has-text("Encode")').first()
page.locator('button:has-text("Encode")').last()
page.locator('button:has-text("Encode")').nth(2)
```

### User Interactions

```typescript
// Type text
await page.fill('textarea', 'my text')

// Click element
await page.click('button:has-text("Submit")')
await page.locator('button').click()

// Select from dropdown
await page.selectOption('select', 'option-value')

// Check/uncheck checkbox
await page.check('input[type=checkbox]')
await page.uncheck('input[type=checkbox]')

// Double-click
await page.dblclick('div.item')

// Right-click
await page.click('div.item', { button: 'right' })

// Hover
await page.hover('div.item')

// Keyboard
await page.press('input', 'Enter')
await page.keyboard.type('Hello')
await page.keyboard.press('Control+A')
```

### Waiting

```typescript
// Wait for element to appear
await page.waitForSelector('.output')

// Wait for element to be visible
await await expect(page.locator('.output')).toBeVisible()

// Wait for navigation
await page.waitForNavigation()

// Wait for network idle
await page.waitForLoadState('networkidle')

// Wait for specific time (last resort)
await page.waitForTimeout(1000)
```

### Assertions

```typescript
// Visibility
await expect(page.locator('.output')).toBeVisible()
await expect(page.locator('.hidden')).not.toBeVisible()

// Text content
await expect(page.locator('h1')).toHaveText('Welcome')
await expect(page.locator('h1')).toContainText('come')

// Element count
await expect(page.locator('.item')).toHaveCount(5)
await expect(page.locator('.error')).toHaveCount(0)

// Input value
await expect(page.locator('input')).toHaveValue('expected')

// Attributes
await expect(page.locator('button')).toHaveAttribute('disabled')

// Screenshots & snapshots
await expect(page).toHaveScreenshot()
```

### Using Test Fixtures (Test Data)

Test data in `tests/fixtures/test-data.ts`:

```typescript
export const testData = {
  base64: {
    valid: {
      simple: {
        input: 'Hello',
        encoded: 'SGVsbG8='
      }
    },
    invalid: {
      notBase64: '!!!'
    }
  },
  // ... more tools
}
```

Using in tests:

```typescript
import { testData } from './fixtures/test-data'

test('encode', async ({ page }) => {
  await page.fill('textarea', testData.base64.valid.simple.input)
  // ... test
  expect(result).toBe(testData.base64.valid.simple.encoded)
})
```

### Using Test Helpers

Helper class in `tests/helpers/test-utils.ts`:

```typescript
import { ToolTestHelper } from './helpers/test-utils'

test('my test', async ({ page }) => {
  const helper = new ToolTestHelper(page)
  
  // Navigate to tool
  await helper.navigateToTool('/tools/base64')
  
  // Fill input
  await helper.fillInput('textarea', 'test')
  
  // Click button
  await helper.clickButton('Encode')
  
  // Get output
  const output = await helper.getOutput('.tool-output')
  
  // Expect output
  await helper.expectOutput('.tool-output', 'dGVzdA==')
  
  // Copy to clipboard
  await helper.clickCopyButton()
  await helper.expectCopied()
})
```

---

## Debugging

### Print Debug Info

```typescript
test('debug test', async ({ page }) => {
  // Log to console
  console.log('Page title:', await page.title())
  
  // Take screenshot
  await page.screenshot({ path: 'debug.png' })
  
  // Print HTML
  const html = await page.content()
  console.log(html)
  
  // Get element details
  const text = await page.textContent('h1')
  console.log('Heading:', text)
})
```

### UI Mode Debugging

```bash
npx playwright test --ui
```

Best for:
- Visual debugging
- Understanding element selection
- Recording test steps
- Watching element changes live

### Inspector (Debug Mode)

```bash
npx playwright test --debug
```

Features:
- Step into/over code
- Evaluate JavaScript
- Check element state
- Set breakpoints

### Trace Viewer

```bash
npx playwright test --trace=on
```

Then view traces:

```bash
npx playwright show-trace test-results/trace.zip
```

Shows:
- Network requests
- Console logs
- Screenshots at each step
- DOM snapshots

### Slow Motion

```bash
npx playwright test --headed --slow-mo=1000
```

Slows down each action by 1000ms for visual inspection.

---

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/tests.yml

name: E2E Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      
      - name: Install dependencies
        run: npm install --legacy-peer-deps
      
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      
      - name: Run tests
        run: npx playwright test
      
      - name: Upload test report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report-${{ matrix.node-version }}
          path: playwright-report/
          retention-days: 30
```

### GitLab CI

```yaml
# .gitlab-ci.yml

test:playwright:
  image: mcr.microsoft.com/playwright:v1.40.0-jammy
  
  script:
    - npm install --legacy-peer-deps
    - npx playwright install
    - npx playwright test
  
  artifacts:
    when: always
    paths:
      - playwright-report/
      - test-results/
    expire_in: 30 days
```

### GitHub Actions Workflow (Comprehensive)

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ${{ matrix.os }}
    
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        browser: [chromium, firefox, webkit]
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - run: npm install --legacy-peer-deps
      
      - run: npx playwright install ${{ matrix.browser }}
      
      - run: npx playwright test --project=${{ matrix.browser }}
      
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: results-${{ matrix.os }}-${{ matrix.browser }}
          path: playwright-report/
```

---

## Test Coverage

### Statistics

- **Total Tests:** 72
- **Total Suites:** 15 files
- **Browsers:** 3 (Chromium, Firefox, WebKit)
- **Coverage:** ~60 features across 10 tools

### Tool-by-Tool Breakdown

**Base64 (11 tests)**
- ✓ Encode simple text
- ✓ Encode Unicode text
- ✓ Encode special characters
- ✓ Encode multiline text
- ✓ Handle empty input
- ✓ Show character count
- ✓ Decode valid base64
- ✓ Show error for invalid base64
- ✓ Toggle between encode/decode
- ✓ Clear input and output
- ✓ Copy output to clipboard

**JWT (8 tests)**
- ✓ Decode valid JWT
- ✓ Show JWT header
- ✓ Show JWT payload
- ✓ Detect expired token
- ✓ Show error for invalid JWT
- ✓ Verify signature with secret
- ✓ Copy decoded parts

**JSON (9 tests)**
- ✓ 9 comprehensive JSON tests
- ✓ Format, minify, validate
- ✓ Error detection
- ✓ UI interactions

**Hash (3 tests)**
- ✓ Generate MD5
- ✓ Generate SHA-256
- ✓ Handle very long input

**And 7 more tools** with similar coverage…

---

## Troubleshooting

### Port Already in Use

```bash
# Error: Port 3000 is already in use
# Solution:

# Kill the process
lsof -ti :3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Playwright Installation Fails

```bash
# Try reinstalling browsers with dependencies
npx playwright install --with-deps

# Or use specific browser
npx playwright install chromium --with-deps
```

### Tests Timeout

```bash
# Increase timeout globally
npx playwright test --timeout=60000

# Or in test file
test('slow test', async ({ page }) => {
  test.setTimeout(60000)
  // ... test code
})
```

### Element Not Found

```typescript
// Problem: Element not found in DOM

// Solution 1: Wait longer
await page.waitForSelector('.element', { timeout: 10000 })

// Solution 2: Use better selector
// Instead of: page.locator('text=Submit')
// Use: page.locator('button:has-text("Submit")').last()

// Solution 3: Wait for page load
await page.waitForLoadState('networkidle')
```

### Flaky Tests

Intermittent failures?

```bash
# Run with fewer workers
npx playwright test --workers=1

# Or retry failed tests
npx playwright test --retries=2
```

### Browser Crashes

```bash
# Reinstall browsers
rm -rf ~/.cache/ms-playwright
npx playwright install

# Or run headless (no visual window)
npx playwright test --headed=false
```

### Permission Denied

```bash
# macOS/Linux: Fix permissions
chmod +x node_modules/.bin/playwright

# Or reinstall
npm install --legacy-peer-deps
npx playwright install
```

---

## Best Practices

1. **Use specific selectors** - Avoid generic text matches
2. **Add waits** - Don't assume instant rendering
3. **Test user flows** - Not implementation details
4. **Keep tests independent** - No shared state between tests
5. **Use fixtures** - Centralize test data
6. **Meaningful names** - Clear test descriptions
7. **Fail fast** - Early assertions
8. **Document** - Comments for complex logic
9. **Clean up** - Use afterEach for cleanup
10. **Run locally** - Before committing

---

## Resources

- [Playwright Docs](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging](https://playwright.dev/docs/debug)
- [CI/CD](https://playwright.dev/docs/ci)
- [API Reference](https://playwright.dev/docs/api/class-test)

---

**Questions?** Check `tests/` for examples or open an issue!
