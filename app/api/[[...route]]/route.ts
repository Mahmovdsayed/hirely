import { setUserTokenAction } from "@/app/actions/auth/setUserTokenAction";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api/v1");

app.get("/", (c) => {
  return c.json({
    success: true,
    message: "Welcome to the Hirely API",
    info: {
      name: "Hirely",
      author: "Hirely Team",
      license: "MIT",
      website: "https://hirely.cc",
      repository: "https://github.com/Mahmovdsayed/hirely",
      version: "1.0.0",
    },
  });
});

// Api Route for set user token in cookies
app.post("/userToken", setUserTokenAction);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export const OPTIONS = handle(app);
export const HEAD = handle(app);
