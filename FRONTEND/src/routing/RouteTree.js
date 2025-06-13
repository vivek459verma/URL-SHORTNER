import { createRootRoute } from "@tanstack/react-router";
import { homepageRoute } from "./Homepage.route.js";
import { dashboardRoute } from "./Dashboard.route.js";
import { authRoute } from "./Auth.Route.js";
import RootLayout from "../RootLayout.jsx";

export const rootRoute = createRootRoute({
  component: RootLayout,
});

export const routeTree = rootRoute.addChildren([
  homepageRoute,
  authRoute,
  dashboardRoute,
]);
