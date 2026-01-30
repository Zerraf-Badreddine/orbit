import {Transport} from "nodemailer";
import { createTransport } from "nodemailer";

const transporter : Transport = createTransport(
    host: "smtp.gmail.com",
    port: "587",
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP.PASS
    }
)