# Playwright Test Automation - AI Coding Instructions

## Architecture Overview

This is a **Playwright-based test automation framework** for the Parabank demo banking application. The project uses a **Page Object Model (POM)** pattern with custom fixtures for maintainability.

### Key Components

- **`tests/`** - Main test specifications (E2E workflows)
- **`PB_pages/`** - Page Object classes for Parabank app (primary focus)
- **`pages/`** - Legacy Page Object classes (reference only)
- **`fixtures/testFixture.ts`** - Custom Playwright fixture that provides page objects via dependency injection
- **`api-tests/`** - API test specs (separate from UI tests)
- **`utils/logger.ts`** - Centralized logging utility
- **`playwright.config.ts`** - Configuration with Parabank as baseURL, headless: false, video/screenshot retention

## Project Patterns

### 1. Page Object Model (POM)

**Convention**: All page objects in `PB_pages/` follow naming pattern `PB_[PageName].ts`

**Structure**:
```typescript
export class PB_SomePage {
  constructor(private page: Page) {}
  
  async action() {
    await this.page.locator(selector).action();
  }
  
  async validate() {
    await this.page.locator(selector).isVisible();
  }
}
```

**Key patterns**:
- Constructor receives `Page` object from Playwright
- Methods return `async` promises
- Selectors use Playwright's modern `.locator()` API
- Methods grouped as: navigation/actions, then validations
- Complex selectors use escaped IDs: `#customer\\.fieldName` for dot notation

### 2. Custom Fixture Pattern

**File**: `fixtures/testFixture.ts`

Tests inject page objects via the fixture extension:
```typescript
test('Test name', async ({ launchPage, authPage, accountPage, transferPage, commonPage }) => {
  // page objects already instantiated with test's page context
});
```

**Fixture Benefits**:
- Automatic lifecycle management (page object destroyed after test)
- Dependency injection eliminates boilerplate instantiation
- Centralized object definition prevents duplication

### 3. Test Structure with Steps

**Pattern**: Use `test.step()` for logical test segments with Logger utility

```typescript
await test.step('Step description', async () => {
  // test actions
  Logger.step('Success message');
});
```

This enables:
- HTML report organization (visible in `playwright-report/`)
- Clear test flow documentation
- Better debugging when tests fail

### 4. Logging Convention

**File**: `utils/logger.ts`

Always use `Logger.step()` in test steps (not `console.log()`):
```typescript
Logger.step('User logged in successfully');  // Good
Logger.error('Login failed');                 // For errors
Logger.info('Additional context');            // General info
```

## Critical Workflows

### Running Tests

```powershell
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/parabankE2E.spec.ts

# Run with UI mode (interactive debugging)
npx playwright test --ui

# View HTML report
npx playwright show-report
```

### Debugging & Development

- **Debug single test**: `npx playwright test tests/parabankE2E.spec.ts --debug`
- **Video/screenshot location**: `test-results/` folder (retained on failure per config)
- **HTML report**: Auto-generated in `playwright-report/` (never commit to repo)

### Configuration

**Key settings** (`playwright.config.ts`):
- `baseURL: 'https://parabank.parasoft.com/parabank/index.htm'` - All page.goto() calls use this
- `headless: false` - Browser UI visible (remove for CI)
- `viewport: 1280x720` - Fixed resolution
- `timeout: 30s`, `expect.timeout: 5s` - Action and assertion limits
- `video: 'retain-on-failure'` - Only saves when test fails

## Developer Conventions

### File Naming
- Page Objects: `PB_[Feature]Page.ts` (e.g., `PB_AuthPage.ts`)
- Tests: `[feature].spec.ts` (e.g., `parabankE2E.spec.ts`)
- API tests: `[endpoint].spec.ts/js` in `api-tests/`

### Selector Strategy
1. **Preferred**: Text-based: `text=Register`, `input[value="Log In"]`
2. **Fallback**: ID/name attributes: `input[name="username"]`
3. **Complex IDs**: Escape dots: `#customer\\.firstName`
4. **Form context**: Narrow scope with `.locator('form[action*="register.htm"]').locator('#field')`

### Test Data
- **Dynamic usernames**: `user_${Date.now()}` to avoid collisions
- **Hard-coded test credentials**: Currently used (consider environment variables for CI)

## Integration Points

### External Dependency: Parabank Demo App
- Base URL: `https://parabank.parasoft.com/parabank/index.htm`
- **Pages used**: Homepage → Register → Login → Account Creation → Transfer Funds
- **Key flows**: User registration, authentication, account operations

### API Testing (Separate Concern)
- Uses `reqres.in` for API test samples (not connected to UI tests)
- API context: `const apiContext = await request.newContext()`
- Mix of TypeScript and JavaScript (both supported)

## When Adding New Tests

1. **Create page object** in `PB_pages/PB_[Feature].ts` with selectors and actions
2. **Add fixture provider** in `fixtures/testFixture.ts` (type + extension)
3. **Import fixture** in test: `import { test } from '../fixtures/testFixture'`
4. **Structure with steps**: Each logical action group gets a `test.step()` with `Logger.step()` call
5. **Update HTML report**: Tests auto-report to `playwright-report/`

## Common Gotchas

- **Selector escaping**: IDs with dots need backslash escape (`#customer\\.fieldName`)
- **Form targeting**: Use form context when multiple forms exist on page
- **Wait for load**: Always call `page.waitForLoadState('domcontentloaded')` after navigation
- **Test data cleanup**: Generated usernames are unique by timestamp, no cleanup needed
- **Config baseURL**: All page.goto() paths are relative to baseURL
