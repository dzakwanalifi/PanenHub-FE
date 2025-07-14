'use client';
import { useEffect } from 'react';

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') {
      return;
    }

    // Performance monitoring hanya di production
    if (process.env.NODE_ENV !== 'production') {
      console.log('Performance monitoring disabled in development');
      return;
    }

    // Web Vitals monitoring
    const observePerformance = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            for (const entry of entries) {
              if (entry.entryType === 'largest-contentful-paint') {
                logMetric({
                  name: 'LCP',
                  value: entry.startTime,
                  timestamp: Date.now()
                });
              }
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // First Input Delay (FID)
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            for (const entry of entries) {
              if (entry.entryType === 'first-input') {
                const fidEntry = entry as any; // Type assertion untuk FID
                logMetric({
                  name: 'FID',
                  value: fidEntry.processingStart - fidEntry.startTime,
                  timestamp: Date.now()
                });
              }
            }
          });
          fidObserver.observe({ entryTypes: ['first-input'] });

          // Cumulative Layout Shift (CLS)
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            for (const entry of entries) {
              const clsEntry = entry as any; // Type assertion untuk CLS
              if (entry.entryType === 'layout-shift' && !clsEntry.hadRecentInput) {
                clsValue += clsEntry.value;
              }
            }
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });

          // Log CLS on page unload
          window.addEventListener('beforeunload', () => {
            logMetric({
              name: 'CLS',
              value: clsValue,
              timestamp: Date.now()
            });
          });

        } catch (error) {
          console.log('Performance monitoring setup failed:', error);
        }
      }

      // Navigation timing
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigation) {
            logMetric({
              name: 'TTFB',
              value: navigation.responseStart - navigation.requestStart,
              timestamp: Date.now()
            });

            logMetric({
              name: 'Load Time',
              value: navigation.loadEventEnd - navigation.fetchStart,
              timestamp: Date.now()
            });
          }
        }, 0);
      });
    };

    const logMetric = (metric: PerformanceMetric) => {
      console.log(`Performance Metric - ${metric.name}:`, metric.value);
      
      // Di production, kirim ke analytics service
      if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
        try {
          // Simpan ke localStorage untuk batching
          const metrics = JSON.parse(localStorage.getItem('performance_metrics') || '[]');
          metrics.push(metric);
          
          // Keep only last 50 metrics
          if (metrics.length > 50) {
            metrics.splice(0, metrics.length - 50);
          }
          
          localStorage.setItem('performance_metrics', JSON.stringify(metrics));
          
          // Send batch jika sudah cukup banyak
          if (metrics.length >= 10) {
            sendMetricsBatch(metrics);
          }
        } catch (error) {
          console.error('Failed to store performance metrics:', error);
        }
      }
    };

    const sendMetricsBatch = async (metrics: PerformanceMetric[]) => {
      try {
        // Implement send to analytics service
        console.log('Sending performance metrics batch:', metrics);
        
        // Clear sent metrics - safe client-side check
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.removeItem('performance_metrics');
        }
      } catch (error) {
        console.error('Failed to send performance metrics:', error);
      }
    };

    // Monitor memory usage
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const memoryInfo = {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit
        };
        
        // Log jika memory usage tinggi
        const usagePercentage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
        if (usagePercentage > 80) {
          console.warn('High memory usage detected:', usagePercentage.toFixed(2) + '%', memoryInfo);
        }
      }
    };

    // Monitor error rate
    const errorHandler = (event: ErrorEvent) => {
      logMetric({
        name: 'JS Error',
        value: 1,
        timestamp: Date.now()
      });
      
      console.error('JavaScript Error:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
    };

    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      logMetric({
        name: 'Unhandled Promise Rejection',
        value: 1,
        timestamp: Date.now()
      });
      
      console.error('Unhandled Promise Rejection:', event.reason);
    };

    // Setup monitoring
    observePerformance();
    
    // Memory monitoring every 30 seconds
    const memoryInterval = setInterval(monitorMemory, 30000);
    
    // Error monitoring
    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', unhandledRejectionHandler);

    return () => {
      clearInterval(memoryInterval);
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', unhandledRejectionHandler);
    };
  }, []);

  return null; // Tidak render apa-apa
}
