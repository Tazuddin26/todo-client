import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import RootPage from "../layout/RootPage";
import Login from "../pages/AccountPage/Login";
import SignUp from "../pages/AccountPage/SignUp";
import Updatetask from "../pages/updateTask.jsx/Updatetask";
import PrivateRoute from "./PrivateRoute";
import TaskPage from "../pages/taskPage/TaskPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/upadateTask",
        element: <Updatetask />,
        loader: ({ params }) =>
          fetch(`https://todo-server-1-pmap.onrender.com/task/${params.id}`),
      },
      // {
      //   path: "/taskPage",
      //   element: <TaskPage />,
      //   loader: ({ params }) =>
      //     fetch(`https://todo-server-1-pmap.onrender.com/task/${params.id}`),
      // },
    ],
  },
]);
