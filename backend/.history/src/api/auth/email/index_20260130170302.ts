import { verificationSchema } from "better-auth/db";
import { createTransport, type Transporter } from "nodemailer";
import { z } from "zod";

const transporter : Transporter = createTransport(
    {
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    }
)

const mailOptionsSchema = z.object({
    to: z.email("receier should be an email string"),
    subject: z.string().optional(),
    html: z.string().optional()
})
type MailOptions = z.infer<typeof mailOptionsSchema>;

export async function sendEmail(options: MailOptions) {
    const parsed = mailOptionsSchema.safeParse(options);
    if(!parsed.success) {
        throw new Error(`invalid email options ${parsed.error.message}`);
    }

    const {to, subject, html} = parsed.data;
    const from = process.env.SMTP_USER;
    const result = await transporter.sendMail({
        to,
        from,
        subject,
        html
    })
    return result;
}

const VerificationEmailOptionsSchema = mailOptionsSchema.extend({
    token: z.string(),
    url: z.url(),
})

type VerificationEmail = z.infer<typeof VerificationEmailOptionsSchema>

function createVerificationEmailTemplate(url: string, token: string): string {
    return `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Verify Your Email</h2>
            <p>Click the link below to verify your email:</p>
            <a href="${url}" style="background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">
                Verify Email
            </a>
            <p>Token: ${token}</p>
        </body>
        </html>
    `;
}

export async function sendVerificationEmailWrap(options:VerificationEmail) {
    const parsed = VerificationEmailOptionsSchema.safeParse(options);
    if(!parsed.success) {
        throw new Error(`Invalid verification email option ${parsed.error.message}`);
    }
    const {to, token, url} = parsed.data;
    const html = createVerificationEmailTemplate(url, token);
    const result = await transporter.sendMail({
        to: to,
        subject: "Verify your email",
        html: html
    })
    return result;
}