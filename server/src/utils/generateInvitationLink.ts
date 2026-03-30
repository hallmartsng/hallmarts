import jwt from "jsonwebtoken";

export const generateInvitationLink = ({ first_name, last_name, email, role }:{ first_name:string, last_name:string, email:string, role:string })=> {
  const invitationLink = jwt.sign({ first_name, last_name, email, role }, process.env['JWT_SECRET']!, {expiresIn: '7d' }); // short-lived
  return invitationLink;
}