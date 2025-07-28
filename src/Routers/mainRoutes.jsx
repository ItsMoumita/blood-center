
import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import RootLayout from "../layouts/RootLayout";

import Error from "../pages/HomePages/Error";
import Home from "../pages/HomePages/Home";
import Login from "../pages/AuthenticationPages/Login";
import Register from "../pages/AuthenticationPages/Register";
import MyDonationRequests from "../pages/DashboardPages/DonorPages/MyDonationRequests";
import CreateDonationRequest from "../pages/DashboardPages/DonorPages/CreateDonationRequest";
import EditDonationRequest from "../pages/DashboardPages/DonorPages/EditDonationRequest";
import ViewDonationRequest from "../pages/DashboardPages/DonorPages/ViewDonation";
import Dashboard from "../pages/DashboardPages/Dashboard";
import RequireAdmin from "./RequireAdmin";
import AllUsers from "../pages/DashboardPages/AdminPages/AllUsers";
import AllBloodDonationRequests from "../pages/DashboardPages/AdminPages/AllBloodDonationRequests";
import AddBlog from "../pages/DashboardPages/AdminPages/AddBlog";
import ContentManagement from "../pages/DashboardPages/AdminPages/ContentManagement";

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
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "registration",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard/my-donation-requests",
        element: <MyDonationRequests />,
      },
      {
        path: "/dashboard/create-donation-request",
        element: <CreateDonationRequest />,
      },
      {
        path: "/dashboard/edit-donation-request/:id",
        element: <EditDonationRequest />,
      },
      {
        path: "/dashboard/donation-request/:id",
        element: <ViewDonationRequest></ViewDonationRequest>
      },
      {
        path: "/dashboard/all-users",
        element: (
          <RequireAdmin>
            <AllUsers />
          </RequireAdmin>
        ),
      },
      {
        path: "/dashboard/all-blood-donation-request",
        element: (
          <RequireAdmin>
            <AllBloodDonationRequests />
          </RequireAdmin>
        )
      },
      {
        path: "/dashboard/content-management",
        element: (
          <RequireAdmin>
            <ContentManagement />
          </RequireAdmin>
        )
      },
      {
        path: "/dashboard/content-management/add-blog",
        element: (
          <RequireAdmin>
            <AddBlog />
          </RequireAdmin>
        )
      },


    ],
  },
]);

export default mainRoutes;
