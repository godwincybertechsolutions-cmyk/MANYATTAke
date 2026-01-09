/**
 * Sentry Error Tracking & Observability
 * Captures errors, performance metrics, and user interactions
 */

// Note: Requires @sentry/react and @sentry/tracing packages
// Install: npm install @sentry/react @sentry/tracing

export interface SentryConfig {
  dsn: string;
  environment: 'development' | 'staging' | 'production';
  tracesSampleRate: number; // 0-1, recommended 0.1 for production
  attachStacktrace: boolean;
  beforeSend?: (event: any) => any;
}

/**
 * Initialize Sentry with configuration
 * Call this once in your app root (App.tsx or index.tsx)
 */
export function initializeSentry(config: SentryConfig) {
  try {
    // Dynamic import to avoid breaking if @sentry/react not installed
    require('@sentry/react');
    const Sentry = require('@sentry/react');

    Sentry.init({
      dsn: config.dsn,
      environment: config.environment,
      tracesSampleRate: config.tracesSampleRate,
      attachStacktrace: config.attachStacktrace,
      integrations: [
        new Sentry.Replay({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      replaysSessionSampleRate: 0.1, // 10% of sessions
      replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
      beforeSend(event, hint) {
        // Filter out development errors if not in dev
        if (config.environment !== 'development' && hint.originalException instanceof Error) {
          if (hint.originalException.message.includes('ChunkLoadError')) {
            return null; // Ignore chunk load errors in production
          }
        }
        return config.beforeSend ? config.beforeSend(event) : event;
      },
    });

    console.log('✅ Sentry initialized');
  } catch (error) {
    console.warn('⚠️ Sentry not initialized:', error);
  }
}

/**
 * Capture custom exception
 */
export function captureException(error: Error, context?: Record<string, any>) {
  try {
    const Sentry = require('@sentry/react');
    Sentry.captureException(error, {
      contexts: {
        custom: context,
      },
    });
  } catch (e) {
    console.error('Failed to capture exception:', error);
  }
}

/**
 * Capture custom message
 */
export function captureMessage(
  message: string,
  level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' = 'info',
  context?: Record<string, any>
) {
  try {
    const Sentry = require('@sentry/react');
    Sentry.captureMessage(message, level);

    if (context) {
      Sentry.setContext('custom', context);
    }
  } catch (e) {
    console.log(message, level);
  }
}

/**
 * Set user context for error tracking
 */
export function setUserContext(userId: string, email?: string, username?: string) {
  try {
    const Sentry = require('@sentry/react');
    Sentry.setUser({
      id: userId,
      email,
      username,
    });
  } catch (e) {
    console.warn('Failed to set user context:', e);
  }
}

/**
 * Clear user context (e.g., on logout)
 */
export function clearUserContext() {
  try {
    const Sentry = require('@sentry/react');
    Sentry.setUser(null);
  } catch (e) {
    console.warn('Failed to clear user context:', e);
  }
}

/**
 * Add breadcrumb for tracking user actions
 */
export function addBreadcrumb(
  message: string,
  level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' = 'info',
  category?: string,
  data?: Record<string, any>
) {
  try {
    const Sentry = require('@sentry/react');
    Sentry.addBreadcrumb({
      message,
      level,
      category: category || 'user-action',
      data,
      timestamp: Date.now() / 1000,
    });
  } catch (e) {
    // Silently fail if Sentry not initialized
  }
}

/**
 * Start performance transaction
 */
export function startTransaction(name: string, op?: string) {
  try {
    const Sentry = require('@sentry/react');
    return Sentry.startTransaction({
      name,
      op: op || 'http.request',
    });
  } catch (e) {
    console.warn('Failed to start transaction:', e);
    return null;
  }
}

/**
 * Finish transaction
 */
export function finishTransaction(transaction: any, status: 'ok' | 'cancelled' | 'unknown' | 'not_found' | 'permission_denied' | 'invalid_argument' | 'deadline_exceeded' | 'not_found' | 'already_exists' | 'permission_denied' | 'resource_exhausted' | 'failed_precondition' | 'aborted' | 'out_of_range' | 'unimplemented' | 'internal' | 'unavailable' | 'data_loss' | 'unauthenticated' = 'ok') {
  if (transaction) {
    try {
      transaction.setStatus(status);
      transaction.finish();
    } catch (e) {
      console.warn('Failed to finish transaction:', e);
    }
  }
}

/**
 * Sentry configuration preset for different environments
 */
export const SENTRY_PRESETS = {
  development: (): SentryConfig => ({
    dsn: process.env.REACT_APP_SENTRY_DSN || '',
    environment: 'development',
    tracesSampleRate: 1.0, // 100% in development
    attachStacktrace: true,
  }),

  staging: (): SentryConfig => ({
    dsn: process.env.REACT_APP_SENTRY_DSN || '',
    environment: 'staging',
    tracesSampleRate: 0.5, // 50% in staging
    attachStacktrace: true,
  }),

  production: (): SentryConfig => ({
    dsn: process.env.REACT_APP_SENTRY_DSN || '',
    environment: 'production',
    tracesSampleRate: 0.1, // 10% in production
    attachStacktrace: false,
    beforeSend: (event) => {
      // Additional filtering for production
      if (event.exception) {
        // Don't send network errors (usually not actionable)
        const error = event.exception.values?.[0]?.value || '';
        if (error.includes('NetworkError') || error.includes('Failed to fetch')) {
          return null;
        }
      }
      return event;
    },
  }),
};

/**
 * Hook-friendly exports
 */
export const observabilityService = {
  initializeSentry,
  captureException,
  captureMessage,
  setUserContext,
  clearUserContext,
  addBreadcrumb,
  startTransaction,
  finishTransaction,
};

export default observabilityService;
