import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { auth } from "./api/auth/auth";

const app = new Hono();

app.use("*", logger());
app.use("/", prettyJSON());

app.get("/", (c) => c.json({ text: "Hello" }));
app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

export default app;

// or we can use
// export default {
// port : any port
// fetch: app.fetch}
