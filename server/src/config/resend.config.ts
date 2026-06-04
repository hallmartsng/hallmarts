import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env["RESEND_API_KEY"]);

export const sendEmail = async (options: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    await resend.emails.send({
      from: `Hallmarts <${process.env["RESEND_FROM"]}@hallmarts.com>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  } catch (error: any) {
    console.error("Resend error:", error);
    throw new Error("Email failed to send");
  }
};
