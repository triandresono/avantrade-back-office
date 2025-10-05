import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  AuthLayout,
  AuthenticatedLayout,
  HomeLayout,
} from "./components/layout";
import NotFoundPage from "./components/NotFoundPage";
import { protectedRoute, unprotectedRoute } from "./lib/base/route/Routes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
    element={<AuthLayout />} 
    errorElement={<NotFoundPage />}>
      <Route element={<HomeLayout />}>
        {unprotectedRoute.map((res, i) => (
          <Route key={i} path={res.path} element={<res.element />} />
        ))}
      </Route>
      <Route element={<AuthenticatedLayout />}>
        {protectedRoute.map(
          (res, i) =>
            res.isShow && (
              <Route key={i} path={res.path} element={<res.element />} />
            )
        )}
      </Route>
    </Route>
  ),
  { basename: import.meta.env.VITE_BASE_PUBLIC_URL }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
