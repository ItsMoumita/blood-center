
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
import AllUsers from "../pages/DashboardPages/AdminPages/AllUsers";
import AddBlog from "../pages/DashboardPages/AdminPages/AddBlog";
import Blog from "../pages/HomePages/Blog";
import Profile from "../pages/DashboardPages/Profile";
import ContentManagementRoleSwitch from "../components/ExtraComponents/ContentManagementRoleSwitch";
import RequireVolunteerOrAdmin from "./RequireVolunteerOrAdmin";
import AllBloodDonationRequestsRoleSwitch from "../components/ExtraComponents/AllBloodDonationRequestsRoleSwitch";
import RequireAdmin from "./RequireAdmin";
import FundingPage from "../pages/DashboardPages/DonorPages/FundingPage";
import DonorSearch from "../pages/HomePages/DonorSearch";
import PendingDonationRequests from "../pages/HomePages/PendingDonationRequest";
import DonationRequestDetails from "../pages/HomePages/DonationRequestDetails";
import PrivateRoute from "./PrivateRoute";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "blog", element: <Blog /> },
      { path: "login", element: <Login /> },
      { path: "registration", element: <Register /> },
      {
        path: "search",
        element: <DonorSearch></DonorSearch>
      },
      {
        path: "/pending-donation-requests",
        element: <PendingDonationRequests />
      },
      {  path: "profile", 
        element: <Profile /> 
      },
      {
        path: "/donation-request/:id",
        Component: () => (
          <PrivateRoute>
              <DonationRequestDetails />
          </PrivateRoute>
        )
      },
    ],
  },
  {
    path: "/dashboard",
    Component: () => (
      <PrivateRoute>
         <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "my-donation-requests", element: <MyDonationRequests /> },
      { path: "create-donation-request", element: <CreateDonationRequest /> },
      { path: "edit-donation-request/:id", element: <EditDonationRequest /> },
      { path: "donation-request/:id", element: <ViewDonationRequest /> },
      {
        path: "/dashboard/funding",
        element: <FundingPage></FundingPage>
      },
      {
        path: "all-blood-donation-request",
        element: (
          <RequireVolunteerOrAdmin>
            <AllBloodDonationRequestsRoleSwitch />
          </RequireVolunteerOrAdmin>
        ),
      },
      {
        path: "content-management",
        element: (
          <RequireVolunteerOrAdmin>
            <ContentManagementRoleSwitch />
          </RequireVolunteerOrAdmin>
        ),
      },
      {
        path: "all-users",
        element: (
          <RequireAdmin>
            <AllUsers />
          </RequireAdmin>
        ),
      },
      {
        path: "content-management/add-blog",
        element: (
          <RequireAdmin>
            <AddBlog />
          </RequireAdmin>
        ),
      },
    ],
  },
]);

export default mainRoutes;
