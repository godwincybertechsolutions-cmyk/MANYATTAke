# Component Library Consistency Checklist

Use this checklist when creating or modifying components to ensure consistency across the codebase.

## 📋 Pre-Implementation

- [ ] Is this a new component or modifying existing?
- [ ] Check if similar component already exists
- [ ] Design token colors/sizing available?
- [ ] Check naming convention (PascalCase for components)

---

## 🎨 Styling

- [ ] Use `tokens.ts` for all colors
- [ ] Use `SPACING` for margins/padding
- [ ] Use `TYPOGRAPHY` for fonts/sizes
- [ ] Use `SHADOWS` for elevation
- [ ] Use `TRANSITIONS` for animations
- [ ] Consistent border radius (use `BORDER_RADIUS`)
- [ ] Mobile responsive (test sm, md, lg breakpoints)

**Example**:
```tsx
import { COLORS, SPACING, TYPOGRAPHY } from '../tokens';

const MyComponent = () => (
  <div style={{ 
    color: COLORS.primary,
    padding: SPACING[6],
    fontFamily: TYPOGRAPHY.fontFamily.sans,
  }}>
    Content
  </div>
);
```

---

## ♿ Accessibility

- [ ] All interactive elements keyboard accessible?
- [ ] Proper ARIA roles assigned?
- [ ] Form labels associated with inputs?
- [ ] Images have alt text?
- [ ] Links have descriptive text?
- [ ] Focus indicators visible?
- [ ] Color not only indicator (use icons/text too)?
- [ ] Text contrast WCAG AA (4.5:1)?
- [ ] Screen reader tested?

**Checklist**:
```tsx
// Good
<button aria-label="Close dialog">✕</button>
<img src="..." alt="Description" />

// Bad
<button>✕</button>
<img src="..." />
```

---

## 🔧 TypeScript

- [ ] All props typed with `interface`?
- [ ] Return type specified (`React.FC<Props>`)?
- [ ] No `any` types used?
- [ ] Optional props marked with `?`
- [ ] Union types for variants?
- [ ] Enums for constants?

**Example**:
```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ variant, size = 'md', onClick }) => {
  // Component
};
```

---

## 📦 Code Quality

- [ ] No console.log (except errors/warnings)?
- [ ] Comments for complex logic?
- [ ] Functions under 50 lines?
- [ ] Single responsibility principle?
- [ ] DRY (Don't Repeat Yourself)?
- [ ] Imports organized (React first)?
- [ ] No dead code?
- [ ] No prop drilling (use Context if needed)?

---

## 🖼️ Images & Media

- [ ] Using `OptimizedImage` component?
- [ ] Responsive sizes specified?
- [ ] Priority set for above-fold content?
- [ ] Alt text descriptive?
- [ ] Lazy loading for below-fold?

**Example**:
```tsx
<OptimizedImage
  src="/assets/image.jpg"
  alt="Product feature"
  sizes="(max-width: 640px) 100vw, 80vw"
  priority={true}  // For hero images
/>
```

---

## 🎯 Performance

- [ ] No unnecessary re-renders?
- [ ] useCallback for event handlers?
- [ ] useMemo for expensive computations?
- [ ] No inline objects/arrays in JSX?
- [ ] Lazy-load heavy components?
- [ ] No render-blocking scripts?

---

## 🧪 Testing Readiness

- [ ] Component isolated (no external dependencies)?
- [ ] Props clearly documented?
- [ ] Error states handled?
- [ ] Loading states shown?
- [ ] Empty states handled?

---

## 📝 Documentation

- [ ] Component has JSDoc comment?
- [ ] Props documented?
- [ ] Usage example provided?
- [ ] Known limitations documented?

**Example**:
```tsx
/**
 * Button component with variants
 * @param variant - Button style variant (primary/secondary)
 * @param size - Button size (sm/md/lg)
 * @param onClick - Click handler
 * 
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 */
const Button: React.FC<ButtonProps> = ({ ... }) => {
  // Component
};
```

---

## 🔒 Security

- [ ] No XSS vulnerabilities (sanitize user input)?
- [ ] No sensitive data in logs?
- [ ] Environment variables for secrets?
- [ ] CSRF protection for forms?
- [ ] Input validation?

---

## 🚀 Performance Checklist (Dev Tools)

Before merging:

1. **Lighthouse Audit**
   - [ ] Performance > 90
   - [ ] Accessibility > 95
   - [ ] Best Practices > 90

2. **Bundle Analysis**
   - [ ] Component doesn't inflate bundle significantly
   - [ ] Heavy dependencies lazy-loaded?

3. **Chrome DevTools**
   - [ ] No warnings in Console
   - [ ] No React warnings
   - [ ] Performance timeline clean

---

## 📱 Cross-Browser Testing

- [ ] Works on Chrome (latest)
- [ ] Works on Firefox (latest)
- [ ] Works on Safari (latest)
- [ ] Works on mobile browsers
- [ ] Touch interactions work on mobile

---

## 🎨 Design System Alignment

- [ ] Follows existing patterns?
- [ ] Uses established spacing system?
- [ ] Uses established color palette?
- [ ] Typography consistent?
- [ ] Animation speed matches system?

**Resources**:
- Colors: `tokens.ts` → `COLORS`
- Spacing: `tokens.ts` → `SPACING`
- Typography: `tokens.ts` → `TYPOGRAPHY`
- Examples: `IMPLEMENTATION_EXAMPLES.tsx`

---

## ✅ Final Checklist Before Merge

- [ ] ESLint passes: `npm run lint`
- [ ] Prettier formatted: `npm run format`
- [ ] TypeScript strict: `npm run type-check`
- [ ] No console errors
- [ ] Accessibility audit passed
- [ ] Responsive design tested
- [ ] Documentation complete
- [ ] Component story/example provided
- [ ] Tested in production build
- [ ] Ready for code review

---

## 🚀 Component Template

Use this template for new components:

```tsx
import React from 'react';
import { COLORS, SPACING, TYPOGRAPHY } from '../tokens';

/**
 * MyComponent - Brief description
 * @param prop1 - Description
 * @example
 * <MyComponent prop1="value" />
 */
interface MyComponentProps {
  prop1: string;
  prop2?: number;
  onClick?: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({
  prop1,
  prop2 = 0,
  onClick,
}) => {
  return (
    <div
      style={{
        color: COLORS.dark,
        padding: SPACING[4],
        fontFamily: TYPOGRAPHY.fontFamily.sans,
      }}
      role="region"
      aria-label={prop1}
    >
      {prop1}
    </div>
  );
};

export default MyComponent;
```

---

## 📞 Questions?

- Design tokens: See `tokens.ts`
- Accessibility: See `PERFORMANCE_AND_ACCESSIBILITY_GUIDE.md`
- Performance: See `PERF_CHEAT_SHEET.md`
- Examples: See `IMPLEMENTATION_EXAMPLES.tsx`

---

**Last Updated**: January 9, 2026
**Version**: 1.0
