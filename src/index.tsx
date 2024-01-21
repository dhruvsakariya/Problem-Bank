import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Problem from "./pages/problems/problem";
import SocketComponent from "./pages/socket";

const container = document.getElementById("root")!;
const root = createRoot(container);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Problem />,
  },
  { path: "/socket", element: <SocketComponent /> },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
