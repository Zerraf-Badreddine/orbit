import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { auth } from "./api/auth/auth";
import { error } from "better-auth/api";

const app = new Hono();

app.use("*", logger());
app.use("/", prettyJSON());

app.get("/", (c) => c.json({ text: "Hello" }));
app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/api/auth/session", (c) => {
  const session = auth.api.getSession({
    headers: c.req.raw.headers,
    asResponse: true,
  });
  if (!session) {
    return c.json(
      {
        error: "Unauthorized",
      },
      401,
    );
  }
  return c.json(session);
});

export default app;

// or we can use
// export default {
// port : any port
// fetch: app.fetch}
