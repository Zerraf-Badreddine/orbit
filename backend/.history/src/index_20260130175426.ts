import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono();

app.get("/", (c) => c.json({ text: "Hello" }));
app.on(["POST", "GET"], "/api/auth/*", (c) => {});

app.use("*", logger());
app.use("/", prettyJSON());

export default app;

// or we can use
// export default {
// port : any port
// fetch: app.fetch}
