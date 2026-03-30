import { sendEmail } from '../config/sendGrid.config';
import { paymentSuccessTemplate } from '../templates/project/paymentSuccessful';
import { otpEmailTemplate } from '../templates/auth/otpEmail.template';
import { otpForgotPasswordTemplate } from '../templates/auth/otpForgotPassword.template';
import { newsLetterTemplate } from '../templates/user/newsLetter.template';
import { staffInivitationEmailTemplate } from '../templates/staff/staffInivitationEmail';
import { newProjectConfirmedTemplate } from '../templates/project/newProjectConfirmed';
import { updateProjectTemplate } from '../templates/project/updateProjectTemplate';
import { projectStages } from '../types/project.types';
export const sendOtpEmail = async (
  to: string,
  otp: string,
  purpose: string
) => {
  await sendEmail({
    to,
    subject: `${purpose} Code`,
    html: otpEmailTemplate(otp, purpose),
  });
};

export const sendProjectPaymentEmail = async (
  to: string,
  amount: number,
  project: string
) => {
  await sendEmail({
    to,
    subject: `${project} Payment Confirmation`,
    html: paymentSuccessTemplate({ amount, project }),
  });
};

export const sendOtpForgotPasswordEmail = async (
  to: string,
  otp: string,
  purpose: string
) => {
  await sendEmail({
    to,
    subject: `Password Reset Code`,
    html: otpForgotPasswordTemplate(otp, purpose),
  });
};

export const sendNewsletterEmail = async (to: string) => {
  await sendEmail({
    to,
    subject: `Newsletter Subscription`,
    html: newsLetterTemplate(),
  });
};

export const sendStaffInivitationEmail = async (
  to: string,
  firstName: string,
  invitationLink: string
) => {
  await sendEmail({
    to,
    subject: `Invitation to Join Momodust Studios Team`,
    html: staffInivitationEmailTemplate({ firstName, invitationLink }),
  });
};

export const sendProjectConfirmationEmail = async (
  to: string,
  amount: number,
  project: string,
  clientName: string
) => {
  await sendEmail({
    to,
    subject: `${project} Confirmation`,
    html: newProjectConfirmedTemplate({ amount, project, clientName }),
  });
};

export const sendProjectProgressEmail = async (
  to: string,
  project: string,
  clientName: string,
  stages: projectStages[],
  phase: string
) => {
  await sendEmail({
    to,
    subject: `${project} Confirmation`,
    html: updateProjectTemplate({ project, clientName, stages, phase }),
  });
};
