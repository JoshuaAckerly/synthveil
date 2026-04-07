/**
 * Google Analytics 4 Event Tracking for Synthveil
 */

declare global {
    interface Window {
        gtag?: Function;
    }
}

/**
 * Track a form submission event
 */
export const trackFormSubmission = (formName: string, metadata?: Record<string, string | number>) => {
    if (window.gtag) {
        window.gtag('event', 'form_submit', {
            form_name: formName,
            ...metadata,
        });
    }
};

/**
 * Track a button click event
 */
export const trackButtonClick = (buttonName: string, category?: string) => {
    if (window.gtag) {
        window.gtag('event', 'button_click', {
            button_name: buttonName,
            button_category: category || 'general',
        });
    }
};

/**
 * Track engagement events
 */
export const trackEngagement = (eventName: string, category: string, label?: string) => {
    if (window.gtag) {
        window.gtag('event', eventName, {
            event_category: category,
            event_label: label,
        });
    }
};

/**
 * Track a CTA click (call-to-action)
 */
export const trackCTAClick = (ctaName: string, destination?: string) => {
    if (window.gtag) {
        window.gtag('event', 'cta_click', {
            cta_name: ctaName,
            destination: destination || 'unknown',
        });
    }
};
