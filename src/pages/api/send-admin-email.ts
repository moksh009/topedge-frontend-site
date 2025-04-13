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
              <span style="color: #6366F1; font-weight: 600;">$${service.price}</span>
            </div>
            <p style="margin: 8px 0 0 0; color: #6B7280; font-size: 14px;">${service.description}</p>
            <p style="margin: 5px 0 0 0; color: #6B7280; font-size: 14px;">Duration: ${service.duration}</p>
          </div>
        `).join('')
      : '<p style="margin: 0; color: #6B7280;">No services selected</p>';

    // Configure email options
    const mailOptions = {
      from: {
        name: 'TopEdge AI Booking System',
        address: process.env.NEXT_PUBLIC_EMAIL_USER as string
      },
      to: process.env.NEXT_PUBLIC_EMAIL_USER,
      subject: `New Booking - ${name} (${services.length} Services)`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Booking Alert - TopEdge AI</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
              <!-- Header -->
              <div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #4D07E3 0%, #7A0BC0 100%); color: white;">
                <h1 style="margin: 0; font-size: 28px; font-weight: 700;">TopEdge AI</h1>
                <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">New Booking Alert</p>
              </div>
              
              <div style="padding: 40px 30px;">
                <!-- Alert -->
                <div style="margin-bottom: 30px;">
                  <h2 style="color: #1F2937; font-size: 24px; margin: 0 0 15px 0;">New Booking Received</h2>
                  <p style="color: #4B5563; font-size: 16px; margin: 0;">A new booking has been submitted. Here are the details:</p>
                </div>
                
                <!-- Client Information -->
                <div style="background-color: #F9FAFB; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                  <h3 style="color: #4D07E3; font-size: 20px; margin: 0 0 20px 0;">Client Information</h3>
                  <div style="background-color: #fff; border-radius: 8px; padding: 20px; border: 1px solid #E5E7EB;">
                    <div style="margin-bottom: 15px;">
                      <p style="margin: 0; color: #6B7280; font-size: 14px;">Name</p>
                      <p style="margin: 5px 0 0 0; color: #1F2937; font-size: 16px; font-weight: 500;">${name}</p>
                    </div>
                    <div style="margin-bottom: 15px;">
                      <p style="margin: 0; color: #6B7280; font-size: 14px;">Email</p>
                      <p style="margin: 5px 0 0 0; color: #1F2937; font-size: 16px; font-weight: 500;">
                        <a href="mailto:${email}" style="color: #4F46E5; text-decoration: none;">${email}</a>
                      </p>
                    </div>
                    ${phone ? `
                    <div style="margin-bottom: 15px;">
                      <p style="margin: 0; color: #6B7280; font-size: 14px;">Phone</p>
                      <p style="margin: 5px 0 0 0; color: #1F2937; font-size: 16px; font-weight: 500;">${phone}</p>
                    </div>
                    ` : ''}
                    ${companyName ? `
                    <div style="margin-bottom: 15px;">
                      <p style="margin: 0; color: #6B7280; font-size: 14px;">Company</p>
                      <p style="margin: 5px 0 0 0; color: #1F2937; font-size: 16px; font-weight: 500;">${companyName}</p>
                    </div>
                    ` : ''}
                  </div>
                </div>

                <!-- Booking Information -->
                <div style="background-color: #F9FAFB; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                  <h3 style="color: #4D07E3; font-size: 20px; margin: 0 0 20px 0;">Booking Details</h3>
                  
                  <!-- Services -->
                  <div style="background-color: #fff; border-radius: 8px; padding: 20px; margin-bottom: 20px; border: 1px solid #E5E7EB;">
                    <h4 style="color: #4D07E3; font-size: 16px; margin: 0 0 15px 0;">Services Booked:</h4>
                    ${formattedServices}
                  </div>

                  <!-- Date & Time -->
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                      <p style="margin: 0; color: #6B7280; font-size: 14px;">Date</p>
                      <p style="margin: 5px 0 0 0; color: #1F2937; font-size: 16px; font-weight: 500;">${date}</p>
                    </div>
                    <div>
                      <p style="margin: 0; color: #6B7280; font-size: 14px;">Time</p>
                      <p style="margin: 5px 0 0 0; color: #1F2937; font-size: 16px; font-weight: 500;">${time}</p>
                    </div>
                  </div>

                  <!-- Duration -->
                  <div>
                    <p style="margin: 0; color: #6B7280; font-size: 14px;">Total Duration</p>
                    <p style="margin: 5px 0 0 0; color: #1F2937; font-size: 16px; font-weight: 500;">${duration}</p>
                  </div>
                </div>

                <!-- Additional Information -->
                ${additionalInfo ? `
                <div style="background-color: #F9FAFB; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                  <h3 style="color: #4D07E3; font-size: 20px; margin: 0 0 20px 0;">Additional Information</h3>
                  <div style="background-color: #fff; border-radius: 8px; padding: 20px; border: 1px solid #E5E7EB;">
                    <p style="margin: 0; color: #4B5563;">${additionalInfo}</p>
                  </div>
                </div>
                ` : ''}

                <!-- Action Required -->
                <div style="background-color: #FEF2F2; border-radius: 12px; padding: 25px;">
                  <h3 style="color: #DC2626; font-size: 20px; margin: 0 0 15px 0;">Action Required</h3>
                  <div style="background-color: #fff; border-radius: 8px; padding: 20px; border: 1px solid #FCA5A5;">
                    <p style="margin: 0 0 15px 0; color: #4B5563;">Please take the following actions:</p>
                    <ol style="margin: 0; padding-left: 20px; color: #4B5563;">
                      <li style="margin-bottom: 10px;">Schedule the Google Meet and send the link to the client</li>
                      <li style="margin-bottom: 10px;">Add the booking to your calendar</li>
                      <li>Send a reminder email 24 hours before the meeting</li>
                    </ol>
                  </div>
                </div>
                
                <!-- Footer -->
                <div style="text-align: center; color: #6B7280; font-size: 14px; margin-top: 40px;">
                  <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
                    <p style="margin: 0;">© 2024 TopEdge AI. All rights reserved.</p>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent successfully');
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
