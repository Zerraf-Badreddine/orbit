import {Transport} from "nodemailer";
import { createTransport } from "nodemailer";

const transporter : Transport = createTransport(
    host: "smtp.gmail.com",
    port: "587",
    
)