import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/index";
import { env } from "./env.config";
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from "../lib/email/email.service";

export const auth = betterAuth({
  appName: env.APP_NAME,
  baseURL: env.API_BASE_URL,
  basePath: "/api/auth",
  secret: env.AUTH_SECRET_KEY,

  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      await sendVerificationEmail({
        to: user.email,
        token,
        url,
      });
    },
    expiresIn: 1800,
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
        url,
        token,
      });
    },
    resetPasswordTokenExpiresIn: 3600,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    storeSessionInDatabase: true,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },

  trustedOrigins: (request) => {
    return [
      "http://localhost:3000",
      "http://localhost:5173",
      env.FRONTEND_URL,
    ].filter(Boolean) as string[];
  },

  rateLimit: {
    enabled: env.NODE_ENV === "production",
    window: 60,
    max: 100,
    storage: "memory",
  },

  advanced: {
    useSecureCookies: env.NODE_ENV === "production",
    cookiePrefix: "learn_backend",
  },
});
