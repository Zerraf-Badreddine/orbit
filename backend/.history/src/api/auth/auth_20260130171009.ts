import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../database/index";
import { sendVerificationEmailWrap } from "./email";
import { request } from "express";

const auth = betterAuth({
  appName: process.env.APP_NAME,
  baseURL: process.env.API_BASE_URL,
  basePath: process.env.AUTH_BASE_URL,
  secret: process.env.AUTH_SECRET_KEY,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const receiver = user.email;
      const MailOptions = {
        to: user.email,
        token: token,
        url: url,
      };
      await sendVerificationEmailWrap(MailOptions);
    },
    expiresIn: 1800, // half hour
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 32,
    sendResetPassword: async ({ user, url, token }, request) => {},
  },
});
