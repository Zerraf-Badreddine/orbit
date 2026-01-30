import { createTransport } from "nodemailer";

const transporter = createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, 
    },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    const info = await transporter.sendMail({
        from: `"My App" <${process.env.SMTP_USER}>`, // sender address
        to, 
        subject,
        html,
    });
    
    console.log("Message sent: %s", info.messageId);
};