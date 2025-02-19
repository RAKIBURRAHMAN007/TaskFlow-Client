import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../pages/Root";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
  },
]);
export default router;
