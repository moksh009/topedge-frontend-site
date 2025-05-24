/**
 * Meta Pixel Event Tracking Utility
 * 
 * This utility provides functions to track various Meta Pixel events
 * throughout the application. It ensures that fbq is available before
 * attempting to track events.
 */

// Define common event types for better type safety
export type MetaPixelStandardEvent = 
  | 'PageView'
  | 'Lead' 
  | 'Contact'
  | 'CompleteRegistration'
  | 'Schedule'
  | 'Subscribe'
  | 'ViewContent';

/**
 * Track a standard Meta Pixel event
 * @param eventName The name of the standard event to track
 * @param params Optional parameters to include with the event
 */
export const trackEvent = (eventName: MetaPixelStandardEvent, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    if (params) {
      window.fbq('track', eventName, params);
    } else {
      window.fbq('track', eventName);
    }
    console.log(`Meta Pixel event tracked: ${eventName}`, params || '');
  } else {
    console.warn('Meta Pixel not available to track event:', eventName);
  }
};

/**
 * Track a lead conversion
 * @param source Optional source of the lead
 */
export const trackLead = (source?: string) => {
  trackEvent('Lead', source ? { source } : undefined);
};

/**
 * Track a contact form submission
 * @param formType Optional type of contact form
 */
export const trackContact = (formType?: string) => {
  trackEvent('Contact', formType ? { form_type: formType } : undefined);
};

/**
 * Track when a user schedules a meeting or demo
 * @param meetingType Type of meeting scheduled
 */
export const trackSchedule = (meetingType: string) => {
  trackEvent('Schedule', { meeting_type: meetingType });
};

/**
 * Track when a user views important content
 * @param contentName Name of the content being viewed
 * @param contentType Type of content (e.g., 'product', 'blog', 'pricing')
 */
export const trackViewContent = (contentName: string, contentType: string) => {
  trackEvent('ViewContent', {
    content_name: contentName,
    content_type: contentType
  });
};

/**
 * Track when a user completes registration
 * @param method Registration method used
 */
export const trackCompleteRegistration = (method?: string) => {
  trackEvent('CompleteRegistration', method ? { method } : undefined);
};
