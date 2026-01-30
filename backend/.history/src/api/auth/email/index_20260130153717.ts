import { createTransport, type Transporter } from "nodemailer";
import { z, safeParse } from "zod";

const transporter : Transporter = createTransport(
    {
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: 587,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    }
)

const mailOptions = z.object({
    to: z.email("receier should be an email string"),
    from: z.email("sender should be an email string"),
})
type MailOptions = z.infer<typeof mailOptions>;

function sendVerificationEmail(options: MailOptions) {
    {to, from} = options.safeParse()
    const result = transporter.sendMail(

    )
}
