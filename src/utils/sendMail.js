import nodemailer from 'nodemailer';

import { getEnvVar } from './getEnvVar';
import { SMTP } from '../constans/index.js';

const transporter = nodemailer.createTransport({
  host: getEnvVar(SMTP.SMTP_HOST),
  port: getEnvVar(SMTP.SMTP_PORT),
  secure: false,
  auth: {
    user: getEnvVar(SMTP.SMTP_USER),
    pass: getEnvVar(SMTP.SMTP_PASSWORD),
  },
});

export const sendMail = async (options) => {
  return await transporter.sendMail(options);
};
