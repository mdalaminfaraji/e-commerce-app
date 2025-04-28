import MainLayout from "../layouts/MainLayout";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import ProductEdit from "../pages/ProductEdit";
import Categories from "../pages/Categories";
import { Navigate, Route } from "react-router-dom";

export interface AppRoute {
  path: string;
  element: React.ReactNode;
  children?: AppRoute[];
}

export const appRoutes: AppRoute[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <ProductList /> },
      { path: "categories", element: <Categories /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "product/edit/:id", element: <ProductEdit /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
];
export function renderRoutes(routes: AppRoute[]) {
  return routes.map(({ path, element, children }, idx) => (
    <Route key={path + idx} path={path} element={element}>
      {children && renderRoutes(children)}
    </Route>
  ));
}
