import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();

app.get("/", (c) => c.json({ text: "Hello" }));

app.use("*", logger());

export default app;

// or we can use
// export default {
// port : any port
// fetch: app.fetch}
