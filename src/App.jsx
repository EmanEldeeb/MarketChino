import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { useUser } from "./context/Usercontext";
import { useEffect } from "react";

import Layout from "./Pages/Layout/Layout";
import NotFound from "./components/NotFound/NotFound";
import Home from "./Pages/Home/Home";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <NotFound></NotFound>,
    children: [
      { path: "login", element: <Login></Login> },
      { path: "register", element: <Register></Register> },
      { path: "forgotpass", element: <ForgotPassword></ForgotPassword> },
      { path: "resetpass", element: <ResetPassword></ResetPassword> },
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home></Home>
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart></Cart>
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands></Brands>
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories></Categories>
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products></Products>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
function App() {
  let queryClient = new QueryClient();
  const { setIsLogged } = useUser();
  useEffect(() => {
    console.log("eman");
    if (localStorage.getItem("_token")) setIsLogged(true);
  }, [setIsLogged]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routers}></RouterProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
