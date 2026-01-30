import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  DATABASE_URL: z.string().url(),
  DB_URL: z.string().url().optional(),

  APP_NAME: z.string().default("Learn Backend"),
  API_BASE_URL: z.string().url().default("http://localhost:3000"),
  FRONTEND_URL: z.string().url().optional(),

  AUTH_SECRET_KEY: z.string().min(32),

  SMTP_HOST: z.string().default("smtp.gmail.com"),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().email(),
  SMTP_PASS: z.string(),
});

type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("Environment validation failed:");
    console.error(parsed.error.format());
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

export const env = loadEnv();
