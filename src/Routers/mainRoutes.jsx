import axios from "axios";
import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import RootLayout from "../layouts/RootLayout";
import AddBooks from "../pages/AddBooks";
import AllUsers from "../pages/AllUsers";
import AvailableBooks from "../pages/AvailableBooks";
import Dashboard from "../pages/Dashboard";
import DetailsPage from "../pages/DetailsPage";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyBooks from "../pages/MyBooks";
import Register from "../pages/Register";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/available-books",
        element: <AvailableBooks />,
      },
      {
        path: "/details/:bookId",
        element: <DetailsPage />,
        loader: async ({ params }) => {
          const { data } = await axios.get(
            `http://localhost:5000/details/${params.bookId}`
          );
          return data;
        },
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          ,
          {
            path: "add-book",
            element: <AddBooks />,
          },
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "my-books",
            element: <MyBooks />,
          },
          {
            path: "my-requests",
            element: <MyBooks />,
          },
        ],
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "registration",
        element: <Register></Register>,
      },
      {},
    ],
  },
]);

export default mainRoutes;
