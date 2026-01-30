import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import { auth } from "./api/auth/auth";
import { errorHandler } from "./middleware/error-handler.middleware";
import { env } from "./config/env.config";

const app = new Hono();

app.use("*", errorHandler);
app.use("*", logger());
app.use("/", prettyJSON());
app.use(
  "*",
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      env.FRONTEND_URL,
    ].filter(Boolean) as string[],
    credentials: true,
  }),
);

app.get("/", (c) =>
  c.json({
    message: "API is running",
    version: "1.0.0",
    environment: env.NODE_ENV,
  }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

export default app;

// or we can use
// export default {
// port : any port
// fetch: app.fetch}
