import { createTransport, type Transporter } from "nodemailer";

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