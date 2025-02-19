import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../pages/Root";
import Login from "../components/Login/Login";
import PrivateRoute from "./PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "/root",
    element: (
      <PrivateRoute>
        <Root></Root>
      </PrivateRoute>
    ),
    children: [{}],
  },
]);
export default router;
