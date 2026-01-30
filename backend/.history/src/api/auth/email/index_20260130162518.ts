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
    from: z.email("sender should be an email string"),
})
type MailOptions = z.infer<typeof mailOptionsSchema>;

function sendVerificationEmail(options: MailOptions) {
    const {to, from} = mailOptionsSchema.safeParse(options);
    const result = transporter.sendMail(

    )
}
