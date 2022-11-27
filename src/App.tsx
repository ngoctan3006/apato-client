import React from "react";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";


const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>
    },
    {
      path: '/login',
      element: <LoginPage/>
    }
  ]);

  return <RouterProvider router={router}/>
}

export default App
