import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.json({ text: "Hello" }));

export default app;

// or we can use
// export default {
// port : any port
// fetch: app.fetch}
