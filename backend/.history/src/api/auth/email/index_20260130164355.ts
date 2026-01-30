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
    subject: z.string(),
    html: z.string()
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

const VerificationEmailOptions = mailOptionsSchema.extend({
    token: z.string(),
    url: z.url(),
})

type VerificationEmail = z.infer<typeof VerificationEmailOptions>

export async function sendVerificationEmailWrap(options:VerificationEmail) {
    const parsed = verificationSchema.safeParse(options);
    if(!parsed.success) {
        throw new Error(`Invalid verification email option ${parsed.error.message}`);
    }
    const {to, subject, http, token, url} = parsed.data;
}