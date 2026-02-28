# Complete Setup & Testing Guide - DevToolkit

A comprehensive step-by-step guide to set up the DevToolkit project and run its end-to-end test suite.

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Quick Setup (5 minutes)](#quick-setup-5-minutes)
3. [Detailed Setup](#detailed-setup)
4. [Running Tests - Step by Step](#running-tests--step-by-step)
5. [Understanding Test Output](#understanding-test-output)
6. [Common Tasks](#common-tasks)
7. [Troubleshooting](#troubleshooting)

---

## System Requirements

Before you begin, ensure you have:

- **Node.js** 16+ (`node --version`)
- **npm** 7+ or **pnpm** 7+ (`npm --version` or `pnpm --version`)
- **Git** (`git --version`)
- **~2 GB disk space** for node_modules and Playwright browsers
- **Internet connection** (for downloading dependencies)

**Supported OS:**
- ✅ macOS (Intel & Apple Silicon)
- ✅ Windows 10/11
- ✅ Linux (Ubuntu 18+, Debian 10+)

---

## Quick Setup (5 minutes)

Get running in 3 commands:

```bash
# Step 1: Install dependencies
npm install --legacy-peer-deps

# Step 2: Install test browsers
npx playwright install

# Step 3: Run tests
npx playwright test
```

**Expected output:**
```
Running 72 tests using 5 workers

  ✓   1 ... should encode simple text (1.0s)
  ✓   2 ... should encode unicode text (1.1s)
  ...
  72 passed (60s)
```

---

## Detailed Setup

### Step 1: Clone Repository

If you haven't already:

```bash
git clone <YOUR_REPO_URL>
cd devtools
```

### Step 2: Install Node.js (if needed)

Check your version:

```bash
node --version
```

If you don't have Node.js 16+:

- **macOS:** `brew install node@18`
- **Windows:** Download from [nodejs.org](https://nodejs.org)
- **Linux:** `sudo apt install nodejs npm`

### Step 3: Install Project Dependencies

```bash
# Using npm (with legacy peer deps flag)
npm install --legacy-peer-deps

# Or using pnpm
pnpm install --legacy-peer-deps
```

**What this does:**
- Downloads all Node.js dependencies
- Installs Playwright module
- Sets up dev server dependencies

**Expected time:** 2-5 minutes depending on internet speed

**Verify installation:**

```bash
npm list @playwright/test
```

Should output something like:
```
devtools@0.1.0 /path/to/devtools
└── @playwright/test@1.40.0
```

### Step 4: Install Playwright Browsers

```bash
npx playwright install
```

This downloads:
- **Chromium** (~150 MB)
- **Firefox** (~200 MB)
- **WebKit** (~180 MB)

**Expected time:** 3-10 minutes depending on internet speed

**Expected output:**
```
Downloading Chromium 120.0.6099.28 (playwright build v1234)...
Downloading Firefox 121.0 (playwright build v1234)...
Downloading WebKit (playwright build v1234)...
```

**Optional:** Install specific browsers only:

```bash
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

### Step 5: Verify Setup

```bash
# Check Playwright is installed
npx playwright --version

# Check browsers are installed
npx playwright install --with-deps

# Quick smoke test
npx playwright test tests/base64.spec.ts --workers=1
```

---

## Running Tests - Step by Step

### Basic Test Run

1. **Start the dev server** (optional, Playwright starts it automatically):

```bash
npm run dev
```

Server will be at `http://localhost:3000`

2. **Run all tests in another terminal:**

```bash
npx playwright test
```

**This will:**
- Start the dev server (if not running)
- Open browsers: Chromium, Firefox, WebKit
- Run 72 tests (some in parallel)
- Generate report

**Total time:** ~60 seconds

### Run Specific Tool Tests

Test individual tools:

```bash
# Base64 tests (11 tests)
npx playwright test tests/base64.spec.ts

# JWT tests (8 tests)
npx playwright test tests/jwt.spec.ts

# Hash tests (3 tests)
npx playwright test tests/hash.spec.ts

# Multiple files
npx playwright test tests/base64.spec.ts tests/jwt.spec.ts
```

### Run Tests by Pattern

```bash
# All tests with "encode" in name
npx playwright test --grep "encode"

# All "Base64" tests  
npx playwright test --grep "Base64"

# Tests matching regex
npx playwright test --grep "^Base64.*encode"
```

### Run in Specific Browser

```bash
# Chromium only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# WebKit only
npx playwright test --project=webkit

# Chromium and Firefox
npx playwright test --project=chromium --project=firefox
```

### Interactive Test UI (Recommended for Learning)

```bash
npx playwright test --ui
```

**Opens browser-based test runner with:**
- ▶️ Run/pause individual tests
- ⏱️ See test execution step-by-step
- 🔍 Inspect DOM elements
- 📹 Watch test recordings
- 🐛 Debug failures visually

### Debug Mode

```bash
npx playwright test --debug
```

**Opens Playwright Inspector:**
- ⏩ Step into individual actions
- 💾 Evaluate JavaScript in console
- 🖼️ Take screenshots
- 🐛 Set breakpoints

### Watch Mode (Auto-rerun on Changes)

```bash
npx playwright test --watch
```

- Reruns tests when you modify test files
- Useful during development/debugging

### Generate HTML Report

```bash
# Run tests and generate HTML report
npx playwright test --reporter=html

# View report in browser
npx playwright show-report
```

Opens `test-results/index.html` with:
- ✅ Pass/fail summary
- 📊 Test statistics
- 🎬 Screenshots & videos
- 📝 Detailed error messages

---

## Understanding Test Output

### Console Output Example

```
Running 72 tests using 5 workers

  ✓   1 › Base64 › Encoding › should encode simple text (1.0s)
  ✓   2 › Base64 › Encoding › should encode unicode text (1.1s)
  ...
  ✓  72 › Performance › should handle large inputs (2.3s)

  72 passed (60.5s)
```

**Legend:**
- `✓` = Test passed
- `✘` = Test failed
- `⊙` = Test skipped
- Time in seconds = how long test took

### Exit Codes

- `0` = All tests passed ✅
- `1` = Tests failed or other error ❌

### Test Report Structure

After running tests, you get:

```
test-results/
├── index.html                    # Overall report
├── results.json                  # Machine-readable results
├── trace.zip                     # Detailed execution trace
└── [test-name]/
    ├── test-failed-1.png         # Screenshot on failure
    ├── video.webm                # Test recording
    └── error-context.md          # Error details
```

---

## Common Tasks

### Run Tests in CI/CD Pipeline

```yaml
# GitHub Actions
- name: Install dependencies
  run: npm install --legacy-peer-deps

- name: Install Playwright
  run: npx playwright install

- name: Run tests
  run: npx playwright test
```

### Run Tests with Different Reporter Formats

```bash
# List reporter (default, clean output)
npx playwright test --reporter=list

# Verbose (detailed output)
npx playwright test --reporter=verbose

# JSON (for parsing)
npx playwright test --reporter=json > results.json

# HTML (interactive)
npx playwright test --reporter=html
npx playwright show-report
```

### Run Tests Slowly (for visual debugging)

```bash
npx playwright test --headed --slow-mo=1000
```

Shows browser window and slows actions to 1 second each.

### Run Single Test Only

```bash
# Run one specific test
npx playwright test tests/base64.spec.ts -g "should encode simple text"

# By line number
npx playwright test tests/base64.spec.ts:14
```

### Control Parallelization

```bash
# Run serially (1 worker) - slower but easier to debug
npx playwright test --workers=1

# Run with specific number of workers
npx playwright test --workers=4

# Default: auto-detects based on CPU cores
npx playwright test
```

### Retry Failed Tests

```bash
# Retry failed tests up to 2 times
npx playwright test --retries=2

# Useful in CI where network can be flaky
```

### View Test Traces

```bash
# Generate traces during test run
npx playwright test --trace=on

# View trace in Playwright Inspector
npx playwright show-trace test-results/trace.zip
```

---

## Troubleshooting

### Problem: Tests Don't Start / Dev Server Won't Start

**Error:** `Connection refused on 127.0.0.1:3000`

**Solution:**

```bash
# Kill any existing process on port 3000
lsof -ti :3000 | xargs kill -9

# Then retry
npx playwright test
```

### Problem: "Playwright not found" or "playwright is not installed"

**Error:** `Command 'npx playwright test' not found`

**Solution:**

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Problem: Browser Installation Failed

**Error:** `Failed to install browser`

**Solution:**

```bash
# Clear cache and reinstall with dependencies
rm -rf ~/.cache/ms-playwright
npx playwright install --with-deps

# Or specific browser:
npx playwright install chromium --with-deps
```

### Problem: Tests Timeout

**Error:** `Timeout 30000ms exceeded`

**Solution:**

```bash
# Increase timeout globally
npx playwright test --timeout=60000

# Increase for specific test file
npx playwright test tests/performance.spec.ts --timeout=120000
```

### Problem: Element Not Found

**Error:** `locator('button:has-text("Submit")') did not resolve to any DOM element`

**Solution:**

```bash
# Use --debug mode to inspect
npx playwright test --debug

# Or check selector in UI mode
npx playwright test --ui

# Common fixes:
# - Wait longer: await page.waitForSelector('.element', { timeout: 10000 })
# - Use better selector: button:has-text("...").first()
# - Wait for load: await page.waitForLoadState('networkidle')
```

### Problem: Tests Fail Intermittently (Flaky)

**Error:** Tests pass sometimes, fail other times

**Solution:**

```bash
# Run with fewer workers (less parallelization)
npx playwright test --workers=1

# Add retry logic
npx playwright test --retries=2

# Increase timeouts
npx playwright test --timeout=60000
```

### Problem: "EACCES: permission denied" on macOS/Linux

**Error:** `EACCES: permission denied, access '~/.cache/ms-playwright'`

**Solution:**

```bash
# Fix permissions
sudo chown -R $USER ~/.cache/ms-playwright

# Or reinstall paths
npx playwright install
```

### Problem: Out of Memory

**Error:** `JavaScript heap out of memory`

**Solution:**

```bash
# Run with higher memory limit
NODE_OPTIONS=--max_old_space_size=4096 npx playwright test

# Run with fewer workers
npx playwright test --workers=1
```

### Problem: Tests Run but Report is Empty

**Error:** `playwright-report/` empty or missing

**Solution:**

```bash
# Specify HTML reporter
npx playwright test --reporter=html

# View report
npx playwright show-report
```

---

## Next Steps

After setup succeeds:

1. **Read the main README:** [README.md](README.md)
2. **Review test documentation:** [TESTING.md](TESTING.md)
3. **Check test examples:** [tests/](tests/)
4. **Start the dev server:**
   ```bash
   npm run dev
   ```
5. **Run tests in UI mode:**
   ```bash
   npx playwright test --ui
   ```

---

## Quick Reference

| Task | Command |
|------|---------|
| Setup | `npm install --legacy-peer-deps && npx playwright install` |
| All tests | `npx playwright test` |
| Specific tool | `npx playwright test tests/base64.spec.ts` |
| Interactive UI | `npx playwright test --ui` |
| Generate report | `npx playwright test --reporter=html` |
| View report | `npx playwright show-report` |
| Debug mode | `npx playwright test --debug` |
| Watch mode | `npx playwright test --watch` |
| Run dev server | `npm run dev` |
| Pattern match | `npx playwright test --grep "pattern"` |

---

## Getting Help

- 📖 [Playwright Documentation](https://playwright.dev/)
- 🎓 [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- 🐛 [Debugging Guide](https://playwright.dev/docs/debug)
- 💬 [GitHub Issues](#)
- 🚀 [CI/CD Integration](https://playwright.dev/docs/ci)

---

**Ready to test?** Run `npx playwright test --ui` and explore! 🎭
