import { Hono } from "hono";
import { logger } from "hono/hono-midd"

const app = new Hono();

app.get("/", (c) => c.json({ text: "Hello" }));

app.use("*", )

export default app;

// or we can use
// export default {
// port : any port
// fetch: app.fetch}
