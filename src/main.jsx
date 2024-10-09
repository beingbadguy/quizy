import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Create from "./Pages/Create.jsx";
import Layout from "./Layout/Layout.jsx";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import MainContext from "./Context/Context.jsx";
import Overview from "./Pages/Overview.jsx";
import Profile from "./Pages/Profile.jsx";
import Final from "./Pages/Final.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "test/:id",
        element: <Overview />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "final/:id",
        element: <Final />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <MainContext>
    <RouterProvider router={router} />
  </MainContext>
);
