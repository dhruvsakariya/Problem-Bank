import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Problem from "./pages/problems/problem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Result from "./pages/result/result";
import { getRandomProblemsArray } from "./utils/problems";
import { setQuestions } from "./features/contest/contestSlice";
import { useAppDispatch } from "./app/hooks";

const container = document.getElementById("root")!;
const root = createRoot(container);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Problem />,
  },
  { path: "/result", element: <Result /> },
]);

const App = ({ children }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const problems = (await import("./utils/problems")).problems;

      const questions = getRandomProblemsArray(problems, 5);

      dispatch(setQuestions(questions));
      setLoading(false);
    })();
  }, []);

  return !loading ? children : null;
};

export default App;

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App>
      <ToastContainer />
      <RouterProvider router={router} />
    </App>
  </Provider>
  // </React.StrictMode>
);
