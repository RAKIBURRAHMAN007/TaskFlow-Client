import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../pages/Root";
import Login from "../components/Login/Login";
import PrivateRoute from "./PrivateRoute";
import RegisterPage from "../components/Register/Register";
import ToDo from "../components/ToDo/ToDo";
import TaskMain from "../components/TaskMain/TaskMain";
const router = createBrowserRouter([
  {
    path: "/",
    element: <TaskMain></TaskMain>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <RegisterPage></RegisterPage>,
  },
  {
    path: "/root",
    element: (
      <PrivateRoute>
        <Root></Root>
      </PrivateRoute>
    ),
    children: [
      {
        path: "todo",
        element: <ToDo></ToDo>,
      },
    ],
  },
]);
export default router;
