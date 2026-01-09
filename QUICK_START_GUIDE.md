# Quick Start Guide - MANYATTAke Frontend

Get up and running in minutes with this quick reference guide.

## 1️⃣ Installation (5 minutes)

```bash
# Clone repository and install dependencies
git clone <repo>
cd MANYATTAke
npm install

# Install dev tools
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks prettier husky lint-staged

# Install error tracking
npm install @sentry/react @sentry/tracing

# Initialize Husky
npx husky install
```

## 2️⃣ Environment Setup (2 minutes)

Create `.env.local`:
```bash
VITE_SENTRY_DSN=https://your-key@sentry.io/your-project-id
VITE_SENTRY_ENV=development
```

## 3️⃣ Verify Setup (1 minute)

```bash
npm run type-check      # TypeScript check
npm run lint            # ESLint check  
npm run format:check    # Prettier check
npm run dev             # Start dev server
```

If all pass ✅ → You're ready to develop!

---

## Daily Development Commands

```bash
# Start development
npm run dev

# Format code
npm run format

# Fix linting issues
npm run lint:fix

# Type check
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feat/your-feature

# Make changes and commit
git add .
git commit -m "feat(scope): description"
# Husky runs automatically:
# - Prettier formatting
# - ESLint validation
# - Commit message validation

# Push
git push origin feat/your-feature
```

## Commit Message Format

```
type(scope): message

type = feat|fix|docs|style|refactor|test|chore|perf
scope = component|page|service|hook|etc
```

Examples:
- `feat(modals): add keyboard navigation`
- `fix(images): handle missing alt text`
- `perf(bundle): lazy-load pages`

---

## Key Files to Know

| File | Purpose |
|------|---------|
| [tokens.ts](tokens.ts) | Design system (colors, spacing, typography) |
| [.eslintrc.json](.eslintrc.json) | Code quality rules |
| [.prettierrc.json](.prettierrc.json) | Code formatting |
| [COMPONENT_LIBRARY_CHECKLIST.md](COMPONENT_LIBRARY_CHECKLIST.md) | Component standards |
| [DEV_SETUP.md](DEV_SETUP.md) | Complete setup guide |
| [SENTRY_SETUP.md](SENTRY_SETUP.md) | Error tracking setup |

---

## Common Tasks

### Use Design Tokens
```typescript
import { COLORS, SPACING, TYPOGRAPHY } from '../tokens';

const MyComponent = () => (
  <div style={{ color: COLORS.primary, padding: SPACING[4] }}>
    <h1 style={TYPOGRAPHY.heading1}>Title</h1>
  </div>
);
```

### Lazy Load Components
```typescript
import { withLazyLoading } from '../utils/codeSplitting';

const LargeComponent = withLazyLoading(
  () => import('./LargeComponent'),
  'Loading...'
);
```

### Track Errors (Sentry)
```typescript
import observability from '../services/observability';

try {
  riskyOperation();
} catch (error) {
  observability.captureException(error);
}
```

### Use Accessibility Hooks
```typescript
import { useFocusTrap, useEscapeKey } from '../hooks/useAccessibility';

const Modal = ({ onClose }) => {
  const modalRef = useRef(null);
  useFocusTrap(modalRef);
  useEscapeKey(onClose);
  
  return <div ref={modalRef}>Modal content</div>;
};
```

### Monitor Performance
```typescript
import { performanceTracer } from '../services/performanceTracing';

const traceId = performanceTracer.startTrace('data-fetch');
const data = await fetchData();
performanceTracer.endTrace(traceId);
```

---

## Troubleshooting

### Hooks not running?
```bash
npx husky install
chmod +x .husky/pre-commit
```

### ESLint errors?
```bash
npm run lint:fix
```

### Type errors?
```bash
npm run type-check
```

### Prettier conflicts?
Already fixed! ESLint extends prettier config.

---

## Production Deployment

### Before Deploy
```bash
npm run build        # Build
npm run lint         # Check quality
npm run type-check   # Check types
```

### Environment Variables
```bash
VITE_SENTRY_DSN=<your-production-dsn>
VITE_SENTRY_ENV=production
```

### Verify
- ✅ All tests pass
- ✅ No lint errors
- ✅ No TypeScript errors
- ✅ Performance metrics good
- ✅ Security headers set

---

## Resources

📚 **Documentation**
- [Complete Guide](COMPLETE_IMPLEMENTATION_GUIDE.md)
- [Dev Setup](DEV_SETUP.md)
- [Sentry Integration](SENTRY_SETUP.md)
- [Component Checklist](COMPONENT_LIBRARY_CHECKLIST.md)

🔗 **External**
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Vite Docs](https://vitejs.dev)
- [Sentry Docs](https://docs.sentry.io)

---

## Questions?

1. Check documentation files
2. Review code examples in components/
3. Check console for error messages
4. Review Sentry dashboard for errors

**Version**: 1.0.0  
**Updated**: 2024
