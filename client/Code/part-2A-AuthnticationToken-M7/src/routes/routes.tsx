import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.routes";
import { studentPaths } from "./studen.routes";
import { facultyPaths } from "./facultyPaths";
// import ProtectedRoute from "../components/layout/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: 
        <App />,
    children: routeGenerator(adminPaths),
  },
  // {
  //   path: "/admin",
  //   element: (
  //     <ProtectedRoute>
  //       <App />
  //     </ProtectedRoute>
  //   ),
  //   children: routeGenerator(adminPaths),
  // },
  {
    path: "/faculty",
    element: <App />,
    children: routeGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: <App />,
    children: routeGenerator(studentPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
