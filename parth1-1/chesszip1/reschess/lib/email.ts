import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@indianchessacademy.com',
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

export function getPasswordResetEmail(name: string, resetUrl: string): string {
  return `
    <div style="font-family: 'Figtree', sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #003366; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Indian Chess Academy</h1>
      </div>
      <div style="padding: 30px; background-color: #FFFEF3;">
        <h2 style="color: #003366;">Password Reset Request</h2>
        <p>Hi ${name},</p>
        <p>We received a request to reset your password. Click the button below to set a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #FC8A24; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600;">
            Reset Password
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">This link will expire in 1 hour. If you didn't request this, you can safely ignore this email.</p>
      </div>
      <div style="background-color: #003366; padding: 15px; text-align: center;">
        <p style="color: #ccc; margin: 0; font-size: 12px;">Indian Chess Academy - Think Plan Triumph</p>
      </div>
    </div>
  `;
}

export function getDemoConfirmationEmail(
  parentName: string,
  studentName: string,
  date: string,
  time: string
): string {
  return `
    <div style="font-family: 'Figtree', sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #003366; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Indian Chess Academy</h1>
      </div>
      <div style="padding: 30px; background-color: #FFFEF3;">
        <h2 style="color: #003366;">Demo Session Booked!</h2>
        <p>Hi ${parentName},</p>
        <p>Thank you for booking a demo session for <strong>${studentName}</strong>.</p>
        <div style="background-color: white; padding: 20px; border-radius: 8px; border: 1px solid #eee; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
          <p style="margin: 5px 0;"><strong>Time:</strong> ${time}</p>
        </div>
        <p>Our team will reach out to you shortly with more details. We look forward to meeting ${studentName}!</p>
      </div>
      <div style="background-color: #003366; padding: 15px; text-align: center;">
        <p style="color: #ccc; margin: 0; font-size: 12px;">Indian Chess Academy - Think Plan Triumph</p>
      </div>
    </div>
  `;
}
