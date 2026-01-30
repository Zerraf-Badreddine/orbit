import { createTransport, type Transporter } from "nodemailer";
import { z } from "zod";

const transporter: Transporter = createTransport(
    {
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: 587,
        secure: false, // Use false for port 587 (STARTTLS)
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    }
)

const mailOptionsSchema = z.object({
    to: z.string().email("receiver should be an email string"),
    from: z.string().email("sender should be an email string"),
    subject: z.string(),
    html: z.string(),
})
type MailOptions = z.infer<typeof mailOptionsSchema>;

export async function sendVerificationEmail(options: MailOptions) {
    const parsed = mailOptionsSchema.safeParse(options);
    
    if (!parsed.success) {
        throw new Error(`Invalid email options: ${parsed.error.message}`);
    }
    
    const { to, from, subject, html } = parsed.data;
    
    const result = await transporter.sendMail({
        to,
        from,
        subject,
        html,
    });
    
    return result;
}
