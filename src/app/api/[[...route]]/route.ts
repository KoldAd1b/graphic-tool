import { Hono } from "hono";
import { handle } from "hono/vercel";
import users from "./users";
import { Context } from "hono";
import authConfig from "@/auth.config";
import { AuthConfig, initAuthConfig } from "@hono/auth-js";
import projects from "./projects";
import subscriptions from "./subscriptions";

import images from "./images";

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    ...authConfig,
  };
}
// Revert to "edge" if planning on running on edge
export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));

const routes = app
  .route("/images", images)
  .route("/users", users)
  .route("/projects", projects)
  .route("/subscriptions", subscriptions);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
