import LoginPage from "../../presentation/login/view/LoginPage";
import Route from "./Route";


const routes = [
//   new Route({
//     path: Routes.HOME,
//     element: HomePage,
//     isShow: true,
//     isProtected: false,
//   }),
  new Route({
    path: LoginPage.name,
    element: LoginPage,
    isShow: true,
    isProtected: false,
  }),
//   new Route({
//     path: Routes.DASHBOARD,
//     element: DashboardPage,
//     isShow: true,
//     isProtected: true,
//   }),
//   new Route({
//     path: Routes.NOT_FOUND,
//     element: NotFoundPage,
//     isShow: false,
//     isProtected: false,
//   }),
];


export const protectedRoute = routes.filter((r) => r.isProtected);
export const unprotectedRoute = routes.filter((r) => !r.isProtected);
