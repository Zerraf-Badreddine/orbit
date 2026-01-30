import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../database/index";


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
      // TODO: Integration with email provider (Resend, SendGrid, etc.)
      console.log(`Sending verification email to ${user.email}`);
      console.log(`Verification URL: ${url}`);
      console.log(`Token: ${token}`);
    },
  },

});
