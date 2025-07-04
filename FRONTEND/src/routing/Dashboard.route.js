import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./RouteTree";
import DashboardPage from "../pages/DashboardPage";
import { checkAuth } from "../utils/helper.js";

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
  beforeLoad: checkAuth,
});
