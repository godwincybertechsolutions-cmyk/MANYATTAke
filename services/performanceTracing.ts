/**
 * Performance Tracing & Analytics
 * Tracks performance metrics, user interactions, and API calls
 */

import { webVitalsMonitor } from './webVitalsMonitor';

export interface PerformanceTrace {
  name: string;
  duration: number;
  startTime: number;
  endTime: number;
  metadata?: Record<string, any>;
}

export interface AnalyticsEvent {
  name: string;
  category: string;
  value?: number;
  label?: string;
  metadata?: Record<string, any>;
}

class PerformanceTracer {
  private traces: Map<string, PerformanceTrace> = new Map();
  private events: AnalyticsEvent[] = [];
  private analyticsCallback?: (event: AnalyticsEvent) => void;

  /**
   * Start measuring a performance trace
   */
  startTrace(name: string): string {
    const traceId = `${name}-${Date.now()}`;
    const startTime = performance.now();

    this.traces.set(traceId, {
      name,
      duration: 0,
      startTime,
      endTime: 0,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`⏱️  Trace started: ${name}`);
    }

    return traceId;
  }

  /**
   * End a performance trace
   */
  endTrace(traceId: string, metadata?: Record<string, any>): PerformanceTrace | null {
    const trace = this.traces.get(traceId);
    if (!trace) {
      console.warn(`Trace not found: ${traceId}`);
      return null;
    }

    const endTime = performance.now();
    trace.duration = endTime - trace.startTime;
    trace.endTime = endTime;
    trace.metadata = metadata;

    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Trace ended: ${trace.name} (${trace.duration.toFixed(2)}ms)`);
    }

    this.trackEvent({
      name: 'performance_trace',
      category: 'performance',
      value: trace.duration,
      label: trace.name,
      metadata,
    });

    return trace;
  }

  /**
   * Get all traces
   */
  getAllTraces(): Map<string, PerformanceTrace> {
    return new Map(this.traces);
  }

  /**
   * Get average duration for a trace type
   */
  getAverageTraceDuration(name: string): number {
    const matchingTraces = Array.from(this.traces.values()).filter((t) => t.name === name);

    if (matchingTraces.length === 0) return 0;

    const total = matchingTraces.reduce((sum, t) => sum + t.duration, 0);
    return total / matchingTraces.length;
  }

  /**
   * Track analytics event
   */
  trackEvent(event: AnalyticsEvent) {
    this.events.push({
      ...event,
      metadata: {
        ...event.metadata,
        timestamp: Date.now(),
      },
    });

    if (this.analyticsCallback) {
      this.analyticsCallback(event);
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Event: ${event.name} (${event.category})`);
    }
  }

  /**
   * Track page view
   */
  trackPageView(page: string, title?: string) {
    this.trackEvent({
      name: 'page_view',
      category: 'navigation',
      label: page,
      metadata: {
        page,
        title: title || document.title,
        url: window.location.href,
      },
    });
  }

  /**
   * Track user action (clicks, form submissions, etc.)
   */
  trackUserAction(action: string, element: string, metadata?: Record<string, any>) {
    this.trackEvent({
      name: 'user_action',
      category: 'engagement',
      label: action,
      metadata: {
        element,
        ...metadata,
      },
    });
  }

  /**
   * Track API call
   */
  trackApiCall(
    endpoint: string,
    method: string,
    duration: number,
    statusCode: number,
    metadata?: Record<string, any>
  ) {
    this.trackEvent({
      name: 'api_call',
      category: 'api',
      value: duration,
      label: endpoint,
      metadata: {
        endpoint,
        method,
        statusCode,
        ...metadata,
      },
    });
  }

  /**
   * Track error
   */
  trackError(errorType: string, message: string, metadata?: Record<string, any>) {
    this.trackEvent({
      name: 'error',
      category: 'error',
      label: errorType,
      metadata: {
        message,
        ...metadata,
      },
    });
  }

  /**
   * Set analytics callback
   */
  onEvent(callback: (event: AnalyticsEvent) => void) {
    this.analyticsCallback = callback;
  }

  /**
   * Get all events
   */
  getAllEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  /**
   * Get events by category
   */
  getEventsByCategory(category: string): AnalyticsEvent[] {
    return this.events.filter((e) => e.category === category);
  }

  /**
   * Generate analytics report
   */
  generateReport() {
    const vitals = webVitalsMonitor.generateReport();
    const performanceMetrics = {
      totalTraces: this.traces.size,
      totalEvents: this.events.length,
      avgTraceDuration: this.calculateAverageDuration(),
      eventsByCategory: this.getEventCategoryBreakdown(),
    };

    return {
      timestamp: Date.now(),
      webVitals: vitals,
      performance: performanceMetrics,
      events: this.events.slice(-100), // Last 100 events
    };
  }

  /**
   * Calculate average duration across all traces
   */
  private calculateAverageDuration(): number {
    const traces = Array.from(this.traces.values());
    if (traces.length === 0) return 0;
    const total = traces.reduce((sum, t) => sum + t.duration, 0);
    return total / traces.length;
  }

  /**
   * Get breakdown of events by category
   */
  private getEventCategoryBreakdown(): Record<string, number> {
    const breakdown: Record<string, number> = {};
    this.events.forEach((e) => {
      breakdown[e.category] = (breakdown[e.category] || 0) + 1;
    });
    return breakdown;
  }

  /**
   * Send report to backend
   */
  async sendReport(endpoint: string) {
    try {
      const report = this.generateReport();
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
        keepalive: true,
      });
    } catch (error) {
      console.error('Failed to send performance report:', error);
    }
  }

  /**
   * Clear all traces and events
   */
  clear() {
    this.traces.clear();
    this.events = [];
  }
}

// Singleton instance
export const performanceTracer = new PerformanceTracer();

/**
 * Hook for React components
 */
export function usePerformanceTrace(name: string) {
  const traceId = React.useRef<string>();

  React.useEffect(() => {
    traceId.current = performanceTracer.startTrace(name);

    return () => {
      if (traceId.current) {
        performanceTracer.endTrace(traceId.current);
      }
    };
  }, [name]);

  return {
    endTrace: (metadata?: Record<string, any>) => {
      if (traceId.current) {
        performanceTracer.endTrace(traceId.current, metadata);
      }
    },
  };
}

/**
 * Decorator for measuring function execution time
 */
export function measureTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const traceId = performanceTracer.startTrace(`${target.constructor.name}.${propertyKey}`);
    try {
      const result = originalMethod.apply(this, args);
      if (result instanceof Promise) {
        return result.finally(() => {
          performanceTracer.endTrace(traceId);
        });
      }
      performanceTracer.endTrace(traceId);
      return result;
    } catch (error) {
      performanceTracer.endTrace(traceId);
      throw error;
    }
  };

  return descriptor;
}

export default {
  performanceTracer,
  usePerformanceTrace,
  measureTime,
};

// Re-export React for usePerformanceTrace
import React from 'react';
