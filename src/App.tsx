import React from "react";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ApartDetailPage from "./pages/ApartDetailPage/ApartDetailPage";
import PostApartPage from "./pages/PostApartPage/PostApartPage";


const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      path: "/apart-detail/:apartId",
      element: <ApartDetailPage/>
    },
    {
      path: "/post-apart",
      element: <PostApartPage/>
    },
    {
      path: '/login',
      element: <LoginPage/>
    }
  ]);

  return <RouterProvider router={router}/>
}

export default App
