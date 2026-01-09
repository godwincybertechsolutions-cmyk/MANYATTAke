# Sentry Integration Guide for App.tsx

This file shows how to integrate Sentry error tracking and performance monitoring into your React application.

## Step 1: Update App.tsx Imports

Add these imports at the top of `App.tsx`:

```typescript
import React, { useEffect, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Import Sentry integration
import observability from './services/observability';

// Rest of imports...
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
```

## Step 2: Initialize Sentry in App Component

Add initialization in the main `App` component before any route rendering:

```typescript
const App: React.FC = () => {
  // Initialize Sentry on app mount
  useEffect(() => {
    // Initialize Sentry with your DSN from environment
    const sentryDSN = import.meta.env.VITE_SENTRY_DSN;
    const sentryEnv = import.meta.env.VITE_SENTRY_ENV || 'development';

    if (sentryDSN) {
      console.log(`🔍 Sentry initialized for ${sentryEnv} environment`);
      // observability.initializeSentry() is called automatically
    } else {
      console.warn('⚠️ VITE_SENTRY_DSN not configured - error tracking disabled');
    }

    // Track initial page view
    observability.trackEvent({
      name: 'app_initialized',
      category: 'lifecycle',
      metadata: {
        environment: sentryEnv,
        timestamp: Date.now(),
      },
    });
  }, []);

  // Setup Web Vitals monitoring (existing code)
  useEffect(() => {
    webVitalsMonitor.onReport((report) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('[Web Vitals Report]', report);
      }
      // Send to Sentry for production
      if (process.env.NODE_ENV === 'production') {
        observability.addBreadcrumb({
          message: `${report.name}: ${report.value.toFixed(2)}`,
          category: 'performance',
          level: 'info',
          data: { ...report },
        });
      }
    });
  }, []);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <ScrollToTop />
          <Navbar />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Your routes */}
            </Routes>
          </Suspense>
          <Footer />
          <SplashCursor />
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;
```

## Step 3: Environment Configuration

Create `.env.local` for development:

```bash
VITE_SENTRY_DSN=https://your-key@sentry.io/your-project-id
VITE_SENTRY_ENV=development
```

Create `.env.production` for production builds:

```bash
VITE_SENTRY_DSN=https://your-key@sentry.io/your-project-id
VITE_SENTRY_ENV=production
```

## Step 4: Update ErrorBoundary Component

Enhance [ErrorBoundary.tsx](ErrorBoundary.tsx) to report errors to Sentry:

```typescript
import React from 'react';
import observability from '../services/observability';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Report to Sentry
    observability.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });

    // Log for development
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong</h2>
          <p>Our team has been notified. Please try refreshing the page.</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## Step 5: Add Error Tracking to API Calls

Wrap API calls to track errors:

```typescript
const fetchData = async (url: string) => {
  const startTime = performance.now();

  try {
    const response = await fetch(url);
    const duration = performance.now() - startTime;

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Track successful API call
    observability.trackApiCall(url, 'GET', duration, response.status);
    return await response.json();
  } catch (error) {
    const duration = performance.now() - startTime;

    // Track API error
    observability.trackApiCall(url, 'GET', duration, 500, {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    // Report to Sentry
    observability.captureException(error, {
      tags: {
        apiCall: url,
      },
    });

    throw error;
  }
};
```

## Step 6: Track User Interactions

Add event tracking to important user actions:

```typescript
// In booking handler
const handleBooking = () => {
  observability.trackUserAction('submit', 'booking-form', {
    propertyType: 'mountain-villa',
  });

  // Perform booking...
};

// In page navigation
const handlePageChange = (page: string) => {
  observability.trackPageView(page, document.title);
  // Navigate...
};

// On user login
const handleLogin = (userId: string, email: string) => {
  observability.setUserContext({
    id: userId,
    email: email,
    username: email.split('@')[0],
  });
};
```

## Step 7: Performance Transaction Tracking

Wrap long-running operations:

```typescript
import { performanceTracer } from './services/performanceTracing';

const loadGallery = async () => {
  const traceId = performanceTracer.startTrace('gallery-load');

  try {
    const images = await fetchGalleryImages();
    performanceTracer.endTrace(traceId, {
      imageCount: images.length,
    });
    return images;
  } catch (error) {
    performanceTracer.endTrace(traceId);
    observability.captureException(error);
    throw error;
  }
};
```

## Step 8: Environment-Specific Configuration

Sentry automatically selects configuration based on `VITE_SENTRY_ENV`:

### Development (100% Sampling)
- All errors captured
- Full performance monitoring
- Session replays enabled
- Console logs visible

### Staging (50% Sampling)
- Most errors captured
- Performance monitoring active
- Full replays enabled
- Critical issues prioritized

### Production (10% Sampling)
- Only critical errors captured
- Limited performance monitoring
- Replays on errors only
- Privacy-focused

View the full config in [services/observability.ts](services/observability.ts)

## Verification Checklist

After setup, verify Sentry is working:

- [ ] Environment variables set in `.env.local`
- [ ] `import observability` added to `App.tsx`
- [ ] Sentry initialization code added to App component
- [ ] ErrorBoundary updated to report errors
- [ ] No TypeScript errors: `npm run type-check`
- [ ] No linting errors: `npm run lint`
- [ ] App builds successfully: `npm run build`
- [ ] Test error in browser console is captured in Sentry dashboard
- [ ] Page view events appear in Sentry Sessions

## Testing Sentry Integration

### Test Error Capture

In browser console:
```javascript
// Simulate error
throw new Error('Test error from console');
```

Check Sentry dashboard → Issues for the error.

### Test Event Tracking

```typescript
import observability from './services/observability';

observability.trackEvent({
  name: 'test_event',
  category: 'test',
  value: 42,
});
```

Check Sentry dashboard → Events for the custom event.

### Test Page Views

```typescript
import observability from './services/observability';

observability.trackPageView('/test-page', 'Test Page Title');
```

Check Sentry dashboard → Sessions for the page view.

## Troubleshooting

### "Sentry not capturing errors"

**Checklist**:
1. Verify `VITE_SENTRY_DSN` is set in `.env.local`
2. Check browser DevTools → Network tab for requests to sentry.io
3. Verify the DSN matches your Sentry project
4. Check [services/observability.ts](services/observability.ts) is properly initialized

### "Too many events in Sentry dashboard"

Sentry is working! This is normal for development. In production, the sampling rate is reduced to 10% automatically.

### "Environment not recognized"

Set `VITE_SENTRY_ENV=production` explicitly in `.env.production` file.

## Resources

- [Sentry React Documentation](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Environment Variables in Vite](https://vitejs.dev/guide/env-and-mode.html)
- [Sentry Session Replays](https://docs.sentry.io/platforms/javascript/session-replay/)
- [Error Reporting Best Practices](https://docs.sentry.io/product/error-monitoring/)

---

**Next Steps**:
1. Complete the setup steps above
2. Install dependencies: `npm install`
3. Initialize Husky: `npx husky install`
4. Test in development: `npm run dev`
5. Verify in Sentry dashboard
