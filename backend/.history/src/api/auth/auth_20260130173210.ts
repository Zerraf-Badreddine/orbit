import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../database/index";
import { sendVerificationEmailWrap, sendResetPasswordEmail } from "./email";

export const auth = betterAuth({
  appName: process.env.APP_NAME || "Learn Backend",
  baseURL: process.env.API_BASE_URL || "http://localhost:3000",
  basePath: "/api/auth",
  secret: process.env.AUTH_SECRET_KEY,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      await sendVerificationEmailWrap({
        to: user.email,
        token: token,
        url: url,
      });
    },
    expiresIn: 1800, // 30 minutes
    autoSignInAfterVerification: true,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 32,
    sendResetPassword: async ({ user, url, token }) => {
      await sendResetPasswordEmail({
        to: user.email,
        url: url,
        token: token,
      });
    },
    resetPasswordTokenExpiresIn: 3600, // 1 hour
    autoSignIn: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (refresh session every day)
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:5173", // Frontend dev server
    process.env.FRONTEND_URL,
  ].filter(Boolean) as string[],
  rateLimit: {
    enabled: process.env.NODE_ENV === "production",
    window: 60, // 1 minute
    max: 100, // 100 requests per minute
    storage: "database",
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    cookiePrefix: "learn_backend",
  },
});
