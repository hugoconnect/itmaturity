// server/utils/emailSender.ts (v2: use service option)
import * as nodemailer from 'nodemailer'; 

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  bcc?: string | string[]; 
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType?: string;
  }>;
}

// use 'service' option for outlook365/outlook.com
const transporter = nodemailer.createTransport({
  service: "outlook365", // <--- use service name
  auth: {
    user: process.env.smtp_user, // your outlook.com/m365 email
    pass: process.env.smtp_pass, // your app password
  },
});

export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    // use smtp_user as fallback if smtp_from is not set in environment
    const fromAddress = process.env.smtp_from || process.env.smtp_user; 
    if (!fromAddress) {
        throw new Error("smtp_from or smtp_user environment variable must be set.");
    }

    await transporter.sendMail({
      from: fromAddress,
      to: options.to,
      bcc: options.bcc, 
      subject: options.subject,
      text: options.text,
      attachments: options.attachments,
    });
  } catch (error) {
    console.error('error sending email:', error);
    // Rethrowing or handling appropriately
    if (error instanceof Error) {
       throw new Error(`failed to send email: ${error.message}`);
    } else {
       throw new Error('failed to send email due to unknown error');
    }
  }
}