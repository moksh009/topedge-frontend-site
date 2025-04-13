import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type ResponseData = {
  message: string;
  error?: string;
};

// Create transporter using Gmail credentials
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP connection successful');
  }
});

const userEmailTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Booking Confirmation - TopEdge AI</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
      <!-- Header -->
      <div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #4D07E3 0%, #7A0BC0 100%); color: white;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 700;">TopEdge AI</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Booking Confirmation</p>
      </div>
      
      <div style="padding: 40px 30px;">
        <!-- Greeting -->
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1F2937; font-size: 24px; margin: 0 0 15px 0;">Hello {{name}},</h2>
          <p style="color: #4B5563; font-size: 16px; margin: 0;">Thank you for choosing TopEdge AI. We're excited to work with you! Here's a summary of your booking:</p>
        </div>
        
        <!-- Booking Information -->
        <div style="background-color: #F9FAFB; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
          <h3 style="color: #4D07E3; font-size: 20px; margin: 0 0 20px 0;">Booking Details</h3>
          
          <!-- Services -->
          <div style="background-color: #fff; border-radius: 8px; padding: 20px; margin-bottom: 20px; border: 1px solid #E5E7EB;">
            <h4 style="color: #4D07E3; font-size: 16px; margin: 0 0 15px 0;">Services Booked:</h4>
            {{formattedServices}}
          </div>

          <!-- Date & Time -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
            <div>
              <p style="margin: 0; color: #6B7280; font-size: 14px;">Date</p>
              <p style="margin: 5px 0 0 0; color: #1F2937; font-size: 16px; font-weight: 500;">{{date}}</p>
            </div>
            <div>
              <p style="margin: 0; color: #6B7280; font-size: 14px;">Time</p>
              <p style="margin: 5px 0 0 0; color: #1F2937; font-size: 16px; font-weight: 500;">{{time}}</p>
            </div>
          </div>

          <!-- Duration -->
          <div style="margin-bottom: 15px;">
            <p style="margin: 0; color: #6B7280; font-size: 14px;">Total Duration</p>
            <p style="margin: 5px 0 0 0; color: #1F2937; font-size: 16px; font-weight: 500;">{{duration}}</p>
          </div>

          <!-- Company Info -->
          {{#if companyName}}
          <div style="margin-bottom: 15px;">
            <p style="margin: 0; color: #6B7280; font-size: 14px;">Company</p>
            <p style="margin: 5px 0 0 0; color: #1F2937; font-size: 16px; font-weight: 500;">{{companyName}}</p>
          </div>
          {{/if}}
        </div>

        <!-- Next Steps -->
        <div style="background-color: #F9FAFB; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
          <h3 style="color: #4D07E3; font-size: 20px; margin: 0 0 20px 0;">What's Next?</h3>
          <div style="background-color: #fff; border-radius: 8px; padding: 20px; border: 1px solid #E5E7EB;">
            <p style="margin: 0 0 15px 0; color: #4B5563;">We'll send you a Google Meet link for the consultation via email at least 24 hours before the scheduled time. To ensure a smooth meeting:</p>
            <ul style="margin: 0; padding-left: 20px; color: #4B5563;">
              <li style="margin-bottom: 10px;">Watch for the meeting link in your email</li>
              <li style="margin-bottom: 10px;">Test your camera and microphone beforehand</li>
              <li style="margin-bottom: 10px;">Join 5 minutes early</li>
              <li>Have your questions and materials ready</li>
            </ul>
          </div>
        </div>

        <!-- Additional Information -->
        {{#if additionalInfo}}
        <div style="background-color: #F9FAFB; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
          <h3 style="color: #4D07E3; font-size: 20px; margin: 0 0 20px 0;">Additional Information</h3>
          <div style="background-color: #fff; border-radius: 8px; padding: 20px; border: 1px solid #E5E7EB;">
            <p style="margin: 0; color: #4B5563;">{{additionalInfo}}</p>
          </div>
        </div>
        {{/if}}

        <!-- Contact -->
        <div style="background-color: #F0FDF4; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
          <h3 style="color: #4D07E3; font-size: 20px; margin: 0 0 15px 0;">Need Help?</h3>
          <p style="margin: 0; color: #4B5563;">
            If you need to reschedule or have any questions, please contact us at:
            <a href="mailto:support@topedge.ai" style="color: #4D07E3; text-decoration: none; font-weight: 500;">support@topedge.ai</a>
          </p>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; color: #6B7280; font-size: 14px; margin-top: 40px;">
          <p style="margin: 0;">Best regards,</p>
          <p style="margin: 5px 0 0 0; font-weight: 500; color: #4B5563;">The TopEdge AI Team</p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
            <p style="margin: 0;">© 2024 TopEdge AI. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, companyName, additionalInfo, services, date, time, duration, notes } = req.body;

    if (!email || !name) {
      return res.status(400).json({ message: 'Email and name are required' });
    }

    // Format services list
    const formattedServices = Array.isArray(services) 
      ? services.map(service => `
          <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #E5E7EB;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
              <h5 style="margin: 0; color: #1F2937; font-size: 16px; font-weight: 600;">${service.name}</h5>
              <span style="color: #4D07E3; font-weight: 600;">$${service.price}</span>
            </div>
            <p style="margin: 8px 0 0 0; color: #6B7280; font-size: 14px;">${service.description}</p>
            <p style="margin: 5px 0 0 0; color: #6B7280; font-size: 14px;">Duration: ${service.duration}</p>
          </div>
        `).join('')
      : '<p style="margin: 0; color: #6B7280;">No services selected</p>';

    // Configure email options
    const mailOptions = {
      from: {
        name: 'TopEdge AI',
        address: process.env.NEXT_PUBLIC_EMAIL_USER as string
      },
      to: email,
      subject: 'Booking Confirmation - TopEdge AI',
      html: userEmailTemplate
        .replace(/\{\{name\}\}/g, name)
        .replace(/\{\{formattedServices\}\}/g, formattedServices)
        .replace(/\{\{date\}\}/g, date)
        .replace(/\{\{time\}\}/g, time)
        .replace(/\{\{duration\}\}/g, duration)
        .replace(/\{\{companyName\}\}/g, companyName || '')
        .replace(/\{\{additionalInfo\}\}/g, additionalInfo || '')
        .replace(/\{\{notes\}\}/g, notes || 'No additional notes')
        .replace(/\{\{email\}\}/g, process.env.NEXT_PUBLIC_EMAIL_USER || '')
        .replace(/\{\{#if companyName\}\}([\s\S]*?)\{\{\/if\}\}/g, companyName ? '$1' : '')
        .replace(/\{\{#if additionalInfo\}\}([\s\S]*?)\{\{\/if\}\}/g, additionalInfo ? '$1' : '')
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('User confirmation email sent successfully to:', email);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error sending email:', errorMessage);
    res.status(500).json({ 
      message: 'Failed to send email',
      error: errorMessage
    });
  }
}
