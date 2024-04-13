import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Create, Home, Login, Post, Register } from "./pages";
import { Navbar, Footer } from "./components";

const Layout = () => {
  return (
    <>
      <Navbar> </Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/post/:id",
        element: <Post />,
      },
      {
        path: "/create",
        element: <Create/>
      }
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
