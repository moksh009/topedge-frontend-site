import axios, { AxiosError } from 'axios';

export interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  date: string;
  time: string;
  additionalInfo?: string;
}

export interface ContactDetails {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  subject: string;
  message: string;
}

export interface MaintenanceDetails {
  name: string;
  email: string;
  phone: string;
  plan: string;
  emailTemplate?: string;
}

export type EmailType = 'user' | 'admin';

export class EmailService {
  private baseURL: string;
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';

    const envBaseURL =
      (typeof import.meta !== 'undefined' &&
        (import.meta as any).env &&
        (import.meta as any).env.VITE_EMAIL_API_BASE_URL) ||
      undefined;

    const defaultProdBase = 'https://topedge-backend-site-1.onrender.com';

    if (envBaseURL && typeof envBaseURL === 'string' && envBaseURL.trim().length > 0) {
      const trimmed = envBaseURL.trim();
      if (trimmed.includes('.netlify/functions')) {
        this.baseURL = this.isDevelopment ? 'http://localhost:3001' : defaultProdBase;
      } else {
        this.baseURL = trimmed.replace(/\/+$/, '');
      }
    } else {
      this.baseURL = this.isDevelopment ? 'http://localhost:3001' : defaultProdBase;
    }
  }

  private getFallbackBaseURL(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const origin = window.location.origin;
      const url = new URL(origin);
      const hostname = url.hostname;

      if (hostname === 'topedgeai.com' || hostname === 'www.topedgeai.com') {
        return 'https://topedge-backend-site-1.onrender.com';
      }

      return `${origin.replace(/\/+$/, '')}/.netlify/functions/api`;
    } catch {
      return null;
    }
  }

  async getPublicStats(): Promise<any> {
    const endpoints = [
      `${this.baseURL}/api/public-stats`,
      `${this.baseURL}/public-stats`,
    ];

    // Add Netlify Functions path (relative) if in browser
    if (typeof window !== 'undefined') {
       endpoints.push('/.netlify/functions/api/public-stats');
       endpoints.push('/.netlify/functions/api/api/public-stats');
    }

    // Add Production fallbacks (Render first, then legacy Netlify)
    endpoints.push('https://topedge-backend-site-1.onrender.com/api/public-stats');
    endpoints.push('https://topedge-backend-site-1.onrender.com/public-stats');
    endpoints.push('https://topedge-backend.netlify.app/api/public-stats');
    endpoints.push('https://topedge-backend.netlify.app/public-stats');

    for (const url of endpoints) {
      try {
        const response = await axios.get(url);
        if (response.data && (response.data.success || response.data.stats)) {
             return response.data;
        }
      } catch (e) {
        // Continue to next endpoint
      }
    }
    
    console.warn('[EmailService] All public stats fetch attempts failed');
    return null;
  }

  private async sendEmail(type: EmailType, endpoint: string, details: any): Promise<void> {
    const maxRetries = 3;
    let retryCount = 0;
    let url = `${this.baseURL}${endpoint}`;
    let usedFallback = false;
    
    while (retryCount < maxRetries) {
      try {
        console.log(`Sending ${type} email to endpoint:`, url);
        
        const response = await axios.post(url, details, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 30000,
          withCredentials: false,
          validateStatus: (status) => status >= 200 && status < 500
        });

        if (response.status !== 200) {
          throw new Error(`Failed to send ${type} email: ${response.statusText}`);
        }
        
        console.log(`${type} email sent successfully:`, response.data);
        return;
      } catch (error) {
        console.error(`Error sending ${type} email (attempt ${retryCount + 1}/${maxRetries}):`, error);

        if (error instanceof AxiosError) {
          if (error.response) {
            console.error('Error response:', {
              status: error.response.status,
              statusText: error.response.statusText,
              headers: error.response.headers,
              data: error.response.data
            });
            throw new Error(`Failed to send ${type} email: ${error.response.data?.message || error.message}`);
          } else if (error.request) {
            if (!usedFallback) {
              const fallbackBaseURL = this.getFallbackBaseURL();
              if (fallbackBaseURL) {
                url = `${fallbackBaseURL}${endpoint}`;
                usedFallback = true;
                retryCount = 0;
                console.warn(`Switching to fallback email API base URL for ${type} email:`, url);
                continue;
              }
            }

            if (retryCount < maxRetries - 1) {
              retryCount++;
              const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
              await new Promise(resolve => setTimeout(resolve, delay));
              continue;
            }
            throw new Error(`Failed to send ${type} email: No response from server after ${maxRetries} attempts`);
          }
        }
        throw new Error(`Failed to send ${type} email: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }

  public async sendBookingEmails(bookingDetails: BookingDetails): Promise<void> {
    try {
      await Promise.all([
        this.sendEmail('user', '/api/send-user-email', bookingDetails),
        this.sendEmail('admin', '/api/send-admin-email', bookingDetails)
      ]);
    } catch (error) {
      console.error('Error sending booking emails:', error);
      throw new Error('Failed to send booking confirmation emails');
    }
  }

  public async sendContactEmails(details: ContactDetails): Promise<void> {
    try {
      console.log('Sending contact form emails with details:', details);
      
      const [userEmailResult, adminEmailResult] = await Promise.allSettled([
        this.sendEmail('user', '/api/send-contact-user-email', details),
        this.sendEmail('admin', '/api/send-contact-admin-email', details)
      ]);
      
      const errors = [];
      if (userEmailResult.status === 'rejected') {
        errors.push(`User email failed: ${userEmailResult.reason}`);
      }
      if (adminEmailResult.status === 'rejected') {
        errors.push(`Admin email failed: ${adminEmailResult.reason}`);
      }
      
      if (errors.length > 0) {
        throw new Error(`Failed to send some emails: ${errors.join('; ')}`);
      }
      
      console.log('Both contact form emails sent successfully');
    } catch (error) {
      console.error('Error sending contact form emails:', error);
      throw new Error(`Failed to send contact form emails: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  public async sendAccessRequestUserEmail(details: {
    buyerName: string;
    buyerEmail: string;
    resourceTitle: string;
  }): Promise<void> {
    await this.sendEmail('user', '/api/access-request-user-email', details);
  }

  public async sendAccessRequestCreatorEmail(details: {
    creatorName: string;
    creatorEmail: string;
    buyerName: string;
    buyerEmail: string;
    resourceTitle: string;
    priceText?: string;
    approvalUrl: string;
  }): Promise<void> {
    await this.sendEmail('admin', '/api/access-request-creator-email', details);
  }

  public async sendAccessApprovedUserEmail(details: {
    buyerName: string;
    buyerEmail: string;
    resourceTitle: string;
    priceText?: string;
  }): Promise<void> {
    await this.sendEmail('user', '/api/access-approved-user-email', details);
  }

  public async sendAccessApprovedCreatorEmail(details: {
    creatorName: string;
    creatorEmail: string;
    buyerEmail: string;
    resourceTitle: string;
  }): Promise<void> {
    await this.sendEmail('admin', '/api/access-approved-creator-email', details);
  }

  public async sendMaintenanceUserEmail(details: MaintenanceDetails): Promise<void> {
    try {
      console.log('Sending maintenance user email with details:', details);
      await this.sendEmail('user', '/api/send-maintenance-user-email', {
        name: details.name,
        email: details.email,
        phone: details.phone,
        plan: details.plan,
        emailTemplate: details.emailTemplate
      });
      console.log('Maintenance user email sent successfully');
    } catch (error) {
      console.error('Error sending maintenance user email:', error);
      throw new Error('Failed to send maintenance user email');
    }
  }

  public async sendMaintenanceAdminEmail(details: MaintenanceDetails): Promise<void> {
    try {
      console.log('Sending maintenance admin email with details:', details);
      await this.sendEmail('admin', '/api/send-maintenance-admin-email', {
        name: details.name,
        email: details.email,
        phone: details.phone,
        plan: details.plan,
        emailTemplate: details.emailTemplate
      });
      console.log('Maintenance admin email sent successfully');
    } catch (error) {
      console.error('Error sending maintenance admin email:', error);
      throw new Error('Failed to send maintenance admin email');
    }
  }

  public async sendWelcomeEmail(email: string, name: string): Promise<void> {
    try {
      await this.sendEmail('user', '/api/send-welcome-email', {
        email,
        name
      });
    } catch (error) {
      console.error('Error sending welcome email:', error);
      // Non-blocking error for UI
    }
  }

  public async sendProfileReminderEmail(email: string, name: string, daysAgo: number): Promise<void> {
    try {
      await this.sendEmail('user', '/api/send-profile-reminder', {
        email,
        name,
        daysAgo
      });
    } catch (error) {
      console.error('Error sending profile reminder email:', error);
    }
  }

  public async sendResourceNudgeEmail(email: string, name: string): Promise<void> {
    try {
      await this.sendEmail('user', '/api/send-resource-nudge', {
        email,
        name
      });
    } catch (error) {
      console.error('Error sending resource nudge email:', error);
    }
  }

  public async sendCommunityUpdateEmail(email: string, title: string, content: string, ctaText: string, ctaLink: string): Promise<void> {
    try {
      await this.sendEmail('user', '/api/send-community-update', {
        email,
        title,
        content,
        ctaText,
        ctaLink
      });
    } catch (error) {
      console.error('Error sending community update email:', error);
    }
  }

  public async broadcastAnnouncement(subject: string, message: string, actionUrl: string, actionText: string): Promise<void> {
    try {
      console.log('Broadcasting announcement:', { subject });
      await axios.post(`${this.baseURL}/api/admin/broadcast-announcement`, {
        title: subject,
        content: message,
        ctaLink: actionUrl,
        ctaText: actionText,
        secret: 'topedge-secret-key-change-in-prod' // Hardcoded for now
      });
      console.log('Announcement broadcast initiated successfully');
    } catch (error) {
      console.error('Error broadcasting announcement:', error);
      throw error;
    }
  }

  public async sendResourceBroadcast(resourceId: string, title: string, authorName: string): Promise<void> {
    try {
      console.log('Sending resource broadcast:', { resourceId, title, authorName });
      await axios.post(`${this.baseURL}/api/send-resource-notification`, {
        resourceId,
        title,
        authorName,
        secret: 'topedge-secret-key-change-in-prod' // Hardcoded for now matching backend
      });
      console.log('Resource broadcast sent successfully');
    } catch (error) {
      console.error('Error sending resource broadcast:', error);
      // Non-blocking
    }
  }

  public async sendRequestBroadcast(requestId: string, title: string, requesterName: string, budget: string, description: string): Promise<void> {
    try {
      console.log('Sending request broadcast:', { requestId, title, requesterName });
      await axios.post(`${this.baseURL}/api/send-request-notification`, {
        requestId,
        title,
        requesterName,
        budget,
        description,
        secret: 'topedge-secret-key-change-in-prod' // Hardcoded for now matching backend
      });
      console.log('Request broadcast sent successfully');
    } catch (error) {
      console.error('Error sending request broadcast:', error);
      // Non-blocking
    }
  }


  public async sendOtp(email: string): Promise<{ hash: string; email: string }> {
    try {
      console.log('Requesting OTP for:', email);
      // We use axios directly here because sendEmail method is typed for void return
      // and designed for specific email sending patterns
      const url = `${this.baseURL}/api/generate-otp`;
      const response = await axios.post(url, { email }, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.status !== 200) throw new Error('Failed to send OTP');
      return response.data; // Expected: { hash, email, message }
    } catch (error) {
      console.error('Error sending OTP:', error);
      // Try fallback if primary fails (simplified fallback logic here for brevity, 
      // ideally reuse sendEmail's robust fallback but customized for return value)
      const fallbackBaseURL = this.getFallbackBaseURL();
      if (fallbackBaseURL) {
          try {
             const url = `${fallbackBaseURL}/api/generate-otp`;
             const response = await axios.post(url, { email });
             return response.data;
          } catch (e) {
             throw new Error('Failed to send OTP via fallback');
          }
      }
      throw new Error('Failed to send OTP');
    }
  }

  public async verifyOtp(email: string, otp: string, hash: string): Promise<boolean> {
    try {
      const url = `${this.baseURL}/api/verify-otp`;
      const response = await axios.post(url, { email, otp, hash }, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data.success;
    } catch (error) {
      console.error('Error verifying OTP:', error);
       const fallbackBaseURL = this.getFallbackBaseURL();
      if (fallbackBaseURL) {
          try {
             const url = `${fallbackBaseURL}/api/verify-otp`;
             const response = await axios.post(url, { email, otp, hash });
             return response.data.success;
          } catch (e) {
             return false;
          }
      }
      return false;
    }
  }
}

// Export a singleton instance
export const emailService = new EmailService();
