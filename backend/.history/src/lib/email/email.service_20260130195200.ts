import { createTransport, type Transporter } from "nodemailer";
import { z } from "zod";
import { env } from "../../config/env.config";
import type {
  EmailOptions,
  VerificationEmailOptions,
  ResetPasswordEmailOptions,
} from "./email.types";
import { createVerificationEmailTemplate } from "./templates/verification.template";
import { createResetPasswordTemplate } from "./templates/reset-password.template";

const transporter: Transporter = createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

const mailOptionsSchema = z.object({
  to: z.string().email("receiver should be an email string"),
  subject: z.string().optional(),
  html: z.string().optional(),
});

const verificationEmailOptionsSchema = mailOptionsSchema.extend({
  token: z.string(),
  url: z.string().url(),
});

export async function sendEmail(options: EmailOptions) {
  const parsed = mailOptionsSchema.safeParse(options);
  if (!parsed.success) {
    throw new Error(`Invalid email options: ${parsed.error.message}`);
  }

  const { to, subject, html } = parsed.data;
  const from = env.SMTP_USER;

  const result = await transporter.sendMail({
    to,
    from,
    subject,
    html,
  });

  return result;
}

export async function sendVerificationEmail(options: VerificationEmailOptions) {
  const parsed = verificationEmailOptionsSchema.safeParse(options);
  if (!parsed.success) {
    throw new Error(
      `Invalid verification email options: ${parsed.error.message}`,
    );
  }

  const { to, token, url } = parsed.data;
  const html = createVerificationEmailTemplate(url, token);

  const result = await transporter.sendMail({
    to,
    from: env.SMTP_USER,
    subject: "Verify your email",
    html,
  });

  return result;
}

export async function sendResetPasswordEmail(
  options: ResetPasswordEmailOptions,
) {
  const parsed = verificationEmailOptionsSchema.safeParse(options);
  if (!parsed.success) {
    throw new Error(`Invalid reset email options: ${parsed.error.message}`);
  }

  const { to, url, token } = parsed.data;
  const html = createResetPasswordTemplate(url, token);

  const result = await transporter.sendMail({
    to,
    from: env.SMTP_USER,
    subject: "Reset your password",
    html,
  });

  return result;
}
