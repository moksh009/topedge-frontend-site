import { format } from 'date-fns';
import axios, { AxiosError } from 'axios';

export interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
  monthlyFee?: string;
  type: 'voice' | 'chatbot';
  features: string[];
  duration: string;
  popular?: boolean;
}

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
    this.baseURL = this.isDevelopment 
      ? 'http://localhost:3001' 
      : 'https://topedge-backend.netlify.app';
  }

  private formatDate(date: Date): string {
    return format(date, 'MMMM do, yyyy');
  }

  private formatServices(services: Service[]): string {
    return services.map(service => `
      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
          <div>
            <h5 style="margin: 0; color: #1F2937; font-size: 16px; font-weight: 600;">${service.name}</h5>
            ${service.popular ? '<span style="display: inline-block; margin-left: 8px; padding: 2px 8px; background: linear-gradient(135deg, #4D07E3 0%, #7A0BC0 100%); color: white; border-radius: 12px; font-size: 12px;">Popular</span>' : ''}
          </div>
          <div style="text-align: right;">
            <span style="color: #4D07E3; font-weight: 600;">$${service.price}</span>
            ${service.monthlyFee ? `<br><span style="color: #6B7280; font-size: 14px;">+$${service.monthlyFee}/month</span>` : ''}
          </div>
        </div>
        <p style="margin: 8px 0; color: #6B7280; font-size: 14px;">${service.description}</p>
        <div style="margin-top: 12px;">
          <p style="margin: 0 0 8px 0; color: #4B5563; font-size: 14px; font-weight: 500;">Key Features:</p>
          <ul style="margin: 0; padding-left: 20px; color: #6B7280; font-size: 14px;">
            ${service.features.slice(0, 3).map(feature => `<li style="margin-bottom: 4px;">${feature}</li>`).join('')}
            ${service.features.length > 3 ? `<li style="color: #4D07E3;">+${service.features.length - 3} more features</li>` : ''}
          </ul>
        </div>
        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #E5E7EB;">
          <span style="color: #6B7280; font-size: 14px;">Duration: ${service.duration}</span>
          <span style="color: #6B7280; font-size: 14px; margin-left: 16px;">Type: ${service.type === 'voice' ? 'AI Voice Agent' : 'Chatbot'}</span>
        </div>
      </div>
    `).join('');
  }

  private async sendEmail(type: EmailType, endpoint: string, details: any): Promise<void> {
    const maxRetries = 3;
    let retryCount = 0;
    
    while (retryCount < maxRetries) {
      try {
        const url = `${this.baseURL}${endpoint}`;
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
}

// Export a singleton instance
export const emailService = new EmailService();
