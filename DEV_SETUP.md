# Development Setup & Installation Guide

This guide covers installation of dev tools, configuration, and initialization for the MANYATTAke frontend development environment.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Developer Tools](#developer-tools)
4. [Observability & Error Tracking](#observability--error-tracking)
5. [First-Time Setup](#first-time-setup)
6. [Troubleshooting](#troubleshooting)

---

## Installation

### 1. Install Dev Dependencies

```bash
npm install
```

This installs all base dependencies. Now add dev-specific packages:

```bash
npm install --save-dev \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint \
  eslint-config-prettier \
  eslint-plugin-import \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  prettier \
  husky \
  lint-staged
```

### 2. Install Error Tracking (Sentry)

For production error tracking and performance monitoring:

```bash
npm install @sentry/react @sentry/tracing
```

#### Optional: Install LogRocket (Alternative/Complementary)

For session replay and error tracking:

```bash
npm install logrocket
```

### 3. Verify Installation

```bash
npm run type-check      # Verify TypeScript compilation
npm run lint            # Run ESLint
npm run format:check    # Check Prettier formatting
```

---

## Configuration

### ESLint Configuration (.eslintrc.json)

The project includes strict ESLint rules for code quality:

- **React Rules**: Hook exhaustive dependency arrays, proper hook usage
- **TypeScript Rules**: No unused variables, strict null checking
- **Import Rules**: Alphabetical ordering, React imports first
- **Code Quality**: No console.log except warn/error

View: [.eslintrc.json](.eslintrc.json)

### Prettier Configuration (.prettierrc.json)

Automatic code formatting with:

- Single quotes for strings
- 2-space indentation
- 100-character line width
- Trailing commas (ES5)
- Always add semicolons

View: [.prettierrc.json](.prettierrc.json)

### Husky Git Hooks

Automatic code quality checks before commits:

**Pre-commit Hook** (`.husky/pre-commit`):
- Runs Prettier on staged files
- Runs ESLint on staged TypeScript files
- Blocks commit if ESLint errors detected
- Auto-stages formatted files

**Commit Message Hook** (`.husky/commit-msg`):
- Validates commit message format: `type(scope): message`
- Examples: `feat(modals): add focus trap`, `fix(api): handle errors`
- Types: feat, fix, docs, style, refactor, test, chore, perf

### Vercel Security Headers (vercel.json)

Production security hardening:

- **Content-Security-Policy**: Restricts script/style sources
- **X-Content-Type-Options**: Prevents MIME sniffing
- **X-Frame-Options**: Prevents clickjacking (DENY)
- **X-XSS-Protection**: Legacy XSS protection
- **Strict-Transport-Security**: Enforces HTTPS
- **Permissions-Policy**: Disables unnecessary browser features
- **Referrer-Policy**: Strict referrer handling
- **Cache-Control**: Immutable cache for static assets

View: [vercel.json](vercel.json)

---

## Developer Tools

### Linting

```bash
# Check for code quality issues
npm run lint

# Auto-fix fixable issues
npm run lint:fix
```

**Common ESLint Fixes**:
- Unused variables: Prefix with underscore to ignore
- Hook dependencies: Add missing dependencies
- Import ordering: React first, then packages, then local imports

### Formatting

```bash
# Format all TypeScript/JSON files
npm run format

# Check formatting without changes
npm run format:check
```

**Format on Save** (VS Code):
Add to `.vscode/settings.json`:
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.formatOnSave": true
  }
}
```

### Type Checking

```bash
# Run TypeScript compiler without emitting files
npm run type-check
```

Ensure all TypeScript errors are fixed before committing.

### Pre-Commit Workflow

The Husky hook automatically:

1. **Formats** staged files with Prettier
2. **Lints** TypeScript files with ESLint
3. **Blocks commit** if errors detected
4. **Re-stages** formatted files

Manual Husky commands:

```bash
# Initialize Husky (run after first clone)
npx husky install

# Create new hook
npx husky add .husky/hook-name "command"

# Test pre-commit hook
npm run lint
```

---

## Observability & Error Tracking

### Sentry Integration

Sentry captures production errors, performance metrics, and user sessions.

#### 1. Get Sentry Project DSN

1. Create account at [sentry.io](https://sentry.io)
2. Create new React project
3. Copy the **Data Source Name (DSN)**

#### 2. Set Environment Variable

Create `.env.local`:

```bash
VITE_SENTRY_DSN=https://your-key@sentry.io/your-project-id
VITE_SENTRY_ENV=development
```

Or for production (`.env.production`):

```bash
VITE_SENTRY_DSN=https://your-key@sentry.io/your-project-id
VITE_SENTRY_ENV=production
```

#### 3. Initialize in App.tsx

Add to `App.tsx` root:

```typescript
import { initializeSentry } from './services/observability';

// Call at app initialization (before React render)
initializeSentry();

function App() {
  return (
    // Your app components...
  );
}
```

#### 4. Use Observability Service

```typescript
import observability from './services/observability';

// Capture exceptions
try {
  someRiskyOperation();
} catch (error) {
  observability.captureException(error);
}

// Add breadcrumbs for context
observability.addBreadcrumb({
  message: 'User clicked booking',
  category: 'user-action',
});

// Set user context
observability.setUserContext({
  id: user.id,
  email: user.email,
  username: user.name,
});

// Track transactions/spans
const transaction = observability.startTransaction('page-load');
// ... do work ...
observability.finishTransaction(transaction);
```

#### Sentry Environment Presets

Configuration automatically selects based on `VITE_SENTRY_ENV`:

- **development**: 100% sampling, all errors captured, console logs
- **staging**: 50% sampling, full replay, performance monitoring
- **production**: 10% sampling, errors & crashes only, 100% replay on errors

### LogRocket Integration (Optional)

For additional session replay:

```typescript
import LogRocket from 'logrocket';

// Initialize
LogRocket.init('app/key', {
  console: { shouldAggregateConsoleErrors: true },
});

// Log user
LogRocket.identify(userId, {
  name: userEmail,
  subscriptionType: 'paid',
});

// Capture custom events
LogRocket.getSessionURL((sessionURL) => {
  console.error(`LogRocket Session: ${sessionURL}`);
});
```

### Performance Tracing

Use the performance tracer service for custom metrics:

```typescript
import { performanceTracer } from './services/performanceTracing';

// Measure arbitrary operations
const traceId = performanceTracer.startTrace('data-fetch');
const data = await fetchData();
performanceTracer.endTrace(traceId);

// Track API calls
performanceTracer.trackApiCall(
  '/api/bookings',
  'POST',
  duration,
  200,
  { bookingId: '123' }
);

// Track user actions
performanceTracer.trackUserAction('click', 'booking-button');

// Generate reports
const report = performanceTracer.generateReport();
```

---

## First-Time Setup

Follow these steps when cloning the repository:

### 1. Install Dependencies

```bash
npm install
```

### 2. Initialize Husky

```bash
npx husky install
```

### 3. Set Up Environment Variables

Create `.env.local`:

```bash
# Sentry (optional)
VITE_SENTRY_DSN=
VITE_SENTRY_ENV=development

# API endpoints
VITE_API_URL=http://localhost:3000

# Other configs
VITE_APP_VERSION=0.0.0
```

### 4. Verify Setup

```bash
# Check TypeScript
npm run type-check

# Check linting
npm run lint

# Check formatting
npm run format:check

# Try pre-commit
npm run lint
```

### 5. Make a Test Commit

```bash
git add .
git commit -m "chore: initial setup"
```

The Husky hook should run Prettier + ESLint automatically.

---

## Troubleshooting

### Husky Hooks Not Running

**Problem**: Pre-commit hook not executing

**Solutions**:
```bash
# Reinitialize Husky
npx husky install

# Check hook permissions
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg

# Verify git hooks
ls -la .git/hooks/
```

### ESLint Conflicts with Prettier

**Problem**: ESLint and Prettier rules conflict

**Solution**: Already configured! `.eslintrc.json` extends `prettier` to disable conflicting rules.

Verify:
```bash
npm run lint:fix
npm run format
npm run lint  # Should have no errors
```

### Pre-commit Hook Blocking Valid Commits

**Problem**: Hook failing on legitimate code

**Solutions**:
```bash
# Fix issues automatically
npm run lint:fix
npm run format

# Then retry commit
git commit -m "feat: your message"

# Or skip hook (only in emergencies)
git commit --no-verify
```

### Sentry Not Capturing Errors

**Problem**: Errors not appearing in Sentry dashboard

**Checklist**:
- [ ] `VITE_SENTRY_DSN` set in `.env.local`
- [ ] `initializeSentry()` called in `App.tsx`
- [ ] Error actually thrown (check browser console)
- [ ] Network tab shows request to sentry.io
- [ ] Project DSN matches Sentry project

**Debug**:
```typescript
import observability from './services/observability';

observability.captureMessage('Test error from app');
// Check Sentry dashboard for message
```

### TypeScript Errors in IDE but Build Succeeds

**Problem**: Editor shows TypeScript errors but build works

**Solution**:
```bash
npm run type-check
```

Review and fix errors. If errors only in IDE:
- Reload TypeScript server: Ctrl+Shift+P → "TypeScript: Restart TS Server"
- Check `tsconfig.json` is correct
- Verify TypeScript version: `npx tsc --version`

### Performance Monitoring Not Working

**Problem**: Web Vitals not being tracked

**Solutions**:
```bash
# Verify monitor is initialized in App.tsx
npm run type-check

# Check browser console for metrics
# Look for: "⏱️ Web Vitals Report"

# View in Performance panel: F12 → Performance
```

---

## Best Practices

### Commit Messages

Follow the commit message format for consistency:

```
type(scope): message

Optional longer description

Closes #issue-number
```

**Types**: feat, fix, docs, style, refactor, test, chore, perf

**Examples**:
- `feat(modals): add focus trap for accessibility`
- `fix(images): handle missing alt text`
- `perf(bundle): lazy-load satellite pages`
- `docs(readme): update setup instructions`

### Code Quality Workflow

```bash
# 1. Make changes
# 2. Format and lint
npm run format
npm run lint:fix

# 3. Type check
npm run type-check

# 4. Commit (hooks run automatically)
git commit -m "feat(component): add feature"

# 5. Push
git push origin feature-branch
```

### Error Handling

Always use Sentry for error tracking:

```typescript
try {
  // risky operation
} catch (error) {
  observability.captureException(error);
  // User-friendly error display
}
```

### Performance Profiling

Monitor performance during development:

```typescript
import { performanceTracer } from './services/performanceTracing';

// Wrap slow operations
const traceId = performanceTracer.startTrace('expensive-render');
// ... render logic ...
performanceTracer.endTrace(traceId, { componentName: 'Dashboard' });
```

---

## Resources

- **ESLint**: [eslint.org](https://eslint.org)
- **Prettier**: [prettier.io](https://prettier.io)
- **Husky**: [typicode.github.io/husky](https://typicode.github.io/husky)
- **Sentry**: [sentry.io/docs](https://docs.sentry.io)
- **TypeScript**: [typescriptlang.org](https://www.typescriptlang.org)
- **React Hooks**: [react.dev/reference/react](https://react.dev/reference/react)

---

**Last Updated**: 2024  
**Version**: 1.0.0  
**Maintained By**: Development Team
