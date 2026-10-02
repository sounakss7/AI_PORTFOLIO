// Google Analytics 4 (GA4) Telemetry & Event Tracker Helper
// Measurement ID: G-Z98VYW3CMF

export const GA_MEASUREMENT_ID = 'G-Z98VYW3CMF';

/**
 * Safely send custom event telemetry to Google Analytics 4
 * @param {string} eventName 
 * @param {Record<string, unknown>} params 
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, {
        ...params,
        timestamp: new Date().toISOString(),
      });
    } catch {
      // Gracefully handle any browser or ad-blocker restrictions
    }
  }
};

/**
 * Track SPA virtual page or section navigation
 * @param {string} sectionName 
 */
export const trackSectionView = (sectionName) => {
  trackEvent('view_section', {
    section_name: sectionName,
  });
};
