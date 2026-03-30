import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env['SENDGRID_API_KEY']!);

export const sendEmail = async (options: {
  to: string;
  subject: string;
  html: string;
}) => {
  const msg = {
    to: options.to,
    from: {
      email: process.env['SENDGRID_FROM']!,
      name: 'Space Dezyn',
    },
    subject: options.subject,
    html: options.html,
  };

  try {
    await sgMail.send(msg);
  } catch (error: any) {
    console.error('SendGrid error:', error.response?.body || error);
    throw new Error('Email failed to send');
  }
};
