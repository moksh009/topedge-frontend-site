import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { emailService } from './emailService';

interface MaintenanceInquiry {
  name: string;
  email: string;
  phone: string;
  plan: string;
  emailTemplate?: string;
}

export const maintenanceService = {
  async submitInquiry(data: MaintenanceInquiry) {
    try {
      console.log('Submitting maintenance inquiry:', data);
      
      const docRef = await addDoc(collection(db, 'maintenance-inquiries'), {
        ...data,
        createdAt: serverTimestamp()
      });
      
      console.log('Successfully submitted inquiry with ID:', docRef.id);

      // Send emails
      try {
        // Send user confirmation email
        await emailService.sendMaintenanceUserEmail({
          name: data.name,
          email: data.email,
          phone: data.phone,
          plan: data.plan,
          emailTemplate: data.emailTemplate
        });

        // Send admin notification email
        await emailService.sendMaintenanceAdminEmail({
          name: data.name,
          email: data.email,
          phone: data.phone,
          plan: data.plan,
          emailTemplate: data.emailTemplate
        });
      } catch (emailError) {
        console.error('Error sending emails:', emailError);
        // Don't throw the error - we still want to return the inquiry ID even if emails fail
      }
      
      return docRef.id;
    } catch (error) {
      console.error('Error submitting maintenance inquiry:', error);
      // Add more detailed error information
      if (error instanceof Error) {
        throw new Error(`Failed to submit inquiry: ${error.message}`);
      }
      throw new Error('Failed to submit inquiry: Unknown error');
    }
  }
}; 