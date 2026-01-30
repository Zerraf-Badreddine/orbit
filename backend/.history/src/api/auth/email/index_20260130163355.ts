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

export async function sendVerificationEmail(options: MailOptions) {
    const parsed = mailOptionsSchema.safeParse(options);
    if(!parsed.success) {
        throw new Error(`invalid email options ${parsed.error.message}`);
    }

    const {to, from, subject, html} = parsed.data;
    const result = await transporter.sendMail({
        to,
        ,
        subject,
        html
    })
    return result;
}
