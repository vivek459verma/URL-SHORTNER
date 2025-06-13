import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./RouteTree";
import HomePage from "../pages/HomePage";

export const homepageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: HomePage,
});
