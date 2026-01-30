import { createTransport, type Transporter } from "nodemailer";

const transporter : Transporter = createTransport(
    {
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: 587
        
    }
)