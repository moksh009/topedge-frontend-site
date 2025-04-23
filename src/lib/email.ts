import nodemailer from 'nodemailer';
import { format } from 'date-fns';

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

export const sendBookingConfirmation = async ({
  name,
  email,
  date,
  time,
  company,
}: {
  name: string;
  email: string;
  date: Date;
  time: string;
  company: string;
}) => {
  try {
    const formattedDate = format(date, 'MMMM d, yyyy');
    
    const mailOptions = {
      from: {
        name: 'TopEdge AI Booking System',
        address: process.env.NEXT_PUBLIC_EMAIL_USER as string
      },
      to: email,
      subject: 'Meeting Confirmation - TopEdge AI Consultation',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Booking Confirmation - TopEdge AI</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 20px;">
              <div style="text-align: center; padding: 20px 0; background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%); color: white; border-radius: 8px 8px 0 0; margin: -20px -20px 20px -20px;">
                <h1 style="margin: 0; font-size: 24px;">TopEdge AI</h1>
                <p style="margin: 5px 0 0 0;">Booking Confirmation</p>
              </div>
              
              <div style="padding: 20px 0;">
                <h2 style="color: #333;">Hello ${name},</h2>
                <p style="margin: 20px 0;">Thank you for booking a consultation with TopEdge AI. Your meeting has been confirmed with the following details:</p>
                
                <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 6px;">
                  <h3 style="color: #6366F1; margin-bottom: 15px;">Booking Information</h3>
                  <p style="margin: 5px 0;"><strong>Date:</strong> ${formattedDate}</p>
                  <p style="margin: 5px 0;"><strong>Time:</strong> ${time}</p>
                  <p style="margin: 5px 0;"><strong>Company:</strong> ${company}</p>
                </div>

                <div style="margin: 20px 0;">
                  <h3 style="color: #6366F1;">Next Steps</h3>
                  <p>1. Add this meeting to your calendar</p>
                  <p>2. Prepare any specific questions or requirements you'd like to discuss</p>
                  <p>3. We'll send you a meeting link 24 hours before the scheduled time</p>
                </div>

                <p style="margin: 20px 0;">If you need to reschedule or have any questions, please reply to this email or contact us at <a href="mailto:${process.env.NEXT_PUBLIC_EMAIL_USER}" style="color: #6366F1;">${process.env.NEXT_PUBLIC_EMAIL_USER}</a></p>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                  <p style="margin: 0;">Best regards,</p>
                  <p style="margin: 5px 0; color: #6366F1;">The TopEdge AI Team</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
};