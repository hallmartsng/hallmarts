export function staffInivitationEmailTemplate({
  firstName,
  invitationLink,
}: {
  firstName: string;
  invitationLink: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Welcome to Space Dezyn Team!</h2>
      <p>Hi ${firstName},</p>
      <p>You have been invited to join our studio team at Space Dezyn. Click the link below to accept your invitation and complete your profile setup.</p>
      <p>
        <a href="${`https://app.spacedezyn.com/staff/invite/accept?token=${invitationLink}`}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
          Accept Invitation
        </a>
      </p>
      <p>Or copy and paste this link in your browser:</p>
      <p>${`https://app.spacedezyn.com/staff/invite/accept?token=${invitationLink}`}</p>
      <p style="color: #666; font-size: 12px; margin-top: 20px;">This link expires in 7 days.</p>
    </div>
  `;
}
