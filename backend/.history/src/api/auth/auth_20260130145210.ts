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
  })  
});
